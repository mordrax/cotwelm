module GameData.Item exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Container exposing (..)


type ItemType
    = Weapon WeaponModel
    | Armour ArmourModel
    | Shield ArmourModel
    | Helmet ArmourModel
    | Bracers ArmourModel
    | Gauntlets ArmourModel
    | Belt BeltModel
    | Purse
    | Pack PackModel
    | Neckwear
    | Overgarment
    | Ring
    | Boots


type ItemStatus
    = Normal
    | Cursed
    | Enchanted



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


type alias Model =
    { itemType : ItemType
    , name : String
    , buy : Int
    , sell : Int
    , weight : Int
    , bulk : Int
    , css : String
    , status : ItemStatus
    , isIdentified : Bool
    }


viewItem : Model -> Html msg
viewItem item =
    div
        [ class "ui item"
        , style
            [ ( "opacity", "1" )
            , ( "cursor", "move" )
            , ( "width", "32px" )
            , ( "height", "64px" )
            ]
        ]
        [ div [ class "image" ]
            [ i [ class ("cotwItem " ++ item.css) ] []
            ]
        , div [ class "content" ]
            [ a [ class "header" ]
                [--text (toString item.itemType)
                ]
            , div [ class "meta" ]
                [ span [ class "date" ] []
                ]
            , div [ class "description", style [ ( "maxWidth", "7em" ) ] ]
                [ text item.name
                ]
            ]
        ]



-------------
-- Weapons --
-------------


type WeaponType
    = BrokenSword
    | Club
    | Dagger
    | Hammer
    | HandAxe
    | Quarterstaff
    | Spear
    | ShortSword
    | Mace
    | Flail
    | Axe
    | WarHammer
    | LongSword
    | BattleAxe
    | BroadSword
    | MorningStar
    | BastardSword
    | TwoHandedSword


type alias WeaponModel =
    { class : Int
    }


newWeapon : WeaponType -> ItemStatus -> Bool -> Model
newWeapon weaponType =
    case weaponType of
        BrokenSword ->
            Model (Weapon <| WeaponModel 0)
                "Broken Sword"
                1000
                5000
                0
                25
                "BrokenSword"

        Club ->
            Model (Weapon <| WeaponModel 1) "Club" 1500 3000 105 60 "Club"

        Dagger ->
            Model (Weapon <| WeaponModel 2) "Dagger" 500 500 420 240 "Sword"

        Hammer ->
            Model (Weapon <| WeaponModel 2) "Hammer" 2000 3000 420 240 "Hammer"

        HandAxe ->
            Model (Weapon <| WeaponModel 3) "Hand Axe" 1000 3000 472 270 "Axe"

        Quarterstaff ->
            Model (Weapon <| WeaponModel 3) "Quarterstaff" 750 5000 648 360 "Spear"

        Spear ->
            Model (Weapon <| WeaponModel 4) "Spear" 1500 5000 840 480 "Spear"

        ShortSword ->
            Model (Weapon <| WeaponModel 5) "Short Sword" 1000 5000 1470 840 "Sword"

        Mace ->
            Model (Weapon <| WeaponModel 5) "Mace" 2500 4375 1728 960 "Mace"

        Flail ->
            Model (Weapon <| WeaponModel 6) "Flail" 2000 3250 1512 840 "Flail"

        Axe ->
            Model (Weapon <| WeaponModel 6) "Axe" 2000 5000 1944 1080 "Axe"

        WarHammer ->
            Model (Weapon <| WeaponModel 7) "War Hammer" 1400 7500 2160 1200 "Hammer"

        LongSword ->
            Model (Weapon <| WeaponModel 8) "Long Sword" 1500 8000 3240 1800 "Sword"

        BattleAxe ->
            Model (Weapon <| WeaponModel 8) "Battle Axe" 3000 6000 2160 1200 "Axe"

        BroadSword ->
            Model (Weapon <| WeaponModel 9) "Broad Sword" 1600 9000 3240 1800 "Sword"

        MorningStar ->
            Model (Weapon <| WeaponModel 10) "Morning Star" 3000 9000 2160 1200 "MorningStar"

        BastardSword ->
            Model (Weapon <| WeaponModel 11) "Bastard Sword" 3000 10000 4320 2400 "Sword"

        TwoHandedSword ->
            Model (Weapon <| WeaponModel 12) "Two Handed Sword" 5000 12000 6360 3600 "Sword"



------------
-- Armour --
------------


