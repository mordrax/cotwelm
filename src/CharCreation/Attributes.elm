module CharCreation.Attributes exposing (..)

--where

import Html exposing (..)
import Html.App exposing (map)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (..)
import CharCreation.Data as Data exposing (..)
import CharCreation.AttributeDescriptions exposing (getDescription)


initModel : AttributeModel
initModel =
    { ava = 100
    , str = 20
    , dex = 30
    , con = 40
    , int = 60
    }


update : Data.Attribute -> Int -> AttributeModel -> AttributeModel
update attr val model =
    case attr of
        Available ->
            { model | ava = model.ava + val }

        Strength ->
            { model | str = model.str + val, ava = model.ava - val }

        Intelligence ->
            { model | int = model.int + val, ava = model.ava - val }

        Constitution ->
            { model | con = model.con + val, ava = model.ava - val }

        Dexterity ->
            { model | dex = model.dex + val, ava = model.ava - val }


view : AttributeModel -> Html Msg
view model =
    div []
        [ viewAttribute Available model False
        , viewAttribute Strength model True
        , viewAttribute Intelligence model True
        , viewAttribute Dexterity model True
        , viewAttribute Constitution model True
        ]


viewButtons : Data.Attribute -> Html Msg
viewButtons attr =
    div [ class "ui buttons" ]
        [ button [ class "ui icon button", onClick (Attributes attr -5) ] [ i [ class "ui icon minus" ] [] ]
        , button [ class "ui icon button", onClick (Attributes attr 5) ] [ i [ class "ui icon plus" ] [] ]
        ]


viewAttribute : Data.Attribute -> Data.AttributeModel -> Bool -> Html Msg
viewAttribute attr model buttons =
    let
        val =
            getAttributeValue attr model

        description =
            getAttributeDescription attr val
    in
        div [ class "ui segments" ]
            [ div [ class "ui segment left aligned" ]
                [ h4 [ class "ui header" ] [ text (toString attr) ]
                , div [ class "ui indicating progress", getDataPercent val ]
                    [ div [ class "bar", (progressBarStyle val) ] []
                    , div [ class "tick", (tickStyle 25) ] []
                    , div [ class "tick", (tickStyle 50) ] []
                    , div [ class "tick", (tickStyle 75) ] []
                    , div [ class "label" ] [ text description ]
                    ]
                , if buttons then
                    viewButtons attr
                  else
                    div [] []
                ]
            ]


progressBarStyle : Int -> Html.Attribute Msg
progressBarStyle val =
    style
        [ ( "width", (toString val) ++ "%" )
        , ( "min-width", "0" )
        ]

tickStyle: Int -> Html.Attribute Msg
tickStyle val =
    style
        [ ( "width", (toString val) ++ "%" )
        , ( "min-width", "0" )
        , ( "border-right", "1px solid gray" )
        , ( "height", "1.75em" )
        , ( "position", "absolute" )
        , ( "top", "0" )
        , ( "left", "0" )
        ]

getAttributeValue : Data.Attribute -> AttributeModel -> Int
getAttributeValue attr model =
    case attr of
        Available ->
            model.ava

        Strength ->
            model.str

        Intelligence ->
            model.int

        Constitution ->
            model.con

        Dexterity ->
            model.dex


getDataPercent : Int -> Html.Attribute Msg
getDataPercent val =
    attribute "data-percent" (toString val)


getAttributeDescription : Data.Attribute -> Int -> String
getAttributeDescription attr val =
    getDescription attr val
