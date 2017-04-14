module Game.Render
    exposing
        ( viewport
        , game
        )

import Building exposing (Building)
import Game.Level as Level
import Game.Maps as Maps
import Game.Model exposing (..)
import Hero
import Html exposing (..)
import Html.Attributes as HA
import Html.Lazy
import Inventory exposing (Inventory)
import Monster exposing (Monster)
import Shops exposing (Store)
import Types exposing (..)
import Utils.Vector as Vector exposing (Vector)


{-| Handles all logic and rendering of the game to screen.
-}
viewport : Game -> Game
viewport ({ windowSize, viewport, maps, hero, level } as model) =
    let
        tileSize =
            32

        ( curX, curY ) =
            Vector.scale tileSize hero.position

        ( xOff, yOff ) =
            ( windowSize.width // 2, windowSize.height // 2 )

        tolerance =
            tileSize * 4

        scroll =
            { up = viewport.y + curY <= tolerance
            , down = viewport.y + curY >= (windowSize.height * 4 // 5) - tolerance
            , left = viewport.x + curX <= tolerance
            , right = viewport.x + curX >= windowSize.width - tolerance
            }

        ( mapWidth, mapHeight ) =
            (Level.size level)

        newX =
            if scroll.left || scroll.right then
                clamp (windowSize.width - mapWidth * tileSize) 0 (xOff - curX)
            else
                viewport.x

        newY =
            if scroll.up || scroll.down then
                clamp (windowSize.height * 4 // 5 - mapHeight * tileSize) 0 (yOff - curY)
            else
                viewport.y
    in
        { model | viewport = { x = newX, y = newY } }


game : Game -> Html Msg
game model =
    case model.currentScreen of
        MapScreen ->
            viewMap model

        BuildingScreen building ->
            case building.buildingType of
                Building.Shop shopType ->
                    Html.map InventoryMsg (Inventory.view model.inventory)

                _ ->
                    viewBuilding building

        InventoryScreen ->
            Html.map InventoryMsg (Inventory.view model.inventory)


viewMonsters : Game -> Html Msg
viewMonsters { level } =
    level.monsters
        |> List.filter (.visible >> (==) LineOfSight)
        |> List.map Monster.view
        |> div []


viewMap : Game -> Html Msg
viewMap ({ windowSize, viewport } as model) =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]

        px x =
            (toString x) ++ "px"

        adjustViewport html =
            div
                [ HA.style
                    [ ( "position", "relative" )
                    , ( "overflow", "hidden" )
                    , ( "width", px windowSize.width )
                    , ( "height", px (windowSize.height * 4 // 5) )
                    ]
                ]
                [ div
                    [ HA.style
                        [ ( "position", "relative" )
                        , ( "top", px viewport.y )
                        , ( "left", px viewport.x )
                        ]
                    ]
                    html
                ]

        viewSize =
            ( windowSize.width // 32, windowSize.height // 32 )

        viewStart =
            ( abs <| viewport.x // 32, abs <| viewport.y // 32 )

        lazyLevelView =
            Html.Lazy.lazy3 Level.view ( viewStart, viewSize ) ClickTile model.level
    in
        div []
            [ viewMenu
            , viewQuickMenu
            , adjustViewport
                [ lazyLevelView
                , Hero.view model.hero
                , viewMonsters model
                ]
            , viewStatus model
            ]


viewStatus : Game -> Html Msg
viewStatus model =
    div []
        [ div [ HA.class "ui padded grid" ]
            [ div [ HA.style [ ( "overflow", "auto" ), ( "height", "100px" ) ], HA.class "ui twelve wide column" ]
                [ viewMessages model ]
            , div [ HA.class "ui four wide column" ]
                [ Hero.viewStats model.hero ]
            ]
        ]


viewMessages : Game -> Html Msg
viewMessages model =
    let
        msg txt =
            div [] [ text txt ]
    in
        div [] (List.map msg model.messages)


viewMenu : Html Msg
viewMenu =
    div [ HA.class "ui buttons" ]
        (List.map simpleBtn
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
    div []
        (List.map simpleBtn
            [ "Get"
            , "Free Hand"
            , "Search"
            , "Disarm"
            , "Rest"
            , "Save"
            ]
        )


viewHUD : Game -> Html Msg
viewHUD model =
    div [] [ text "messages" ]


viewBuilding : Building -> Html Msg
viewBuilding building =
    div [] [ h1 [] [ text "TODO: Get the internal view of the building" ] ]


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ HA.class "ui button" ] [ text txt ]
