module Inventory
    exposing
        ( view
        , update
        , subscriptions
        )

{-|
The inventory module predominatelys acts as the user interface for the 'i'nventory and shop screen.
It handles equiping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App exposing (..)
import GameData.Item as Item exposing (..)
import Game.Data exposing (..)
import Container exposing (..)
import Equipment exposing (..)
import Mass exposing (..)
import DragDrop exposing (..)


----------
-- View --
----------


view : Game.Data.Model -> Html (InventoryMsg Game.Data.Drag Game.Data.Drop)
view ({ equipment, dnd } as model) =
    let
        maybePack =
            Equipment.getSlot Equipment.Pack equipment

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
            columnWidth "six" [ viewEquipment equipment dnd ]

        shopPackColumn =
            columnWidth "ten" [ shopHtml, packHtml ]

        shopHtml =
            header "Shop"

        packHtml =
            div [] [ header ("Pack: (" ++ (viewPackInfo maybePack) ++ ")"), viewPack maybePack model ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ Html.App.map toInventoryMsg equipmentColumn
                , Html.App.map toInventoryMsg shopPackColumn
                ]
            , Html.App.map toInventoryMsg (DragDrop.view dnd)
            ]


viewPackInfo : Maybe Item -> String
viewPackInfo maybeItem =
    case maybeItem of
        Just (ItemPack pack) ->
            let
                ( curMass, capMass ) =
                    Item.packInfo pack

                ( curBulk, curWeight ) =
                    Mass.info curMass

                ( capBulk, capWeight ) =
                    Mass.info capMass

                print =
                    \name a b -> name ++ ": " ++ (toString a) ++ " / " ++ (toString b)
            in
                (print "Bulk" curBulk capBulk) ++ ", " ++ (print "Weight" curWeight capWeight)

        _ ->
            ""


toInventoryMsg : DragDropMsg s t -> InventoryMsg s t
toInventoryMsg dragDropMsg =
    DnDMsg dragDropMsg



------------
-- Update --
------------


update : InventoryMsg Game.Data.Drag Game.Data.Drop -> Model -> Model
update msg model =
    case msg of
        DnDMsg (End _) ->
            handleMouseUp model

        DnDMsg dragDropMsg ->
            { model | dnd = DragDrop.update dragDropMsg model.dnd }

        _ ->
            Debug.log "Update: No other messages implemented" model



---------------------
-- Drag drop logic --
---------------------


{-| On mouse up, if there was something being dragged and a it's being dragged over a droppable container,
then call a function to handle the transaction, otherwise just clear the dndModel and return.
-}
handleMouseUp : Game.Data.Model -> Game.Data.Model
handleMouseUp ({ dnd } as model) =
    let
        modelDnDReinit =
            { model | dnd = DragDrop.new }

        noChange =
            modelDnDReinit
    in
        case (DragDrop.getDragSourceDropTarget model.dnd) of
            ( NoDrag, _ ) ->
                noChange

            ( _, NoDrop ) ->
                noChange

            ( DragSource dragSource, DropTarget dropTarget ) ->
                handleDragDrop dragSource dropTarget modelDnDReinit


{-| Top level of drag/drop transaction.
Algorithm:
- Resolve dragging the item away from the dragSource, return the modelWithDrag and the item being dragged.
- Resolve dropping the item into the dropTarget using the modelWithDrag. Return the modelWithDragDrop.
- If at any time, either resolutions returns a Result.err, return the initial model.

Drag
- Shop: Check player can afford item
- Equipment slot: Check item is not cursed
- Pack: Nothing

Drop
- Shop: Nothing
- Equipment slot: Check if an item is already equipped
- Pack: Check pack capacity
-}
handleDragDrop : Game.Data.Drag -> Game.Data.Drop -> Model -> Model
handleDragDrop dragSource dropTarget model =
    let
        dragResult =
            handleDrag dragSource model

        noChange =
            model

        handleDrop' =
            \item modelWithDrag ->
                case (handleDrop dropTarget item modelWithDrag) of
                    Result.Ok modelWithDragDrop ->
                        modelWithDragDrop

                    Err _ ->
                        noChange
    in
        case dragResult of
            Result.Ok ( modelWithDrag, item ) ->
                handleDrop' item modelWithDrag

            Err _ ->
                noChange


