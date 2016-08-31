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


type alias CorridorPoints =
    List CorridorPoint


type alias Corridors =
    List Corridor



-- active denotes those nodes which can expand to have more random stuff attached
-- on each step of the algorithm


type alias ActiveRoom =
    ( DungeonRoom, Doors )


type alias ActiveCorridor =
    ( Corridor, Vectors )



-- types


type alias Corridor =
    { points : List Vector
    , start : Door
    , end : Door
    }


type alias CorridorPoint =
    Vector


type alias Model =
    { config : Config.Model
    , rooms : DungeonRooms
    , corridors : Corridors
    , activeRooms : ActiveRooms
    , activeCorridors : Corridors
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
            `andThen` (toDungeonRoom config)
            `andThen` modelGenerator


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step model =
    constant model



--stepRooms model `andThen` stepCorridors


stepRooms : Model -> Generator Model
stepRooms model =
    constant model


stepCorridors : Model -> Generator Model
stepCorridors model =
    constant model


toDungeonRoom : Config.Model -> Room -> Generator DungeonRoom
toDungeonRoom { dungeonSize } room =
    (Dice.d2d dungeonSize dungeonSize)
        `andThen` (\pos -> Random.Extra.constant (DungeonRoom pos room))


toTiles : Model -> Tiles
toTiles model =
    []
