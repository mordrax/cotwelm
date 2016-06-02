module GameData.Item
    exposing
        ( Item
        , new
        , ItemType(..)
        , ItemStatus(..)
        , IdentificationStatus(..)
        , WeaponType(..)
        , ArmourType(..)
        , ShieldType(..)
        , HelmetType(..)
        , BracersType(..)
        , GauntletsType(..)
        , BeltType(..)
        , PackType(..)
        , viewItem
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import Container exposing (Container)
import Mass exposing (..)


type ItemType
    = Weapon WeaponType
    | Armour ArmourType
    | Shield ShieldType
    | Helmet HelmetType
    | Bracers BracersType
    | Gauntlets GauntletsType
    | Belt BeltType
    | Purse
    | Pack PackType
    | Neckwear
    | Overgarment
    | Ring
    | Boots


type ItemSpecificModel
    = WeaponSM WeaponModel
    | ArmourSM ArmourModel
    | ShieldSM ArmourModel
    | HelmetSM ArmourModel
    | BracersSM ArmourModel
    | GauntletsSM ArmourModel
    | BeltSM BeltModel
    | PurseSM
    | PackSM PackModel
    | NeckwearSM
    | OvergarmentSM
    | RingSM
    | BootsSM


type ItemStatus
    = Normal
    | Cursed
    | Enchanted


type Item
    = Item Model


type IdentificationStatus
    = Identified
    | Unidentified



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


type alias Model =
    { itemModel : ItemSpecificModel
    , name : String
    , buy : Int
    , sell : Int
    , css : String
    , mass : Mass
    , status : ItemStatus
    , isIdentified : IdentificationStatus
    }


getMass : Item -> Mass
getMass (Item item) =
    item.mass


viewItem : Item -> Html msg
viewItem (Item item) =
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


new : ItemType -> ItemStatus -> IdentificationStatus -> Item
new item status isIdentified =
    case item of
        Weapon weaponType ->
            Item <| newWeapon weaponType status isIdentified

        Armour armourType ->
            Item <| newArmour armourType status isIdentified

        Shield shieldType ->
            Item <| newShield shieldType status isIdentified

        Helmet helmetType ->
            Item <| newHelmet helmetType status isIdentified

        Bracers bracersType ->
            Item <| newBracers bracersType status isIdentified

        Gauntlets gauntletsType ->
            Item <| newGauntlets gauntletsType status isIdentified

        Belt beltType ->
            Item <| newBelt beltType status isIdentified

        Pack packType ->
            Item <| newPack packType status isIdentified

        -- Purse
        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            Item <| newWeapon Dagger status isIdentified



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


newWeapon : WeaponType -> ItemStatus -> IdentificationStatus -> Model
newWeapon weaponType =
    case weaponType of
        BrokenSword ->
            Model (WeaponSM <| WeaponModel 0) "Broken Sword" 1000 5000 "BrokenSword" <| Mass.new 0 25

        Club ->
            Model (WeaponSM <| WeaponModel 1) "Club" 1500 3000 "Club" <| Mass.new 105 60

        Dagger ->
            Model (WeaponSM <| WeaponModel 2) "Dagger" 500 500 "Sword" <| Mass.new 420 240

        Hammer ->
            Model (WeaponSM <| WeaponModel 2) "Hammer" 2000 3000 "Hammer" <| Mass.new 420 240

        HandAxe ->
            Model (WeaponSM <| WeaponModel 3) "Hand Axe" 1000 3000 "Axe" <| Mass.new 472 270

        Quarterstaff ->
            Model (WeaponSM <| WeaponModel 3) "Quarterstaff" 750 5000 "Spear" <| Mass.new 648 360

        Spear ->
            Model (WeaponSM <| WeaponModel 4) "Spear" 1500 5000 "Spear" <| Mass.new 840 480

        ShortSword ->
            Model (WeaponSM <| WeaponModel 5) "Short Sword" 1000 5000 "Sword" <| Mass.new 1470 840

        Mace ->
            Model (WeaponSM <| WeaponModel 5) "Mace" 2500 4375 "Mace" <| Mass.new 1728 960

        Flail ->
            Model (WeaponSM <| WeaponModel 6) "Flail" 2000 3250 "Flail" <| Mass.new 1512 840

        Axe ->
            Model (WeaponSM <| WeaponModel 6) "Axe" 2000 5000 "Axe" <| Mass.new 1944 1080

        WarHammer ->
            Model (WeaponSM <| WeaponModel 7) "War Hammer" 1400 7500 "Hammer" <| Mass.new 2160 1200

        LongSword ->
            Model (WeaponSM <| WeaponModel 8) "Long Sword" 1500 8000 "Sword" <| Mass.new 3240 1800

        BattleAxe ->
            Model (WeaponSM <| WeaponModel 8) "Battle Axe" 3000 6000 "Axe" <| Mass.new 2160 1200

        BroadSword ->
            Model (WeaponSM <| WeaponModel 9) "Broad Sword" 1600 9000 "Sword" <| Mass.new 3240 1800

        MorningStar ->
            Model (WeaponSM <| WeaponModel 10) "Morning Star" 3000 9000 "MorningStar" <| Mass.new 2160 1200

        BastardSword ->
            Model (WeaponSM <| WeaponModel 11) "Bastard Sword" 3000 10000 "Sword" <| Mass.new 4320 2400

        TwoHandedSword ->
            Model (WeaponSM <| WeaponModel 12) "Two Handed Sword" 5000 12000 "Sword" <| Mass.new 6360 3600



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


newArmour : ArmourType -> ItemStatus -> IdentificationStatus -> Model
newArmour armourType =
    case armourType of
        RustyArmour ->
            Model (ArmourSM <| ArmourModel 0) "Rusty Armour" 10000 30000 "BrokenArmour" <| Mass.new 0 25

        LeatherArmour ->
            Model (ArmourSM <| ArmourModel 6) "Leather Armour" 5000 2400 "LeatherArmour" <| Mass.new 1080 600

        StuddedLeatherArmour ->
            Model (ArmourSM <| ArmourModel 12) "Studded Leather Armour" 7000 25000 "LeatherArmour" <| Mass.new 3150 1800

        RingMail ->
            Model (ArmourSM <| ArmourModel 18) "Ring Mail" 8000 30000 "MetalArmour" <| Mass.new 6300 3600

        ScaleMail ->
            Model (ArmourSM <| ArmourModel 24) "Scale Mail" 9000 30000 "MetalArmour" <| Mass.new 10800 6000

        ChainMail ->
            Model (ArmourSM <| ArmourModel 30) "Chain Mail" 10000 30000 "MetalArmour" <| Mass.new 16200 9000

        SplintMail ->
            Model (ArmourSM <| ArmourModel 36) "Splint Mail" 12000 40000 "MetalArmour" <| Mass.new 27000 15000

        PlateMail ->
            Model (ArmourSM <| ArmourModel 42) "Plate Mail" 15000 40000 "MetalArmour" <| Mass.new 42000 24000

        PlateArmour ->
            Model (ArmourSM <| ArmourModel 48) "Plate Armour" 15000 60000 "MetalArmour" <| Mass.new 42000 24000

        MeteoricSteelPlate ->
            Model (ArmourSM <| ArmourModel 54) "Meteoric Steel Plate" 5000 30000 "MetalArmour" <| Mass.new 105000 60000

        ElvenChainMail ->
            Model (ArmourSM <| ArmourModel 52) "Elven Chain Mail" 50000 24000 "MetalArmour" <| Mass.new 162000 90000


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


newShield : ShieldType -> ItemStatus -> IdentificationStatus -> Model
newShield shieldType =
    case shieldType of
        BrokenShield ->
            Model (ShieldSM <| ArmourModel 0) "Broken Shield" 4000 35000 "BrokenShield" <| Mass.new 0 25

        SmallWoodenShield ->
            Model (ShieldSM <| ArmourModel 3) "Small Wooden Shield" 3000 15000 "WoodShield" <| Mass.new 525 300

        MediumWoodenShield ->
            Model (ShieldSM <| ArmourModel 6) "Medium Wooden Shield" 4000 35000 "WoodShield" <| Mass.new 1050 600

        LargeWoodenShield ->
            Model (ShieldSM <| ArmourModel 9) "Large Wooden Shield" 5000 50000 "WoodShield" <| Mass.new 2100 1200

        SmallIronShield ->
            Model (ShieldSM <| ArmourModel 6) "Small Iron Shield" 4000 15000 "MetalShield" <| Mass.new 1260 720

        MediumIronShield ->
            Model (ShieldSM <| ArmourModel 9) "Medium Iron Shield" 5000 35000 "MetalShield" <| Mass.new 2592 1440

        LargeIronShield ->
            Model (ShieldSM <| ArmourModel 12) "Large Iron Shield" 6000 50000 "MetalShield" <| Mass.new 3150 1800

        SmallSteelShield ->
            Model (ShieldSM <| ArmourModel 9) "Small Steel Shield" 4000 15000 "MetalShield" <| Mass.new 2730 1560

        MediumSteelShield ->
            Model (ShieldSM <| ArmourModel 12) "Medium Steel Shield" 5000 35000 "MetalShield" <| Mass.new 3360 1920

        LargeSteelShield ->
            Model (ShieldSM <| ArmourModel 15) "Large Steel Shield" 6000 50000 "MetalShield" <| Mass.new 4200 2400

        SmallMeteoricSteelShield ->
            Model (ShieldSM <| ArmourModel 15) "Small Meteoric Steel Shield" 2500 10000 "MetalShield" <| Mass.new 4620 2640

        MediumMeteoricSteelShield ->
            Model (ShieldSM <| ArmourModel 18) "Medium Meteoric Steel Shield" 3500 25000 "MetalShield" <| Mass.new 5940 3300

        LargeMeteoricSteelShield ->
            Model (ShieldSM <| ArmourModel 21) "Large Meteoric Steel Shield" 4500 35000 "MetalShield" <| Mass.new 7560 4200


type HelmetType
    = BrokenHelmet
    | LeatherHelmet
    | IronHelmet
    | SteelHelmet
    | MeteoricSteelHelmet
    | HelmetOfDetectMonsters
    | EnchantedHelmOfStorms


newHelmet : HelmetType -> ItemStatus -> IdentificationStatus -> Model
newHelmet helmetType =
    case helmetType of
        BrokenHelmet ->
            Model (HelmetSM <| ArmourModel 0) "Broken Helmet" 1000 1000 "BrokenHelmet" <| Mass.new 0 25

        LeatherHelmet ->
            Model (HelmetSM <| ArmourModel 3) "Leather Helmet" 500 500 "LeatherHelmet" <| Mass.new 525 300

        IronHelmet ->
            Model (HelmetSM <| ArmourModel 6) "Iron Helmet" 2000 2000 "MetalHelmet" <| Mass.new 1050 600

        SteelHelmet ->
            Model (HelmetSM <| ArmourModel 9) "Steel Helmet" 2500 2000 "MetalHelmet" <| Mass.new 3150 1800

        MeteoricSteelHelmet ->
            Model (HelmetSM <| ArmourModel 15) "Meteoric Steel Helmet" 1000 2000 "MetalHelmet" <| Mass.new 10500 6000

        HelmetOfDetectMonsters ->
            Model (HelmetSM <| ArmourModel 9) "Helmet Of Detect Monsters" 2500 2000 "HelmetOfDetectMonsters" <| Mass.new 42000 24000

        EnchantedHelmOfStorms ->
            Model (HelmetSM <| ArmourModel 25) "Enchanted Helm Of Storms" 1000 2000 "EnchantedHelmOfStorms" <| Mass.new 1050000 600000


type BracersType
    = NormalBracers
    | BracersOfDefenseNormal
    | BracersOfDefenseS
    | BracersOfDefenseVS


newBracers : BracersType -> ItemStatus -> IdentificationStatus -> Model
newBracers bracersType =
    case bracersType of
        NormalBracers ->
            Model (BracersSM <| ArmourModel 3) "Bracers" 500 2000 "Bracers" <| Mass.new 108 60

        BracersOfDefenseNormal ->
            Model (BracersSM <| ArmourModel 8) "Bracers Of Defense Normal" 500 2000 "BracersEnchanted" <| Mass.new 1836 1020

        BracersOfDefenseS ->
            Model (BracersSM <| ArmourModel 13) "Bracers Of Defense Strong" 500 2000 "BracersEnchanted" <| Mass.new 5616 3120

        BracersOfDefenseVS ->
            Model (BracersSM <| ArmourModel 18) "Bracers Of Defense Very Strong" 500 2000 "BracersEnchanted" <| Mass.new 11556 6420


type GauntletsType
    = NormalGauntlets
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


newGauntlets : GauntletsType -> ItemStatus -> IdentificationStatus -> Model
newGauntlets gauntletType =
    case gauntletType of
        NormalGauntlets ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet" 500 2000 "Gauntlet" <| Mass.new 105 60

        GauntletOfProtection ->
            Model (GauntletsSM <| ArmourModel 10) "Gauntlet Of Protection" 500 2000 "GauntletEnchanted" <| Mass.new 2625 1500

        GauntletOfProtectionS ->
            Model (GauntletsSM <| ArmourModel 15) "Gauntlet Of Protection Strong" 500 2000 "GauntletEnchanted" <| Mass.new 6300 3600

        GauntletOfProtectionVS ->
            Model (GauntletsSM <| ArmourModel 20) "Gauntlet Of Protection Very Strong" 500 2000 "GauntletEnchanted" <| Mass.new 12420 6900

        GauntletOfSlaying ->
            Model (GauntletsSM <| ArmourModel 0) "Gauntlet Of Slaying" 500 2000 "GauntletOfSlaying" <| Mass.new 3780 2100

        GauntletOfSlayingS_S ->
            Model (GauntletsSM <| ArmourModel 0) "Gauntlet Of Slaying Strong" 500 2000 "GauntletOfSlaying" <| Mass.new 7560 4200

        GauntletOfSlayingVS_VS ->
            Model (GauntletsSM <| ArmourModel 0) "Gauntlet Of Slaying Very Strong" 500 2000 "GauntletOfSlaying" <| Mass.new 13125 7500

        GauntletOfDexterity ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet Of Dexterity" 500 2000 "GauntletEnchanted" <| Mass.new 3240 1800

        GauntletOfDexterityS ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet Of Dexterity Strong" 500 2000 "GauntletEnchanted" <| Mass.new 7020 3900

        GauntletOfDexterityVS ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet Of Dexterity Very Strong" 500 2000 "GauntletEnchanted" <| Mass.new 12960 7200

        GauntletOfStrength ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet Of Strength" 500 2000 "GauntletEnchanted" <| Mass.new 3240 1800

        GauntletOfStrengthS ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet Of Strength Strong" 500 2000 "GauntletEnchanted" <| Mass.new 0 0

        GauntletOfStrengthVS ->
            Model (GauntletsSM <| ArmourModel 5) "Gauntlet Of Strength Very Strong" 500 2000 "GauntletEnchanted" <| Mass.new 12960 7200


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
    , container : Container Item
    }


