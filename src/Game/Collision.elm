module Game.Collision exposing (..)

{-| This module handles all movement inputs and will move players, trigger new areas, shop screens, down stairs etc.
-}

import Lib exposing (..)
import Game.Data exposing (..)
import Game.Maps exposing (..)
import GameData.Tile exposing (..)
import Dict exposing (..)


{-|
-}
isTileObstructed : Coordinate -> Game.Maps.Model -> Bool
isTileObstructed pos mapModel =
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
        buildingObstruction || tileObstruction


thingsAtPosition : Coordinate -> Model -> ( Maybe Tile, Maybe Building )
thingsAtPosition pos model =
    let
        area =
            model.currentArea

        buildings =
            getBuildings area

        map =
            getMap area model

        tile =
            Dict.get (toString pos) map

        building =
            buildingAtPosition pos buildings
    in
        ( tile, building )


buildingAtPosition : Coordinate -> List Building -> Maybe Building
buildingAtPosition pos buildings =
    let
        buildingsAtTile =
            List.filter (isBuildingAtPosition pos) buildings
    in
        case buildingsAtTile of
            [ b ] ->
                Just b

            _ ->
                Nothing


isBuildingAtPosition : Coordinate -> Building -> Bool
isBuildingAtPosition target building =
    let
        t =
            target

        bp =
            building.pos

        bs =
            building.size

        isWithinX =
            t.x >= bp.x && t.x <= bp.x + bs.x

        isWithinY =
            t.y >= bp.y && t.y <= bp.y + bs.y
    in
        isWithinX && isWithinY
