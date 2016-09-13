module Dungeon.Corridor exposing (..)

--    exposing
--        ( Corridor
--        , Corridors
--        , init
--        , new
--        , add
--        , toTiles
--          --    , addEntrance
--          --    , addPoint
--          --    , addPointAsEntrance
--        )

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
            constructPath points

        _ =
            Debug.log "paths" paths

        data =
            [ ( Tile.DarkDgn, paths )
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
constructPath : Vectors -> Vectors
constructPath points =
    case points of
        [] ->
            []

        pt :: [] ->
            [ pt ]

        p1 :: ((p2 :: _) as remainingPts) ->
            (path p1 p2) ++ (constructPath remainingPts)


path : Vector -> Vector -> Vectors
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            max (abs (x1 - x2)) (abs (y1 - y2))

        rangeX =
            range x1 x2 length

        rangeY =
            range y1 y2 length
    in
        List.map2 (,) rangeX rangeY

range: Int -> Int -> Int -> List Int
range x y length =
    if x < y then
        [x..y]
    else if x > y then
        reverse [y..x]
    else
        repeat length x
