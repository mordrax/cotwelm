module Game.Loot exposing (..)

import Item
import Item.Data exposing (..)
import Item.Weapon
import Item.Wearable
import Random.Pcg as Random exposing (Generator)


{-| Loot is random items that can appear:

1.  After killing a monster
2.  Lying on the ground in the dungeon
3.  Within some container (which is also loot) that's lying on the ground in the dungeon

-}
type alias Loot =
    List Item


generate : Generator Item
generate =
    Random.frequency
        [ ( 1, coinLoot 30 20 )
        , ( 1, weaponLoot )
        , ( 1, armourLoot )
        ]


generateMonsterDrop : Generator Loot
generateMonsterDrop =
    Random.frequency
        [ ( 15, generate |> Random.map (\x -> [ x ]) )
        , ( 85, Random.constant [] )
        ]


{-| Make a random loot based on the level passed in, currently it's based on the dungeon level.
-}
makeRandomLoot : Int -> Generator Item
makeRandomLoot lootLevel =
    generate


{-| Given a average number of coins, generate any number between (avg - range) to (avg + range)
-}
coinLoot : Int -> Int -> Generator Item
coinLoot average range =
    let
        coinTypeGenerator =
            Random.sample [ ItemTypeCopper, ItemTypeSilver, ItemTypeGold, ItemTypePlatinum ]
                |> Random.map (Maybe.withDefault ItemTypeCopper)

        ( minCoins, maxCoins ) =
            ( max 0 (average - range), average + range )

        coinQuantityGenerator =
            Random.int minCoins maxCoins

        makeCoins coinType coinQuantity =
            Item.new (coinType coinQuantity)
    in
    Random.map2 makeCoins coinTypeGenerator coinQuantityGenerator


weaponLoot : Generator Item
weaponLoot =
    Item.Weapon.usableWeapons
        |> Random.sample
        |> Random.map (Maybe.withDefault Dagger)
        |> Random.map ItemTypeWeapon
        |> Random.map Item.new


armourLoot : Generator Item
armourLoot =
    Item.Wearable.armourTypes
        |> Random.sample
        |> Random.map (Maybe.withDefault LeatherArmour)
        |> Random.map ItemTypeArmour
        |> Random.map Item.new
