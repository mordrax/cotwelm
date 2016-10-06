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
import Random exposing (..)
import Random.Extra exposing (..)
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
step ({ activePoints } as model) =
    shuffle activePoints
        `andThen` \shuffledPoints ->
                    let
                        _ =
                            Debug.log "DungeonGenerator.step"
                                { activePoint = headWithDefault (ActiveRoom Room.init Maybe.Nothing) shuffledPoints
                                }
                    in
                        case shuffledPoints of
                            -- when nothing's active, no more exploration
                            [] ->
                                constant model

                            (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
                                generateEntrance room { model | activePoints = remainingPoints }

                            -- pick a active room and either make a new entrance or
                            -- make a corridor from a existing entrance
                            (ActiveRoom room (Just entrance)) :: remainingPoints ->
                                let
                                    modelWithActiveCorridorAndInactiveRoom corridor =
                                        { model
                                            | activePoints =
                                                ActiveCorridor (Corridor.complete corridor)
                                                    :: ActiveRoom room (Maybe.Nothing)
                                                    :: remainingPoints
                                        }

                                    addCorridorToModel room maybeCorridor =
                                        maybeCorridor
                                            |> Maybe.Extra.filter (canFitCorridor model)
                                            |> Maybe.map modelWithActiveCorridorAndInactiveRoom
                                            |> Maybe.withDefault model
                                in
                                    generateCorridor room entrance model.config
                                        |> Random.map (addCorridorToModel room)

                            -- pick a active corridor and dig a room
                            (ActiveCorridor corridor) :: remainingPoints ->
                                let
                                    tryAddRoomToModel room =
                                        if canFitRoom model room then
                                            { model
                                                | corridors = corridor :: model.corridors
                                                , activePoints = ActiveRoom room Maybe.Nothing :: remainingPoints
                                            }
                                        else
                                            model
                                in
                                    case Corridor.end corridor of
                                        Just corridorEnding ->
                                            generateRoom corridorEnding model.config
                                                |> Random.map tryAddRoomToModel

                                        Maybe.Nothing ->
                                            constant { model | corridors = corridor :: model.corridors }


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


{-| Generate a new corridor given a room and a entrance of the room.
    The corridor will go in a random direction and be of random length.
-}
generateCorridor : Room -> Entrance -> Config.Model -> Generator (Maybe Corridor)
generateCorridor room entrance config =
    let
        entranceFacing =
            Room.entranceFacing room entrance

        entrancePosition =
            Entrance.position entrance

        corridorStart =
            Vector.add entrancePosition entranceFacing

        leftDirection =
            Vector.rotate entranceFacing Left

        rightDirection =
            Vector.rotate entranceFacing Right

        randomDirection =
            [ leftDirection, rightDirection, entranceFacing ]
                |> shuffle
                |> Random.map (headWithDefault entranceFacing)

        randomCorridorLength =
            Dice.range config.corridor.minLength config.corridor.maxLength

        makeCorridor ( len, dir ) =
            let
                facingEntrance =
                    entranceFacing
                        |> Vector.scaleInt -1
                        |> Vector.toDirection

                corridor =
                    Corridor.init ( corridorStart, facingEntrance )
            in
                digger (DigInstruction ( corridorStart, Vector.toDirection dir ) len) corridor
    in
        Random.map2 (,) randomCorridorLength randomDirection
            `andThen` makeCorridor


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



------------
-- Digger --
------------


type alias DigInstruction =
    { start : DirectedVector
    , length : Int
    }


digger : DigInstruction -> Corridor -> Generator (Maybe Corridor)
digger ({ start, length } as instruction) corridor =
    let
        ( digStart, digDirection ) =
            start

        finish =
            Vector.add digStart (Vector.scaleInt length (Vector.fromCompass digDirection))

        finishDirectionGen finish =
            (Corridor.possibleEnds finish corridor |> shuffle)
                `andThen` (List.head >> constant)

        digPath =
            Corridor.path digStart finish

        dig maybeEnd =
            case maybeEnd of
                Just end ->
                    constant (Just <| Corridor.add end corridor)

                Maybe.Nothing ->
                    constant Maybe.Nothing
    in
        finishDirectionGen finish
            `andThen` dig



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
