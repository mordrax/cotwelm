module Game.Model exposing (..)

import Game.Level as Level exposing (Level)
import Game.Maps as Maps exposing (Maps)
import Game.Types exposing (..)
import Hero exposing (Hero)
import Input exposing (Input)
import Inventory exposing (Inventory)
import Message exposing (Messages)
import Monster exposing (Monster)
import Random.Pcg as Random
import Shops exposing (Shops)
import Types exposing (..)
import Utils.Vector as Vector exposing (Vector)
import Window


type Msg
    = InputMsg Input.Msg
    | InventoryMsg Inventory.Msg
    | WindowSize Window.Size
    | ClickPosition Vector
    | PathTo (List Vector) ClickedStairs
    | GameAction GameAction
    | Died
    | NoOp


type alias ClickedStairs =
    Bool


type alias Game =
    { name : String
    , hero : Hero
    , maps : Maps
    , level : Level
    , currentScreen : Screen
    , shops : Shops
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : Messages
    , viewport : { x : Int, y : Int }
    , difficulty : Difficulty
    , inventory : Inventory
    , turn : Turn
    , input : Input
    , lastMonsterToAttackHero : Maybe Monster
    , looking : Bool
    }


setName : String -> Game -> Game
setName name game =
    { game | name = name }


setHero : Hero -> Game -> Game
setHero hero game =
    { game | hero = hero }


setMaps : Maps -> Game -> Game
setMaps maps game =
    { game | maps = maps }


setLevel : Level -> Game -> Game
setLevel level game =
    { game | level = level }


setCurrentScreen : Screen -> Game -> Game
setCurrentScreen currentScreen game =
    { game | currentScreen = currentScreen }


setShops : Shops -> Game -> Game
setShops shops game =
    { game | shops = shops }


setSeed : Random.Seed -> Game -> Game
setSeed seed game =
    { game | seed = seed }


setWindowSize : Window.Size -> Game -> Game
setWindowSize windowSize game =
    { game | windowSize = windowSize }


setMessages : Messages -> Game -> Game
setMessages messages game =
    { game | messages = messages }


setViewport : { x : Int, y : Int } -> Game -> Game
setViewport viewport game =
    { game | viewport = viewport }


setDifficulty : Difficulty -> Game -> Game
setDifficulty difficulty game =
    { game | difficulty = difficulty }


setInventory : Inventory -> Game -> Game
setInventory inventory game =
    { game | inventory = inventory }


setTurn : Turn -> Game -> Game
setTurn turn game =
    { game | turn = turn }


type GameState
    = Empty
    | State Game


{-| This is a turn based game, on each turn, things happen in one part of the
game that may be needed in another part. We keep track of these things and refresh
at the beginning of each turn.

heroMoved - Whether the hero's position has changed.

-}
type alias Turn =
    Int


initTurn : Turn
initTurn =
    0
