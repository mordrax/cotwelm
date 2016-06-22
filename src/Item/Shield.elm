module Item.Shield exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Shield
    = ShieldM ShieldType ArmourModel


newShield : ShieldType -> ID -> ItemStatus -> IdentificationStatus -> Shield
newShield shieldType id status idStatus =
    case shieldType of
        BrokenShield ->
            ShieldM BrokenShield
                { ac = 0
                , baseItem = (Model id "Broken Shield" 4000 35000 "BrokenShield" status idStatus <| Mass.new 0 25)
                }

        SmallWoodenShield ->
            ShieldM SmallWoodenShield
                { ac = 3
                , baseItem = (Model id "Small Wooden Shield" 3000 15000 "WoodShield" status idStatus <| Mass.new 525 300)
                }

        MediumWoodenShield ->
            ShieldM MediumWoodenShield
                { ac = 6
                , baseItem = (Model id "Medium Wooden Shield" 4000 35000 "WoodShield" status idStatus <| Mass.new 1050 600)
                }

        LargeWoodenShield ->
            ShieldM LargeWoodenShield
                { ac = 9
                , baseItem = (Model id "Large Wooden Shield" 5000 50000 "WoodShield" status idStatus <| Mass.new 2100 1200)
                }

        SmallIronShield ->
            ShieldM SmallIronShield
                { ac = 6
                , baseItem = (Model id "Small Iron Shield" 4000 15000 "MetalShield" status idStatus <| Mass.new 1260 720)
                }

        MediumIronShield ->
            ShieldM MediumIronShield
                { ac = 9
                , baseItem = (Model id "Medium Iron Shield" 5000 35000 "MetalShield" status idStatus <| Mass.new 2592 1440)
                }

        LargeIronShield ->
            ShieldM LargeIronShield
                { ac = 12
                , baseItem = (Model id "Large Iron Shield" 6000 50000 "MetalShield" status idStatus <| Mass.new 3150 1800)
                }

        SmallSteelShield ->
            ShieldM SmallSteelShield
                { ac = 9
                , baseItem = (Model id "Small Steel Shield" 4000 15000 "MetalShield" status idStatus <| Mass.new 2730 1560)
                }

        MediumSteelShield ->
            ShieldM MediumSteelShield
                { ac = 12
                , baseItem = (Model id "Medium Steel Shield" 5000 35000 "MetalShield" status idStatus <| Mass.new 3360 1920)
                }

        LargeSteelShield ->
            ShieldM LargeSteelShield
                { ac = 15
                , baseItem = (Model id "Large Steel Shield" 6000 50000 "MetalShield" status idStatus <| Mass.new 4200 2400)
                }

        SmallMeteoricSteelShield ->
            ShieldM SmallMeteoricSteelShield
                { ac = 15
                , baseItem = (Model id "Small Meteoric Steel Shield" 2500 10000 "MetalShield" status idStatus <| Mass.new 4620 2640)
                }

        MediumMeteoricSteelShield ->
            ShieldM MediumMeteoricSteelShield
                { ac = 18
                , baseItem = (Model id "Medium Meteoric Steel Shield" 3500 25000 "MetalShield" status idStatus <| Mass.new 5940 3300)
                }

        LargeMeteoricSteelShield ->
            ShieldM LargeMeteoricSteelShield
                { ac = 21
                , baseItem = (Model id "Large Meteoric Steel Shield" 4500 35000 "MetalShield" status idStatus <| Mass.new 7560 4200)
                }
