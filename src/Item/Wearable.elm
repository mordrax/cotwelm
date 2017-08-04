module Item.Wearable
    exposing
        ( armourTypes
        , decodeArmour
        , encodeArmour
        , initArmour
        , initBracers
        , initGauntlets
        , initHelmet
        , initShield
        )

import Dict exposing (Dict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


-- Armour


initArmour : ArmourType -> ItemStatus -> IdentificationStatus -> ( BaseItem, ArmourDetails )
initArmour armourType status idStatus =
    let
        make name mass css itemValue ac =
            ( BaseItem name itemValue css mass status idStatus
            , { armourType = armourType
              , ac = ac
              }
            )

        makeMonsterArmour name ac =
            make name (Mass 0 0) "" (ItemValue 0) ac
    in
    case armourType of
        RustyArmour ->
            make "Rusty Armour" (Mass 10000 30000) "broken-armour" (ItemValue 0) (AC 0)

        LeatherArmour ->
            make "Leather Armour" (Mass 5000 2400) "leather-armour" (ItemValue 1080) (AC 6)

        StuddedLeatherArmour ->
            make "Studded Leather Armour" (Mass 7000 25000) "leather-armour" (ItemValue 3150) (AC 12)

        RingMail ->
            make "Ring Mail" (Mass 8000 30000) "metal-armour" (ItemValue 6300) (AC 18)

        ScaleMail ->
            make "Scale Mail" (Mass 9000 30000) "metal-armour" (ItemValue 10800) (AC 24)

        ChainMail ->
            make "Chain Mail" (Mass 10000 30000) "metal-armour" (ItemValue 16200) (AC 30)

        SplintMail ->
            make "Splint Mail" (Mass 12000 40000) "metal-armour" (ItemValue 27000) (AC 36)

        PlateMail ->
            make "Plate Mail" (Mass 15000 40000) "metal-armour" (ItemValue 42000) (AC 42)

        PlateArmour ->
            make "Plate Armour" (Mass 15000 60000) "metal-armour" (ItemValue 42000) (AC 48)

        MeteoricSteelPlate ->
            make "Meteoric Steel Plate" (Mass 5000 30000) "metal-armour" (ItemValue 105000) (AC 54)

        ElvenChainMail ->
            make "Elven Chain Mail" (Mass 5000 24000) "metal-armour" (ItemValue 162000) (AC 52)

        -- monster armour
        SoftHide ->
            makeMonsterArmour "Soft Hide" (AC 10)

        Bones ->
            makeMonsterArmour "Bones" (AC 15)

        Shell ->
            makeMonsterArmour "Shell" (AC 20)

        ToughHide ->
            makeMonsterArmour "Tough Hide" (AC 20)


armourTypes : List ArmourType
armourTypes =
    [ RustyArmour
    , LeatherArmour
    , StuddedLeatherArmour
    , RingMail
    , ScaleMail
    , ChainMail
    , SplintMail
    , PlateMail
    , PlateArmour
    , MeteoricSteelPlate
    , ElvenChainMail
    , SoftHide
    , Bones
    , Shell
    , ToughHide
    ]


encodeArmour : ArmourType -> String
encodeArmour =
    toString


decodeArmour : String -> ArmourType
decodeArmour value =
    Dict.get value armourTypeDict
        |> Maybe.withDefault RustyArmour


armourTypeDict : Dict String ArmourType
armourTypeDict =
    let
        makeKVP x =
            ( toString x, x )
    in
    armourTypes
        |> List.map makeKVP
        |> Dict.fromList



-- Bracers


initBracers : BracersType -> ItemStatus -> IdentificationStatus -> ( BaseItem, BracersDetails )
initBracers bracersType status idStatus =
    let
        make name mass css itemValue ac =
            ( BaseItem name itemValue css mass status idStatus
            , { bracersType = bracersType
              , ac = ac
              }
            )
    in
    case bracersType of
        NormalBracers ->
            make "Bracers" (Mass 500 2000) "bracers" (ItemValue 60) (AC 3)

        BracersOfDefenseNormal ->
            make "Bracers Of Defense Normal" (Mass 500 2000) "bracers-enchanted" (ItemValue 1020) (AC 8)

        BracersOfDefenseS ->
            make "Bracers Of Defense Strong" (Mass 500 2000) "bracers-enchanted" (ItemValue 3120) (AC 13)

        BracersOfDefenseVS ->
            make "Bracers Of Defense Very Strong" (Mass 500 2000) "bracers-enchanted" (ItemValue 6420) (AC 18)



-- Gauntlets


initGauntlets : GauntletsType -> ItemStatus -> IdentificationStatus -> ( BaseItem, GauntletsDetails )
initGauntlets gauntletsType status idStatus =
    let
        make name mass css itemValue ac =
            ( BaseItem name itemValue css mass status idStatus
            , { gauntletsType = gauntletsType
              , ac = ac
              }
            )
    in
    case gauntletsType of
        NormalGauntlets ->
            make "Gauntlet" (Mass 500 2000) "gauntlet" (ItemValue 60) (AC 5)

        GauntletOfProtection ->
            make "Gauntlet Of Protection" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 1500) (AC 10)

        GauntletOfProtectionS ->
            make "Gauntlet Of Protection Strong" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 3600) (AC 15)

        GauntletOfProtectionVS ->
            make "Gauntlet Of Protection Very Strong" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 6900) (AC 20)

        GauntletOfSlaying ->
            make "Gauntlet Of Slaying" (Mass 500 2000) "gauntlet-of-slaying" (ItemValue 2100) (AC 0)

        GauntletOfSlayingS_S ->
            make "Gauntlet Of Slaying Strong" (Mass 500 2000) "gauntlet-of-slaying" (ItemValue 4200) (AC 0)

        GauntletOfSlayingVS_VS ->
            make "Gauntlet Of Slaying Very Strong" (Mass 500 2000) "gauntlet-of-slaying" (ItemValue 7500) (AC 0)

        GauntletOfDexterity ->
            make "Gauntlet Of Dexterity" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 1800) (AC 5)

        GauntletOfDexterityS ->
            make "Gauntlet Of Dexterity Strong" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 3900) (AC 5)

        GauntletOfDexterityVS ->
            make "Gauntlet Of Dexterity Very Strong" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 7200) (AC 5)

        GauntletOfStrength ->
            make "Gauntlet Of Strength" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 1800) (AC 5)

        GauntletOfStrengthS ->
            make "Gauntlet Of Strength Strong" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 0) (AC 5)

        GauntletOfStrengthVS ->
            make "Gauntlet Of Strength Very Strong" (Mass 500 2000) "gauntlet-enchanted" (ItemValue 7200) (AC 5)