newBelt : BeltType -> ItemStatus -> IdentificationStatus -> Model
newBelt beltType =
    case beltType of
        TwoSlotBelt ->
            Model (BeltSM <| BeltModel 2 0 0 0 <| Container.new { bulkCap = 2100, weightCap = 3100, getMass = getMass }) "Two Slot Belt" 300 300 "SlotBelt" <| Mass.new 0 0

        ThreeSlotBelt ->
            Model (BeltSM <| BeltModel 3 0 0 0 <| Container.new { bulkCap = 2600, weightCap = 3600, getMass = getMass }) "Three Slot Belt" 300 300 "SlotBelt" <| Mass.new 0 0

        FourSlotBelt ->
            Model (BeltSM <| BeltModel 4 0 0 0 <| Container.new { bulkCap = 3100, weightCap = 4100, getMass = getMass }) "Four Slot Belt" 300 300 "SlotBelt" <| Mass.new 0 0

        UtilityBelt ->
            Model (BeltSM <| BeltModel 2 4 4 0 <| Container.new { bulkCap = 3100, weightCap = 4100, getMass = getMass }) "Utility Belt" 1350 1800 "UtilityBelt" <| Mass.new 0 0

        WandQuiverBelt ->
            Model (BeltSM <| BeltModel 2 0 0 4 <| Container.new { bulkCap = 3100, weightCap = 4100, getMass = getMass }) "Wand Quiver Belt" 300 300 "WandQuiverBelt" <| Mass.new 0 0


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
    { container : Container Item }


