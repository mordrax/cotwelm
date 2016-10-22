module Game.Keyboard exposing (Msg(..), subscriptions)

import Keyboard exposing (..)
import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.CompassDirection as CompassDirection exposing (CompassDirection(..))


subscriptions : List (Sub Msg)
subscriptions =
    [ --ups (keycodeToMsg playerKeymapUps)
      --, presses (keycodeToMsg playerKeymap)
      downs (keycodeToMsg playerKeymap)
    ]


type Msg
    = KeyDir CompassDirection
    | Map
    | Inventory
    | NoOp


type alias KeyMap =
    Dict Int Msg


playerKeymap : KeyMap
playerKeymap =
    Dict.fromList
        [ ( 87, KeyDir N )
        , ( 119, KeyDir N )
        , ( 83, KeyDir S )
        , ( 115, KeyDir S )
        , ( 65, KeyDir W )
        , ( 97, KeyDir W )
        , ( 68, KeyDir E )
        , ( 100, KeyDir E )
          --numpad
        , ( 38, KeyDir N )
        , ( 40, KeyDir S )
        , ( 37, KeyDir W )
        , ( 39, KeyDir E )
        , ( 36, KeyDir NW )
        , ( 33, KeyDir NE )
        , ( 35, KeyDir SW )
        , ( 34, KeyDir SE )
          -- Esc
        , ( 27, Map )
          -- i
        , ( 73, Inventory )
        ]


keycodeToMsg : KeyMap -> Keyboard.KeyCode -> Msg
keycodeToMsg map code =
    let
        maybeMsg =
            Dict.get code map
    in
        case maybeMsg of
            Just msg ->
                msg

            Nothing ->
                NoOp
