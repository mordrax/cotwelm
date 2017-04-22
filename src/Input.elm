module Input
    exposing
        ( Msg
        , Input
        , init
        , update
        , subscription
        )

import Keyboard exposing (..)
import Dict exposing (Dict)
import Utils.Vector as Vector exposing (Vector)
import Utils.Direction as Direction exposing (Direction(..))
import Keyboard.Extra as KeyboardX exposing (KeyChange(..), Key(..))
import Game.Types


type alias Input =
    { keyboardState : KeyboardX.State
    }


init : Input
init =
    { keyboardState = KeyboardX.initialState
    }


subscription : Sub Msg
subscription =
    Sub.map KeyboardExtraMsg KeyboardX.subscriptions


type Msg
    = KeyboardExtraMsg KeyboardX.Msg
    | KeyDir Direction
    | Esc
    | Inventory
    | Open
    | Close
    | Search
    | DisarmTrap
    | ViewMap
    | RestHP
    | RestMP
    | Examine
    | Get
    | GoDownstairs
    | GoUpstairs
    | Walk Direction
    | NoOp


type alias KeyMap =
    Dict Int Msg


update : Msg -> Input -> ( Input, Game.Types.GameAction )
update msg input =
    case msg of
        KeyboardExtraMsg keyboardXMsg ->
            let
                ( keyboardXState_, maybeKeyChange ) =
                    KeyboardX.updateWithKeyChange keyboardXMsg input.keyboardState

                gameAction =
                    maybeKeyChange
                        |> Maybe.map (mapKeyboardEventToAction keyboardXState_)
                        |> Maybe.withDefault Game.Types.NoOp
            in
                ( { input | keyboardState = keyboardXState_ }, gameAction )

        _ ->
            ( input, Game.Types.NoOp )


mapKeyboardEventToAction : KeyboardX.State -> KeyboardX.KeyChange -> Game.Types.GameAction
mapKeyboardEventToAction state keyChange =
    let
        isShiftPressed =
            KeyboardX.isPressed KeyboardX.Shift state
    in
        case Debug.log "Key:" ( isShiftPressed, keyChange ) of
            ( True, KeyUp ArrowUp ) ->
                Game.Types.Walk N

            ( True, KeyUp ArrowRight ) ->
                Game.Types.Walk E

            ( True, KeyUp ArrowDown ) ->
                Game.Types.Walk S

            ( True, KeyUp ArrowLeft ) ->
                Game.Types.Walk W

            _ ->
                Game.Types.NoOp


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
        , ( 82, RestHP )
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
