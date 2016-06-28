module Game.Collision exposing (..)

{-| This module handles all movement inputs and will move players, trigger new areas, shop screens, down stairs etc.
-}

import Dict exposing (..)
import Utils.Vector as Vector exposing (..)
import Game.Data exposing (..)
import Game.Keyboard exposing (..)
import Game.Maps exposing (..)
import GameData.Tile exposing (..)
import GameData.Building as Building exposing (..)
import Hero exposing (..)
import Monster.Monster as Monster exposing (..)
import Shop.Shop as Shop exposing (..)


tryMoveHero : Direction -> Game.Data.Model -> Game.Data.Model
tryMoveHero dir model =
    let
        movedHero =
            Hero.update (Hero.Move <| dirToVector dir) model.hero

        obstructions =
            getObstructions (Hero.pos movedHero) model.map
    in
        case obstructions of
            -- entering a building
            ( _, Just building ) ->
                enterBuilding building model

            -- path blocked
            ( True, _ ) ->
                model

            -- path free, moved
            ( False, _ ) ->
                { model | hero = movedHero }


enterBuilding : Building.Model -> Game.Data.Model -> Game.Data.Model
enterBuilding building model =
    case building.buildingType of
        LinkType link ->
            { model | map = Game.Maps.updateArea link.area model.map, hero = Hero.update (Hero.Teleport link.pos) model.hero }

        ShopType shopType ->
            { model | currentScreen = BuildingScreen building, shop = Shop.setCurrentShopType shopType model.shop }

        Ordinary ->
            { model | currentScreen = BuildingScreen building }


{-| Given a position and a map, work out what is on the square
Returns (isTileObstructed, a building entry)
-}
getObstructions : Vector -> Game.Maps.Model -> ( Bool, Maybe Building.Model )
getObstructions pos mapModel =
    let
        ( maybeTile, maybeBuilding ) =
            (thingsAtPosition pos mapModel)

        tileObstruction =
            case maybeTile of
                Just tile ->
                    tile.solid

                Nothing ->
                    False

        buildingObstruction =
            case maybeBuilding of
                Just building ->
                    True

                _ ->
                    False
    in
        ( buildingObstruction || tileObstruction, maybeBuilding )


{-| Return the tile and possibly the building that is at a given point. Uses currentArea and maps from model to determine which area to look at
-}
thingsAtPosition : Vector -> Game.Maps.Model -> ( Maybe Tile, Maybe Building.Model )
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
buildingAtPosition : Vector -> List Building.Model -> Maybe Building.Model
buildingAtPosition pos buildings =
    let
        buildingsAtTile =
            List.filter (isBuildingAtPosition pos) buildings
    in
        case buildingsAtTile of
            b :: rest ->
                Just b

            _ ->
                Nothing


{-| Given a point and a building, will return true if the point is within the building
-}
isBuildingAtPosition : Vector -> Building.Model -> Bool
isBuildingAtPosition pos building =
    let
        bottomLeft =
            Vector.sub (Vector.add building.pos building.size) (Vector.new 1 1)
    in
        boxIntersect pos ( building.pos, bottomLeft )


tryMoveMonster : Monster -> ( Game.Data.Model, List Monster ) -> ( Game.Data.Model, List Monster )
tryMoveMonster monster ( { hero } as model, monsters ) =
    let
        monsterPos =
            Monster.pos monster

        heroPos =
            Hero.pos hero

        { x, y } =
            Vector.sub heroPos monsterPos

        ( normX, normY ) =
            ( x // abs x, y // abs y )

        monster' =
            Monster.move monster (Vector.new normX normY)
    in
        ( model, monster' :: monsters )
