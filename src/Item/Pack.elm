module Item.Pack
    exposing
        ( add
        , contents
        , info
        , init
        , remove
        )

import Container exposing (..)
import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (..)


info : Pack a -> ( Mass, Capacity )
info { container } =
    case container of
        PackOfItems contents ->
            ( Container.mass contents, Container.capacity contents )


contents : Pack compatible -> List BasicItem
contents { container } =
    case container of
        PackOfItems contents ->
            Container.list contents


add : BasicItem -> Pack compatible -> ( Pack compatible, Container.Msg )
add item ({ container } as pack) =
    let
        packContainer =
            case container of
                PackOfItems contents ->
                    contents

        ( newContainer, msgs ) =
            Container.add item packContainer
    in
    ( { pack | container = PackOfItems newContainer }, msgs )


remove : BasicItem -> Pack compatible -> Pack compatible
remove item ({ container } as pack) =
    let
        packContainer =
            case container of
                PackOfItems contents ->
                    contents

        newContainer =
            Container.remove item packContainer
    in
    { pack | container = PackOfItems newContainer }


init :
    PackType
    -> (Capacity -> Container BasicItem)
    -> ItemStatus
    -> IdentificationStatus
    -> Pack BasicItem
init packType toContainer status idStatus =
    EveryDict.get packType data
        |> Maybe.withDefault smallBag
        |> setPackData packType toContainer


setPackData : PackType -> (Capacity -> Container BasicItem) -> PackData -> Pack BasicItem
setPackData packType toContainer (PackData capacity baseItem) =
    initBasicItem baseItem BIT_Pack
        |> setPackType packType
        |> setContainer (PackOfItems (toContainer capacity))


type PackData
    = PackData Capacity BaseItem


smallBag : PackData
smallBag =
    PackData (Capacity 6000 5000) (BaseItem "Small Bag" (Prices 300 500) "bag" (Mass 0 0) Normal Identified)


data : EveryDict PackType PackData
data =
    EveryDict.fromList
        [ ( SmallBag, PackData (Capacity 6000 5000) (BaseItem "Small Bag" (Prices 300 500) "bag" (Mass 0 0) Normal Identified) )
        , ( MediumBag, PackData (Capacity 12000 10000) (BaseItem "Medium Bag" (Prices 500 700) "bag" (Mass 0 0) Normal Identified) )
        , ( LargeBag, PackData (Capacity 18000 15000) (BaseItem "Large Bag" (Prices 900 900) "bag" (Mass 0 0) Normal Identified) )
        , ( SmallPack, PackData (Capacity 50000 12000) (BaseItem "Small Pack" (Prices 1000 1000) "pack" (Mass 0 0) Normal Identified) )
        , ( MediumPack, PackData (Capacity 75000 22000) (BaseItem "Medium Pack" (Prices 2000 1500) "pack" (Mass 0 0) Normal Identified) )
        , ( LargePack, PackData (Capacity 100000 35000) (BaseItem "Large Pack" (Prices 4000 100000) "pack" (Mass 0 0) Normal Identified) )
        , ( SmallChest, PackData (Capacity 50000 100000) (BaseItem "Small Chest" (Prices 5000 100000) "chest" (Mass 0 0) Normal Identified) )
        , ( MediumChest, PackData (Capacity 150000 100000) (BaseItem "Medium Chest" (Prices 15000 150000) "chest" (Mass 0 0) Normal Identified) )
        , ( LargeChest, PackData (Capacity 250000 100000) (BaseItem "Large Chest" (Prices 25000 250000) "chest" (Mass 0 0) Normal Identified) )
        , ( EnchantedSmallPackOfHolding, PackData (Capacity 150000 50000) (BaseItem "Enchanted Small Pack Of Holding" (Prices 5000 75000) "enchanted-pack" (Mass 0 0) Normal Identified) )
        , ( EnchantedMediumPackOfHolding, PackData (Capacity 200000 75000) (BaseItem "Enchanted Medium Pack Of Holding" (Prices 7500 100000) "enchanted-pack" (Mass 0 0) Normal Identified) )
        , ( EnchantedLargePackOfHolding, PackData (Capacity 250000 100000) (BaseItem "Enchanted Large Pack Of Holding" (Prices 10000 125000) "enchanted-pack" (Mass 0 0) Normal Identified) )
        ]
