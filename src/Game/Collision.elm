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


tryMoveHero : Direction -> Game.Data.Model -> ( Game.Data.Model, Cmd Game.Data.Msg )
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
                ( enterBuilding building model, Cmd.none )

            -- path blocked
            ( True, _ ) ->
                ( model, Cmd.none )

            -- path free, moved
            ( False, _ ) ->
                ( { model | hero = movedHero }, Cmd.none )


enterBuilding : Building -> Game.Data.Model -> Game.Data.Model
enterBuilding building model =
    case building.link of
        Nothing ->
            { model | currentScreen = BuildingScreen building }

        Just link ->
            { model | map = Game.Maps.updateArea link.area model.map, hero = Hero.update (Hero.Teleport link.pos) model.hero }


{-| Given a position and a map, work out what is on the square
Returns (isTileObstructed, a building entry)
-}
getObstructions : Vector -> Game.Maps.Model -> ( Bool, Maybe Building )
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
            List.filter (isBuildingAtPosition pos) buildings
    in
        case buildingsAtTile of
            b :: rest ->
                Just b

            _ ->
                Nothing


{-| Given a point and a building, will return true if the point is within the building
-}
isBuildingAtPosition : Vector -> Building -> Bool
isBuildingAtPosition pos building =
    let
        bottomLeft =
            Vector.sub (Vector.add building.pos building.size) (Vector.new 1 1)
    in
        boxIntersect pos ( building.pos, bottomLeft )
