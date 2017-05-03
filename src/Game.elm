module Game
    exposing
        ( Game
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
import Game.Model exposing (Msg(..))
import Game.Render as Render
import Game.Types exposing (..)
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes exposing (class, style)
import Inventory exposing (Inventory)
import Item
import Item.Data exposing (..)
import Input exposing (Input)
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
import Game.Pathfinding as Pathfinding


type alias Game =
    Game.Model.Game


type alias Msg =
    Game.Model.Msg


view =
    Render.game


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
          , input = Input.init
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


actionMove : Direction -> Game -> Game
actionMove dir ({ level } as game) =
    game
        |> Collision.move dir
        |> Collision.autoOpenAnyDoorHeroIsOn
        |> updateFOV
        |> Collision.moveMonsters
        |> Render.viewport


actionKeepOnWalking : Direction -> Game -> ( Game, Cmd Msg )
actionKeepOnWalking walkDirection game =
    case Game.Model.hasHeroMoved game of
        False ->
            ( game, Cmd.none )

        True ->
            update (GameAction (Walk walkDirection)) game


actionTakeStairs : Game -> Game
actionTakeStairs ({ level, hero, maps } as game) =
    let
        heroTakeStairs stairTile =
            stairTile
                |> Maybe.map (.position >> (flip Hero.setPosition hero))
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
                    , messages = "You climb back up the stairs" :: game.messages
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


tick : Game -> Game
tick ({ maps, shops, hero, seed } as game) =
    let
        ( shops_, seed_ ) =
            Shops.tick shops seed
    in
        { game
            | maps = Maps.tick maps
            , shops = shops_
            , hero = Hero.tick hero
            , seed = seed_
        }



-- Updates


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
update msg ({ hero, level, inventory, currentScreen } as game) =
    let
        noCmd =
            flip (,) Cmd.none

        updatePreviousState modifiedGameState =
            Game.Model.setPreviousState (Game.Model.State game) modifiedGameState
    in
        case msg of
            InputMsg inputMsg ->
                Input.update inputMsg game.input
                    |> \( input, action ) -> update (GameAction action) { game | input = input }

            GameAction (Move dir) ->
                game
                    |> tick
                    |> actionMove dir
                    |> updatePreviousState
                    |> noCmd

            GameAction (Walk dir) ->
                if isNewArea game then
                    ( game, Cmd.none )
                else
                    game
                        |> tick
                        |> actionMove dir
                        |> updatePreviousState
                        |> actionKeepOnWalking dir

            GameAction BackToMapScreen ->
                let
                    updatedGameFromInventory inventory =
                        Inventory.exit inventory
                            |> (\( i, e, m ) ->
                                    game
                                        |> Game.Model.setInventory i
                                        |> updateEquipmentAndMerchant ( e, m )
                               )
                in
                    case game.currentScreen of
                        MapScreen ->
                            game
                                |> updatePreviousState
                                |> noCmd

                        BuildingScreen _ ->
                            updatedGameFromInventory game.inventory
                                |> updatePreviousState
                                |> noCmd

                        InventoryScreen ->
                            updatedGameFromInventory game.inventory
                                |> updatePreviousState
                                |> noCmd

            InventoryMsg msg ->
                { game | inventory = Inventory.update msg game.inventory }
                    |> updatePreviousState
                    |> noCmd

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
                        (isOnStairs Level.upstairs targetPosition game.level)
                            || (isOnStairs Level.downstairs targetPosition game.level)
                in
                    update (PathTo path isClickStairs) game

            PathTo [] _ ->
                ( game, Cmd.none )

            PathTo (nextStep :: remainingSteps) isClickStairs ->
                let
                    dir =
                        Vector.sub nextStep game.hero.position
                            |> Vector.toDirection

                    ( modelAfterMovement, cmdsAfterMovement ) =
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

            other ->
                let
                    _ =
                        Debug.log "This combo of screen and msg has no effect" other
                in
                    ( game, Cmd.none )


isNewArea : Game -> Bool
isNewArea game =
    case game.previousState of
        Game.Model.State prevGame ->
            prevGame.maps.currentArea /= game.maps.currentArea

        _ ->
            False



--------------
-- Privates --
--------------


subscription : Game -> Sub Msg
subscription model =
    Sub.batch
        [ Window.resizes (\x -> WindowSize x)
        , Sub.map InventoryMsg (Inventory.subscription model.inventory)
        , Sub.map InputMsg (Input.subscription)
        ]
