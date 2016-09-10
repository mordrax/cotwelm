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
    = ActiveEntrance Room Entrance
    | ActiveCorridor Corridor Vector
    | ActiveRoom Room


init : Generator Model
init =
    let
        config =
            Config.init

        roomGenerator =
            Room.generate config

        model =
            Model config [] [] []

        addRoomToModel room =
            { model
                | rooms = [ room ]
                , activePoints = [ ActiveRoom room ]
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
            Debug.log "Taking a step" 1
    in
        case activePoints of
            -- when nothing's active, no more exploration
            [] ->
                constant model

            (ActiveRoom room) :: remainingPoints ->
                generateEntrance room { model | activePoints = remainingPoints }

            -- pick a active room and either make a new entrance or
            -- make a corridor from a existing entrance
            (ActiveEntrance room entrance) :: remainingPoints ->
                generateCorridor room entrance { model | activePoints = remainingPoints }

            -- pick a active corridor and keep digging!
            (ActiveCorridor corridor point) :: remainingPoints ->
                constant model


{-| Generate a new entrance for a room
-}
generateEntrance : Room -> Model -> Generator Model
generateEntrance room ({ config } as model) =
    let
        isRoomAtMaxEntrances =
            (room |> Room.entrances |> List.length) >= config.maxEntrances

        modelWithActiveRoomRemoved =
            model

        mapEntranceToModel ( r, e ) =
            { model | activePoints = [ ActiveEntrance r e, ActiveRoom r ] ++ model.activePoints }
    in
        if isRoomAtMaxEntrances then
            constant modelWithActiveRoomRemoved
        else
            Random.map mapEntranceToModel (Room.generateEntrance room)


{-| Given an active room, will try to generate entrances if there aren't any,
    or make corridors if there are active entrances to the room.
-}



--stepRoom : Room -> Model -> Generator Model
--stepRoom room ({ config } as model) =
--    let
--        isRoomAtMaxEntrances =
--            (room |> Room.entrances |> List.length) >= config.maxEntrances
--
--        modelWithRoomMadeInactive =
--            { model | rooms = room :: model.rooms }
--
--        modelWithRoomKeptActive =
--            { model | activeRooms = room :: model.activeRooms }
--
--        updateModelWithActiveRoom room =
--            { model | activeRooms = room :: model.activeRooms }
--    in
--        case Room.unconnectedEntrances room of
--            [] ->
--                if isRoomAtMaxEntrances then
--                    constant modelWithRoomMadeInactive
--                else
--                    Random.map updateModelWithActiveRoom (Room.generateEntrance room)
--
--            entrance :: _ ->
--                generateCorridor entrance room modelWithRoomKeptActive


generateCorridor : Room -> Entrance -> Model -> Generator Model
generateCorridor room entrance model =
    let
        start =
            Vector.add (Entrance.position entrance) dir

        dir =
            Room.entranceFacing room entrance

        toReturn prospectResult =
            prospectResult
                |> addCorridor model
                |> constant
    in
        prospector start dir model
            `andThen` toReturn


addCorridor : Model -> ProspectResult -> Model
addCorridor ({ config } as model) { position, found } =
    let
        noChange =
            model
    in
        case found of
            Room room ->
                -- create corridor between two rooms
                noChange

            Corridor corridor ->
                -- create intersection between two corridors
                noChange

            EdgeOfMap ->
                -- explore adding room possibilities or just create a dead end?
                noChange

            _ ->
                noChange


toMap : Model -> Map
toMap model =
    model
        |> toTiles
        |> Maps.fromTiles


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


{-| A prospector takes a starting point and a direction then looks in
a random direction to see what's down that path.
-}
prospector : Vector -> Vector -> Model -> Generator ProspectResult
prospector start direction model =
    let
        oneStepAhead =
            Vector.add start direction

        leftDirection =
            Vector.rotate direction Left

        rightDirection =
            Vector.rotate direction Right

        prospectingInDirection direction =
            prospecting oneStepAhead model direction

        randomDirection =
            shuffle [ direction, leftDirection, rightDirection ]
                `andThen` (headWithDefault direction >> constant)
    in
        randomDirection
            `andThen` (prospectingInDirection >> constant)


prospecting : Vector -> Model -> Vector -> ProspectResult
prospecting currentSquare model direction =
    let
        nextSquare =
            Vector.add currentSquare direction

        previousSquare =
            Vector.sub currentSquare direction

        continueProspecting nextSquare =
            prospecting nextSquare model direction
    in
        if isWithinDungeonBounds model currentSquare then
            case (dungeonConstructAtPos currentSquare model) of
                Nothing ->
                    continueProspecting nextSquare

                something ->
                    ProspectResult previousSquare something
        else
            ProspectResult previousSquare EdgeOfMap


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


atMapPos : Vector -> Model -> Maybe Tile
atMapPos pos model =
    model
        |> toMap
        |> flip Maps.getTile pos


stepCorridor : Corridor -> Model -> Generator Model
stepCorridor corridor model =
    constant model


toTiles : Model -> Tiles
toTiles { rooms, corridors } =
    rooms
        |> List.map Room.toTiles
        |> List.concat
