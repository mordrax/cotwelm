module SplashView exposing (view, Msg(..))

import Html as H exposing (..)
import Html.Events as HE
import Html.Attributes as HA
import Css exposing (..)
import Game.Render


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
    --    Game.Render.viewRip
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
    div []
        [ button [ HE.onClick NewGame ] [ H.text "New Game" ]
        , button [ HE.onClick LoadGame ] [ H.text "Load Game" ]
        , button [ HE.onClick Overview ] [ H.text "Overview" ]
        ]
