module Hero.Attributes
    exposing
        ( Attributes
        , Msg
        , view
        , get
        , init
        , update
        )

--where

import Html exposing (..)
import Html.App exposing (map)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (..)


type Attributes
    = A Model


type Msg
    = Update Attribute Int


type Attribute
    = Available
    | Strength
    | Intelligence
    | Constitution
    | Dexterity


type alias Model =
    { ava : Int
    , str : Int
    , dex : Int
    , con : Int
    , int : Int
    }


get : Attributes -> { str : Int, dex : Int, int : Int, con : Int }
get (A model) =
    { str = model.str
    , dex = model.dex
    , int = model.int
    , con = model.con
    }


init : Attributes
init =
    A
        { ava = 100
        , str = 20
        , dex = 30
        , con = 40
        , int = 60
        }


update : Msg -> Attributes -> Attributes
update msg (A model) =
    case msg of
        Update attribute value ->
            case attribute of
                Available ->
                    A { model | ava = model.ava + value }

                Strength ->
                    A { model | str = model.str + value, ava = model.ava - value }

                Intelligence ->
                    A { model | int = model.int + value, ava = model.ava - value }

                Constitution ->
                    A { model | con = model.con + value, ava = model.ava - value }

                Dexterity ->
                    A { model | dex = model.dex + value, ava = model.ava - value }


view : Attributes -> Html Msg
view (A model) =
    div []
        [ viewAttribute Available model False
        , viewAttribute Strength model True
        , viewAttribute Intelligence model True
        , viewAttribute Dexterity model True
        , viewAttribute Constitution model True
        ]


viewButtons : Attribute -> Html Msg
viewButtons attribute =
    div [ class "ui buttons" ]
        [ button [ class "ui icon button", onClick (Update attribute -5) ] [ i [ class "ui icon minus" ] [] ]
        , button [ class "ui icon button", onClick (Update attribute 5) ] [ i [ class "ui icon plus" ] [] ]
        ]


viewAttribute : Attribute -> Model -> Bool -> Html Msg
viewAttribute attr model buttons =
    let
        value =
            getAttributeValue attr model

        description =
            getDescription attr value
    in
        div [ class "ui segments" ]
            [ div [ class "ui segment left aligned" ]
                [ h4 [ class "ui header" ] [ text (toString attr) ]
                , div [ class "ui indicating progress", getDataPercent value ]
                    [ div [ class "bar", (progressBarStyle value) ] []
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


tickStyle : Int -> Html.Attribute Msg
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


getAttributeValue : Attribute -> Model -> Int
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



-- Attribute descriptions


type alias Description =
    ( Int, String )


isLessThanAttribute : Int -> Description -> Bool
isLessThanAttribute val ( maxVal, _ ) =
    val < maxVal


getDescription : Attribute -> Int -> String
getDescription attribute value =
    let
        attributeDescriptions =
            descriptions attribute
    in
        (List.filter (isLessThanAttribute value) attributeDescriptions)
            |> List.head
            |> Maybe.map snd
            |> Maybe.withDefault ("No description matches the value " ++ toString value)


descriptions : Attribute -> List Description
descriptions attribute =
    case attribute of
        Available ->
            [ ( 0, "You are at your maximum potential! Go get'em tiger!" )
            , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 50, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 100, "Training is for wimps, you like pain, you like it alot!" )
            ]

        Strength ->
            [ ( 0, "Unable to push open a unlocked door whos hinges has recently been serviced with WD40." )
            , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 20, "Stunted by a career in software engineering, the mind is strong but muscle atrophy is high." )
            , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 50, "Of average strength!!!" )
            , ( 60, "Likes to gym during lunch.." )
            , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 100, "Hammers are for wimps!! You hit with your FISTS!" )
            ]

        Intelligence ->
            [ ( 0, "Dumb" )
            , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 50, "Smart enough to be at the peak of the standard distribution curve." )
            , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 100, "Smart" )
            ]

        Constitution ->
            [ ( 0, "You're having a BAD day, everyday! It's like you've got two kids that keep waking you up at night, EVERY night!" )
            , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 50, "Able to outrun a hungry hippo!" )
            , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 100, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            ]

        Dexterity ->
            [ ( 0, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 50, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            , ( 100, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
            ]
