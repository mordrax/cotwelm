module Utils.Lib exposing (..)

import Html.Attributes exposing (style)
import Html exposing (..)
import Utils.Vector exposing (..)
import Regex
import String


px : number -> String
px a =
    (toString a) ++ "px"


vectorToHtmlStyle : Vector -> Attribute msg
vectorToHtmlStyle ( x, y ) =
    style
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
                    Result.andThen acc (f x)
            in
                foldResult f nextAcc xs


{-| Removes all non alphabetical characters and condenses it into one hyphen.
    Then lowercases the whole string.
-}
toCSS : String -> String
toCSS str =
    str
        |> Regex.replace Regex.All (Regex.regex "[^a-zA-Z]+") (\_ -> "-")
        |> String.toLower
