module Shops
    exposing
        ( Msg
        , Shops
        , Store
        , StoreType(..)
        , buy
        , init
        , replenish
        , sell
        , shop
        , tick
        , updateShop
        , wares
        )

import EveryDict as Dict exposing (EveryDict)
import Item
import Item.Data exposing (..)
import Item.Purse as Purse
import Random.Pcg as Random exposing (Generator, Seed, initialSeed, list, step)
import Task exposing (perform)
import Time exposing (now)
import Utils.Misc


type Msg
    = Ok
    | PopulateShop Random.Seed


type alias Shops =
    { stores : Stores
    , replenishCounter : Int
    }


type StoreType
    = WeaponSmith
    | GeneralStore
    | PotionStore
    | JunkShop


type alias Stores =
    EveryDict StoreType (List (Item BasicItem))


type Store
    = B (List (Item BasicItem)) StoreType


{-| Time taken for the shop to change it's wares
-}
replenishCounter : Int
replenishCounter =
    200


tick : Shops -> Seed -> ( Shops, Seed )
tick ({ replenishCounter } as shops) seed =
    case replenishCounter of
        0 ->
            init seed

        _ ->
            ( { shops | replenishCounter = replenishCounter - 1 }, seed )


shop : StoreType -> Shops -> Store
shop shopType shops =
    B (list shopType shops.stores) shopType


init : Seed -> ( Shops, Seed )
init seed =
    let
        emptyStores =
            Dict.fromList []

        ( stores, seed_ ) =
            List.foldl replenishReducer
                ( emptyStores, seed )
                [ WeaponSmith, GeneralStore, PotionStore, JunkShop ]
    in
    ( { stores = stores, replenishCounter = replenishCounter }
    , seed_
    )


{-| The shop sells to the customer.
-}
sell : Item compatible -> Purse compatible -> Store -> Result String ( Store, Purse compatible )
sell item purse (B items shopType) =
    let
        price =
            Debug.log "Item purchase price:" (Item.priceOf item)

        itemsWithout item =
            Utils.Misc.removeFirst item Item.equals items
    in
    case Purse.remove price purse of
        Result.Ok purseMinusPriceOfItem ->
            Result.Ok ( B (itemsWithout item) shopType, purseMinusPriceOfItem )

        Result.Err msg ->
            Result.Err "Cannot afford item!"


{-| The shop buys from the customer.
-}
buy : Item compatible -> Purse compatible -> Store -> ( Store, Purse compatible )
buy item purse (B items shopType) =
    let
        cost =
            Debug.log "Item sell price:" (Item.costOf item)
    in
    ( B (item :: items) shopType, Purse.add cost purse )


replenishReducer : StoreType -> ( Stores, Seed ) -> ( Stores, Seed )
replenishReducer shopType ( currentStores, seed ) =
    let
        ( newItems, seed_ ) =
            replenish (inventoryStock shopType) seed

        newStores =
            Dict.insert shopType newItems currentStores
    in
    ( newStores, seed_ )


replenish : ItemTypes -> Seed -> ( List (Item compatible), Seed )
replenish itemTypes seed =
    let
        defaultProduct =
            Maybe.withDefault (ItemTypeWeapon BroadSword)

        ( generatedItemTypes, seed_ ) =
            Random.sample itemTypes
                |> Random.map defaultProduct
                |> Random.list 10
                |> (\x -> Random.step x seed)

        products =
            List.map Item.new generatedItemTypes
    in
    ( products, seed_ )


getSeed : Cmd Msg
getSeed =
    Task.perform (\a -> PopulateShop (Time.inSeconds a |> round |> Random.initialSeed))
        Time.now


wares : Store -> List (Item compatible)
wares (B items _) =
    items


list : StoreType -> Stores -> List (Item compatible)
list shopType stores =
    stores
        |> Dict.get shopType
        |> Maybe.withDefault []


updateShop : Store -> Shops -> Shops
updateShop (B items shopType) ({ stores } as shops) =
    { shops | stores = Dict.insert shopType items stores }


type alias ProductName =
    String


inventoryStock : StoreType -> ItemTypes
inventoryStock shop =
    case shop of
        WeaponSmith ->
            weapons

        GeneralStore ->
            List.concat [ armour, belt, bracers, gauntlets, helmet, pack, shield ]

        PotionStore ->
            []

        JunkShop ->
            []


