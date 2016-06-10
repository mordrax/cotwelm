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
    , drag : Drag
    , dragging : Maybe Dragging
    , drop : Drop
    }


type alias Dragging =
    { start : Position
    , current : Position
    }


type Drag
    = DragSlot EquipmentSlot Item
    | DragPack Item.Pack Item
    | DragShop
    | NoDrag


type Drop
    = DropPack Item.Pack
    | DropEquipment EquipmentSlot
    | NoDrop


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
    = Start Item Drag Position
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
