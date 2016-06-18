module Item.Shield exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Shield
    = ShieldModelTag ShieldType Model ArmourModel


newShield : ShieldType -> ID -> ItemStatus -> IdentificationStatus -> Shield
newShield shieldType id status idStatus =
    case shieldType of
        BrokenShield ->
            ShieldModelTag BrokenShield
                (Model id "Broken Shield" 4000 35000 "BrokenShield" status idStatus <| Mass.new 0 25)
                (ArmourModel 0)

        SmallWoodenShield ->
            ShieldModelTag SmallWoodenShield
                (Model id "Small Wooden Shield" 3000 15000 "WoodShield" status idStatus <| Mass.new 525 300)
                (ArmourModel 3)

        MediumWoodenShield ->
            ShieldModelTag MediumWoodenShield
                (Model id "Medium Wooden Shield" 4000 35000 "WoodShield" status idStatus <| Mass.new 1050 600)
                (ArmourModel 6)

        LargeWoodenShield ->
            ShieldModelTag LargeWoodenShield
                (Model id "Large Wooden Shield" 5000 50000 "WoodShield" status idStatus <| Mass.new 2100 1200)
                (ArmourModel 9)

        SmallIronShield ->
            ShieldModelTag SmallIronShield
                (Model id "Small Iron Shield" 4000 15000 "MetalShield" status idStatus <| Mass.new 1260 720)
                (ArmourModel 6)

        MediumIronShield ->
            ShieldModelTag MediumIronShield
                (Model id "Medium Iron Shield" 5000 35000 "MetalShield" status idStatus <| Mass.new 2592 1440)
                (ArmourModel 9)

        LargeIronShield ->
            ShieldModelTag LargeIronShield
                (Model id "Large Iron Shield" 6000 50000 "MetalShield" status idStatus <| Mass.new 3150 1800)
                (ArmourModel 12)

        SmallSteelShield ->
            ShieldModelTag SmallSteelShield
                (Model id "Small Steel Shield" 4000 15000 "MetalShield" status idStatus <| Mass.new 2730 1560)
                (ArmourModel 9)

        MediumSteelShield ->
            ShieldModelTag MediumSteelShield
                (Model id "Medium Steel Shield" 5000 35000 "MetalShield" status idStatus <| Mass.new 3360 1920)
                (ArmourModel 12)

        LargeSteelShield ->
            ShieldModelTag LargeSteelShield
                (Model id "Large Steel Shield" 6000 50000 "MetalShield" status idStatus <| Mass.new 4200 2400)
                (ArmourModel 15)

        SmallMeteoricSteelShield ->
            ShieldModelTag SmallMeteoricSteelShield
                (Model id "Small Meteoric Steel Shield" 2500 10000 "MetalShield" status idStatus <| Mass.new 4620 2640)
                (ArmourModel 15)

        MediumMeteoricSteelShield ->
            ShieldModelTag MediumMeteoricSteelShield
                (Model id "Medium Meteoric Steel Shield" 3500 25000 "MetalShield" status idStatus <| Mass.new 5940 3300)
                (ArmourModel 18)

        LargeMeteoricSteelShield ->
            ShieldModelTag LargeMeteoricSteelShield
                (Model id "Large Meteoric Steel Shield" 4500 35000 "MetalShield" status idStatus <| Mass.new 7560 4200)
                (ArmourModel 21)
