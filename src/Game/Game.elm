module Game.Game
    exposing
        ( Model
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
import Game.Maps as Maps
import GameData.Building as Building exposing (Building)
import GameData.Types as GDT exposing (Difficulty)
import Hero.Hero as Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes exposing (class, style)
import Item.Factory as ItemFactory exposing (ItemFactory)
import Item.Item as Item exposing (Item)
import Item.Data exposing (..)
import Level
import Monster.Monster as Monster exposing (Monster)
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
import Container exposing (Container)


type alias Model =
    { name : String
    , hero : Hero
    , maps : Maps.Model
    , currentScreen : Screen
    , shops : Shops
    , idGen : IdGenerator
    , seed : Random.Seed
    , windowSize : Window.Size
    , messages : List String
    , viewport : { x : Int, y : Int }
    , difficulty : Difficulty
    , inventory : Inventory
    , itemFactory : ItemFactory
    }


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building


type Msg
    = KeyboardMsg Keyboard.Msg
    | InventoryMsg (Inventory.Msg Inventory.Draggable Inventory.Droppable)
    | MapsMsg Maps.Msg
    | WindowSize Window.Size
    | ClickTile Vector
    | PathTo (List Vector)


init : Random.Seed -> Hero -> Difficulty -> ( Model, Cmd Msg )
init seed hero difficulty =
    let
        idGenerator =
            IdGenerator.init

        itemFactory =
            ItemFactory.init

        ( heroWithDefaultEquipment, itemFactoryAfterHeroEquipment ) =
            donDefaultGarb itemFactory hero

        ( shops, itemFactoryAfterShop, seed_ ) =
            Shops.init seed itemFactoryAfterHeroEquipment

        ( leatherArmour, itemFactory_ ) =
            ItemFactory.make (ItemTypeArmour LeatherArmour) itemFactoryAfterShop

        ( maps, mapCmd, seed__ ) =
            Maps.init leatherArmour seed_

        cmd =
            Cmd.batch
                [ Cmd.map MapsMsg mapCmd
                , initialWindowSizeCmd
                ]

        ground =
            getGroundAtHero heroWithDefaultEquipment maps
    in
        ( { name = "A new game"
          , hero = heroWithDefaultEquipment
          , maps = maps
          , currentScreen = MapScreen
          , shops = shops
          , idGen = idGenerator
          , inventory = Inventory.init (Inventory.Ground ground) heroWithDefaultEquipment.equipment
          , seed = seed__
          , messages = [ "Welcome to castle of the winds!" ]
          , difficulty = difficulty
          , windowSize = { width = 640, height = 640 }
          , viewport = { x = 0, y = 0 }
          , itemFactory = itemFactory_
          }
        , cmd
        )


monstersOnLevel : Model -> List Monster
monstersOnLevel model =
    model.maps
        |> Maps.currentLevel
        |> .monsters


updateKeyboard : Keyboard.Msg -> Model -> ( Model, Cmd Msg )
updateKeyboard keyboardMsg model =
    let
        atHeroPosition =
            (==) model.hero.position

        isOnStairs upOrDownStairs =
            Maps.currentLevel model.maps
                |> upOrDownStairs
                |> Maybe.map .position
                |> Maybe.map atHeroPosition
    in
        case keyboardMsg of
            KeyDir dir ->
                moveHero dir model
                    |> \( model, _ ) -> ( model, Cmd.none )

            Walk dir ->
                let
                    ( modelWithMovedHero, hasMoved ) =
                        moveHero dir model
                in
                    case hasMoved of
                        False ->
                            ( modelWithMovedHero, Cmd.none )

                        True ->
                            update (KeyboardMsg (Walk dir)) modelWithMovedHero

            Esc ->
                case model.currentScreen of
                    MapScreen ->
                        ( model, Cmd.none )

                    BuildingScreen _ ->
                        update (InventoryMsg <| Inventory.keyboardToInventoryMsg Esc) model

                    InventoryScreen ->
                        update (InventoryMsg <| Inventory.keyboardToInventoryMsg Esc) model

            Inventory ->
                let
                    ground =
                        getGroundAtHero model.hero model.maps
                in
                    ( { model
                        | currentScreen = InventoryScreen
                        , inventory = Inventory.init (Inventory.Ground ground) model.hero.equipment
                      }
                    , Cmd.none
                    )

            GoUpstairs ->
                case isOnStairs Level.upstairs of
                    Just True ->
                        let
                            map_ =
                                Maps.upstairs model.maps

                            heroAtTopOfStairs =
                                Maps.currentLevel map_
                                    |> Level.downstairs
                                    |> Maybe.map .position
                                    |> Maybe.map (flip Hero.teleport model.hero)
                                    |> Maybe.withDefault model.hero
                        in
                            ( { model
                                | maps = map_
                                , hero = heroAtTopOfStairs
                                , messages = "You climb back up the stairs" :: model.messages
                              }
                                |> updateViewportOffset
                            , Cmd.none
                            )

                    _ ->
                        ( { model | messages = "You need to be on some stairs!" :: model.messages }
                        , Cmd.none
                        )

            GoDownstairs ->
                case isOnStairs Level.downstairs of
                    Just True ->
                        let
                            ( newMap, seed_ ) =
                                Random.step (Maps.downstairs model.maps) model.seed

                            heroAtBottomOfStairs =
                                Maps.currentLevel newMap
                                    |> Level.upstairs
                                    |> Debug.log "upstairs"
                                    |> Maybe.map .position
                                    |> Maybe.map (flip Hero.teleport model.hero)
                                    |> Maybe.withDefault model.hero
                        in
                            ( { model
                                | maps = newMap
                                , hero = heroAtBottomOfStairs
                                , seed = seed_
                                , messages = "You go downstairs" :: model.messages
                              }
                                |> updateViewportOffset
                            , Cmd.none
                            )

                    _ ->
                        ( { model | messages = "You need to be on some stairs!" :: model.messages }
                        , Cmd.none
                        )

            Get ->
                let
                    maybeItems =
                        Maps.currentLevel model.maps
                            |> Level.getTile model.hero.position
                            |> Maybe.map Tile.ground
                            |> Maybe.map Container.list
                in
                    case maybeItems of
                        Nothing ->
                            ( model, Cmd.none )

                        Just items ->
                            ( pickup items model, Cmd.none )

            other ->
                let
                    _ =
                        Debug.log "Keyboard key not implemented yet" other
                in
                    ( model, Cmd.none )


pickup : List Item -> Model -> Model
pickup items model =
    let
        ( hero_, msgs, failedToPickup ) =
            List.foldl pickupReducer ( model.hero, [], [] ) (Debug.log "picking up: " items)

        failedToPickupWithPosition =
            List.map (\x -> ( hero_.position, x )) failedToPickup

        maps_ =
            Maps.currentLevel model.maps
                |> Level.updateGround hero_.position failedToPickup
                |> flip Maps.updateCurrentLevel model.maps
    in
        { model
            | hero = hero_
            , maps = maps_
            , messages = msgs ++ model.messages
        }


pickupReducer : Item -> ( Hero, List String, List Item ) -> ( Hero, List String, List Item )
pickupReducer item ( hero, messages, remainingItems ) =
    let
        ( equipment_, msg ) =
            Equipment.putInPack item hero.equipment

        hero_ =
            { hero | equipment = equipment_ }

        success =
            ( hero_, messages, remainingItems )
    in
        case msg of
            Equipment.Success ->
                success

            Equipment.ContainerMsg (Container.Ok) ->
                success

            other ->
                ( hero_, ("Failed to pick up item: " ++ toString other) :: messages, remainingItems )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        KeyboardMsg msg ->
            updateKeyboard msg model

        InventoryMsg msg ->
            let
                ( inventory_, maybeExitValues ) =
                    Inventory.update msg model.inventory
            in
                case maybeExitValues of
                    Nothing ->
                        ( { model | inventory = inventory_ }, Cmd.none )

                    Just ( equipment, merchant ) ->
                        let
                            modelWithHeroAndInventory =
                                { model
                                    | inventory = inventory_
                                    , hero = Hero.updateEquipment equipment model.hero
                                    , currentScreen = MapScreen
                                }
                        in
                            case merchant of
                                Inventory.Ground container ->
                                    let
                                        level_ =
                                            Level.updateGround model.hero.position (Container.list container) (Maps.currentLevel model.maps)

                                        maps_ =
                                            Maps.updateCurrentLevel level_ model.maps
                                    in
                                        ( { modelWithHeroAndInventory
                                            | maps = maps_
                                          }
                                        , Cmd.none
                                        )

                                Inventory.Shop shop ->
                                    ( { modelWithHeroAndInventory
                                        | shops = Shops.updateShop shop model.shops
                                      }
                                    , Cmd.none
                                    )

        MapsMsg msg ->
            ( { model | maps = Maps.update msg model.maps }, Cmd.none )

        WindowSize size ->
            ( { model | windowSize = size }, Cmd.none )

        ClickTile targetPosition ->
            let
                path =
                    findPath model.hero.position targetPosition model
            in
                update (PathTo path) model

        PathTo [] ->
            ( model, Cmd.none )

        PathTo (x :: xs) ->
            let
                dir =
                    Vector.sub x model.hero.position
                        |> Vector.toDirection

                walkRemainingPathTask =
                    Task.succeed xs

                ( model_, cmds_ ) =
                    update (KeyboardMsg (KeyDir dir)) model
            in
                ( model_
                , Cmd.batch
                    [ Task.perform PathTo walkRemainingPathTask
                    , cmds_
                    ]
                )


newMessage : String -> Model -> Model
newMessage msg model =
    { model | messages = msg :: model.messages }



--------------
-- Privates --
--------------


getGroundAtHero : Hero -> Maps.Model -> Container Item
getGroundAtHero hero maps =
    hero.position
        |> flip Maps.getTile maps
        |> Tile.ground



-- Collision


moveHero : Direction -> Model -> ( Model, Bool )
moveHero dir model =
    let
        ( modelWithHeroMoved, hasMoved ) =
            moveHero_ dir model
    in
        case hasMoved of
            False ->
                ( updateViewportOffset modelWithHeroMoved, False )

            _ ->
                modelWithHeroMoved
                    |> updateViewportOffset
                    |> (\m -> moveMonsters (monstersOnLevel m) [] m)
                    |> (\m -> ( m, True ))


moveHero_ : Direction -> Model -> ( Model, Bool )
moveHero_ dir model =
    let
        heroMoved =
            Hero.move dir model.hero
    in
        case queryPosition heroMoved.position model of
            ( _, _, Just monster, _ ) ->
                ( attackMonster monster model, False )

            -- entering a building
            ( _, Just building, _, _ ) ->
                ( enterBuilding building model, False )

            -- path blocked
            ( True, _, _, _ ) ->
                ( model, False )

            -- path free, moved
            ( False, _, _, _ ) ->
                ( { model | hero = heroMoved }, True )



-------------------------
-- Attacking a monster --
-- 1. Resolve combat   --
-- 2. Determine death  --
-- 3. Calculate loot   --
-------------------------


attackMonster : Monster -> Model -> Model
attackMonster monster ({ hero, seed, messages, maps } as model) =
    let
        monsters =
            monstersOnLevel model

        ( maybeMonster, seed_, combatMsg ) =
            resolveCombat hero monster seed

        monsters_ =
            case maybeMonster of
                Nothing ->
                    Monster.remove monster monsters

                Just monster ->
                    Monster.update monster monsters

        modelAfterCombat =
            { model
                | seed = seed_
                , maps = updateMonstersOnCurrentLevel monsters_ model.maps
                , messages = combatMsg :: messages
            }

        modelAfterCombatAndLoot =
            case maybeMonster of
                Just monster ->
                    modelAfterCombat

                Nothing ->
                    addLoot monster modelAfterCombat
    in
        modelAfterCombatAndLoot


resolveCombat : Hero -> Monster -> Seed -> ( Maybe Monster, Seed, String )
resolveCombat hero monster seed =
    let
        ( ( combatMsg, monsterAfterBeingHit ), seed_ ) =
            Random.step (Combat.attack hero monster) seed
    in
        if Stats.isDead monster.stats then
            ( Nothing, seed_, combatMsg )
        else
            ( Just monsterAfterBeingHit, seed_, combatMsg )


updateMonstersOnCurrentLevel : List Monster -> Maps.Model -> Maps.Model
updateMonstersOnCurrentLevel monsters maps =
    Maps.currentLevel maps
        |> (\level -> { level | monsters = monsters })
        |> (\level -> Maps.updateCurrentLevel level maps)


addLoot : Monster -> Model -> Model
addLoot monster model =
    let
        currentLevel =
            Maps.currentLevel model.maps

        ( loot, itemFactory_ ) =
            ItemFactory.make (ItemTypeCopper 1234) model.itemFactory

        currentLevel_ =
            Level.drop ( monster.position, loot ) currentLevel
    in
        { model
            | seed = model.seed
            , maps = Maps.updateCurrentLevel currentLevel_ model.maps
            , itemFactory = itemFactory_
        }


moveMonsters : List Monster -> List Monster -> Model -> Model
moveMonsters monsters movedMonsters ({ hero, maps, seed } as model) =
    case monsters of
        [] ->
            { model | maps = updateMonstersOnCurrentLevel movedMonsters maps }

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
                        model
                            |> attackHero monster
                            |> moveMonsters restOfMonsters (monster :: movedMonsters)

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


attackHero : Monster -> Model -> Model
attackHero monster ({ hero, seed, messages } as model) =
    let
        ( ( msg, heroAfterHit ), seed_ ) =
            Random.step (Combat.attack monster hero) seed
    in
        { model
            | messages = msg :: messages
            , hero = heroAfterHit
            , seed = seed_
        }


enterBuilding : Building -> Model -> Model
enterBuilding building ({ hero, maps } as model) =
    let
        modelWithHeroMoved =
            { model | hero = Hero.teleport building.position hero }
    in
        case Building.buildingType building of
            Building.Linked link ->
                { model
                    | maps = Maps.updateArea link.area maps
                    , hero = Hero.teleport link.position hero
                }

            Building.Shop shopType ->
                { model
                    | currentScreen = BuildingScreen building
                    , inventory = Inventory.init (Inventory.Shop <| Shops.shop shopType model.shops) hero.equipment
                }

            Building.Ordinary ->
                { model | currentScreen = BuildingScreen building }

            Building.StairUp ->
                modelWithHeroMoved

            Building.StairDown ->
                modelWithHeroMoved


{-| Given a position and a map, work out everything on the square
-}
queryPosition : Vector -> Model -> ( Bool, Maybe Building, Maybe Monster, Bool )
queryPosition pos ({ hero, maps } as model) =
    let
        monsters =
            monstersOnLevel model

        maybeTile =
            maps
                |> Maps.currentLevel
                |> Level.getTile pos

        level =
            Maps.currentLevel maps

        maybeBuilding =
            buildingAtPosition pos level.buildings

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


findPath : Vector -> Vector -> Model -> List Vector
findPath from to model =
    let
        path =
            AStar.findPath heuristic (neighbours model) from to
    in
        case path of
            Just path ->
                path

            _ ->
                []


pathMonster : Monster -> Hero -> Model -> Monster
pathMonster monster hero model =
    case findPath monster.position hero.position model of
        x :: _ ->
            { monster | position = x }

        _ ->
            monster


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


updateViewportOffset : Model -> Model
updateViewportOffset ({ windowSize, viewport, maps, hero } as model) =
    let
        tileSize =
            32

        ( curX, curY ) =
            Vector.scale tileSize (Hero.position hero)

        ( xOff, yOff ) =
            ( windowSize.width // 2, windowSize.height // 2 )

        tolerance =
            tileSize * 4

        scroll =
            { up = viewport.y + curY <= tolerance
            , down = viewport.y + curY >= (windowSize.height * 4 // 5) - tolerance
            , left = viewport.x + curX <= tolerance
            , right = viewport.x + curX >= windowSize.width - tolerance
            }

        ( mapWidth, mapHeight ) =
            (Level.size (Maps.currentLevel maps))

        newX =
            if scroll.left || scroll.right then
                clamp (windowSize.width - mapWidth * tileSize) 0 (xOff - curX)
            else
                viewport.x

        newY =
            if scroll.up || scroll.down then
                clamp (windowSize.height * 4 // 5 - mapHeight * tileSize) 0 (yOff - curY)
            else
                viewport.y
    in
        { model | viewport = { x = newX, y = newY } }


donDefaultGarb : ItemFactory -> Hero -> ( Hero, ItemFactory )
donDefaultGarb itemFactory hero =
    let
        equipmentToMake =
            [ ( Equipment.WeaponSlot, Item.Data.ItemTypeWeapon Dagger )
            , ( Equipment.ArmourSlot, Item.Data.ItemTypeArmour ScaleMail )
            , ( Equipment.ShieldSlot, Item.Data.ItemTypeShield LargeIronShield )
            , ( Equipment.HelmetSlot, Item.Data.ItemTypeHelmet LeatherHelmet )
            , ( Equipment.GauntletsSlot, Item.Data.ItemTypeGauntlets NormalGauntlets )
            , ( Equipment.BeltSlot, Item.Data.ItemTypeBelt ThreeSlotBelt )
            , ( Equipment.PurseSlot, Item.Data.ItemTypePurse )
            , ( Equipment.PackSlot, Item.Data.ItemTypePack MediumPack )
            ]

        makeEquipment ( slot, itemType ) ( accEquipment, itemFactory ) =
            let
                ( item, itemFactory_ ) =
                    ItemFactory.make itemType itemFactory
            in
                ( ( slot, item ) :: accEquipment, itemFactory_ )

        ( defaultEquipment, factoryAfterProduction ) =
            List.foldl makeEquipment ( [], itemFactory ) equipmentToMake

        equippingHero =
            Lib.foldResult (\item -> Hero.equip item) (Ok hero) defaultEquipment
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


view : Model -> Html Msg
view model =
    case model.currentScreen of
        MapScreen ->
            viewMap model

        BuildingScreen building ->
            case Building.buildingType building of
                Building.Shop shopType ->
                    Html.map InventoryMsg (Inventory.view model.inventory)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.map InventoryMsg (Inventory.view model.inventory)


viewMonsters : Model -> Html Msg
viewMonsters model =
    let
        monsters =
            model.maps
                |> Maps.currentLevel
                |> .monsters

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
                        , ( "top", px viewport.y )
                        , ( "left", px viewport.x )
                        ]
                    ]
                    html
                ]

        viewSize =
            ( windowSize.width // 32, windowSize.height // 32 )

        viewStart =
            ( abs <| viewport.x // 32, abs <| viewport.y // 32 )
    in
        div []
            [ viewMenu
            , viewQuickMenu
            , adjustViewport
                [ Maps.view ( viewStart, viewSize ) ClickTile model.maps
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
        , Sub.map KeyboardMsg (Keyboard.subscription)
        ]



--------------
-- Commands --
--------------


initialWindowSizeCmd : Cmd Msg
initialWindowSizeCmd =
    Task.perform (\x -> WindowSize x) Window.size



--------
-- UI --
--------


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ class "ui button" ] [ text txt ]
