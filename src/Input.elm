module Input
    exposing
        ( Msg
        , Input
        , init
        , update
        , subscription
        )

import Keyboard exposing (..)
import EveryDict exposing (EveryDict)
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
      --    | KeyDir Direction
      --    | Esc
      --    | Inventory
      --    | Open
      --    | Close
      --    | Search
      --    | DisarmTrap
      --    | ViewMap
      --    | RestHP
      --    | RestMP
      --    | Examine
      --    | Get
      --    | GoDownstairs
      --    | GoUpstairs
      --    | Walk Direction
    | NoOp


type alias KeyboardXToGameActionMap =
    EveryDict ( KeyboardX.KeyChange, Bool ) Game.Types.GameAction


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
        EveryDict.get (Debug.log "Keypress: " ( keyChange, isShiftPressed )) playerKeymap
            |> Maybe.withDefault Game.Types.NoOp


playerKeymap : KeyboardXToGameActionMap
playerKeymap =
    EveryDict.fromList
        [ -- moving arrows
          ( ( KeyDown ArrowUp, False ), Game.Types.Move S )
        , ( ( KeyDown ArrowRight, False ), Game.Types.Move E )
        , ( ( KeyDown ArrowDown, False ), Game.Types.Move N )
        , ( ( KeyDown ArrowLeft, False ), Game.Types.Move W )
          -- moving numpad
        , ( ( KeyDown Numpad1, False ), Game.Types.Move NW )
        , ( ( KeyDown End, False ), Game.Types.Move NW )
        , ( ( KeyDown Numpad2, False ), Game.Types.Move N )
        , ( ( KeyDown Numpad3, False ), Game.Types.Move NE )
        , ( ( KeyDown PageDown, False ), Game.Types.Move NE )
        , ( ( KeyDown Numpad4, False ), Game.Types.Move W )
        , ( ( KeyDown Numpad5, False ), Game.Types.WaitATurn )
        , ( ( KeyDown Numpad6, False ), Game.Types.Move E )
        , ( ( KeyDown Numpad7, False ), Game.Types.Move SW )
        , ( ( KeyDown Home, False ), Game.Types.Move SW )
        , ( ( KeyDown Numpad8, False ), Game.Types.Move S )
        , ( ( KeyDown Numpad9, False ), Game.Types.Move SE )
        , ( ( KeyDown PageUp, False ), Game.Types.Move SE )
          -- walking arrows
        , ( ( KeyDown ArrowUp, True ), Game.Types.Walk S )
        , ( ( KeyDown ArrowRight, True ), Game.Types.Walk E )
        , ( ( KeyDown ArrowDown, True ), Game.Types.Walk N )
        , ( ( KeyDown ArrowLeft, True ), Game.Types.Walk W )
          -- walking numpad
        , ( ( KeyDown Numpad1, True ), Game.Types.Walk NW )
        , ( ( KeyDown End, True ), Game.Types.Walk NW )
        , ( ( KeyDown Numpad2, True ), Game.Types.Walk N )
        , ( ( KeyDown Numpad3, True ), Game.Types.Walk NE )
        , ( ( KeyDown PageDown, True ), Game.Types.Walk NE )
        , ( ( KeyDown Numpad4, True ), Game.Types.Walk W )
        , ( ( KeyDown Numpad5, True ), Game.Types.WaitUntilHealed )
        , ( ( KeyDown Numpad6, True ), Game.Types.Walk E )
        , ( ( KeyDown Numpad7, True ), Game.Types.Walk SW )
        , ( ( KeyDown Home, True ), Game.Types.Walk SW )
        , ( ( KeyDown Numpad8, True ), Game.Types.Walk S )
        , ( ( KeyDown Numpad9, True ), Game.Types.Walk SE )
        , ( ( KeyDown PageUp, True ), Game.Types.Walk SE )
          -- dungeon
        , ( ( KeyUp Escape, False ), Game.Types.BackToMapScreen )
        , ( ( KeyUp CharI, False ), Game.Types.OpenInventory )
        , ( ( KeyDown Period, True ), Game.Types.GoDownstairs )
        , ( ( KeyDown Comma, True ), Game.Types.GoUpstairs )
        , ( ( KeyDown CharG, False ), Game.Types.Pickup )
        ]



--    Dict.fromList
--        --numpad
--        [ ( 40, KeyDir N )
--        , ( 38, KeyDir S )
--        , ( 37, KeyDir W )
--        , ( 39, KeyDir E )
--        , ( 36, KeyDir SW )
--        , ( 33, KeyDir SE )
--        , ( 35, KeyDir NW )
--        , ( 34, KeyDir NE )
--          -- walking
--        , ( 104, Walk S )
--        , ( 102, Walk E )
--        , ( 98, Walk N )
--        , ( 100, Walk W )
--        , ( 103, Walk SW )
--        , ( 105, Walk SE )
--        , ( 97, Walk NW )
--        , ( 99, Walk NE )
--          -- Esc
--        , ( 27, Esc )
--          -- i
--        , ( 73, Inventory )
--        , ( 79, Open )
--        , ( 67, Close )
--        , ( 83, Search )
--        , ( 68, DisarmTrap )
--        , ( 77, ViewMap )
--        , ( 82, RestHP )
--        , ( 82, RestMP )
--        , ( 88, Examine )
--        , ( 71, Get )
--        , ( 190, GoDownstairs )
--        , ( 188, GoUpstairs )
--          --        , ( 16, ShiftDown )
--        ]
