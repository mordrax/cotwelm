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


type alias Drag =
    Game.Data.Drag


type alias Drop =
    Game.Data.Drop



------------
-- Update --
------------


update : InventoryMsg Drag Drop -> Model -> Model
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
handleMouseUp : Model -> Model
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
handleDragDrop : Drag -> Drop -> Model -> Model
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
handleDrag : Drag -> Model -> Result String ( Model, Item )
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
                        Result.Err msg

        DragPack item pack ->
            let
                modelItemRemoved =
                    { model | equipment = Equipment.removeFromPack item model.equipment }

                _ =
                    Debug.log "TODO: Remove item from the pack.container and return just the item" 1
            in
                Result.Ok ( modelItemRemoved, item )

        DragShop item shop ->
            dragFromShop item shop model


dragFromShop : Item -> Shop -> Model -> Result String ( Model, Item )
dragFromShop item shop ({ equipment } as model) =
    -- get purse from equipment
    -- if
    --purse doesn't exist, log and return existing state
    -- else
    --buy from shop
    -- if
    --can afford then return new state
    -- else
    --return existing state
    let
        maybePurse =
            Equipment.get Equipment.Purse equipment `Maybe.andThen` toPurse

        buyResult =
            case maybePurse of
                Just purse ->
                    Shop.sell item purse shop

                Nothing ->
                    Result.Err "No purse to buy anything with!"
    in
        case buyResult of
            Result.Ok ( shop', purse' ) ->
                Result.Ok ( { model | shop = shop', equipment = Equipment.updatePurseContents purse' equipment }, item )

            Result.Err msg ->
                Result.Err msg


{-| handleDrop
- Shop:
  - Nothing

- Equipment slot:
  - Check if an item is already equipped

- Pack
  - Check pack capacity
-}
handleDrop : Drop -> Item -> Model -> Result String Model
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

                    Equipment.ItemMsg (Item.TypeDef.Ok) ->
                        success

                    Equipment.ItemMsg msg ->
                        Result.Err ("Dropping into pack with unhandled item msg" ++ (toString msg))

                    msg ->
                        Result.Err ("Dropping into pack failed with unhanded msg: " ++ (toString msg))

        DropEquipment slot ->
            case Equipment.equip ( slot, item ) model.equipment of
                Result.Ok equipment' ->
                    Result.Ok { model | equipment = equipment' }

                Result.Err err ->
                    Result.Err (toString err)

        DropShop shop ->
            let
                maybePurse =
                    Equipment.get Equipment.Purse model.equipment `Maybe.andThen` toPurse
            in
                case maybePurse of
                    Just purse ->
                        let
                            ( shop', purse' ) =
                                Shop.buy item purse shop
                        in
                            Result.Ok { model | shop = shop', equipment = Equipment.updatePurseContents purse' model.equipment }

                    Nothing ->
                        Result.Err "No purse to hold coins!"



----------
-- View --
----------


view : Model -> Html (InventoryMsg Drag Drop)
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


viewShopPackPurse : Model -> Html (InventoryMsg Drag Drop)
viewShopPackPurse ({ equipment, dnd, currentScreen } as model) =
    let
        header =
            \title -> div [ class "ui block header" ] [ text title ]

        columnWidth =
            \width children -> div [ class (width ++ " wide column") ] children

        groundHtml =
            div [] [ header "Ground", viewGround model ]

        shopHtml =
            div []
                [ header "Shop"
                , viewShop model
                ]

        maybePack =
            case Equipment.get Equipment.Pack equipment of
                Just (ItemPack pack) ->
                    Just pack

                _ ->
                    Nothing

        shopGroundHtml =
            case currentScreen of
                BuildingScreen building ->
                    shopHtml

                _ ->
                    groundHtml

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
                [ shopGroundHtml
                , packHtml
                , purseHtml
                ]
            )


viewGround : Model -> Html (DragDropMsg Drag Drop)
viewGround model =
    div [] []


viewPackInfo : Maybe (Pack Item) -> String
viewPackInfo maybeItem =
    case maybeItem of
        Just pack ->
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


viewPack : Maybe (Pack Item) -> Model -> Html (DragDropMsg Drag Drop)
viewPack maybePack ({ dnd } as model) =
    let
        packStyle =
            style [ ( "background", "lightblue" ), ( "min-height", "100pdsdx" ) ]

        droppableHtml =
            \pack ->
                (div [ packStyle ] [ viewContainer (ItemPack pack) model ])
    in
        case maybePack of
            Just pack ->
                DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "You have no pack! Equip a pack to use this space." ]


viewShop : Model -> Html (DragDropMsg Drag Drop)
viewShop ({ shop, dnd } as model) =
    let
        items =
            Shop.list shop

        makeDraggable =
            \shop item -> DragDrop.draggable (Item.view item) (DragShop item shop) dnd

        droppableDiv =
            div [ class "ui cards" ] (List.map (makeDraggable shop) items)

        droppableShop =
            DragDrop.droppable (DropShop shop) dnd droppableDiv

        --DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)
    in
        droppableShop


viewContainer : Item -> Model -> Html (DragDropMsg Drag Drop)
viewContainer containerItem ({ equipment, dnd } as model) =
    let
        items =
            Equipment.getPackContent equipment

        makeDraggable =
            \pack item -> DragDrop.draggable (Item.view item) (DragPack item pack) dnd
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


viewEquipment : Equipment -> DragDrop Drag Drop -> Html (DragDropMsg Drag Drop)
viewEquipment equipment dnd =
    let
        getEquipment =
            \slot -> Equipment.get slot equipment

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


viewPurse : Model -> Html (DragDropMsg Drag Drop)
viewPurse ({ equipment } as model) =
    let
        maybePurseContents =
            (Equipment.get Equipment.Purse equipment)
                `Maybe.andThen` Item.toPurse
                `Maybe.andThen` maybeCoins

        maybeCoins =
            \x -> Just (Purse.getCoins x)
    in
        case maybePurseContents of
            Just ( c, s, g, p ) ->
                div [ class "ui grid" ]
                    [ div [ class "CoinsCopper cotwItem" ] [ text (toString c) ]
                    , div [ class "CoinsSilver cotwItem" ] [ text (toString s) ]
                    , div [ class "CoinsGold cotwItem" ] [ text (toString g) ]
                    , div [ class "CoinsPlatinum cotwItem" ] [ text (toString p) ]
                    ]

            _ ->
                div [] []


subscriptions : Model -> List (Sub (InventoryMsg Drag Drop))
subscriptions ({ dnd } as model) =
    List.map (Sub.map toInventoryMsg) (DragDrop.subscriptions dnd)
