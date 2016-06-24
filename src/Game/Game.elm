module Game.Game exposing (..)

-- Game

import Game.Data exposing (..)
import Game.Maps exposing (..)
import Game.Collision exposing (..)
import Game.Inventory as Inventory exposing (..)
import Equipment exposing (..)
import Shop.Shop as Shop exposing (..)


-- Data

import GameData.Building as Building exposing (..)


--Hero

import Hero exposing (..)


-- Common

import Utils.DragDrop as DragDrop exposing (new)
import Utils.Lib exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- Core

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App exposing (map)


initGame : ( Game.Data.Model, Cmd Game.Data.Msg )
initGame =
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
          , map = Game.Maps.initMaps
          , currentScreen = MapScreen
          , dnd = DragDrop.new
          , equipment = equipment
          , shop = newShop
          , idGen = idGenerator'
          }
        , cmd
        )


update : Game.Data.Msg -> Game.Data.Model -> ( Game.Data.Model, Cmd Game.Data.Msg )
update msg model =
    case msg of
        KeyDir dir ->
            tryMoveHero dir model

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
            viewMap model

        BuildingScreen building ->
            case building.buildingType of
                ShopType shopType ->
                    Html.App.map InvMsg (Inventory.view model)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.App.map InvMsg (Inventory.view model)


viewMap : Game.Data.Model -> Html Game.Data.Msg
viewMap model =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]
    in
        div []
            [ title
            , Game.Maps.view model.map
            , viewHero model.hero
            ]


viewBuilding : Building.Model -> Html Game.Data.Msg
viewBuilding building =
    div [] [ h1 [] [ text building.name ] ]


viewHero : Hero -> Html Game.Data.Msg
viewHero hero =
    div [ class "tile maleHero", vectorToHtmlStyle <| Hero.pos hero ] []
