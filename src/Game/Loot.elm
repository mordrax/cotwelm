module Game.Loot exposing (..)

import Item
import Item.Data exposing (Item)
import Random.Pcg as Random exposing (Generator)


type alias Loot =
    List Item


generate : Generator Loot
generate =
    Random.map2 (++) generateCoins generateCoins


generateCoins : Generator Loot
generateCoins =
    let
        coinTypeGenerator =
            Random.sample [ Item.Data.ItemTypeCopper, Item.Data.ItemTypeSilver, Item.Data.ItemTypeGold, Item.Data.ItemTypePlatinum ]
                |> Random.map (Maybe.withDefault Item.Data.ItemTypeCopper)

        coinQuantityGenerator =
            Random.int 1 100

        makeCoins coinType coinQuantity =
            [ Item.new (coinType coinQuantity) ]
    in
    Random.map2 makeCoins coinTypeGenerator coinQuantityGenerator
