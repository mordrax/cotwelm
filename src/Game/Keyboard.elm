module Game.Keyboard exposing (..)

import Keyboard exposing (..)
import Dict exposing (..)
import Game.Data exposing (..)
import Vector exposing (..)


subscriptions : List (Sub Msg)
subscriptions =
    [ ups (keycodeToMsg playerKeymapUps), presses (keycodeToMsg playerKeymap) ]


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
        ]


playerKeymapUps : KeyMap
playerKeymapUps =
    Dict.fromList
        [ -- Esc
          ( 27, Map )
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


keycodeToMsg : KeyMap -> Keyboard.KeyCode -> Msg
keycodeToMsg map code =
    let
        a =
            Debug.log ("keycode: " ++ toString code) 1

        maybeMsg =
            map |> Dict.get code
    in
        case maybeMsg of
            Just msg ->
                msg

            Nothing ->
                NoOp
