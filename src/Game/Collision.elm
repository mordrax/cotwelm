module Game.Collision
    exposing
        ( autoOpenAnyDoorHeroIsOn
        , move
        , moveMonsters
        , triggerTileEffects
        )

import Building exposing (Building)
import Game.Combat as Combat
import Game.Level as Level exposing (Level)
import Game.Loot as Loot
import Game.Maps as Maps
import Game.Model exposing (Game)
import Game.Pathfinding as Pathfinding
import Game.Types
import Hero exposing (Hero)
import Inventory exposing (Inventory)
import Message
import Monster exposing (Monster)
import Random.Pcg as Random exposing (Seed)
import Shops exposing (Shops)
import Stats
import Tile.Model exposing (Tile)
import Tile.Types
import Types exposing (..)
import Utils.Direction exposing (Direction)
import Utils.Vector as Vector exposing (Vector)


{-| Handles all logic to do with movements and collision of hero and monsters.
-}
type alias Moved =
    Bool


{-| Move the hero.

If moving into a monster, attack it.
If moving into a building (shop), change screen.
If moving into a building (gate, dungeon entrance) trigger a change of area.
If moving into a tile marked solid, stop the move.
Otherwise, free to move into square.

-}
move : Direction -> Game -> Game
move dir ({ level } as game) =
    let
        heroMoved =
            Hero.move dir game.hero
    in
    case Level.queryPosition heroMoved.position level of
        ( _, _, _, Just monster ) ->
            attack monster game

        -- entering a building
        ( _, _, Just building, _ ) ->
            enterBuilding building game

        -- path blocked
        ( _, True, _, _ ) ->
            game

        -- path free, moved
        ( _, False, _, _ ) ->
            { game | hero = heroMoved }


autoOpenAnyDoorHeroIsOn : Game -> Game
autoOpenAnyDoorHeroIsOn game =
    { game | level = Level.openDoor game.hero.position game.level }



---------------------------
-- Movement into monster --
---------------------------


attack : Monster -> Game -> Game
attack monster ({ hero, seed, messages, level } as model) =
    let
        ( resolvedMonster, seed_, combatMsg ) =
            resolveCombat hero monster seed

        monsters_ =
            resolvedMonster
                |> Maybe.map (flip Monster.replace level.monsters)
                |> Maybe.withDefault (Monster.remove monster level.monsters)

        modelAfterCombat =
            { model
                | seed = seed_
                , level = Level.setMonsters monsters_ level
                , messages = Message.addNeutral combatMsg messages
            }
    in
    case resolvedMonster of
        Just monster ->
            modelAfterCombat

        Nothing ->
            modelAfterCombat
                |> addLoot monster
                |> addExperience monster


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


addExperience : Monster -> Game -> Game
addExperience monster ({ hero } as game) =
    let
        hero_ =
            Hero.addExperience (monster.expLevel * 15) hero

        messages_ =
            if hero_.expLevel == hero.expLevel then
                game.messages
            else
                Message.addNeutral "You feel... Stronger!" game.messages
    in
    { game
        | hero = hero_
        , messages = messages_
    }


addLoot : Monster -> Game -> Game
addLoot monster ({ level, seed, hero } as game) =
    let
        ( loot, seed_ ) =
            Random.step Loot.generateMonsterDrop seed

        dropAtPosition loot level =
            Level.drop ( monster.position, loot ) level
    in
    { game
        | seed = seed_
        , level = List.foldl dropAtPosition level loot
    }



----------------------------
-- Movement into building --
----------------------------


enterBuilding : Building -> Game -> Game
enterBuilding building ({ hero, level, maps } as game) =
    let
        teleportHero position model =
            { model | hero = Hero.setPosition position hero }
    in
    case building.buildingType of
        Building.Linked link ->
            Maps.saveLoadArea level link.area maps
                |> (\( newLevel, newMaps ) ->
                        { game
                            | level = newLevel
                            , maps = newMaps
                            , hero = Hero.setPosition link.position hero
                        }
                   )

        Building.Shop shopType ->
            { game
                | currentScreen = Game.Types.BuildingScreen building
                , inventory = Inventory.init (Inventory.Shop <| Shops.shop shopType game.shops) hero.equipment
            }

        Building.Ordinary ->
            { game | currentScreen = Game.Types.BuildingScreen building }

        Building.StairUp ->
            teleportHero building.position game

        Building.StairDown ->
            teleportHero building.position game



----------------------
-- Monster movement --
----------------------


moveMonsters : Game -> Game
moveMonsters ({ hero, maps, level } as game) =
    let
        distance a b =
            Pathfinding.heuristic a.position b.position

        distanceToHero m1 m2 =
            if distance m1 hero > distance m2 hero then
                GT
            else
                LT

        sortByDistance monsters =
            List.sortWith distanceToHero monsters

        detectionDistance =
            10
    in
    level.monsters
        |> List.filter (\monster -> monster.visible /= Hidden)
        |> sortByDistance
        |> List.filter (\monster -> distance monster hero <= detectionDistance)
        |> List.foldl moveMonster game


moveMonster : Monster -> Game -> Game
moveMonster monster ({ hero } as game) =
    let
        ( newLevel, movedMonster ) =
            pathMonster monster hero game.level

        obstructed monster =
            Level.queryPosition movedMonster.position newLevel
    in
    if Vector.adjacent monster.position hero.position then
        attackHero monster game
    else
        case obstructed monster of
            ( _, True, _, _ ) ->
                game

            ( _, _, Just _, _ ) ->
                game

            ( _, _, _, Just _ ) ->
                game

            _ ->
                newLevel.monsters
                    |> Monster.replaceMoved monster movedMonster
                    |> flip Level.setMonsters newLevel
                    |> flip Game.Model.setLevel game


pathMonster : Monster -> Hero -> Level -> ( Level, Monster )
pathMonster monster hero level =
    let
        monsterFollowPath m path =
            path
                |> List.head
                |> Maybe.map (\step -> { monster | position = step })
                |> Maybe.withDefault m
    in
    Pathfinding.findPath monster.position hero.position level
        |> (\( newLevel, path ) -> ( newLevel, monsterFollowPath monster path ))


attackHero : Monster -> Game -> Game
attackHero monster ({ hero, seed, messages } as game) =
    let
        ( ( msg, heroAfterHit ), seed_ ) =
            Random.step (Combat.attack monster hero) seed
    in
    { game
        | messages = Message.addNeutral msg messages
        , hero = heroAfterHit
        , seed = seed_
        , lastMonsterToAttackHero = Just monster
    }


triggerTileEffects : Game -> Game
triggerTileEffects ({ hero, level } as game) =
    let
        ( maybeTile, _, maybeBuilding, maybeMonster ) =
            Level.queryPosition hero.position level
    in
    maybeTile
        |> Maybe.map (flip tileEffect game)
        |> Maybe.withDefault game


tileEffect : Tile -> Game -> Game
tileEffect tile game =
    if tile.type_ == Tile.Types.Sign then
        { game | messages = Message.addNeutral (Debug.log "tile description: " tile).description game.messages }
    else
        game
