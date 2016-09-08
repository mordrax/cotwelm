module Lodash exposing (..)

import Array exposing (..)
import Random exposing (..)
import Random.Array exposing (..)
import Maybe exposing (withDefault)


shuffle : List a -> Generator (List a)
shuffle list =
    list
        |> Array.fromList
        |> Random.Array.shuffle
        |> Random.map Array.toList


headWithDefault : x -> List x -> x
headWithDefault default xs =
    xs
        |> List.head
        |> Maybe.withDefault default


without : a -> List a -> List a
without x xs =
    List.filter ((/=) x) xs
