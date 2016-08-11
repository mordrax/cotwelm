module UI exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)


type alias Label =
    String


labeledInput : Label -> String -> (String -> a) -> Html a
labeledInput label inputValue msg =
    div [ class "ui labeled input" ]
        [ div [ class "ui label" ] [ text label ]
        , input
            [ type' "number"
            , onInput msg
            , value inputValue
            ]
            []
        ]


inputWithIncDec : Int -> (Int -> a) -> Html a
inputWithIncDec val msg =
    div [ class "ui left action right action input" ]
        [ button [ class "ui icon button" ]
            [ i [ class "minus icon" ] []
            ]
        , input [ type' "number", value (toString val) ] []
        , button [ class "ui icon button" ]
            [ i [ class "plus icon" ] []
            ]
        ]



--minMaxInput: (Int, Int) -> (String -> a) -> (String -> a) -> Html a
--minMaxInput (min, max) minMsg maxMsg =
