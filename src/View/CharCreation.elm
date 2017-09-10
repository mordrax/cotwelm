module View.CharCreation exposing (view)

import Attributes
import CharCreation exposing (CharCreation, Msg(..))
import Colors
import Css exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Types exposing (..)
import View.Difficulty
import View.UI as UI


styles : List Mixin -> Attribute msg
styles =
    asPairs >> HA.style


view : CharCreation -> Html Msg
view charCreation =
    let
        bgStyle =
            [ styles [ backgroundColor Colors.black ] ]
    in
    div
        [ HA.class "charCreation" ]
        [ viewName charCreation.name
        , Attributes.view charCreation.attributes |> Html.map Attribute
        , viewGenderAndAvatar charCreation.gender
        , viewDifficulty charCreation.difficulty
        , viewButtons
        ]


viewGenderAndAvatar : Gender -> Html Msg
viewGenderAndAvatar gender =
    div
        [ HA.class "gender-avatar"
        ]
        [ viewGender gender
        , viewAvatar gender
        , viewCustomAvatar
        ]


viewName : String -> Html Msg
viewName playerName =
    div [ HA.class "name" ]
        [ span [ HA.class "name__label" ]
            [ Html.text <| "Character" ++ UI.nbsp ++ "name:" ++ UI.nbsp ]
        , viewNameInput playerName
        ]


viewNameInput : String -> Html Msg
viewNameInput playerName =
    input
        [ HA.name "name"
        , HA.placeholder "What word did your mother utter as you came kicking and screaming into this world?"
        , HE.onInput Name
        , HA.value playerName
        , HA.class "name__input"
        ]
        []



-- Gender


viewAvatar : Gender -> Html never
viewAvatar gender =
    let
        heroBackgroundPosition =
            if gender == Male then
                backgroundPosition2 zero zero
            else
                backgroundPosition2 (px -32) zero
    in
    div [ HA.class "avatar", styles [ heroBackgroundPosition ] ] []


viewCustomAvatar : Html never
viewCustomAvatar =
    div [] [ Html.text "No custom avatar" ]


viewGender : Gender -> Html Msg
viewGender gender =
    UI.labeledBox ("Character" ++ UI.nbsp ++ "Gender")
        [ div
            [ styles [ marginRight (px 15) ] ]
            [ UI.radioBtn "gender" (Male == gender) (Gender Male)
            , Html.text "Male"
            ]
        , div []
            [ UI.radioBtn "gender" (Female == gender) (Gender Female)
            , Html.text "Female"
            ]
        ]



-- Difficulty


viewDifficulty : Difficulty -> Html Msg
viewDifficulty difficulty =
    let
        spacing children =
            div [ styles [ marginTop (px 10) ] ] children

        easy =
            div []
                [ View.Difficulty.easy
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Easy) (Difficulty Easy)
                    , Html.text (UI.nbsp ++ "Easy")
                    ]
                ]

        intermediate =
            div []
                [ View.Difficulty.intermediate
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Intermediate) (Difficulty Intermediate)
                    , Html.text "Intermediate"
                    ]
                ]

        hard =
            div []
                [ View.Difficulty.hard
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Hard) (Difficulty Hard)
                    , Html.text "Difficult"
                    ]
                ]

        impossible =
            div []
                [ View.Difficulty.impossible
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Impossible) (Difficulty Impossible)
                    , Html.text "Impossible"
                    ]
                ]
    in
    UI.labeledBox "Game Difficulty"
        [ easy
        , intermediate
        , hard
        , impossible
        ]


viewButtons : Html Msg
viewButtons =
    div
        [ styles
            [ margin2 (px 20) zero
            , displayFlex
            , justifyContent spaceBetween
            ]
        , HA.class "char-creation-buttons"
        ]
        [ UI.btn "OK" StartGame
        , UI.btn "Cancel" StartGame
        , UI.btn "View Icon" StartGame
        , UI.btn "Help" StartGame
        ]
