module Inventory
    exposing
        ( Draggable(..)
        , Droppable(..)
        , Inventory
        , Merchant(..)
        , Msg(..)
        , exit
        , init
        , subscription
        , update
        )

{-| The inventory module predominantlys acts as the user interface for the 'i'nventory and shop screen.
It handles equipping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...

-}

import Comms exposing (Comms)
import Equipment exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Item exposing (..)
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Purse as Purse
import Message
import Shops exposing (Shops, Store)
import Utils.DragDrop as DragDrop exposing (DragDrop)
import Utils.Misc


type Merchant
    = Shop Store
    | Ground (List Item)


type alias Inventory =
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
    { dnd = DragDrop.init
    , merchant = merchant
    , equipment = equipment
    }



------------
-- Update --
------------


update : Msg -> Inventory -> ( Inventory, Comms Msg )
update msg ({ dnd } as inventory) =
    case msg of
        DnDMsg dragDropMsg ->
            let
                ( dnd_, end ) =
                    DragDrop.update dragDropMsg inventory.dnd

                modelNewDnD =
                    { inventory | dnd = DragDrop.init }
            in
            case end of
                Nothing ->
                    ( { inventory | dnd = dnd_ }, Comms.init )

                Just ( Nothing, _ ) ->
                    ( modelNewDnD, Comms.init )

                Just ( _, Nothing ) ->
                    ( modelNewDnD, Comms.init )

                {- On mouse up, if there was something being dragged and a it's being dragged over a droppable container,
                   then call a function to handle the transaction, otherwise just clear the dndModel and return.
                -}
                Just ( Just drag, Just drop ) ->
                    handleDragDrop drag drop modelNewDnD


exit : Inventory -> ( Inventory, Equipment, Merchant )
exit inventory =
    ( inventory, inventory.equipment, inventory.merchant )



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
handleDragDrop : Draggable -> Droppable -> Inventory -> ( Inventory, Comms msg )
handleDragDrop dragSource dropTarget inventory =
    if dragSourceSameAsDropTarget dragSource dropTarget then
        ( inventory, Comms.init )
    else
        case handleDrag dragSource inventory of
            Result.Ok ( inv, item ) ->
                handleDrop dropTarget item inv

            Result.Err errMsg ->
                ( inventory, Comms.init |> Comms.addMessage (Message.bad errMsg) )


{-| handleDrag

  - Shop:
      - Check player can afford item

  - Equipment slot:
      - Check it's not cursed

  - Pack:
      - Nothing

-}
handleDrag : Draggable -> Inventory -> Result String ( Inventory, Item )
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


transactWithMerchant : Item -> Inventory -> Result String ( Inventory, Item )
transactWithMerchant item ({ merchant, equipment } as model) =
    let
        updateModelFromPurchase shop purse =
            ( { model
                | merchant = Shop shop
                , equipment = Equipment.setPurse purse equipment
              }
            , item
            )
    in
    case merchant of
        Shop shop ->
            equipment
                |> Equipment.getPurse
                |> Result.fromMaybe "Where is your purse? It doesn't look like you have one, or if you did... perhaps some shady fellow helped themselves to it."
                |> Result.andThen (Purse.remove (Item.markupValue item))
                |> Result.map2 updateModelFromPurchase (Shops.remove item shop)

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
handleDrop : Droppable -> Item -> Inventory -> ( Inventory, Comms msg )
handleDrop droppable item inventory =
    let
        resultToReturn originalInv res =
            case res of
                Result.Ok inv ->
                    ( inv, Comms.init )

                Result.Err comms ->
                    ( originalInv, comms )
    in
    case droppable of
        DropPack pack ->
            Equipment.putInPack item inventory.equipment
                |> Result.mapError (\errMsg -> Comms.init |> Comms.addMessage (Message.bad errMsg))
                |> Result.map (\eq -> { inventory | equipment = eq })
                |> resultToReturn inventory

        DropEquipment slot ->
            case Equipment.equip ( slot, item ) inventory.equipment of
                Result.Ok ( equipment_, Nothing, msg ) ->
                    ( { inventory | equipment = equipment_ }
                    , Comms.init
                        |> Comms.addMessage (Message.bad msg)
                    )

                Result.Ok ( _, Just _, _ ) ->
                    ( inventory
                    , Comms.init
                        |> Comms.addMessage (Message.bad "The slot is not empty!")
                    )

                Result.Err err ->
                    ( inventory
                    , Comms.init
                        |> Comms.addMessage (Message.bad (toString err))
                    )

        DropMerchant merchant ->
            let
                sellTo shop purse =
                    let
                        ( shopAfterBought, purseAfterPaid ) =
                            Shops.buyFromHero item purse shop
                    in
                    ( { inventory
                        | merchant = Shop shopAfterBought
                        , equipment = Equipment.setPurse purseAfterPaid inventory.equipment
                      }
                    , Comms.init
                    )
            in
            case merchant of
                Shop shop ->
                    inventory.equipment
                        |> Equipment.getPurse
                        |> Maybe.map (sellTo shop)
                        |> Maybe.withDefault
                            ( inventory
                            , Comms.addMessage (Message.bad "No purse to hold coins!") Comms.init
                            )

                Ground items ->
                    ( { inventory | merchant = Ground (item :: items) }, Comms.init )



----------
-- View --
----------


subscription : Inventory -> Sub Msg
subscription { dnd } =
    Sub.map DnDMsg (DragDrop.subscription dnd)
