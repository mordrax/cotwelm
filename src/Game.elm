module Game
    exposing
        ( Msg
        , init
        , update
        , view
        , subscription
        )

import AStar
import Game.Combat as Combat
import Dict
import Equipment exposing (Equipment)
import Keymap
import Maps
import Building exposing (Building)
import Types exposing (..)
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes exposing (class, style)
import Item exposing (Item)
import Item.Data exposing (..)
import Level exposing (Level)
import Monster exposing (Monster)
import Inventory exposing (Inventory)
import Random.Pcg as Random exposing (Generator, Seed)
import Set exposing (Set)
import Shops exposing (Shops)
import Stats exposing (Stats)
import Task exposing (perform)
import Tile exposing (Tile)
import Utils.Direction as Direction exposing (Direction)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)
import Window exposing (Size)
import Container exposing (Container)
import Game.Model exposing (Game, Screen(..))
import Game.Collision as Collision
import Game.Render as Render
import Game.FOV as FOV
import Game.Level as Level

type Msg
    = KeyboardMsg Keymap.Msg
    | InventoryMsg (Inventory.Msg Inventory.Draggable Inventory.Droppable)
    | WindowSize Window.Size
    | ClickTile Vector
    | PathTo (List Vector)



init : Random.Seed -> Hero -> Difficulty -> ( Game, Cmd Msg )
init seed hero difficulty =
    let
        heroWithDefaultEquipment =
            donDefaultGarb hero

        ( shops, seed_ ) =
            Shops.init seed

        leatherArmour =
            Item.new (ItemTypeArmour LeatherArmour)

        ( maps, seed__ ) =
            Maps.init leatherArmour seed_

        cmd =
            Task.perform (\x -> WindowSize x) Window.size

        ground =
            getGroundAtHero heroWithDefaultEquipment level
    in
        ( { name = "A new game"
          , hero = heroWithDefaultEquipment
          , maps = maps
          , currentScreen = MapScreen
          , shops = shops
          , inventory = Inventory.init (Inventory.Ground ground) heroWithDefaultEquipment.equipment
          , seed = seed__
          , messages = [ "Welcome to castle of the winds!" ]
          , difficulty = difficulty
          , windowSize = { width = 640, height = 640 }
          , viewport = { x = 0, y = 0 }
          , turn = Game.Model.initTurn
          }
        , cmd
        )


donDefaultGarb : Hero -> Hero
donDefaultGarb hero =
    let
        defaultEquipment =
            Equipment.setMany_
                [ ( Equipment.WeaponSlot, Item.new <| Item.Data.ItemTypeWeapon Item.Data.Dagger )
                , ( Equipment.ArmourSlot, Item.new <| Item.Data.ItemTypeArmour Item.Data.ScaleMail )
                , ( Equipment.ShieldSlot, Item.new <| Item.Data.ItemTypeShield Item.Data.LargeIronShield )
                , ( Equipment.HelmetSlot, Item.new <| Item.Data.ItemTypeHelmet Item.Data.LeatherHelmet )
                , ( Equipment.GauntletsSlot, Item.new <| Item.Data.ItemTypeGauntlets Item.Data.NormalGauntlets )
                , ( Equipment.BeltSlot, Item.new <| Item.Data.ItemTypeBelt Item.Data.ThreeSlotBelt )
                , ( Equipment.PurseSlot, Item.new <| Item.Data.ItemTypePurse )
                , ( Equipment.PackSlot, Item.new <| Item.Data.ItemTypePack Item.Data.MediumPack )
                ]
                Equipment.init
    in
        { hero | equipment = defaultEquipment }


monstersOnLevel : Game -> List Monster
monstersOnLevel model =
    model.maps
        |> Maps.currentLevel
        |> .monsters


isOnStairs : (Level -> Maybe Building) -> Game -> Bool
isOnStairs upOrDownStairs model =
    let
        atHeroPosition =
            (==) model.hero.position
    in
        Maps.currentLevel model.maps
            |> upOrDownStairs
            |> Maybe.map .position
            |> Maybe.map atHeroPosition
            |> Maybe.withDefault False


