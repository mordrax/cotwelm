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
        , updateShop
        )

-- items

import Item.Purse as Purse exposing (Purse)
import Item.Item as Item exposing (..)
import Item.Data exposing (..)
import Item.Factory as ItemFactory exposing (ItemFactory)


-- utils

import Utils.IdGenerator as IdGenerator exposing (..)


-- 3rd party

import Random.Pcg as Random exposing (step, initialSeed, list, Seed)
import Time exposing (now)
import Task exposing (perform)
import EveryDict as Dict exposing (EveryDict)


type alias AnyItems =
    List Item.AnyItem


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
    EveryDict ShopType AnyItems


type alias Model =
    { stores : ShopsDict
    }


type Shop
    = B AnyItems ShopType


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
sell : AnyItem -> Purse.Purse -> Shop -> Result String ( Shop, Purse.Purse )
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
buy : AnyItem -> Purse.Purse -> Shop -> ( Shop, Purse.Purse )
buy item purse (B items shopType) =
    let
        _ =
            Debug.log "Item sell price:" cost

        cost =
            Item.costOf item
    in
        ( B (item :: items) shopType, Purse.add cost purse )


replenishReducer : ShopType -> ( EveryDict ShopType AnyItems, ItemFactory, Seed ) -> ( EveryDict ShopType AnyItems, ItemFactory, Seed )
replenishReducer shopType ( currentStores, itemFactory, seed ) =
    let
        ( newItems, itemFactory_, seed_ ) =
            replenish (inventoryStock shopType) itemFactory seed

        newStores =
            Dict.insert shopType newItems currentStores
    in
        ( newStores, itemFactory_, seed_ )


replenish : ItemTypes -> ItemFactory -> Seed -> ( AnyItems, ItemFactory, Seed )
replenish itemTypes itemFactory seed =
    let
        defaultProduct =
            Maybe.withDefault (Weapon BroadSword)

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


wares : Shop -> AnyItems
wares (B items _) =
    items


list : ShopType -> ShopsDict -> AnyItems
list shopType stores =
    stores
        |> Dict.get shopType
        |> Maybe.withDefault []


updateShop : Shop -> Shops -> Shops
updateShop (B items shopType) (A model) =
    A { model | stores = Dict.insert shopType items model.stores }


type alias ProductName =
    String


inventoryStock : ShopType -> ItemTypes
inventoryStock shop =
    case shop of
        WeaponSmith ->
            [ Item.Data.Weapon Club
            , Item.Data.Weapon Dagger
            , Item.Data.Weapon Hammer
            , Item.Data.Weapon HandAxe
            , Item.Data.Weapon Quarterstaff
            , Item.Data.Weapon Spear
            , Item.Data.Weapon ShortSword
            , Item.Data.Weapon Mace
            , Item.Data.Weapon Flail
            , Item.Data.Weapon Axe
            , Item.Data.Weapon WarHammer
            , Item.Data.Weapon LongSword
            , Item.Data.Weapon BattleAxe
            , Item.Data.Weapon BroadSword
            , Item.Data.Weapon MorningStar
            , Item.Data.Weapon BastardSword
            , Item.Data.Weapon TwoHandedSword
            ]

        GeneralStore ->
            List.concat [ armour, belt, bracers, gauntlets, helmet, pack, shield ]

        PotionStore ->
            []

        JunkShop ->
            []


armour : ItemTypes
armour =
    [ Item.Data.Armour RustyArmour
    , Item.Data.Armour LeatherArmour
    , Item.Data.Armour StuddedLeatherArmour
    , Item.Data.Armour RingMail
    , Item.Data.Armour ScaleMail
    , Item.Data.Armour ChainMail
    , Item.Data.Armour SplintMail
    , Item.Data.Armour PlateMail
    , Item.Data.Armour PlateArmour
    , Item.Data.Armour MeteoricSteelPlate
    , Item.Data.Armour ElvenChainMail
    ]


belt : ItemTypes
belt =
    [ Item.Data.Belt TwoSlotBelt
    , Item.Data.Belt ThreeSlotBelt
    , Item.Data.Belt FourSlotBelt
    , Item.Data.Belt UtilityBelt
    , Item.Data.Belt WandQuiverBelt
    ]


bracers : ItemTypes
bracers =
    [ Item.Data.Bracers NormalBracers ]


gauntlets : ItemTypes
gauntlets =
    [ Item.Data.Gauntlets NormalGauntlets ]


helmet : ItemTypes
helmet =
    [ Item.Data.Helmet BrokenHelmet
    , Item.Data.Helmet LeatherHelmet
    , Item.Data.Helmet IronHelmet
    , Item.Data.Helmet SteelHelmet
    , Item.Data.Helmet MeteoricSteelHelmet
    , Item.Data.Helmet HelmetOfDetectMonsters
    ]


pack : ItemTypes
pack =
    [ Item.Data.Pack SmallBag
    , Item.Data.Pack MediumBag
    , Item.Data.Pack LargeBag
    , Item.Data.Pack SmallPack
    , Item.Data.Pack MediumPack
    , Item.Data.Pack LargePack
    , Item.Data.Pack SmallChest
    , Item.Data.Pack MediumChest
    , Item.Data.Pack LargeChest
    , Item.Data.Pack EnchantedSmallPackOfHolding
    , Item.Data.Pack EnchantedMediumPackOfHolding
    , Item.Data.Pack EnchantedLargePackOfHolding
    ]


shield : ItemTypes
shield =
    [ Item.Data.Shield BrokenShield
    , Item.Data.Shield SmallWoodenShield
    , Item.Data.Shield MediumWoodenShield
    , Item.Data.Shield LargeWoodenShield
    , Item.Data.Shield SmallIronShield
    , Item.Data.Shield MediumIronShield
    , Item.Data.Shield LargeIronShield
    , Item.Data.Shield SmallSteelShield
    , Item.Data.Shield MediumSteelShield
    , Item.Data.Shield LargeSteelShield
    , Item.Data.Shield SmallMeteoricSteelShield
    , Item.Data.Shield MediumMeteoricSteelShield
    , Item.Data.Shield LargeMeteoricSteelShield
    ]
