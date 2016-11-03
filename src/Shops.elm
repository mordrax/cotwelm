module Shops
    exposing
        ( Shops
        , Shop
        , ShopType(..)
        , Msg
        , init
        , buy
        , sell
        , shop
        , wares
        , replenish
        )

-- items

import Item.Purse as Purse exposing (Purse)
import Item.Item as Item
import Item.TypeDef exposing (..)
import Item.Factory as ItemFactory exposing (ItemFactory)


-- utils

import Utils.IdGenerator as IdGenerator exposing (..)


-- 3rd party

import Random.Pcg as Random exposing (step, initialSeed, list, Seed)
import Time exposing (now)
import Task exposing (perform)
import EveryDict as Dict exposing (EveryDict)


type alias ItemTypes =
    List Item.ItemType


type alias Items =
    List Item.Item


type Msg
    = Ok
    | PopulateShop Random.Seed


type Shops
    = A Model


type ShopType
    = WeaponSmith
    | GeneralStore
    | PotionStore
    | JunkShop


type alias ShopsDict =
    EveryDict ShopType Items


type alias Model =
    { stores : ShopsDict
    }


type Shop
    = B Items ShopType


shop : ShopType -> Shops -> Shop
shop shopType (A model) =
    B (list shopType model.stores) shopType


init : Seed -> ItemFactory -> ( Shops, ItemFactory, Seed )
init seed itemFactory =
    let
        emptyStores =
            Dict.fromList []

        ( stores, itemFactory_, seed_ ) =
            List.foldl replenishReducer
                ( emptyStores, itemFactory, seed )
                [ WeaponSmith, GeneralStore, PotionStore, JunkShop ]
    in
        ( A { stores = stores }
        , itemFactory_
        , seed_
        )


{-| The shop sells to the customer.
-}
sell : Item.Item -> Purse -> Shop -> Result String ( Shop, Purse )
sell item purse (B items shopType) =
    let
        price =
            Item.priceOf item

        itemsWithout item =
            List.filter (\x -> (not (Item.equals item x))) items

        _ =
            Debug.log "Item purchase price:" price
    in
        case Purse.remove price purse of
            Result.Ok purse' ->
                Result.Ok ( B (itemsWithout item) shopType, purse' )

            Result.Err msg ->
                Result.Err "Cannot afford item!"


{-| The shop buys from the customer.
-}
buy : Item.Item -> Purse -> Shop -> ( Shop, Purse )
buy item purse (B items shopType) =
    let
        _ =
            Debug.log "Item sell price:" cost

        cost =
            Item.costOf item
    in
        ( B (item :: items) shopType, Purse.add cost purse )


replenishReducer : ShopType -> ( EveryDict ShopType Items, ItemFactory, Seed ) -> ( EveryDict ShopType Items, ItemFactory, Seed )
replenishReducer shopType ( currentStores, itemFactory, seed ) =
    let
        ( newItems, itemFactory_, seed_ ) =
            replenish (inventoryStock shopType) itemFactory seed

        newStores =
            Dict.insert shopType newItems currentStores
    in
        ( newStores, itemFactory_, seed_ )


replenish : ItemTypes -> ItemFactory -> Seed -> ( Items, ItemFactory, Seed )
replenish itemTypes itemFactory seed =
    let
        defaultProduct =
            Maybe.withDefault (Item.Weapon BroadSword)

        ( generatedItemTypes, seed_ ) =
            Random.sample itemTypes
                |> (Random.map defaultProduct)
                |> Random.list 10
                |> \x -> Random.step x seed

        ( products, newItemFactory ) =
            List.foldl ItemFactory.makeReducer ( [], itemFactory ) generatedItemTypes
    in
        ( products, newItemFactory, seed_ )


getSeed : Cmd Msg
getSeed =
    perform (\x -> Ok)
        (\a -> (PopulateShop (Time.inSeconds a |> round |> Random.initialSeed)))
        Time.now


wares : Shop -> Items
wares (B items _) =
    items


list : ShopType -> ShopsDict -> Items
list shopType stores =
    stores
        |> Dict.get shopType
        |> Maybe.withDefault []


type alias ProductName =
    String


inventoryStock : ShopType -> ItemTypes
inventoryStock shop =
    case shop of
        WeaponSmith ->
            [ Item.Weapon Club
            , Item.Weapon Dagger
            , Item.Weapon Hammer
            , Item.Weapon HandAxe
            , Item.Weapon Quarterstaff
            , Item.Weapon Spear
            , Item.Weapon ShortSword
            , Item.Weapon Mace
            , Item.Weapon Flail
            , Item.Weapon Axe
            , Item.Weapon WarHammer
            , Item.Weapon LongSword
            , Item.Weapon BattleAxe
            , Item.Weapon BroadSword
            , Item.Weapon MorningStar
            , Item.Weapon BastardSword
            , Item.Weapon TwoHandedSword
            ]

        GeneralStore ->
            List.concat [ armour, belt, bracers, gauntlets, helmet, pack, shield ]

        PotionStore ->
            []

        JunkShop ->
            []


armour : ItemTypes
armour =
    [ Item.Armour RustyArmour
    , Item.Armour LeatherArmour
    , Item.Armour StuddedLeatherArmour
    , Item.Armour RingMail
    , Item.Armour ScaleMail
    , Item.Armour ChainMail
    , Item.Armour SplintMail
    , Item.Armour PlateMail
    , Item.Armour PlateArmour
    , Item.Armour MeteoricSteelPlate
    , Item.Armour ElvenChainMail
    ]


belt : ItemTypes
belt =
    [ Item.Belt TwoSlotBelt
    , Item.Belt ThreeSlotBelt
    , Item.Belt FourSlotBelt
    , Item.Belt UtilityBelt
    , Item.Belt WandQuiverBelt
    ]


bracers : ItemTypes
bracers =
    [ Item.Bracers NormalBracers ]


gauntlets : ItemTypes
gauntlets =
    [ Item.Gauntlets NormalGauntlets ]


helmet : ItemTypes
helmet =
    [ Item.Helmet BrokenHelmet
    , Item.Helmet LeatherHelmet
    , Item.Helmet IronHelmet
    , Item.Helmet SteelHelmet
    , Item.Helmet MeteoricSteelHelmet
    , Item.Helmet HelmetOfDetectMonsters
    ]


pack : ItemTypes
pack =
    [ Item.Pack SmallBag
    , Item.Pack MediumBag
    , Item.Pack LargeBag
    , Item.Pack SmallPack
    , Item.Pack MediumPack
    , Item.Pack LargePack
    , Item.Pack SmallChest
    , Item.Pack MediumChest
    , Item.Pack LargeChest
    , Item.Pack EnchantedSmallPackOfHolding
    , Item.Pack EnchantedMediumPackOfHolding
    , Item.Pack EnchantedLargePackOfHolding
    ]


shield : ItemTypes
shield =
    [ Item.Shield BrokenShield
    , Item.Shield SmallWoodenShield
    , Item.Shield MediumWoodenShield
    , Item.Shield LargeWoodenShield
    , Item.Shield SmallIronShield
    , Item.Shield MediumIronShield
    , Item.Shield LargeIronShield
    , Item.Shield SmallSteelShield
    , Item.Shield MediumSteelShield
    , Item.Shield LargeSteelShield
    , Item.Shield SmallMeteoricSteelShield
    , Item.Shield MediumMeteoricSteelShield
    , Item.Shield LargeMeteoricSteelShield
    ]
