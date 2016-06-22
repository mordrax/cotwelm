module Item.Gauntlets exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Gauntlets
    = GauntletsM GauntletsType ArmourModel


newGauntlets : GauntletsType -> ID -> ItemStatus -> IdentificationStatus -> Gauntlets
newGauntlets gauntletType id status idStatus =
    case gauntletType of
        NormalGauntlets ->
            GauntletsM NormalGauntlets
                { ac = 5
                , baseItem = (Model id "Gauntlet" 500 2000 "Gauntlet" status idStatus <| Mass.new 105 60)
                }

        GauntletOfProtection ->
            GauntletsM GauntletOfProtection
                { ac = 10
                , baseItem = (Model id "Gauntlet Of Protection" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 2625 1500)
                }

        GauntletOfProtectionS ->
            GauntletsM GauntletOfProtectionS
                { ac = 15
                , baseItem = (Model id "Gauntlet Of Protection Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 6300 3600)
                }

        GauntletOfProtectionVS ->
            GauntletsM GauntletOfProtectionVS
                { ac = 20
                , baseItem = (Model id "Gauntlet Of Protection Very Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 12420 6900)
                }

        GauntletOfSlaying ->
            GauntletsM GauntletOfSlaying
                { ac = 0
                , baseItem = (Model id "Gauntlet Of Slaying" 500 2000 "GauntletOfSlaying" status idStatus <| Mass.new 3780 2100)
                }

        GauntletOfSlayingS_S ->
            GauntletsM GauntletOfSlayingS_S
                { ac = 0
                , baseItem = (Model id "Gauntlet Of Slaying Strong" 500 2000 "GauntletOfSlaying" status idStatus <| Mass.new 7560 4200)
                }

        GauntletOfSlayingVS_VS ->
            GauntletsM GauntletOfSlayingVS_VS
                { ac = 0
                , baseItem = (Model id "Gauntlet Of Slaying Very Strong" 500 2000 "GauntletOfSlaying" status idStatus <| Mass.new 13125 7500)
                }

        GauntletOfDexterity ->
            GauntletsM GauntletOfDexterity
                { ac = 5
                , baseItem = (Model id "Gauntlet Of Dexterity" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 3240 1800)
                }

        GauntletOfDexterityS ->
            GauntletsM GauntletOfDexterityS
                { ac = 5
                , baseItem = (Model id "Gauntlet Of Dexterity Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 7020 3900)
                }

        GauntletOfDexterityVS ->
            GauntletsM GauntletOfDexterityVS
                { ac = 5
                , baseItem = (Model id "Gauntlet Of Dexterity Very Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 12960 7200)
                }

        GauntletOfStrength ->
            GauntletsM GauntletOfStrength
                { ac = 5
                , baseItem = (Model id "Gauntlet Of Strength" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 3240 1800)
                }

        GauntletOfStrengthS ->
            GauntletsM GauntletOfStrengthS
                { ac = 5
                , baseItem = (Model id "Gauntlet Of Strength Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 0 0)
                }

        GauntletOfStrengthVS ->
            GauntletsM GauntletOfStrengthVS
                { ac = 5
                , baseItem = (Model id "Gauntlet Of Strength Very Strong" 500 2000 "GauntletEnchanted" status idStatus <| Mass.new 12960 7200)
                }
