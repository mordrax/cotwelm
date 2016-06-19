module Shop.Shop
    exposing
        ( Shop
        , Msg
        , new
        , replenish
        , list
        , update
        )

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
