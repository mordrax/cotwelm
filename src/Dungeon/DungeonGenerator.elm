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
import Dice exposing (..)
import Dungeon.Room as Room exposing (..)
import Dungeon.DungeonRoom as DungeonRoom exposing (..)
import Random exposing (..)
import Random.Extra exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import Game.Maps as Maps exposing (..)


-- sugar types


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
            `andThen` (DungeonRoom.generate config)
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
stepRoom : ActiveRoom -> Model -> Generator Model
stepRoom (( dungeonRoom, activeEntrances ) as activeRoom) ({ config } as model) =
    let
        roomAtMaxEntrances =
            False
        --            List.length dungeonRoom.room.entrances >= config.maxEntrances
    in
        case activeEntrances of
            [] ->
                if roomAtMaxEntrances then
                    constant { model | rooms = dungeonRoom :: model.rooms }
                else
                    generateEntranceForModel dungeonRoom model

            e :: es ->
                generateCorridor e ( dungeonRoom, es ) model


generateEntranceForModel : DungeonRoom -> Model -> Generator Model
generateEntranceForModel dungeonRoom model =
    let
        entranceGenerator =
            DungeonRoom.generateEntrance dungeonRoom

        entranceToModel ( dungeonRoom', entrance' ) =
            { model
                | activeRooms =
                    ( dungeonRoom', [ entrance' ] ) :: model.activeRooms
            }
    in
        Random.map entranceToModel entranceGenerator


generateCorridor : Entrance -> ActiveRoom -> Model -> Generator Model
generateCorridor entrance ( dungeonRoom, entrances ) model =
    let
        map =
            model
                |> toTiles
                |> Maps.fromTiles

        neighbours =
            Maps.tileNeighbours map (Entrance.position entrance)

        isBlocked pos =
            Maps.getTile map pos == Nothing
    in
        case neighbours of
            --( Nothing, _, _, _ ) ->
            --    [snd position .. 0]
            _ ->
                constant { model | activeRooms = ( dungeonRoom, entrance :: entrances ) :: model.activeRooms }


dig : Vector -> Vector -> Model -> Generator Model
dig direction start model =
    constant model


stepCorridor : ActiveCorridor -> Model -> Generator Model
stepCorridor corridor model =
    constant model


toTiles : Model -> Tiles
toTiles model =
    let
        activeRoomsTiles =
            model.activeRooms
                |> List.map fst
                |> List.map DungeonRoom.roomToTiles
                |> List.concat

        dungeonRoomsTiles =
            model.rooms
                |> List.map DungeonRoom.roomToTiles
                |> List.concat
    in
        activeRoomsTiles ++ dungeonRoomsTiles
