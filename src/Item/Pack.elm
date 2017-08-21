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


add : a -> Pack a -> Result String (Pack a)
add item ( base, pack ) =
    Container.add item pack.container
        |> Result.andThen (\container -> Result.Ok ( base, { pack | container = container } ))


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
            make "Small Bag" (ItemValue 12) "bag" (Mass.Mass 0 0) (Capacity 120 100)

        MediumBag ->
            make "Medium Bag" (ItemValue 20) "bag" (Mass.Mass 0 0) (Capacity 240 200)

        LargeBag ->
            make "Large Bag" (ItemValue 36) "bag" (Mass.Mass 0 0) (Capacity 360 300)

        SmallPack ->
            make "Small Pack" (ItemValue 40) "pack" (Mass.Mass 0 0) (Capacity 1000 240)

        MediumPack ->
            make "Medium Pack" (ItemValue 80) "pack" (Mass.Mass 0 0) (Capacity 1500 440)

        LargePack ->
            make "Large Pack" (ItemValue 160) "pack" (Mass.Mass 0 0) (Capacity 2000 700)

        SmallChest ->
            make "Small Chest" (ItemValue 200) "chest" (Mass.Mass 0 0) (Capacity 1000 2000)

        MediumChest ->
            make "Medium Chest" (ItemValue 600) "chest" (Mass.Mass 0 0) (Capacity 3000 2000)

        LargeChest ->
            make "Large Chest" (ItemValue 1000) "chest" (Mass.Mass 0 0) (Capacity 5000 2000)

        EnchantedSmallPackOfHolding ->
            make "Enchanted Small Pack Of Holding" (ItemValue 2000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 3000 1000)

        EnchantedMediumPackOfHolding ->
            make "Enchanted Medium Pack Of Holding" (ItemValue 300) "enchanted-pack" (Mass.Mass 0 0) (Capacity 4000 1500)

        EnchantedLargePackOfHolding ->
            make "Enchanted Large Pack Of Holding" (ItemValue 4000) "enchanted-pack" (Mass.Mass 0 0) (Capacity 5000 2000)
