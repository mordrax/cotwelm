module Item.Gauntlets exposing (..)

import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : GauntletsType -> ItemStatus -> IdentificationStatus -> Gauntlets BasicItem
init gauntletsType status idStatus =
    EveryDict.get gauntletsType data
        |> Maybe.withDefault normalGauntlets
        |> setGauntletsData gauntletsType


setGauntletsData : GauntletsType -> GauntletsData -> Gauntlets BasicItem
setGauntletsData gauntletsType (GauntletsData ac baseItem) =
    initBasicItem baseItem
        |> setGauntletsType gauntletsType
        |> setAC ac


type GauntletsData
    = GauntletsData AC BaseItem


normalGauntlets : GauntletsData
normalGauntlets =
    GauntletsData (AC 3) (BaseItem "Gauntlets" (Prices 108 60) "gauntlets" (Mass 500 2000) Normal Identified)


data : EveryDict GauntletsType GauntletsData
data =
    EveryDict.fromList
        [ ( NormalGauntlets, GauntletsData (AC 5) (BaseItem "Gauntlet" (Prices 105 60) "gauntlet" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfProtection, GauntletsData (AC 10) (BaseItem "Gauntlet Of Protection" (Prices 2625 1500) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfProtectionS, GauntletsData (AC 15) (BaseItem "Gauntlet Of Protection Strong" (Prices 6300 3600) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfProtectionVS, GauntletsData (AC 20) (BaseItem "Gauntlet Of Protection Very Strong" (Prices 12420 6900) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfSlaying, GauntletsData (AC 0) (BaseItem "Gauntlet Of Slaying" (Prices 3780 2100) "gauntlet-of-slaying" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfSlayingS_S, GauntletsData (AC 0) (BaseItem "Gauntlet Of Slaying Strong" (Prices 7560 4200) "gauntlet-of-slaying" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfSlayingVS_VS, GauntletsData (AC 0) (BaseItem "Gauntlet Of Slaying Very Strong" (Prices 13125 7500) "gauntlet-of-slaying" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfDexterity, GauntletsData (AC 5) (BaseItem "Gauntlet Of Dexterity" (Prices 3240 1800) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfDexterityS, GauntletsData (AC 5) (BaseItem "Gauntlet Of Dexterity Strong" (Prices 7020 3900) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfDexterityVS, GauntletsData (AC 5) (BaseItem "Gauntlet Of Dexterity Very Strong" (Prices 12960 7200) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfStrength, GauntletsData (AC 5) (BaseItem "Gauntlet Of Strength" (Prices 3240 1800) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfStrengthS, GauntletsData (AC 5) (BaseItem "Gauntlet Of Strength Strong" (Prices 0 0) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        , ( GauntletOfStrengthVS, GauntletsData (AC 5) (BaseItem "Gauntlet Of Strength Very Strong" (Prices 12960 7200) "gauntlet-enchanted" (Mass 500 2000) Normal Identified) )
        ]
