module Game.Data exposing (..)

import Hero.Data exposing (..)


type Direction
    = Up
    | Down
    | Left
    | Right


type Msg
    = Key Direction


type alias Model =
    { name : String
    , map : Map
    , hero : Hero.Data.Model
    }


type Map
    = Village
    | OutsideVillage
    | DungeonLevelOne
    | Dungeon