-- Helmet


initHelmet : HelmetType -> ItemStatus -> IdentificationStatus -> ( BaseItem, HelmetDetails )
initHelmet helmetType status idStatus =
    let
        make name mass css itemValue ac =
            ( BaseItem name itemValue css mass status idStatus
            , { helmetType = helmetType
              , ac = ac
              }
            )
    in
    case helmetType of
        BrokenHelmet ->
            make "Broken Helmet" (Mass 1000 1000) "broken-helmet" (ItemValue 25) (AC 0)

        LeatherHelmet ->
            make "Leather Helmet" (Mass 500 500) "leather-helmet" (ItemValue 300) (AC 3)

        IronHelmet ->
            make "Iron Helmet" (Mass 2000 2000) "metal-helmet" (ItemValue 600) (AC 6)

        SteelHelmet ->
            make "Steel Helmet" (Mass 2500 2000) "metal-helmet" (ItemValue 1800) (AC 9)

        MeteoricSteelHelmet ->
            make "Meteoric Steel Helmet" (Mass 1000 2000) "metal-helmet" (ItemValue 6000) (AC 15)

        HelmetOfDetectMonsters ->
            make "Helmet Of Detect Monsters" (Mass 2500 2000) "helmet-of-detect-monsters" (ItemValue 24000) (AC 9)

        EnchantedHelmOfStorms ->
            make "Enchanted Helm Of Storms" (Mass 1000 2000) "enchanted-helm-of-storms" (ItemValue 600000) (AC 25)



-- Shield


initShield : ShieldType -> ItemStatus -> IdentificationStatus -> ( BaseItem, ShieldDetails )
initShield shieldType status idStatus =
    let
        make name mass css itemValue ac =
            ( BaseItem name itemValue css mass status idStatus
            , { shieldType = shieldType
              , ac = ac
              }
            )
    in
    case shieldType of
        BrokenShield ->
            make "Broken Shield" (Mass 4000 35000) "broken-shield" (ItemValue 25) (AC 0)

        SmallWoodenShield ->
            make "Small Wooden Shield" (Mass 3000 15000) "wood-shield" (ItemValue 300) (AC 3)

        MediumWoodenShield ->
            make "Medium Wooden Shield" (Mass 4000 35000) "wood-shield" (ItemValue 600) (AC 6)

        LargeWoodenShield ->
            make "Large Wooden Shield" (Mass 5000 50000) "wood-shield" (ItemValue 1200) (AC 9)

        SmallIronShield ->
            make "Small Iron Shield" (Mass 4000 15000) "metal-shield" (ItemValue 720) (AC 6)

        MediumIronShield ->
            make "Medium Iron Shield" (Mass 5000 35000) "metal-shield" (ItemValue 1440) (AC 9)

        LargeIronShield ->
            make "Large Iron Shield" (Mass 6000 50000) "metal-shield" (ItemValue 1800) (AC 12)

        SmallSteelShield ->
            make "Small Steel Shield" (Mass 4000 15000) "metal-shield" (ItemValue 1560) (AC 9)

        MediumSteelShield ->
            make "Medium Steel Shield" (Mass 5000 35000) "metal-shield" (ItemValue 1920) (AC 12)

        LargeSteelShield ->
            make "Large Steel Shield" (Mass 6000 50000) "metal-shield" (ItemValue 2400) (AC 15)

        SmallMeteoricSteelShield ->
            make "Small Meteoric Steel Shield" (Mass 2500 10000) "metal-shield" (ItemValue 2640) (AC 15)

        MediumMeteoricSteelShield ->
            make "Medium Meteoric Steel Shield" (Mass 3500 25000) "metal-shield" (ItemValue 3300) (AC 18)

        LargeMeteoricSteelShield ->
            make "Large Meteoric Steel Shield" (Mass 4500 35000) "metal-shield" (ItemValue 4200) (AC 21)
