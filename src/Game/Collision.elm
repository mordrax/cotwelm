module Game.Collision
    exposing
        ( move
          --        , moveMonsters
        )

import Building exposing (Building)
import Game.Combat as Combat
import Game.Level as Level
import Game.Model exposing (Game, Screen(..))
import Hero exposing (Hero)
import Inventory exposing (Inventory)
import Item
import Item.Data
import Game.Maps as Maps
import Monster exposing (Monster)
import Random.Pcg as Random exposing (Seed)
import Shops exposing (Shops)
import Stats
import Utils.Direction exposing (Direction)


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



--                    |> Game.Model.setHeroMoved True
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
enterBuilding building ({ hero, level, maps } as model) =
    let
        teleportHero position model =
            { model | hero = Hero.setPosition position hero }

        --                |> Game.Model.setHeroMoved True
    in
        case building.buildingType of
            Building.Linked link ->
                Maps.saveLoadArea level link.area maps
                    |> (\( newLevel, maps ) ->
                            { model
                                | level = newLevel
                                , maps = maps
                                , hero = Hero.setPosition link.position hero
                            }
                       )

            Building.Shop shopType ->
                { model
                    | currentScreen = BuildingScreen building
                    , inventory = Inventory.init (Inventory.Shop <| Shops.shop shopType model.shops) hero.equipment
                }

            Building.Ordinary ->
                { model | currentScreen = BuildingScreen building }

            Building.StairUp ->
                teleportHero building.position model

            Building.StairDown ->
                teleportHero building.position model
