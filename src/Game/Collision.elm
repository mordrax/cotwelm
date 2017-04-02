module Game.Collision
    exposing
        ( move
        , moveMonsters
        )

import Building exposing (Building)
import Game.Combat as Combat
import Game.Level as Level
import Game.Maps as Maps
import Game.Model exposing (Game, Screen(..))
import Game.Pathfinding as Pathfinding
import Hero exposing (Hero)
import Inventory exposing (Inventory)
import Item
import Item.Data
import Monster exposing (Monster)
import Random.Pcg as Random exposing (Seed)
import Shops exposing (Shops)
import Stats
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
            ( _, _, Just monster ) ->
                attack monster game

            -- entering a building
            ( _, Just building, _ ) ->
                enterBuilding building game

            -- path blocked
            ( True, _, _ ) ->
                game

            -- path free, moved
            ( False, _, _ ) ->
                { game | hero = heroMoved }



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
                , messages = combatMsg :: messages
            }
    in
        case resolvedMonster of
            Just monster ->
                modelAfterCombat

            Nothing ->
                addLoot monster modelAfterCombat


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


addLoot : Monster -> Game -> Game
addLoot monster ({ level } as game) =
    let
        loot =
            Item.new (Item.Data.ItemTypeCopper 1234)
    in
        { game
            | seed = game.seed
            , level = Level.drop ( monster.position, loot ) level
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
                    | currentScreen = BuildingScreen building
                    , inventory = Inventory.init (Inventory.Shop <| Shops.shop shopType game.shops) hero.equipment
                }

            Building.Ordinary ->
                { game | currentScreen = BuildingScreen building }

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
    in
        level.monsters
            |> sortByDistance
            |> List.foldl moveMonster game


moveMonster : Monster -> Game -> Game
moveMonster monster ({ hero, level } as game) =
    let
        movedMonster =
            pathMonster monster hero game

        obstructed monster =
            Level.queryPosition movedMonster.position level
    in
        if Vector.adjacent monster.position hero.position then
            attackHero monster game
        else if Level.obstructed movedMonster.position level then
            game
        else
            level.monsters
                |> Monster.replaceMoved monster movedMonster
                |> flip Level.setMonsters level
                |> flip Game.Model.setLevel game


pathMonster : Monster -> Hero -> Game -> Monster
pathMonster monster hero game =
    Pathfinding.findPath monster.position hero.position False game
        |> List.head
        |> Maybe.withDefault monster.position
        |> \newPosition -> { monster | position = newPosition }


attackHero : Monster -> Game -> Game
attackHero monster ({ hero, seed, messages } as game) =
    let
        ( ( msg, heroAfterHit ), seed_ ) =
            Random.step (Combat.attack monster hero) seed
    in
        { game
            | messages = msg :: messages
            , hero = heroAfterHit
            , seed = seed_
        }
