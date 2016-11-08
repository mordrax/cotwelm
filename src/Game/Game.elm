module Game.Game
    exposing
        ( Game
        , Msg
        , init
        , update
        , view
        , subscription
        )

import AStar
import Combat
import Dict
import Equipment exposing (Equipment)
import Game.Keyboard as Keyboard exposing (..)
import Game.Maps as Maps exposing (Maps)
import GameData.Building as Building exposing (Building)
import GameData.Types as GDT exposing (Difficulty)
import Hero.Hero as Hero exposing (Hero)
import Html exposing (..)
import Html.App exposing (map)
import Html.Attributes exposing (class, style)
import Item.Factory as ItemFactory exposing (ItemFactory)
import Item.Item as Item
import Item.Data exposing (..)
import Monster.Monster as Monster exposing (Monster)
import Monster.Monsters as Monsters exposing (..)
import Pages.Inventory as Inventory exposing (Inventory)
import Random.Pcg as Random exposing (..)
import Set exposing (Set)
import Shops exposing (Shops)
import Stats exposing (..)
import Task exposing (perform)
import Tile exposing (Tile)
import Utils.Direction as Direction exposing (Direction)
import Utils.IdGenerator as IdGenerator exposing (IdGenerator)
import Utils.Lib as Lib
import Utils.Vector as Vector exposing (Vector)
import Window exposing (Size)


type Game
    = A Model


type alias Model =
    { name : String
    , hero : Hero
    , maps : Maps
    , currentScreen : Screen
    , shops : Shops
    , idGen : IdGenerator
    , monsters : List Monster
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : List String
    , viewport : { x : Int, y : Int }
    , difficulty : Difficulty
    , inventory : Inventory
    }


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type Msg
    = Keyboard (Keyboard.Msg)
    | InventoryMsg (Inventory.Msg Inventory.Draggable Inventory.Droppable)
    | MapsMsg Maps.Msg
    | WindowSize Window.Size


