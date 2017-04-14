module Inventory
    exposing
        ( Inventory
        , Merchant(..)
        , Msg
        , Draggable
        , Droppable
        , keyboardToInventoryMsg
        , init
        , view
        , update
        , subscription
        )

{-|
The inventory module predominantlys acts as the user interface for the 'i'nventory and shop screen.
It handles equipping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...
-}

import Container exposing (Container)
import Equipment exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Item exposing (..)
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Purse as Purse exposing (..)
import Keymap
import Shops exposing (Shops, Store)
import Task
import Utils.DragDrop as DragDrop exposing (DragDrop)
import Utils.Mass as Mass exposing (..)
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


type Msg source target
    = DnDMsg (DragDrop.Msg source target)
    | Keyboard Keymap.Msg


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


update : Msg Draggable Droppable -> Inventory -> ( Inventory, Maybe ( Equipment, Merchant ) )
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
                        ( A { model | dnd = dnd_ }, Nothing )

                    Just ( Nothing, _ ) ->
                        ( A modelNewDnD, Nothing )

                    Just ( _, Nothing ) ->
                        ( A modelNewDnD, Nothing )

                    {- On mouse up, if there was something being dragged and a it's being dragged over a droppable container,
                       then call a function to handle the transaction, otherwise just clear the dndModel and return.
                    -}
                    Just ( Just drag, Just drop ) ->
                        ( A <| handleDragDrop drag drop modelNewDnD, Nothing )

        Keyboard (Keymap.Esc) ->
            ( A model, Just ( model.equipment, model.merchant ) )

        Keyboard msg ->
            ( A model, Nothing )


keyboardToInventoryMsg : Keymap.Msg -> Msg s t
keyboardToInventoryMsg msg =
    Keyboard msg



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
                    Result.Err "No purse to buy anything with!"

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

                    Equipment.ContainerMsg (Container.Ok) ->
                        success

                    Equipment.ContainerMsg msg ->
                        Result.Err ("Dropping into pack with unhandled item msg" ++ (toString msg))

                    msg ->
                        Result.Err ("Dropping into pack failed with unhanded msg: " ++ (toString msg))

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


view : Inventory -> Html (Msg Draggable Droppable)
view (A ({ equipment, dnd } as model)) =
    let
        header title =
            div [ class "ui block header" ] [ text title ]

        heading title =
            span [ class "ui text container segment" ] [ text title ]

        columnWidth width children =
            div [ class (width ++ " wide column") ] children

        equipmentColumn =
            columnWidth "six" [ viewEquipment equipment dnd ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ Html.map DnDMsg equipmentColumn
                , viewShopPackPurse model
                ]
            , Html.map DnDMsg (DragDrop.view dnd)
            ]


viewShopPackPurse : Model -> Html (Msg Draggable Droppable)
viewShopPackPurse ({ equipment, merchant, dnd } as model) =
    let
        header title =
            div [ class "ui block header" ] [ text title ]

        columnWidth width children =
            div [ class (width ++ " wide column") ] children

        groundHtml items =
            div [] [ header "Ground", viewGround items dnd ]

        shopHtml shop =
            div []
                [ header "Shop"
                , viewShop shop dnd
                ]

        maybePack =
            Equipment.getPack equipment

        shopGroundHtml =
            case merchant of
                Shop shop ->
                    shopHtml shop

                Ground items ->
                    groundHtml items

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
        Html.map DnDMsg
            (columnWidth "ten"
                [ shopGroundHtml
                , packHtml
                , purseHtml
                ]
            )


viewGround : List Item -> DragDrop Draggable Droppable -> Html (DragDrop.Msg Draggable Droppable)
viewGround items dnd =
    let
        styles =
            style [ ( "background", "lightblue" ), ( "min-height", "100px" ) ]

        makeDraggable items item =
            DragDrop.draggable (Item.view item) (DragMerchant item (Ground items)) dnd

        droppableDiv =
            div [ class "ui cards", styles ] (List.map (makeDraggable items) items)

        droppableGround =
            DragDrop.droppable (DropMerchant (Ground items)) dnd droppableDiv
    in
        droppableGround


