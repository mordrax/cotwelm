module Item.Belt exposing (..)

import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : BeltType -> ItemStatus -> IdentificationStatus -> Belt BasicItem
init beltType status idStatus =
    EveryDict.get beltType data
        |> Maybe.withDefault twoSlotBelt
        |> setBeltData beltType


setBeltData : BeltType -> BeltData -> Belt BasicItem
setBeltData beltType (BeltData beltContainer baseItem) =
    initBasicItem baseItem BIT_Belt
        |> setBeltType beltType
        |> setBeltContainer beltContainer


type BeltData
    = BeltData BeltOfItems BaseItem


twoSlotBelt : BeltData
twoSlotBelt =
    BeltData (initBeltContainer TwoSlotBelt) (BaseItem "Two Slot Belt" (Prices 300 300) "slot-belt" (Mass 0 0) Normal Identified)


data : EveryDict BeltType BeltData
data =
    EveryDict.fromList
        [ ( TwoSlotBelt, twoSlotBelt )
        , ( ThreeSlotBelt, BeltData (initBeltContainer ThreeSlotBelt) (BaseItem "Three Slot Belt" (Prices 300 300) "slot-belt" (Mass 0 0) Normal Identified) )
        , ( FourSlotBelt, BeltData (initBeltContainer FourSlotBelt) (BaseItem "Four Slot Belt" (Prices 300 300) "slot-belt" (Mass 0 0) Normal Identified) )
        , ( UtilityBelt, BeltData (initBeltContainer UtilityBelt) (BaseItem "Utility Belt" (Prices 1350 1800) "utility-belt" (Mass 0 0) Normal Identified) )
        , ( WandQuiverBelt, BeltData (initBeltContainer WandQuiverBelt) (BaseItem "Wand Quiver Belt" (Prices 300 300) "wand-quiver-belt" (Mass 0 0) Normal Identified) )
        ]


initBeltContainer : BeltType -> BeltOfItems
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
