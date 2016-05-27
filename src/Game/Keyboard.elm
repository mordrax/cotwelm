module Game.Keyboard exposing (..)

import Keyboard exposing (..)
import Dict exposing (..)
import Game.Data exposing (..)
import Vector exposing (..)


subscriptions : Sub (Maybe Msg)
subscriptions =
    presses keycodeToMsg


playerKeymap : Dict Int KeyCmd
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
        , ( 109, Map )
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


keycodeToMsg : Keyboard.KeyCode -> Maybe Msg
keycodeToMsg code =
    let
        a =
            Debug.log ("keycode: " ++ toString code) 1
    in
        playerKeymap |> Dict.get code
