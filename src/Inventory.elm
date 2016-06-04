module Inventory exposing (view)

{-|
Player inventory

-}

import GameData.Item as Item exposing (..)
import Equipment exposing (..)
import Html.Attributes exposing (..)
import Game.Data exposing (..)
import Html exposing (..)
import Hero exposing (..)
import Container exposing (..)


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
            div [] [ viewContainer item ]

        _ ->
            div [] [ text "Pack is empty" ]


viewContainer : Item -> Html (Maybe Game.Data.Msg)
viewContainer item =
    case (item) of
        ItemPack pack ->
            div [] (List.map Item.view <| Container.list (Item.getContainer pack))

        _ ->
            div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]


viewShop : Screen -> Html (Maybe Game.Data.Msg)
viewShop screen =
    case screen of
        BuildingScreen b ->
            div [ class "ui block header" ] [ text "shop" ]

        _ ->
            div [] []
