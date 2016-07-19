module Game.Keyboard
    exposing
        ( Msg(..)
        , Direction
        , subscriptions
        , dirToVector
        )

import Keyboard exposing (..)
import Dict exposing (..)
import Utils.Vector as Vector exposing (..)


subscriptions : List (Sub Msg)
subscriptions =
    [ --ups (keycodeToMsg playerKeymapUps)
      --, presses (keycodeToMsg playerKeymap)
      downs (keycodeToMsg playerKeymap)
    ]


type Msg
    = KeyDir Direction
    | Map
    | Inventory
    | NoOp


type Direction
    = Up
    | Down
    | Left
    | Right
    | UpLeft
    | UpRight
    | DownLeft
    | DownRight


type alias KeyMap =
    Dict Int Msg


playerKeymap : KeyMap
playerKeymap =
    Dict.fromList
        [ ( 87, KeyDir Up )
        , ( 119, KeyDir Up )
        , ( 83, KeyDir Down )
        , ( 115, KeyDir Down )
        , ( 65, KeyDir Left )
        , ( 97, KeyDir Left )
        , ( 68, KeyDir Right )
        , ( 100, KeyDir Right )
          --numpad
        , ( 38, KeyDir Up )
        , ( 40, KeyDir Down )
        , ( 37, KeyDir Left )
        , ( 39, KeyDir Right )
        , ( 36, KeyDir UpLeft )
        , ( 33, KeyDir UpRight )
        , ( 35, KeyDir DownLeft )
        , ( 34, KeyDir DownRight )
          -- Esc
        , ( 27, Map )
          -- i
        , ( 73, Inventory )
        ]


dirToVector : Direction -> Vector
dirToVector dir =
    case dir of
        Up ->
            Vector.new 0 -1

        Down ->
            Vector.new 0 1

        Left ->
            Vector.new -1 0

        Right ->
            Vector.new 1 0

        UpLeft ->
            Vector.new -1 -1

        UpRight ->
            Vector.new 1 -1

        DownLeft ->
            Vector.new -1 1

        DownRight ->
            Vector.new 1 1


keycodeToMsg : KeyMap -> Keyboard.KeyCode -> Msg
keycodeToMsg map code =
    let
        _ =
            Debug.log ("keycode: " ++ toString code) 1

        maybeMsg =
            map |> Dict.get code
    in
        case maybeMsg of
            Just msg ->
                msg

            Nothing ->
                NoOp
