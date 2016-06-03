module Game.Game exposing (..)

-- Game

import Game.Data exposing (..)
import Game.Maps exposing (..)
import Game.Collision exposing (..)
import Inventory exposing (..)


-- Data

import GameData.Building exposing (..)


--Hero

import Hero exposing (..)


-- Common

import Lib exposing (..)


-- Core

import Html exposing (..)
import Html.Attributes exposing (..)


initGame : Game.Data.Model
initGame =
    { name = "A new game"
    , hero = Hero.initHero
    , map = Game.Maps.initMaps
    , currentScreen = InventoryScreen
    }


update : Msg -> Game.Data.Model -> ( Game.Data.Model, Cmd Msg )
update msg model =
    case msg of
        KeyDir dir ->
            tryMoveHero dir model

        Map ->
            ( { model | currentScreen = MapScreen }, Cmd.none )

        Inventory ->
            ( { model | currentScreen = InventoryScreen }, Cmd.none )


view : Game.Data.Model -> Html (Maybe Game.Data.Msg)
view model =
    case model.currentScreen of
        MapScreen ->
            viewMap model

        BuildingScreen building ->
            viewBuilding building

        InventoryScreen ->
            Inventory.view model


viewMap : Game.Data.Model -> Html (Maybe Game.Data.Msg)
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


viewBuilding : GameData.Building.Building -> Html (Maybe Game.Data.Msg)
viewBuilding building =
    div [] [ h1 [] [ text building.name ] ]


viewHero : Hero.Model -> Html (Maybe Game.Data.Msg)
viewHero hero =
    div [ class "tile maleHero", vectorToHtmlStyle hero.pos ] []
