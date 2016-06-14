module GameData.Item
    -- where
    exposing
        ( Item(..)
        , Weapon
        , Armour
        , Shield
        , Helmet
        , Bracers
        , Gauntlets
        , Belt
        , Pack
        , Neckwear
        , Overgarment
        , Ring
        , Boots
        , new
        , newPack
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
        , view
        , addToPack
        , removeFromPack
        , isCursed
        , packInfo
        , packContents
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import Container exposing (Container)
import Mass exposing (..)


type ItemStatus
    = Normal
    | Cursed
    | Enchanted


type ItemType
    = Weapon WeaponType
    | Armour ArmourType
    | Shield ShieldType
    | Helmet HelmetType
    | Bracers BracersType
    | Gauntlets GauntletsType
    | Belt BeltType
    | Pack PackType
    | Neckwear NeckwearType
    | Overgarment OvergarmentType
    | Ring RingType
    | Boots BootsType


type Item
    = ItemWeapon Weapon
    | ItemArmour Armour
    | ItemShield Shield
    | ItemHelmet Helmet
    | ItemBracers Bracers
    | ItemGauntlets Gauntlets
    | ItemBelt Belt
    | ItemPack Pack
    | ItemNeckwear Neckwear
    | ItemOvergarment Overgarment
    | ItemRing Ring
    | ItemBoots Boots


type Weapon
    = WeaponModelTag WeaponType Model WeaponModel


type Armour
    = ArmourModelTag ArmourType Model ArmourModel


type Shield
    = ShieldModelTag ShieldType Model ArmourModel


type Helmet
    = HelmetModelTag HelmetType Model ArmourModel


type Bracers
    = BracersModelTag BracersType Model ArmourModel


type Gauntlets
    = GauntletsModelTag GauntletsType Model ArmourModel


type Belt
    = BeltModelTag BeltType Model BeltModel


type Pack
    = PackModelTag PackType Model PackModel


type Neckwear
    = NeckwearModelTag NeckwearType Model


type Overgarment
    = OvergarmentModelTag OvergarmentType Model


type Ring
    = RingModelTag RingType Model


type Boots
    = BootsModelTag BootsType Model


type IdentificationStatus
    = Identified
    | Unidentified



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


type alias Model =
    { name : String
    , buy : Int
    , sell : Int
    , css : String
    , status : ItemStatus
    , isIdentified : IdentificationStatus
    , mass : Mass
    }


getMass : Item -> Mass
getMass item =
    let
        model =
            getModel item
    in
        model.mass


isCursed : Item -> Bool
isCursed item =
    let
        { status } =
            getModel item
    in
        case status of
            Cursed ->
                True

            _ ->
                False


getModel : Item -> Model
getModel item =
    case item of
        ItemWeapon (WeaponModelTag _ model specificModel) ->
            model

        ItemArmour (ArmourModelTag _ model specificModel) ->
            model

        ItemShield (ShieldModelTag _ model specificModel) ->
            model

        ItemHelmet (HelmetModelTag _ model specificModel) ->
            model

        ItemBracers (BracersModelTag _ model specificModel) ->
            model

        ItemGauntlets (GauntletsModelTag _ model specificModel) ->
            model

        ItemBelt (BeltModelTag _ model specificModel) ->
            model

        ItemPack (PackModelTag _ model specificModel) ->
            model

        ItemNeckwear (NeckwearModelTag _ model) ->
            model

        ItemOvergarment (OvergarmentModelTag _ model) ->
            model

        ItemRing (RingModelTag _ model) ->
            model

        ItemBoots (BootsModelTag _ model) ->
            model


view : Item -> Html msg
view item =
    let
        model =
            getModel item
    in
        div [ class "ui grid" ]
            [ div
                [ class "ui item"
                , style
                    [ ( "opacity", "1" )
                    , ( "cursor", "move" )
                    , ( "width", "32px" )
                    , ( "height", "64px" )
                    ]
                ]
                [ div [ class "image" ]
                    [ i [ class ("cotwItem " ++ model.css) ] []
                    ]
                , div [ class "content" ]
                    [ a [ class "header" ]
                        [--text (toString model.itemType)
                        ]
                    , div [ class "meta" ]
                        [ span [ class "date" ] []
                        ]
                    , div [ class "description", style [ ( "maxWidth", "7em" ) ] ]
                        [ text model.name
                        ]
                    ]
                ]
            ]


new : ItemType -> ItemStatus -> IdentificationStatus -> Item
new itemType status idStatus =
    case itemType of
        Weapon weaponType ->
            ItemWeapon (newWeapon weaponType status idStatus)

        Armour armourType ->
            ItemArmour (newArmour armourType status idStatus)

        Shield shieldType ->
            ItemShield (newShield shieldType status idStatus)

        Helmet helmetType ->
            ItemHelmet (newHelmet helmetType status idStatus)

        Bracers bracersType ->
            ItemBracers (newBracers bracersType status idStatus)

        Gauntlets gauntletsType ->
            ItemGauntlets (newGauntlets gauntletsType status idStatus)

        Belt beltType ->
            ItemBelt (newBelt beltType status idStatus)

        Pack packType ->
            ItemPack (newPack packType status idStatus)

        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            ItemWeapon (newWeapon Dagger status idStatus)



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


newWeapon : WeaponType -> ItemStatus -> IdentificationStatus -> Weapon
newWeapon weaponType status id =
    case weaponType of
        BrokenSword ->
            WeaponModelTag BrokenSword (Model "Broken Sword" 1000 5000 "BrokenSword" status id <| Mass.new 0 25) (WeaponModel 0)

        Club ->
            WeaponModelTag Club (Model "Club" 1500 3000 "Club" status id <| Mass.new 105 60) (WeaponModel 1)

        Dagger ->
            WeaponModelTag Dagger (Model "Dagger" 500 500 "Sword" status id <| Mass.new 420 240) (WeaponModel 2)

        Hammer ->
            WeaponModelTag Hammer (Model "Hammer" 2000 3000 "Hammer" status id <| Mass.new 420 240) (WeaponModel 2)

        HandAxe ->
            WeaponModelTag HandAxe (Model "Hand Axe" 1000 3000 "Axe" status id <| Mass.new 472 270) (WeaponModel 3)

        Quarterstaff ->
            WeaponModelTag Quarterstaff (Model "Quarterstaff" 750 5000 "Spear" status id <| Mass.new 648 360) (WeaponModel 3)

        Spear ->
            WeaponModelTag Spear (Model "Spear" 1500 5000 "Spear" status id <| Mass.new 840 480) (WeaponModel 4)

        ShortSword ->
            WeaponModelTag ShortSword (Model "Short Sword" 1000 5000 "Sword" status id <| Mass.new 1470 840) (WeaponModel 5)

        Mace ->
            WeaponModelTag Mace (Model "Mace" 2500 4375 "Mace" status id <| Mass.new 1728 960) (WeaponModel 5)

        Flail ->
            WeaponModelTag Flail (Model "Flail" 2000 3250 "Flail" status id <| Mass.new 1512 840) (WeaponModel 6)

        Axe ->
            WeaponModelTag Axe (Model "Axe" 2000 5000 "Axe" status id <| Mass.new 1944 1080) (WeaponModel 6)

        WarHammer ->
            WeaponModelTag WarHammer (Model "War Hammer" 1400 7500 "Hammer" status id <| Mass.new 2160 1200) (WeaponModel 7)

        LongSword ->
            WeaponModelTag LongSword (Model "Long Sword" 1500 8000 "Sword" status id <| Mass.new 3240 1800) (WeaponModel 8)

        BattleAxe ->
            WeaponModelTag BattleAxe (Model "Battle Axe" 3000 6000 "Axe" status id <| Mass.new 2160 1200) (WeaponModel 8)

        BroadSword ->
            WeaponModelTag BroadSword (Model "Broad Sword" 1600 9000 "Sword" status id <| Mass.new 3240 1800) (WeaponModel 9)

        MorningStar ->
            WeaponModelTag MorningStar (Model "Morning Star" 3000 9000 "MorningStar" status id <| Mass.new 2160 1200) (WeaponModel 10)

        BastardSword ->
            WeaponModelTag BastardSword (Model "Bastard Sword" 3000 10000 "Sword" status id <| Mass.new 4320 2400) (WeaponModel 11)

        TwoHandedSword ->
            WeaponModelTag TwoHandedSword (Model "Two Handed Sword" 5000 12000 "Sword" status id <| Mass.new 6360 3600) (WeaponModel 12)



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


newArmour : ArmourType -> ItemStatus -> IdentificationStatus -> Armour
newArmour armourType status id =
    case armourType of
        RustyArmour ->
            ArmourModelTag RustyArmour (Model "Rusty Armour" 10000 30000 "BrokenArmour" status id <| Mass.new 0 25) (ArmourModel 0)

        LeatherArmour ->
            ArmourModelTag LeatherArmour (Model "Leather Armour" 5000 2400 "LeatherArmour" status id <| Mass.new 1080 600) (ArmourModel 6)

        StuddedLeatherArmour ->
            ArmourModelTag StuddedLeatherArmour (Model "Studded Leather Armour" 7000 25000 "LeatherArmour" status id <| Mass.new 3150 1800) (ArmourModel 12)

        RingMail ->
            ArmourModelTag RingMail (Model "Ring Mail" 8000 30000 "MetalArmour" status id <| Mass.new 6300 3600) (ArmourModel 18)

        ScaleMail ->
            ArmourModelTag ScaleMail (Model "Scale Mail" 9000 30000 "MetalArmour" status id <| Mass.new 10800 6000) (ArmourModel 24)

        ChainMail ->
            ArmourModelTag ChainMail (Model "Chain Mail" 10000 30000 "MetalArmour" status id <| Mass.new 16200 9000) (ArmourModel 30)

        SplintMail ->
            ArmourModelTag SplintMail (Model "Splint Mail" 12000 40000 "MetalArmour" status id <| Mass.new 27000 15000) (ArmourModel 36)

        PlateMail ->
            ArmourModelTag PlateMail (Model "Plate Mail" 15000 40000 "MetalArmour" status id <| Mass.new 42000 24000) (ArmourModel 42)

        PlateArmour ->
            ArmourModelTag PlateArmour (Model "Plate Armour" 15000 60000 "MetalArmour" status id <| Mass.new 42000 24000) (ArmourModel 48)

        MeteoricSteelPlate ->
            ArmourModelTag MeteoricSteelPlate (Model "Meteoric Steel Plate" 5000 30000 "MetalArmour" status id <| Mass.new 105000 60000) (ArmourModel 54)

        ElvenChainMail ->
            ArmourModelTag ElvenChainMail (Model "Elven Chain Mail" 50000 24000 "MetalArmour" status id <| Mass.new 162000 90000) (ArmourModel 52)


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


newShield : ShieldType -> ItemStatus -> IdentificationStatus -> Shield
newShield shieldType status id =
    case shieldType of
        BrokenShield ->
            ShieldModelTag BrokenShield (Model "Broken Shield" 4000 35000 "BrokenShield" status id <| Mass.new 0 25) (ArmourModel 0)

        SmallWoodenShield ->
            ShieldModelTag SmallWoodenShield (Model "Small Wooden Shield" 3000 15000 "WoodShield" status id <| Mass.new 525 300) (ArmourModel 3)

        MediumWoodenShield ->
            ShieldModelTag MediumWoodenShield (Model "Medium Wooden Shield" 4000 35000 "WoodShield" status id <| Mass.new 1050 600) (ArmourModel 6)

        LargeWoodenShield ->
            ShieldModelTag LargeWoodenShield (Model "Large Wooden Shield" 5000 50000 "WoodShield" status id <| Mass.new 2100 1200) (ArmourModel 9)

        SmallIronShield ->
            ShieldModelTag SmallIronShield (Model "Small Iron Shield" 4000 15000 "MetalShield" status id <| Mass.new 1260 720) (ArmourModel 6)

        MediumIronShield ->
            ShieldModelTag MediumIronShield (Model "Medium Iron Shield" 5000 35000 "MetalShield" status id <| Mass.new 2592 1440) (ArmourModel 9)

        LargeIronShield ->
            ShieldModelTag LargeIronShield (Model "Large Iron Shield" 6000 50000 "MetalShield" status id <| Mass.new 3150 1800) (ArmourModel 12)

        SmallSteelShield ->
            ShieldModelTag SmallSteelShield (Model "Small Steel Shield" 4000 15000 "MetalShield" status id <| Mass.new 2730 1560) (ArmourModel 9)

        MediumSteelShield ->
            ShieldModelTag MediumSteelShield (Model "Medium Steel Shield" 5000 35000 "MetalShield" status id <| Mass.new 3360 1920) (ArmourModel 12)

        LargeSteelShield ->
            ShieldModelTag LargeSteelShield (Model "Large Steel Shield" 6000 50000 "MetalShield" status id <| Mass.new 4200 2400) (ArmourModel 15)

        SmallMeteoricSteelShield ->
            ShieldModelTag SmallMeteoricSteelShield (Model "Small Meteoric Steel Shield" 2500 10000 "MetalShield" status id <| Mass.new 4620 2640) (ArmourModel 15)

        MediumMeteoricSteelShield ->
            ShieldModelTag MediumMeteoricSteelShield (Model "Medium Meteoric Steel Shield" 3500 25000 "MetalShield" status id <| Mass.new 5940 3300) (ArmourModel 18)

        LargeMeteoricSteelShield ->
            ShieldModelTag LargeMeteoricSteelShield (Model "Large Meteoric Steel Shield" 4500 35000 "MetalShield" status id <| Mass.new 7560 4200) (ArmourModel 21)


type HelmetType
    = BrokenHelmet
    | LeatherHelmet
    | IronHelmet
    | SteelHelmet
    | MeteoricSteelHelmet
    | HelmetOfDetectMonsters
    | EnchantedHelmOfStorms


newHelmet : HelmetType -> ItemStatus -> IdentificationStatus -> Helmet
newHelmet helmetType status id =
    case helmetType of
        BrokenHelmet ->
            HelmetModelTag BrokenHelmet (Model "Broken Helmet" 1000 1000 "BrokenHelmet" status id <| Mass.new 0 25) (ArmourModel 0)

        LeatherHelmet ->
            HelmetModelTag LeatherHelmet (Model "Leather Helmet" 500 500 "LeatherHelmet" status id <| Mass.new 525 300) (ArmourModel 3)

        IronHelmet ->
            HelmetModelTag IronHelmet (Model "Iron Helmet" 2000 2000 "MetalHelmet" status id <| Mass.new 1050 600) (ArmourModel 6)

        SteelHelmet ->
            HelmetModelTag SteelHelmet (Model "Steel Helmet" 2500 2000 "MetalHelmet" status id <| Mass.new 3150 1800) (ArmourModel 9)

        MeteoricSteelHelmet ->
            HelmetModelTag MeteoricSteelHelmet (Model "Meteoric Steel Helmet" 1000 2000 "MetalHelmet" status id <| Mass.new 10500 6000) (ArmourModel 15)

        HelmetOfDetectMonsters ->
            HelmetModelTag HelmetOfDetectMonsters (Model "Helmet Of Detect Monsters" 2500 2000 "HelmetOfDetectMonsters" status id <| Mass.new 42000 24000) (ArmourModel 9)

        EnchantedHelmOfStorms ->
            HelmetModelTag EnchantedHelmOfStorms (Model "Enchanted Helm Of Storms" 1000 2000 "EnchantedHelmOfStorms" status id <| Mass.new 1050000 600000) (ArmourModel 25)


type BracersType
    = NormalBracers
    | BracersOfDefenseNormal
    | BracersOfDefenseS
    | BracersOfDefenseVS


newBracers : BracersType -> ItemStatus -> IdentificationStatus -> Bracers
newBracers bracersType status id =
    case bracersType of
        NormalBracers ->
            BracersModelTag NormalBracers (Model "Bracers" 500 2000 "Bracers" status id <| Mass.new 108 60) (ArmourModel 3)

        BracersOfDefenseNormal ->
            BracersModelTag BracersOfDefenseNormal (Model "Bracers Of Defense Normal" 500 2000 "BracersEnchanted" status id <| Mass.new 1836 1020) (ArmourModel 8)

        BracersOfDefenseS ->
            BracersModelTag BracersOfDefenseS (Model "Bracers Of Defense Strong" 500 2000 "BracersEnchanted" status id <| Mass.new 5616 3120) (ArmourModel 13)

        BracersOfDefenseVS ->
            BracersModelTag BracersOfDefenseVS (Model "Bracers Of Defense Very Strong" 500 2000 "BracersEnchanted" status id <| Mass.new 11556 6420) (ArmourModel 18)


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


newGauntlets : GauntletsType -> ItemStatus -> IdentificationStatus -> Gauntlets
newGauntlets gauntletType status id =
    case gauntletType of
        NormalGauntlets ->
            GauntletsModelTag NormalGauntlets (Model "Gauntlet" 500 2000 "Gauntlet" status id <| Mass.new 105 60) (ArmourModel 5)

        GauntletOfProtection ->
            GauntletsModelTag GauntletOfProtection (Model "Gauntlet Of Protection" 500 2000 "GauntletEnchanted" status id <| Mass.new 2625 1500) (ArmourModel 10)

        GauntletOfProtectionS ->
            GauntletsModelTag GauntletOfProtectionS (Model "Gauntlet Of Protection Strong" 500 2000 "GauntletEnchanted" status id <| Mass.new 6300 3600) (ArmourModel 15)

        GauntletOfProtectionVS ->
            GauntletsModelTag GauntletOfProtectionVS (Model "Gauntlet Of Protection Very Strong" 500 2000 "GauntletEnchanted" status id <| Mass.new 12420 6900) (ArmourModel 20)

        GauntletOfSlaying ->
            GauntletsModelTag GauntletOfSlaying (Model "Gauntlet Of Slaying" 500 2000 "GauntletOfSlaying" status id <| Mass.new 3780 2100) (ArmourModel 0)

        GauntletOfSlayingS_S ->
            GauntletsModelTag GauntletOfSlayingS_S (Model "Gauntlet Of Slaying Strong" 500 2000 "GauntletOfSlaying" status id <| Mass.new 7560 4200) (ArmourModel 0)

        GauntletOfSlayingVS_VS ->
            GauntletsModelTag GauntletOfSlayingVS_VS (Model "Gauntlet Of Slaying Very Strong" 500 2000 "GauntletOfSlaying" status id <| Mass.new 13125 7500) (ArmourModel 0)

        GauntletOfDexterity ->
            GauntletsModelTag GauntletOfDexterity (Model "Gauntlet Of Dexterity" 500 2000 "GauntletEnchanted" status id <| Mass.new 3240 1800) (ArmourModel 5)

        GauntletOfDexterityS ->
            GauntletsModelTag GauntletOfDexterityS (Model "Gauntlet Of Dexterity Strong" 500 2000 "GauntletEnchanted" status id <| Mass.new 7020 3900) (ArmourModel 5)

        GauntletOfDexterityVS ->
            GauntletsModelTag GauntletOfDexterityVS (Model "Gauntlet Of Dexterity Very Strong" 500 2000 "GauntletEnchanted" status id <| Mass.new 12960 7200) (ArmourModel 5)

        GauntletOfStrength ->
            GauntletsModelTag GauntletOfStrength (Model "Gauntlet Of Strength" 500 2000 "GauntletEnchanted" status id <| Mass.new 3240 1800) (ArmourModel 5)

        GauntletOfStrengthS ->
            GauntletsModelTag GauntletOfStrengthS (Model "Gauntlet Of Strength Strong" 500 2000 "GauntletEnchanted" status id <| Mass.new 0 0) (ArmourModel 5)

        GauntletOfStrengthVS ->
            GauntletsModelTag GauntletOfStrengthVS (Model "Gauntlet Of Strength Very Strong" 500 2000 "GauntletEnchanted" status id <| Mass.new 12960 7200) (ArmourModel 5)


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


newBelt : BeltType -> ItemStatus -> IdentificationStatus -> Belt
newBelt beltType status id =
    case beltType of
        TwoSlotBelt ->
            BeltModelTag TwoSlotBelt (Model "Two Slot Belt" 300 300 "SlotBelt" status id <| Mass.new 0 0) (BeltModel 2 0 0 0 <| Container.new { capacity = Mass.new 2100 3100, getMass = getMass })

        ThreeSlotBelt ->
            BeltModelTag ThreeSlotBelt (Model "Three Slot Belt" 300 300 "SlotBelt" status id <| Mass.new 0 0) (BeltModel 3 0 0 0 <| Container.new { capacity = Mass.new 2600 3600, getMass = getMass })

        FourSlotBelt ->
            BeltModelTag FourSlotBelt (Model "Four Slot Belt" 300 300 "SlotBelt" status id <| Mass.new 0 0) (BeltModel 4 0 0 0 <| Container.new { capacity = Mass.new 3100 4100, getMass = getMass })

        UtilityBelt ->
            BeltModelTag UtilityBelt (Model "Utility Belt" 1350 1800 "UtilityBelt" status id <| Mass.new 0 0) (BeltModel 2 4 4 0 <| Container.new { capacity = Mass.new 3100 4100, getMass = getMass })

        WandQuiverBelt ->
            BeltModelTag WandQuiverBelt (Model "Wand Quiver Belt" 300 300 "WandQuiverBelt" status id <| Mass.new 0 0) (BeltModel 2 0 0 4 <| Container.new { capacity = Mass.new 3100 4100, getMass = getMass })


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


addToPack : Item -> Pack -> ( Pack, Mass.MassComparison )
addToPack item (PackModelTag packType model packModel) =
    let
        ( container', msg ) =
            Container.add item packModel.container
    in
        case msg of
            Mass.Ok ->
                ( PackModelTag packType model { packModel | container = container' }, Mass.Ok )

            msg ->
                ( (PackModelTag packType model packModel), msg )


removeFromPack : Container.IDItem Item -> Pack -> Pack
removeFromPack idItem (PackModelTag packType model packModel) =
    PackModelTag packType model { packModel | container = Container.take idItem packModel.container }


{-| Get the current mass and mass capacity for the given pack
-}
packInfo : Pack -> ( Mass, Mass )
packInfo (PackModelTag _ model packModel) =
    ( Container.getMass packModel.container, Container.capacity packModel.container )


packContents : Pack -> List (Container.IDItem Item)
packContents (PackModelTag packType model packModel) =
    Container.list packModel.container


newPack : PackType -> ItemStatus -> IdentificationStatus -> Pack
newPack packType status id =
    case packType of
        SmallBag ->
            PackModelTag SmallBag (Model "Small Bag" 300 500 "Bag" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 5000 6000, getMass = getMass })

        MediumBag ->
            PackModelTag MediumBag (Model "Medium Bag" 500 700 "Bag" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 10000 12000, getMass = getMass })

        LargeBag ->
            PackModelTag LargeBag (Model "Large Bag" 900 900 "Bag" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 15000 18000, getMass = getMass })

        SmallPack ->
            PackModelTag SmallPack (Model "Small Pack" 1000 1000 "Pack" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 12000 50000, getMass = getMass })

        MediumPack ->
            PackModelTag MediumPack (Model "Medium Pack" 2000 1500 "Pack" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 22000 75000, getMass = getMass })

        LargePack ->
            PackModelTag LargePack (Model "Large Pack" 4000 100000 "Pack" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 35000 100000, getMass = getMass })

        SmallChest ->
            PackModelTag SmallChest (Model "Small Chest" 5000 100000 "Chest" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 100000 50000, getMass = getMass })

        MediumChest ->
            PackModelTag MediumChest (Model "Medium Chest" 15000 150000 "Chest" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 100000 150000, getMass = getMass })

        LargeChest ->
            PackModelTag LargeChest (Model "Large Chest" 25000 250000 "Chest" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 100000 250000, getMass = getMass })

        EnchantedSmallPackOfHolding ->
            PackModelTag EnchantedSmallPackOfHolding (Model "Enchanted Small Pack Of Holding" 5000 75000 "EnchantedPack" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 50000 150000, getMass = getMass })

        EnchantedMediumPackOfHolding ->
            PackModelTag EnchantedMediumPackOfHolding (Model "Enchanted Medium Pack Of Holding" 7500 100000 "EnchantedPack" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 75000 200000, getMass = getMass })

        EnchantedLargePackOfHolding ->
            PackModelTag EnchantedLargePackOfHolding (Model "Enchanted Large Pack Of Holding" 10000 125000 "EnchantedPack" status id <| Mass.new 0 0) (PackModel <| Container.new { capacity = Mass.new 100000 250000, getMass = getMass })


type NeckwearType
    = NoOp1


type OvergarmentType
    = NoOp2


type RingType
    = NoOp3


type BootsType
    = NoOp4
