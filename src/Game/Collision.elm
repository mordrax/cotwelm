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

        isTileObstruction =
            case maybeTile of
                Just tile ->
                    tile.solid

                Nothing ->
                    False

        isBuildingObstruction =
            case maybeBuilding of
                Just building ->
                    True

                _ ->
                    False
    in
        isBuildingObstruction || isTileObstruction


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
    Nothing