init : Random.Seed -> Hero -> Difficulty -> ( Game, Cmd Msg )
init seed hero difficulty =
    let
        idGenerator =
            IdGenerator.init

        itemFactory =
            ItemFactory.init

        ( heroWithDefaultEquipment, itemFactoryAfterHeroEquipment ) =
            donDefaultGarb itemFactory hero

        ( shops, itemFactory__, seed_ ) =
            Shops.init seed itemFactoryAfterHeroEquipment

        ( monsters, idGenerator' ) =
            Monsters.init idGenerator

        ( maps, mapCmd, seed__ ) =
            Maps.init seed_

        cmd =
            Cmd.batch
                [ Cmd.map MapsMsg mapCmd
                , initialWindowSizeCmd
                ]
    in
        ( A
            { name = "A new game"
            , hero = heroWithDefaultEquipment
            , maps = maps
            , currentScreen = MapScreen
            , shops = shops
            , idGen = idGenerator'
            , inventory = Inventory.init Nothing (Hero.equipment heroWithDefaultEquipment)
            , monsters = monsters
            , seed = seed__
            , messages = [ "Welcome to castle of the winds!" ]
            , difficulty = difficulty
            , windowSize = { width = 640, height = 640 }
            , viewport = { x = 0, y = 0 }
            }
        , cmd
        )


update : Msg -> Game -> ( Game, Cmd Msg )
update msg ((A model) as game) =
    case msg of
        Keyboard (KeyDir dir) ->
            ( model
                |> moveHero dir
                |> updateViewportOffset (Hero.position model.hero)
                |> (\model -> moveMonsters model.monsters [] model)
                |> A
            , Cmd.none
            )

        Keyboard Esc ->
            case model.currentScreen of
                MapScreen ->
                    ( A model, Cmd.none )

                BuildingScreen _ ->
                    update (InventoryMsg <| Inventory.keyboardToInventoryMsg Esc) game

                InventoryScreen ->
                    update (InventoryMsg <| Inventory.keyboardToInventoryMsg Esc) game

        Keyboard Inventory ->
            ( A
                { model
                    | currentScreen = InventoryScreen
                    , inventory = Inventory.init Nothing (Hero.equipment model.hero)
                }
            , Cmd.none
            )

        InventoryMsg msg ->
            let
                ( inventory_, maybeExitValues ) =
                    Inventory.update msg model.inventory
            in
                case maybeExitValues of
                    Nothing ->
                        ( A { model | inventory = inventory_ }, Cmd.none )

                    Just ( equipment, maybeShop ) ->
                        let
                            modelWithHeroAndInventory =
                                { model
                                    | inventory = inventory_
                                    , hero = Hero.updateEquipment equipment model.hero
                                    , currentScreen = MapScreen
                                }
                        in
                            case maybeShop of
                                Nothing ->
                                    ( A modelWithHeroAndInventory
                                    , Cmd.none
                                    )

                                Just shop ->
                                    ( A
                                        { modelWithHeroAndInventory
                                            | shops = Shops.updateShop shop model.shops
                                        }
                                    , Cmd.none
                                    )

        MapsMsg msg ->
            ( A { model | maps = Maps.update msg model.maps }, Cmd.none )

        Keyboard _ ->
            ( A model, Cmd.none )

        WindowSize size ->
            ( A { model | windowSize = size }, Cmd.none )



--------------
-- Privates --
--------------
-- Collision


moveHero : Direction -> Model -> Model
moveHero dir ({ hero, monsters, seed } as model) =
    let
        heroMoved =
            Hero.move dir hero

        obstructions =
            heroMoved
                |> Hero.position
                |> \newHeroPosition -> queryPosition newHeroPosition model
    in
        case obstructions of
            ( _, _, Just monster, _ ) ->
                let
                    ( monster_, seed_ ) =
                        Combat.attack hero monster seed

                    monsters_ =
                        if Stats.isDead monster_.stats then
                            Monsters.removeOne monster monsters
                        else
                            Monsters.updateOne monster monsters
                in
                    { model
                        | seed = seed_
                        , monsters = monsters_
                    }

            -- entering a building
            ( _, Just building, _, _ ) ->
                enterBuilding building model

            -- path blocked
            ( True, _, _, _ ) ->
                model

            -- path free, moved
            ( False, _, _, _ ) ->
                { model | hero = heroMoved }


moveMonsters : List Monster -> List Monster -> Model -> Model
moveMonsters monsters movedMonsters ({ hero, maps, seed } as model) =
    case monsters of
        [] ->
            { model | monsters = movedMonsters }

        monster :: restOfMonsters ->
            let
                movedMonster =
                    pathMonster monster hero model

                obstructions =
                    queryPosition movedMonster.position model

                isObstructedByMovedMonsters =
                    isMonsterObstruction movedMonster movedMonsters
            in
                case obstructions of
                    -- hit hero
                    ( _, _, _, True ) ->
                        let
                            ( hero_, seed_ ) =
                                Combat.defend monster hero seed
                        in
                            moveMonsters restOfMonsters
                                (monster :: movedMonsters)
                                { model
                                    | hero = hero_
                                    , seed = seed_
                                }

                    ( True, _, _, _ ) ->
                        moveMonsters restOfMonsters (monster :: movedMonsters) model

                    ( _, Just _, _, _ ) ->
                        moveMonsters restOfMonsters (monster :: movedMonsters) model

                    ( _, _, Just _, _ ) ->
                        moveMonsters restOfMonsters (monster :: movedMonsters) model

                    _ ->
                        if isObstructedByMovedMonsters then
                            moveMonsters restOfMonsters (monster :: movedMonsters) model
                        else
                            moveMonsters restOfMonsters (movedMonster :: movedMonsters) model


enterBuilding : Building -> Model -> Model
enterBuilding building ({ hero, maps } as model) =
    case Building.buildingType building of
        Building.LinkType link ->
            { model | maps = Maps.updateArea link.area maps }

        Building.Shop shopType ->
            { model
                | currentScreen = BuildingScreen building
                , inventory = Inventory.init (Just <| Shops.shop shopType model.shops) (Hero.equipment hero)
            }

        Building.Ordinary ->
            { model | currentScreen = BuildingScreen building }


{-| Given a position and a map, work out everything on the square
-}
queryPosition : Vector -> Model -> ( Bool, Maybe Building, Maybe Monster, Bool )
queryPosition pos ({ hero, maps, monsters } as model) =
    let
        maybeTile =
            Dict.get pos (Maps.currentAreaMap maps)

        maybeBuilding =
            buildingAtPosition pos (Maps.getBuildings maps)

        maybeMonster =
            monsters
                |> List.filter (\x -> pos == x.position)
                |> List.head

        hasHero =
            (Hero.position hero) == pos

        tileObstruction =
            case maybeTile of
                Just tile ->
                    Tile.isSolid tile

                Nothing ->
                    True
    in
        ( tileObstruction, maybeBuilding, maybeMonster, hasHero )


{-| Given a point and a list of buildings, return the building that the point is within or nothing
-}
buildingAtPosition : Vector -> List Building -> Maybe Building
buildingAtPosition pos buildings =
    let
        buildingsAtTile =
            List.filter (Building.isBuildingAtPosition pos) buildings
    in
        case buildingsAtTile of
            b :: rest ->
                Just b

            _ ->
                Nothing



-----------------
-- Pathfinding --
-----------------


pathMonster : Monster -> Hero -> Model -> Monster
pathMonster monster hero model =
    let
        path =
            AStar.findPath heuristic
                (neighbours model)
                monster.position
                (Hero.position hero)
    in
        case path of
            Nothing ->
                monster

            Just [] ->
                monster

            Just (( x, y ) :: _) ->
                { monster | position = ( x, y ) }


{-| Manhattan but counts diagonal cost as one (since you can move diagonally)
-}
heuristic : Vector -> Vector -> Float
heuristic start end =
    let
        ( dx, dy ) =
            Vector.sub start end
    in
        toFloat (max dx dy)


neighbours : Model -> Vector -> Set Vector
neighbours model position =
    let
        add x y =
            Vector.add position ( x, y )

        notObstructed vector =
            not (isObstructed vector model)
    in
        position
            |> Vector.neighbours
            |> List.filter notObstructed
            |> Set.fromList


isObstructed : Vector -> Model -> Bool
isObstructed position model =
    case queryPosition position model of
        ( _, _, _, True ) ->
            False

        ( False, Nothing, Nothing, _ ) ->
            False

        _ ->
            True


isMonsterObstruction : Monster -> List Monster -> Bool
isMonsterObstruction monster monsters =
    let
        atMonsterPosition pos =
            pos == monster.position
    in
        monsters
            |> List.map .position
            |> List.any atMonsterPosition



-----------
-- Adhoc --
-----------


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


donDefaultGarb : ItemFactory -> Hero -> ( Hero, ItemFactory )
donDefaultGarb itemFactory hero =
    let
        equipmentToMake =
            [ Item.Data.Weapon Dagger
            , Item.Data.Armour ScaleMail
            , Item.Data.Shield LargeIronShield
            , Item.Data.Helmet LeatherHelmet
            , Item.Data.Gauntlets NormalGauntlets
            , Item.Data.Belt ThreeSlotBelt
            , Item.Data.Purse
            , Item.Data.Pack MediumPack
            ]

        makeEquipment itemType ( accEquipment, itemFactory ) =
            let
                ( item, itemFactory_ ) =
                    ItemFactory.make itemType itemFactory
            in
                ( item :: accEquipment, itemFactory_ )

        ( defaultEquipment, factoryAfterProduction ) =
            List.foldl makeEquipment ( [], itemFactory ) equipmentToMake

        equippingHero =
            Lib.foldResult (\item -> Hero.equip item) (Result.Ok hero) defaultEquipment
    in
        case equippingHero of
            Result.Ok heroEquipped ->
                ( heroEquipped, factoryAfterProduction )

            err ->
                let
                    _ =
                        Debug.log "Game.donDefaultGarb" (toString err)
                in
                    ( hero, itemFactory )



----------
-- View --
----------


view : Game -> Html Msg
view (A model) =
    case model.currentScreen of
        MapScreen ->
            viewMap model

        BuildingScreen building ->
            case Building.buildingType building of
                Building.Shop shopType ->
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


subscription : Game -> Sub Msg
subscription (A model) =
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
