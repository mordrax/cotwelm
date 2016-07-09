module Shop.Shop
    exposing
        ( Shop
        , Msg
        , new
        , setCurrentShopType
        , replenish
        , list
        , update
        , give
        , sell
        , buy
        )

-- items

import Item.Purse as Purse exposing (..)
import Item.Item as Item exposing (..)
import Item.TypeDef exposing (..)
import GameData.Building exposing (..)


-- utils

import Utils.IdGenerator as IdGenerator exposing (..)


-- 3rd party

import Random.Extra exposing (sample)
import Random exposing (step, initialSeed, list, Seed)
import Time exposing (now)
import Task exposing (perform)


type Msg
    = Ok
    | PopulateShop Random.Seed


type Shop
    = SM Model


type alias Model =
    { currentShop : ShopType
    , weaponSmith : List Item
    , generalStore : List Item
    , potionStore : List Item
    , junkShop : List Item
    }


new : ( Shop, Cmd Msg )
new =
    ( SM (Model WeaponSmith [] [] [] []), getSeed )


setCurrentShopType : ShopType -> Shop -> Shop
setCurrentShopType shopType (SM model) =
    SM { model | currentShop = shopType }


give : Item -> Shop -> Shop
give item (SM model) =
    SM (addTo item model)


sell : Item -> Purse.Purse -> Shop -> Result String ( Shop, Purse.Purse )
sell item purse (SM model) =
    let
        price =
            Item.priceOf item

        _ =
            Debug.log "Item purchase price:" price
    in
        case Purse.remove price purse of
            Result.Ok purse' ->
                Result.Ok ( SM (removeFrom item model), purse' )

            Result.Err msg ->
                Result.Err "Cannot afford item!"


buy : Item -> Purse.Purse -> Shop -> ( Shop, Purse.Purse )
buy item purse (SM model) =
    let
        _ =
            Debug.log "Item sell price:" cost

        cost =
            Item.costOf item
    in
        ( SM (addTo item model), Purse.add cost purse )


addTo : Item -> Model -> Model
addTo item model =
    case model.currentShop of
        WeaponSmith ->
            { model | weaponSmith = item :: model.weaponSmith }

        GeneralStore ->
            { model | generalStore = item :: model.generalStore }

        PotionStore ->
            { model | potionStore = item :: model.potionStore }

        JunkShop ->
            { model | junkShop = item :: model.junkShop }


removeFrom : Item -> Model -> Model
removeFrom item model =
    let
        equals =
            Item.equals

        removeFromShop =
            \shop ->
                List.filter (\x -> (not (equals item x))) shop
    in
        case model.currentShop of
            WeaponSmith ->
                { model | weaponSmith = removeFromShop model.weaponSmith }

            GeneralStore ->
                { model | generalStore = removeFromShop model.generalStore }

            PotionStore ->
                { model | potionStore = removeFromShop model.potionStore }

            JunkShop ->
                { model | junkShop = removeFromShop model.junkShop }


replenish : List ItemFactory -> IdGenerator -> Seed -> ( IdGenerator, List Item )
replenish itemFactories idGenerator seed =
    let
        defaultProduct : Maybe (ID -> Item) -> (ID -> Item)
        defaultProduct =
            \maybe ->
                Maybe.withDefault (Item.new (Item.Weapon BrokenSword)) maybe

        itemGenerator =
            sample itemFactories |> (Random.map defaultProduct)

        itemsGenerator =
            \n -> Random.list n itemGenerator

        ( foldableProducts, _ ) =
            Random.step (itemsGenerator 10) seed

        ( products, idGenerator' ) =
            List.foldl IdGenerator.assignId ( [], idGenerator ) foldableProducts
    in
        ( idGenerator', products )


getSeed : Cmd Msg
getSeed =
    perform (\x -> Ok) (\a -> (PopulateShop (Time.inSeconds a |> round |> Random.initialSeed))) Time.now


update : Msg -> IdGenerator -> Shop -> ( Shop, IdGenerator )
update msg generator (SM model) =
    case msg of
        PopulateShop seed ->
            let
                ( generatorWeaponSmith, weaponSmithProducts ) =
                    replenish weaponSmith generator seed

                ( generatorGeneralStore, generalStoreProducts ) =
                    replenish generalStore generatorWeaponSmith seed

                ( generatorPotionStore, potionStoreProducts ) =
                    replenish potionStore generatorGeneralStore seed

                ( generatorJunkShop, junkShopProducts ) =
                    replenish junkShop generatorPotionStore seed
            in
                ( SM
                    { model
                        | weaponSmith = weaponSmithProducts
                        , generalStore = generalStoreProducts
                        , potionStore = potionStoreProducts
                        , junkShop = junkShopProducts
                    }
                , generatorJunkShop
                )

        _ ->
            let
                _ =
                    Debug.log "Shop.update, unexpected msg" msg
            in
                ( (SM model), generator )


list : Shop -> List Item
list (SM model) =
    case model.currentShop of
        WeaponSmith ->
            model.weaponSmith

        GeneralStore ->
            model.generalStore

        PotionStore ->
            model.potionStore

        JunkShop ->
            model.junkShop


type alias ProductName =
    String


type alias ItemFactory =
    ID -> Item


weaponSmith : List ItemFactory
weaponSmith =
    [ Item.new (Item.Weapon Club)
    , Item.new (Item.Weapon Dagger)
    , Item.new (Item.Weapon Hammer)
    , Item.new (Item.Weapon HandAxe)
    , Item.new (Item.Weapon Quarterstaff)
    , Item.new (Item.Weapon Spear)
    , Item.new (Item.Weapon ShortSword)
    , Item.new (Item.Weapon Mace)
    , Item.new (Item.Weapon Flail)
    , Item.new (Item.Weapon Axe)
    , Item.new (Item.Weapon WarHammer)
    , Item.new (Item.Weapon LongSword)
    , Item.new (Item.Weapon BattleAxe)
    , Item.new (Item.Weapon BroadSword)
    , Item.new (Item.Weapon MorningStar)
    , Item.new (Item.Weapon BastardSword)
    , Item.new (Item.Weapon TwoHandedSword)
    ]


generalStore : List ItemFactory
generalStore =
    List.concat [ armour, gauntlets, bracers, shield, helmet, pack, belt ]


potionStore : List ItemFactory
potionStore =
    []


junkShop : List ItemFactory
junkShop =
    []


armour : List ItemFactory
armour =
    [ Item.new (Item.Armour RustyArmour)
    , Item.new (Item.Armour LeatherArmour)
    , Item.new (Item.Armour StuddedLeatherArmour)
    , Item.new (Item.Armour RingMail)
    , Item.new (Item.Armour ScaleMail)
    , Item.new (Item.Armour ChainMail)
    , Item.new (Item.Armour SplintMail)
    , Item.new (Item.Armour PlateMail)
    , Item.new (Item.Armour PlateArmour)
    , Item.new (Item.Armour MeteoricSteelPlate)
    , Item.new (Item.Armour ElvenChainMail)
    ]


belt : List ItemFactory
belt =
    [ Item.new (Item.Belt TwoSlotBelt)
    , Item.new (Item.Belt ThreeSlotBelt)
    , Item.new (Item.Belt FourSlotBelt)
    , Item.new (Item.Belt UtilityBelt)
    , Item.new (Item.Belt WandQuiverBelt)
    ]


bracers : List ItemFactory
bracers =
    [ Item.new (Item.Bracers NormalBracers) ]


gauntlets : List ItemFactory
gauntlets =
    [ Item.new (Item.Gauntlets NormalGauntlets) ]


helmet : List ItemFactory
helmet =
    [ Item.new (Item.Helmet BrokenHelmet)
    , Item.new (Item.Helmet LeatherHelmet)
    , Item.new (Item.Helmet IronHelmet)
    , Item.new (Item.Helmet SteelHelmet)
    , Item.new (Item.Helmet MeteoricSteelHelmet)
    , Item.new (Item.Helmet HelmetOfDetectMonsters)
    ]


pack : List ItemFactory
pack =
    [ Item.new (Item.Pack SmallBag)
    , Item.new (Item.Pack MediumBag)
    , Item.new (Item.Pack LargeBag)
    , Item.new (Item.Pack SmallPack)
    , Item.new (Item.Pack MediumPack)
    , Item.new (Item.Pack LargePack)
    , Item.new (Item.Pack SmallChest)
    , Item.new (Item.Pack MediumChest)
    , Item.new (Item.Pack LargeChest)
    , Item.new (Item.Pack EnchantedSmallPackOfHolding)
    , Item.new (Item.Pack EnchantedMediumPackOfHolding)
    , Item.new (Item.Pack EnchantedLargePackOfHolding)
    ]


shield : List ItemFactory
shield =
    [ Item.new (Item.Shield BrokenShield)
    , Item.new (Item.Shield SmallWoodenShield)
    , Item.new (Item.Shield MediumWoodenShield)
    , Item.new (Item.Shield LargeWoodenShield)
    , Item.new (Item.Shield SmallIronShield)
    , Item.new (Item.Shield MediumIronShield)
    , Item.new (Item.Shield LargeIronShield)
    , Item.new (Item.Shield SmallSteelShield)
    , Item.new (Item.Shield MediumSteelShield)
    , Item.new (Item.Shield LargeSteelShield)
    , Item.new (Item.Shield SmallMeteoricSteelShield)
    , Item.new (Item.Shield MediumMeteoricSteelShield)
    , Item.new (Item.Shield LargeMeteoricSteelShield)
    ]
