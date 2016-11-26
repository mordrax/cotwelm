module Level
    exposing
        ( Level
        , Map
        , downstairs
        , upstairs
        , size
        , getTile
        )

--import List exposing (..)
--import Set exposing (..)

import Dict exposing (..)
import GameData.Building as Building exposing (Building, Buildings)
import Utils.Vector as Vector exposing (Vector)
import Tile exposing (Tile)


type alias Map =
    Dict Vector Tile


type alias Level =
    { map : Map
    , buildings : Buildings
    }


type Msg
    = NoOp


init : Map -> Buildings -> Level
init map buildings =
    { map = map
    , buildings = buildings
    }


upstairs : Level -> Maybe Building
upstairs model =
    let
        isStairUp =
            .buildingType >> (==) Building.StairUp
    in
        model.buildings
            |> List.filter isStairUp
            |> List.head


downstairs : Level -> Maybe Building
downstairs model =
    model.buildings
        |> List.filter (\x -> x.buildingType == Building.StairDown)
        |> List.head


{-| Get the width and height of a map
-}
size : Level -> Vector
size { map } =
    let
        positions =
            Dict.keys map

        ( maxX, maxY ) =
            List.foldr (\( a, b ) ( c, d ) -> ( max a c, max b d )) ( 0, 0 ) positions
    in
        ( maxX + 1, maxY + 1 )


getTile : Vector -> Level -> Maybe Tile
getTile pos { map } =
    Dict.get pos map
