module UI exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)


type alias Label =
    String


labeledNumber : Label -> Int -> (Int -> a) -> Html a
labeledNumber label number msg =
    div [ class "ui labeled input" ]
        [ div [ class "ui label" ] [ text label ]
        , input
            [ type' "number"
            , onInput (\input -> msg <| toIntWithDefault input 0)
            , value (toString number)
            ]
            []
        ]


labeledFloat : Label -> Float -> (Float -> a) -> Html a
labeledFloat label number msg =
    div [ class "ui labeled input" ]
        [ div [ class "ui label" ] [ text label ]
        , input
            [ type' "number"
            , onInput (\input -> msg <| toFloatWithDefault input 0)
            , value (toString number)
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


toFloatWithDefault : String -> Float -> Float
toFloatWithDefault str default =
    Result.withDefault default (String.toFloat str)


toIntWithDefault : String -> Int -> Int
toIntWithDefault str default =
    Result.withDefault default (String.toInt str)


labeled2TupleNumber : Label -> ( Int, Int ) -> (Int -> a) -> (Int -> a) -> Html a
labeled2TupleNumber label ( min, max ) minMsg maxMsg =
    div []
        [ h4 [] [ text label ]
        , div []
            [ labeledNumber "Min" min minMsg
            , labeledNumber "Max" max maxMsg
            ]
        ]
