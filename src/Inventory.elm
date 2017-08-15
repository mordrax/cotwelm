module Inventory
    exposing
        ( Draggable
        , Droppable
        , Inventory
        , Merchant(..)
        , Msg
        , exit
        , init
        , subscription
        , update
        , view
        )

{-| The inventory module predominantlys acts as the user interface for the 'i'nventory and shop screen.
It handles equipping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...

-}

import Container exposing (Container)
import Equipment exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Item exposing (..)
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Purse as Purse
import Shops exposing (Shops, Store)
import Utils.DragDrop as DragDrop exposing (DragDrop)
import Utils.Misc


type Inventory
    = A Model


type Merchant
    = Shop Store
    | Ground (List Item)


type alias Model =
    { dnd : DragDrop Draggable Droppable
    , merchant : Merchant
    , equipment : Equipment
    }


type Draggable
    = DragSlot Item EquipmentSlot
    | DragPack Item (Pack Item)
    | DragMerchant Item Merchant


type Droppable
    = DropPack (Pack Item)
    | DropEquipment EquipmentSlot
    | DropMerchant Merchant


type Msg
    = DnDMsg (DragDrop.Msg Draggable Droppable)


init : Merchant -> Equipment -> Inventory
init merchant equipment =
    A
        { dnd = DragDrop.init
        , merchant = merchant
        , equipment = equipment
        }



------------
-- Update --
------------


update : Msg -> Inventory -> Inventory
update msg (A ({ dnd } as model)) =
    case msg of
        DnDMsg dragDropMsg ->
            let
                ( dnd_, end ) =
                    DragDrop.update dragDropMsg model.dnd

                modelNewDnD =
                    { model | dnd = DragDrop.init }
            in
            case end of
                Nothing ->
                    A { model | dnd = dnd_ }

                Just ( Nothing, _ ) ->
                    A modelNewDnD

                Just ( _, Nothing ) ->
                    A modelNewDnD

                {- On mouse up, if there was something being dragged and a it's being dragged over a droppable container,
                   then call a function to handle the transaction, otherwise just clear the dndModel and return.
                -}
                Just ( Just drag, Just drop ) ->
                    A <| handleDragDrop drag drop modelNewDnD


exit : Inventory -> ( Inventory, Equipment, Merchant )
exit (A model) =
    ( A model, model.equipment, model.merchant )



---------------------
-- Drag drop logic --
---------------------


dragSourceSameAsDropTarget : Draggable -> Droppable -> Bool
dragSourceSameAsDropTarget dragSource dropTarget =
    case ( dragSource, dropTarget ) of
        ( DragSlot _ dragSlot, DropEquipment dropSlot ) ->
            dragSlot == dropSlot

        ( DragPack _ _, DropPack _ ) ->
            True

        ( DragMerchant _ _, DropMerchant _ ) ->
            True

        _ ->
            False


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
handleDragDrop : Draggable -> Droppable -> Model -> Model
handleDragDrop dragSource dropTarget model =
    let
        dragResult =
            handleDrag dragSource model

        noChange =
            model

        handleDrop_ item modelWithDrag =
            case handleDrop dropTarget item modelWithDrag of
                Result.Ok modelWithDragDrop ->
                    modelWithDragDrop

                Err msg ->
                    let
                        _ =
                            Debug.log "Drop failed: " msg
                    in
                    noChange
    in
    if dragSourceSameAsDropTarget dragSource dropTarget then
        noChange
    else
        case dragResult of
            Result.Ok ( modelWithDrag, item ) ->
                handleDrop_ item modelWithDrag

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
handleDrag : Draggable -> Model -> Result String ( Model, Item )
handleDrag draggable model =
    case draggable of
        DragSlot item slot ->
            let
                unequipRes =
                    Equipment.unequip slot model.equipment
            in
            case unequipRes of
                Result.Ok ( equipment, _ ) ->
                    Result.Ok ( { model | equipment = equipment }, item )

                Result.Err msg ->
                    Result.Err (toString msg)

        DragPack item pack ->
            let
                modelItemRemoved =
                    { model | equipment = Equipment.removeFromPack item model.equipment }

                _ =
                    Debug.log "TODO: Remove item from the pack.container and return just the item" 1
            in
            Result.Ok ( modelItemRemoved, item )

        DragMerchant item shop ->
            transactWithMerchant item model


