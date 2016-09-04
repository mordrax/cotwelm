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
    ( Room, Entrances )


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
    , rooms : Rooms
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

        modelGenerator room =
            constant
                { config = config
                , rooms = []
                , corridors = []
                , activeRooms = [ ( room, [] ) ]
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
stepRoom : ActiveRoom -> Model -> Generator Model
stepRoom (( room, activeEntrances ) as activeRoom) ({ config } as model) =
    let
        roomAtMaxEntrances =
            False

        --            List.length room.entrances >= config.maxEntrances
    in
        case activeEntrances of
            [] ->
                if roomAtMaxEntrances then
                    constant { model | rooms = room :: model.rooms }
                else
                    generateEntranceForModel room model

            e :: es ->
                generateCorridor e ( room, es ) model


generateEntranceForModel : Room -> Model -> Generator Model
generateEntranceForModel room model =
    let
        entranceGenerator =
            Room.generateEntrance room

        entranceToModel ( room', entrance' ) =
            { model
                | activeRooms =
                    ( room', [ entrance' ] ) :: model.activeRooms
            }
    in
        Random.map entranceToModel entranceGenerator


generateCorridor : Entrance -> ActiveRoom -> Model -> Generator Model
generateCorridor entrance ( room, entrances ) model =
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
                constant { model | activeRooms = ( room, entrance :: entrances ) :: model.activeRooms }


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
                |> List.map Room.toTiles
                |> List.concat

        roomsTiles =
            model.rooms
                |> List.map Room.toTiles
                |> List.concat
    in
        activeRoomsTiles ++ roomsTiles
