module Lodash exposing (..)

import Array exposing (..)
import Random.Pcg as Random exposing (..)
import Maybe exposing (withDefault)
import List exposing (reverse)


shuffle : List a -> Generator (List a)
shuffle list =
    list
        |> Array.fromList
        |> shuffle_
        |> Random.map Array.toList


headWithDefault : x -> List x -> x
headWithDefault default xs =
    xs
        |> List.head
        |> Maybe.withDefault default


without : a -> List a -> List a
without x xs =
    List.filter ((/=) x) xs


range : Int -> Int -> List Int
range x y =
    if x < y then
        List.range x y
    else
        reverse <| List.range y x



-- Random.Extra


{-| Sample without replacement: produce a randomly selected element of the
array, and the array with that element omitted (shifting all later elements
down). If the array is empty, the selected element will be `Nothing`.
-}
choose : Array a -> Generator ( Maybe a, Array a )
choose arr =
    if Array.isEmpty arr then
        constant ( Nothing, arr )
    else
        let
            lastIndex =
                Array.length arr - 1

            front i =
                Array.slice 0 i arr

            back i =
                if
                    i == lastIndex
                    -- workaround for #1
                then
                    Array.empty
                else
                    Array.slice (i + 1) (lastIndex + 1) arr

            gen =
                Random.int 0 lastIndex
        in
            Random.map
                (\index ->
                    ( Array.get index arr, Array.append (front index) (back index) )
                )
                gen


{-| Shuffle the array using the Fisher-Yates algorithm. Takes O(_n_ log _n_)
time and O(_n_) additional space.
-}
shuffle_ : Array a -> Generator (Array a)
shuffle_ arr =
    if Array.isEmpty arr then
        constant arr
    else
        let
            helper : ( List a, Array a ) -> Generator ( List a, Array a )
            helper ( done, remaining ) =
                choose remaining
                    |> Random.andThen
                        (\( m_val, shorter ) ->
                            case m_val of
                                Nothing ->
                                    constant ( done, shorter )

                                Just val ->
                                    helper ( val :: done, shorter )
                        )
        in
            Random.map (Tuple.first >> Array.fromList) (helper ( [], arr ))


{-| Given a list, choose an element uniformly at random. `Nothing` is only
produced if the list is empty.

    type Direction = North | South | East | West

    direction : Generator Direction
    direction =
      sample [North, South, East, West]
        |> map (Maybe.withDefault North)

-}
sample2 : List a -> Generator (Maybe a)
sample2 =
    let
        find k ys =
            case ys of
                [] ->
                    Nothing

                z :: zs ->
                    if k == 0 then
                        Just z
                    else
                        find (k - 1) zs
    in
        \xs -> Random.map (\i -> find i xs) (int 0 (List.length xs - 1))
