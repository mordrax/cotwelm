module Item.Pack exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)
import Container exposing (..)


type Pack a
    = PM PackType Model (PackModel a)


newPack : PackType -> ID -> ItemStatus -> IdentificationStatus -> (Mass -> Container a) -> Pack a
newPack packType id status idStatus newContainer =
    case packType of
        SmallBag ->
            PM SmallBag
                (Model id "Small Bag" 300 500 "Bag" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 5000 6000))

        MediumBag ->
            PM MediumBag
                (Model id "Medium Bag" 500 700 "Bag" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 10000 12000))

        LargeBag ->
            PM LargeBag
                (Model id "Large Bag" 900 900 "Bag" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 15000 18000))

        SmallPack ->
            PM SmallPack
                (Model id "Small Pack" 1000 1000 "Pack" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 12000 50000))

        MediumPack ->
            PM MediumPack
                (Model id "Medium Pack" 2000 1500 "Pack" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 22000 75000))

        LargePack ->
            PM LargePack
                (Model id "Large Pack" 4000 100000 "Pack" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 35000 100000))

        SmallChest ->
            PM SmallChest
                (Model id "Small Chest" 5000 100000 "Chest" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 100000 50000))

        MediumChest ->
            PM MediumChest
                (Model id "Medium Chest" 15000 150000 "Chest" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 100000 150000))

        LargeChest ->
            PM LargeChest
                (Model id "Large Chest" 25000 250000 "Chest" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 100000 250000))

        EnchantedSmallPackOfHolding ->
            PM EnchantedSmallPackOfHolding
                (Model id "Enchanted Small Pack Of Holding" 5000 75000 "EnchantedPack" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 50000 150000))

        EnchantedMediumPackOfHolding ->
            PM EnchantedMediumPackOfHolding
                (Model id "Enchanted Medium Pack Of Holding" 7500 100000 "EnchantedPack" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 75000 200000))

        EnchantedLargePackOfHolding ->
            PM EnchantedLargePackOfHolding
                (Model id "Enchanted Large Pack Of Holding" 10000 125000 "EnchantedPack" status idStatus <| Mass.new 0 0)
                (PackModel <| newContainer (Mass.new 100000 250000))
