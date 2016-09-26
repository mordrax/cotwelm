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
    , walls : Tiles
    , entrances : Entrances
    , paths : Tiles
    }


init : DirectedVector -> Corridor
init start =
    A
        { start = start
        , points = []
        , walls = []
        , entrances = []
        , paths = []
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
add (( newVector, newFacing ) as newPoint) (A ({ points, start } as model)) =
    let
        lastPoint =
            headWithDefault start points

        newPath =
            path (fst lastPoint) newVector
                |> List.map (\x -> Tile.toTile x Tile.DarkDgn)

        newWalls =
            constructWall lastPoint newPoint
    in
        A
            { model
                | points = newPoint :: points
                , walls = newWalls ++ model.walls
                , paths = newPath ++ model.paths
            }


end : Corridor -> Maybe DirectedVector
end (A { points }) =
    case points of
        point :: _ ->
            Just point

        _ ->
            Nothing


toTiles : Corridor -> Tiles
toTiles (A ({ start, points, walls, entrances, paths } as model)) =
    List.map Entrance.toTile entrances
        ++ walls
        ++ paths



-- Privates


constructWall : DirectedVector -> DirectedVector -> Tiles
constructWall (( ( x1, y1 ) as start, startDir ) as da) (( ( x2, y2 ) as end, endDir ) as db) =
    let
        endMinusOne =
            Vector.sub end startToEndVector

        aPlusOne =
            Vector.add start startToEndVector

        startToEndVector =
            Vector.sub end start
                |> Vector.unit

        startToEndDirection =
            Vector.toDirection startToEndVector

        ( left, right ) =
            ( Left, Right )
                |> Vector.map (Vector.rotate startToEndVector)

        getLeftRight point =
            List.map (Vector.add point) [ left, right ]

        ( sameX, sameY ) =
            ( x1 == x2, y1 == y2 )

        horizontalWallTiles =
            (path ( x1 - 1, y1 ) ( x2 - 1, y2 ) ++ path ( x1 + 1, y1 ) ( x2 + 1, y2 ))
                |> List.map (flip Tile.toTile Tile.Rock)

        verticalWallTiles =
            (path ( x1, y1 - 1 ) ( x2, y2 - 1 ) ++ path ( x1, y1 + 1 ) ( x2, y2 + 1 ))
                |> List.map (flip Tile.toTile Tile.Rock)

        endToStartDirection =
            startToEndDirection
                |> Vector.fromCompass
                |> Vector.scaleInt -1
                |> Vector.toDirection

        ( leftEntrance, rightEntrance ) =
            Vector.map (Vector.rotateCompass endToStartDirection) ( Left, Right )

        turnTiles =
            if startDir == startToEndDirection then
                []
            else if (startDir == leftEntrance) then
                [ Tile.toTile (Vector.add start (Vector.fromCompass rightEntrance)) Tile.Rock ]
            else if (startDir == rightEntrance) then
                [ Tile.toTile (Vector.add start (Vector.fromCompass leftEntrance)) Tile.Rock ]
            else
                []

        _ =
            Debug.log "Corridor.constructWall"
                { turnTiles = turnTiles
                , startDir = startDir
                , startToEndDirection = startToEndDirection
                , leftEntrance = leftEntrance
                , rightEntrance = rightEntrance
                }
    in
        if sameX then
            horizontalWallTiles
        else if sameY then
            verticalWallTiles
        else
            let
                halfTiles =
                    (path start endMinusOne)
                        |> List.map getLeftRight
                        |> List.concat
                        |> List.map (flip Tile.toTile Tile.WallDarkDgn)
            in
                halfTiles ++ turnTiles


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