updateKeyboard : Keymap.Msg -> Game -> ( Game, Cmd Msg )
updateKeyboard keyboardMsg model =
    case keyboardMsg of
        Keymap.KeyDir dir ->
            actionMovement dir model
                |> \( model, _ ) -> ( model, Cmd.none )

        Keymap.Walk dir ->
            let
                ( modelWithMovedHero, hasMoved ) =
                    actionMovement dir model
            in
                case Debug.log "Walking: " hasMoved of
                    False ->
                        ( modelWithMovedHero, Cmd.none )

                    True ->
                        update (KeyboardMsg (Keymap.Walk dir)) modelWithMovedHero

        Keymap.Esc ->
            case model.currentScreen of
                MapScreen ->
                    ( model, Cmd.none )

                BuildingScreen _ ->
                    update (InventoryMsg <| Inventory.keyboardToInventoryMsg Keymap.Esc) model

                InventoryScreen ->
                    update (InventoryMsg <| Inventory.keyboardToInventoryMsg Keymap.Esc) model

        Keymap.Inventory ->
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

        Keymap.GoUpstairs ->
            case isOnStairs Level.upstairs model of
                True ->
                    let
                        map_ =
                            Maps.upstairs model.maps

                        heroAtTopOfStairs =
                            Maps.currentLevel map_
                                |> Level.downstairs
                                |> Maybe.map .position
                                |> Maybe.map (flip Hero.setPosition model.hero)
                                |> Maybe.withDefault model.hero
                    in
                        ( { model
                            | maps = map_
                            , hero = heroAtTopOfStairs
                            , messages = "You climb back up the stairs" :: model.messages
                          }
                          |> Game.Model.setHeroMoved True
                        , Cmd.none
                        )

                False ->
                    ( { model | messages = "You need to be on some stairs!" :: model.messages }
                    , Cmd.none
                    )

        Keymap.GoDownstairs ->
            case isOnStairs Level.downstairs model of
                True ->
                    let
                        ( newMap, seed_ ) =
                            Random.step (Maps.downstairs model.maps) model.seed

                        heroAtBottomOfStairs =
                            Maps.currentLevel newMap
                                |> Level.upstairs
                                |> Debug.log "upstairs"
                                |> Maybe.map .position
                                |> Maybe.map (flip Hero.setPosition model.hero)
                                |> Maybe.withDefault model.hero
                    in
                        ( { model
                            | maps = newMap
                            , hero = heroAtBottomOfStairs
                            , seed = seed_
                            , messages = "You go downstairs" :: model.messages
                          }
                          |> Game.Model.setHeroMoved True
                        , Cmd.none
                        )

                False ->
                    ( { model | messages = "You need to be on some stairs!" :: model.messages }
                    , Cmd.none
                    )

        Keymap.Get ->
            let
                maybeItems =
                    Maps.currentLevel model.maps
                        |> Level.tileAtPosition model.hero.position
                        |> Maybe.map .ground
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


pickup : List Item -> Game -> Game
pickup items model =
    let
        ( hero_, msgs, failedToPickup ) =
            List.foldl pickupReducer ( model.hero, [], [] ) (Debug.log "picking up: " items)

        failedToPickupWithPosition =
            List.map (\x -> ( hero_.position, x )) failedToPickup

        maps_ =
            Maps.currentLevel model.maps
                |> Level.updateGround hero_.position failedToPickup
                |> flip Maps.setLevel model.maps
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
                ( hero_, ("Failed to pick up item: " ++ toString other) :: messages, item :: remainingItems )


