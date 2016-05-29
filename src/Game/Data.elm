module Game.Data exposing (..)

import Hero exposing (..)
import GameData.Building exposing (..)
import Game.Maps exposing (..)


type alias Model =
    { name : String
    , hero : Hero.Model
    , map : Game.Maps.Model
    , currentScreen : Screen
    }


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type Direction
    = Up
    | Down
    | Left
    | Right


type KeyCmd
    = KeyDir Direction
    | Map
    | Inventory


type alias Msg =
    KeyCmd
