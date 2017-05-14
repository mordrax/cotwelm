module Game.Render
    exposing
        ( viewport
        , game
        , viewRip
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
import Game.Types
import Utils.Vector as Vector exposing (Vector)
import Css exposing (..)


styles =
    asPairs >> HA.style


addStyle currentStyles style =
    HA.style (asPairs <| style :: currentStyles)


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
        Game.Types.MapScreen ->
            viewMap model

        Game.Types.BuildingScreen building ->
            case building.buildingType of
                Building.Shop shopType ->
                    Html.map InventoryMsg (Inventory.view model.inventory)

                _ ->
                    viewBuilding building

        Game.Types.InventoryScreen ->
            Html.map InventoryMsg (Inventory.view model.inventory)

        Game.Types.RipScreen ->
            --            viewRip model
            viewRip


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
            h1 [] [ Html.text ("Welcome to Castle of the Winds: " ++ model.name) ]

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
            div [] [ Html.text txt ]
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
    div [] [ Html.text "messages" ]


viewBuilding : Building -> Html Msg
viewBuilding building =
    div [] [ h1 [] [ Html.text "TODO: Get the internal view of the building" ] ]



--viewRip : Game -> Html Msg
--viewRip model =


viewRip : Html msg
viewRip =
    let
        name =
            "Conan the destroyer"

        deathMessage =
            { killedBy = "Killed by: " ++ "Giant Ego"
            , lastMessage =
                "Conan looked down his nose on the pathetic ant and failed to notice the giant queen behind him."
            , turns = "He" ++ " survived " ++ (toString 1234) ++ " turns."
            }
    in
        viewTombstone
            [ viewInscription
                [ inscribeName name
                , inscribeDeathMessage deathMessage
                ]
            ]


viewTombstone : List (Html msg) -> Html msg
viewTombstone =
    div
        [ styles
            [ backgroundImage (url "/assets/original/RIP_blank.png")
            , backgroundSize contain
            , backgroundRepeat noRepeat
            , width (pct 100)
            , height (pct 100)
            , displayFlex
            , justifyContent center
            ]
        ]


viewInscription : List (Html msg) -> Html msg
viewInscription =
    div
        [ styles
            [ marginLeft (vw -10)
            , marginTop (vw 24)
            , width (vw 40)
            ]
        ]


inscribeName : String -> Html a
inscribeName name =
    span
        [ styles
            [ fontSize (vw 4) ]
        ]
        [ Html.text name ]


type alias DeathMessage =
    { killedBy : String
    , lastMessage : String
    , turns : String
    }


inscribeDeathMessage : DeathMessage -> Html msg
inscribeDeathMessage { killedBy, lastMessage, turns } =
    let
        inscribe str =
            span
                [ styles
                    [ fontSize (vw 2)
                    , display block
                    , textAlign center
                    , marginTop (vw 0.2)
                    ]
                ]
                [ Html.text str ]
    in
        div
            [ styles [ marginTop (vw 8) ]
            ]
            [ inscribe killedBy
            , inscribeParagraph lastMessage
            , inscribe turns
            ]


inscribeParagraph : String -> Html msg
inscribeParagraph paragraph =
    span
        [ styles
            [ margin2 (vw 0.4) zero
            ]
        ]
        [ Html.text paragraph
        ]


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ HA.class "ui button" ] [ Html.text txt ]



-------------------
-- Style helpers --
-------------------
