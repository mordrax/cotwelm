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


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type alias Game =
    { name : String
    , hero : Hero
    , maps : Maps
    , level : Level
    , currentArea : Area
    , currentScreen : Screen
    , shops : Shops
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : List String
    , viewport : { x : Int, y : Int }
    , difficulty : Difficulty
    , inventory : Inventory
    , turn : Turn
    , previousState : Maybe Game
    }


{-| This is a turn based game, on each turn, things happen in one part of the
game that may be needed in another part. We keep track of these things and refresh
at the beginning of each turn.

heroMoved - Whether the hero's position has changed.
-}
type alias Turn =
    { heroMoved : Bool
    }


initTurn : Turn
initTurn =
    { heroMoved = False
    }


hasHeroMoved : Game -> Bool
hasHeroMoved ({ previousState } as game) =
    let
        heroPosition game =
            game.hero.position
    in
        previousState
            |> Maybe.map (heroPosition >> (==) heroPosition game)
            |> Maybe.withDefault False


--setHeroMoved : Bool -> Game -> Game
--setHeroMoved moved ({ turn } as game) =
--    { game | turn = { turn | heroMoved = moved } }
