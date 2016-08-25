module Lodash exposing (..)

import Array exposing (..)
import Random exposing (..)
import Random.Array exposing (..)


shuffle : List a -> Generator (List a)
shuffle list =
    list
        |> Array.fromList
        |> Random.Array.shuffle
        |> Random.map Array.toList


without : a -> List a -> List a
without x xs =
    List.filter ((/=) x) xs
