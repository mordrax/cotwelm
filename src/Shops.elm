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

import Dict exposing (Dict)
import Item.Types exposing (..)
import Item.Factory as ItemFactory exposing (ItemFactory)
import Item.Item as Item exposing (Item)
import Item.Purse as Purse exposing (Purse)
import Random.Pcg as Random exposing (step, initialSeed, list, Seed)
import Task exposing (perform)
import Time exposing (now)
import Utils.IdGenerator as IdGenerator exposing (IdGenerator)


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
    Task.perform (\a -> (PopulateShop (Time.inSeconds a |> round |> Random.initialSeed)))
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
    [ Item.Types.ItemTypeWeapon Club
    , Item.Types.ItemTypeWeapon Dagger
    , Item.Types.ItemTypeWeapon Hammer
    , Item.Types.ItemTypeWeapon HandAxe
    , Item.Types.ItemTypeWeapon Quarterstaff
    , Item.Types.ItemTypeWeapon Spear
    , Item.Types.ItemTypeWeapon ShortSword
    , Item.Types.ItemTypeWeapon Mace
    , Item.Types.ItemTypeWeapon Flail
    , Item.Types.ItemTypeWeapon Axe
    , Item.Types.ItemTypeWeapon WarHammer
    , Item.Types.ItemTypeWeapon LongSword
    , Item.Types.ItemTypeWeapon BattleAxe
    , Item.Types.ItemTypeWeapon BroadSword
    , Item.Types.ItemTypeWeapon MorningStar
    , Item.Types.ItemTypeWeapon BastardSword
    , Item.Types.ItemTypeWeapon TwoHandedSword
    ]


armour : ItemTypes
armour =
    [ Item.Types.ItemTypeArmour RustyArmour
    , Item.Types.ItemTypeArmour LeatherArmour
    , Item.Types.ItemTypeArmour StuddedLeatherArmour
    , Item.Types.ItemTypeArmour RingMail
    , Item.Types.ItemTypeArmour ScaleMail
    , Item.Types.ItemTypeArmour ChainMail
    , Item.Types.ItemTypeArmour SplintMail
    , Item.Types.ItemTypeArmour PlateMail
    , Item.Types.ItemTypeArmour PlateArmour
    , Item.Types.ItemTypeArmour MeteoricSteelPlate
    , Item.Types.ItemTypeArmour ElvenChainMail
    ]


belt : ItemTypes
belt =
    [ Item.Types.ItemTypeBelt TwoSlotBelt
    , Item.Types.ItemTypeBelt ThreeSlotBelt
    , Item.Types.ItemTypeBelt FourSlotBelt
    , Item.Types.ItemTypeBelt UtilityBelt
    , Item.Types.ItemTypeBelt WandQuiverBelt
    ]


bracers : ItemTypes
bracers =
    [ Item.Types.ItemTypeBracers NormalBracers ]


gauntlets : ItemTypes
gauntlets =
    [ Item.Types.ItemTypeGauntlets NormalGauntlets ]


helmet : ItemTypes
helmet =
    [ Item.Types.ItemTypeHelmet BrokenHelmet
    , Item.Types.ItemTypeHelmet LeatherHelmet
    , Item.Types.ItemTypeHelmet IronHelmet
    , Item.Types.ItemTypeHelmet SteelHelmet
    , Item.Types.ItemTypeHelmet MeteoricSteelHelmet
    , Item.Types.ItemTypeHelmet HelmetOfDetectMonsters
    ]


pack : ItemTypes
pack =
    [ Item.Types.ItemTypePack SmallBag
    , Item.Types.ItemTypePack MediumBag
    , Item.Types.ItemTypePack LargeBag
    , Item.Types.ItemTypePack SmallPack
    , Item.Types.ItemTypePack MediumPack
    , Item.Types.ItemTypePack LargePack
    , Item.Types.ItemTypePack SmallChest
    , Item.Types.ItemTypePack MediumChest
    , Item.Types.ItemTypePack LargeChest
    , Item.Types.ItemTypePack EnchantedSmallPackOfHolding
    , Item.Types.ItemTypePack EnchantedMediumPackOfHolding
    , Item.Types.ItemTypePack EnchantedLargePackOfHolding
    ]


shield : ItemTypes
shield =
    [ Item.Types.ItemTypeShield BrokenShield
    , Item.Types.ItemTypeShield SmallWoodenShield
    , Item.Types.ItemTypeShield MediumWoodenShield
    , Item.Types.ItemTypeShield LargeWoodenShield
    , Item.Types.ItemTypeShield SmallIronShield
    , Item.Types.ItemTypeShield MediumIronShield
    , Item.Types.ItemTypeShield LargeIronShield
    , Item.Types.ItemTypeShield SmallSteelShield
    , Item.Types.ItemTypeShield MediumSteelShield
    , Item.Types.ItemTypeShield LargeSteelShield
    , Item.Types.ItemTypeShield SmallMeteoricSteelShield
    , Item.Types.ItemTypeShield MediumMeteoricSteelShield
    , Item.Types.ItemTypeShield LargeMeteoricSteelShield
    ]
