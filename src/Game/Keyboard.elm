module Game.Keyboard exposing (Msg(..), subscription)

import Keyboard exposing (..)
import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Direction as Direction exposing (Direction(..))


subscription : Sub Msg
subscription =
    Sub.batch
        [ --ups (keycodeToMsg playerKeymapUps)
          --, presses (keycodeToMsg playerKeymap)
          downs (keycodeToMsg playerKeymap)
        ]


type Msg
    = KeyDir Direction
    | Esc
    | Inventory
    | Open
    | Close
    | Search
    | DisarmTrap
    | ViewMap
    | RestHp
    | RestMP
    | Examine
    | Get
    | GoDownstairs
    | GoUpstairs
    | NoOp


type alias KeyMap =
    Dict Int Msg


playerKeymap : KeyMap
playerKeymap =
    Dict.fromList
        --numpad
        [ ( 38, KeyDir S )
        , ( 40, KeyDir N )
        , ( 37, KeyDir W )
        , ( 39, KeyDir E )
        , ( 36, KeyDir SW )
        , ( 33, KeyDir SE )
        , ( 35, KeyDir NW )
        , ( 34, KeyDir NE )
          -- Esc
        , ( 27, Esc )
          -- i
        , ( 73, Inventory )
        , ( 79, Open )
        , ( 67, Close )
        , ( 83, Search )
        , ( 68, DisarmTrap )
        , ( 77, ViewMap )
        , ( 82, RestHp )
        , ( 82, RestMP )
        , ( 88, Examine )
        , ( 71, Get )
        , ( 190, GoDownstairs )
        , ( 188, GoUpstairs )
        ]


keycodeToMsg : KeyMap -> Keyboard.KeyCode -> Msg
keycodeToMsg keymap code =
    code
        |> (\x -> Dict.get x keymap)
        |> Maybe.withDefault NoOp
