module Dungeon.Corridor
    exposing
        ( Corridor
        , init
        )

{-| A corridor is a single width line of tiles that can be either horizontal/vertical or
at 45 degrees. It can have between 0 to a few bends in it depending on the original
game.
-}

import Dict exposing (Dict)
import Set exposing (Set)
import Tile exposing (Tile)
import Types exposing (..)
import Utils.Vector as Vector exposing (DirectedVector, Vector)


type alias Corridor =
    { path : List Vector
    , lightSource : LightSource
    , walls : List Vector
    , tiles : Dict Vector Tile
    }


init : List Vector -> Corridor
init pathPoints =
    let
        path =
            paths (Debug.log "corridor" pathPoints)

        floorTiles =
            List.map (flip Tile.toTile Tile.DarkDgn) path

        headAsList list =
            list
                |> List.head
                |> Maybe.map (\x -> [ x ])
                |> Maybe.withDefault []

        walls =
            adjacent path

        wallTiles =
            List.map (flip Tile.toTile Tile.Rock) walls

        tiles =
            (floorTiles ++ wallTiles)
                |> List.map (\tile -> ( tile.position, tile ))
                |> Dict.fromList
    in
    { path = path
    , walls = walls
    , lightSource = Artificial
    , tiles = tiles
    }


adjacent : List Vector -> List Vector
adjacent startingVectors =
    let
        lessStartingVectors set =
            Set.diff set (Set.fromList startingVectors)
    in
    startingVectors
        |> List.map Vector.neighbours
        |> List.concat
        |> Set.fromList
        |> lessStartingVectors
        |> Set.toList


{-| A path between any number of vectors using the path function
-}
paths : List Vector -> List Vector
paths points =
    case points of
        [] ->
            []

        a :: [] ->
            []

        a :: b :: rest ->
            Vector.path a b ++ paths (b :: rest)
