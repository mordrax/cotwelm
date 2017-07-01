module Game.Render exposing (game, viewRip, viewport)

import Building exposing (Building)
import Css exposing (..)
import Game.Level as Level
import Game.Model exposing (..)
import Game.Types
import Hero
import Html exposing (..)
import Html.Attributes as HA
import Html.Lazy
import Inventory exposing (Inventory)
import Monster exposing (Monster)
import Stats exposing (Stats)
import Types exposing (..)
import UI
import Utils.Vector as Vector exposing (Vector)


styles : List Css.Mixin -> Html.Attribute a
styles =
    asPairs >> HA.style


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
            Level.size level

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
    let
        viewGame child =
            div [ HA.class "game" ] [ child ]
    in
    case model.currentScreen of
        Game.Types.MapScreen ->
            viewMap model
                |> viewGame

        Game.Types.BuildingScreen building ->
            case building.buildingType of
                Building.Shop shopType ->
                    Html.map InventoryMsg (Inventory.view model.inventory)
                        |> viewGame

                _ ->
                    viewBuilding building
                        |> viewGame

        Game.Types.InventoryScreen ->
            Html.map InventoryMsg (Inventory.view model.inventory)
                |> viewGame

        Game.Types.RipScreen ->
            --            viewRip model
            viewRip
                |> viewGame


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
            toString x ++ "px"

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
    let
        messagesStyle =
            styles [ height (px 100), flexGrow (int 4), Css.border2 (px 1) solid, overflowY scroll ]

        statsStyle =
            styles [ height (px 100), flexGrow (int 1), Css.border2 (px 1) solid ]
    in
    div [ HA.class "game-bottom-hud" ]
        [ viewMessages model
        , viewStats model.hero.stats model.level.title
        ]


viewMessages : Game -> Html Msg
viewMessages model =
    let
        viewMessage msg =
            div [ HA.class "messages__message" ] [ Html.text msg ]
    in
    div [ HA.class "game-bottom-hud__messages" ]
        (List.map viewMessage model.messages)


viewStats : Stats -> String -> Html Msg
viewStats stats levelTitle =
    let
        hpLow =
            toFloat stats.currentHP / toFloat stats.maxHP < 0.2

        hpLessThanTen =
            stats.currentHP < 10

        hpColor =
            if hpLow || hpLessThanTen then
                styles [ Css.color (Css.rgb 255 0 0) ]
            else
                styles []
    in
    div [ HA.class "game-bottom-hud__stats" ]
        [ viewStat "HP" (Stats.printHP stats)
        , viewStat "Mana" (Stats.printSP stats)
        , viewStat "Speed" "100% / 200%"
        , viewStat "Time" "0d, 00:02:57"
        , div [] [ Html.text levelTitle ]
        ]


viewStat : String -> String -> Html never
viewStat label value =
    let
        statLabel lbl =
            div [ HA.class "stat__label" ] [ Html.text lbl ]

        statValue val =
            div [ HA.class "stat__value" ] [ Html.text val ]
    in
    div [ HA.class "game-bottom-hud__stat" ]
        [ statLabel label
        , statValue value
        ]


viewMenu : Html Msg
viewMenu =
    div [ HA.class "ui buttons" ]
        (List.map (\lbl -> UI.btn lbl Died)
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
        (List.map (\lbl -> UI.btn lbl Died)
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
            , turns = "He" ++ " survived " ++ toString 1234 ++ " turns."
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
                    ]
                ]
                [ Html.text str ]
    in
    div
        [ styles
            [ marginTop (vw 8)
            , displayFlex
            , flexDirection column
            , justifyContent spaceBetween
            , height (vw 28)
            ]
        ]
        [ inscribe killedBy
        , inscribeParagraph lastMessage
        , inscribe turns
        ]


inscribeParagraph : String -> Html msg
inscribeParagraph paragraph =
    span
        []
        [ Html.text paragraph
        ]


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ HA.class "ui button" ] [ Html.text txt ]



-------------------
-- Style helpers --
-------------------
