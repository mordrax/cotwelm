module Level
    exposing
        ( Level
        , Map
        , downstairs
        , upstairs
        , size
        , updateTile
        , getTile
        )

--import List exposing (..)
--import Set exposing (..)

import Dict exposing (..)
import GameData.Building as Building exposing (Building, Buildings)
import Utils.Vector as Vector exposing (Vector)
import Tile exposing (Tile)
import Monster.Monster as Monster exposing (Monster)


type alias Map =
    Dict Vector Tile


type alias Level =
    { map : Map
    , buildings : Buildings
    , monsters : List Monster
    }


type Msg
    = NoOp


init : Map -> Buildings -> List Monster -> Level
init map buildings monsters =
    { map = map
    , buildings = buildings
    , monsters = monsters
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


updateTile : Vector -> Tile -> Level -> Level
updateTile pos tile model =
    { model | map = Dict.insert pos tile model.map }


floors : Level -> List Vector
floors { map } =
    map
        |> toList
        |> List.map Tuple.second
        |> List.filter (Tile.isSolid >> not)
        |> List.map Tile.position
