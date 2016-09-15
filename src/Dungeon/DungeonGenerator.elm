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
   dictated by the config model, they are no longer active.
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
    | ActiveCorridor Corridor Vector


init : Config.Model -> Generator Model
init config =
    let
        roomGenerator =
            Room.generate config

        model =
            Model config [] [] []

        addRoomToModel room =
            { model
                | rooms = [  ]
                , activePoints = [ ActiveRoom room Maybe.Nothing ]
            }
    in
        Random.map addRoomToModel roomGenerator


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step ({ activePoints } as model) =
    let
        _ =
            Debug.log "Taking a step" model
    in
        case activePoints of
            -- when nothing's active, no more exploration
            [] ->
                constant model

            (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
                generateEntrance room { model | activePoints = remainingPoints }

            -- pick a active room and either make a new entrance or
            -- make a corridor from a existing entrance
            (ActiveRoom room (Just entrance)) :: remainingPoints ->
                generateCorridor room
                    entrance
                    { model
                        | activePoints = remainingPoints
                        , rooms = room :: model.rooms
                    }

            -- pick a active corridor and keep digging!
            (ActiveCorridor corridor point) :: remainingPoints ->
                constant model


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
generateCorridor : Room -> Entrance -> Model -> Generator Model
generateCorridor room entrance ({ config } as model) =
    let
        straightAhead =
            Room.entranceFacing room entrance

        corridorStart =
            Vector.add (Entrance.position entrance) straightAhead

        leftDirection =
            Vector.rotate straightAhead Left

        rightDirection =
            Vector.rotate straightAhead Right

        randomDirection =
            [ leftDirection, rightDirection, straightAhead ]
                |> shuffle
                |> Random.map (headWithDefault straightAhead)

        _ =
            Debug.log "generateCorridor"
                { straightAhead = straightAhead
                , corridorStart = corridorStart
                , leftDirection = leftDirection
                , rightDirection = rightDirection
                }

        randomCorridorLength =
            Dice.range config.corridor.minLength config.corridor.maxLength
    in
        Random.map2 (,) randomCorridorLength randomDirection
            `andThen` \( len, dir ) ->
                        constant <| digger (DigInstruction corridorStart dir len) model



------------
-- Digger --
------------


type alias DigInstruction =
    { start : Vector
    , direction : Vector
    , length : Int
    }


digger : DigInstruction -> Model -> Model
digger ({ start, direction, length } as instruction) model =
    let
        emptyAtPosition pos =
            dungeonConstructAtPos pos model == Nothing

        ( sx, sy ) =
            start

        (( fx, fy ) as finish) =
            Vector.add start (Vector.scaleInt length direction)

        digPath =
            List.map2 (,) [sx..fx] [sy..fy]

        obstaclePosition =
            List.Extra.dropWhile emptyAtPosition digPath

        corridor =
            Corridor.new (Entrance.init Door start)

        _ =
            Debug.log "digger"
                { finish = finish
                , digPath = digPath
                , obstaclePosition = obstaclePosition
                , corridor = corridor
                , instruction = instruction
                }
    in
        case obstaclePosition of
            _ ->
                let
                    activeCorridor =
                        ActiveCorridor (Corridor.add finish corridor) finish
                in
                    { model | activePoints = activeCorridor :: model.activePoints }



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



--prospecting : Vector -> Model -> Vector -> Int -> ProspectResult
--prospecting currentSquare ({ config } as model) direction length =
--    let
--        nextSquare =
--            Vector.add currentSquare direction
--
--        previousSquare =
--            Vector.sub currentSquare direction
--
--        continueProspecting nextSquare =
--            prospecting nextSquare model direction
--    in
--        if isWithinDungeonBounds model currentSquare then
--            case (dungeonConstructAtPos currentSquare model) of
--                Nothing ->
--                    continueProspecting nextSquare
--
--                something ->
--                    ProspectResult previousSquare something
--        else
--            ProspectResult previousSquare EdgeOfMap


isWithinDungeonBounds : Model -> Vector -> Bool
isWithinDungeonBounds ({ config } as model) ( x, y ) =
    (x >= 0)
        && (y >= 0)
        && (x <= model.config.dungeonSize)
        && (y <= model.config.dungeonSize)


dungeonConstructAtPos : Vector -> Model -> Finding
dungeonConstructAtPos pos ({ rooms, corridors } as model) =
    let
        map =
            toMap model

        constructsAtPosition pos =
            ( roomAtPosition model pos, corridorAtPosition model pos )
    in
        case Maps.getTile map pos of
            Maybe.Nothing ->
                Nothing

            Just _ ->
                case constructsAtPosition pos of
                    ( Just room, _ ) ->
                        Room room

                    ( _, Just corridor ) ->
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

        ActiveCorridor corridor _ ->
            ( rooms, corridor :: corridors )
