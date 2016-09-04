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


type alias ActiveCorridors =
    List ActiveCorridor


type alias Corridors =
    List Corridor



-- active denotes those nodes which can expand to have more random stuff attached
-- on each step of the algorithm


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
    , activeRooms : Rooms
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
                constant { model | activeRooms = room :: model.activeRooms }


dig : Vector -> Vector -> Model -> Generator Model
dig direction start model =
    constant model


stepCorridor : ActiveCorridor -> Model -> Generator Model
stepCorridor corridor model =
    constant model


toTiles : Model -> Tiles
toTiles model =
    (model.rooms ++ model.activeRooms)
        |> List.map Room.toTiles
        |> List.concat
