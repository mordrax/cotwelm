module Inventory exposing (view)

{-|
Player inventory

-}

import GameData.Item exposing (..)
import Equipment exposing (..)
import Html.Attributes exposing (..)
import Game.Data exposing (..)
import Html exposing (..)
import Hero exposing (..)


view : Hero -> Html (Maybe Game.Data.Msg)
view hero =
    let
        equipment =
            Hero.equipment hero

        headerClass =
            class "ui block header"
    in
        div []
            [ span [ class "ui text container segment" ]
                [ text "Inventory screen" ]
            , div [ class "ui two column grid" ]
                [ div [ class "six wide column" ]
                    [ div [ class "ui grid" ] [ viewEquipment equipment ] ]
                , div [ class "ten wide column" ]
                    [ div [ headerClass ] [ text "Shop" ]
                    , div [] []
                    , div [ headerClass ] [ text "Pack" ]
                    , packView (Equipment.getPack equipment)
                    ]
                ]
            ]


packView : Maybe Item -> Html (Maybe Game.Data.Msg)
packView maybeItem =
    case maybeItem of
        Just item ->
            div [] [ text "put items here" ]

        _ ->
            div [] [ text "Pack is empty" ]


viewShop : Screen -> Html (Maybe Game.Data.Msg)
viewShop screen =
    case screen of
        BuildingScreen b ->
            div [ class "ui block header" ] [ text "shop" ]

        _ ->
            div [] []
