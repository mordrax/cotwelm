module Inventory
    --where
    exposing
        ( view
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
import Game.Data exposing (..)
import Hero exposing (..)
import Container exposing (..)
import Mouse exposing (..)
import Json.Decode as Json exposing (..)
import Equipment exposing (..)


init : DnDModel
init =
    { draggedItem = Nothing
    , position = Position 0 0
    , drag = Nothing
    , drop = Nothing
    }


view : Game.Data.Model -> Html MouseMsg
view ({ hero } as model) =
    let
        equipment =
            Hero.equipment hero

        headerClass =
            class "ui block header"

        pack =
            Equipment.get Equipment.Pack equipment
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
                    , packView pack
                    ]
                , draggedItemView model.dnd
                ]
            ]


getPosition : DnDModel -> Position
getPosition { draggedItem, position, drag, drop } =
    case drag of
        Nothing ->
            position

        Just { start, current } ->
            Position (position.x + current.x - start.x)
                (position.y + current.y - start.y)


draggedItemView : DnDModel -> Html MouseMsg
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


update : MouseMsg -> Model -> ( Model, Cmd Game.Data.Msg )
update msg ({ dnd } as model) =
    let
        startdnd =
            \item pos -> DnDModel (Just item) pos (Just (Drag pos pos)) dnd.drop

        atdnd =
            \item pos -> DnDModel (Just item) dnd.position (Maybe.map (\{ start } -> (Drag start pos)) dnd.drag) dnd.drop
    in
        case msg of
            Start item pos ->
                ( { model | dnd = startdnd item pos }, Cmd.none )

            At item pos ->
                ( { model | dnd = atdnd item pos }, Cmd.none )

            End _ ->
                let
                    dnd' =
                        DnDModel Nothing (Position 0 0) Nothing Nothing

                    model' =
                        { model | dnd = dnd' }
                in
                    case dnd.drop of
                        Nothing ->
                            ( model', Cmd.none )

                        Just (DropPack pack) ->
                            let
                                model' =
                                    dropItem model
                            in
                                ( { model' | dnd = dnd' }, Cmd.none )

                        Just (DropEquipment slot) ->
                            Debug.crash "TODO"

            MouseOver dropTarget ->
                ( { model | dnd = { dnd | drop = Just dropTarget } }, Cmd.none )


dropItem : Model -> Model
dropItem ({ hero, dnd } as model) =
    let
        { draggedItem, position, drag, drop } =
            dnd
    in
        case ( draggedItem, drop ) of
            ( Nothing, _ ) ->
                model

            ( _, Nothing ) ->
                model

            ( Just item, Just (DropPack pack) ) ->
                let
                    hero' =
                        Hero.pickup item hero
                in
                    { model | hero = hero' }

            ( Just item, Just (DropEquipment slot) ) ->
                Debug.crash "TODO: drop equipment"


subscriptions : Game.Data.Model -> List (Sub MouseMsg)
subscriptions ({ dnd } as model) =
    case dnd.draggedItem of
        Nothing ->
            [ Sub.none ]

        Just item ->
            [ Mouse.moves (At item), Mouse.ups End ]


packView : Maybe Item -> Html MouseMsg
packView maybeItem =
    case maybeItem of
        Just (ItemPack pack) ->
            droppableDiv (DropPack pack)
                <| div [] [ viewContainer (ItemPack pack) ]

        _ ->
            div [] [ text "Pack is empty" ]


viewContainer : Item -> Html MouseMsg
viewContainer item =
    case (item) of
        ItemPack pack ->
            div [] (List.map draggableItem <| Container.list (Item.getContainer pack))

        _ ->
            div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]


droppableDiv : Drop -> Html MouseMsg -> Html MouseMsg
droppableDiv drop html =
    let
        mouseOverStyle =
            onMouseOver (MouseOver drop)
    in
        div [ mouseOverStyle ] [ html ]


draggableItem : Item -> Html MouseMsg
draggableItem item =
    let
        onMouseDown =
            onWithOptions "mousedown"
                { stopPropagation = True, preventDefault = True }
                (Json.map (Start item) Mouse.position)
    in
        div [ onMouseDown ] [ Item.view item ]



--------------------
-- Equipment View --
--------------------


equipmentSlotStyle : Html.Attribute Game.Data.Msg
equipmentSlotStyle =
    style [ ( "border", "1px solid black" ) ]


viewEquipment : Equipment -> Html MouseMsg
viewEquipment equipment =
    let
        getEquipment =
            \slot -> Equipment.get slot equipment

        drawItem =
            \item -> div [ class "three wide column equipmentSlot" ] [ draggableItem item ]

        drawSlot =
            \slot ->
                case (getEquipment slot) of
                    Just item ->
                        drawItem item

                    Nothing ->
                        div [] []
    in
        div []
            [ drawSlot Equipment.Weapon
            , drawSlot Equipment.Freehand
            , drawSlot Equipment.Armour
            , drawSlot Equipment.Shield
            , drawSlot Equipment.Helmet
            , drawSlot Equipment.Bracers
            , drawSlot Equipment.Gauntlets
            , drawSlot Equipment.Belt
            , drawSlot Equipment.Purse
            , drawSlot Equipment.Pack
            , drawSlot Equipment.Neckwear
            , drawSlot Equipment.Overgarment
            , drawSlot Equipment.LeftRing
            , drawSlot Equipment.RightRing
            , drawSlot Equipment.Boots
            ]



{-
   viewShop : Screen -> Html Game.Data.Msg
   viewShop screen =
       case screen of
           BuildingScreen b ->
               div [ class "ui block header" ] [ text "shop" ]

           _ ->
               div [] []
-}
