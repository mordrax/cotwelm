module Game.Data exposing (..)

import Hero exposing (..)
import GameData.Building exposing (..)
import Game.Maps exposing (..)
import GameData.Item as Item exposing (..)
import Mouse exposing (Position)
import Equipment exposing (..)


type alias Model =
    { name : String
    , hero : Hero
    , map : Game.Maps.Model
    , currentScreen : Screen
    , dnd : DnDModel
    , equipment : Equipment
    }


type alias DnDModel =
    { draggedItem : Maybe Item
    , position : Position
    , drag : Maybe Drag
    , drop : Maybe Drop
    }


type alias Drag =
    { start : Position
    , current : Position
    }


type Drop
    = DropPack Item.Pack
    | DropEquipment EquipmentSlot


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type Direction
    = Up
    | Down
    | Left
    | Right


type MouseMsg
    = Start Item Position
    | At Item Position
    | End Position
    | MouseOver Drop
    | MouseLeave


type Msg
    = KeyDir Direction
    | Map
    | Inventory
    | MouseEvent MouseMsg
    | NoOp
    | EquipmentMsg Equipment.Msg
