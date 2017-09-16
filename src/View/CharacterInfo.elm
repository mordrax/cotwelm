module View.CharacterInfo exposing (view)

import Colors
import Css exposing (..)
import Equipment
import Game.Model exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Item.Pack
import Types exposing (..)
import View.Difficulty
import View.UI as UI


styles : List Css.Mixin -> Html.Attribute a
styles =
    asPairs >> HA.style


view : Game -> Html Msg
view { hero, difficulty } =
    let
        stats lbl val =
            div [ HA.class "row" ]
                [ div [ HA.class "block" ] [ Html.text lbl ]
                , div [ HA.class "block", styles [ textAlign right ] ] [ Html.text val ]
                ]

        { weight, bulk } =
            hero.equipment
                |> Equipment.getPack
                |> Maybe.map (Item.Pack.info >> Tuple.first)
                |> Maybe.withDefault { weight = 0, bulk = 0 }

        icon =
            case difficulty of
                Easy ->
                    View.Difficulty.easy

                Intermediate ->
                    View.Difficulty.intermediate

                Hard ->
                    View.Difficulty.hard

                Impossible ->
                    View.Difficulty.impossible
    in
    div [ HA.class " column", styles [ maxWidth (px 640), margin auto ] ]
        [ div [ HA.class "container", styles [ backgroundColor Colors.white ] ]
            [ div [ HA.class "row", styles [ margin2 (px 15) zero ] ]
                [ Html.span [] [ Html.text ("Character Name:" ++ UI.nbsp) ]
                , Html.span [] [ Html.text hero.name ]
                ]
            , div [ HA.class "row" ]
                [ div [ HA.class "column block--large" ]
                    [ div [ HA.class "row", styles [ justifyContent spaceBetween, padding2 zero (px 10) ] ]
                        [ div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.str
                                , UI.greenScaledBar hero.attributes.str
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Strength" ]
                            ]
                        , div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.dex
                                , UI.greenScaledBar hero.attributes.dex
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Dexterity" ]
                            ]
                        , div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.int
                                , UI.greenScaledBar hero.attributes.int
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Intelligence" ]
                            ]
                        , div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.con
                                , UI.greenScaledBar hero.attributes.con
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Constitution" ]
                            ]
                        ]
                    , div [ HA.class "row", styles [ marginTop (px 20) ] ]
                        [ div [ styles [ flex (int 2) ] ]
                            [ UI.labeledBox "Game Difficulty"
                                [ div [ HA.class "row", styles [ width (pct 100) ] ]
                                    [ div [ styles [ margin2 auto (px 15) ] ] [ Html.text (toString difficulty) ]
                                    , icon
                                    ]
                                ]
                            ]
                        , div [ styles [ flex (int 1), alignItems center ] ]
                            []
                        ]
                    ]
                , div [ HA.class "column block" ]
                    [ stats "Level:" (toString hero.expLevel)
                    , stats "Experience:" (toString hero.expPoints)
                    , stats "Next Level:" "100"
                    , stats "Weight:" (toString weight)
                    , stats "Bulk:" (toString bulk)
                    , stats "Speed:" "1"
                    , stats "Hit Points:" (toString hero.stats.maxHP)
                    , stats "Mana Points:" (toString hero.stats.maxSP)
                    , stats "Copper:" "Lots!"
                    , stats "Armour Value:" "Vulnerable"
                    ]
                ]
            ]
        ]
