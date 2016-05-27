module Game.Data exposing (..)

import Hero.Data exposing (..)
import GameData.Building exposing (..)
import Game.Maps exposing (..)


type alias Model =
    { name : String
    , hero : Hero.Data.Model
    , map : Game.Maps.Model
    , currentBuilding : Maybe GameData.Building.Building
    }


type Direction
    = Up
    | Down
    | Left
    | Right


type KeyCmd
    = KeyDir Direction
    | Map


type alias Msg =
    KeyCmd