weapons : ItemTypes
weapons =
    [ Item.Data.ItemTypeWeapon Club
    , Item.Data.ItemTypeWeapon Dagger
    , Item.Data.ItemTypeWeapon Hammer
    , Item.Data.ItemTypeWeapon HandAxe
    , Item.Data.ItemTypeWeapon Quarterstaff
    , Item.Data.ItemTypeWeapon Spear
    , Item.Data.ItemTypeWeapon ShortSword
    , Item.Data.ItemTypeWeapon Mace
    , Item.Data.ItemTypeWeapon Flail
    , Item.Data.ItemTypeWeapon Axe
    , Item.Data.ItemTypeWeapon WarHammer
    , Item.Data.ItemTypeWeapon LongSword
    , Item.Data.ItemTypeWeapon BattleAxe
    , Item.Data.ItemTypeWeapon BroadSword
    , Item.Data.ItemTypeWeapon MorningStar
    , Item.Data.ItemTypeWeapon BastardSword
    , Item.Data.ItemTypeWeapon TwoHandedSword
    ]


armour : ItemTypes
armour =
    [ Item.Data.ItemTypeArmour LeatherArmour
    , Item.Data.ItemTypeArmour StuddedLeatherArmour
    , Item.Data.ItemTypeArmour RingMail
    , Item.Data.ItemTypeArmour ScaleMail
    , Item.Data.ItemTypeArmour ChainMail
    , Item.Data.ItemTypeArmour SplintMail
    , Item.Data.ItemTypeArmour PlateMail
    , Item.Data.ItemTypeArmour PlateArmour
    , Item.Data.ItemTypeArmour MeteoricSteelPlate
    , Item.Data.ItemTypeArmour ElvenChainMail
    ]


belt : ItemTypes
belt =
    [ Item.Data.ItemTypeBelt TwoSlotBelt
    , Item.Data.ItemTypeBelt ThreeSlotBelt
    , Item.Data.ItemTypeBelt FourSlotBelt
    , Item.Data.ItemTypeBelt UtilityBelt
    , Item.Data.ItemTypeBelt WandQuiverBelt
    ]


bracers : ItemTypes
bracers =
    [ Item.Data.ItemTypeBracers NormalBracers ]


gauntlets : ItemTypes
gauntlets =
    [ Item.Data.ItemTypeGauntlets NormalGauntlets ]


helmet : ItemTypes
helmet =
    [ Item.Data.ItemTypeHelmet LeatherHelmet
    , Item.Data.ItemTypeHelmet IronHelmet
    , Item.Data.ItemTypeHelmet SteelHelmet
    , Item.Data.ItemTypeHelmet MeteoricSteelHelmet
    , Item.Data.ItemTypeHelmet HelmetOfDetectMonsters
    ]


pack : ItemTypes
pack =
    [ Item.Data.ItemTypePack SmallBag
    , Item.Data.ItemTypePack MediumBag
    , Item.Data.ItemTypePack LargeBag
    , Item.Data.ItemTypePack SmallPack
    , Item.Data.ItemTypePack MediumPack
    , Item.Data.ItemTypePack LargePack
    , Item.Data.ItemTypePack SmallChest
    , Item.Data.ItemTypePack MediumChest
    , Item.Data.ItemTypePack LargeChest
    , Item.Data.ItemTypePack EnchantedSmallPackOfHolding
    , Item.Data.ItemTypePack EnchantedMediumPackOfHolding
    , Item.Data.ItemTypePack EnchantedLargePackOfHolding
    ]


shield : ItemTypes
shield =
    [ Item.Data.ItemTypeShield SmallWoodenShield
    , Item.Data.ItemTypeShield MediumWoodenShield
    , Item.Data.ItemTypeShield LargeWoodenShield
    , Item.Data.ItemTypeShield SmallIronShield
    , Item.Data.ItemTypeShield MediumIronShield
    , Item.Data.ItemTypeShield LargeIronShield
    , Item.Data.ItemTypeShield SmallSteelShield
    , Item.Data.ItemTypeShield MediumSteelShield
    , Item.Data.ItemTypeShield LargeSteelShield
    , Item.Data.ItemTypeShield SmallMeteoricSteelShield
    , Item.Data.ItemTypeShield MediumMeteoricSteelShield
    , Item.Data.ItemTypeShield LargeMeteoricSteelShield
    ]