type ArmourType
    = RustyArmour
    | LeatherArmour
    | StuddedLeatherArmour
    | RingMail
    | ScaleMail
    | ChainMail
    | SplintMail
    | PlateMail
    | PlateArmour
    | MeteoricSteelPlate
    | ElvenChainMail


type alias ArmourModel =
    { ac : Int }


newArmour : ArmourType -> ItemStatus -> Bool -> Model
newArmour armourType =
    case armourType of
        RustyArmour ->
            Model (Armour <| ArmourModel 0) "Rusty Armour" 10000 30000 0 25 "BrokenArmour"

        LeatherArmour ->
            Model (Armour <| ArmourModel 6) "Leather Armour" 5000 2400 1080 600 "LeatherArmour"

        StuddedLeatherArmour ->
            Model (Armour <| ArmourModel 12) "Studded Leather Armour" 7000 25000 3150 1800 "LeatherArmour"

        RingMail ->
            Model (Armour <| ArmourModel 18) "Ring Mail" 8000 30000 6300 3600 "MetalArmour"

        ScaleMail ->
            Model (Armour <| ArmourModel 24) "Scale Mail" 9000 30000 10800 6000 "MetalArmour"

        ChainMail ->
            Model (Armour <| ArmourModel 30) "Chain Mail" 10000 30000 16200 9000 "MetalArmour"

        SplintMail ->
            Model (Armour <| ArmourModel 36) "Splint Mail" 12000 40000 27000 15000 "MetalArmour"

        PlateMail ->
            Model (Armour <| ArmourModel 42) "Plate Mail" 15000 40000 42000 24000 "MetalArmour"

        PlateArmour ->
            Model (Armour <| ArmourModel 48) "Plate Armour" 15000 60000 42000 24000 "MetalArmour"

        MeteoricSteelPlate ->
            Model (Armour <| ArmourModel 54) "Meteoric Steel Plate" 5000 30000 105000 60000 "MetalArmour"

        ElvenChainMail ->
            Model (Armour <| ArmourModel 52) "Elven Chain Mail" 50000 24000 162000 90000 "MetalArmour"


type ShieldType
    = BrokenShield
    | SmallWoodenShield
    | MediumWoodenShield
    | LargeWoodenShield
    | SmallIronShield
    | MediumIronShield
    | LargeIronShield
    | SmallSteelShield
    | MediumSteelShield
    | LargeSteelShield
    | SmallMeteoricSteelShield
    | MediumMeteoricSteelShield
    | LargeMeteoricSteelShield


newShield : ShieldType -> ItemStatus -> Bool -> Model
newShield shieldType =
    case shieldType of
        BrokenShield ->
            Model (Shield <| ArmourModel 0) "Broken Shield" 4000 35000 0 25 "BrokenShield"

        SmallWoodenShield ->
            Model (Shield <| ArmourModel 3) "Small Wooden Shield" 3000 15000 525 300 "WoodShield"

        MediumWoodenShield ->
            Model (Shield <| ArmourModel 6) "Medium Wooden Shield" 4000 35000 1050 600 "WoodShield"

        LargeWoodenShield ->
            Model (Shield <| ArmourModel 9) "Large Wooden Shield" 5000 50000 2100 1200 "WoodShield"

        SmallIronShield ->
            Model (Shield <| ArmourModel 6) "Small Iron Shield" 4000 15000 1260 720 "MetalShield"

        MediumIronShield ->
            Model (Shield <| ArmourModel 9) "Medium Iron Shield" 5000 35000 2592 1440 "MetalShield"

        LargeIronShield ->
            Model (Shield <| ArmourModel 12) "Large Iron Shield" 6000 50000 3150 1800 "MetalShield"

        SmallSteelShield ->
            Model (Shield <| ArmourModel 9) "Small Steel Shield" 4000 15000 2730 1560 "MetalShield"

        MediumSteelShield ->
            Model (Shield <| ArmourModel 12) "Medium Steel Shield" 5000 35000 3360 1920 "MetalShield"

        LargeSteelShield ->
            Model (Shield <| ArmourModel 15) "Large Steel Shield" 6000 50000 4200 2400 "MetalShield"

        SmallMeteoricSteelShield ->
            Model (Shield <| ArmourModel 15) "Small Meteoric Steel Shield" 2500 10000 4620 2640 "MetalShield"

        MediumMeteoricSteelShield ->
            Model (Shield <| ArmourModel 18) "Medium Meteoric Steel Shield" 3500 25000 5940 3300 "MetalShield"

        LargeMeteoricSteelShield ->
            Model (Shield <| ArmourModel 21) "Large Meteoric Steel Shield" 4500 35000 7560 4200 "MetalShield"