transactWithMerchant : Item -> Model -> Result String ( Model, Item )
transactWithMerchant item ({ merchant, equipment } as model) =
    let
        maybePurse =
            Equipment.getPurse equipment

        buyFrom shop =
            case maybePurse of
                Just purse ->
                    Shops.sell item purse shop

                Nothing ->
                    Result.Err "Where is your purse? It doesn't look like you have one, or if you did... perhaps some shady fellow helped themselves to it."

        updateModelFromPurchase ( shop, purse ) =
            Result.Ok
                ( { model
                    | merchant = Shop shop
                    , equipment = Equipment.setPurse purse equipment
                  }
                , item
                )
    in
    case merchant of
        Shop shop ->
            buyFrom shop
                |> Result.andThen updateModelFromPurchase

        Ground items ->
            let
                itemsWithoutItem =
                    Utils.Misc.removeFirst item Item.equals items
            in
            Result.Ok ( { model | merchant = Ground itemsWithoutItem }, item )


{-| handleDrop

  - Shop:
      - Nothing

  - Equipment slot:
      - Check if an item is already equipped

  - Pack
      - Check pack capacity

-}
handleDrop : Droppable -> Item -> Model -> Result String Model
handleDrop droppable item model =
    case droppable of
        DropPack pack ->
            let
                ( equipment_, equipMsg ) =
                    Equipment.putInPack item model.equipment

                success =
                    Result.Ok { model | equipment = equipment_ }
            in
            case equipMsg of
                Equipment.Success ->
                    success

                Equipment.NoPackEquipped ->
                    Result.Err "Can't add to the pack. No packed equipped!"

                Equipment.ContainerMsg Container.Ok ->
                    success

                Equipment.ContainerMsg msg ->
                    Result.Err ("Dropping into pack with unhandled item msg" ++ toString msg)

                msg ->
                    Result.Err ("Dropping into pack failed with unhanded msg: " ++ toString msg)

        DropEquipment slot ->
            case Equipment.equip ( slot, item ) model.equipment of
                Result.Ok ( equipment_, Nothing ) ->
                    Result.Ok { model | equipment = equipment_ }

                Result.Ok ( _, Just _ ) ->
                    Result.Err "The slot is not empty!"

                Result.Err err ->
                    Result.Err (toString err)

        DropMerchant merchant ->
            let
                getPurseResult =
                    model.equipment
                        |> Equipment.getPurse
                        |> Result.fromMaybe "No purse to hold coins!"

                sellTo shop purse =
                    let
                        ( shopAfterBought, purseAfterPaid ) =
                            Shops.buy item purse shop
                    in
                    Result.Ok
                        { model
                            | merchant = Shop shopAfterBought
                            , equipment = Equipment.setPurse purseAfterPaid model.equipment
                        }
            in
            case merchant of
                Shop shop ->
                    getPurseResult
                        |> Result.andThen (sellTo shop)

                Ground items ->
                    Result.Ok { model | merchant = Ground (item :: items) }



----------
-- View --
----------


view : Inventory -> Html Msg
view (A ({ equipment, dnd } as model)) =
    let
        header title =
            div [ HA.class "ui block header" ] [ text title ]

        heading title =
            span [ HA.class "ui text container segment" ] [ text title ]

        columnWidth width children =
            div [ HA.class (width ++ " wide column") ] children
    in
    div [ HA.class "inventory" ]
        [ viewEquipment equipment dnd
        , viewShopPackPurse model
        , Html.map DnDMsg (DragDrop.view dnd)
        ]


viewShopPackPurse : Model -> Html Msg
viewShopPackPurse ({ equipment, merchant, dnd } as model) =
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
        , viewPack maybePack model
        , viewPurse model
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


viewGround : List Item -> DragDrop Draggable Droppable -> Html Msg
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


viewPack : Maybe (Pack Item) -> Model -> Html Msg
viewPack maybePack ({ dnd } as model) =
    let
        packDiv pack =
            viewContainer pack model

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


viewShop : Store -> DragDrop Draggable Droppable -> Html Msg
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


viewContainer : Pack Item -> Model -> Html (DragDrop.Msg Draggable Droppable)
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


viewEquipment : Equipment -> DragDrop Draggable Droppable -> Html Msg
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


viewSlot : EquipmentSlot -> DragDrop Draggable Droppable -> Equipment -> Html Msg
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


viewPurse : Model -> Html never
viewPurse ({ equipment } as model) =
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


subscription : Inventory -> Sub Msg
subscription (A { dnd }) =
    Sub.map DnDMsg (DragDrop.subscription dnd)
