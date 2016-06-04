module Game.Data exposing (..)

import Hero exposing (..)
import GameData.Building exposing (..)
import Game.Maps exposing (..)
import Mouse exposing (..)
import GameData.Item exposing (..)


type alias Model =
    { name : String
    , hero : Hero
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


type Msg
    = KeyDir Direction
    | Map
    | Inventory
    | MouseDrag Drag
    | NoOp


type Drag
    = Start Item Position
    | At Item Position
    | End Position
