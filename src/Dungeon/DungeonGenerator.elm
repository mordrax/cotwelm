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


-- types


type alias Model =
    { config : Config.Model
    , rooms : Rooms
    , corridors : Corridors
    , activeRooms : Rooms
    , activeCorridors : Corridors
    }


init : Generator Model
init =
    let
        config =
            Config.init

        roomGenerator =
            Room.generate config

        modelGenerator room =
            constant
                { config = config
                , rooms = []
                , corridors = []
                , activeRooms = [ room ]
                , activeCorridors = []
                }
    in
        (Room.generate config)
            `andThen` modelGenerator


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step ({ config, rooms, activeRooms, activeCorridors } as model) =
    case ( activeRooms, activeCorridors ) of
        ( _, c :: cs ) ->
            stepCorridor c { model | activeCorridors = cs }

        ( r :: rs, _ ) ->
            stepRoom r { model | activeRooms = rs }

        ( [], [] ) ->
            constant model


{-| Given an active room, will try to generate entrances if there aren't any,
    or make corridors if there are active entrances to the room.
-}
stepRoom : Room -> Model -> Generator Model
stepRoom room ({ config } as model) =
    let
        roomAtMaxEntrances =
            List.length (Room.entrances room) >= config.maxEntrances
    in
        case Room.unconnectedEntrances room of
            [] ->
                if roomAtMaxEntrances then
                    constant { model | rooms = room :: model.rooms }
                else
                    generateEntranceForModel room model

            e :: _ ->
                generateCorridor e room model


generateEntranceForModel : Room -> Model -> Generator Model
generateEntranceForModel room model =
    let
        roomGen' =
            Room.generateEntrance room

        entranceToModel room' =
            { model
                | activeRooms = room' :: model.activeRooms
            }
    in
        Random.map entranceToModel roomGen'


generateCorridor : Entrance -> Room -> Model -> Generator Model
generateCorridor entrance room model =
    let
        start =
            Vector.add (Entrance.position entrance) dir

        dir =
            Room.entranceFacing room entrance
    in
        prospector start dir model
            `andThen` (\x -> constant { model | activeRooms = room :: model.activeRooms })


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
    in
        shuffle [ direction, leftDirection, rightDirection ]
            `andThen` (\dirs ->
                        dirs
                            |> List.head
                            |> Maybe.withDefault direction
                            |> prospecting oneStepAhead model
                            |> constant
                      )


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
dungeonConstructAtPos pos ({ rooms, corridors, activeRooms, activeCorridors } as model) =
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
roomAtPosition { rooms, activeRooms } position =
    let
        isInRoom room =
            Room.isPositionWithinRoom room position
    in
        (rooms ++ activeRooms)
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
toTiles model =
    (model.rooms ++ model.activeRooms)
        |> List.map Room.toTiles
        |> List.concat