{-| handleDrag
- Shop:
  - Check player can afford item

- Equipment slot:
  - Check it's not cursed

- Pack:
  - Nothing
-}
handleDrag : Game.Data.Drag -> Model -> Result Model ( Model, Item )
handleDrag drag model =
    case drag of
        DragSlot item slot ->
            let
                unequipRes =
                    Equipment.unequip slot model.equipment
            in
                case unequipRes of
                    Result.Ok equipment' ->
                        Result.Ok ( { model | equipment = equipment' }, item )

                    Result.Err msg ->
                        Result.Ok ( model, item )

        DragPack idItem pack ->
            let
                modelItemRemoved =
                    { model | equipment = Equipment.removeFromPack idItem model.equipment }
            in
                Debug.log "TODO: Remove item from the pack.container and return just the item"
                    Result.Ok
                    ( modelItemRemoved, (Container.getItem idItem) )

        DragShop item ->
            Result.Ok ( model, item )


{-| handleDrop
- Shop:
  - Nothing

- Equipment slot:
  - Check if an item is already equipped

- Pack
  - Check pack capacity
-}
handleDrop : Game.Data.Drop -> Item -> Model -> Result Int Model
handleDrop drop item model =
    case drop of
        DropPack pack ->
            let
                ( equipment', massComparison ) =
                    Equipment.putInPack item model.equipment
            in
                case massComparison of
                    Mass.Ok ->
                        Result.Ok { model | equipment = equipment' }

                    _ ->
                        Debug.log "dropping into pack failed" Result.Err 1

        DropEquipment slot ->
            Result.Ok { model | equipment = Equipment.equip slot item model.equipment }



---------------
-- Pack view --
---------------


viewPack : Maybe Item -> Game.Data.Model -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewPack maybeItem ({ dnd } as model) =
    let
        highlightStyle =
            style [ ( "background", "lightblue" ) ]

        droppableHtml =
            \pack ->
                (div [ highlightStyle ] [ viewContainer (ItemPack pack) model ])
    in
        case maybeItem of
            Just (ItemPack pack) ->
                DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "Pack is empty" ]


viewContainer : Item -> Game.Data.Model -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewContainer containerItem ({ equipment, dnd } as model) =
    let
        idItems =
            Equipment.getPackContent equipment

        itemToHtml =
            \idItem ->
                idItem
                    |> Container.getItem
                    |> Item.view

        makeDraggable =
            \pack idItem -> DragDrop.draggable (itemToHtml idItem) (DragPack idItem pack) dnd
    in
        case (containerItem) of
            ItemPack pack ->
                div []
                    (List.map (makeDraggable pack) idItems)

            _ ->
                div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]



--------------------
-- Equipment View --
--------------------


viewEquipment : Equipment -> DragDrop Game.Data.Drag Game.Data.Drop -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewEquipment equipment dnd =
    let
        getEquipment =
            \slot -> Equipment.getSlot slot equipment

        drawItem =
            \item slot ->
                DragDrop.draggable (Item.view item) (DragSlot item slot) dnd

        drawSlot =
            \slot ->
                let
                    slotName =
                        toString slot
                in
                    case (getEquipment slot) of
                        Just item ->
                            div [ class "three wide column equipmentSlot" ]
                                [ drawItem item slot ]

                        Nothing ->
                            DragDrop.droppable (DropEquipment slot) dnd (div [] [ text slotName ])
    in
        div [ class "ui grid" ]
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


subscriptions : Game.Data.Model -> List (Sub (InventoryMsg Game.Data.Drag Game.Data.Drop))
subscriptions ({ dnd } as model) =
    List.map (Sub.map toInventoryMsg) (DragDrop.subscriptions dnd)
