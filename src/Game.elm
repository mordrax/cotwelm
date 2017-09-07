module Game
    exposing
        ( Game
        , init
        , subscription
        , update
        , view
        )

import Building exposing (Building)
import Comms
import Container
import Equipment exposing (Equipment)
import Game.Collision as Collision
import Game.Level as Level exposing (Level)
import Game.Maps as Maps
import Game.Model exposing (Msg(..))
import Game.Pathfinding as Pathfinding
import Game.Render as Render
import Game.Types exposing (..)
import Hero exposing (Hero)
import Html exposing (Html)
import Input exposing (Input)
import Inventory exposing (Inventory)
import Item
import Item.Data exposing (..)
import Message
import Random.Pcg as Random exposing (Generator, Seed)
import Shops exposing (Shops)
import Stats exposing (Stats)
import Task exposing (perform)
import Types exposing (..)
import Utils.Direction as Direction exposing (Direction)
import Utils.Vector as Vector exposing (Vector)
import Window exposing (Size)


type alias Game =
    Game.Model.Game


type alias Msg =
    Game.Model.Msg


view : Game -> Html Msg
view =
    Render.game


init : Random.Seed -> Hero -> Difficulty -> ( Game, Cmd Msg )
init seed hero difficulty =
    let
        heroWithDefaultEquipment =
            donDefaultGarb hero

        ( shops, seed_ ) =
            Random.step Shops.init seed

        leatherArmour =
            Item.new (ItemTypeArmour LeatherArmour)

        maps =
            Maps.init leatherArmour

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
      , seed = seed_
      , messages = Message.addNeutral "Welcome to castle of the winds!" Message.init
      , difficulty = difficulty
      , windowSize = { width = 640, height = 640 }
      , viewport = { x = 0, y = 0 }
      , turn = Game.Model.initTurn
      , previousState = Game.Model.Empty
      , input = Input.init
      , lastMonsterToAttackHero = Nothing
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


isOnStairs : (Level -> Maybe Building) -> Vector -> Level -> Bool
isOnStairs upOrDownStairs position level =
    level
        |> upOrDownStairs
        |> Maybe.map (.position >> (==) position)
        |> Maybe.withDefault False



---------------
-- Game loop --
---------------
-- Game loop functions work on the game, so they must at the minimum take in
-- the current game state and return the new game state.
---------------


actionKeepOnWalking : Direction -> Game -> ( Game, Cmd Msg, Quit )
actionKeepOnWalking walkDirection game =
    case Game.Model.hasHeroMoved game of
        False ->
            ( game, Cmd.none, False )

        True ->
            update (GameAction (Walk walkDirection)) game


actionTakeStairs : Game -> Game
actionTakeStairs ({ level, hero, maps } as game) =
    let
        heroTakeStairs stairTile =
            stairTile
                |> Maybe.map (.position >> flip Hero.setPosition hero)
                |> Maybe.withDefault hero
    in
    if isOnStairs Level.upstairs hero.position game.level then
        let
            ( newLevel, newMaps ) =
                Maps.upstairs level maps
        in
        { game
            | maps = newMaps
            , level = newLevel
            , hero = heroTakeStairs (Level.downstairs newLevel)
            , messages = Message.addNeutral "You climb back up the stairs" game.messages
        }
    else if isOnStairs Level.downstairs hero.position game.level then
        let
            ( ( newLevel, newMaps ), seed_ ) =
                Random.step (Maps.downstairs level game.maps) game.seed
        in
        { game
            | maps = newMaps
            , level = newLevel
            , hero = heroTakeStairs (Level.upstairs newLevel)
            , seed = seed_
            , messages = Message.addNeutral "You go downstairs" game.messages
        }
    else
        { game | messages = Message.addNeutral "You need to be on some stairs!" game.messages }


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
        , messages = List.foldl Message.addNeutral game.messages pickMsgs
    }


checkHeroAlive : Game -> Game
checkHeroAlive ({ hero } as game) =
    if Stats.isDead hero.stats then
        { game | currentScreen = RipScreen }
    else
        game


