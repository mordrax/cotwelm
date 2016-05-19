module Game.Data exposing (..)


type Msg
    = Nothing


type alias Model =
    { name : String
    , map : Map
    }


type Map
    = Village
    | OutsideVillage
    | DungeonLevelOne
    | Dungeon
