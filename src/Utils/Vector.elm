module Utils.Vector exposing (..)

{-| 2D vector for representing coordinates as well as dimensions of objects

-}


type alias Vector =
    ( Int, Int )


add : Vector -> Vector -> Vector
add ( v1x, v1y ) ( v2x, v2y ) =
    ( v1x + v2x, v1y + v2y )


sub : Vector -> Vector -> Vector
sub ( v1x, v1y ) ( v2x, v2y ) =
    ( v1x - v2x, v1y - v2y )


scale : Int -> Vector -> Vector
scale magnitude ( x, y ) =
    ( x * magnitude, y * magnitude )


distance : Vector -> Vector -> Float
distance ( v1x, v1y ) ( v2x, v2y ) =
    let
        ( dx, dy ) =
            sub ( v1x, v1y ) ( v2x, v2y )
    in
        (dx ^ 2 + dy ^ 2)
            |> toFloat
            |> sqrt


{-| a -> (topLeft, bottomRight) -> isIntersect
  Checks if vector a's x/y values are within the bounding box created by the tuple (topLeft, bottomRight)
-}
boxIntersect : Vector -> ( Vector, Vector ) -> Bool
boxIntersect ( x, y ) ( ( topLeftX, topLeftY ), ( bottomRightX, bottomRightY ) ) =
    let
        isWithinX =
            x >= topLeftX && x <= bottomRightX

        isWithinY =
            y >= topLeftY && y <= bottomRightY
    in
        isWithinX && isWithinY
