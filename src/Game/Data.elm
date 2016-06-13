module Game.Data exposing (..)

import Hero exposing (..)
import GameData.Building exposing (..)
import Game.Maps exposing (..)
import GameData.Item as Item exposing (..)
import Mouse exposing (Position)
import Equipment exposing (..)
import Container exposing (..)
import DragDrop exposing (..)


type alias Model =
    { name : String
    , hero : Hero
    , map : Game.Maps.Model
    , currentScreen : Screen
    , dnd : DragDrop
    , equipment : Equipment
    }


type Drag
    = DragSlot Item EquipmentSlot
    | DragPack (IDItem Item) Item.Pack
    | DragShop Item


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


type Msg
    = KeyDir Direction
    | Map
    | Inventory
      --     | MouseEvent MouseMsg
    | NoOp
    | EquipmentMsg Equipment.Msg
