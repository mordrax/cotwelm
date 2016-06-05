module Inventory
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



----------
-- View --
----------


view : Game.Data.Model -> Html MouseMsg
view ({ hero, dnd } as model) =
    let
        equipment =
            Hero.equipment hero

        pack =
            Equipment.get Equipment.Pack equipment
    in
        viewLayout equipment pack dnd


viewLayout : Equipment -> Maybe Item -> DnDModel -> Html MouseMsg
viewLayout equipment maybePack dnd =
    let
        headerClass =
            class "ui block header"

        header =
            \title -> div [ headerClass ] [ text title ]

        heading =
            \title ->
                span [ class "ui text container segment" ] [ text title ]

        columnWidth =
            \width children -> div [ class (width ++ " wide column") ] children

        equipmentColumn =
            columnWidth "six"
                [ div [ class "ui grid" ]
                    [ viewEquipmentSlots equipment
                    ]
                ]

        shopPackColumn =
            columnWidth "ten" [ shopDiv, packDiv ]

        shopDiv =
            header "Shop"

        packDiv =
            div [] [ header "Pack", viewPack maybePack ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ equipmentColumn
                , shopPackColumn
                ]
            , viewDraggedItem dnd
            ]



------------
-- Update --
------------


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



---------------
-- Drag Drop --
---------------


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


{-| DnDModel tracks where the mouse starts and where it currently is to get the absolute
movement from when mouse down happens. This is the actual drag distance.
-}
getRelativePos : DnDModel -> Position
getRelativePos { draggedItem, position, drag, drop } =
    case drag of
        Nothing ->
            position

        Just { start, current } ->
            Position (position.x + current.x - start.x)
                (position.y + current.y - start.y)


viewDraggedItem : DnDModel -> Html MouseMsg
viewDraggedItem ({ draggedItem, position, drag } as model) =
    let
        px =
            \x -> toString x ++ "px"

        relativePos =
            getRelativePos model

        positionStyle =
            style
                [ ( "top", px relativePos.y )
                , ( "left", px relativePos.x )
                , ( "position", "absolute" )
                , ( "cursor", "move" )
                ]
    in
        case draggedItem of
            Nothing ->
                div [] []

            Just item ->
                div [ positionStyle ] [ Item.view item ]



---------------
-- Pack view --
---------------


viewPack : Maybe Item -> Html MouseMsg
viewPack maybeItem =
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



--------------------
-- Equipment View --
--------------------


equipmentSlotStyle : Html.Attribute Game.Data.Msg
equipmentSlotStyle =
    style [ ( "border", "1px solid black" ) ]


viewEquipmentSlots : Equipment -> Html MouseMsg
viewEquipmentSlots equipment =
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



------------------
-- Subscription --
------------------


subscriptions : Game.Data.Model -> List (Sub MouseMsg)
subscriptions ({ dnd } as model) =
    case dnd.draggedItem of
        Nothing ->
            [ Sub.none ]

        Just item ->
            [ Mouse.moves (At item), Mouse.ups End ]



{-
   viewShop : Screen -> Html Game.Data.Msg
   viewShop screen =
       case screen of
           BuildingScreen b ->
               div [ class "ui block header" ] [ text "shop" ]

           _ ->
               div [] []
-}
