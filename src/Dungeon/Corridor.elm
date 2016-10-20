module Dungeon.Corridor
    exposing
        ( Corridor
        , Corridors
        , init
        , generate
        , extend
        , add
        , addEntrance
        , boundary
        , end
        , toTiles
        , pp
        , isCollision
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
    , entrances : Entrances
    , paths : Tiles
    }


init : DirectedVector -> CompassDirection -> Corridor
init start entranceFacing =
    A
        { start = start
        , entranceFacing = entranceFacing
        , points = []
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
generate : Vector -> CompassDirection -> Config.Model -> Generator Corridor
generate startPosition entranceFacing config =
    let
        facingEntrance =
            Vector.oppositeDirection entranceFacing

        startDirectionGen =
            onePossibleDirection facingEntrance

        makeCorridor start =
            let
                corridor =
                    init start entranceFacing
            in
                extend corridor config
    in
        (startDirectionGen
            |> Random.map (\dir -> ( startPosition, dir ))
        )
            `andThen` makeCorridor


{-| Generate another point in the corridor by digging a random length from
    the last point's direction and picking a new random direction.
-}
extend : Corridor -> Config.Model -> Generator Corridor
extend corridor config =
    let
        (( _, lastFacing ) as lastPoint) =
            end corridor

        lengthGen =
            Dice.range config.corridor.minLength config.corridor.maxLength

        directionGen =
            onePossibleCardinalDirection lastFacing
    in
        Random.map2 (,) lengthGen directionGen
            |> Random.map (\( len, dir ) -> add ( stepsFromPoint lastPoint len, dir ) corridor)


stepsFromPoint : DirectedVector -> Int -> Vector
stepsFromPoint ( startPosition, startDirection ) steps =
    startDirection
        |> Vector.fromDirection
        |> Vector.scaleInt steps
        |> Vector.add startPosition


allPossibleDirections : CompassDirection -> CompassDirections
allPossibleDirections facing =
    [ Vector.rotateCompass facing Left
    , Vector.rotateCompass facing Right
    , facing
    ]


onePossibleDirection : CompassDirection -> Generator CompassDirection
onePossibleDirection direction =
    direction
        |> allPossibleDirections
        |> shuffle
        |> Random.map (headWithDefault direction)


onePossibleCardinalDirection : CompassDirection -> Generator CompassDirection
onePossibleCardinalDirection direction =
    direction
        |> allPossibleDirections
        |> List.filter CompassDirection.isCardinal
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
    in
        A
            { model
                | points = newPoint :: points
                , paths = newPath ++ model.paths
            }


addEntrance : Vector -> Corridor -> Corridor
addEntrance position (A ({ paths } as model)) =
    A { model | paths = Tile.toTile position Tile.WallDarkDgn :: paths }


end : Corridor -> DirectedVector
end (A { points, start }) =
    case points of
        point :: _ ->
            point

        _ ->
            start


toTiles : Corridor -> Tiles
toTiles (A ({ start, points, entrances, paths } as model)) =
    List.map Entrance.toTile entrances
        ++ paths


isCollision : Vector -> Corridor -> Bool
isCollision position corridor =
    List.any ((==) position) (boundary corridor)


boundary : Corridor -> Vectors
boundary (A model) =
    boundaryHelper model


boundaryHelper : Model -> Vectors
boundaryHelper ({ start, points, paths, entranceFacing } as model) =
    let
        ( endPosition, endFacing ) =
            end (A model)

        pathPositions =
            List.map Tile.position paths

        entrancePosition =
            Vector.add (fst start) (Vector.fromDirection entranceFacing)

        exitPosition =
            Vector.add endPosition (Vector.fromDirection endFacing)

        lessPaths positionSet =
            pathPositions
                |> Set.fromList
                |> Set.diff positionSet
    in
        paths
            |> List.map Tile.position
            |> List.map Vector.neighbours
            |> List.concat
            |> Set.fromList
            |> lessPaths
            |> Set.toList
            |> List.filter ((/=) entrancePosition)
            |> List.filter ((/=) exitPosition)


pp : Corridor -> String
pp (A { start }) =
    "Corridor at (" ++ (toString start) ++ ")"



-- Privates


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
