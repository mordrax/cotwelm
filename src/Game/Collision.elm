module Game.Collision exposing (..)

{-| This module handles all movement inputs and will move players, trigger new areas, shop screens, down stairs etc.
-}

import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.CompassDirection as CompassDirection exposing (CompassDirection)
import Game.Data exposing (..)
import Game.Keyboard exposing (..)
import Game.Maps as Maps exposing (..)
import Tile exposing (..)
import GameData.Building as Building exposing (..)
import Monster.Monster as Monster exposing (..)
import Shop.Shop as Shop exposing (..)
import Hero.Hero as Hero exposing (Hero)
import Combat exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)
import Stats exposing (..)
import AStar exposing (..)
import Set exposing (..)


tryMoveHero : CompassDirection -> Model -> Model
tryMoveHero dir ({ hero } as model) =
    let
        movedHero =
            Hero.move dir hero

        obstructions =
            movedHero
                |> Hero.position
                |> \x -> queryPosition x model
    in
        case obstructions of
            ( _, _, Just monster, _ ) ->
                attack monster model

            -- entering a building
            ( _, Just building, _, _ ) ->
                enterBuilding building model

            -- path blocked
            ( True, _, _, _ ) ->
                model

            -- path free, moved
            ( False, _, _, _ ) ->
                { model | hero = movedHero }


enterBuilding : Building -> Model -> Model
enterBuilding building ({ hero, maps } as model) =
    case Building.buildingType building of
        LinkType link ->
            { model | maps = Maps.updateArea link.area maps }

        ShopType shopType ->
            { model
                | currentScreen = BuildingScreen building
                , shop = Shop.setCurrentShopType shopType model.shop
            }

        Ordinary ->
            { model | currentScreen = BuildingScreen building }


{-| Given a position and a map, work out everything on the square
-}
queryPosition : Vector -> Model -> ( Bool, Maybe Building, Maybe Monster, Bool )
queryPosition pos ({ hero, maps, monsters } as model) =
    let
        maybeTile =
            Dict.get pos (currentAreaMap maps)

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


attack : Monster -> Model -> Model
attack monster ({ hero, seed, monsters } as model) =
    let
        ( stats', seed', damage ) =
            Combat.attack (Hero.stats hero) monster.stats seed

        monster' =
            { monster | stats = stats' }

        monstersWithoutMonster =
            List.filter (\x -> not (IdGenerator.equals monster.id x.id)) monsters

        monsters' =
            if Stats.isDead monster'.stats then
                monstersWithoutMonster
            else
                monster' :: monstersWithoutMonster

        newMsg =
            newHitMessage "You" ("the " ++ Monster.name monster) (toString damage)
    in
        { model | monsters = monsters', messages = newMsg :: model.messages }


defend : Monster -> Model -> Model
defend monster ({ hero, seed } as model) =
    let
        ( heroStats', seed', damage ) =
            Combat.attack monster.stats (Hero.stats hero) seed

        hero' = Hero.setStats heroStats' hero

        newMsg =
            newHitMessage ("The " ++ Monster.name monster) "you" (toString damage)
    in
        { model | hero = hero', seed = seed', messages = newMsg :: model.messages }


newHitMessage : String -> String -> String -> String
newHitMessage attacker defender damage =
    attacker ++ " hit " ++ defender ++ " for " ++ damage ++ " damage!"



---------------------
-- Moving monsters --
---------------------


moveMonsters : List Monster -> List Monster -> Model -> Model
moveMonsters monsters movedMonsters ({ hero, maps } as model) =
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
                            model' =
                                defend monster model
                        in
                            moveMonsters restOfMonsters (monster :: movedMonsters) model'

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


neighbours : Model -> Vector -> Set Position
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
