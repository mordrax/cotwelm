module Lib exposing (..)

import Html.Attributes exposing (style)
import Html exposing (..)


type alias Coordinate =
    { x : Int, y : Int }


coordToHtmlStyle : Coordinate -> Attribute msg
coordToHtmlStyle coords =
    style
        [ ( "top", (toString (coords.y * 32)) ++ "px" )
        , ( "left", (toString (coords.x * 32)) ++ "px" )
        ]