update : Msg -> Game -> ( Game, Cmd Msg )
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
                                    , hero = Hero.setEquipment equipment model.hero
                                    , currentScreen = MapScreen
                                }
                        in
                            case merchant of
                                Inventory.Ground container ->
                                    let
                                        level_ =
                                            Level.updateGround model.hero.position (Container.list container) (Maps.currentLevel model.maps)

                                        maps_ =
                                            Maps.setLevel level_ model.maps
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

        WindowSize size ->
            ( { model | windowSize = size }, Cmd.none )

        ClickTile targetPosition ->
            let
                path =
                    Debug.log "Path: " (findPath model.hero.position targetPosition True model)
            in
                update (PathTo path) model

        PathTo [] ->
            ( model, Cmd.none )

        PathTo (nextStep :: remainingSteps) ->
            let
                dir =
                    Vector.sub nextStep model.hero.position
                        |> Vector.toDirection

                currentTile =
                    Level.getTile nextStep model.level

                ( modelAfterMovement, cmdsAfterMovement ) =
                    update (KeyboardMsg (Keymap.KeyDir dir)) model
            in
                case ( remainingSteps, isOnStairs Level.upstairs modelAfterMovement, isOnStairs Level.downstairs modelAfterMovement ) of
                    ( [], True, _ ) ->
                        update (KeyboardMsg Keymap.GoUpstairs) modelAfterMovement

                    ( [], _, True ) ->
                        update (KeyboardMsg Keymap.GoDownstairs) modelAfterMovement

                    _ ->
                        update (PathTo remainingSteps) modelAfterMovement


newMessage : String -> Game -> Game
newMessage msg model =
    { model | messages = msg :: model.messages }



--------------
-- Privates --
--------------


getGroundAtHero : Hero -> Level -> Container Item
getGroundAtHero hero level =
    hero.position
        |> flip Level.getTile level
        |> .ground



-- Collision


updateCurrentLevelFOV : Game -> Game
updateCurrentLevelFOV model =
    Level.updateFOV model.hero.position (Maps.currentLevel model.maps)
        |> (\level -> { model | maps = Maps.setLevel level model.maps })


type alias HeroPositionChanged =
    Bool


actionMovement : Direction -> Game -> ( Game, HeroPositionChanged )
actionMovement dir game =
    let
        ( modelWithHeroMoved, heroPositionChanged ) =
            moveHero_ dir game
    in
        game
        |> Collision.move dir
        |> Collision.moveMonsters (monstersOnLevel game) [] game
        |> FOV.fov
        |> Render.viewport



moveMonsters : List Monster -> List Monster -> Game -> Game
moveMonsters monsters movedMonsters ({ hero, maps } as model) =
    case monsters of
        [] ->
            { model | maps = updateMonstersOnCurrentLevel movedMonsters maps }

        monster :: restOfMonsters ->
            let
                movedMonster =
                    pathMonster monster hero model

                obstructions =
                    Level.queryPosition movedMonster.position (Maps.currentLevel model.maps)

                isObstructedByMovedMonsters =
                    isMonsterObstruction movedMonster movedMonsters

                movedIntoHero =
                    movedMonster.position == hero.position
            in
                case ( obstructions, movedIntoHero ) of
                    -- hit hero
                    ( _, True ) ->
                        model
                            |> attackHero monster
                            |> moveMonsters restOfMonsters (monster :: movedMonsters)

                    ( ( True, _, _ ), _ ) ->
                        moveMonsters restOfMonsters (monster :: movedMonsters) model

                    ( ( _, Just _, _ ), _ ) ->
                        moveMonsters restOfMonsters (monster :: movedMonsters) model

                    ( ( _, _, Just _ ), _ ) ->
                        moveMonsters restOfMonsters (monster :: movedMonsters) model

                    _ ->
                        if isObstructedByMovedMonsters then
                            moveMonsters restOfMonsters (monster :: movedMonsters) model
                        else
                            moveMonsters restOfMonsters (movedMonster :: movedMonsters) model






attackHero : Monster -> Game -> Game
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




{-| Given a position and a map, work out everything on the square
-}
type alias TileObstruction =
    Bool


type alias HeroObstruction =
    Bool