type HelmetType
    = BrokenHelmet
    | LeatherHelmet
    | IronHelmet
    | SteelHelmet
    | MeteoricSteelHelmet
    | HelmetOfDetectMonsters
    | EnchantedHelmOfStorms


newHelmet : HelmetType -> ItemStatus -> Bool -> Model
newHelmet helmetType =
    case helmetType of
        BrokenHelmet ->
            Model (Helmet <| ArmourModel 0) "Broken Helmet" 1000 1000 0 25 "BrokenHelmet"

        LeatherHelmet ->
            Model (Helmet <| ArmourModel 3) "Leather Helmet" 500 500 525 300 "LeatherHelmet"

        IronHelmet ->
            Model (Helmet <| ArmourModel 6) "Iron Helmet" 2000 2000 1050 600 "MetalHelmet"

        SteelHelmet ->
            Model (Helmet <| ArmourModel 9) "Steel Helmet" 2500 2000 3150 1800 "MetalHelmet"

        MeteoricSteelHelmet ->
            Model (Helmet <| ArmourModel 15) "Meteoric Steel Helmet" 1000 2000 10500 6000 "MetalHelmet"

        HelmetOfDetectMonsters ->
            Model (Helmet <| ArmourModel 9) "Helmet Of Detect Monsters" 2500 2000 42000 24000 "HelmetOfDetectMonsters"

        EnchantedHelmOfStorms ->
            Model (Helmet <| ArmourModel 25) "Enchanted Helm Of Storms" 1000 2000 1050000 600000 "EnchantedHelmOfStorms"


type BracersType
    = NormalBracers
    | BracersOfDefenseNormal
    | BracersOfDefenseS
    | BracersOfDefenseVS


newBracers : BracersType -> ItemStatus -> Bool -> Model
newBracers bracersType =
    case bracersType of
        NormalBracers ->
            Model (Bracers <| ArmourModel 3) "Bracers" 500 2000 108 60 "Bracers"

        BracersOfDefenseNormal ->
            Model (Bracers <| ArmourModel 8) "Bracers Of Defense Normal" 500 2000 1836 1020 "BracersEnchanted"

        BracersOfDefenseS ->
            Model (Bracers <| ArmourModel 13) "Bracers Of Defense Strong" 500 2000 5616 3120 "BracersEnchanted"

        BracersOfDefenseVS ->
            Model (Bracers <| ArmourModel 18) "Bracers Of Defense Very Strong" 500 2000 11556 6420 "BracersEnchanted"


type GauntletType
    = NormalGauntlet
    | GauntletOfProtection
    | GauntletOfProtectionS
    | GauntletOfProtectionVS
    | GauntletOfSlaying
    | GauntletOfSlayingS_S
    | GauntletOfSlayingVS_VS
    | GauntletOfDexterity
    | GauntletOfDexterityS
    | GauntletOfDexterityVS
    | GauntletOfStrength
    | GauntletOfStrengthS
    | GauntletOfStrengthVS


newGauntlets : GauntletType -> ItemStatus -> Bool -> Model
newGauntlets gauntletType =
    case gauntletType of
        NormalGauntlet ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet" 500 2000 105 60 "Gauntlet"

        GauntletOfProtection ->
            Model (Gauntlets <| ArmourModel 10) "Gauntlet Of Protection" 500 2000 2625 1500 "GauntletEnchanted"

        GauntletOfProtectionS ->
            Model (Gauntlets <| ArmourModel 15) "Gauntlet Of Protection Strong" 500 2000 6300 3600 "GauntletEnchanted"

        GauntletOfProtectionVS ->
            Model (Gauntlets <| ArmourModel 20) "Gauntlet Of Protection Very Strong" 500 2000 12420 6900 "GauntletEnchanted"

        GauntletOfSlaying ->
            Model (Gauntlets <| ArmourModel 0) "Gauntlet Of Slaying" 500 2000 3780 2100 "GauntletOfSlaying"

        GauntletOfSlayingS_S ->
            Model (Gauntlets <| ArmourModel 0) "Gauntlet Of Slaying Strong" 500 2000 7560 4200 "GauntletOfSlaying"

        GauntletOfSlayingVS_VS ->
            Model (Gauntlets <| ArmourModel 0) "Gauntlet Of Slaying Very Strong" 500 2000 13125 7500 "GauntletOfSlaying"

        GauntletOfDexterity ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet Of Dexterity" 500 2000 3240 1800 "GauntletEnchanted"

        GauntletOfDexterityS ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet Of Dexterity Strong" 500 2000 7020 3900 "GauntletEnchanted"

        GauntletOfDexterityVS ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet Of Dexterity Very Strong" 500 2000 12960 7200 "GauntletEnchanted"

        GauntletOfStrength ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet Of Strength" 500 2000 3240 1800 "GauntletEnchanted"

        GauntletOfStrengthS ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet Of Strength Strong" 500 2000 0 0 "GauntletEnchanted"

        GauntletOfStrengthVS ->
            Model (Gauntlets <| ArmourModel 5) "Gauntlet Of Strength Very Strong" 500 2000 12960 7200 "GauntletEnchanted"


