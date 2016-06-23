module Shop.Shop
    exposing
        ( Shop
        , Msg
        , new
        , replenish
        , list
        , update
        , give
        , sell
        , buy
        )

import Item.Purse as Purse exposing (..)
import Item.Item as Item exposing (..)
import Item.TypeDef exposing (..)


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
    { items : List Item }


new : ( Shop, Cmd Msg )
new =
    ( SM (Model []), getSeed )


give : Item -> Shop -> Shop
give item (SM model) =
    SM { model | items = item :: model.items }


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
                Result.Ok ( SM (take item model), purse' )

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
        ( SM { model | items = item :: model.items }, Purse.add cost purse )


{-| Take a item from the shop, no checks
-}
take : Item -> Model -> Model
take item ({ items } as model) =
    let
        equals =
            Item.equals

        items' =
            List.filter (\x -> (not (equals item x))) items
    in
        { model | items = items' }


replenish : IdGenerator -> Seed -> ( IdGenerator, List Item )
replenish idGenerator seed =
    let
        defaultProduct : Maybe (ID -> Item) -> (ID -> Item)
        defaultProduct =
            \maybe ->
                Maybe.withDefault (Item.new (Item.Weapon BrokenSword)) maybe

        itemGenerator =
            sample productList |> (Random.map defaultProduct)

        itemsGenerator =
            \n -> Random.list n itemGenerator

        ( foldableProducts, _ ) =
            step (itemsGenerator 10) seed

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
                ( generator', products ) =
                    replenish generator seed
            in
                ( SM { model | items = products }, generator' )

        _ ->
            let
                _ =
                    Debug.log "Shop.update, unexpected msg" msg
            in
                ( (SM model), generator )


list : Shop -> List Item
list (SM model) =
    model.items


type alias ProductName =
    String


type alias ItemFactory =
    ID -> Item


productList : List ItemFactory
productList =
    [ Item.new (Item.Weapon BrokenSword)
    , Item.new (Item.Weapon Club)
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
