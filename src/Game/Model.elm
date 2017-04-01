module Game.Model exposing (..)

import Building exposing (Building)
import Hero exposing (Hero)
import Inventory exposing (Inventory)
import Game.Maps as Maps exposing (Maps)
import Random.Pcg as Random
import Shops exposing (Shops)
import Types exposing (..)
import Window
import Game.Level as Level exposing (Level)
import Utils.Direction as Direction exposing (Direction)


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type alias Game =
    { name : String
    , hero : Hero
    , maps : Maps
    , level : Level
    , currentScreen : Screen
    , shops : Shops
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : List String
    , viewport : { x : Int, y : Int }
    , difficulty : Difficulty
    , inventory : Inventory
    , turn : Turn
    , previousState : GameState
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


setMessages : List String -> Game -> Game
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


setPreviousState : Game -> Game -> Game
setPreviousState previousState game =
    { game | previousState = State previousState }


type GameState
    = Empty
    | State Game


{-| This is a turn based game, on each turn, things happen in one part of the
game that may be needed in another part. We keep track of these things and refresh
at the beginning of each turn.

heroMoved - Whether the hero's position has changed.
-}
type alias Turn =
    {
    }


initTurn : Turn
initTurn =
    {
    }

--
--setWalking : Maybe Direction -> Game -> Game
--setWalking walking ({ turn } as game) =
--    { game
--        | turn = { turn | walking = walking }
--    }


hasHeroMoved : Game -> Bool
hasHeroMoved ({ previousState, hero } as game) =
    let
        heroPosition game =
            hero.position
    in
        case previousState of
            Empty ->
                False

            State previousGame ->
                heroPosition previousGame == heroPosition game



--setHeroMoved : Bool -> Game -> Game
--setHeroMoved moved ({ turn } as game) =
--    { game | turn = { turn | heroMoved = moved } }
