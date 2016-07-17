module Utils.Vector exposing (..)

{-| 2D vector for representing coordinates as well as dimensions of objects
# Model
@docs Vector

# Constructor
@docs vector

# Comparison
@docs equal

# Basic Arithmatics
@docs add, sub, div, mul

-}


{-| Represents the Vector model
-}
type alias Vector =
    { x : Int
    , y : Int
    }


{-| Creates Vector from two numbers
-}
new : Int -> Int -> Vector
new x y =
    { x = x
    , y = y
    }


newFromTuple : ( Int, Int ) -> Vector
newFromTuple ( x, y ) =
    { x = x, y = y }


toTuple : Vector -> ( Int, Int )
toTuple { x, y } =
    ( x, y )


{-| Compares two Vecotr2D
-}
equal : Vector -> Vector -> Bool
equal v1 v2 =
    v1.x == v2.x && v1.y == v2.y


{-| Adds two Vector and returns summation of them
-}
add : Vector -> Vector -> Vector
add v1 v2 =
    { x = v1.x + v2.x
    , y = v1.y + v2.y
    }


{-| Subtract two vectors. a -> b -> c means a - b = c
-}
sub : Vector -> Vector -> Vector
sub a b =
    { x = a.x - b.x
    , y = a.y - b.y
    }


scale : Int -> Vector -> Vector
scale magnitude { x, y } =
    { x = x * magnitude, y = y * magnitude }


distance : Vector -> Vector -> Int
distance a b =
    let
        { x, y } =
            sub a b
    in
        abs x + abs y


{-| a -> (topLeft, bottomRight) -> isIntersect
  Checks if vector a's x/y values are within the bounding box created by the tuple (topLeft, bottomRight)
-}
boxIntersect : Vector -> ( Vector, Vector ) -> Bool
boxIntersect target ( topLeft, bottomRight ) =
    let
        isWithinX =
            target.x >= topLeft.x && target.x <= bottomRight.x

        isWithinY =
            target.y >= topLeft.y && target.y <= bottomRight.y
    in
        isWithinX && isWithinY
