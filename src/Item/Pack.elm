module Item.Pack
    exposing
        ( add
        , contents
        , info
        , init
        , remove
        )

import Container exposing (..)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (..)


info : Pack a -> ( Mass, Capacity )
info ( base, { container } ) =
    ( Container.mass container, Container.capacity container )


contents : Pack a -> List a
contents ( base, { container } ) =
    Container.list container


add : a -> Pack a -> ( Pack a, Container.Msg )
add item ( base, pack ) =
    let
        ( newContainer, msgs ) =
            Container.add item pack.container
    in
    ( ( base, { pack | container = newContainer } ), msgs )


remove : a -> Pack a -> Pack a
remove item ( base, pack ) =
    let
        newContainer =
            Container.remove item pack.container
    in
    ( base, { pack | container = newContainer } )


init :
    PackType
    -> (Capacity -> Container a)
    -> ItemStatus
    -> IdentificationStatus
    -> Pack a
init packType toContainer status idStatus =
    let
        make name itemValue css mass capacity =
            ( BaseItem name itemValue css mass status idStatus
            , { packType = packType
              , container = toContainer capacity
              }
            )
    in
    case packType of
        SmallBag ->
            make "Small Bag" (ItemValue 300) "bag" (Mass.Mass 0 0) (Capacity 6000 5000)

        MediumBag ->
            make "Medium Bag" (ItemValue 500) "bag" (Mass.Mass 0 0) (Capacity 12000 10000)

        LargeBag ->
            make "Large Bag" (ItemValue 900) "bag" (Mass.Mass 0 0) (Capacity 18000 15000)

        SmallPack ->
            make "Small Pack" (ItemValue 1000) "pack" (Mass.Mass 0 0) (Capacity 50000 12000)

        MediumPack ->
            make "Medium Pack" (ItemValue 2000) "pack" (Mass.Mass 0 0) (Capacity 75000 22000)

        LargePack ->
            make "Large Pack" (ItemValue 4000) "pack" (Mass.Mass 0 0) (Capacity 100000 35000)

        SmallChest ->
            make "Small Chest" (ItemValue 5000) "chest" (Mass.Mass 0 0) (Capacity 50000 100000)

        MediumChest ->
            make "Medium Chest" (ItemValue 15000) "chest" (Mass.Mass 0 0) (Capacity 150000 100000)

        LargeChest ->
            make "Large Chest" (ItemValue 25000) "chest" (Mass.Mass 0 0) (Capacity 250000 100000)

        EnchantedSmallPackOfHolding ->
            make "Enchanted Small Pack Of Holding" (ItemValue 5000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 150000 50000)

        EnchantedMediumPackOfHolding ->
            make "Enchanted Medium Pack Of Holding" (ItemValue 7500) "enchanted-pack" (Mass.Mass 0 0) (Capacity 200000 75000)

        EnchantedLargePackOfHolding ->
            make "Enchanted Large Pack Of Holding" (ItemValue 10000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 250000 100000)
