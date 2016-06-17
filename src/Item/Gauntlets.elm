module Item.Gauntlets exposing (..)

import Mass exposing (..)
import IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Gauntlets
    = GauntletsModelTag GauntletsType Model ArmourModel


newGauntlets : GauntletsType -> ID -> ItemStatus -> IdentificationStatus -> Gauntlets
newGauntlets gauntletType id status idStatus =
    case gauntletType of
        NormalGauntlets ->
            GauntletsModelTag NormalGauntlets
                (Model id "Gauntlet" 500 2000 "Gauntlet" status idStatus <| Mass.new 105 60)
                (ArmourModel 5)

        GauntletOfProtection ->
            GauntletsModelTag GauntletOfProtection
                (Model id "Gauntlet Of Protection" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 2625 1500)
                (ArmourModel 10)

        GauntletOfProtectionS ->
            GauntletsModelTag GauntletOfProtectionS
                (Model id "Gauntlet Of Protection Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 6300 3600)
                (ArmourModel 15)

        GauntletOfProtectionVS ->
            GauntletsModelTag GauntletOfProtectionVS
                (Model id "Gauntlet Of Protection Very Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 12420 6900)
                (ArmourModel 20)

        GauntletOfSlaying ->
            GauntletsModelTag GauntletOfSlaying
                (Model id "Gauntlet Of Slaying" 500 2000 "GauntletOfSlaying" status idStatus <| Mass.new 3780 2100)
                (ArmourModel 0)

        GauntletOfSlayingS_S ->
            GauntletsModelTag GauntletOfSlayingS_S
                (Model id "Gauntlet Of Slaying Strong" 500 2000 "GauntletOfSlaying" status idStatus <| Mass.new 7560 4200)
                (ArmourModel 0)

        GauntletOfSlayingVS_VS ->
            GauntletsModelTag GauntletOfSlayingVS_VS
                (Model id "Gauntlet Of Slaying Very Strong" 500 2000 "GauntletOfSlaying" status idStatus <| Mass.new 13125 7500)
                (ArmourModel 0)

        GauntletOfDexterity ->
            GauntletsModelTag GauntletOfDexterity
                (Model id "Gauntlet Of Dexterity" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 3240 1800)
                (ArmourModel 5)

        GauntletOfDexterityS ->
            GauntletsModelTag GauntletOfDexterityS
                (Model id "Gauntlet Of Dexterity Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 7020 3900)
                (ArmourModel 5)

        GauntletOfDexterityVS ->
            GauntletsModelTag GauntletOfDexterityVS
                (Model id "Gauntlet Of Dexterity Very Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 12960 7200)
                (ArmourModel 5)

        GauntletOfStrength ->
            GauntletsModelTag GauntletOfStrength
                (Model id "Gauntlet Of Strength" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 3240 1800)
                (ArmourModel 5)

        GauntletOfStrengthS ->
            GauntletsModelTag GauntletOfStrengthS
                (Model id "Gauntlet Of Strength Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 0 0)
                (ArmourModel 5)

        GauntletOfStrengthVS ->
            GauntletsModelTag GauntletOfStrengthVS
                (Model id "Gauntlet Of Strength Very Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 12960 7200)
                (ArmourModel 5)
