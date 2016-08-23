module UI exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)


type alias Label =
    String


labeledNumber' : (String -> number -> number) -> Label -> number -> (number -> a) -> Html a
labeledNumber' convert label number msg =
    div [ class "ui labeled input" ]
        [ div [ class "ui label" ] [ text label ]
        , input
            [ type' "number"
            , onInput (\input -> msg <| convert input 0)
            , value (toString number)
            ]
            []
        ]


labeledNumber : Label -> Int -> (Int -> a) -> Html a
labeledNumber label number msg =
    let
        toIntWithDefault str default =
            Result.withDefault default (String.toInt str)
    in
        labeledNumber' toIntWithDefault label number msg


labeledFloat : Label -> Float -> (Float -> a) -> Html a
labeledFloat label number msg =
    let
        toFloatWithDefault str default =
            Result.withDefault default (String.toFloat str)
    in
        labeledNumber' toFloatWithDefault label number msg


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


labeled2TupleNumber : Label -> ( Int, Int ) -> (Int -> a) -> (Int -> a) -> Html a
labeled2TupleNumber label ( min, max ) minMsg maxMsg =
    div []
        [ h4 [] [ text label ]
        , div []
            [ labeledNumber "Min" min minMsg
            , labeledNumber "Max" max maxMsg
            ]
        ]
