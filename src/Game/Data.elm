module Game.Data exposing (..)

import Hero exposing (..)
import GameData.Building as Building exposing (..)
import Game.Maps as Maps exposing (..)
import Item.Item as Item exposing (..)
import Equipment exposing (..)
import Shop.Shop as Shop exposing (..)
import Utils.DragDrop exposing (..)
import Utils.IdGenerator exposing (..)
import Monster.Monster exposing (..)
import Random exposing (..)
import Window exposing (Size)


type alias Model =
    { name : String
    , hero : Hero
    , maps : Maps.Maps
    , currentScreen : Screen
    , dnd : DragDrop Drag Drop
    , equipment : Equipment
    , shop : Shop.Shop
    , idGen : IdGenerator
    , monsters : List Monster
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : List String
    , viewportX: Int
    , viewportY: Int
    }


type Drag
    = DragSlot Item EquipmentSlot
    | DragPack Item (Item.Pack Item)
    | DragShop Item Shop


type Drop
    = DropPack (Item.Pack Item)
    | DropEquipment EquipmentSlot
    | DropShop Shop


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type InventoryMsg source target
    = InventoryMsg
    | DnDMsg (DragDropMsg source target)
