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
import Dict exposing (Dict)


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
    Dict ShopTypeString Items


type alias ShopTypeString =
    String


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
sell : Item -> Purse -> Shop -> Result String ( Shop, Purse )
sell item purse (B items shopType) =
    let
        price =
            Debug.log "Item purchase price:" (Item.priceOf item)

        itemsWithout item =
            List.filter (\x -> (not (Item.equals item x))) items
    in
        case Purse.remove price purse of
            Result.Ok purseMinusPriceOfItem ->
                Result.Ok ( B (itemsWithout item) shopType, purseMinusPriceOfItem )

            Result.Err msg ->
                Result.Err "Cannot afford item!"


{-| The shop buys from the customer.
-}
buy : Item -> Purse -> Shop -> ( Shop, Purse )
buy item purse (B items shopType) =
    let
        cost =
            Debug.log "Item sell price:" (Item.costOf item)
    in
        ( B (item :: items) shopType, Purse.add cost purse )


replenishReducer : ShopType -> ( Dict ShopTypeString Items, ItemFactory, Seed ) -> ( Dict ShopTypeString Items, ItemFactory, Seed )
replenishReducer shopType ( currentStores, itemFactory, seed ) =
    let
        ( newItems, itemFactory_, seed_ ) =
            replenish (inventoryStock shopType) itemFactory seed

        newStores =
            Dict.insert (toString shopType) newItems currentStores
    in
        ( newStores, itemFactory_, seed_ )


replenish : ItemTypes -> ItemFactory -> Seed -> ( Items, ItemFactory, Seed )
replenish itemTypes itemFactory seed =
    let
        defaultProduct =
            Maybe.withDefault (ItemTypeWeapon BroadSword)

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
    Task.perform
        (\a -> (PopulateShop (Time.inSeconds a |> round |> Random.initialSeed)))
        Time.now


wares : Shop -> Items
wares (B items _) =
    items


list : ShopType -> ShopsDict -> Items
list shopType stores =
    stores
        |> Dict.get (toString shopType)
        |> Maybe.withDefault []


updateShop : Shop -> Shops -> Shops
updateShop (B items shopType) (A model) =
    A { model | stores = Dict.insert (toString shopType) items model.stores }


type alias ProductName =
    String


inventoryStock : ShopType -> ItemTypes
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
    [ Item.Data.ItemTypeArmour RustyArmour
    , Item.Data.ItemTypeArmour LeatherArmour
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
    [ Item.Data.ItemTypeHelmet BrokenHelmet
    , Item.Data.ItemTypeHelmet LeatherHelmet
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
    [ Item.Data.ItemTypeShield BrokenShield
    , Item.Data.ItemTypeShield SmallWoodenShield
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
