module Inventory exposing (view)

{-|
Player inventory

-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Game.Data exposing (..)
import GameData.Item as Item exposing (..)
import Hero exposing (..)
import Container exposing (..)
import Mouse exposing (..)
import Json.Decode as Json exposing (..)
import Equipment exposing (..)


type alias Model =
    { dragging : Maybe Item
    , position : Position
    }


init : Model
init =
    { dragging = Nothing, position = Position 0 0 }


view : Hero -> Html Game.Data.Msg
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


subscriptions : Model -> List (Sub Game.Data.Msg)
subscriptions model =
    case model.dragging of
        Nothing ->
            Sub.none

        Just item ->
            Sub.batch [ Mouse.moves (MouseDrag << (At item)), Mouse.ups End ]



-- Position -> Drag
-- MouseDrag: Drag -> Msg


packView : Maybe Item -> Html Game.Data.Msg
packView maybeItem =
    case maybeItem of
        Just item ->
            div [] [ viewContainer item ]

        _ ->
            div [] [ text "Pack is empty" ]


viewContainer : Item -> Html Game.Data.Msg
viewContainer item =
    case (item) of
        ItemPack pack ->
            div [] (List.map draggableItem <| Container.list (Item.getContainer pack))

        _ ->
            div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]


draggableItem : Item -> Html Game.Data.Msg
draggableItem item =
    let
        onMouseDown =
            on "mousedown" (Json.map (MouseDrag << Start item) Mouse.position)
    in
        div [ onMouseDown ] [ Item.view item ]


viewShop : Screen -> Html Game.Data.Msg
viewShop screen =
    case screen of
        BuildingScreen b ->
            div [ class "ui block header" ] [ text "shop" ]

        _ ->
            div [] []
