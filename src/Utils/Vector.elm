module Utils.Vector exposing (..)

{-| 2D vector for representing coordinates as well as dimensions of objects

-}

import Utils.CompassDirection exposing (..)


type alias Vector =
    ( Int, Int )


type alias DirectedVector =
    ( Vector, CompassDirection )


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

        x' =
            x * cos angle - y * sin angle

        y' =
            x * sin angle + y * cos angle
    in
        ( round x', round y' )


toDirection : Vector -> CompassDirection
toDirection vector =
    case unit vector of
        ( 0, 1 ) ->
            N

        ( 1, 0 ) ->
            S

        ( 0, -1 ) ->
            E

        ( -1, 0 ) ->
            W

        ( 1, 1 ) ->
            NE

        ( -1, 1 ) ->
            NW

        ( 1, -1 ) ->
            SE

        ( -1, -1 ) ->
            SW

        _ ->
            W


fromCompass : CompassDirection -> Vector
fromCompass dir =
    case dir of
        N ->
            ( 0, 1 )

        S ->
            ( 1, 0 )

        E ->
            ( 0, -1 )

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


rotateUnlessCardinal : Vector -> RotationDirection -> Vector
rotateUnlessCardinal currentDirection rotation =
    let
        cardinalVectors =
            List.map fromCompass cardinalDirections
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