-----------------
-- Pathfinding --
-----------------


findPath : Vector -> Vector -> Bool -> Game -> List Vector
findPath from to ignoreObstructions model =
    let
        neighboursFunction =
            if ignoreObstructions then
                neighboursIncludeBuildings
            else
                neighbours
    in
        AStar.findPath heuristic (neighboursFunction model) from to
            |> Maybe.withDefault []


pathMonster : Monster -> Hero -> Game -> Monster
pathMonster monster hero model =
    findPath monster.position hero.position False model
        |> List.head
        |> Maybe.withDefault monster.position
        |> \newPosition -> { monster | position = newPosition }


{-| Manhattan but counts diagonal cost as one (since you can move diagonally)
-}
heuristic : Vector -> Vector -> Float
heuristic start end =
    let
        ( dx, dy ) =
            Vector.sub start end
    in
        (dx ^ 2 + dy ^ 2)
            |> toFloat
            |> sqrt


neighbours_ : Game -> Vector -> (Vector -> Bool) -> Set Vector
neighbours_ model position isObstructedFilter =
    position
        |> Vector.neighbours
        |> List.filter isObstructedFilter
        |> Set.fromList


neighboursIncludeBuildings : Game -> Vector -> Set Vector
neighboursIncludeBuildings model position =
    let
        isObstructedFilter pos =
            case ( Level.queryPosition pos (Maps.currentLevel model.maps), position == model.hero.position ) of
                ( ( False, _, Nothing ), True ) ->
                    True

                _ ->
                    False
    in
        neighbours_ model position isObstructedFilter


neighbours : Game -> Vector -> Set Vector
neighbours model position =
    let
        obstructionFilter vector =
            not (isObstructed vector model)
    in
        neighbours_ model position obstructionFilter


isObstructed : Vector -> Game -> Bool
isObstructed position model =
    case Level.queryPosition position (Maps.currentLevel model.maps) of
        ( False, Nothing, Nothing ) ->
            False

        _ ->
            True


isMonsterObstruction : Monster -> List Monster -> Bool
isMonsterObstruction monster monsters =
    List.any (.position >> (==) monster.position) monsters


----------
-- View --
----------


view : Game -> Html Msg
view model =
    case model.currentScreen of
        MapScreen ->
            viewMap model

        BuildingScreen building ->
            case building.buildingType of
                Building.Shop shopType ->
                    Html.map InventoryMsg (Inventory.view model.inventory)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.map InventoryMsg (Inventory.view model.inventory)


viewMonsters : Game -> Html Msg
viewMonsters model =
    model
        |> monstersOnLevel
        |> List.filter (.visible >> (==) LineOfSight)
        |> List.map Monster.view
        |> div []


viewMap : Game -> Html Msg
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
                [ Level.view ( viewStart, viewSize ) ClickTile model.level
                , Hero.view model.hero
                , viewMonsters model
                ]
            , viewStatus model
            ]


viewStatus : Game -> Html Msg
viewStatus model =
    div []
        [ div [ class "ui padded grid" ]
            [ div [ style [ ( "overflow", "auto" ), ( "height", "100px" ) ], class "ui twelve wide column" ]
                [ viewMessages model ]
            , div [ class "ui four wide column" ]
                [ Hero.viewStats model.hero ]
            ]
        ]


viewMessages : Game -> Html Msg
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


viewHUD : Game -> Html Msg
viewHUD model =
    div [] [ text "messages" ]


viewBuilding : Building -> Html Msg
viewBuilding building =
    div [] [ h1 [] [ text "TODO: Get the internal view of the building" ] ]


subscription : Game -> Sub Msg
subscription model =
    Sub.batch
        [ Window.resizes (\x -> WindowSize x)
        , Sub.map InventoryMsg (Inventory.subscription model.inventory)
        , Sub.map KeyboardMsg (Keymap.subscription)
        ]



--------
-- UI --
--------


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ class "ui button" ] [ text txt ]
