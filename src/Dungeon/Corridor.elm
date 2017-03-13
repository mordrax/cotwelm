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
    The entrance, exit and all points are List DirectedVector that points to the next point.
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

import Dice
import Dict exposing (Dict)
import Dungeon.Entrance as Entrance exposing (Entrance)
import Dungeon.Rooms.Config as Config
import Dungeon.Rooms.Type exposing (..)
import List
import Random.Pcg as Random exposing (..)
import Set
import Tile exposing (Tile)
import Types exposing (..)
import Utils.Direction as Direction exposing (..)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector, DirectedVector)


type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { entranceFacing : Direction
    , start : DirectedVector
    , points : List DirectedVector
    , entrances : List Entrance
    , paths : List Tile
    , lightSource : LightSource
    }


init : DirectedVector -> Direction -> Corridor
init start entranceFacing =
    A
        { start = start
        , entranceFacing = entranceFacing
        , points = []
        , entrances = []
        , paths = []
        , lightSource = Dark
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
generate : Vector -> Direction -> Config.Model -> Generator Corridor
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
        startDirectionGen
            |> Random.map (\dir -> ( startPosition, dir ))
            |> andThen makeCorridor
            |> andThen lightSourceGenerator


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


lightSourceGenerator : Corridor -> Generator Corridor
lightSourceGenerator (A corridor) =
    let
        setArtificialLightSource isLit =
            if isLit then
                A { corridor | lightSource = Artificial }
            else
                A corridor
    in
        Random.bool
            |> Random.map setArtificialLightSource


stepsFromPoint : DirectedVector -> Int -> Vector
stepsFromPoint ( startPosition, startDirection ) steps =
    startDirection
        |> Vector.fromDirection
        |> Vector.scaleInt steps
        |> Vector.add startPosition


allPossibleDirections : Direction -> Directions
allPossibleDirections facing =
    [ Vector.rotateCompass facing Vector.Left
    , Vector.rotateCompass facing Vector.Right
    , facing
    ]


onePossibleDirection : Direction -> Generator Direction
onePossibleDirection direction =
    direction
        |> allPossibleDirections
        |> Misc.shuffle
        |> Random.map (Misc.headWithDefault direction)


onePossibleCardinalDirection : Direction -> Generator Direction
onePossibleCardinalDirection direction =
    direction
        |> allPossibleDirections
        |> List.filter Direction.isCardinal
        |> Misc.shuffle
        |> Random.map (Misc.headWithDefault direction)


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
possibleEnds : Vector -> Corridor -> List DirectedVector
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
            ( Vector.Left, Vector.Right )
                |> Vector.map (Vector.rotateCompass facing)

        makeDirectedVector direction =
            ( lastPoint, direction )
    in
        [ facing, facingLeft, facingRight ]
            |> List.filter Direction.isCardinal
            |> List.map makeDirectedVector


add : DirectedVector -> Corridor -> Corridor
add (( newVector, newFacing ) as newPoint) (A ({ points, start } as model)) =
    let
        lastCorridorPoint =
            Misc.headWithDefault start points

        newPath =
            path (Tuple.first lastCorridorPoint) newVector
                |> List.map (\x -> Tile.toTile x Tile.DarkDgn)
    in
        A
            { model
                | points = newPoint :: points
                , paths = newPath ++ model.paths
            }


addEntrance : Vector -> Corridor -> Corridor
addEntrance position (A ({ paths } as model)) =
    A { model | paths = Tile.toTile position Tile.DarkDgn :: paths }


end : Corridor -> DirectedVector
end (A { points, start }) =
    case points of
        point :: _ ->
            point

        _ ->
            start


toTiles : Corridor -> List Tile
toTiles (A ({ start, points, entrances, paths } as model)) =
    List.map Entrance.toTile entrances
        ++ paths


isCollision : Vector -> Corridor -> Bool
isCollision position corridor =
    List.any ((==) position) (boundary corridor)


boundary : Corridor -> List Vector
boundary (A model) =
    boundaryHelper model


boundaryHelper : Model -> List Vector
boundaryHelper ({ start, points, paths, entranceFacing } as model) =
    let
        ( endPosition, endFacing ) =
            end (A model)

        pathPositions =
            List.map .position paths

        entranceExceptions =
            Set.fromList
                [ Vector.add (Tuple.first start) (Vector.fromDirection entranceFacing)
                , Vector.add (Tuple.first start) (Vector.fromDirection <| Vector.rotateCompass entranceFacing Vector.Left)
                , Vector.add (Tuple.first start) (Vector.fromDirection <| Vector.rotateCompass entranceFacing Vector.Right)
                ]

        exitExceptions =
            Set.fromList
                [ Vector.add endPosition (Vector.fromDirection endFacing)
                , Vector.add endPosition (Vector.fromDirection <| Vector.rotateCompass endFacing Vector.Left)
                , Vector.add endPosition (Vector.fromDirection <| Vector.rotateCompass endFacing Vector.Right)
                ]

        lessPaths positionSet =
            pathPositions
                |> Set.fromList
                |> Set.diff positionSet
    in
        paths
            |> List.map .position
            |> List.map Vector.neighbours
            |> List.concat
            |> Set.fromList
            |> lessPaths
            |> flip Set.diff entranceExceptions
            |> flip Set.diff exitExceptions
            |> Set.toList


pp : Corridor -> String
pp (A { start }) =
    "Corridor at (" ++ (toString start) ++ ")"



-- Privates


{-| The path between any two vectors is the linear line that connects them.
   e.g path (5, 0) (0, 5) = [(5, 0), (4, 1), (3, 2), (2, 3), (1, 4), (0, 5)]
-}
path : Vector -> Vector -> List Vector
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            (max (abs (x1 - x2)) (abs (y1 - y2))) + 1

        rangeX =
            if x1 == x2 then
                List.repeat length x1
            else
                Misc.range x1 x2

        rangeY =
            if y1 == y2 then
                List.repeat length y1
            else
                Misc.range y1 y2
    in
        List.map2 (,) rangeX rangeY
