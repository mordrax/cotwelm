module Game.Game exposing (..)

-- Game

import Game.Data exposing (..)
import Game.Maps as Maps exposing (..)
import Game.Collision exposing (..)
import Game.Inventory as Inventory exposing (..)
import Equipment as Equipment exposing (..)
import Shop.Shop as Shop exposing (..)


-- Data

import GameData.Building as Building exposing (..)


--Hero

import Hero as Hero exposing (..)
import Monster.Monster as Monster exposing (..)
import Monster.Monsters as Monsters exposing (..)


-- Common

import Utils.DragDrop as DragDrop exposing (new)
import Utils.Lib exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- Core

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App exposing (map)
import Random exposing (..)


initGame : Random.Seed -> ( Game.Data.Model, Cmd Game.Data.Msg )
initGame seed =
    let
        idGenerator =
            IdGenerator.new

        ( idGenerator', equipment ) =
            Equipment.init idGenerator

        ( newShop, shopCmd ) =
            Shop.new

        cmd =
            Cmd.map (\x -> ShopMsg x) shopCmd
    in
        ( { name = "A new game"
          , hero = Hero.init
          , map = Maps.init
          , currentScreen = MapScreen
          , dnd = DragDrop.new
          , equipment = equipment
          , shop = newShop
          , idGen = idGenerator'
          , monsters = Monsters.init
          , seed = seed
          }
        , cmd
        )


update : Game.Data.Msg -> Game.Data.Model -> ( Game.Data.Model, Cmd Game.Data.Msg )
update msg model =
    case msg of
        KeyDir dir ->
            let
                modelMovedHero =
                    Game.Collision.tryMoveHero dir model

                movedMovedMonsters =
                    Game.Collision.moveMonsters model.monsters [] modelMovedHero
            in
                ( movedMovedMonsters, Cmd.none )

        Map ->
            ( { model | currentScreen = MapScreen }, Cmd.none )

        Inventory ->
            ( { model | currentScreen = InventoryScreen }, Cmd.none )

        InvMsg msg ->
            ( Inventory.update msg model, Cmd.none )

        ShopMsg msg ->
            let
                ( shop', idGen' ) =
                    Shop.update msg model.idGen model.shop
            in
                ( { model | shop = shop', idGen = idGen' }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


view : Game.Data.Model -> Html Game.Data.Msg
view model =
    case model.currentScreen of
        MapScreen ->
            div []
                [ viewMap model
                , viewMonsters model
                ]

        BuildingScreen building ->
            case Building.buildingType building of
                ShopType shopType ->
                    Html.App.map InvMsg (Inventory.view model)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.App.map InvMsg (Inventory.view model)


viewMonsters : Game.Data.Model -> Html Game.Data.Msg
viewMonsters ({ monsters } as model) =
    let
        monsterHtml =
            \monster -> Monster.view monster
    in
        div [] (List.map monsterHtml monsters)


viewMap : Game.Data.Model -> Html Game.Data.Msg
viewMap model =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]
    in
        div []
            [ title
            , Maps.view model.map
            , viewHero model.hero
            ]


viewBuilding : Building -> Html Game.Data.Msg
viewBuilding building =
    div [] [ h1 [] [ text "TODO: Get the internal view of the building" ] ]


viewHero : Hero -> Html Game.Data.Msg
viewHero hero =
    div [ class "tile maleHero", vectorToHtmlStyle <| hero.position ] []


subscriptions : Game.Data.Model -> List (Sub Game.Data.Msg)
subscriptions model =
    let
        toMsg =
            \x -> Sub.map InvMsg x

        inventorySubs =
            Inventory.subscriptions model
    in
        List.map toMsg inventorySubs
