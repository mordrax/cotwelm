module Dungeon.Corridor
    exposing
        ( Corridor
        , Corridors
        , init
        , generate
        , add
        , end
        , possibleEnds
        , toTiles
        , path
        , complete
        )

{-| A corridor is a single width line of tiles that can be either horizontal/vertical or
    at 45 degrees. It can have between 0 to a few bends in it depending on the original
    game.

    Corridors can also intersect with other corridors forming 'entrances' where another
    corridor intersects with this one.

    A corridor has one entrance and one exit with 0 to many points in between.
    The entrance, exit and all points are DirectedVectors that points to the next point.
    The exit's direction points at where the exit faces but the entrance points to the next
    point so we need a entranceFacing to point backwards to where the entrance comes from.

    ###############
    ########^######
    ######<-X->####
    ########|######
    ########|######
    ########P######
    #######/#######
    ##^###/########
    <-E--P#########
    ##v############

    The above is a corridor with a (E)ntrance facing West and a e(X)it facing North with
    two internal (P)oints.

    Corridors are made up of dungeon floor tiles and wall tiles with entrances on either end.

    At each 'point' in the corridor, a DirectedVector will denote where the corridor is
    and which direction the current point is facing. This facing is important as the next
    point must be somewhere on this path unless it's the last point.

    Corridors will be generated based on whatever coordinate system is passed into it so
    it does not know about world/local coordinates. It just uses whatever it's given and makes
    the corridor relative to that coordinate system.
-}

import List exposing (..)
import Dict exposing (..)
import Set exposing (..)
import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Tile exposing (..)
import Lodash exposing (..)
import Utils.CompassDirection as CompassDirection exposing (..)
import Random.Pcg as Random exposing (..)


--import Random.Extra exposing (..)

import Dice exposing (..)


type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { entranceFacing : CompassDirection
    , start : DirectedVector
    , points : DirectedVectors
    , walls : Tiles
    , entrances : Entrances
    , paths : Tiles
    }


init : DirectedVector -> CompassDirection -> Corridor
init start entranceFacing =
    A
        { start = start
        , entranceFacing = entranceFacing
        , points = []
        , walls = []
        , entrances = []
        , paths = []
        }


{-| Generate a new corridor given a directed vector.
    The corridor will go in a random direction and be of random length.

    entranceFacing is the direction the entrance of the corridor is facing.
    i.e if the corridor starts at E(ntrance) and travels north-east, the entranceFacing
    here is West. It can also be South.

    Entrances can only face canonical directions (N, E, S, W)

    #######
    RRRR## #
    R  R# ##
    R <-E###
    RRRR####
    ########
-}
generate : DirectedVector -> Config.Model -> Generator Corridor
generate ( startPosition, entranceFacing ) config =
    let
        facingEntrance =
            Vector.oppositeDirection entranceFacing

        directionGen =
            onePossibleFacing facingEntrance

        lengthGen =
            Dice.range config.corridor.minLength config.corridor.maxLength

        makeCorridor ( length, startDirection ) =
            let
                start =
                    ( startPosition, startDirection )

                corridor =
                    init start entranceFacing
            in
                digger (DigInstruction ( startPosition, startDirection ) length) corridor
    in
        Random.map2 (,) lengthGen directionGen
            `andThen` makeCorridor


allPossibleFacings : CompassDirection -> CompassDirections
allPossibleFacings facing =
    [ Vector.rotateCompass facing Left
    , Vector.rotateCompass facing Right
    , facing
    ]


onePossibleFacing : CompassDirection -> Generator CompassDirection
onePossibleFacing direction =
    direction
        |> allPossibleFacings
        |> shuffle
        |> Random.map (headWithDefault direction)


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
        lastCorridorPoint =
            headWithDefault start points

        newPath =
            path (fst lastCorridorPoint) newVector
                |> List.map (\x -> Tile.toTile x Tile.DarkDgn)

        newWalls =
            constructWall lastCorridorPoint newPoint
    in
        A
            { model
                | points = newPoint :: points
                , walls = newWalls ++ model.walls
                , paths = newPath ++ model.paths
            }


end : Corridor -> DirectedVector
end (A { points, start }) =
    case points of
        point :: _ ->
            point

        _ ->
            start


