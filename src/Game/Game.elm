module Game.Game exposing (..)

import Game.Data exposing (..)
import Game.Maps exposing (..)
import Game.Collision exposing (..)
import GameData.Building exposing (..)
import Hero exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import GameData.Item exposing (..)
import GameData.Item exposing (..)


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
            viewInventory model.hero


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


viewInventory : Hero.Model -> Html (Maybe Game.Data.Msg)
viewInventory hero =
    let
        weapon =
            case hero.equipment.weapon of
                Nothing ->
                    div [] []

                Just item ->
                    viewItem item
    in
        div [ class "ui two column grid" ]
            [ div [ class "six wide column" ]
                [ div [ class "ui grid" ]
                    [ div [ class "three wide column equipmentSilot" ]
                        [ weapon
                        ]
                    ]
                ]
            ]


viewItem : GameData.Item.Model -> Html (Maybe Game.Data.Msg)
viewItem item =
    div
        [ class "ui item"
        , style
            [ ( "opacity", "1" )
            , ( "cursor", "move" )
            , ( "width", "32px" )
            , ( "height", "64px" )
            ]
        ]
        [ div [ class "image" ]
            [ i [ class ("cotwItem " ++ item.css) ] []
            ]
        , div [ class "content" ]
            [ a [ class "header" ]
                [--text (toString item.itemType)
                ]
            , div [ class "meta" ]
                [ span [ class "date" ] []
                ]
            , div [ class "description", style [ ( "maxWidth", "7em" ) ] ]
                [ text item.name
                ]
            ]
        ]
