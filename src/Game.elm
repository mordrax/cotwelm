module Game
    exposing
        ( Msg
        , init
        , update
        , view
        , subscription
        )

import AStar
import Building exposing (Building)
import Container exposing (Container)
import Dict
import Equipment exposing (Equipment)
import Game.Collision as Collision
import Game.Combat as Combat
import Game.FOV as FOV
import Game.Level as Level exposing (Level)
import Game.Maps as Maps
import Game.Model exposing (Game, Screen(..))
import Game.Render as Render
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes exposing (class, style)
import Inventory exposing (Inventory)
import Item exposing (Item)
import Item.Data exposing (..)
import Keymap
import Monster exposing (Monster)
import Random.Pcg as Random exposing (Generator, Seed)
import Set exposing (Set)
import Shops exposing (Shops)
import Stats exposing (Stats)
import Task exposing (perform)
import Tile exposing (Tile)
import Types exposing (..)
import Utils.Direction as Direction exposing (Direction)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)
import Window exposing (Size)


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

        level =
            Maps.getCurrentLevel maps

        cmd =
            Task.perform (\x -> WindowSize x) Window.size
    in
        ( { name = "A new game"
          , hero = heroWithDefaultEquipment
          , maps = maps
          , currentScreen = MapScreen
          , shops = shops
          , level = level
          , inventory = Inventory.init (Inventory.Ground []) Equipment.init
          , seed = seed__
          , messages = [ "Welcome to castle of the winds!" ]
          , difficulty = difficulty
          , windowSize = { width = 640, height = 640 }
          , viewport = { x = 0, y = 0 }
          , turn = Game.Model.initTurn
          , previousState = Game.Model.Empty
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
        |> Maps.getCurrentLevel
        |> .monsters


isOnStairs : (Level -> Maybe Building) -> Game -> Bool
isOnStairs upOrDownStairs ({ hero, level } as game) =
    let
        atHeroPosition =
            (==) hero.position
    in
        level
            |> upOrDownStairs
            |> Maybe.map (.position >> (==) hero.position)
            |> Maybe.withDefault False



---------------
-- Game loop --
---------------
-- Game loop functions work on the game, so they must at the minimum take in
-- the current game state and return the new game state.
---------------


actionMove : Direction -> Game -> Game
actionMove dir game =
    game
        |>
            Collision.move dir
        |>
            updateFOV
        --        |> Collision.moveMonsters (monstersOnLevel game) [] game
        |>
            Render.viewport


actionKeepOnWalking : Direction -> Game -> ( Game, Cmd Msg )
actionKeepOnWalking walkDirection game =
    case Game.Model.hasHeroMoved game of
        False ->
            ( game, Cmd.none )

        True ->
            update (KeyboardMsg (Keymap.Walk walkDirection)) game


actionTakeStairs : Game -> Game
actionTakeStairs ({ level, hero, maps } as game) =
    let
        maybeMoveHero stairTile =
            stairTile
                |> Maybe.map (.position >> (flip Hero.setPosition hero))
                |> Maybe.withDefault hero
    in
        if isOnStairs Level.upstairs game then
            let
                ( newLevel, newMaps ) =
                    Maps.upstairs level maps
            in
                { game
                    | maps = newMaps
                    , level = newLevel
                    , hero = maybeMoveHero (Level.downstairs newLevel)
                    , messages = "You climb back up the stairs" :: game.messages
                }
        else if isOnStairs Level.downstairs game then
            let
                ( ( newLevel, newMaps ), seed_ ) =
                    Random.step (Maps.downstairs level game.maps) game.seed
            in
                { game
                    | maps = newMaps
                    , level = newLevel
                    , hero = maybeMoveHero (Level.upstairs newLevel)
                    , seed = seed_
                    , messages = "You go downstairs" :: game.messages
                }
        else
            { game | messages = "You need to be on some stairs!" :: game.messages }


actionPickup : Game -> Game
actionPickup ({ hero, level } as game) =
    let
        ( levelAfterPickup, items ) =
            Level.pickup hero.position level

        ( heroWithItems, leftOverItems, pickMsgs ) =
            Hero.pickup items hero

        levelWithLeftOvers =
            Level.drops ( hero.position, leftOverItems ) levelAfterPickup
    in
        { game
            | level = levelWithLeftOvers
            , hero = heroWithItems
            , messages = pickMsgs ++ game.messages
        }


updateFOV : Game -> Game
updateFOV ({ level, hero } as game) =
    Game.Model.setLevel (Level.updateFOV hero.position level) game



-- Updates


updateKeyboard : Keymap.Msg -> Game -> ( Game, Cmd Msg )
updateKeyboard keyboardMsg ({ hero, level, maps } as game) =
    let
        noCmd =
            flip (,) Cmd.none
    in
        case keyboardMsg of
            Keymap.KeyDir dir ->
                game
                    |> actionMove dir
                    |> noCmd

            Keymap.Walk dir ->
                game
                    |> actionMove dir
                    |> actionKeepOnWalking dir

            Keymap.Esc ->
                case game.currentScreen of
                    MapScreen ->
                        ( game, Cmd.none )

                    BuildingScreen _ ->
                        update (InventoryMsg <| Inventory.keyboardToInventoryMsg Keymap.Esc) game

                    InventoryScreen ->
                        update (InventoryMsg <| Inventory.keyboardToInventoryMsg Keymap.Esc) game

            Keymap.Inventory ->
                let
                    ground =
                        Level.ground hero.position level
                in
                    ( { game
                        | currentScreen = InventoryScreen
                        , inventory = Inventory.init (Inventory.Ground ground) hero.equipment
                      }
                    , Cmd.none
                    )

            Keymap.GoUpstairs ->
                game
                    |> actionTakeStairs
                    |> updateFOV
                    |> Render.viewport
                    |> noCmd

            Keymap.GoDownstairs ->
                game
                    |> actionTakeStairs
                    |> updateFOV
                    |> Render.viewport
                    |> noCmd

            Keymap.Get ->
                game
                    |> actionPickup
                    |> noCmd

            other ->
                let
                    _ =
                        Debug.log "Keyboard key not implemented yet" other
                in
                    ( game, Cmd.none )


updateEquipmentAndMerchant : ( Equipment, Inventory.Merchant ) -> Game -> Game
updateEquipmentAndMerchant ( equipment, merchant ) ({ hero, shops, level } as game) =
    let
        game_ =
            { game
                | hero = Hero.setEquipment equipment hero
                , currentScreen = MapScreen
            }

        updateLevel items =
            Level.updateGround hero.position items level

        updateShop shop =
            Shops.updateShop shop game.shops
    in
        case merchant of
            Inventory.Ground items ->
                Game.Model.setLevel (updateLevel items) game_

            Inventory.Shop shop ->
                Game.Model.setShops (updateShop shop) game_


update : Msg -> Game -> ( Game, Cmd Msg )
update msg ({ hero, level, inventory } as previousGameState) =
    let
        noCmd =
            flip (,) Cmd.none

        game =
            Game.Model.setPreviousState previousGameState previousGameState
    in
        case msg of
            KeyboardMsg msg ->
                updateKeyboard msg game

            InventoryMsg msg ->
                let
                    ( inventory_, exitInventoryValues ) =
                        Inventory.update msg inventory

                    gameWithInventoryUpdate =
                        { game | inventory = inventory_ }
                in
                    exitInventoryValues
                        |> Maybe.map (flip updateEquipmentAndMerchant gameWithInventoryUpdate)
                        |> Maybe.withDefault gameWithInventoryUpdate
                        |> noCmd

            WindowSize size ->
                ( { game | windowSize = size }, Cmd.none )

            ClickTile targetPosition ->
                let
                    path =
                        Debug.log "Path: " (findPath game.hero.position targetPosition True game)
                in
                    update (PathTo path) game

            PathTo [] ->
                ( game, Cmd.none )

            PathTo (nextStep :: remainingSteps) ->
                let
                    dir =
                        Vector.sub nextStep game.hero.position
                            |> Vector.toDirection

                    ( modelAfterMovement, cmdsAfterMovement ) =
                        update (KeyboardMsg (Keymap.KeyDir dir)) game
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
-- Collision


type alias HeroPositionChanged =
    Bool


moveMonsters : List Monster -> List Monster -> Game -> Game
moveMonsters monsters movedMonsters ({ hero, maps, level } as model) =
    case monsters of
        [] ->
            { model | level = Level.setMonsters movedMonsters level }

        monster :: restOfMonsters ->
            let
                movedMonster =
                    pathMonster monster hero model

                obstructions =
                    Level.queryPosition movedMonster.position (Maps.getCurrentLevel model.maps)

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
            case ( Level.queryPosition pos (Maps.getCurrentLevel model.maps), position == model.hero.position ) of
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
    case Level.queryPosition position (Maps.getCurrentLevel model.maps) of
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
