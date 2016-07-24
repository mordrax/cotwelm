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
import Stats exposing (..)


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
import Task exposing (perform)


type Msg
    = Keyboard (Keyboard.Msg)
    | InvMsg (InventoryMsg Drag Drop)
    | ShopMsg Shop.Msg
    | MapsMsg Maps.Msg
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
          , hero = Hero.init
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

        MapsMsg msg ->
            ( { model | maps = Maps.update msg model.maps }, Cmd.none )

        Keyboard (Keyboard.NoOp) ->
            ( model, Cmd.none )

        WindowSize size ->
            ( { model | windowSize = size }, Cmd.none )


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
        monsterHtml =
            \monster -> Monster.view monster
    in
        div [] (List.map monsterHtml monsters)


viewMap : Model -> Html Msg
viewMap ({ windowSize } as model) =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]

        ( x, y ) =
            Vector.scale 32 model.hero.position

        ( xOff, yOff ) =
            ( windowSize.width // 32 * 16, windowSize.height // 32 * 16 )

        px =
            \x -> (toString x) ++ "px"

        viewport =
            \html ->
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
                            , ( "top", px (yOff - y) )
                            , ( "left", px (xOff - x) )
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
                , viewHero model.hero
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
                [ viewStats model ]
            ]
        ]


viewMessages : Model -> Html Msg
viewMessages model =
    let
        msg =
            \txt -> div [] [ text txt ]
    in
        div [] (List.map msg model.messages)


viewStats : Model -> Html Msg
viewStats ({ hero } as model) =
    div []
        [ div [] [ text "Stats:" ]
        , div [] [ text <| "HP: " ++ (Stats.printHP hero.stats) ]
        , div [] [ text <| "SP: " ++ (Stats.printSP hero.stats) ]
        ]


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
