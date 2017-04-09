module Item.Belt exposing (..)

import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : BeltType -> ItemStatus -> IdentificationStatus -> Belt a
init beltType status idStatus =
    let
        make name mass css prices container =
            { base = BaseItem name prices css mass status idStatus
            , beltType = beltType
            , beltContainer = initBeltContainer beltType
            }
    in
        case beltType of
            TwoSlotBelt ->
                make "Two Slot Belt" (Mass.Mass 0 0) "slot-belt" (Prices 300 300) (initBeltContainer TwoSlotBelt)

            ThreeSlotBelt ->
                make "Three Slot Belt" (Mass.Mass 0 0) "slot-belt" (Prices 300 300) (initBeltContainer ThreeSlotBelt)

            FourSlotBelt ->
                make "Four Slot Belt" (Mass.Mass 0 0) "slot-belt" (Prices 300 300) (initBeltContainer FourSlotBelt)

            UtilityBelt ->
                make "Utility Belt" (Mass.Mass 0 0) "utility-belt" (Prices 1350 1800) (initBeltContainer UtilityBelt)

            WandQuiverBelt ->
                make "Wand Quiver Belt" (Mass.Mass 0 0) "wand-quiver-belt" (Prices 300 300) (initBeltContainer WandQuiverBelt)


initBeltContainer : BeltType -> BeltContainer a
initBeltContainer beltType =
    case beltType of
        TwoSlotBelt ->
            TwoSlot ( Nothing, Nothing )

        ThreeSlotBelt ->
            ThreeSlot ( Nothing, Nothing, Nothing )

        FourSlotBelt ->
            FourSlot ( Nothing, Nothing, Nothing, Nothing )

        -- 2 slot, 4 scrolls, 4 potions
        UtilityBelt ->
            TwoSlot ( Nothing, Nothing )

        -- 2 slot, 4 wands
        WandQuiverBelt ->
            TwoSlot ( Nothing, Nothing )
