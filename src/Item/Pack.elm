module Item.Pack
    exposing
        ( Pack
        , init
        , blueprint
        , add
        , remove
        , mass
        , capacity
        , list
        )

import Utils.Mass as Mass exposing (..)
import Item.Data exposing (..)
import Container exposing (..)


type Pack a
    = Pack PackType (Container a)


add : a -> Pack a -> ( Pack a, Container.Msg )
add item (Pack packType container) =
    let
        ( newContainer, msgs ) =
            Container.add item container
    in
        ( Pack packType newContainer, msgs )


remove : a -> Pack a -> Pack a
remove item (Pack packType container) =
    let
        newContainer =
            Container.remove item container
    in
        Pack packType newContainer


mass : Pack a -> Mass
mass (Pack _ container) =
    Container.mass container


capacity : Pack a -> Capacity
capacity (Pack _ container) =
    Container.capacity container

list: Pack a -> List a
list (Pack _ container) = Container.list container

init : PackType -> (Capacity -> Container a) -> Pack a
init packType makeContainer =
    case packType of
        SmallBag ->
            Pack SmallBag <| makeContainer <| Capacity 5000 6000

        MediumBag ->
            Pack MediumBag <| makeContainer <| Capacity 10000 12000

        LargeBag ->
            Pack LargeBag <| makeContainer <| Capacity 15000 18000

        SmallPack ->
            Pack SmallPack <| makeContainer <| Capacity 12000 50000

        MediumPack ->
            Pack MediumPack <| makeContainer <| Capacity 22000 75000

        LargePack ->
            Pack LargePack <| makeContainer <| Capacity 35000 100000

        SmallChest ->
            Pack SmallChest <| makeContainer <| Capacity 100000 50000

        MediumChest ->
            Pack MediumChest <| makeContainer <| Capacity 100000 150000

        LargeChest ->
            Pack LargeChest <| makeContainer <| Capacity 100000 250000

        EnchantedSmallPackOfHolding ->
            Pack EnchantedSmallPackOfHolding <| makeContainer <| Capacity 50000 150000

        EnchantedMediumPackOfHolding ->
            Pack EnchantedMediumPackOfHolding <| makeContainer <| Capacity 75000 200000

        EnchantedLargePackOfHolding ->
            Pack EnchantedLargePackOfHolding <| makeContainer <| Capacity 100000 250000


blueprint : PackType -> BaseItemData
blueprint packType =
    case packType of
        SmallBag ->
            BaseItemData "Small Bag" 300 500 "Bag" 0 0

        MediumBag ->
            BaseItemData "Medium Bag" 500 700 "Bag" 0 0

        LargeBag ->
            BaseItemData "Large Bag" 900 900 "Bag" 0 0

        SmallPack ->
            BaseItemData "Small Pack" 1000 1000 "Pack" 0 0

        MediumPack ->
            BaseItemData "Medium Pack" 2000 1500 "Pack" 0 0

        LargePack ->
            BaseItemData "Large Pack" 4000 100000 "Pack" 0 0

        SmallChest ->
            BaseItemData "Small Chest" 5000 100000 "Chest" 0 0

        MediumChest ->
            BaseItemData "Medium Chest" 15000 150000 "Chest" 0 0

        LargeChest ->
            BaseItemData "Large Chest" 25000 250000 "Chest" 0 0

        EnchantedSmallPackOfHolding ->
            BaseItemData "Enchanted Small Pack Of Holding" 5000 75000 "EnchantedPack" 0 0

        EnchantedMediumPackOfHolding ->
            BaseItemData "Enchanted Medium Pack Of Holding" 7500 100000 "EnchantedPack" 0 0

        EnchantedLargePackOfHolding ->
            BaseItemData "Enchanted Large Pack Of Holding" 10000 125000 "EnchantedPack" 0 0