{-| Given a corridor, draws the wall that sounds the last turn (if any) in the corridor
    returning a new corridor with the walls.
    This is because when adding points to a corridor, there is no way of knowing if that
    is the last point.
-}
complete : Corridor -> Corridor
complete (A ({ start, points, walls } as model)) =
    let
        cornerTiles secondLastPoint lastPoint =
            turnTiles (Vector.facing (fst secondLastPoint) (fst lastPoint)) lastPoint
    in
        case ( start, points ) of
            ( start, lastPoint :: secondLastPoint :: _ ) ->
                A { model | walls = walls ++ cornerTiles secondLastPoint lastPoint }

            ( secondLastPoint, lastPoint :: _ ) ->
                A { model | walls = walls ++ cornerTiles secondLastPoint lastPoint }

            _ ->
                A model


toTiles : Corridor -> Tiles
toTiles (A ({ start, points, walls, entrances, paths } as model)) =
    List.map Entrance.toTile entrances
        ++ walls
        ++ paths



-- Privates
------------
-- Digger --
------------


type alias DigInstruction =
    { start : DirectedVector
    , length : Int
    }


digger : DigInstruction -> Corridor -> Generator Corridor
digger ({ start, length } as instruction) corridor =
    let
        ( startPosition, startDirection ) =
            start

        finishPosition =
            startDirection
                |> Vector.fromDirection
                |> Vector.scaleInt length
                |> Vector.add startPosition

        finishDirectionGen finishPosition =
            possibleEnds finishPosition corridor
                |> shuffle
                |> Random.map (Lodash.headWithDefault ( finishPosition, startDirection ))
    in
        finishDirectionGen finishPosition
            |> Random.map (\end -> add end corridor)


turnTiles : CompassDirection -> DirectedVector -> Tiles
turnTiles corridorDirection ( endPointVector, endPointFacing ) =
    let
        ( leftFacing, rightFacing ) =
            ( Left, Right )
                |> Vector.map (Vector.rotateCompass corridorDirection)
    in
        if corridorDirection == endPointFacing then
            []
        else if (endPointFacing == leftFacing) then
            [ Tile.toTile (Vector.add endPointVector (Vector.fromDirection rightFacing)) Tile.Rock ]
        else if (endPointFacing == rightFacing) then
            [ Tile.toTile (Vector.add endPointVector (Vector.fromDirection leftFacing)) Tile.Rock ]
        else
            []


constructWall : DirectedVector -> DirectedVector -> Tiles
constructWall (( ( x1, y1 ) as start, startDir ) as da) (( ( x2, y2 ) as end, endDir ) as db) =
    let
        endMinusOne =
            Vector.sub end startToEndUnitVector

        startToEndUnitVector =
            Vector.sub end start
                |> Vector.unit

        startToEndDirection =
            Vector.toDirection startToEndUnitVector

        ( left, right ) =
            ( Left, Right )
                |> Vector.map (Vector.rotate startToEndUnitVector)

        getLeftRight point =
            List.map (Vector.add point) [ left, right ]

        ( sameX, sameY ) =
            ( x1 == x2, y1 == y2 )

        verticalWallTiles =
            (path ( x1 - 1, y1 ) ( x2 - 1, y2 ) ++ path ( x1 + 1, y1 ) ( x2 + 1, y2 ))
                |> List.map (flip Tile.toTile Tile.Rock)

        horizontalWallTiles =
            (path ( x1, y1 - 1 ) ( x2, y2 - 1 ) ++ path ( x1, y1 + 1 ) ( x2, y2 + 1 ))
                |> List.map (flip Tile.toTile Tile.Rock)

        endToStartDirection =
            Vector.oppositeDirection startToEndDirection

        ( leftEntrance, rightEntrance ) =
            Vector.map (Vector.rotateCompass endToStartDirection) ( Left, Right )

        cornerTiles =
            turnTiles endToStartDirection da
    in
        if sameX then
            verticalWallTiles
        else if sameY then
            horizontalWallTiles
        else
            let
                halfTiles =
                    (path start endMinusOne)
                        |> List.map getLeftRight
                        |> List.concat
                        |> List.map (flip Tile.toTile Tile.WallDarkDgn)
            in
                halfTiles ++ cornerTiles


{-| The path between any two vectors is the linear line that connects them.
   e.g path (5, 0) (0, 5) = [(5, 0), (4, 1), (3, 2), (2, 3), (1, 4), (0, 5)]
-}
path : Vector -> Vector -> Vectors
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            (max (abs (x1 - x2)) (abs (y1 - y2))) + 1

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
