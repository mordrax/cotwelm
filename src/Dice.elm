module Dice exposing (d)

{-| Simple dice system that will generate a random int between 1 and the max passed in.
-}

import Random exposing (..)


{-| Given a dice of n faces and a starting seed, will generate a number and pass
the updated seed back
-}
d : Int -> Seed -> ( Int, Seed )
d faces seed =
    let
        intGenerator =
            Random.int 1 faces
    in
        case faces of
            0 ->
                ( 0, seed )

            1 ->
                ( 1, seed )

            _ ->
                Random.step intGenerator seed
