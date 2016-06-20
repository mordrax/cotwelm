module Game.Inventory
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


-- item

import Item.Item as Item exposing (..)
import Item.TypeDef exposing (..)


-- game

import Game.Data exposing (..)
import Equipment exposing (..)
import Utils.Mass as Mass exposing (..)
import Utils.DragDrop as DragDrop exposing (..)
import Item.Purse as Purse exposing (..)
import Shop.Shop as Shop exposing (..)


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

                    Err msg ->
                        let
                            _ =
                                Debug.log "Drop failed: " msg
                        in
                            noChange
    in
        case dragResult of
            Result.Ok ( modelWithDrag, item ) ->
                handleDrop' item modelWithDrag

            Err msg ->
                let
                    _ =
                        Debug.log "Drag failed: " msg
                in
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

        DragPack item pack ->
            let
                modelItemRemoved =
                    { model | equipment = Equipment.removeFromPack item model.equipment }
            in
                Debug.log "TODO: Remove item from the pack.container and return just the item"
                    Result.Ok
                    ( modelItemRemoved, item )

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
handleDrop : Game.Data.Drop -> Item -> Model -> Result String Model
handleDrop drop item model =
    case drop of
        DropPack pack ->
            let
                ( equipment', equipMsg ) =
                    Equipment.putInPack item model.equipment

                success =
                    Result.Ok { model | equipment = equipment' }
            in
                case equipMsg of
                    Equipment.Ok ->
                        success

                    Equipment.NoPackEquipped ->
                        Result.Err "Can't add to the pack. No packed equipped!"

                    Equipment.ItemMsg a ->
                        case a of
                            Item.TypeDef.Ok ->
                                success

                            _ ->
                                Result.Err ("Dropping into pack with unhandled item msg" ++ (toString a))

                    msg ->
                        Result.Err ("Dropping into pack failed with unhanded msg: " ++ (toString msg))

        DropEquipment slot ->
            Result.Ok { model | equipment = Equipment.equip ( slot, item ) model.equipment }



----------
-- View --
----------


view : Game.Data.Model -> Html (InventoryMsg Game.Data.Drag Game.Data.Drop)
view ({ equipment, dnd } as model) =
    let
        header =
            \title -> div [ class "ui block header" ] [ text title ]

        heading =
            \title ->
                span [ class "ui text container segment" ] [ text title ]

        columnWidth =
            \width children -> div [ class (width ++ " wide column") ] children

        equipmentColumn =
            columnWidth "six" [ viewEquipment equipment dnd ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ Html.App.map toInventoryMsg equipmentColumn
                , viewShopPackPurse model
                ]
            , Html.App.map toInventoryMsg (DragDrop.view dnd)
            ]


viewShopPackPurse : Game.Data.Model -> Html (InventoryMsg Game.Data.Drag Game.Data.Drop)
viewShopPackPurse ({ equipment, dnd } as model) =
    let
        header =
            \title -> div [ class "ui block header" ] [ text title ]

        columnWidth =
            \width children -> div [ class (width ++ " wide column") ] children

        maybePack =
            Equipment.getSlot Equipment.Pack equipment

        shopHtml =
            div []
                [ header "Shop"
                , viewShop model.shop
                ]

        packHtml =
            div []
                [ header ("Pack: (" ++ (viewPackInfo maybePack) ++ ")")
                , viewPack maybePack model
                ]

        purseHtml =
            div []
                [ header "Purse"
                , viewPurse model
                ]
    in
        Html.App.map toInventoryMsg
            (columnWidth "ten"
                [ shopHtml
                , packHtml
                , purseHtml
                ]
            )


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


viewShop : Shop -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewShop shop =
    let
        items =
            Shop.list shop
    in
        div [ class "ui cards" ] (List.map Item.view items)


viewContainer : Item -> Game.Data.Model -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewContainer containerItem ({ equipment, dnd } as model) =
    let
        items =
            Equipment.getPackContent equipment

        itemToHtml =
            \item -> Item.view item

        makeDraggable =
            \pack item -> DragDrop.draggable (itemToHtml item) (DragPack item pack) dnd
    in
        case (containerItem) of
            ItemPack pack ->
                div [ class "ui cards" ]
                    (List.map (makeDraggable pack) items)

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
                DragDrop.draggable (Item.viewSlot item ("Slot: " ++ (toString slot))) (DragSlot item slot) dnd

        drawSlot =
            \slot ->
                let
                    slotName =
                        "Slot: [" ++ (toString slot) ++ "]"
                in
                    case (getEquipment slot) of
                        Just item ->
                            div [ class "three wide column equipmentSlot" ]
                                [ drawItem item slot ]

                        Nothing ->
                            div [ class "three wide column equipmentSlot" ]
                                [ DragDrop.droppable (DropEquipment slot) dnd (div [] [ text slotName ])
                                ]
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



----------------
-- Purse View --
----------------


viewPurse : Game.Data.Model -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewPurse ({ equipment } as model) =
    let
        maybePurse =
            (Equipment.getSlot Equipment.Purse equipment) `Maybe.andThen` Item.getPurse
    in
        case maybePurse of
            Just purse ->
                div [ class "ui grid" ]
                    [ div [ class "CoinsCopper cotwItem" ] [ text (toString (Purse.getCoins Copper purse)) ]
                    , div [ class "CoinsSilver cotwItem" ] [ text (toString (Purse.getCoins Silver purse)) ]
                    , div [ class "CoinsGold cotwItem" ] [ text (toString (Purse.getCoins Gold purse)) ]
                    , div [ class "CoinsPlatinum cotwItem" ] [ text (toString (Purse.getCoins Platinum purse)) ]
                    ]

            _ ->
                div [] []


subscriptions : Game.Data.Model -> List (Sub (InventoryMsg Game.Data.Drag Game.Data.Drop))
subscriptions ({ dnd } as model) =
    List.map (Sub.map toInventoryMsg) (DragDrop.subscriptions dnd)
