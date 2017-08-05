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
import Item.Data exposing (Item, ItemTypes, Purse)
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
    EveryDict StoreType (List Item)


type Store
    = Store (List Item) StoreType


config : { replenishCounter : Int, stock : Int }
config =
    { -- Time taken for the shop to change it's wares
      replenishCounter = 200

    -- number of items in the shop
    , stock = 10
    }


tick : Shops -> Generator Shops
tick ({ replenishCounter } as shops) =
    case replenishCounter of
        0 ->
            init

        _ ->
            Random.constant { shops | replenishCounter = replenishCounter - 1 }


shop : StoreType -> Shops -> Store
shop shopType shops =
    Store (list shopType shops.stores) shopType


init : Generator Shops
init =
    let
        emptyStores =
            Random.constant (Dict.fromList [])

        storesGen =
            List.foldl replenishReducer emptyStores [ WeaponSmith, GeneralStore, PotionStore, JunkShop ]
    in
    storesGen
        |> Random.map
            (\stores ->
                { stores = stores
                , replenishCounter = config.replenishCounter
                }
            )


{-| The shop sells to the customer.
-}
sell : Item -> Purse -> Store -> Result String ( Store, Purse )
sell item purse (Store items shopType) =
    let
        price =
            Debug.log "Shop sell price:" (Item.markupValue item)

        itemsWithout item =
            Utils.Misc.removeFirst item Item.equals items
    in
    case Purse.remove price purse of
        Result.Ok purseMinusPriceOfItem ->
            Result.Ok ( Store (itemsWithout item) shopType, purseMinusPriceOfItem )

        Result.Err msg ->
            Result.Err "Cannot afford item!"


{-| The shop buys from the customer.
-}
buy : Item -> Purse -> Store -> ( Store, Purse )
buy item purse (Store items shopType) =
    let
        cost =
            Debug.log "Shop buy price:" (Item.baseValue item)
    in
    ( Store (item :: items) shopType, Purse.add cost purse )


replenishReducer : StoreType -> Generator Stores -> Generator Stores
replenishReducer shopType currentStoresGen =
    let
        newItemsGen : Generator (List Item)
        newItemsGen =
            replenish (inventoryStock shopType)

        addToStores : List Item -> Stores -> Stores
        addToStores items stores =
            Dict.insert shopType items stores
    in
    Random.map2 addToStores newItemsGen currentStoresGen


replenish : ItemTypes -> Generator (List Item)
replenish itemTypes =
    let
        defaultProduct =
            Item.Data.ItemTypeWeapon Item.Data.BroadSword
    in
    Random.sample itemTypes
        |> Random.map (Maybe.withDefault defaultProduct)
        |> Random.list config.stock
        |> Random.map (List.map Item.new)


getSeed : Cmd Msg
getSeed =
    Task.perform (\a -> PopulateShop (Time.inSeconds a |> round |> Random.initialSeed))
        Time.now


wares : Store -> List Item
wares (Store items _) =
    items


list : StoreType -> Stores -> List Item
list shopType stores =
    stores
        |> Dict.get shopType
        |> Maybe.withDefault []


updateShop : Store -> Shops -> Shops
updateShop (Store items shopType) ({ stores } as shops) =
    { shops | stores = Dict.insert shopType items stores }


type alias ProductName =
    String


inventoryStock : StoreType -> ItemTypes
inventoryStock shop =
    case shop of
        WeaponSmith ->
            Item.Data.allWeapons

        GeneralStore ->
            List.concat
                [ Item.Data.allArmours
                , Item.Data.allBelts
                , Item.Data.allBracers
                , Item.Data.allGauntlets
                , Item.Data.allHelmets
                , Item.Data.allPacks
                , Item.Data.allShields
                ]

        PotionStore ->
            []

        JunkShop ->
            []
