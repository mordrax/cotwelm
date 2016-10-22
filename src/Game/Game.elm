module Game.Game exposing (..)

-- Game

import Game.Data exposing (..)
import Game.Maps as Maps exposing (..)
import Game.Collision exposing (..)
import Game.Inventory as Inventory exposing (..)
import Equipment as Equipment exposing (..)
import Shop.Shop as Shop exposing (..)
import Game.Keyboard as Keyboard exposing (..)
import GameData.Types as GDT exposing (Difficulty)

-- Data

import GameData.Building as Building exposing (..)


--Hero

import Hero.Hero as Hero exposing (Hero)
import Monster.Monster as Monster exposing (..)
import Monster.Monsters as Monsters exposing (..)
import Stats exposing (..)


-- Common

import Utils.DragDrop as DragDrop exposing (new)
import Utils.Lib exposing (..)
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
    | InvMsg (InventoryMsg Drag Drop)
    | ShopMsg Shop.Msg
    | MapsMsg Maps.Msg
    | WindowSize Window.Size


init : Random.Seed -> Hero -> Difficulty -> ( Model, Cmd Msg )
init seed hero difficulty =
    let
        idGenerator =
            IdGenerator.new

        ( idGenerator', equipment ) =
            Equipment.init idGenerator

        ( monsters, idGenerator'' ) =
            Monsters.init idGenerator'

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
          , hero = hero
          , maps = maps
          , currentScreen = MapScreen
          , dnd = DragDrop.new
          , equipment = equipment
          , shop = newShop
          , idGen = idGenerator''
          , monsters = monsters
          , seed = seed'
          , windowSize = { width = 640, height = 640 }
          , messages = [ "Welcome to castle of the winds!" ]
          , viewportX = 0
          , viewportY = 0
          , difficulty = difficulty
          }
        , cmd
        )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Keyboard (KeyDir dir) ->
            let
                model' =
                    model
                        |> Game.Collision.tryMoveHero dir
                        |> updateViewportOffset (Hero.position model.hero)

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

        MapsMsg msg ->
            ( { model | maps = Maps.update msg model.maps }, Cmd.none )

        Keyboard (Keyboard.NoOp) ->
            ( model, Cmd.none )

        WindowSize size ->
            ( { model | windowSize = size }, Cmd.none )


updateViewportOffset : Vector -> Model -> Model
updateViewportOffset prevPosition ({ windowSize, viewportX, viewportY, maps } as model) =
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
            { up = viewportY + y <= tolerance
            , down = viewportY + y >= (windowSize.height * 4 // 5) - tolerance
            , left = viewportX + x <= tolerance
            , right = viewportX + x >= windowSize.width - tolerance
            }

        ( mapWidth, mapHeight ) =
            Maps.mapSize (Maps.currentAreaMap maps)

        newX =
            if prevX /= x && (scroll.left || scroll.right) then
                clamp (windowSize.width - mapWidth * tileSize) 0 (xOff - x)
            else
                viewportX

        newY =
            if prevY /= y && (scroll.up || scroll.down) then
                clamp (windowSize.height * 4 // 5 - mapHeight * tileSize) 0 (yOff - y)
            else
                viewportY
    in
        { model | viewportX = newX, viewportY = newY }


view : Model -> Html Msg
view model =
    case model.currentScreen of
        MapScreen ->
            viewMap model

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
        monsterHtml monster =
            Monster.view monster
    in
        div [] (List.map monsterHtml monsters)


viewMap : Model -> Html Msg
viewMap ({ windowSize, viewportX, viewportY } as model) =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]

        px x =
            (toString x) ++ "px"

        viewport html =
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
                        , ( "top", px viewportY )
                        , ( "left", px viewportX )
                        ]
                    ]
                    html
                ]
    in
        div []
            [ viewMenu
            , viewQuickMenu
            , viewport
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


subscriptions : Model -> List (Sub Msg)
subscriptions model =
    let
        toInvMsg x =
            Sub.map InvMsg x

        toKeyboardMsg x =
            Sub.map Keyboard x

        inventorySubs =
            List.map toInvMsg (Inventory.subscriptions model)

        keyboardSubs =
            List.map toKeyboardMsg (Keyboard.subscriptions)

        windowSubs =
            Window.resizes (\x -> WindowSize x)
    in
        windowSubs :: inventorySubs ++ keyboardSubs



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
