module Game.Data exposing (..)

import Hero.Data exposing (..)
import Game.Maps exposing (..)
import Dict exposing (..)


type Direction
    = Up
    | Down
    | Left
    | Right


type Msg
    = Key Direction


type alias Model =
    { name : String
    , hero : Hero.Data.Model
    , map : Game.Maps.Model
    }