type BeltType
    = TwoSlotBelt
    | ThreeSlotBelt
    | FourSlotBelt
    | UtilityBelt
    | WandQuiverBelt


type alias BeltModel =
    { slot : Int
    , scroll : Int
    , wand : Int
    , potion : Int
    , container : Container
    }


newBelt : BeltType -> ItemStatus -> Bool -> Model
newBelt beltType =
    case beltType of
        TwoSlotBelt ->
            Model (Belt <| BeltModel 2 0 0 0 <| Container.new 2100 3100) "Two Slot Belt" 300 300 0 0 "SlotBelt"

        ThreeSlotBelt ->
            Model (Belt <| BeltModel 3 0 0 0 <| Container.new 2600 3600) "Three Slot Belt" 300 300 0 0 "SlotBelt"

        FourSlotBelt ->
            Model (Belt <| BeltModel 4 0 0 0 <| Container.new 3100 4100) "Four Slot Belt" 300 300 0 0 "SlotBelt"

        UtilityBelt ->
            Model (Belt <| BeltModel 2 4 4 0 <| Container.new 3100 4100) "Utility Belt" 1350 1800 0 0 "UtilityBelt"

        WandQuiverBelt ->
            Model (Belt <| BeltModel 2 0 0 4 <| Container.new 3100 4100) "Wand Quiver Belt" 300 300 0 0 "WandQuiverBelt"


type PackType
    = SmallBag
    | MediumBag
    | LargeBag
    | SmallPack
    | MediumPack
    | LargePack
    | SmallChest
    | MediumChest
    | LargeChest
    | EnchantedSmallPackOfHolding
    | EnchantedMediumPackOfHolding
    | EnchantedLargePackOfHolding


type alias PackModel =
    { container : Container }


newPack : PackType -> ItemStatus -> Bool -> Model
newPack packType =
    case packType of
        SmallBag ->
            Model (Pack <| PackModel <| Container.new 5000 6000) "Small Bag" 300 500 0 0 "Bag"

        MediumBag ->
            Model (Pack <| PackModel <| Container.new 10000 12000) "Medium Bag" 500 700 0 0 "Bag"

        LargeBag ->
            Model (Pack <| PackModel <| Container.new 15000 18000) "Large Bag" 900 900 0 0 "Bag"

        SmallPack ->
            Model (Pack <| PackModel <| Container.new 12000 50000) "Small Pack" 1000 1000 0 0 "Pack"

        MediumPack ->
            Model (Pack <| PackModel <| Container.new 22000 75000) "Medium Pack" 2000 1500 0 0 "Pack"

        LargePack ->
            Model (Pack <| PackModel <| Container.new 35000 100000) "Large Pack" 4000 100000 0 0 "Pack"

        SmallChest ->
            Model (Pack <| PackModel <| Container.new 100000 50000) "Small Chest" 5000 100000 0 0 "Chest"

        MediumChest ->
            Model (Pack <| PackModel <| Container.new 100000 150000) "Medium Chest" 15000 150000 0 0 "Chest"

        LargeChest ->
            Model (Pack <| PackModel <| Container.new 100000 250000) "Large Chest" 25000 250000 0 0 "Chest"

        EnchantedSmallPackOfHolding ->
            Model (Pack <| PackModel <| Container.new 50000 150000) "Enchanted Small Pack Of Holding" 5000 75000 0 0 "EnchantedPack"

        EnchantedMediumPackOfHolding ->
            Model (Pack <| PackModel <| Container.new 75000 200000) "Enchanted Medium Pack Of Holding" 7500 100000 0 0 "EnchantedPack"

        EnchantedLargePackOfHolding ->
            Model (Pack <| PackModel <| Container.new 100000 250000) "Enchanted Large Pack Of Holding" 10000 125000 0 0 "EnchantedPack"
