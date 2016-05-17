module CharCreation.Difficulty exposing (view)

-- where

import CharCreation.Data exposing (..)
import Html exposing (..)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)


view : Difficulty -> Html Msg
view difficulty =
    let
        activeEasy =
            if difficulty == Easy then
                "active"
            else
                ""

        activeIntermediate =
            if difficulty == Intermediate then
                "active"
            else
                ""

        activeHard =
            if difficulty == Hard then
                "active"
            else
                ""

        activeImpossible =
            if difficulty == Impossible then
                "active"
            else
                ""
    in
        div [ class "four ui buttons" ]
            [ easyButton activeEasy
            , intermediateButton activeIntermediate
            , hardButton activeHard
            , impossibleButton activeImpossible
            ]


iconButton : Difficulty -> String -> List (Html Msg) -> Html Msg
iconButton diff active a =
    button [ class ("ui icon button " ++ active), onClick (Difficulty diff) ] a


easyButton : String -> Html Msg
easyButton active =
    iconButton Easy
        active
        [ div [] [ i [ class "huge green circle icon" ] [] ]
        , label [] [ text "Easy" ]
        ]


intermediateButton : String -> Html Msg
intermediateButton active =
    iconButton Intermediate
        active
        [ div [] [ i [ class "huge blue square icon" ] [] ]
        , label [] [ text "Intermediate" ]
        ]


hardButton : String -> Html Msg
hardButton active =
    iconButton Hard
        active
        [ div [] [ i [ class "huge black square icon" ] [] ]
        , label [] [ text "Hard" ]
        ]


impossibleButton : String -> Html Msg
impossibleButton active =
    iconButton Impossible
        active
        [ div [] [ i [ class "huge yellow warning sign icon" ] [] ]
        , label [] [ text "Impossible" ]
        ]
