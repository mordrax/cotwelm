module Utils.Vector exposing (..)

{-| 2D vector for representing coordinates as well as dimensions of objects
-}

import Dict exposing (..)
import Utils.Direction as Direction exposing (..)


type alias Vector =
    ( Int, Int )


type alias DirectedVector =
    ( Vector, Direction )


type alias DirectedVectors =
    List DirectedVector


type RotationDirection
    = Left
    | Right


type alias Vectors =
    List Vector


zero : Vector
zero =
    ( 0, 0 )


unit : Vector -> Vector
unit ( x, y ) =
    ( x // abs x, y // abs y )


add : Vector -> Vector -> Vector
add ( v1x, v1y ) ( v2x, v2y ) =
    ( v1x + v2x, v1y + v2y )


{-| a -> b -> (a - b)
-}
sub : Vector -> Vector -> Vector
sub ( v1x, v1y ) ( v2x, v2y ) =
    ( v1x - v2x, v1y - v2y )


scaleInt : Int -> Vector -> Vector
scaleInt magnitude =
    scale (toFloat magnitude)


scale : Float -> Vector -> Vector
scale magnitude ( x, y ) =
    ( round <| toFloat x * magnitude, round <| toFloat y * magnitude )


distance : Vector -> Vector -> Float
distance ( v1x, v1y ) ( v2x, v2y ) =
    let
        ( dx, dy ) =
            sub ( v1x, v1y ) ( v2x, v2y )
    in
    (dx ^ 2 + dy ^ 2)
        |> toFloat
        |> sqrt


adjacent : Vector -> Vector -> Bool
adjacent ( x1, y1 ) ( x2, y2 ) =
    (abs (x1 - x2) <= 1) && (abs (y1 - y2) <= 1)



--------------------
-- Vector helpers --
--------------------


map : (a -> b) -> ( a, a ) -> ( b, b )
map f ( x, y ) =
    ( f x, f y )


{-| Rotates a 2d vector by 45 degrees either to the left or right of the
original vector. Original vector can take the form of (+-x, +-y) where
x and y can only have a magnitude of 1
-}
rotate : Vector -> RotationDirection -> Vector
rotate ( xInt, yInt ) dir =
    let
        ( x, y ) =
            ( toFloat xInt, toFloat yInt )

        angle =
            case dir of
                Left ->
                    45

                Right ->
                    -45

        x_ =
            x * cos angle - y * sin angle

        y_ =
            x * sin angle + y * cos angle
    in
    ( round x_, round y_ )


rotateCompass : Direction -> RotationDirection -> Direction
rotateCompass compass rotation =
    fromDirection compass
        |> flip rotate rotation
        |> toDirection


facing : Vector -> Vector -> Direction
facing start end =
    sub end start
        |> unit
        |> toDirection


directions : Dict Vector Direction
directions =
    Dict.fromList
        [ ( ( 0, 1 ), N )
        , ( ( 0, -1 ), S )
        , ( ( 1, 0 ), E )
        , ( ( -1, 0 ), W )
        , ( ( 1, 1 ), NE )
        , ( ( -1, 1 ), NW )
        , ( ( 1, -1 ), SE )
        , ( ( -1, -1 ), SW )
        ]


oppositeDirection : Direction -> Direction
oppositeDirection dir =
    dir
        |> fromDirection
        |> scaleInt -1
        |> toDirection


toDirected : Direction -> Vector -> DirectedVector
toDirected d v =
    ( v, d )


toDirection : Vector -> Direction
toDirection vector =
    case Dict.get (unit vector) directions of
        Just dir ->
            dir

        Nothing ->
            let
                _ =
                    Debug.log "ERROR: Could not get a direction from the unit vector: " (unit vector)
            in
            W


neighbours : Vector -> Vectors
neighbours position =
    List.map (\direction -> ( position, direction )) Direction.directions
        |> List.map advance


{-| Given a directed vector, 'walk' it in the direction and return the new vector
-}
advance : DirectedVector -> Vector
advance ( vector, direction ) =
    add vector (fromDirection direction)


cardinalNeighbours : Vector -> Vectors
cardinalNeighbours ( x, y ) =
    Direction.cardinalDirections
        |> List.map fromDirection
        |> List.map (add ( x, y ))


mul : Vector -> Vector -> Vector
mul ( x, y ) ( a, b ) =
    ( x * a, y * b )


fromDirection : Direction -> Vector
fromDirection dir =
    case dir of
        N ->
            ( 0, 1 )

        S ->
            ( 0, -1 )

        E ->
            ( 1, 0 )

        W ->
            ( -1, 0 )

        NE ->
            ( 1, 1 )

        NW ->
            ( -1, 1 )

        SE ->
            ( 1, -1 )

        SW ->
            ( -1, -1 )


toComparable : DirectedVector -> ( Vector, Vector )
toComparable ( vector, direction ) =
    ( vector, fromDirection direction )


fromComparable : ( Vector, Vector ) -> DirectedVector
fromComparable ( vector, direction ) =
    ( vector, toDirection direction )


rotateUnlessCardinal : Vector -> RotationDirection -> Vector
rotateUnlessCardinal currentDirection rotation =
    let
        cardinalVectors =
            List.map fromDirection cardinalDirections
    in
    if List.member currentDirection cardinalVectors then
        currentDirection
    else
        rotate currentDirection rotation


{-| a -> (topLeft, bottomRight) -> isIntersect
Checks if vector a's x/y values are within the bounding box created by the tuple (topLeft, bottomRight)
-}
boxIntersectVector : Vector -> ( Vector, Vector ) -> Bool
boxIntersectVector ( x, y ) ( ( topLeftX, topLeftY ), ( bottomRightX, bottomRightY ) ) =
    let
        isWithinX =
            x >= topLeftX && x <= bottomRightX

        isWithinY =
            y >= topLeftY && y <= bottomRightY
    in
    isWithinX && isWithinY


boxIntersectXAxis : Int -> ( Vector, Vector ) -> Bool
boxIntersectXAxis xAxis ( ( startX, _ ), ( endX, _ ) ) =
    xAxis >= startX && xAxis <= endX


boxIntersectYAxis : Int -> ( Vector, Vector ) -> Bool
boxIntersectYAxis yAxis ( ( _, startY ), ( _, endY ) ) =
    yAxis >= startY && yAxis <= endY


{-| The path between any two vectors is the linear line that connects them.
e.g path (5, 0) (0, 5) = [(5, 0), (4, 1), (3, 2), (2, 3), (1, 4), (0, 5)]
-}
path : Vector -> Vector -> List Vector
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            max (abs (x1 - x2)) (abs (y1 - y2)) + 1

        rangeX =
            if x1 == x2 then
                List.repeat length x1
            else
                range x1 x2

        rangeY =
            if y1 == y2 then
                List.repeat length y1
            else
                range y1 y2
    in
    List.map2 (,) rangeX rangeY


range : Int -> Int -> List Int
range x y =
    if x < y then
        List.range x y
    else
        List.reverse <| List.range y x
