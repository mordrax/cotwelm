module Attributes
    exposing
        ( Attribute(..)
        , Attributes
        , Msg
        , init
        , initCustom
        , scale
        , set
        , update
        , view
        )

{-| Attributes form the basic building blocks of the hero/monsters. For any given humanoid, they range from 0 to 100 where 50 is 'average', 0 means disabled and 100 is the peak of
what the humanoid form can sustain.

This means that monsters such as giants, dragons, ghosts can go above or below these numbers, using 50 as a baseline for comparison.

-}

import Colors
import Css exposing (..)
import Dom.Scroll
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Task


styles =
    asPairs >> HA.style


addStyle currentStyles style =
    HA.style (asPairs <| style :: currentStyles)


type Msg
    = Update Attribute Int
    | Scroll Attribute Int
    | NoOp


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


ids : Attribute -> String
ids =
    toString


init : ( Attributes, Cmd Msg )
init =
    let
        attributes =
            { ava = 100
            , str = 50
            , dex = 50
            , con = 50
            , int = 50
            }

        ignoreResult _ =
            NoOp

        cmds =
            Task.sequence
                [ Dom.Scroll.toY (ids Strength) (toFloat (attributes.str * 10))
                , Dom.Scroll.toY (ids Dexterity) (toFloat (attributes.dex * 10))
                , Dom.Scroll.toY (ids Intelligence) (toFloat (attributes.int * 10))
                , Dom.Scroll.toY (ids Constitution) (toFloat (attributes.con * 10))
                ]
                |> Task.attempt ignoreResult
    in
    ( attributes
    , cmds
    )


initCustom : Int -> Int -> Int -> Int -> Attributes
initCustom str dex con int =
    { ava = 0
    , str = str
    , dex = dex
    , con = con
    , int = int
    }


{-| Will increase the given attribute by `min ( value, available attribute points )`
-}
updateAsMuchAsAvailable : Attribute -> Int -> Attributes -> Attributes
updateAsMuchAsAvailable attr val attributes =
    let
        actualPointsAdded =
            min val attributes.ava
    in
    attributes
        |> addAttribute attr actualPointsAdded
        |> addAttribute Available -actualPointsAdded


addAttribute : Attribute -> Int -> Attributes -> Attributes
addAttribute attr val attributes =
    case attr of
        Strength ->
            { attributes | str = attributes.str + val }

        Intelligence ->
            { attributes | int = attributes.int + val }

        Constitution ->
            { attributes | con = attributes.con + val }

        Dexterity ->
            { attributes | dex = attributes.dex + val }

        Available ->
            { attributes | ava = attributes.ava + val }


update : Msg -> Attributes -> Attributes
update msg attributes =
    case msg of
        Update attribute value ->
            updateAsMuchAsAvailable attribute value attributes

        Scroll attribute value ->
            let
                valueDelta =
                    value - getAttributeValue attribute attributes
            in
            updateAsMuchAsAvailable attribute valueDelta attributes

        NoOp ->
            attributes


scale : Float -> Float -> Float -> Float -> Attributes -> Attributes
scale str dex con int attributes =
    let
        scaleFn factor attr =
            floor (factor * toFloat attr)
    in
    { attributes
        | str = scaleFn str attributes.str
        , int = scaleFn int attributes.int
        , con = scaleFn con attributes.con
        , dex = scaleFn dex attributes.dex
    }


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
    div
        [ styles
            [ displayFlex
            , justifyContent spaceBetween
            ]
        ]
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

        viewBarAndScroll =
            div
                [ styles
                    [ displayFlex
                    , justifyContent center
                    ]
                ]
                [ viewBarWithScale value
                , viewScroll attr value
                ]

        viewAttributeLabel =
            div [] [ Html.text (toString attr) ]
    in
    case attr of
        Available ->
            div []
                [ viewBar value []
                ]

        _ ->
            div []
                [ viewBarAndScroll
                , viewAttributeLabel

                --            , div [ HA.class "ui indicating progress", getDataPercent value ]
                ]


viewScroll : Attribute -> Int -> Html Msg
viewScroll attr valueOf100 =
    let
        inverseValue =
            100 - toFloat valueOf100

        inputToInt strVal =
            case String.toInt strVal of
                Err str ->
                    Debug.log ("Attributes.viewScroll: Cannot convert the string to int " ++ str) 0

                Ok val ->
                    val
    in
    div
        [ styles
            [ position relative
            , height (px 100)
            , width (px 20)
            ]
        ]
        [ input
            [ styles
                [ position absolute
                , height (px 20)
                , width (px 85)
                , transform (rotate <| deg 270)
                , top (px 36)
                , left (px -25)
                ]
            , HE.onInput (inputToInt >> Scroll attr)
            , HA.id (toString attr)
            , HA.type_ "range"
            , HA.value (toString valueOf100)
            ]
            []
        ]


type alias ScrollTarget =
    { scrollTop : Int
    }


eventTargetDecoder : JD.Decoder ScrollTarget
eventTargetDecoder =
    JD.field "scrollTop" JD.int
        |> JD.map ScrollTarget


inputDecoder : Attribute -> JD.Decoder Msg
inputDecoder attr =
    JD.field "value" JD.int
        |> JD.map (Scroll attr)


viewBarWithScale : Int -> Html Msg
viewBarWithScale valueOf100 =
    viewBar valueOf100
        [ viewBarScale 25
        , viewBarScale 50
        , viewBarScale 75
        ]


viewBar : Int -> List (Html Msg) -> Html Msg
viewBar valueOf100 children =
    let
        inverseOfValue =
            100 - toFloat valueOf100

        viewBlueBar =
            div
                [ styles
                    [ position absolute
                    , zIndex (int 0)
                    , width (px 25)
                    , height (px (toFloat valueOf100))
                    , top (px inverseOfValue)
                    , backgroundColor Colors.blue
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
            ]
        ]
        (viewBlueBar :: children)


viewBarScale : Float -> Html Msg
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


tickStyle : Int -> Html.Attribute Msg
tickStyle val =
    HA.style
        [ ( "width", toString val ++ "%" )
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
    List.filter (isLessThanAttribute value) attributeDescriptions
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
