module Inventory exposing (view)

{-|
Player inventory

-}

import GameData.Item exposing (..)
import Equipment exposing (..)
import Html.Attributes exposing (..)
import Game.Data exposing (..)
import Html exposing (..)


view : Game.Data.Model -> Html (Maybe Game.Data.Msg)
view model =
    let
        headerClass =
            class "ui block header"

        shopView =
            case model.currentScreen of
                BuildingScreen b ->
                    viewShop

                _ ->
                    div [] []
    in
        div []
            [ span [ class "ui text container segment" ]
                [ text "Inventory screen" ]
            , div [ class "ui two column grid" ]
                [ div [ class "six wide column" ]
                    [ div [ class "ui grid" ] [ viewEquipment model.hero.equipment ] ]
                , div [ class "ten wide column" ]
                    [ div [ headerClass ] [ text "Shop" ]
                    , shopView
                    , div [ headerClass ] [ text "Pack" ]
                    ]
                ]
            ]


viewShop : Html (Maybe Game.Data.Msg)
viewShop =
    div [ class "ui block header" ] [ text "shop" ]
