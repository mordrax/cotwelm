module UI exposing (..)

import Colors
import Css exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import String


styles : List Mixin -> Attribute msg
styles =
    asPairs >> HA.style


addStyle : List Mixin -> Mixin -> Attribute msg
addStyle currentStyles style =
    HA.style (asPairs <| style :: currentStyles)


type alias Label =
    String


nbsp : String
nbsp =
    " "


labeledNumber_ : (String -> number -> number) -> Label -> number -> (number -> a) -> Html a
labeledNumber_ convert label number msg =
    labeledNumberWithStep convert label number 1.0 msg


labeledNumberWithStep :
    (String -> number -> number)
    -> Label
    -> number
    -> Float
    -> (number -> a)
    -> Html a
labeledNumberWithStep convert label number inc msg =
    div [ HA.class "ui labeled input" ]
        [ div [ HA.class "ui label" ] [ Html.text label ]
        , input
            [ HA.type_ "number"
            , HA.step (toString inc)
            , HE.onInput (\input -> msg <| convert input 0)
            , HA.value (toString number)
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
    div [ HA.class "ui left action right action input" ]
        [ button [ HA.class "ui icon button" ]
            [ i [ HA.class "minus icon" ] []
            ]
        , input [ HA.type_ "number", HA.value (toString val) ] []
        , button [ HA.class "ui icon button" ]
            [ i [ HA.class "plus icon" ] []
            ]
        ]


labeled2TupleNumber : Label -> ( Int, Int ) -> (Int -> a) -> (Int -> a) -> Html a
labeled2TupleNumber label ( min, max ) minMsg maxMsg =
    div []
        [ h4 [] [ Html.text label ]
        , div []
            [ labeledNumber "Min" min minMsg
            , labeledNumber "Max" max maxMsg
            ]
        ]


labeledBox : String -> List (Html msg) -> Html msg
labeledBox label children =
    let
        boxLabel =
            div
                [ styles
                    [ position absolute
                    , zIndex (int 1)
                    , top (px -10)
                    , backgroundColor (rgb 255 255 255)
                    , padding2 zero (px 3)
                    ]
                ]
                [ Html.text label ]
    in
    div
        [ styles
            [ border3 (px 1) solid Colors.gray
            , position relative
            , displayFlex
            , justifyContent spaceBetween
            , padding2 (px 15) (px 10)
            ]
        ]
        (boxLabel :: children)


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
                [ HA.selected isSelected
                , HA.value (encoder item)
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
            [ HE.on "change" msgDecoder ]


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


btn : String -> msg -> Html msg
btn txt msg =
    button [ HE.onClick msg ] [ Html.text txt ]


radioBtn : String -> Bool -> msg -> Html msg
radioBtn name checked msg =
    input [ HA.type_ "radio", HA.name name, HA.checked checked, HE.onClick msg ] []


type alias Event =
    { target : Target
    }


type alias Target =
    { value : String
    }


scaledBar : Int -> Html never
scaledBar valueOf100 =
    viewBar Colors.blue
        valueOf100
        [ viewBarScale 25
        , viewBarScale 50
        , viewBarScale 75
        ]


greenScaledBar : Int -> Html never
greenScaledBar valueOf100 =
    viewBar Colors.chartreuse
        valueOf100
        [ viewBarScale 25
        , viewBarScale 50
        , viewBarScale 75
        ]


viewBar : Color -> Int -> List (Html never) -> Html never
viewBar barColor valueOf100 children =
    let
        inverseOfValue =
            98 - toFloat valueOf100

        viewBlueBar =
            div
                [ styles
                    [ position absolute
                    , zIndex (int 0)
                    , width (px 23)
                    , height (px (toFloat valueOf100))
                    , top (px inverseOfValue)
                    , backgroundColor barColor
                    ]
                ]
                []
    in
    div
        [ styles
            [ border3 (px 1) solid (rgb 0 0 0)
            , width (px 25)
            , height (px 100)
            , position relative
            , zIndex (int 1)
            , overflow hidden
            ]
        ]
        (viewBlueBar :: children)


viewBarScale : Float -> Html never
viewBarScale yOffset =
    i
        [ styles
            [ width (pct 100)
            , position absolute
            , top (px yOffset)
            , borderTop3 (px 1) solid (rgb 0 0 0)
            ]
        ]
        []
