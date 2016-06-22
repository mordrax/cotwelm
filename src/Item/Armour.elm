module Item.Armour exposing (Armour(..), newArmour)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Armour
    = ArmourM ArmourType ArmourModel


newArmour : ArmourType -> ID -> ItemStatus -> IdentificationStatus -> Armour
newArmour armourType id status idStatus =
    case armourType of
        RustyArmour ->
            ArmourM RustyArmour
                { ac = 0
                , baseItem = (Model id "Rusty Armour" 10000 30000 "BrokenArmour" status idStatus <| Mass.new 0 25)
                }

        LeatherArmour ->
            ArmourM LeatherArmour
                { ac = 6
                , baseItem = (Model id "Leather Armour" 5000 2400 "LeatherArmour" status idStatus <| Mass.new 1080 600)
                }

        StuddedLeatherArmour ->
            ArmourM StuddedLeatherArmour
                { ac = 12
                , baseItem = (Model id "Studded Leather Armour" 7000 25000 "LeatherArmour" status idStatus <| Mass.new 3150 1800)
                }

        RingMail ->
            ArmourM RingMail
                { ac = 18
                , baseItem = (Model id "Ring Mail" 8000 30000 "MetalArmour" status idStatus <| Mass.new 6300 3600)
                }

        ScaleMail ->
            ArmourM ScaleMail
                { ac = 24
                , baseItem = (Model id "Scale Mail" 9000 30000 "MetalArmour" status idStatus <| Mass.new 10800 6000)
                }

        ChainMail ->
            ArmourM ChainMail
                { ac = 30
                , baseItem = (Model id "Chain Mail" 10000 30000 "MetalArmour" status idStatus <| Mass.new 16200 9000)
                }

        SplintMail ->
            ArmourM SplintMail
                { ac = 36
                , baseItem = (Model id "Splint Mail" 12000 40000 "MetalArmour" status idStatus <| Mass.new 27000 15000)
                }

        PlateMail ->
            ArmourM PlateMail
                { ac = 42
                , baseItem = (Model id "Plate Mail" 15000 40000 "MetalArmour" status idStatus <| Mass.new 42000 24000)
                }

        PlateArmour ->
            ArmourM PlateArmour
                { ac = 48
                , baseItem = (Model id "Plate Armour" 15000 60000 "MetalArmour" status idStatus <| Mass.new 42000 24000)
                }

        MeteoricSteelPlate ->
            ArmourM MeteoricSteelPlate
                { ac = 54
                , baseItem = (Model id "Meteoric Steel Plate" 5000 30000 "MetalArmour" status idStatus <| Mass.new 105000 60000)
                }

        ElvenChainMail ->
            ArmourM ElvenChainMail
                { ac = 52
                , baseItem = (Model id "Elven Chain Mail" 50000 24000 "MetalArmour" status idStatus <| Mass.new 162000 90000)
                }
