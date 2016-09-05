module Dungeon.Corridor
    exposing
        ( Corridor
        , Corridors
        , init
          --    , addEntrance
          --    , addPoint
          --    , addPointAsEntrance
        )

import List exposing (..)
import Dict exposing (..)
import Set exposing (..)
import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)


type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { points : Vectors
    , walls : Walls
    , entrances : Entrances
    }


init : Model
init =
    { points = []
    , walls = []
    , entrances = []
    }
