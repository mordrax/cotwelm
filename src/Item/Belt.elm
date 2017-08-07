module Item.Belt exposing (..)

import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : BeltType -> ItemStatus -> IdentificationStatus -> ( BaseItem, BeltDetails a )
init beltType status idStatus =
    let
        make name mass css itemValue container =
            ( BaseItem name itemValue css mass status idStatus
            , { beltType = beltType
              , beltContainer = initBeltContainer beltType
              }
            )
    in
    case beltType of
        TwoSlotBelt ->
            make "Two Slot Belt" (Mass.Mass 0 0) "slot-belt" (ItemValue 12) (initBeltContainer TwoSlotBelt)

        ThreeSlotBelt ->
            make "Three Slot Belt" (Mass.Mass 0 0) "slot-belt" (ItemValue 12) (initBeltContainer ThreeSlotBelt)

        FourSlotBelt ->
            make "Four Slot Belt" (Mass.Mass 0 0) "slot-belt" (ItemValue 12) (initBeltContainer FourSlotBelt)

        UtilityBelt ->
            make "Utility Belt" (Mass.Mass 0 0) "utility-belt" (ItemValue 54) (initBeltContainer UtilityBelt)

        WandQuiverBelt ->
            make "Wand Quiver Belt" (Mass.Mass 0 0) "wand-quiver-belt" (ItemValue 12) (initBeltContainer WandQuiverBelt)


initBeltContainer : BeltType -> BeltContainer a
initBeltContainer beltType =
    case beltType of
        TwoSlotBelt ->
            TwoSlot Nothing Nothing

        ThreeSlotBelt ->
            ThreeSlot Nothing Nothing Nothing

        FourSlotBelt ->
            FourSlot Nothing Nothing Nothing Nothing

        -- 2 slot, 4 scrolls, 4 potions
        UtilityBelt ->
            TwoSlot Nothing Nothing

        -- 2 slot, 4 wands
        WandQuiverBelt ->
            TwoSlot Nothing Nothing
