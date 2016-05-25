module Game.Data exposing (..)

import Hero.Data exposing (..)
import Dict exposing (..)
import GameData.Tile exposing (..)


type Direction
    = Up
    | Down
    | Left
    | Right


type Msg
    = Key Direction


type Area
    = Village
    | Farm
    | DungeonLevelOne
    | DungeonLevel Int


type alias Map =
    Dict String Tile
