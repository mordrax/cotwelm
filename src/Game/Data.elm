module Game.Data exposing (..)

import Hero.Data exposing (..)


type Msg
    = Nothing


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
