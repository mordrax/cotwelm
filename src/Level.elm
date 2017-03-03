module Level
    exposing
        ( Level
        , Map
        , init
        , fromTiles
        , downstairs
        , upstairs
        , size
        , updateGround
        , getTile
        , floors
        , drop
        )

--import List exposing (..)
--import Set exposing (..)

import Container exposing (Container)
import Dict exposing (Dict)
import Item.Item as Item exposing (Item)
import GameData.Building as Building exposing (Building)
import Utils.Vector as Vector exposing (Vector)
import Tile exposing (Tile)
import Monster.Monster as Monster exposing (Monster)


type alias Map =
    Dict Vector Tile


type alias Level =
    { map : Map
    , buildings : List Building
    , monsters : List Monster
    }


type Msg
    = NoOp


init : List Tile -> List Building -> List Monster -> Level
init tiles buildings monsters =
    { map = fromTiles tiles
    , buildings = buildings
    , monsters = monsters
    }

fromTiles : List Tile -> Map
fromTiles tiles =
    let
        toKVPair tile =
            ( tile.position, tile )
    in
        tiles
            |> List.map toKVPair
            |> Dict.fromList


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


updateGround : Vector -> List Item -> Level -> Level
updateGround pos payload model =
    let
        maybeTile =
            Dict.get pos model.map
                |> Maybe.map (Tile.updateGround payload)
    in
        case maybeTile of
            Nothing ->
                model

            Just tile ->
                { model | map = Dict.insert pos tile model.map }


drop : (Vector, Item) -> Level -> Level
drop (position, item) model =
    Dict.get position model.map
        |> Maybe.map (Tile.drop item)
        |> Maybe.map (\x -> Dict.insert position x model.map)
        |> Maybe.withDefault model.map
        |> (\map -> { model | map = map })


floors : Level -> List Vector
floors { map } =
    map
        |> Dict.toList
        |> List.map Tuple.second
        |> List.filter (.solid >> not)
        |> List.map .position
