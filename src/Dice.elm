module Dice exposing (..)

{-| Simple dice system that will generate a random int between 1 and the max passed in.
-}

import Random.Pcg as Random exposing (..)


d : Int -> Generator Int
d faces =
    range 1 faces


range : Int -> Int -> Generator Int
range small large =
    Random.int (min small large) (max small large)


d2d : Int -> Int -> Generator ( Int, Int )
d2d faces1 faces2 =
    Random.map2 (,) (d faces1) (d faces2)


{-| Given a dice of n faces and a starting seed, will generate a number and pass
the updated seed back
-}
rollD : Int -> Seed -> ( Int, Seed )
rollD faces seed =
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


roll2D : Int -> Seed -> ( ( Int, Int ), Seed )
roll2D faces seed =
    let
        ( a, seed_ ) =
            rollD faces seed

        ( b, seed__ ) =
            rollD faces seed_
    in
        ( ( a, b ), seed__ )


roll3D : Int -> Seed -> ( ( Int, Int, Int ), Seed )
roll3D faces seed =
    let
        ( ( a, b ), seed_ ) =
            roll2D faces seed

        ( c, seed__ ) =
            rollD faces seed_
    in
        ( ( a, b, c ), seed__ )


roll4D : Int -> Seed -> ( ( Int, Int, Int, Int ), Seed )
roll4D faces seed =
    let
        ( ( a, b, c ), seed_ ) =
            roll3D faces seed

        ( d, seed__ ) =
            rollD faces seed_
    in
        ( ( a, b, c, d ), seed__ )


roll : Int -> ( List Int, Seed ) -> ( List Int, Seed )
roll faces ( rolls, seed ) =
    let
        ( roll, seed_ ) =
            rollD faces seed
    in
        ( roll :: rolls, seed_ )


rollDs : List Int -> Seed -> ( List Int, Seed )
rollDs faces seed =
    List.foldl roll ( [], seed ) faces
