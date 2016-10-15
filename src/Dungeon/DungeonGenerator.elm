module Dungeon.DungeonGenerator
    exposing
        ( step
        , toTiles
        , init
        , Model
        )

import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Dungeon.Corridor as Corridor exposing (..)
import Dungeon.Room as Room exposing (..)
import Dice exposing (..)
import Random.Pcg as Random exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import Game.Maps as Maps exposing (..)
import Lodash exposing (..)
import List.Extra exposing (dropWhile)
import Utils.CompassDirection exposing (..)
import Maybe.Extra exposing (..)


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


type alias Model =
    { config : Config.Model
    , rooms : Rooms
    , corridors : Corridors
    , activePoints : ActivePoints
    }


type alias ActivePoints =
    List ActivePoint


type ActivePoint
    = ActiveRoom Room (Maybe Entrance)
    | ActiveCorridor Corridor


init : Config.Model -> Generator Model
init config =
    let
        model =
            Model config [] [] []

        borderWalls =
            [ (List.Extra.lift2 (,) [ 0, config.dungeonSize ] [0..config.dungeonSize])
            , (List.Extra.lift2 (,) [0..config.dungeonSize] [ 0, config.dungeonSize ])
            ]

        borderRoom =
            Room.new [] borderWalls [] [] Rectangular ( 0, 0 ) ( 0, 0 )

        addRoomToModel room =
            { model | activePoints = [ ActiveRoom room Maybe.Nothing ], rooms = [ borderRoom ] }
    in
        Random.map addRoomToModel (Room.generate config)


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step model =
    shuffle model.activePoints
        `andThen` \x -> step' { model | activePoints = x }


step' : Model -> Generator Model
step' ({ activePoints } as model) =
    case activePoints of
        -- when nothing's active, no more exploration
        [] ->
            constant model

        (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
            generateEntrance room { model | activePoints = remainingPoints }

        -- make a corridor from a existing entrance
        (ActiveRoom room (Just entrance)) :: remainingPoints ->
            let
                modelWithActiveCorridor corridor =
                    { model
                        | activePoints =
                            ActiveCorridor (Corridor.complete corridor)
                                :: ActiveRoom room (Maybe.Nothing)
                                :: remainingPoints
                    }

                addCorridorToModel room corridor =
                    if canFitCorridor model corridor then
                        modelWithActiveCorridor corridor
                    else
                        model

                entrancePosition =
                    Entrance.position entrance

                entranceFacing =
                    Room.entranceFacing room entrance

                corridorStart =
                    ( Vector.add entrancePosition entranceFacing
                    , entranceFacing
                        |> Vector.toDirection
                        |> Vector.oppositeDirection
                    )
            in
                Corridor.generate corridorStart model.config
                    |> Random.map (addCorridorToModel room)

        -- pick a active corridor and dig a room
        (ActiveCorridor corridor) :: remainingPoints ->
            let
                modelWithCorridorInactivated =
                    { model | corridors = corridor :: model.corridors }
            in
                generateActivePointFromCorridor corridor model
                    `andThen` \x ->
                                case x of
                                    (ActiveCorridor corridor) as activePoint ->
                                        if canFitCorridor model corridor then
                                            constant
                                                { model
                                                    | activePoints = activePoint :: remainingPoints
                                                }
                                        else
                                            constant modelWithCorridorInactivated

                                    (ActiveRoom room _) as activePoint ->
                                        if canFitRoom model room then
                                            constant
                                                { modelWithCorridorInactivated
                                                    | activePoints = activePoint :: remainingPoints
                                                }
                                        else
                                            constant modelWithCorridorInactivated



--                                    Nothing ->
--                                        constant modelWithCorridorInactivated


generateActivePointFromCorridor : Corridor -> Model -> Generator ActivePoint
generateActivePointFromCorridor corridor model =
    let
        makeActivePoint room =
            ActiveRoom room (Maybe.Nothing)

        activeRoom : Generator ActivePoint
        activeRoom =
            generateRoom corridorEnd model.config
                |> Random.map makeActivePoint

        --        corridorActivePoint =
        --            extendCorridor corridor model.config
        --                |> Random.map (\x -> ActiveCorridor x)
        corridorEnd =
            Corridor.end corridor
    in
        Dice.d 2
            `andThen` (\x ->
                        if x == 1 then
                            activeRoom
                        else
                            activeRoom
                      )



--corridorActivePoint
--
--             Maybe.map (canFitRoom model)


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

        mapEntranceToModel ( room', entrance ) =
            { model
                | activePoints = ActiveRoom room' (Just entrance) :: model.activePoints
            }
    in
        if isRoomAtMaxEntrances then
            constant modelWithActiveRoomRemoved
        else
            Random.map mapEntranceToModel (Room.generateEntrance room)



--extendCorridor : Corridor -> Config.Model -> Generator Corridor
--extendCorridor corridor config =
--    let
--        ( lastPoint, lastFacing ) =
--            Corridor.end corridor
--
--        randomCorridorLength =
--            Dice.range config.corridor.minLength config.corridor.maxLength
--
--        randomCorridorDirection =
--            [ Vector.rotate lastFacing Left
--            , Vector.rotate lastFacing Right
--            , lastFacing
--            ]
--    in
--        Random.map2 (,) randomCorridorLength randomCorridorDirection
--            |> Random.map (\( len, dir ) -> digger (DigInstruction ( lastPoint, dir ) len) corridor)


generateRoom : DirectedVector -> Config.Model -> Generator Room
generateRoom corridorEnding config =
    Room.generate config
        `andThen` Room.placeRoom corridorEnding



---------------
-- Collision --
---------------


canFitCorridor : Model -> Corridor -> Bool
canFitCorridor model corridor =
    let
        modelTiles =
            toTiles model

        corridorTiles =
            Corridor.toTiles corridor

        inModelTiles tile =
            List.any (Tile.isSamePosition tile) modelTiles
    in
        corridorTiles
            |> List.any inModelTiles
            |> not


canFitRoom : Model -> Room -> Bool
canFitRoom model room =
    let
        modelTiles =
            toTiles model

        roomTiles =
            Room.toTiles room

        inModelTiles tile =
            List.any (Tile.isSamePosition tile) modelTiles
    in
        roomTiles
            |> List.any inModelTiles
            |> not



------------------
-- Model to Map --
------------------


toMap : Model -> Map
toMap model =
    model
        |> toTiles
        |> Maps.fromTiles


toTiles : Model -> Tiles
toTiles { rooms, corridors, activePoints } =
    let
        ( activeRooms, activeCorridors ) =
            List.foldl roomsAndCorridorsFromActivePoint ( [], [] ) activePoints

        roomTiles =
            (rooms ++ activeRooms)
                |> List.map Room.toTiles
                |> List.concat

        corridorTiles =
            (corridors ++ activeCorridors)
                |> List.map Corridor.toTiles
                |> List.concat
    in
        roomTiles ++ corridorTiles


roomsAndCorridorsFromActivePoint : ActivePoint -> ( Rooms, Corridors ) -> ( Rooms, Corridors )
roomsAndCorridorsFromActivePoint point ( rooms, corridors ) =
    case point of
        ActiveRoom room _ ->
            ( room :: rooms, corridors )

        ActiveCorridor corridor ->
            ( rooms, corridor :: corridors )
