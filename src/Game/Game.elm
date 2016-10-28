module Game.Game exposing (..)

-- Game

import Game.Data exposing (..)
import Game.Maps as Maps exposing (..)
import Game.Collision exposing (..)
import Pages.Inventory as Inventory exposing (Inventory)
import Equipment
import Shop exposing (..)
import Game.Keyboard as Keyboard exposing (..)
import GameData.Types as GDT exposing (Difficulty)
import Item.Factory as ItemFactory exposing (ItemFactory)
import Item.Item as Item
import Item.TypeDef exposing (..)


-- Data

import GameData.Building as Building exposing (..)


--Hero

import Hero.Hero as Hero exposing (Hero)
import Monster.Monster as Monster exposing (..)
import Monster.Monsters as Monsters exposing (..)
import Stats exposing (..)


-- Common

import Utils.DragDrop as DragDrop exposing (DragDrop)
import Utils.Lib as Lib
import Utils.IdGenerator as IdGenerator exposing (..)
import Utils.Vector as Vector exposing (..)


-- Core

import Html exposing (..)
import Html.Attributes exposing (class, style)
import Html.App exposing (map)
import Random.Pcg as Random exposing (..)
import Window exposing (..)
import Task exposing (perform)


type Msg
    = Keyboard (Keyboard.Msg)
    | InventoryMsg (Inventory.Msg Inventory.Draggable Inventory.Droppable)
    | ShopMsg Shop.Msg
    | MapsMsg Maps.Msg
    | WindowSize Window.Size


donDefaultGarb : ItemFactory -> Hero -> ( Hero, ItemFactory )
donDefaultGarb itemFactory hero =
    let
        equipmentToMake =
            [ ( Equipment.Weapon, Item.Weapon Dagger )
            , ( Equipment.Armour, Item.Armour ScaleMail )
            , ( Equipment.Shield, Item.Shield LargeIronShield )
            , ( Equipment.Helmet, Item.Helmet LeatherHelmet )
            , ( Equipment.Gauntlets, Item.Gauntlets NormalGauntlets )
            , ( Equipment.Belt, Item.Belt ThreeSlotBelt )
            , ( Equipment.Purse, Item.Purse )
            , ( Equipment.Pack, Item.Pack MediumPack )
            ]

        makeEquipment ( equipmentSlot, itemType ) ( accEquipment, itemFactory ) =
            let
                ( item, itemFactory_ ) =
                    ItemFactory.make itemType itemFactory
            in
                ( ( equipmentSlot, item ) :: accEquipment, itemFactory_ )

        ( defaultEquipment, factoryAfterProduction ) =
            List.foldl makeEquipment ( [], itemFactory ) equipmentToMake

        heroWithEquipmentResult =
            Lib.foldResult (\( slot, item ) -> Hero.equip slot item) (Result.Ok hero) defaultEquipment
    in
        case heroWithEquipmentResult of
            Result.Ok heroWithEquipment ->
                ( heroWithEquipment, factoryAfterProduction )

            err ->
                let
                    _ =
                        Debug.log "Game.dondefaultGarb" (toString err)
                in
                    ( hero, itemFactory )


