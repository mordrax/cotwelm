module SplashView exposing (view, Msg(..))

import Html exposing (..)
import Html.Events as HE
import Html.Attributes as HA
import Css
import Game.Render


type Msg
    = NewGame
    | LoadGame
    | Overview


styles =
    Css.asPairs >> HA.style


addStyle currentStyles style =
    HA.style (Css.asPairs <| style :: currentStyles)


maxWidthHeight : Attribute msg
maxWidthHeight =
    styles
        [ Css.maxWidth (Css.pct 100)
        , Css.maxHeight (Css.pct 100)
        , Css.width (Css.pct 100)
        , Css.height (Css.pct 100)
        ]


{-| Shows the splash screen
@doc view
-}
view : Html msg
view =
    Game.Render.viewRip


nameView : String -> Html msg
nameView =
    text



--view : Html Msg
--view =
--    let
--        bgStyle =
--            [ ( "backgroundColor", "black" ) ]
--    in
--        div
--            [ class "ui center aligned middle aligned grid"
--            , style bgStyle
--            ]
--            [ div [ class "ui one column" ]
--                [ div [ class "ui column" ]
--                    [ img [ src "/assets/landing_cotw1.jpg" ] []
--                    ]
--                , div [ class "ui column" ]
--                    [ img [ src "/assets/landing_cotw2.jpg" ] []
--                    ]
--                , div [ class "ui column" ]
--                    [ div [ class "ui buttons" ]
--                        [ button [ class "ui button primary", onClick NewGame ] [ text "New Game" ]
--                        , button [ class "ui button", onClick LoadGame ] [ text "Load Game" ]
--                        , button [ class "ui button", onClick Overview ] [ text "Overview" ]
--                        ]
--                    ]
--                ]
--            ]
