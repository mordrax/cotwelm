module Game.Data exposing (..)

import Hero.Hero as Hero exposing (Hero)
import GameData.Building as Building exposing (..)
import Game.Maps as Maps exposing (..)
import Item.Item as Item exposing (..)
import Equipment exposing (..)
import Shop exposing (..)
import Utils.DragDrop exposing (..)
import Utils.IdGenerator exposing (..)
import Monster.Monster exposing (..)
import Random.Pcg as Random exposing (..)
import Window exposing (Size)
import GameData.Types as GDT exposing (Difficulty)
import Utils.DragDrop as DragDrop exposing (DragDrop)
import Pages.Inventory as Inventory exposing (Inventory)


type alias Model =
    { name : String
    , hero : Hero
    , maps : Maps.Maps
    , currentScreen : Screen
    , equipment : Equipment
    , shop : Shop
    , idGen : IdGenerator
    , monsters : List Monster
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : List String
    , viewportX : Int
    , viewportY : Int
    , difficulty : Difficulty
    , inventory : Inventory
    }


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building
