module Dungeon.Corridor exposing (..)

--    exposing
--        ( Corridor
--        , Corridors
--        , init
--        , new
--        , add
--        , toTiles
--        , path
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
import Lodash exposing (..)
import Utils.CompassDirection exposing (..)

type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { start : Vector
    , points : Vectors
    , walls : List Walls
    , entrances : Entrances
    }


new : Vector -> Corridor
new start =
    A
        { start = start
        , points = []
        , walls = []
        , entrances = []
        }


facing : Vector -> Vectors -> CompassDirection
facing start points =
    case List.reverse (start :: points) of
        last :: secondLast :: _ ->
            Vector.sub last secondLast |> Vector.toDirection

        _ ->
            -- if in doubt, journey to the west
            W

type alias CorridorEnding = ( Corridor, Vector, CompassDirection )

allPossibleEndings : Corridor -> List CorridorEnding
allPossibleEndings ((A ({ start, points } as model)) as corridor) =
    let
        lastPoint =
            points |> reverse |> headWithDefault start

        straightAhead =
            facing start points |> Vector.fromCompass

        ( left, right ) =
            ( Vector.rotate straightAhead Left
            , Vector.rotate straightAhead Right
            )

        ( leftEnd, rightEnd ) =
            ( Vector.add lastPoint left
            , Vector.add lastPoint right
            )

        corridorWithEnd point =
            A { model | points = points ++ [ point ] }

    in
        [ ( corridor, lastPoint, Vector.toDirection straightAhead )
          -- the corridor is rotated 45 deg, but rooms must be facing a cardinal
          -- direction
        , ( corridorWithEnd leftEnd, leftEnd, Vector.rotateUnlessCardinal left Left |> Vector.toDirection )
        , ( corridorWithEnd rightEnd, rightEnd, Vector.rotateUnlessCardinal right Right |> Vector.toDirection)
        ]


add : Vector -> Corridor -> Corridor
add point (A ({ points } as model)) =
    A { model | points = points ++ [ point ] }


toTiles : Corridor -> Tiles
toTiles (A { start, points, walls, entrances }) =
    let
        --        toWorldPos localPos =
        --            Vector.add worldPos localPos
        paths =
            constructPath (start :: points)

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


{-| The path between any two vectors is the linear line that connects them.
   e.g path (5, 0) (0, 5) = [(5, 0), (4, 1), (3, 2), (2, 3), (1, 4), (0, 5)]
-}
path : Vector -> Vector -> Vectors
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            max (abs (x1 - x2)) (abs (y1 - y2))

        rangeX =
            if x1 == x2 then
                repeat length x1
            else
                Lodash.range x1 x2

        rangeY =
            if y1 == y2 then
                repeat length y1
            else
                Lodash.range y1 y2
    in
        List.map2 (,) rangeX rangeY
