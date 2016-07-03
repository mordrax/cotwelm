module Game.Collision exposing (..)

{-| This module handles all movement inputs and will move players, trigger new areas, shop screens, down stairs etc.
-}

import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Game.Data exposing (..)
import Game.Keyboard exposing (..)
import Game.Maps exposing (..)
import Tile exposing (..)
import GameData.Building as Building exposing (..)
import Monster.Monster as Monster exposing (..)
import Shop.Shop as Shop exposing (..)
import Hero exposing (..)


tryMoveHero : Direction -> Game.Data.Model -> Game.Data.Model
tryMoveHero dir ({ hero } as model) =
    let
        movedHero =
            { hero | position = Vector.add hero.position (dirToVector dir) }

        obstructions =
            getObstructions movedHero.position model
    in
        case obstructions of
            ( _, _, Just monster ) ->
                let
                    _ =
                        Debug.log "mosnter obstruction: " monster
                in
                    model

            -- entering a building
            ( _, Just building, _ ) ->
                enterBuilding building model

            -- path blocked
            ( True, _, _ ) ->
                model

            -- path free, moved
            ( False, _, _ ) ->
                { model | hero = movedHero }


enterBuilding : Building -> Game.Data.Model -> Game.Data.Model
enterBuilding building ({ hero, map } as model) =
    case Building.buildingType building of
        LinkType link ->
            { model
                | map = Game.Maps.updateArea link.area map
                , hero = { hero | position = link.pos }
            }

        ShopType shopType ->
            { model
                | currentScreen = BuildingScreen building
                , shop = Shop.setCurrentShopType shopType model.shop
            }

        Ordinary ->
            { model | currentScreen = BuildingScreen building }


{-| Given a position and a map, work out what is on the square
Returns (isTileObstructed, a building entry)
-}
getObstructions : Vector -> Game.Data.Model -> ( Bool, Maybe Building, Maybe Monster )
getObstructions pos ({ hero, map, monsters } as model) =
    let
        ( maybeTile, maybeBuilding ) =
            (thingsAtPosition pos map)

        equalToHeroPosition =
            \monster ->
                let
                    _ =
                        Debug.log "Monster at: " monster
                in
                    Vector.equal pos monster.position

        maybeMonster =
            monsters
                |> List.filter equalToHeroPosition
                |> List.head

        tileObstruction =
            case maybeTile of
                Just tile ->
                    Tile.isSolid tile

                Nothing ->
                    False
    in
        ( tileObstruction, maybeBuilding, maybeMonster )


{-| Return the tile and possibly the building that is at a given point. Uses currentArea and maps from model to determine which area to look at
-}
thingsAtPosition : Vector -> Game.Maps.Model -> ( Maybe Tile, Maybe Building )
thingsAtPosition pos model =
    let
        area =
            model.currentArea

        buildings =
            getBuildings area model

        map =
            getMap area model

        tile =
            Dict.get (toString pos) map

        building =
            buildingAtPosition pos buildings
    in
        ( tile, building )


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



---------------------
-- Moving monsters --
---------------------


moveMonsters : List Monster -> ( Game.Data.Model, List Monster ) -> Game.Data.Model
moveMonsters monsters ( { hero, map } as model, movedMonsters ) =
    case monsters of
        [] ->
            { model | monsters = movedMonsters }

        monster :: restOfMonsters ->
            let
                movedMonster =
                    pathMonster monster hero

                isHeroObstruction =
                    Vector.equal movedMonster.position hero.position

                noChange =
                    moveMonsters restOfMonsters ( model, monster :: movedMonsters )

                monsterMoved =
                    moveMonsters restOfMonsters ( model, movedMonster :: movedMonsters )
            in
                if
                    isMonsterObstruction movedMonster restOfMonsters
                        || isMonsterObstruction movedMonster movedMonsters
                        || isBuildingObstruction movedMonster model
                then
                    noChange
                else if isHeroObstruction then
                    let
                        _ =
                            Debug.log "TODO: Hit Hero!" 1
                    in
                        noChange
                else
                    monsterMoved


pathMonster : Monster -> Hero -> Monster
pathMonster monster hero =
    let
        { x, y } =
            Vector.sub hero.position monster.position

        moveVector =
            Vector.new (x // abs x) (y // abs y)
    in
        { monster | position = Vector.add monster.position moveVector }


isMonsterObstruction : Monster -> List Monster -> Bool
isMonsterObstruction monster monsters =
    List.any (Vector.equal monster.position) (List.map .position monsters)


isBuildingObstruction : Monster -> Game.Data.Model -> Bool
isBuildingObstruction monster ({ map } as model) =
    List.any (isBuildingAtPosition monster.position) (getBuildings map.currentArea map)
