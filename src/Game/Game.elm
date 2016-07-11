module Game.Game exposing (..)

-- Game

import Game.Data exposing (..)
import Game.Maps as Maps exposing (..)
import Game.Collision exposing (..)
import Game.Inventory as Inventory exposing (..)
import Equipment as Equipment exposing (..)
import Shop.Shop as Shop exposing (..)
import Game.Keyboard as Keyboard exposing (..)


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
import Utils.Vector as Vector exposing (..)


-- Core

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App exposing (map)
import Random exposing (..)
import Window exposing (..)


type Msg
    = Keyboard (Keyboard.Msg)
    | InvMsg (InventoryMsg Drag Drop)
    | ShopMsg Shop.Msg
    | WindowSize Window.Size


initGame : Random.Seed -> ( Model, Cmd Msg )
initGame seed =
    let
        idGenerator =
            IdGenerator.new

        ( idGenerator', equipment ) =
            Equipment.init idGenerator

        ( monsters, idGenerator'' ) =
            Monsters.init idGenerator'

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
          , idGen = idGenerator''
          , monsters = monsters
          , seed = seed
          , windowSize = { width = 640, height = 640 }
          }
        , cmd
        )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Keyboard (KeyDir dir) ->
            let
                model' =
                    Game.Collision.tryMoveHero dir model

                movedMovedMonsters =
                    Game.Collision.moveMonsters model'.monsters [] model'
            in
                ( movedMovedMonsters, Cmd.none )

        Keyboard Map ->
            ( { model | currentScreen = MapScreen }, Cmd.none )

        Keyboard Inventory ->
            ( { model | currentScreen = InventoryScreen }, Cmd.none )

        InvMsg msg ->
            ( Inventory.update msg model, Cmd.none )

        ShopMsg msg ->
            let
                ( shop', idGen' ) =
                    Shop.update msg model.idGen model.shop
            in
                ( { model | shop = shop', idGen = idGen' }, Cmd.none )

        Keyboard (Keyboard.NoOp) ->
            ( model, Cmd.none )

        WindowSize size ->
            ( { model | windowSize = size }, Cmd.none )


view : Model -> Html Msg
view model =
    case model.currentScreen of
        MapScreen ->
            div [ class "ui grid container" ]
                [ div [ class "ui row" ] [ text "menu" ]
                , div [ class "ui row" ] [ text "buttons menu" ]
                , div [ class "ui row" ] [ viewMap model ]
                , div [ class "ui row" ] [ viewHUD model ]
                ]

        BuildingScreen building ->
            case Building.buildingType building of
                ShopType shopType ->
                    Html.App.map InvMsg (Inventory.view model)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.App.map InvMsg (Inventory.view model)


viewMonsters : Model -> Html Msg
viewMonsters ({ monsters } as model) =
    let
        monsterHtml =
            \monster -> Monster.view monster
    in
        div [] (List.map monsterHtml monsters)


viewMap : Model -> Html Msg
viewMap ({ windowSize } as model) =
    let
        _ =
            Debug.log "size: " windowSize

        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]

        { x, y } =
            Vector.scale 32 model.hero.position

        ( xOff, yOff ) =
            ( windowSize.width // 32 * 16, windowSize.height // 32 * 16 )

        px =
            \x -> (toString x) ++ "px"
    in
        div
            [ style
                [ ( "position", "relative" )
                , ( "overflow", "hidden" )
                , ( "width", px windowSize.width )
                , ( "height", px windowSize.height )
                ]
            ]
            [ div
                [ style
                    [ ( "position", "relative" )
                    , ( "top", "-" ++ (toString (y - yOff)) ++ "px" )
                    , ( "left", "-" ++ (toString (x - xOff)) ++ "px" )
                    ]
                ]
                [ Maps.view model.map
                , viewHero model.hero
                , viewMonsters model
                ]
            ]


viewHUD : Model -> Html Msg
viewHUD model =
    div [] [ text "messages" ]


viewBuilding : Building -> Html Msg
viewBuilding building =
    div [] [ h1 [] [ text "TODO: Get the internal view of the building" ] ]


viewHero : Hero -> Html Msg
viewHero hero =
    div [ class "tile maleHero", vectorToHtmlStyle <| hero.position ] []


subscriptions : Model -> List (Sub Msg)
subscriptions model =
    let
        toInvMsg =
            \x -> Sub.map InvMsg x

        toKeyboardMsg =
            \x -> Sub.map Keyboard x

        inventorySubs =
            List.map toInvMsg (Inventory.subscriptions model)

        keyboardSubs =
            List.map toKeyboardMsg (Keyboard.subscriptions)

        windowSubs =
            Window.resizes (\x -> WindowSize x)
    in
        windowSubs :: inventorySubs ++ keyboardSubs
