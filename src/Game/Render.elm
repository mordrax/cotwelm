module Game.Render exposing (game, viewRip, viewport)

import Building exposing (Building)
import Colors
import Css exposing (..)
import Game.Level as Level
import Game.Model exposing (..)
import Game.Types
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Lazy
import Inventory exposing (Inventory)
import Message
import Monster exposing (Monster)
import Stats exposing (Stats)
import Types exposing (..)
import UI
import Utils.Vector as Vector exposing (Vector)
import View.Components
import Window


styles : List Css.Mixin -> Html.Attribute a
styles =
    asPairs >> HA.style


screenWidth : Window.Size -> Int
screenWidth windowSize =
    min windowSize.width 768


{-| Handles all logic and rendering of the game to screen.
-}
viewport : Game -> Game
viewport ({ windowSize, viewport, hero, level } as model) =
    let
        tileSize =
            32

        width =
            screenWidth windowSize

        ( curX, curY ) =
            Vector.scale tileSize hero.position

        ( xOff, yOff ) =
            ( width // 2, windowSize.height // 2 )

        tolerance =
            tileSize * 4

        scroll =
            { up = viewport.y + curY <= tolerance
            , down = viewport.y + curY >= (windowSize.height * 4 // 5) - tolerance
            , left = viewport.x + curX <= tolerance
            , right = viewport.x + curX >= width - tolerance
            }

        ( mapWidth, mapHeight ) =
            Level.size level

        newX =
            if scroll.left || scroll.right then
                clamp (width - mapWidth * tileSize) 0 (xOff - curX)
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
            div [ HA.class "game" ]
                [ child
                , viewStatus model
                ]
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

        Game.Types.CharacterInfoScreen ->
            viewCharInfo model.hero


viewMonsters : Game -> Html Msg
viewMonsters { level } =
    level.monsters
        |> List.filter (.visible >> (==) LineOfSight)
        |> List.map Monster.view
        |> div []


viewCharInfo : Hero -> Html Msg
viewCharInfo hero =
    div [ HA.class " column" ]
        [ div [ HA.class "window__title" ]
            [ Html.text "Character Info" ]
        , div [ HA.class "container" ]
            [ div [ HA.class "row" ]
                [ Html.span [] [ Html.text "Character Name" ]
                , Html.span [] [ Html.text hero.name ]
                ]
            , div [ HA.class "row" ]
                [ div [ HA.class "column" ]
                    [ div [ HA.class "row" ] [ Html.text "attributes" ]
                    , div [ HA.class "row" ]
                        [ View.Components.labeledBox "Game Difficulty" [ Html.text "easy" ]
                        , Html.text "icon"
                        ]
                    ]
                , div [ HA.class "column" ]
                    [ div [] [ Html.text "Level" ]
                    , div [] [ Html.text "Experience" ]
                    , div [] [ Html.text "Next Level" ]
                    , div [] [ Html.text "Weight" ]
                    , div [] [ Html.text "Bulk" ]
                    , div [] [ Html.text "Speed" ]
                    , div [] [ Html.text "Hit Points" ]
                    , div [] [ Html.text "Mana Points" ]
                    , div [] [ Html.text "Copper" ]
                    , div [] [ Html.text "Armour Value" ]
                    ]
                ]
            ]
        ]


viewMap : Game -> Html Msg
viewMap ({ windowSize, viewport } as model) =
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
            Html.Lazy.lazy3 Level.view ( viewStart, viewSize ) ClickTile model.level
    in
    div []
        [ viewTitle
        , viewMenu
        , viewQuickMenu
        , adjustViewport
            [ lazyLevelView
            , Hero.view model.hero
            , viewMonsters model
            ]
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
        , viewStats model.hero.expLevel model.hero.stats
        ]


viewMessages : Game -> Html Msg
viewMessages model =
    div [ HA.class "game-bottom-hud__messages" ]
        (viewMessages_ 1 (Message.all model.messages))


viewMessages_ : Int -> List (List String) -> List (Html Msg)
viewMessages_ level messages =
    let
        viewMessage msg =
            div [ HA.class "messages__message", HA.class ("messages__message-level" ++ toString level) ] [ Html.text msg ]
    in
    case messages of
        [] ->
            [ Html.text "" ]

        msgs :: rest ->
            List.map viewMessage msgs ++ viewMessages_ (level + 1) rest


viewStats : Int -> Stats -> Html Msg
viewStats expLevel stats =
    let
        hpStyles =
            if Stats.hpLow stats then
                [ styles [ Css.color (Css.rgb 255 0 0) ] ]
            else
                []

        spStyles =
            if Stats.spLow stats then
                [ styles [ Css.color (Css.rgb 255 0 0) ] ]
            else
                []

        ( ppHP, ppSP ) =
            ( Stats.printHP stats, Stats.printSP stats )
    in
    div [ HA.class "game-bottom-hud__stats" ]
        [ viewStat [] "Level" (toString expLevel)
        , viewStat hpStyles "HP" ppHP
        , viewStat spStyles "Mana" ppSP
        , viewStat [] "Speed" "100% / 200%"
        , viewStat [] "Time" "0d, 00:02:57"
        , div [] [ Html.text "A Tiny Hamlet" ]
        ]


viewStat : List (Html.Attribute never) -> String -> String -> Html never
viewStat customAttributes label value =
    let
        statLabel lbl =
            div [ HA.class "stat__label" ] [ Html.text lbl ]

        statValue val =
            div [ HA.class "stat__value" ] [ Html.text val ]
    in
    div (HA.class "game-bottom-hud__stat" :: customAttributes)
        [ statLabel label
        , statValue value
        ]


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
