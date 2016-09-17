module Utils.Lib exposing (..)

import Html.Attributes exposing (style)
import Html exposing (..)
import Utils.Vector exposing (..)


type CompassDirection
    = N
    | E
    | S
    | W
    | NE
    | NW
    | SE
    | SW

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
