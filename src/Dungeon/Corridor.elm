module Dungeon.Corridor
    exposing
        ( Corridor
        , Corridors
        , init
        , add
        , end
        , possibleEnds
        , toTiles
        , path
        )

import List exposing (..)
import Dict exposing (..)
import Set exposing (..)
import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Tile exposing (..)
import Lodash exposing (..)
import Utils.CompassDirection as CompassDirection exposing (..)


type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { start : DirectedVector
    , points : DirectedVectors
    , walls : List Walls
    , entrances : Entrances
    }


init : DirectedVector -> Corridor
init start =
    A
        { start = start
        , points = []
        , walls = []
        , entrances = []
        }


{-| A corridor can be vertical/horizontal or it can be diagonal. All the possible endings
are returned as a point and direction.
NOTE: We ignore the end of the corridor if there is one and use the start and existing points.

Vertical/horizontal corridors can end with a 90deg turn or straight ahead. i.e in any of
the 3 remaining cardinal directions

#######
###1###
#2   3#
### ###
### ###

Diagonal corridors must end facing a cardinal direction

#######
###1###
### ###
###  2#
## ####
# #####
 ######
-}
possibleEnds : Vector -> Corridor -> DirectedVectors
possibleEnds lastPoint ((A ({ start, points } as model)) as corridor) =
    let
        ( startVector, _ ) =
            start

        secondLastPoint =
            case ( start, points ) of
                ( _, ( point, _ ) :: _ ) ->
                    point

                ( ( startVector, _ ), _ ) ->
                    startVector

        facing =
            Vector.facing secondLastPoint lastPoint

        ( facingLeft, facingRight ) =
            ( Left, Right )
                |> Vector.map (Vector.rotateCompass facing)

        makeDirectedVector direction =
            ( lastPoint, direction )
    in
        [ facing, facingLeft, facingRight ]
            |> List.filter CompassDirection.isCardinal
            |> List.map makeDirectedVector


add : DirectedVector -> Corridor -> Corridor
add point (A ({ points } as model)) =
    A { model | points = point :: points }


end : Corridor -> Maybe DirectedVector
end (A { points }) =
    case points of
        point :: _ ->
            Just point

        _ ->
            Nothing


allPoints : Model -> Vectors
allPoints { points, start } =
    (points)
        |> List.map fst
        |> reverse
        |> (::) (fst start)


toTiles : Corridor -> Tiles
toTiles (A ({ start, points, walls, entrances } as model)) =
    let
        ( paths, walls ) =
            ( constructPath (allPoints model), constructWalls (allPoints model) [] )

        data =
            [ ( Tile.DarkDgn, paths )
            ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles data)
            ++ List.map Entrance.toTile entrances
            ++ walls



-- Privates


constructWalls : Vectors -> Tiles -> Tiles
constructWalls points walls =
    case points of
        [] ->
            walls

        _ :: [] ->
            walls

        a :: b :: rest ->
            constructWalls (b :: rest) (constructWall a b) ++ walls


constructWall : Vector -> Vector -> Tiles
constructWall (( x1, y1 ) as a) (( x2, y2 ) as b) =
    let
        bMinusOne =
            Vector.sub b diagonalDirection

        aPlusOne =
            Vector.add a diagonalDirection

        diagonalDirection =
            Vector.sub b a
                |> Vector.unit

        ( left, right ) =
            ( Left, Right )
                |> Vector.map (Vector.rotate diagonalDirection)

        getLeftRight point =
            List.map (Vector.add point) [ left, right ]
    in
        if x1 == x2 then
            (path ( x1 - 1, y1 ) ( x2 - 1, y2 ) ++ path ( x1 + 1, y1 ) ( x2 + 1, y2 ))
                |> List.map (flip Tile.toTile Tile.Rock)
        else if y1 == y2 then
            (path ( x1, y1 - 1 ) ( x2, y2 - 1 ) ++ path ( x1, y1 + 1 ) ( x2, y2 + 1 ))
                |> List.map (flip Tile.toTile Tile.Rock)
        else
            let
                halfTiles =
                    (path a bMinusOne)
                        |> List.map getLeftRight
                        |> List.concat
                        |> List.map (flip Tile.toTile Tile.WallDarkDgn)

                fullTiles =
                    []
            in
                halfTiles ++ fullTiles


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
