module Utils.Lib exposing (..)

import Html.Attributes exposing (style)
import Html exposing (..)
import Utils.Vector exposing (..)


px : number -> String
px a =
    (toString a) ++ "px"


vectorToHtmlStyle : Vector -> Attribute msg
vectorToHtmlStyle ( x, y ) =
    style
        [ ( "top", px (y * 32) )
        , ( "left", px (x * 32) )
        ]
