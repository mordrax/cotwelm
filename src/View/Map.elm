module View.Map exposing (view)

import Colors
import Css exposing (..)
import Game.Level as Level
import Game.Model exposing (..)
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Html.Lazy
import Monster exposing (Monster)
import Types exposing (..)
import UI
import Window


styles : List Css.Mixin -> Html.Attribute a
styles =
    asPairs >> HA.style


screenWidth : Window.Size -> Int
screenWidth windowSize =
    min windowSize.width 768


view : Game -> Html Msg
view ({ windowSize, viewport } as model) =
    let
        actualWidth =
            screenWidth windowSize

        adjustViewport html =
            div
                [ styles
                    [ position relative
                    , overflow hidden
                    , width (px <| toFloat actualWidth)
                    , height (px <| toFloat <| windowSize.height * 4 // 5)
                    , Css.borderTop3 (px 2) solid Colors.darkgray
                    , Css.borderBottom3 (px 2) solid Colors.darkgray
                    ]
                ]
                [ div
                    [ styles
                        [ position relative
                        , top (px <| toFloat viewport.y)
                        , left (px <| toFloat viewport.x)
                        ]
                    ]
                    html
                ]

        tupleMap2 fn ( x, y ) =
            ( fn x, fn y )

        divideBy32 x =
            x // 32

        viewSize =
            ( actualWidth, windowSize.height )
                |> tupleMap2 divideBy32

        viewStart =
            ( viewport.x, viewport.y )
                |> tupleMap2 divideBy32
                |> tupleMap2 abs

        lazyLevelView =
            Html.Lazy.lazy3 Level.view ( viewStart, viewSize ) ClickPosition model.level
    in
    div []
        [ viewTitle
        , viewMenu
        , viewQuickMenu
        , adjustViewport
            (lazyLevelView
                :: Hero.view model.hero
                :: viewMonsters model
            )
        ]


viewMonsters : Game -> List (Html Msg)
viewMonsters { level } =
    let
        clickPosition position body =
            div [ HE.onClick (ClickPosition position) ] [ body ]
    in
    level.monsters
        |> List.filter (.visible >> (==) LineOfSight)
        |> List.map (\monster -> clickPosition monster.position (Monster.view monster))


viewTitle : Html never
viewTitle =
    div [ HA.class "window__title" ] [ Html.text "Castle of the Winds" ]


viewMenu : Html Msg
viewMenu =
    let
        viewMenuItem label =
            div [ HA.class "file-menu__item" ] [ Html.text label ]
    in
    div [ HA.class "file-menu" ]
        (List.map viewMenuItem
            [ "File"
            , "Character!"
            , "Inventory!"
            , "Map!"
            , "Spells"
            , "Activate"
            , "Verbs"
            , "Options"
            , "Window"
            , "Help"
            ]
        )


viewQuickMenu : Html Msg
viewQuickMenu =
    div [ HA.class "game-top-hud__quick-menu" ]
        [ div [ HA.class "quick-menu__quick-buttons" ]
            (List.map (\lbl -> UI.btn lbl Died)
                [ "Get"
                , "Free Hand"
                , "Search"
                , "Disarm"
                , "Rest"
                , "Save"
                ]
            )
        , div [ HA.class "quick-menu__quick-spells" ]
            (List.map (\lbl -> UI.btn lbl Died)
                [ ""
                , ""
                , ""
                , ""
                , ""
                , ""
                , ""
                , ""
                , ""
                , ""
                ]
            )
        ]
