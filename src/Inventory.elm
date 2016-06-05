module Inventory
    exposing
        ( Inventory
        , Msg
        , view
        , subscriptions
        , update
        , init
        )

{-|
The inventory module predominatelys acts as the user interface for the 'i'nventory and shop screen.
It handles equiping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import GameData.Item as Item exposing (..)
import Hero exposing (..)
import Container exposing (..)
import Mouse exposing (..)
import Json.Decode as Json exposing (..)
import Equipment exposing (..)


type alias Model =
    { draggedItem : Maybe Item
    , position : Position
    , drag : Maybe Drag
    }


type alias Drag =
    { start : Position
    , current : Position
    }


type Inventory
    = InventoryModel Model


type Msg
    = Start Item Position
    | At Item Position
    | End Position


init : Inventory
init =
    InventoryModel { draggedItem = Nothing, position = Position 0 0, drag = Nothing }


view : Hero -> Inventory -> Html Msg
view hero (InventoryModel model) =
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
                , draggedItemView model
                ]
            ]


getPosition : Model -> Position
getPosition { draggedItem, position, drag } =
    case drag of
        Nothing ->
            position

        Just { start, current } ->
            let
                _ =
                    Debug.log "start" [ start, current, position ]
            in
                Position (position.x + current.x - start.x)
                    (position.y + current.y - start.y)


draggedItemView : Model -> Html Msg
draggedItemView ({ draggedItem, position, drag } as model) =
    let
        realPosition =
            getPosition model

        positionStyle =
            style
                [ ( "top", (toString realPosition.y) ++ "px" )
                , ( "left", toString realPosition.x ++ "px" )
                , ( "position", "absolute" )
                , ( "cursor", "move" )
                ]
    in
        case draggedItem of
            Nothing ->
                div [] []

            Just item ->
                div [ positionStyle ] [ Item.view item ]


update : Msg -> Inventory -> Inventory
update msg (InventoryModel model) =
    {- let
            _ =
               Debug.log "msg" msg
       in
    -}
    case msg of
        Start item pos ->
            InventoryModel { model | draggedItem = Just item, drag = Just (Drag pos pos), position = pos }

        At item pos ->
            (InventoryModel { model | drag = (Maybe.map (\{ start } -> Drag start pos) model.drag) })

        End _ ->
            InventoryModel { model | draggedItem = Nothing, drag = Nothing }


subscriptions : Inventory -> List (Sub Msg)
subscriptions (InventoryModel model) =
    case model.draggedItem of
        Nothing ->
            [ Sub.none ]

        Just item ->
            [ Mouse.moves (At item), Mouse.ups End ]



-- Position -> Drag
-- MouseDrag: Drag -> Msg


packView : Maybe Item -> Html Msg
packView maybeItem =
    case maybeItem of
        Just item ->
            div [] [ viewContainer item ]

        _ ->
            div [] [ text "Pack is empty" ]


viewContainer : Item -> Html Msg
viewContainer item =
    case (item) of
        ItemPack pack ->
            div [] (List.map draggableItem <| Container.list (Item.getContainer pack))

        _ ->
            div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]


draggableItem : Item -> Html Msg
draggableItem item =
    let
        onMouseDown =
            onWithOptions "mousedown" { stopPropagation = True, preventDefault = True } (Json.map (Start item) Mouse.position)
    in
        div [ onMouseDown ] [ Item.view item ]



{-
   viewShop : Screen -> Html Msg
   viewShop screen =
       case screen of
           BuildingScreen b ->
               div [ class "ui block header" ] [ text "shop" ]

           _ ->
               div [] []
-}
