module Utils.Misc exposing (..)

import Array exposing (Array)
import Html exposing (..)
import Html.Attributes exposing (style)
import List exposing (reverse)
import Maybe exposing (withDefault)
import Random.Pcg as Random exposing (Generator, constant)
import Regex
import String
import Utils.Vector exposing (..)


px : number -> String
px a =
    (toString a) ++ "px"


vectorToHtmlStyle : Vector -> List ( String, String )
vectorToHtmlStyle ( x, y ) =
    [ ( "top", px (y * 32) )
    , ( "left", px (x * 32) )
    ]


toScaledTilePosition : Vector -> Float -> Attribute msg
toScaledTilePosition ( x, y ) scale =
    let
        size =
            round <| scale * 32
    in
        style
            [ ( "top", px (y * size) )
            , ( "left", px (x * size) )
            ]


foldResult : (a -> b -> Result x b) -> Result x b -> List a -> Result x b
foldResult f acc list =
    case list of
        [] ->
            acc

        x :: xs ->
            let
                nextAcc =
                    Result.andThen (f x) acc
            in
                foldResult f nextAcc xs


removeFirst : a -> (a -> a -> Bool) -> List a -> List a
removeFirst target equals list =
    removeFirst_ target equals list []


removeFirst_ : a -> (a -> a -> Bool) -> List a -> List a -> List a
removeFirst_ target equals list searched =
    case list of
        [] ->
            searched

        x :: xs ->
            if equals x target then
                searched ++ xs
            else
                removeFirst_ target equals xs (x :: searched)


{-| Removes all non alphabetical characters and condenses it into one hyphen.
    Then lowercases the whole string.
    kobold -> kobold
    GiantRat -> giant-rat
    giant_Rat -> giant-rat
-}
toCSS : String -> String
toCSS str =
    str
        |> Regex.replace Regex.All (Regex.regex "[^a-zA-Z]+") (\_ -> "-")
        |> String.toLower


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
        \xs -> Random.map (\i -> find i xs) (Random.int 0 (List.length xs - 1))


{-| Turn a list of generators into a generator of lists.
-}
combine : List (Generator a) -> Generator (List a)
combine generators =
    case generators of
        [] ->
            constant []

        g :: gs ->
            Random.map2 (::) g (combine gs)
