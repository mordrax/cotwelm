module Game.Keyboard exposing (Msg(..), subscription)

import Keyboard exposing (..)
import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Direction as Direction exposing (Direction(..))


subscription : Sub Msg
subscription =
    Sub.batch
        [ --ups (keyUpToMsg playerKeymap)        ,
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
    | Walk Direction
    | NoOp


type alias KeyMap =
    Dict Int Msg


playerKeymap : KeyMap
playerKeymap =
    Dict.fromList
        --numpad
        [ ( 40, KeyDir N )
        , ( 38, KeyDir S )
        , ( 37, KeyDir W )
        , ( 39, KeyDir E )
        , ( 36, KeyDir SW )
        , ( 33, KeyDir SE )
        , ( 35, KeyDir NW )
        , ( 34, KeyDir NE )
          -- walking
        , ( 104, Walk S )
        , ( 102, Walk E )
        , ( 98, Walk N )
        , ( 100, Walk W )
        , ( 103, Walk SW )
        , ( 105, Walk SE )
        , ( 97, Walk NW )
        , ( 99, Walk NE )
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
          --        , ( 16, ShiftDown )
        ]



--keyUpToMsg : KeyMap -> Keyboard.KeyCode -> Msg
--keyUpToMsg keymap code =
--    case code of
--        16 ->
--            ShiftUp
--
--        _ ->
--            NoOp


keycodeToMsg : KeyMap -> Keyboard.KeyCode -> Msg
keycodeToMsg keymap code =
    code
        |> Debug.log "keycode: "
        |> (\x -> Dict.get x keymap)
        |> Maybe.withDefault NoOp
