module Item.Gauntlets exposing (..)

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : GauntletsType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Gauntlets
init gauntletsType status idStatus id =
    let
        make name mass css prices ac =
            { base = BaseItem name prices css mass status idStatus id
            , gauntletsType = gauntletsType
            , ac = ac
            }
    in
        case gauntletsType of
            NormalGauntlets ->
                make "Gauntlet" (Mass.Mass 500 2000) "Gauntlet" (Prices 105 60) (AC 5)

            GauntletOfProtection ->
                make "Gauntlet Of Protection" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 2625 1500) (AC 10)

            GauntletOfProtectionS ->
                make "Gauntlet Of Protection Strong" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 6300 3600) (AC 15)

            GauntletOfProtectionVS ->
                make "Gauntlet Of Protection Very Strong" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 12420 6900) (AC 20)

            GauntletOfSlaying ->
                make "Gauntlet Of Slaying" (Mass.Mass 500 2000) "GauntletOfSlaying" (Prices 3780 2100) (AC 0)

            GauntletOfSlayingS_S ->
                make "Gauntlet Of Slaying Strong" (Mass.Mass 500 2000) "GauntletOfSlaying" (Prices 7560 4200) (AC 0)

            GauntletOfSlayingVS_VS ->
                make "Gauntlet Of Slaying Very Strong" (Mass.Mass 500 2000) "GauntletOfSlaying" (Prices 13125 7500) (AC 0)

            GauntletOfDexterity ->
                make "Gauntlet Of Dexterity" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 3240 1800) (AC 5)

            GauntletOfDexterityS ->
                make "Gauntlet Of Dexterity Strong" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 7020 3900) (AC 5)

            GauntletOfDexterityVS ->
                make "Gauntlet Of Dexterity Very Strong" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 12960 7200) (AC 5)

            GauntletOfStrength ->
                make "Gauntlet Of Strength" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 3240 1800) (AC 5)

            GauntletOfStrengthS ->
                make "Gauntlet Of Strength Strong" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 0 0) (AC 5)

            GauntletOfStrengthVS ->
                make "Gauntlet Of Strength Very Strong" (Mass.Mass 500 2000) "GauntletEnchanted" (Prices 12960 7200) (AC 5)
