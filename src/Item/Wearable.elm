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


initArmour : ArmourType -> ItemStatus -> IdentificationStatus -> Armour
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
            make "Rusty Armour" (Mass 200 600) "broken-armour" (ItemValue 1) (AC 0)

        LeatherArmour ->
            make "Leather Armour" (Mass 100 450) "leather-armour" (ItemValue 42) (AC 6)

        StuddedLeatherArmour ->
            make "Studded Leather Armour" (Mass 140 500) "leather-armour" (ItemValue 126) (AC 12)

        RingMail ->
            make "Ring Mail" (Mass 160 600) "metal-armour" (ItemValue 252) (AC 18)

        ScaleMail ->
            make "Scale Mail" (Mass 180 600) "metal-armour" (ItemValue 432) (AC 24)

        ChainMail ->
            make "Chain Mail" (Mass 200 600) "metal-armour" (ItemValue 648) (AC 30)

        SplintMail ->
            make "Splint Mail" (Mass 240 800) "metal-armour" (ItemValue 1080) (AC 36)

        PlateMail ->
            make "Plate Mail" (Mass 300 800) "metal-armour" (ItemValue 1680) (AC 42)

        PlateArmour ->
            make "Plate Armour" (Mass 300 1200) "metal-armour" (ItemValue 2880) (AC 48)

        MeteoricSteelPlate ->
            make "Meteoric Steel Plate" (Mass 100 600) "metal-armour" (ItemValue 4200) (AC 54)

        ElvenChainMail ->
            make "Elven Chain Mail" (Mass 100 480) "metal-armour" (ItemValue 6480) (AC 52)

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
            make "Bracers" (Mass 10 40) "bracers" (ItemValue 60) (AC 3)

        BracersOfDefenseNormal ->
            make "Bracers Of Defense Normal" (Mass 10 40) "bracers-enchanted" (ItemValue 320) (AC 8)

        BracersOfDefenseS ->
            make "Bracers Of Defense Strong" (Mass 10 40) "bracers-enchanted" (ItemValue 480) (AC 13)

        BracersOfDefenseVS ->
            make "Bracers Of Defense Very Strong" (Mass 10 40) "bracers-enchanted" (ItemValue 640) (AC 18)



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
            make "Gauntlet" (Mass 10 40) "gauntlet" (ItemValue 60) (AC 5)

        GauntletOfProtection ->
            make "Gauntlet Of Protection" (Mass 10 40) "gauntlet-enchanted" (ItemValue 1500) (AC 10)

        GauntletOfProtectionS ->
            make "Gauntlet Of Protection Strong" (Mass 10 40) "gauntlet-enchanted" (ItemValue 3600) (AC 15)

        GauntletOfProtectionVS ->
            make "Gauntlet Of Protection Very Strong" (Mass 10 40) "gauntlet-enchanted" (ItemValue 6900) (AC 20)

        GauntletOfSlaying ->
            make "Gauntlet Of Slaying" (Mass 10 40) "gauntlet-of-slaying" (ItemValue 2100) (AC 0)

        GauntletOfSlayingS_S ->
            make "Gauntlet Of Slaying Strong" (Mass 10 40) "gauntlet-of-slaying" (ItemValue 4200) (AC 0)

        GauntletOfSlayingVS_VS ->
            make "Gauntlet Of Slaying Very Strong" (Mass 10 40) "gauntlet-of-slaying" (ItemValue 7500) (AC 0)

        GauntletOfDexterity ->
            make "Gauntlet Of Dexterity" (Mass 10 40) "gauntlet-enchanted" (ItemValue 1800) (AC 5)

        GauntletOfDexterityS ->
            make "Gauntlet Of Dexterity Strong" (Mass 10 40) "gauntlet-enchanted" (ItemValue 3900) (AC 5)

        GauntletOfDexterityVS ->
            make "Gauntlet Of Dexterity Very Strong" (Mass 10 40) "gauntlet-enchanted" (ItemValue 7200) (AC 5)

        GauntletOfStrength ->
            make "Gauntlet Of Strength" (Mass 10 40) "gauntlet-enchanted" (ItemValue 1800) (AC 5)

        GauntletOfStrengthS ->
            make "Gauntlet Of Strength Strong" (Mass 10 40) "gauntlet-enchanted" (ItemValue 0) (AC 5)

        GauntletOfStrengthVS ->
            make "Gauntlet Of Strength Very Strong" (Mass 10 40) "gauntlet-enchanted" (ItemValue 7200) (AC 5)



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
            make "Broken Helmet" (Mass 20 20) "broken-helmet" (ItemValue 1) (AC 0)

        LeatherHelmet ->
            make "Leather Helmet" (Mass 10 10) "leather-helmet" (ItemValue 12) (AC 3)

        IronHelmet ->
            make "Iron Helmet" (Mass 40 40) "metal-helmet" (ItemValue 24) (AC 6)

        SteelHelmet ->
            make "Steel Helmet" (Mass 50 40) "metal-helmet" (ItemValue 72) (AC 9)

        MeteoricSteelHelmet ->
            make "Meteoric Steel Helmet" (Mass 20 40) "metal-helmet" (ItemValue 240) (AC 15)

        HelmetOfDetectMonsters ->
            make "Helmet Of Detect Monsters" (Mass 50 40) "helmet-of-detect-monsters" (ItemValue 960) (AC 9)

        EnchantedHelmOfStorms ->
            make "Enchanted Helm Of Storms" (Mass 20 40) "enchanted-helm-of-storms" (ItemValue 24000) (AC 25)



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
            make "Broken Shield" (Mass 80 700) "broken-shield" (ItemValue 1) (AC 0)

        SmallWoodenShield ->
            make "Small Wooden Shield" (Mass 60 300) "wood-shield" (ItemValue 12) (AC 3)

        MediumWoodenShield ->
            make "Medium Wooden Shield" (Mass 80 700) "wood-shield" (ItemValue 24) (AC 6)

        LargeWoodenShield ->
            make "Large Wooden Shield" (Mass 100 1000) "wood-shield" (ItemValue 48) (AC 9)

        SmallIronShield ->
            make "Small Iron Shield" (Mass 80 300) "metal-shield" (ItemValue 29) (AC 6)

        MediumIronShield ->
            make "Medium Iron Shield" (Mass 100 700) "metal-shield" (ItemValue 58) (AC 9)

        LargeIronShield ->
            make "Large Iron Shield" (Mass 120 1000) "metal-shield" (ItemValue 72) (AC 12)

        SmallSteelShield ->
            make "Small Steel Shield" (Mass 80 300) "metal-shield" (ItemValue 62) (AC 9)

        MediumSteelShield ->
            make "Medium Steel Shield" (Mass 100 700) "metal-shield" (ItemValue 77) (AC 12)

        LargeSteelShield ->
            make "Large Steel Shield" (Mass 120 1000) "metal-shield" (ItemValue 96) (AC 15)

        SmallMeteoricSteelShield ->
            make "Small Meteoric Steel Shield" (Mass 50 300) "metal-shield" (ItemValue 104) (AC 15)

        MediumMeteoricSteelShield ->
            make "Medium Meteoric Steel Shield" (Mass 70 700) "metal-shield" (ItemValue 132) (AC 18)

        LargeMeteoricSteelShield ->
            make "Large Meteoric Steel Shield" (Mass 90 1000) "metal-shield" (ItemValue 168) (AC 21)
