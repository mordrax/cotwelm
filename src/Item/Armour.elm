module Item.Armour exposing (init)

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : ArmourType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Armour
init armourType status idStatus id =
    let
        make name mass css prices ac =
            { base = BaseItem name prices css mass status idStatus id
            , armourType = armourType
            , ac = ac
            }
    in
        case armourType of
            RustyArmour ->
                make "Rusty Armour" (Mass.Mass 10000 30000) "BrokenArmour" (Prices 0 25) (AC 0)

            LeatherArmour ->
                make "Leather Armour" (Mass.Mass 5000 2400) "LeatherArmour" (Prices 1080 600) (AC 6)

            StuddedLeatherArmour ->
                make "Studded Leather Armour" (Mass.Mass 7000 25000) "LeatherArmour" (Prices 3150 1800) (AC 12)

            RingMail ->
                make "Ring Mail" (Mass.Mass 8000 30000) "MetalArmour" (Prices 6300 3600) (AC 18)

            ScaleMail ->
                make "Scale Mail" (Mass.Mass 9000 30000) "MetalArmour" (Prices 10800 6000) (AC 24)

            ChainMail ->
                make "Chain Mail" (Mass.Mass 10000 30000) "MetalArmour" (Prices 16200 9000) (AC 30)

            SplintMail ->
                make "Splint Mail" (Mass.Mass 12000 40000) "MetalArmour" (Prices 27000 15000) (AC 36)

            PlateMail ->
                make "Plate Mail" (Mass.Mass 15000 40000) "MetalArmour" (Prices 42000 24000) (AC 42)

            PlateArmour ->
                make "Plate Armour" (Mass.Mass 15000 60000) "MetalArmour" (Prices 42000 24000) (AC 48)

            MeteoricSteelPlate ->
                make "Meteoric Steel Plate" (Mass.Mass 5000 30000) "MetalArmour" (Prices 105000 60000) (AC 54)

            ElvenChainMail ->
                make "Elven Chain Mail" (Mass.Mass 5000 24000) "MetalArmour" (Prices 162000 90000) (AC 52)