viewPackInfo : Maybe (Pack Item) -> String
viewPackInfo maybeItem =
    case maybeItem of
        Just pack ->
            let
                ( cur, cap ) =
                    Pack.info pack

                print name a b =
                    name ++ ": " ++ (toString a) ++ " / " ++ (toString b)
            in
                (print "Bulk" cur.bulk cap.maxBulk) ++ ", " ++ (print "Weight" cur.weight cap.maxWeight)

        _ ->
            ""



---------------
-- Pack view --
---------------


viewPack : Maybe (Pack Item) -> Model -> Html (DragDrop.Msg Draggable Droppable)
viewPack maybePack ({ dnd } as model) =
    let
        packStyle =
            style [ ( "background", "lightblue" ), ( "min-height", "100px" ) ]

        droppableHtml pack =
            (div [ packStyle ] [ viewContainer pack model ])

        isDraggingPack =
            case DragDrop.getSource dnd of
                Just (DragSlot _ PackSlot) ->
                    True

                _ ->
                    False
    in
        case ( maybePack, isDraggingPack ) of
            ( _, True ) ->
                div [] [ text "Pack being dragged." ]

            ( Just pack, _ ) ->
                DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "You have no pack! Equip a pack to use this space." ]


viewShop : Store -> DragDrop Draggable Droppable -> Html (DragDrop.Msg Draggable Droppable)
viewShop store dnd =
    let
        wares =
            Shops.wares store

        makeDraggable : Store -> Item -> Html (DragDrop.Msg Draggable a)
        makeDraggable shop item =
            DragDrop.draggable (Item.view item) (DragMerchant item (Shop shop)) dnd

        droppableDiv =
            div [ class "ui cards" ] (List.map (makeDraggable store) wares)

        droppableShop =
            DragDrop.droppable (DropMerchant (Shop store)) dnd droppableDiv

        --DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)
    in
        droppableShop


viewContainer : Pack Item -> Model -> Html (DragDrop.Msg Draggable Droppable)
viewContainer pack ({ equipment, dnd } as model) =
    let
        items =
            Equipment.getPackContent equipment

        makeDraggable pack item =
            DragDrop.draggable (Item.view item) (DragPack item pack) dnd
    in
        div [ class "ui cards" ]
            (List.map (makeDraggable pack) items)



--------------------
-- Equipment View --
--------------------


viewEquipment : Equipment -> DragDrop Draggable Droppable -> Html (DragDrop.Msg Draggable Droppable)
viewEquipment equipment dnd =
    let
        getEquipment slot =
            Equipment.get slot equipment

        drawItem item slot =
            DragDrop.draggable (Item.viewSlot item ("Slot: " ++ (toString slot))) (DragSlot item slot) dnd

        drawSlot slot =
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
            [ drawSlot Equipment.WeaponSlot
            , drawSlot Equipment.FreehandSlot
            , drawSlot Equipment.ArmourSlot
            , drawSlot Equipment.ShieldSlot
            , drawSlot Equipment.HelmetSlot
            , drawSlot Equipment.BracersSlot
            , drawSlot Equipment.GauntletsSlot
            , drawSlot Equipment.BeltSlot
            , drawSlot Equipment.PurseSlot
            , drawSlot Equipment.PackSlot
            , drawSlot Equipment.NeckwearSlot
            , drawSlot Equipment.OvergarmentSlot
            , drawSlot Equipment.LeftRingSlot
            , drawSlot Equipment.RightRingSlot
            , drawSlot Equipment.BootsSlot
            ]



----------------
-- Purse View --
----------------


viewPurse : Model -> Html (DragDrop.Msg Draggable Droppable)
viewPurse ({ equipment } as model) =
    let
        coinView { copper, silver, gold, platinum } =
            div [ class "ui grid" ]
                [ div [ class "coins-copper cotw-item" ] [ text (toString copper) ]
                , div [ class "coins-silver cotw-item" ] [ text (toString silver) ]
                , div [ class "coins-gold cotw-item" ] [ text (toString gold) ]
                , div [ class "coins-platinum cotw-item" ] [ text (toString platinum) ]
                ]
    in
        (Equipment.getPurse equipment)
            |> Maybe.map .coins
            |> Maybe.map coinView
            |> Maybe.withDefault (div [] [])


subscription : Inventory -> Sub (Msg Draggable Droppable)
subscription (A { dnd }) =
    Sub.map DnDMsg (DragDrop.subscription dnd)
