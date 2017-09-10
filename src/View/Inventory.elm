module View.Inventory exposing (view)

import Equipment exposing (Equipment, EquipmentSlot(PackSlot))
import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Inventory exposing (..)
import Item
import Item.Data exposing (Item, Pack)
import Item.Pack as Pack
import Item.Purse as Purse
import Shops exposing (Store)
import Utils.DragDrop as DragDrop exposing (DragDrop)


view : Inventory -> Html Msg
view ({ equipment, dnd } as model) =
    div [ HA.class "inventory" ]
        [ viewEquipment equipment dnd
        , viewShopPackPurse model
        , Html.map DnDMsg (DragDrop.view dnd)
        ]


viewShopPackPurse : Inventory -> Html Msg
viewShopPackPurse ({ equipment, merchant, dnd } as inventory) =
    let
        viewAsContainers =
            div [ HA.class "inventory__containers" ]

        maybePack =
            Equipment.getPack equipment

        storeMsgs =
            case merchant of
                Ground _ ->
                    div [] []

                Shop _ ->
                    viewStoreMessages dnd
    in
    viewAsContainers
        [ viewMerchant merchant dnd
        , storeMsgs
        , viewPack maybePack inventory
        , viewPurse inventory
        ]


viewMerchant : Merchant -> DragDrop Draggable Droppable -> Html Msg
viewMerchant merchant dnd =
    case merchant of
        Shop shop ->
            viewShop shop dnd

        Ground items ->
            viewGround items dnd


viewStoreMessages : DragDrop Draggable Droppable -> Html Msg
viewStoreMessages dnd =
    let
        buying item =
            text ("Ah yes, I can part with this fine " ++ name item ++ " for a measly sum of " ++ markupPrice item ++ ". A bargain!")

        selling item =
            text ("This " ++ name item ++ " has seen better days, I'll need to put in alot of work to restore it. The most I can offer is " ++ basePrice item ++ ".")

        name =
            Item.name

        basePrice =
            Item.baseValue >> Purse.toLeastCoins >> Purse.ppCoins

        markupPrice =
            Item.markupValue >> Purse.toLeastCoins >> Purse.ppCoins
    in
    case DragDrop.source dnd of
        Just (DragSlot item _) ->
            selling item

        Just (DragPack item _) ->
            selling item

        Just (DragMerchant item _) ->
            buying item

        Nothing ->
            text "Welcome to my humble store. What would you like to purchase today?"


viewGround : List Item -> DragDrop Draggable Droppable -> Html Inventory.Msg
viewGround items dnd =
    let
        makeDraggable items item =
            DragDrop.draggable (Item.view item) (DragMerchant item (Ground items)) dnd

        droppableDiv =
            div [ HA.class "droppable" ]
                (List.map (makeDraggable items) items)

        droppableGround =
            DragDrop.droppable (DropMerchant (Ground items)) dnd droppableDiv
                |> Html.map DnDMsg
    in
    viewAsContainer "Ground" [ droppableGround ]


viewAsContainer : String -> List (Html msg) -> Html msg
viewAsContainer name children =
    viewAsContainer_ name [] children


viewAsPurse : List (Html msg) -> Html msg
viewAsPurse =
    viewAsContainer_ "Purse" [ HA.class "container__purse" ]


viewAsContainer_ : String -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
viewAsContainer_ name attrs children =
    let
        childrenWithEmptyChild =
            case children of
                [] ->
                    [ div [ HA.class "container-group__empty-child" ] [ text "Empty" ] ]

                x ->
                    x
    in
    div (HA.class "inventory__container-group" :: attrs)
        [ div [ HA.class "container-group__name" ] [ text name ]
        , div [ HA.class "container-group__contents" ] childrenWithEmptyChild
        ]


viewPackInfo : Maybe (Pack Item) -> String
viewPackInfo maybeItem =
    case maybeItem of
        Just pack ->
            let
                ( cur, cap ) =
                    Pack.info pack

                print name a b =
                    name ++ ": " ++ toString a ++ " / " ++ toString b
            in
            print "Bulk" cur.bulk cap.maxBulk ++ ", " ++ print "Weight" cur.weight cap.maxWeight

        _ ->
            ""



---------------
-- Pack view --
---------------


viewPack : Maybe (Pack Item) -> Inventory -> Html Inventory.Msg
viewPack maybePack ({ dnd } as inventory) =
    let
        packDiv pack =
            viewContainer pack inventory

        isDraggingPack =
            case DragDrop.source dnd of
                Just (DragSlot _ PackSlot) ->
                    True

                _ ->
                    False
    in
    case ( maybePack, isDraggingPack ) of
        ( _, True ) ->
            div [] [ text "Pack being dragged." ]

        ( Just pack, _ ) ->
            DragDrop.droppable (DropPack pack) dnd (packDiv pack)
                |> Html.map DnDMsg

        _ ->
            div [] [ text "You have no pack! Equip a pack to use this space." ]


