module Dungeon.Corridor
    exposing
        ( Corridor
        , Corridors
        , init
        , new
        , add
        , toTiles
          --    , addEntrance
          --    , addPoint
          --    , addPointAsEntrance
        )

import List exposing (..)
import Dict exposing (..)
import Set exposing (..)
import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Tile exposing (..)


type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { points : Vectors
    , walls : List Walls
    , entrances : Entrances
    }


init : Model
init =
    { points = []
    , walls = []
    , entrances = []
    }


new : Entrance -> Corridor
new entrance =
    A
        { points = [ Entrance.position entrance ]
        , walls = []
        , entrances = [ entrance ]
        }


add : Vector -> Corridor -> Corridor
add point (A ({ points } as model)) =
    A { model | points = point :: points }


toTiles : Corridor -> Tiles
toTiles (A { points, walls, entrances }) =
    let
        --        toWorldPos localPos =
        --            Vector.add worldPos localPos
        paths =
            getPaths points

        data =
            [ ( Tile.DarkDgn, List.concat paths )
            , ( Tile.Rock, List.concat walls )
            ]

        makeTiles ( tileType, positions ) =
            positions
                --                |> List.map toWorldPos
                |>
                    List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles data)
            ++ List.map Entrance.toTile entrances



-- Privates


{-| Give a list of points that denote the start, end and each turn of a corridor
   generates all the points in between.
-}
getPaths : Vectors -> List Vectors
getPaths points =
    case points of
        [] ->
            [ [] ]

        pt :: [] ->
            [ [ pt ] ]

        ( xs, ys ) :: (( xf, yf ) as pt) :: pts ->
            List.map2 (,) [xs..xf] [ys..yf] :: (getPaths (pt :: pts))