updateFOV : Game -> Game
updateFOV ({ level, hero } as game) =
    Game.Model.setLevel (Level.updateFOV hero.position level) game


tick : Game -> Game
tick ({ maps, shops, hero, seed } as game) =
    let
        ( shops_, seed_ ) =
            Random.step (Shops.tick shops) seed
    in
    { game
        | maps = Maps.tick maps
        , shops = shops_
        , hero = Hero.tick hero
        , seed = seed_
        , messages = Message.tick game.messages
        , turn = game.turn + 1
    }



-- Updates


updateEquipmentAndMerchant : ( Equipment, Inventory.Merchant ) -> Game -> Game
updateEquipmentAndMerchant ( equipment, merchant ) ({ hero, shops, level } as game) =
    let
        game_ =
            { game
                | hero = Hero.setEquipment equipment hero
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


type alias Quit =
    Bool


update : Msg -> Game -> ( Game, Cmd Msg, Quit )
update msg ({ hero, level, inventory, currentScreen } as game) =
    let
        noCmd game =
            ( game, Cmd.none, False )

        withComms comms game =
            ( game, Comms.attempt comms, False )

        updatePreviousState newGameState =
            { newGameState | previousState = Game.Model.State game }
    in
    case msg of
        InputMsg inputMsg ->
            Input.update inputMsg game.input
                |> (\( input, action ) -> update (GameAction action) { game | input = input })

        GameAction (Move dir) ->
            game
                |> tick
                |> Collision.move dir
                |> Collision.autoOpenAnyDoorHeroIsOn
                |> updateFOV
                |> Collision.moveMonsters
                |> checkHeroAlive
                |> updatePreviousState
                |> Render.viewport
                |> noCmd

        GameAction (WaitATurn keepWaiting) ->
            let
                heroAlive =
                    not <| Stats.isDead game.hero.stats

                waitCmd =
                    if keepWaiting && Hero.injured game.hero && heroAlive then
                        Task.perform GameAction (Task.succeed (WaitATurn True))
                    else
                        Cmd.none
            in
            game
                |> tick
                |> Collision.moveMonsters
                |> checkHeroAlive
                |> updatePreviousState
                |> Render.viewport
                |> (\game_ -> ( game_, waitCmd, False ))

        -- we walk by first taking a step then working out if we will take another
        -- if we do take another step, then walk again, otherwise, do nothing
        GameAction (Walk dir) ->
            let
                ( nextStep, _, _ ) =
                    update (GameAction (Move dir)) game

                cmd =
                    if heroInterrupted nextStep dir then
                        Cmd.none
                    else
                        Task.perform GameAction (Task.succeed (Walk dir))
            in
            ( nextStep, cmd, False )

        GameAction (GoToScreen MapScreen) ->
            let
                updatedGameFromInventory inventory =
                    Inventory.exit inventory
                        |> (\( i, e, m ) ->
                                game
                                    |> Game.Model.setInventory i
                                    |> updateEquipmentAndMerchant ( e, m )
                           )

                backToMapScreen model =
                    { model | currentScreen = MapScreen }
            in
            case game.currentScreen of
                MapScreen ->
                    game
                        |> updatePreviousState
                        |> backToMapScreen
                        |> noCmd

                BuildingScreen _ ->
                    updatedGameFromInventory game.inventory
                        |> updatePreviousState
                        |> backToMapScreen
                        |> noCmd

                InventoryScreen ->
                    updatedGameFromInventory game.inventory
                        |> updatePreviousState
                        |> backToMapScreen
                        |> noCmd

                RipScreen ->
                    ( game, Cmd.none, True )

                CharacterInfoScreen ->
                    game
                        |> backToMapScreen
                        |> noCmd

        InventoryMsg msg ->
            let
                ( inventory_, comms ) =
                    Inventory.update msg game.inventory
            in
            { game
                | inventory = inventory_
                , messages = List.foldl Message.add game.messages comms.messages
            }
                |> updatePreviousState
                |> withComms (Comms.map InventoryMsg comms)

        GameAction OpenInventory ->
            let
                newInventory =
                    Level.ground hero.position level
                        |> Inventory.Ground
            in
            game
                |> Game.Model.setCurrentScreen InventoryScreen
                |> Game.Model.setInventory (Inventory.init newInventory hero.equipment)
                |> updatePreviousState
                |> noCmd

        GameAction GoUpstairs ->
            game
                |> tick
                |> actionTakeStairs
                |> updateFOV
                |> Render.viewport
                |> updatePreviousState
                |> noCmd

        GameAction GoDownstairs ->
            game
                |> tick
                |> actionTakeStairs
                |> updateFOV
                |> Render.viewport
                |> updatePreviousState
                |> noCmd

        GameAction Pickup ->
            game
                |> actionPickup
                |> updatePreviousState
                |> noCmd

        WindowSize size ->
            { game | windowSize = size }
                |> updatePreviousState
                |> noCmd

        ClickTile targetPosition ->
            let
                path =
                    Debug.log "Path: " (Pathfinding.findPathForClickNavigation hero.position targetPosition level)

                isClickStairs =
                    isOnStairs Level.upstairs targetPosition game.level
                        || isOnStairs Level.downstairs targetPosition game.level
            in
            update (PathTo path isClickStairs) game

        PathTo [] _ ->
            noCmd game

        PathTo (nextStep :: remainingSteps) isClickStairs ->
            let
                dir =
                    Vector.sub nextStep game.hero.position
                        |> Vector.toDirection

                ( modelAfterMovement, cmdsAfterMovement, _ ) =
                    update (GameAction (Move dir)) game

                isOnUpstairs =
                    isOnStairs Level.upstairs modelAfterMovement.hero.position modelAfterMovement.level

                isOnDownstairs =
                    isOnStairs Level.downstairs modelAfterMovement.hero.position modelAfterMovement.level

                isGoingUpstairs =
                    isClickStairs && isOnUpstairs

                isGoingDownstairs =
                    isClickStairs && isOnDownstairs
            in
            if isGoingUpstairs then
                update (GameAction GoUpstairs) modelAfterMovement
            else if isGoingDownstairs then
                update (GameAction GoDownstairs) modelAfterMovement
            else
                update (PathTo remainingSteps isClickStairs) modelAfterMovement

        Died ->
            noCmd { game | currentScreen = RipScreen }

        GameAction (GoToScreen CharacterInfoScreen) ->
            noCmd { game | currentScreen = CharacterInfoScreen }

        other ->
            let
                _ =
                    Debug.log "This combo of screen and msg has no effect" other
            in
            noCmd game


isNewArea : Game -> Bool
isNewArea game =
    case game.previousState of
        Game.Model.State prevGame ->
            prevGame.maps.currentArea /= game.maps.currentArea

        _ ->
            False



-- Interruptions


heroInterrupted : Game -> Direction -> Bool
heroInterrupted game direction =
    let
        nextPosition =
            Vector.add game.hero.position (Vector.fromDirection direction)
    in
    Debug.log "Tile has loot" (tileHasLoot game)
        || Debug.log "Monsters in sight" (monstersInSight game)
        || Debug.log "Next tile has obstruction" (Level.obstructed nextPosition game.level)


tileHasLoot : Game -> Bool
tileHasLoot ({ hero, level } as game) =
    let
        ( tile, _, _, _ ) =
            Level.queryPosition hero.position level
    in
    tile
        |> Maybe.map
            (.ground
                >> Container.list
                >> List.length
                >> (\x -> x > 0)
            )
        |> Maybe.withDefault False


monstersInSight : Game -> Bool
monstersInSight ({ hero, level } as game) =
    let
        inLineOfSight =
            (==) LineOfSight
    in
    List.any (.visible >> inLineOfSight) level.monsters



--------------
-- Privates --
--------------


subscription : Game -> Sub Msg
subscription model =
    Sub.batch
        [ Window.resizes (\x -> WindowSize x)
        , Sub.map InventoryMsg (Inventory.subscription model.inventory)
        , Sub.map InputMsg Input.subscription
        ]
