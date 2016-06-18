module Item.Armour exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Armour
    = ArmourModelTag ArmourType Model ArmourModel


newArmour : ArmourType -> ID -> ItemStatus -> IdentificationStatus -> Armour
newArmour armourType id status idStatus =
    case armourType of
        RustyArmour ->
            ArmourModelTag RustyArmour
                (Model id "Rusty Armour" 10000 30000 "BrokenArmour" status idStatus <| Mass.new 0 25)
                (ArmourModel 0)

        LeatherArmour ->
            ArmourModelTag LeatherArmour
                (Model id "Leather Armour" 5000 2400 "LeatherArmour" status idStatus <| Mass.new 1080 600)
                (ArmourModel 6)

        StuddedLeatherArmour ->
            ArmourModelTag StuddedLeatherArmour
                (Model id "Studded Leather Armour" 7000 25000 "LeatherArmour" status idStatus <| Mass.new 3150 1800)
                (ArmourModel 12)

        RingMail ->
            ArmourModelTag RingMail
                (Model id "Ring Mail" 8000 30000 "MetalArmour" status idStatus <| Mass.new 6300 3600)
                (ArmourModel 18)

        ScaleMail ->
            ArmourModelTag ScaleMail
                (Model id "Scale Mail" 9000 30000 "MetalArmour" status idStatus <| Mass.new 10800 6000)
                (ArmourModel 24)

        ChainMail ->
            ArmourModelTag ChainMail
                (Model id "Chain Mail" 10000 30000 "MetalArmour" status idStatus <| Mass.new 16200 9000)
                (ArmourModel 30)

        SplintMail ->
            ArmourModelTag SplintMail
                (Model id "Splint Mail" 12000 40000 "MetalArmour" status idStatus <| Mass.new 27000 15000)
                (ArmourModel 36)

        PlateMail ->
            ArmourModelTag PlateMail
                (Model id "Plate Mail" 15000 40000 "MetalArmour" status idStatus <| Mass.new 42000 24000)
                (ArmourModel 42)

        PlateArmour ->
            ArmourModelTag PlateArmour
                (Model id "Plate Armour" 15000 60000 "MetalArmour" status idStatus <| Mass.new 42000 24000)
                (ArmourModel 48)

        MeteoricSteelPlate ->
            ArmourModelTag MeteoricSteelPlate
                (Model id "Meteoric Steel Plate" 5000 30000 "MetalArmour" status idStatus <| Mass.new 105000 60000)
                (ArmourModel 54)

        ElvenChainMail ->
            ArmourModelTag ElvenChainMail
                (Model id "Elven Chain Mail" 50000 24000 "MetalArmour" status idStatus <| Mass.new 162000 90000)
                (ArmourModel 52)
