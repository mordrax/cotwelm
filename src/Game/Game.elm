module Game.Game exposing (..)

import Game.Data exposing (..)
import Game.Maps exposing (..)
import Game.Collision exposing (..)
import GameData.Building exposing (..)
import Hero exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Equipment exposing (..)


initGame : Game.Data.Model
initGame =
    { name = "A new game"
    , hero = Hero.initHero
    , map = Game.Maps.initMaps
    , currentScreen = MapScreen
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
            viewInventory model


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


viewInventory : Game.Data.Model -> Html (Maybe Game.Data.Msg)
viewInventory model =
    let
        shopView =
            case model.currentScreen of
                BuildingScreen b ->
                    viewShop b

                _ ->
                    div [] []
    in
        div []
            [ span [ class "ui text container segment" ]
                [ text "Inventory screen" ]
            , div [ class "ui two column grid" ]
                [ div [ class "six wide column" ]
                    [ viewEquipment model.hero.equipment
                    , div [ class "ten wide column" ]
                        [ shopView
                        ]
                    ]
                ]
            ]


viewShop : Building -> Html (Maybe Game.Data.Msg)
viewShop building =
    div [ class "ui block header" ] [ text "shop" ]
