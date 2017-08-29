module View.Components exposing (..)

import Colors
import Css exposing (..)
import Html exposing (..)
import Html.Attributes as HA


styles : List Mixin -> Attribute msg
styles =
    asPairs >> HA.style


labeledBox : String -> List (Html msg) -> Html msg
labeledBox label children =
    let
        boxLabel =
            div
                [ styles
                    [ position absolute
                    , zIndex (int 1)
                    , top (px -10)
                    , backgroundColor (rgb 255 255 255)
                    , padding2 zero (px 3)
                    ]
                ]
                [ Html.text label ]
    in
    div
        [ styles
            [ border3 (px 1) solid Colors.gray
            , position relative
            , displayFlex
            , justifyContent spaceBetween
            , padding2 (px 15) (px 10)
            ]
        ]
        (boxLabel :: children)
