module Game.Loot exposing (..)

import Item
import Item.Data exposing (BasicItem, Item)
import Random.Pcg as Random exposing (Generator)


type alias Loot =
    List (Item BasicItem)


generate : Generator Loot
generate =
    Random.map2 (++) generateCoins generateCoins


generateCoins : Generator Loot
generateCoins =
    Random.int 1 100
        |> Random.map (\coppers -> [ Item.new (Item.Data.ItemTypeCopper coppers) ])
