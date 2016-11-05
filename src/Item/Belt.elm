module Item.Belt exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Container exposing (..)


type Belt a
    = Belt BeltType (Model a)


type alias Model a =
    { slot : Int
    , scroll : Int
    , wand : Int
    , potion : Int
    , container : Container a
    }


init : BeltType -> (Capacity -> Container a) -> Belt a
init beltType makeContainer =
    case beltType of
        TwoSlotBelt ->
            Belt TwoSlotBelt <| Model 2 0 0 0 <| makeContainer (Capacity 2100 3100)

        ThreeSlotBelt ->
            Belt ThreeSlotBelt <| Model 3 0 0 0 <| makeContainer (Capacity 2600 3600)

        FourSlotBelt ->
            Belt FourSlotBelt <| Model 4 0 0 0 <| makeContainer (Capacity 3100 4100)

        UtilityBelt ->
            Belt UtilityBelt <| Model 2 4 4 0 <| makeContainer (Capacity 3100 4100)

        WandQuiverBelt ->
            Belt WandQuiverBelt <| Model 2 0 0 4 <| makeContainer (Capacity 3100 4100)


blueprint : BeltType -> BaseItemData
blueprint beltType =
    case beltType of
        TwoSlotBelt ->
            BaseItemData "Two Slot Belt" 0 0 "SlotBelt" 300 300

        ThreeSlotBelt ->
            BaseItemData "Three Slot Belt" 0 0 "SlotBelt" 300 300

        FourSlotBelt ->
            BaseItemData "Four Slot Belt" 0 0 "SlotBelt" 300 300

        UtilityBelt ->
            BaseItemData "Utility Belt" 0 0 "UtilityBelt" 1350 1800

        WandQuiverBelt ->
            BaseItemData "Wand Quiver Belt" 0 0 "WandQuiverBelt" 300 300