newPack : PackType -> ItemStatus -> IdentificationStatus -> Model
newPack packType =
    case packType of
        SmallBag ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 5000, weightCap = 6000, getMass = getMass }) "Small Bag" 300 500 "Bag" <| Mass.new 0 0

        MediumBag ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 10000, weightCap = 12000, getMass = getMass }) "Medium Bag" 500 700 "Bag" <| Mass.new 0 0

        LargeBag ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 15000, weightCap = 18000, getMass = getMass }) "Large Bag" 900 900 "Bag" <| Mass.new 0 0

        SmallPack ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 12000, weightCap = 50000, getMass = getMass }) "Small Pack" 1000 1000 "Pack" <| Mass.new 0 0

        MediumPack ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 22000, weightCap = 75000, getMass = getMass }) "Medium Pack" 2000 1500 "Pack" <| Mass.new 0 0

        LargePack ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 35000, weightCap = 100000, getMass = getMass }) "Large Pack" 4000 100000 "Pack" <| Mass.new 0 0

        SmallChest ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 100000, weightCap = 50000, getMass = getMass }) "Small Chest" 5000 100000 "Chest" <| Mass.new 0 0

        MediumChest ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 100000, weightCap = 150000, getMass = getMass }) "Medium Chest" 15000 150000 "Chest" <| Mass.new 0 0

        LargeChest ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 100000, weightCap = 250000, getMass = getMass }) "Large Chest" 25000 250000 "Chest" <| Mass.new 0 0

        EnchantedSmallPackOfHolding ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 50000, weightCap = 150000, getMass = getMass }) "Enchanted Small Pack Of Holding" 5000 75000 "EnchantedPack" <| Mass.new 0 0

        EnchantedMediumPackOfHolding ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 75000, weightCap = 200000, getMass = getMass }) "Enchanted Medium Pack Of Holding" 7500 100000 "EnchantedPack" <| Mass.new 0 0

        EnchantedLargePackOfHolding ->
            Model (PackSM <| PackModel <| Container.new { bulkCap = 100000, weightCap = 250000, getMass = getMass }) "Enchanted Large Pack Of Holding" 10000 125000 "EnchantedPack" <| Mass.new 0 0
