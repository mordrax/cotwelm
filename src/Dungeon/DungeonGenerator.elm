module Dungeon.DungeonGenerator
    exposing
        ( step
        , steps
        , generate
        , init
        )

import Dice exposing (..)
import Dict exposing (Dict)
import Dungeon.Clean
import Dungeon.Corridor as Corridor exposing (Corridor)
import Dungeon.Entrance as Entrance exposing (Entrance)
import Dungeon.Room as Room exposing (Room)
import Dungeon.Rooms.Config as Config
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Types exposing (..)
import Building exposing (Building)
import Types exposing (..)
import Game.Level as Level
import List.Extra exposing (dropWhile)
import Random.Pcg as Random exposing (Generator, constant)
import Set
import Tile exposing (Tile)
import Utils.Direction exposing (Direction)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)


{-| The dungeon generator module creates a dungeon progressively by allowing the caller
to use the returned Generator type to step through a dungeon creation. The caller can
hook the generator up to a UI and have the user see it being created one step at a
time or it can be called in a fold and generated programmatically.

The strategy used here is like that of a miner with the overarching goal of making
a dungeon that looks like the original Castle of the Winds.

The algorithm is as follows:
1. On initialise, create a room, this will be the entrance to the level with a
   randomly generated up staircase.

2. On each call to 'step', look through the 'active' rooms and corridors. Pick the
   first active room found. Or the first active corridor if there is no active rooms.
   If there are neither active rooms nor corridor, end the step.

3a Given a active room, if there is an unconnected entrance

Active -
   A room or corridor which is still being explored. Once a room or corridor
   has all their entrances connected, and cannot hold any more entrances as
   dictated by the config model, they are no longer active and moved out of
   activePoints.
-}



-- types


init : Config.Model -> Model
init config =
    Model config [] [] [] [] []



----------------------------
-- Cleaning active points --
----------------------------


candidate : Config.Model -> Generator Model
candidate config =
    init config
        |> steps 200
        |> Random.map Dungeon.Clean.clean


generate : Config.Model -> Generator Level.Level
generate config =
    generate_ config
        |> Random.map toLevel


generate_ : Config.Model -> Generator Model
generate_ config =
    let
        fitness model =
            List.length model.rooms > config.minRooms

        regenerateIfNotFit candidate =
            if Debug.log "Candidate fit?: " (fitness candidate) then
                constant candidate
                    |> Random.andThen addStairs
            else
                generate_ config
    in
        candidate config
            |> Random.andThen regenerateIfNotFit


addStairs : Model -> Generator Model
addStairs model =
    let
        upstairs pos =
            Building.new Building.StairsUp pos "UpStairs" Building.StairUp

        downstairs pos =
            Building.new Building.StairsDown pos "DownStairs" Building.StairDown

        addStairs stairs model =
            { model | buildings = stairs :: model.buildings }

        makeUpDownStairs floors =
            case floors of
                first :: second :: _ ->
                    model
                        |> addStairs (upstairs first)
                        |> addStairs (downstairs second)

                _ ->
                    Debug.log "ERROR: Tis not good, dungeon does not have two tiles of floors." model
    in
        model.rooms
            |> List.map Room.floors
            |> List.concat
            |> Misc.shuffle
            |> Random.map makeUpDownStairs


steps : Int -> Model -> Generator Model
steps steps model =
    let
        oneStep _ gen =
            Random.andThen step gen
    in
        case steps of
            0 ->
                constant model

            n ->
                List.foldl oneStep (constant model) (List.range 0 (n - 1))


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step model =
    let
        printPoint point =
            case point of
                ActiveRoom room _ ->
                    Room.pp room

                ActiveCorridor corridor ->
                    Corridor.pp corridor
    in
        Misc.shuffle model.activePoints
            |> Random.andThen
                (\x ->
                    step_ { model | activePoints = x }
                        |> Random.andThen Random.constant
                )


