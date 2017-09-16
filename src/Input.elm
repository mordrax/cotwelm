module Input
    exposing
        ( Input
        , Msg
        , init
        , subscription
        , update
        )

import EveryDict exposing (EveryDict)
import Game.Types
import Keyboard.Extra as KeyboardX exposing (Key(..), KeyChange(..))
import Utils.Direction as Direction exposing (Direction(..))


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


type alias KeyboardXToGameActionMap =
    EveryDict ( KeyboardX.KeyChange, Bool ) Game.Types.GameAction


update : Msg -> Input -> Game.Types.Screen -> ( Input, Maybe Game.Types.GameAction )
update msg input screen =
    case msg of
        KeyboardExtraMsg keyboardXMsg ->
            let
                ( keyboardXState_, maybeKeyChange ) =
                    KeyboardX.updateWithKeyChange keyboardXMsg input.keyboardState

                gameAction =
                    maybeKeyChange
                        |> Maybe.andThen (mapKeyboardEventToAction screen keyboardXState_)
            in
            ( { input | keyboardState = keyboardXState_ }, gameAction )


mapKeyboardEventToAction : Game.Types.Screen -> KeyboardX.State -> KeyboardX.KeyChange -> Maybe Game.Types.GameAction
mapKeyboardEventToAction screen state keyChange =
    let
        isShiftPressed =
            KeyboardX.isPressed KeyboardX.Shift state
    in
    EveryDict.get (Debug.log "Keypress: " ( keyChange, isShiftPressed )) (playerKeymap screen)


playerKeymap : Game.Types.Screen -> KeyboardXToGameActionMap
playerKeymap screen =
    case screen of
        Game.Types.MapScreen ->
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
                , ( ( KeyDown Numpad5, False ), Game.Types.WaitATurn False )
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
                , ( ( KeyDown Numpad5, True ), Game.Types.WaitATurn True )
                , ( ( KeyDown Numpad6, True ), Game.Types.Walk E )
                , ( ( KeyDown Numpad7, True ), Game.Types.Walk SW )
                , ( ( KeyDown Home, True ), Game.Types.Walk SW )
                , ( ( KeyDown Numpad8, True ), Game.Types.Walk S )
                , ( ( KeyDown Numpad9, True ), Game.Types.Walk SE )
                , ( ( KeyDown PageUp, True ), Game.Types.Walk SE )

                -- dungeon
                , ( ( KeyUp Escape, False ), Game.Types.GoToScreen Game.Types.MapScreen )
                , ( ( KeyUp CharI, False ), Game.Types.OpenInventory )
                , ( ( KeyDown Period, True ), Game.Types.GoDownstairs )
                , ( ( KeyDown Comma, True ), Game.Types.GoUpstairs )
                , ( ( KeyDown CharG, False ), Game.Types.Pickup )
                , ( ( KeyDown Period, False ), Game.Types.WaitATurn False )

                -- general
                , ( ( KeyDown CharC, False ), Game.Types.GoToScreen Game.Types.CharacterInfoScreen )
                , ( ( KeyDown CharL, False ), Game.Types.Look )
                ]

        Game.Types.InventoryScreen ->
            EveryDict.fromList
                [ ( ( KeyUp Escape, False ), Game.Types.GoToScreen Game.Types.MapScreen ) ]

        Game.Types.BuildingScreen _ ->
            EveryDict.fromList
                [ ( ( KeyUp Escape, False ), Game.Types.GoToScreen Game.Types.MapScreen ) ]

        Game.Types.RipScreen ->
            EveryDict.fromList
                [ ( ( KeyUp Escape, False ), Game.Types.GoToScreen Game.Types.MapScreen ) ]

        Game.Types.CharacterInfoScreen ->
            EveryDict.fromList
                [ ( ( KeyUp Escape, False ), Game.Types.GoToScreen Game.Types.MapScreen ) ]
