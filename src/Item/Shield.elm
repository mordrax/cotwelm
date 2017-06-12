module Item.Shield exposing (..)

import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : ShieldType -> ItemStatus -> IdentificationStatus -> Shield BasicItem
init shieldType status idStatus =
    EveryDict.get shieldType data
        |> Maybe.withDefault normalShield
        |> setShieldData shieldType


setShieldData : ShieldType -> ShieldData -> Shield BasicItem
setShieldData shieldType (ShieldData ac baseItem) =
    initBasicItem baseItem
        |> setShieldType shieldType
        |> setAC ac


type ShieldData
    = ShieldData AC BaseItem


normalShield : ShieldData
normalShield =
    ShieldData (AC 3) (BaseItem "Shield" (Prices 108 60) "shield" (Mass 500 2000) Normal Identified)


data : EveryDict ShieldType ShieldData
data =
    EveryDict.fromList
        [ ( BrokenShield, ShieldData (AC 0) (BaseItem "Broken Shield" (Prices 0 25) "broken-shield" (Mass 4000 35000) Normal Identified) )
        , ( SmallWoodenShield, ShieldData (AC 3) (BaseItem "Small Wooden Shield" (Prices 525 300) "wood-shield" (Mass 3000 15000) Normal Identified) )
        , ( MediumWoodenShield, ShieldData (AC 6) (BaseItem "Medium Wooden Shield" (Prices 1050 600) "wood-shield" (Mass 4000 35000) Normal Identified) )
        , ( LargeWoodenShield, ShieldData (AC 9) (BaseItem "Large Wooden Shield" (Prices 2100 1200) "wood-shield" (Mass 5000 50000) Normal Identified) )
        , ( SmallIronShield, ShieldData (AC 6) (BaseItem "Small Iron Shield" (Prices 1260 720) "metal-shield" (Mass 4000 15000) Normal Identified) )
        , ( MediumIronShield, ShieldData (AC 9) (BaseItem "Medium Iron Shield" (Prices 2592 1440) "metal-shield" (Mass 5000 35000) Normal Identified) )
        , ( LargeIronShield, ShieldData (AC 12) (BaseItem "Large Iron Shield" (Prices 3150 1800) "metal-shield" (Mass 6000 50000) Normal Identified) )
        , ( SmallSteelShield, ShieldData (AC 9) (BaseItem "Small Steel Shield" (Prices 2730 1560) "metal-shield" (Mass 4000 15000) Normal Identified) )
        , ( MediumSteelShield, ShieldData (AC 12) (BaseItem "Medium Steel Shield" (Prices 3360 1920) "metal-shield" (Mass 5000 35000) Normal Identified) )
        , ( LargeSteelShield, ShieldData (AC 15) (BaseItem "Large Steel Shield" (Prices 4200 2400) "metal-shield" (Mass 6000 50000) Normal Identified) )
        , ( SmallMeteoricSteelShield, ShieldData (AC 15) (BaseItem "Small Meteoric Steel Shield" (Prices 4620 2640) "metal-shield" (Mass 2500 10000) Normal Identified) )
        , ( MediumMeteoricSteelShield, ShieldData (AC 18) (BaseItem "Medium Meteoric Steel Shield" (Prices 5940 3300) "metal-shield" (Mass 3500 25000) Normal Identified) )
        , ( LargeMeteoricSteelShield, ShieldData (AC 21) (BaseItem "Large Meteoric Steel Shield" (Prices 7560 4200) "metal-shield" (Mass 4500 35000) Normal Identified) )
        ]
