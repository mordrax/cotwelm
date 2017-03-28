module Item.Shield exposing (..)

import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : ShieldType -> ItemStatus -> IdentificationStatus -> Shield
init shieldType status idStatus =
    let
        make name mass css prices ac =
            { base = BaseItem name prices css mass status idStatus
            , shieldType = shieldType
            , ac = ac
            }
    in
        case shieldType of
            BrokenShield ->
                make "Broken Shield" (Mass.Mass 4000 35000) "broken-shield" (Prices 0 25) (AC 0)

            SmallWoodenShield ->
                make "Small Wooden Shield" (Mass.Mass 3000 15000) "wood-shield" (Prices 525 300) (AC 3)

            MediumWoodenShield ->
                make "Medium Wooden Shield" (Mass.Mass 4000 35000) "wood-shield" (Prices 1050 600) (AC 6)

            LargeWoodenShield ->
                make "Large Wooden Shield" (Mass.Mass 5000 50000) "wood-shield" (Prices 2100 1200) (AC 9)

            SmallIronShield ->
                make "Small Iron Shield" (Mass.Mass 4000 15000) "metal-shield" (Prices 1260 720) (AC 6)

            MediumIronShield ->
                make "Medium Iron Shield" (Mass.Mass 5000 35000) "metal-shield" (Prices 2592 1440) (AC 9)

            LargeIronShield ->
                make "Large Iron Shield" (Mass.Mass 6000 50000) "metal-shield" (Prices 3150 1800) (AC 12)

            SmallSteelShield ->
                make "Small Steel Shield" (Mass.Mass 4000 15000) "metal-shield" (Prices 2730 1560) (AC 9)

            MediumSteelShield ->
                make "Medium Steel Shield" (Mass.Mass 5000 35000) "metal-shield" (Prices 3360 1920) (AC 12)

            LargeSteelShield ->
                make "Large Steel Shield" (Mass.Mass 6000 50000) "metal-shield" (Prices 4200 2400) (AC 15)

            SmallMeteoricSteelShield ->
                make "Small Meteoric Steel Shield" (Mass.Mass 2500 10000) "metal-shield" (Prices 4620 2640) (AC 15)

            MediumMeteoricSteelShield ->
                make "Medium Meteoric Steel Shield" (Mass.Mass 3500 25000) "metal-shield" (Prices 5940 3300) (AC 18)

            LargeMeteoricSteelShield ->
                make "Large Meteoric Steel Shield" (Mass.Mass 4500 35000) "metal-shield" (Prices 7560 4200) (AC 21)
