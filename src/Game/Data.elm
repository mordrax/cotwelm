module Game.Data exposing (..)

import Hero exposing (..)
import GameData.Building exposing (..)
import Game.Maps exposing (..)
import GameData.Item as Item exposing (..)
import Mouse exposing (Position)
import Equipment exposing (..)
import Container exposing (..)


type alias Model =
    { name : String
    , hero : Hero
    , map : Game.Maps.Model
    , currentScreen : Screen
    , dnd : DnDModel
    , equipment : Equipment
    }


type alias DnDModel =
    { dragSource : DragSource
    , dropTarget : DropTarget
    , position : Position
    , dragging : Maybe Dragging
    }


type alias Dragging =
    { start : Position
    , current : Position
    }


type DragSource
    = DragSlot Item EquipmentSlot
    | DragPack (IDItem Item) Item.Pack
    | DragShop Item
    | NoDrag


type DropTarget
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
    = Start DragSource Position
    | At DragSource Position
    | End Position
    | MouseOver DropTarget
    | MouseLeave


type Msg
    = KeyDir Direction
    | Map
    | Inventory
    | MouseEvent MouseMsg
    | NoOp
    | EquipmentMsg Equipment.Msg
