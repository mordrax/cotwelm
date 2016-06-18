module Utils.Lib exposing (..)

import Html.Attributes exposing (style)
import Html exposing (..)
import Utils.Vector exposing (..)


vectorToHtmlStyle : Vector -> Attribute msg
vectorToHtmlStyle v =
    style
        [ ( "top", (toString (v.y * 32)) ++ "px" )
        , ( "left", (toString (v.x * 32)) ++ "px" )
        ]
