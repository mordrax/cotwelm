module Attributes
    exposing
        ( Attributes
        , Attribute(..)
        , Msg
        , init
        , initCustom
        , multiplier
        , set
        , update
        , view
        )

{-| Attributes form the basic building blocks of the hero/monsters. For any given humanoid, they range from 0 to 100 where 50 is 'average', 0 means disabled and 100 is the peak of
what the humanoid form can sustain.

This means that monsters such as giants, dragons, ghosts can go above or below these numbers, using 50 as a baseline for comparison.

-}

import Html exposing (..)
import Html.Events as HE
import Html.Attributes as HA


type Msg
    = Update Attribute Int


type Attribute
    = Available
    | Strength
    | Intelligence
    | Constitution
    | Dexterity


type alias Attributes =
    { ava : Int
    , str : Int
    , dex : Int
    , con : Int
    , int : Int
    }


init : Attributes
init =
    { ava = 100
    , str = 20
    , dex = 30
    , con = 40
    , int = 60
    }


initCustom : Int -> Int -> Int -> Int -> Attributes
initCustom str dex con int =
    { ava = 0
    , str = str
    , dex = dex
    , con = con
    , int = int
    }


update : Msg -> Attributes -> Attributes
update msg model =
    case msg of
        Update attribute value ->
            case attribute of
                Available ->
                    { model | ava = model.ava + value }

                Strength ->
                    { model | str = model.str + value, ava = model.ava - value }

                Intelligence ->
                    { model | int = model.int + value, ava = model.ava - value }

                Constitution ->
                    { model | con = model.con + value, ava = model.ava - value }

                Dexterity ->
                    { model | dex = model.dex + value, ava = model.ava - value }

multiplier : ( Attribute, Float ) -> Attributes -> Attributes
multiplier ( attribute, value ) model =
    case attribute of
        Available ->
            { model | ava = floor (toFloat model.ava * value) }

        Strength ->
            { model | str = floor (toFloat model.str * value) }

        Intelligence ->
            { model | int = floor (toFloat model.int * value) }

        Constitution ->
            { model | con = floor (toFloat model.con * value) }

        Dexterity ->
            { model | dex = floor (toFloat model.dex * value) }


set : ( Attribute, Int ) -> Attributes -> Attributes
set ( attribute, value ) model =
    case attribute of
        Available ->
            { model | ava = value }

        Strength ->
            { model | str = value }

        Intelligence ->
            { model | int = value }

        Constitution ->
            { model | con = value }

        Dexterity ->
            { model | dex = value }


view : Attributes -> Html Msg
view model =
    div []
        [ viewAttribute Available model False
        , viewAttribute Strength model True
        , viewAttribute Intelligence model True
        , viewAttribute Dexterity model True
        , viewAttribute Constitution model True
        ]


viewButtons : Attribute -> Html Msg
viewButtons attribute =
    div [ HA.class "ui buttons" ]
        [ button [ HA.class "ui icon button", HE.onClick (Update attribute -5) ] [ i [ HA.class "ui icon minus" ] [] ]
        , button [ HA.class "ui icon button", HE.onClick (Update attribute 5) ] [ i [ HA.class "ui icon plus" ] [] ]
        ]


viewAttribute : Attribute -> Attributes -> Bool -> Html Msg
viewAttribute attr model buttons =
    let
        value =
            getAttributeValue attr model

        description =
            getDescription attr value
    in
        div [ HA.class "ui segments" ]
            [ div [ HA.class "ui segment left aligned" ]
                [ h4 [ HA.class "ui header" ] [ text (toString attr) ]
                , div [ HA.class "ui indicating progress", getDataPercent value ]
                    [ div [ HA.class "bar", (progressBarStyle value) ] []
                    , div [ HA.class "tick", (tickStyle 25) ] []
                    , div [ HA.class "tick", (tickStyle 50) ] []
                    , div [ HA.class "tick", (tickStyle 75) ] []
                    , div [ HA.class "label" ] [ text description ]
                    ]
                , if buttons then
                    viewButtons attr
                  else
                    div [] []
                ]
            ]


progressBarStyle : Int -> Html.Attribute Msg
progressBarStyle val =
    HA.style
        [ ( "width", (toString val) ++ "%" )
        , ( "min-width", "0" )
        ]


tickStyle : Int -> Html.Attribute Msg
tickStyle val =
    HA.style
        [ ( "width", (toString val) ++ "%" )
        , ( "min-width", "0" )
        , ( "border-right", "1px solid gray" )
        , ( "height", "1.75em" )
        , ( "position", "absolute" )
        , ( "top", "0" )
        , ( "left", "0" )
        ]


getAttributeValue : Attribute -> Attributes -> Int
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
    HA.attribute "data-percent" (toString val)



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
            |> Maybe.map Tuple.second
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
