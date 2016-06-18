module Item.Belt exposing (..)

import Mass exposing (..)
import IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)
import Container exposing (..)


type Belt a
    = BeltModelTag BeltType Model (BeltModel a)


newBelt : BeltType -> ID -> ItemStatus -> IdentificationStatus -> (Mass -> Container a) -> Belt a
newBelt beltType id status idStatus newContainer =
    case beltType of
        TwoSlotBelt ->
            BeltModelTag TwoSlotBelt
                (Model id "Two Slot Belt" 300 300 "SlotBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 2 0 0 0 <| newContainer (Mass.new 2100 3100))

        ThreeSlotBelt ->
            BeltModelTag ThreeSlotBelt
                (Model id "Three Slot Belt" 300 300 "SlotBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 3 0 0 0 <| newContainer (Mass.new 2600 3600))

        FourSlotBelt ->
            BeltModelTag FourSlotBelt
                (Model id "Four Slot Belt" 300 300 "SlotBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 4 0 0 0 <| newContainer (Mass.new 3100 4100))

        UtilityBelt ->
            BeltModelTag UtilityBelt
                (Model id "Utility Belt" 1350 1800 "UtilityBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 2 4 4 0 <| newContainer (Mass.new 3100 4100))

        WandQuiverBelt ->
            BeltModelTag WandQuiverBelt
                (Model id "Wand Quiver Belt" 300 300 "WandQuiverBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 2 0 0 4 <| newContainer (Mass.new 3100 4100))
