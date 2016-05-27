module Lib exposing (..)

import Html.Attributes exposing (style)
import Html exposing (..)
import Vector exposing (..)


vectorToHtmlStyle : Vector -> Attribute msg
vectorToHtmlStyle v =
    style
        [ ( "top", (toString (v.y * 32)) ++ "px" )
        , ( "left", (toString (v.x * 32)) ++ "px" )
        ]
