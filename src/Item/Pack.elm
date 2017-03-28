module Item.Pack
    exposing
        ( Pack
        , init
        , add
        , remove
        , contents
        , info
        )

import Utils.Mass as Mass exposing (..)
import Item.Data exposing (..)
import Container exposing (..)


type alias Pack a =
    { base : BaseItem
    , packType : PackType
    , container : Container a
    }


info : Pack a -> ( Mass, Capacity )
info { container } =
    ( Container.mass container, Container.capacity container )


contents : Pack a -> List a
contents { container } =
    Container.list container


add : a -> Pack a -> ( Pack a, Container.Msg )
add item pack =
    let
        ( newContainer, msgs ) =
            Container.add item pack.container
    in
        ( { pack | container = newContainer }, msgs )


remove : a -> Pack a -> Pack a
remove item pack =
    let
        newContainer =
            Container.remove item pack.container
    in
        { pack | container = newContainer }


init :
    PackType
    -> (Capacity -> Container a)
    -> ItemStatus
    -> IdentificationStatus
    -> Pack a
init packType toContainer status idStatus =
    let
        make name price css mass capacity =
            { base = BaseItem name price css mass status idStatus
            , packType = packType
            , container = toContainer capacity
            }
    in
        case packType of
            SmallBag ->
                make "Small Bag" (Prices 300 500) "bag" (Mass.Mass 0 0) (Capacity 5000 6000)

            MediumBag ->
                make "Medium Bag" (Prices 500 700) "bag" (Mass.Mass 0 0) (Capacity 10000 12000)

            LargeBag ->
                make "Large Bag" (Prices 900 900) "bag" (Mass.Mass 0 0) (Capacity 15000 18000)

            SmallPack ->
                make "Small Pack" (Prices 1000 1000) "pack" (Mass.Mass 0 0) (Capacity 12000 50000)

            MediumPack ->
                make "Medium Pack" (Prices 2000 1500) "pack" (Mass.Mass 0 0) (Capacity 22000 75000)

            LargePack ->
                make "Large Pack" (Prices 4000 100000) "pack" (Mass.Mass 0 0) (Capacity 35000 100000)

            SmallChest ->
                make "Small Chest" (Prices 5000 100000) "chest" (Mass.Mass 0 0) (Capacity 100000 50000)

            MediumChest ->
                make "Medium Chest" (Prices 15000 150000) "chest" (Mass.Mass 0 0) (Capacity 100000 150000)

            LargeChest ->
                make "Large Chest" (Prices 25000 250000) "chest" (Mass.Mass 0 0) (Capacity 100000 250000)

            EnchantedSmallPackOfHolding ->
                make "Enchanted Small Pack Of Holding" (Prices 5000 75000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 50000 150000)

            EnchantedMediumPackOfHolding ->
                make "Enchanted Medium Pack Of Holding" (Prices 7500 100000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 75000 200000)

            EnchantedLargePackOfHolding ->
                make "Enchanted Large Pack Of Holding" (Prices 10000 125000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 100000 250000)
