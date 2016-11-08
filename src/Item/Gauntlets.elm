module Item.Gauntlets exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)


type Gauntlets
    = Gauntlets GauntletsType AC


init : GauntletsType -> Gauntlets
init gauntletsType =
    case gauntletsType of
        NormalGauntlets ->
            Gauntlets NormalGauntlets (AC 5)

        GauntletOfProtection ->
            Gauntlets GauntletOfProtection (AC 10)

        GauntletOfProtectionS ->
            Gauntlets GauntletOfProtectionS (AC 15)

        GauntletOfProtectionVS ->
            Gauntlets GauntletOfProtectionVS (AC 20)

        GauntletOfSlaying ->
            Gauntlets GauntletOfSlaying (AC 0)

        GauntletOfSlayingS_S ->
            Gauntlets GauntletOfSlayingS_S (AC 0)

        GauntletOfSlayingVS_VS ->
            Gauntlets GauntletOfSlayingVS_VS (AC 0)

        GauntletOfDexterity ->
            Gauntlets GauntletOfDexterity (AC 5)

        GauntletOfDexterityS ->
            Gauntlets GauntletOfDexterityS (AC 5)

        GauntletOfDexterityVS ->
            Gauntlets GauntletOfDexterityVS (AC 5)

        GauntletOfStrength ->
            Gauntlets GauntletOfStrength (AC 5)

        GauntletOfStrengthS ->
            Gauntlets GauntletOfStrengthS (AC 5)

        GauntletOfStrengthVS ->
            Gauntlets GauntletOfStrengthVS (AC 5)


blueprint : GauntletsType -> BaseItemData
blueprint gauntletsType =
    case gauntletsType of
        NormalGauntlets ->
            BaseItemData "Gauntlet" 500 2000 "Gauntlet" 105 60

        GauntletOfProtection ->
            BaseItemData "Gauntlet Of Protection" 500 2000 "GauntletEnchanted" 2625 1500

        GauntletOfProtectionS ->
            BaseItemData "Gauntlet Of Protection Strong" 500 2000 "GauntletEnchanted" 6300 3600

        GauntletOfProtectionVS ->
            BaseItemData "Gauntlet Of Protection Very Strong" 500 2000 "GauntletEnchanted" 12420 6900

        GauntletOfSlaying ->
            BaseItemData "Gauntlet Of Slaying" 500 2000 "GauntletOfSlaying" 3780 2100

        GauntletOfSlayingS_S ->
            BaseItemData "Gauntlet Of Slaying Strong" 500 2000 "GauntletOfSlaying" 7560 4200

        GauntletOfSlayingVS_VS ->
            BaseItemData "Gauntlet Of Slaying Very Strong" 500 2000 "GauntletOfSlaying" 13125 7500

        GauntletOfDexterity ->
            BaseItemData "Gauntlet Of Dexterity" 500 2000 "GauntletEnchanted" 3240 1800

        GauntletOfDexterityS ->
            BaseItemData "Gauntlet Of Dexterity Strong" 500 2000 "GauntletEnchanted" 7020 3900

        GauntletOfDexterityVS ->
            BaseItemData "Gauntlet Of Dexterity Very Strong" 500 2000 "GauntletEnchanted" 12960 7200

        GauntletOfStrength ->
            BaseItemData "Gauntlet Of Strength" 500 2000 "GauntletEnchanted" 3240 1800

        GauntletOfStrengthS ->
            BaseItemData "Gauntlet Of Strength Strong" 500 2000 "GauntletEnchanted" 0 0

        GauntletOfStrengthVS ->
            BaseItemData "Gauntlet Of Strength Very Strong" 500 2000 "GauntletEnchanted" 12960 7200
