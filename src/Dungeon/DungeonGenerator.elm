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
    case activePoints of
        -- when nothing's active, no more exploration
        [] ->
            constant model

        (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
            generateEntrance room { model | activePoints = remainingPoints }

        -- pick a active room and either make a new entrance or
        -- make a corridor from a existing entrance
        (ActiveRoom room (Just entrance)) :: remainingPoints ->
            generateCorridor room entrance model.config
                `andThen` (\maybeCorridor ->
                            case maybeCorridor of
                                Just corridor ->
                                    constant
                                        { model
                                            | rooms = room :: model.rooms
                                            , activePoints = ActiveCorridor (Corridor.complete corridor) :: remainingPoints
                                        }

                                Maybe.Nothing ->
                                    constant { model | rooms = room :: model.rooms }
                          )

        -- pick a active corridor and keep digging!
        (ActiveCorridor corridor) :: remainingPoints ->
            case Corridor.end corridor of
                Just corridorEnding ->
                    generateRoom corridorEnding model.config
                        `andThen` (\room ->
                                    constant
                                        { model
                                            | corridors = corridor :: model.corridors
                                            , activePoints = ActiveRoom room Maybe.Nothing :: model.activePoints
                                        }
                                  )

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
            model

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

        _ =
            Debug.log "generateCorridor"
                { entranceFacing = entranceFacing
                , corridorStart = corridorStart
                , leftDirection = leftDirection
                , rightDirection = rightDirection
                }

        randomCorridorLength =
            Dice.range config.corridor.minLength config.corridor.maxLength
    in
        Random.map2 (,) randomCorridorLength randomDirection
            `andThen` \( len, dir ) ->
                        let
                            facingEntrance =
                                entranceFacing
                                    |> Vector.scaleInt -1
                                    |> Vector.toDirection

                            corridor =
                                Corridor.init ( corridorStart, facingEntrance )
                        in
                            digger (DigInstruction ( corridorStart, Vector.toDirection dir ) len) corridor


generateRoom : DirectedVector -> Config.Model -> Generator Room
generateRoom corridorEnding config =
    Room.generate config
        `andThen` Room.placeRoom corridorEnding



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
    in
        finishDirectionGen finish
            `andThen` (\maybeEnd ->
                        case maybeEnd of
                            Just end ->
                                constant (Just <| Corridor.add end corridor)

                            Maybe.Nothing ->
                                constant Maybe.Nothing
                      )



-----------------
-- Prospecting --
-----------------


type alias Direction =
    Vector


type Finding
    = Room Room
    | Corridor Corridor
    | EdgeOfMap
    | Nothing


type alias ProspectResults =
    List ProspectResult


type alias ProspectResult =
    { position : Vector
    , found : Finding
    }


dungeonConstructAtPos : Vector -> Model -> Finding
dungeonConstructAtPos pos ({ rooms, corridors } as model) =
    let
        map =
            toMap model

        constructsAtPosition pos =
            ( roomAtPosition model pos, corridorAtPosition model pos )

        mapTile =
            Maps.getTile map pos

        inBounds =
            Config.withinDungeonBounds pos model.config
    in
        case ( mapTile, inBounds, constructsAtPosition pos ) of
            ( _, False, _ ) ->
                EdgeOfMap

            ( Maybe.Nothing, _, _ ) ->
                Nothing

            ( Just _, _, ( Just room, _ ) ) ->
                Room room

            ( Just _, _, ( _, Just corridor ) ) ->
                Corridor corridor

            _ ->
                -- should not hit this, caught by outer case
                Nothing


roomAtPosition : Model -> Vector -> Maybe Room
roomAtPosition { rooms } position =
    let
        isInRoom room =
            Room.isPositionWithinRoom room position
    in
        rooms
            |> List.filter isInRoom
            |> List.head


corridorAtPosition : Model -> Vector -> Maybe Corridor
corridorAtPosition corridor position =
    Maybe.Nothing


stepCorridor : Corridor -> Model -> Generator Model
stepCorridor corridor model =
    constant model



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
