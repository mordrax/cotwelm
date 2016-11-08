module Item.Shield exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)


type Shield
    = ShieldM ShieldType AC


init : ShieldType -> Shield
init shieldType =
    case shieldType of
        BrokenShield ->
            ShieldM BrokenShield (AC 0)

        SmallWoodenShield ->
            ShieldM SmallWoodenShield (AC 3)

        MediumWoodenShield ->
            ShieldM MediumWoodenShield (AC 6)

        LargeWoodenShield ->
            ShieldM LargeWoodenShield (AC 9)

        SmallIronShield ->
            ShieldM SmallIronShield (AC 6)

        MediumIronShield ->
            ShieldM MediumIronShield (AC 9)

        LargeIronShield ->
            ShieldM LargeIronShield (AC 12)

        SmallSteelShield ->
            ShieldM SmallSteelShield (AC 9)

        MediumSteelShield ->
            ShieldM MediumSteelShield (AC 12)

        LargeSteelShield ->
            ShieldM LargeSteelShield (AC 15)

        SmallMeteoricSteelShield ->
            ShieldM SmallMeteoricSteelShield (AC 15)

        MediumMeteoricSteelShield ->
            ShieldM MediumMeteoricSteelShield (AC 18)

        LargeMeteoricSteelShield ->
            ShieldM LargeMeteoricSteelShield (AC 21)


blueprint : ShieldType -> BaseItemData
blueprint shieldType =
    case shieldType of
        BrokenShield ->
            BaseItemData "Broken Shield" 4000 35000 "BrokenShield" 0 25

        SmallWoodenShield ->
            BaseItemData "Small Wooden Shield" 3000 15000 "WoodShield" 525 300

        MediumWoodenShield ->
            BaseItemData "Medium Wooden Shield" 4000 35000 "WoodShield" 1050 600

        LargeWoodenShield ->
            BaseItemData "Large Wooden Shield" 5000 50000 "WoodShield" 2100 1200

        SmallIronShield ->
            BaseItemData "Small Iron Shield" 4000 15000 "MetalShield" 1260 720

        MediumIronShield ->
            BaseItemData "Medium Iron Shield" 5000 35000 "MetalShield" 2592 1440

        LargeIronShield ->
            BaseItemData "Large Iron Shield" 6000 50000 "MetalShield" 3150 1800

        SmallSteelShield ->
            BaseItemData "Small Steel Shield" 4000 15000 "MetalShield" 2730 1560

        MediumSteelShield ->
            BaseItemData "Medium Steel Shield" 5000 35000 "MetalShield" 3360 1920

        LargeSteelShield ->
            BaseItemData "Large Steel Shield" 6000 50000 "MetalShield" 4200 2400

        SmallMeteoricSteelShield ->
            BaseItemData "Small Meteoric Steel Shield" 2500 10000 "MetalShield" 4620 2640

        MediumMeteoricSteelShield ->
            BaseItemData "Medium Meteoric Steel Shield" 3500 25000 "MetalShield" 5940 3300

        LargeMeteoricSteelShield ->
            BaseItemData "Large Meteoric Steel Shield" 4500 35000 "MetalShield" 7560 4200