init : Random.Seed -> Hero -> Difficulty -> ( Model, Cmd Msg )
init seed hero difficulty =
    let
        idGenerator =
            IdGenerator.init

        itemFactory =
            ItemFactory.init

        ( heroWithDefaultEquipment, itemFactoryAfterHeroEquipment ) =
            donDefaultGarb itemFactory hero

        ( monsters, idGenerator' ) =
            Monsters.init idGenerator

        ( newShop, shopCmd ) =
            Shop.new

        ( maps, mapCmd, seed' ) =
            Maps.init seed

        gameCmds =
            initialWindowSizeCmd

        cmd =
            Cmd.batch
                [ Cmd.map (\x -> ShopMsg x) shopCmd
                , Cmd.map (\x -> MapsMsg x) mapCmd
                , gameCmds
                ]
    in
        ( { name = "A new game"
          , hero = heroWithDefaultEquipment
          , maps = maps
          , currentScreen = MapScreen
          , shop = newShop
          , idGen = idGenerator'
          , inventory = Inventory.init newShop (Hero.equipment heroWithDefaultEquipment)
          , monsters = monsters
          , seed = seed'
          , messages = [ "Welcome to castle of the winds!" ]
          , difficulty = difficulty
          , windowSize = { width = 640, height = 640 }
          , viewport = { x = 0, y = 0 }
          }
        , cmd
        )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Keyboard (KeyDir dir) ->
            ( model
                |> Game.Collision.tryMoveHero dir
                |> updateViewportOffset (Hero.position model.hero)
                |> (\model -> Game.Collision.moveMonsters model.monsters [] model)
            , Cmd.none
            )

        Keyboard Map ->
            ( { model | currentScreen = MapScreen }, Cmd.none )

        Keyboard Inventory ->
            ( { model | currentScreen = InventoryScreen }, Cmd.none )

        InventoryMsg msg ->
            ( { model | inventory = Inventory.update msg model.inventory }, Cmd.none )

        ShopMsg msg ->
            let
                ( shop', idGen' ) =
                    Shop.update msg model.idGen model.shop
            in
                ( { model | shop = shop', idGen = idGen' }, Cmd.none )

        MapsMsg msg ->
            ( { model | maps = Maps.update msg model.maps }, Cmd.none )

        Keyboard (Keyboard.NoOp) ->
            ( model, Cmd.none )

        WindowSize size ->
            ( { model | windowSize = size }, Cmd.none )


updateViewportOffset : Vector -> Model -> Model
updateViewportOffset prevPosition ({ windowSize, viewport, maps } as model) =
    let
        tileSize =
            32

        ( prevX, prevY ) =
            Vector.scale tileSize prevPosition

        ( x, y ) =
            Vector.scale tileSize (Hero.position model.hero)

        ( xOff, yOff ) =
            ( windowSize.width // 2, windowSize.height // 2 )

        tolerance =
            tileSize * 4

        scroll =
            { up = viewport.y + y <= tolerance
            , down = viewport.y + y >= (windowSize.height * 4 // 5) - tolerance
            , left = viewport.x + x <= tolerance
            , right = viewport.x + x >= windowSize.width - tolerance
            }

        ( mapWidth, mapHeight ) =
            Maps.mapSize (Maps.currentAreaMap maps)

        newX =
            if prevX /= x && (scroll.left || scroll.right) then
                clamp (windowSize.width - mapWidth * tileSize) 0 (xOff - x)
            else
                viewport.x

        newY =
            if prevY /= y && (scroll.up || scroll.down) then
                clamp (windowSize.height * 4 // 5 - mapHeight * tileSize) 0 (yOff - y)
            else
                viewport.y
    in
        { model | viewport = { x = newX, y = newY } }


view : Model -> Html Msg
view model =
    case model.currentScreen of
        MapScreen ->
            viewMap model

        BuildingScreen building ->
            case Building.buildingType building of
                ShopType shopType ->
                    Html.App.map InventoryMsg (Inventory.view model.inventory)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.App.map InventoryMsg (Inventory.view model.inventory)


viewMonsters : Model -> Html Msg
viewMonsters ({ monsters } as model) =
    let
        monsterHtml monster =
            Monster.view monster
    in
        div [] (List.map monsterHtml monsters)


viewMap : Model -> Html Msg
viewMap ({ windowSize, viewport } as model) =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]

        px x =
            (toString x) ++ "px"

        adjustViewport html =
            div
                [ style
                    [ ( "position", "relative" )
                    , ( "overflow", "hidden" )
                    , ( "width", px windowSize.width )
                    , ( "height", px (windowSize.height * 4 // 5) )
                    ]
                ]
                [ div
                    [ style
                        [ ( "position", "relative" )
                        , ( "top", px viewport.x )
                        , ( "left", px viewport.y )
                        ]
                    ]
                    html
                ]
    in
        div []
            [ viewMenu
            , viewQuickMenu
            , adjustViewport
                [ Maps.view model.maps
                , Hero.view model.hero
                , viewMonsters model
                ]
            , viewStatus model
            ]


viewStatus : Model -> Html Msg
viewStatus model =
    div []
        [ div [ class "ui padded grid" ]
            [ div [ style [ ( "overflow", "auto" ), ( "height", "100px" ) ], class "ui twelve wide column" ]
                [ viewMessages model ]
            , div [ class "ui four wide column" ]
                [ Hero.viewStats model.hero ]
            ]
        ]


viewMessages : Model -> Html Msg
viewMessages model =
    let
        msg txt =
            div [] [ text txt ]
    in
        div [] (List.map msg model.messages)


viewMenu : Html Msg
viewMenu =
    div [ class "ui buttons" ]
        (List.map simpleBtn
            [ "File"
            , "Character!"
            , "Inventory!"
            , "Map!"
            , "Spells"
            , "Activate"
            , "Verbs"
            , "Options"
            , "Window"
            , "Help"
            ]
        )


viewQuickMenu : Html Msg
viewQuickMenu =
    div []
        (List.map simpleBtn
            [ "Get"
            , "Free Hand"
            , "Search"
            , "Disarm"
            , "Rest"
            , "Save"
            ]
        )


viewHUD : Model -> Html Msg
viewHUD model =
    div [] [ text "messages" ]


viewBuilding : Building -> Html Msg
viewBuilding building =
    div [] [ h1 [] [ text "TODO: Get the internal view of the building" ] ]


subscription : Model -> Sub Msg
subscription model =
    Sub.batch
        [ Window.resizes (\x -> WindowSize x)
        , Sub.map InventoryMsg (Inventory.subscription model.inventory)
        , Sub.map Keyboard (Keyboard.subscription)
        ]



--------------
-- Commands --
--------------


initialWindowSizeCmd : Cmd Msg
initialWindowSizeCmd =
    Task.perform (\x -> Debug.log "Getting window size failed: " x)
        (\x -> WindowSize x)
        Window.size



--------
-- UI --
--------


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ class "ui button" ] [ text txt ]
