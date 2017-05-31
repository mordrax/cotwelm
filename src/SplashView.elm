module SplashView exposing (Msg(..), view)

import Css exposing (..)
import Html as H exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import UI


type Msg
    = NewGame
    | LoadGame
    | Overview


styles =
    Css.asPairs >> HA.style


addStyle currentStyles style =
    HA.style (Css.asPairs <| style :: currentStyles)


{-| Shows the splash screen
@doc view
-}
view : Html Msg
view =
    div
        [ styles
            [ displayFlex
            , alignItems center
            , justifyContent center
            , flexDirection column
            , height (pct 100)
            , backgroundColor (rgb 0 0 0)
            ]
        ]
        [ cotwTitleImg
        , cotwSubtitleImg
        , newLoadOverview
        ]


cotwTitleImg : Html a
cotwTitleImg =
    img [ HA.src "/assets/landing_cotw1.jpg" ] []


cotwSubtitleImg : Html a
cotwSubtitleImg =
    img [ HA.src "/assets/landing_cotw2.jpg" ] []


newLoadOverview : Html Msg
newLoadOverview =
    div
        [ styles
            [ position absolute
            , bottom (px 15)
            , margin2 zero auto
            , width (pct 70)
            , displayFlex
            , justifyContent spaceBetween
            ]
        ]
        [ UI.btn "Start New Game" NewGame
        , UI.btn "Load Saved Game" LoadGame
        , UI.btn "Overview" Overview
        ]