viewShop : Store -> DragDrop Draggable Droppable -> Html Inventory.Msg
viewShop store dnd =
    let
        wares =
            Shops.wares store

        makeDraggable : Item -> Html (DragDrop.Msg Draggable a)
        makeDraggable item =
            DragDrop.draggable (Item.view item) (DragMerchant item (Shop store)) dnd

        shopDiv =
            viewAsContainer "Store" (List.map makeDraggable wares)
    in
    DragDrop.droppable (DropMerchant (Shop store)) dnd shopDiv
        |> Html.map DnDMsg


viewContainer : Pack Item -> Inventory -> Html (DragDrop.Msg Draggable Droppable)
viewContainer pack ({ equipment, dnd } as model) =
    let
        items =
            Equipment.getPackContent equipment

        makeDraggable item =
            DragDrop.draggable (Item.view item) (DragPack item pack) dnd
    in
    viewAsContainer "Pack" (List.map makeDraggable items)



--------------------
-- Equipment View --
--------------------


viewEquipment : Equipment -> DragDrop Draggable Droppable -> Html Inventory.Msg
viewEquipment equipment dnd =
    let
        viewTopRow =
            div [ HA.class "equipment__top-row" ]

        viewBottomRow =
            div [ HA.class "equipment__bottom-row" ]

        viewPanel =
            div [ HA.class "equipment-panel" ]

        viewEquipmentDude =
            div [ HA.class "equipment-dude" ] []
    in
    div [ HA.class "inventory__equipment" ]
        [ viewTopRow
            [ viewSlot Equipment.ArmourSlot dnd equipment
            , viewSlot Equipment.NeckwearSlot dnd equipment
            , viewSlot Equipment.OvergarmentSlot dnd equipment
            , viewSlot Equipment.HelmetSlot dnd equipment
            , viewSlot Equipment.ShieldSlot dnd equipment
            ]
        , viewBottomRow
            [ viewPanel
                [ viewSlot Equipment.BracersSlot dnd equipment
                , viewSlot Equipment.WeaponSlot dnd equipment
                , viewSlot Equipment.RightRingSlot dnd equipment
                , viewSlot Equipment.BeltSlot dnd equipment
                , viewSlot Equipment.PackSlot dnd equipment
                ]
            , viewEquipmentDude
            , viewPanel
                [ viewSlot Equipment.GauntletsSlot dnd equipment
                , viewSlot Equipment.FreehandSlot dnd equipment
                , viewSlot Equipment.LeftRingSlot dnd equipment
                , viewSlot Equipment.BootsSlot dnd equipment
                , viewSlot Equipment.PurseSlot dnd equipment
                ]
            ]
        ]


viewSlot : EquipmentSlot -> DragDrop Draggable Droppable -> Equipment -> Html Inventory.Msg
viewSlot slot dnd equipment =
    let
        viewSlotName =
            div [ HA.class "equipment__slot-name" ] [ text (Equipment.slotDisplayName slot) ]

        draggableHtml item =
            Item.viewSlot item ("Slot: " ++ toString slot)

        drawItem item slot =
            DragDrop.draggable (draggableHtml item) (DragSlot item slot) dnd
                |> Html.map DnDMsg
    in
    case Equipment.get slot equipment of
        Just item ->
            div [ HA.class "equipment__slot" ]
                [ drawItem item slot ]

        Nothing ->
            div [ HA.class "equipment__slot" ]
                [ DragDrop.droppable (DropEquipment slot) dnd viewSlotName
                    |> Html.map DnDMsg
                ]



----------------
-- Purse View --
----------------


viewPurse : Inventory -> Html never
viewPurse ({ equipment } as inventory) =
    let
        viewCoinDescription coinAsString value =
            div [ HA.class "coin__description" ]
                [ text <| value ++ " pieces of " ++ coinAsString ]

        viewCoinImg coinAsString =
            div [ HA.class "coin__image" ]
                [ i [ HA.class ("coins-" ++ coinAsString ++ " cotw-item") ] [] ]

        viewCoin coinAsString value =
            div [ HA.class "purse__coin" ]
                [ viewCoinImg coinAsString
                , viewCoinDescription coinAsString (toString value)
                ]

        coinView { copper, silver, gold, platinum } =
            viewAsPurse
                [ viewCoin "copper" copper
                , viewCoin "silver" silver
                , viewCoin "gold" gold
                , viewCoin "platinum" platinum
                ]
    in
    Equipment.getPurse equipment
        |> Maybe.map Item.detail
        |> Maybe.map .coins
        |> Maybe.map coinView
        |> Maybe.withDefault (div [] [])
