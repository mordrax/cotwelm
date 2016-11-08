module Item.Armour exposing (Armour, init, blueprint)

import Item.Data exposing (..)


type Armour
    = Armour ArmourType AC


init : ArmourType -> Armour
init armourType =
    case armourType of
        RustyArmour ->
            Armour RustyArmour (AC 0)

        LeatherArmour ->
            Armour LeatherArmour (AC 6)

        StuddedLeatherArmour ->
            Armour StuddedLeatherArmour (AC 12)

        RingMail ->
            Armour RingMail (AC 18)

        ScaleMail ->
            Armour ScaleMail (AC 24)

        ChainMail ->
            Armour ChainMail (AC 30)

        SplintMail ->
            Armour SplintMail (AC 36)

        PlateMail ->
            Armour PlateMail (AC 42)

        PlateArmour ->
            Armour PlateArmour (AC 48)

        MeteoricSteelPlate ->
            Armour MeteoricSteelPlate (AC 54)

        ElvenChainMail ->
            Armour ElvenChainMail (AC 52)


blueprint : ArmourType -> BaseItemData
blueprint armourType =
    case armourType of
        RustyArmour ->
            BaseItemData "Rusty Armour" 10000 30000 "BrokenArmour" 0 25

        LeatherArmour ->
            BaseItemData "Leather Armour" 5000 2400 "LeatherArmour" 1080 600

        StuddedLeatherArmour ->
            BaseItemData "Studded Leather Armour" 7000 25000 "LeatherArmour" 3150 1800

        RingMail ->
            BaseItemData "Ring Mail" 8000 30000 "MetalArmour" 6300 3600

        ScaleMail ->
            BaseItemData "Scale Mail" 9000 30000 "MetalArmour" 10800 6000

        ChainMail ->
            BaseItemData "Chain Mail" 10000 30000 "MetalArmour" 16200 9000

        SplintMail ->
            BaseItemData "Splint Mail" 12000 40000 "MetalArmour" 27000 15000

        PlateMail ->
            BaseItemData "Plate Mail" 15000 40000 "MetalArmour" 42000 24000

        PlateArmour ->
            BaseItemData "Plate Armour" 15000 60000 "MetalArmour" 42000 24000

        MeteoricSteelPlate ->
            BaseItemData "Meteoric Steel Plate" 5000 30000 "MetalArmour" 105000 60000

        ElvenChainMail ->
            BaseItemData "Elven Chain Mail" 50000 24000 "MetalArmour" 162000 90000
