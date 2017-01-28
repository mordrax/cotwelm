module UI exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)
import Json.Decode as JD
import Json.Decode.Pipeline as JP


type alias Label =
    String


labeledNumber_ : (String -> number -> number) -> Label -> number -> (number -> a) -> Html a
labeledNumber_ convert label number msg =
    labeledNumberWithStep convert label number 1.0 msg


labeledNumberWithStep : (String -> number -> number) -> Label -> number -> Float -> (number -> a) -> Html a
labeledNumberWithStep convert label number inc msg =
    div [ class "ui labeled input" ]
        [ div [ class "ui label" ] [ text label ]
        , input
            [ type_ "number"
            , step (toString inc)
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
        labeledNumber_ toIntWithDefault label number msg


labeledFloat : Label -> Float -> (Float -> a) -> Html a
labeledFloat label number msg =
    let
        toFloatWithDefault str default =
            Result.withDefault default (String.toFloat str)
    in
        labeledNumberWithStep toFloatWithDefault label number 0.1 msg


inputWithIncDec : Int -> (Int -> a) -> Html a
inputWithIncDec val msg =
    div [ class "ui left action right action input" ]
        [ button [ class "ui icon button" ]
            [ i [ class "minus icon" ] []
            ]
        , input [ type_ "number", value (toString val) ] []
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


list :
    (item -> Html msg)
    -> (item -> msg)
    -> ( item -> String, String -> item )
    -> List ( item, Bool )
    -> Html msg
list display selectAction ( encoder, decoder ) items =
    let
        renderItem ( item, isSelected ) =
            Html.option
                [ selected isSelected
                , value (encoder item)
                ]
                [ display item ]

        eventToString =
            .target >> .value >> decoder

        msgDecoder =
            changeEventDecoder
                |> JD.map eventToString
                |> JD.map selectAction
    in
        items
            |> List.map renderItem
            |> Html.select
                [ on "change" msgDecoder ]


changeEventDecoder : JD.Decoder Event
changeEventDecoder =
    let
        targetDecoder =
            JP.decode Target |> JP.required "value" JD.string

        eventDecoder =
            JP.decode Event |> JP.required "target" targetDecoder
    in
        JP.decode Event
            |> JP.required "target" targetDecoder


type alias Event =
    { target : Target
    }


type alias Target =
    { value : String
    }
