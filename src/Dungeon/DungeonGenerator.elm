module Dungeon.DungeonGenerator
    exposing
        ( step
        , toTiles
        , init
        , Model
        )

import AStar exposing (findPath, Position)
import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dice exposing (..)
import Dict exposing (..)
import Dungeon.Room as Room exposing (..)
import List.Extra exposing (lift2)
import Random exposing (..)
import Random.Extra exposing (..)
import Set exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)


-- sugar types


type alias DungeonRooms =
    List DungeonRoom


type alias ActiveRooms =
    List ActiveRoom


type alias ActiveCorridors =
    List ActiveCorridor


type alias Corridors =
    List Corridor



-- active denotes those nodes which can expand to have more random stuff attached
-- on each step of the algorithm


type alias ActiveRoom =
    ( DungeonRoom, Entrances )


type alias ActiveCorridor =
    ( Corridor, Vectors )



-- types


type alias Corridor =
    { points : List Vector
    , start : Vector
    , end : Vector
    }


type alias Model =
    { config : Config.Model
    , rooms : DungeonRooms
    , corridors : Corridors
    , activeRooms : ActiveRooms
    , activeCorridors : ActiveCorridors
    }


type alias DungeonRoom =
    { position : Vector
    , room : Room
    }


init : Generator Model
init =
    let
        config =
            Config.init

        roomGenerator =
            Room.generate config

        modelGenerator dungeonRoom =
            constant
                { config = config
                , rooms = []
                , corridors = []
                , activeRooms = [ ( dungeonRoom, [] ) ]
                , activeCorridors = []
                }
    in
        (Room.generate config)
            `andThen` (toDungeonRoom config)
            `andThen` modelGenerator


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step ({ config, rooms, activeRooms, activeCorridors } as model) =
    case ( activeRooms, activeCorridors ) of
        ( _, activeCorridor :: restOfCorridors ) ->
            stepCorridor activeCorridor { model | activeCorridors = restOfCorridors }

        ( activeRoom :: restOfRooms, _ ) ->
            stepRoom activeRoom { model | activeRooms = restOfRooms }

        ( [], [] ) ->
            constant model


{-| Given an active room, will try to generate doors if there aren't any, or make corridors if
    there are active entrances to the room.
-}
stepRoom : ActiveRoom -> Model -> Generator Model
stepRoom ( dungeonRoom, activeEntrances ) ({ config } as model) =
    case ( dungeonRoom.room.entrances, activeEntrances ) of
        ( [], [] ) ->
            let
                newEntranceGen =
                    Room.generateEntrance dungeonRoom.room

                entranceToModel ( room', entrance' ) =
                    { model
                        | activeRooms =
                            ( DungeonRoom dungeonRoom.position room', [ entrance' ] ) :: model.activeRooms
                    }
            in
                Random.map entranceToModel newEntranceGen

        _ ->
            constant model


stepCorridor : ActiveCorridor -> Model -> Generator Model
stepCorridor corridor model =
    constant model


toDungeonRoom : Config.Model -> Room -> Generator DungeonRoom
toDungeonRoom { dungeonSize } room =
    (Dice.d2d dungeonSize dungeonSize)
        `andThen` (\pos -> Random.Extra.constant (DungeonRoom pos room))


toTiles : Model -> Tiles
toTiles model =
    let
        activeRoomsTiles =
            model.activeRooms
                |> List.map fst
                |> roomsToTiles

        dungeonRoomsTiles =
            model.rooms
                |> roomsToTiles
    in
        activeRoomsTiles ++ dungeonRoomsTiles



--------------------
-- Rooms to tiles --
--------------------


roomsToTiles : DungeonRooms -> Tiles
roomsToTiles dungeonRooms =
    let
        roomsToTiles room =
            roomToTiles room.room room.position

        tiles =
            dungeonRooms
                |> List.map roomsToTiles
                |> List.concat

        defaultPosition =
            \x -> Maybe.withDefault ( 0, 0 ) x
    in
        tiles


roomToTiles : Room -> Vector -> List Tile
roomToTiles room startPos =
    let
        toWorldPos localPos =
            Vector.add startPos localPos

        roomTileTypes =
            [ ( Tile.DarkDgn, room.floors )
            , ( Tile.Rock, List.concat room.walls )
            , ( Tile.Rock, room.corners )
            ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map toWorldPos
                |> List.map (\pos -> Tile.toTile pos tileType)

        entranceToTiles ( entranceType, pos ) =
            Tile.toTile (toWorldPos pos) (entranceToTileType entranceType)
    in
        List.concat (List.map makeTiles roomTileTypes)
            ++ List.map entranceToTiles room.entrances


entranceToTileType : EntranceType -> Tile.TileType
entranceToTileType entranceType =
    case entranceType of
        Door ->
            Tile.DoorClosed

        --BrokenDoor ->
        --    Tile.DoorBroken
        NoDoor ->
            Tile.DarkDgn
