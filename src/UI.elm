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


toIntWithDefault : String -> Int -> Int
toIntWithDefault str default =
    Result.withDefault default (String.toInt str)


labeledMinMaxInput : Label -> ( Int, Int ) -> (Int -> a) -> (Int -> a) -> Html a
labeledMinMaxInput label ( min, max ) minMsg maxMsg =
    div []
        [ text label
        , labeledNumber "Min" min minMsg
        , labeledNumber "Max" max maxMsg
        ]
