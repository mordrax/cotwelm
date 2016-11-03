module Game.Keyboard exposing (Msg(..), subscription)

import Keyboard exposing (..)
import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Direction as Direction exposing (Direction(..))


subscription : Sub Msg
subscription =
    Sub.batch [ --ups (keycodeToMsg playerKeymapUps)
      --, presses (keycodeToMsg playerKeymap)
      downs (keycodeToMsg playerKeymap)
    ]


type Msg
    = KeyDir Direction
    | Esc
    | Inventory
    | NoOp


type alias KeyMap =
    Dict Int Msg


playerKeymap : KeyMap
playerKeymap =
    Dict.fromList
        [ ( 87, KeyDir S )
        , ( 119, KeyDir S )
        , ( 83, KeyDir N )
        , ( 115, KeyDir N )
        , ( 65, KeyDir W )
        , ( 97, KeyDir W )
        , ( 68, KeyDir E )
        , ( 100, KeyDir E )
          --numpad
        , ( 38, KeyDir N )
        , ( 40, KeyDir S )
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
        ]


keycodeToMsg : KeyMap -> Keyboard.KeyCode -> Msg
keycodeToMsg keymap code =
    code
        |> (\x -> Dict.get x keymap)
        |> Maybe.withDefault NoOp