step_ : Model -> Generator Model
step_ ({ activePoints } as model) =
    case activePoints of
        -- when nothing's active, no more exploration
        [] ->
            let
                addRoomToModel room =
                    { model | activePoints = [ ActiveRoom room Maybe.Nothing ], rooms = [] }
            in
                if List.length model.rooms == 0 && List.length model.corridors == 0 then
                    Random.map addRoomToModel (Room.generate model.config)
                else
                    constant model

        (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
            generateEntrance room { model | activePoints = remainingPoints }

        -- make a corridor from a existing entrance
        (ActiveRoom room (Just entrance)) :: remainingPoints ->
            let
                modelWithActiveRoom corridor =
                    { model
                        | activePoints =
                            ActiveCorridor corridor
                                :: ActiveRoom room (Maybe.Nothing)
                                :: remainingPoints
                    }

                updateModel corridor =
                    if canFitCorridor model corridor then
                        modelWithActiveRoom corridor
                    else
                        model

                ( startPosition, entranceFacing ) =
                    corridorStartFromRoomEntrance room entrance
            in
                Corridor.generate startPosition entranceFacing model.config
                    |> Random.map updateModel

        -- pick a active corridor and dig a room
        (ActiveCorridor corridor) :: remainingPoints ->
            let
                modelWithoutActiveCorridor =
                    { model | activePoints = remainingPoints }

                modelWithInactiveCorridor =
                    { modelWithoutActiveCorridor | corridors = corridor :: model.corridors }
            in
                generateActivePointFromCorridor corridor model
                    |> Random.map
                        (\activePoint ->
                            case activePoint of
                                (ActiveCorridor corridor) as activePoint ->
                                    if canFitCorridor modelWithoutActiveCorridor corridor then
                                        { modelWithoutActiveCorridor
                                            | activePoints = activePoint :: remainingPoints
                                        }
                                    else
                                        model

                                (ActiveRoom room _) as activePoint ->
                                    if canFitRoom model room then
                                        { modelWithInactiveCorridor
                                            | activePoints = activePoint :: remainingPoints
                                        }
                                    else
                                        model
                        )


corridorStartFromRoomEntrance : Room -> Entrance -> ( Vector, Direction )
corridorStartFromRoomEntrance room entrance =
    let
        roomEntrancePosition =
            Entrance.position entrance

        roomEntranceFacing =
            Room.entranceFacing room entrance

        corridorEntranceFacing =
            Vector.oppositeDirection roomEntranceFacing

        corridorStartPosition =
            roomEntranceFacing
                |> Vector.fromDirection
                |> Vector.add roomEntrancePosition
    in
        ( corridorStartPosition, corridorEntranceFacing )


generateActivePointFromCorridor : Corridor -> Model -> Generator ActivePoint
generateActivePointFromCorridor corridor model =
    let
        activeRoom =
            generateRoom corridorEnd model.config
                |> Random.map (\room -> ActiveRoom room (Maybe.Nothing))

        activeCorridor =
            Corridor.extend corridor model.config
                |> Random.map (\corridor -> ActiveCorridor corridor)

        corridorEnd =
            Corridor.end corridor
    in
        Random.choices [ activeRoom, activeCorridor ]


{-| Generate a new entrance for a room, then adds the room/entrance as a
    active point
-}
generateEntrance : Room -> Model -> Generator Model
generateEntrance room ({ config } as model) =
    let
        isRoomAtMaxEntrances =
            (room |> Room.entrances |> List.length) >= config.maxEntrances

        modelWithActiveRoomRemoved =
            { model | rooms = room :: model.rooms }

        mapEntranceToModel ( room_, entrance ) =
            { model
                | activePoints = ActiveRoom room_ (Just entrance) :: model.activePoints
            }
    in
        if isRoomAtMaxEntrances then
            constant modelWithActiveRoomRemoved
        else
            Random.map mapEntranceToModel (Room.generateEntrance room)


generateRoom : Vector.DirectedVector -> Config.Model -> Generator Room
generateRoom corridorEnding config =
    Room.generate config
        |> Random.andThen (Room.placeRoom corridorEnding)



---------------
-- Collision --
---------------


canFitCorridor : Model -> Corridor -> Bool
canFitCorridor model corridor =
    let
        occupiedPositions =
            toOccupied model

        corridorPositions =
            (List.map .position (Corridor.toTiles corridor))
                ++ (Corridor.boundary corridor)

        inModelTiles tile =
            List.any ((==) tile) occupiedPositions

        withinBounds =
            List.all (\x -> Config.withinDungeonBounds x model.config) corridorPositions

        overlappingTiles =
            corridorPositions
                |> List.filter inModelTiles

        canFit =
            List.isEmpty overlappingTiles

        --        _ =
        --            Debug.log "DungeonGenerator.canFitCorridor"
        --                { canFit = canFit
        --                , corridor = Corridor.pp corridor
        --                }
    in
        canFit && withinBounds


canFitRoom : Model -> Room -> Bool
canFitRoom model room =
    let
        modelPositions =
            toOccupied model
                |> Set.fromList

        roomPositions =
            (room
                |> Room.toTiles
                |> List.map .position
            )
                ++ (Room.boundary room)

        roomPositionSet =
            Set.fromList roomPositions

        withinBounds =
            List.all (\x -> Config.withinDungeonBounds x model.config) roomPositions

        collisions =
            Set.toList <| Set.intersect roomPositionSet modelPositions

        --        _ =
        --            Debug.log "DungeonGenerator.canFitRoom"
        --                { collisions = collisions
        --                , roomPosition = roomPositions
        --                }
    in
        withinBounds && List.isEmpty collisions
