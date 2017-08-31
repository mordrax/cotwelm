module Game.Render exposing (game, viewRip, viewport)

import Building exposing (Building)
import Colors
import Css exposing (..)
import Equipment
import Game.Level as Level
import Game.Model exposing (..)
import Game.Types
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Lazy
import Inventory exposing (Inventory)
import Item.Pack
import Message
import Monster exposing (Monster)
import Stats exposing (Stats)
import Types exposing (..)
import UI
import Utils.Vector as Vector exposing (Vector)
import View.Difficulty
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
            viewGame (viewRip model.lastMonsterToAttackHero (Message.last model.messages) model.turn)

        Game.Types.CharacterInfoScreen ->
            viewCharInfo model


viewMonsters : Game -> Html Msg
viewMonsters { level } =
    level.monsters
        |> List.filter (.visible >> (==) LineOfSight)
        |> List.map Monster.view
        |> div []


viewCharInfo : Game -> Html Msg
viewCharInfo { hero, difficulty } =
    let
        stats lbl val =
            div [ HA.class "row" ]
                [ div [ HA.class "block" ] [ Html.text lbl ]
                , div [ HA.class "block", styles [ textAlign right ] ] [ Html.text val ]
                ]

        { weight, bulk } =
            hero.equipment
                |> Equipment.getPack
                |> Maybe.map (Item.Pack.info >> Tuple.first)
                |> Maybe.withDefault { weight = 0, bulk = 0 }

        icon =
            case difficulty of
                Easy ->
                    View.Difficulty.easy

                Intermediate ->
                    View.Difficulty.intermediate

                Hard ->
                    View.Difficulty.hard

                Impossible ->
                    View.Difficulty.impossible
    in
    div [ HA.class " column", styles [ maxWidth (px 640), margin auto ] ]
        [ div [ HA.class "window__title" ]
            [ Html.text "Character Info" ]
        , div [ HA.class "container", styles [ backgroundColor Colors.white ] ]
            [ div [ HA.class "row", styles [ margin2 (px 15) zero ] ]
                [ Html.span [] [ Html.text ("Character Name:" ++ UI.nbsp) ]
                , Html.span [] [ Html.text hero.name ]
                ]
            , div [ HA.class "row" ]
                [ div [ HA.class "column block--large" ]
                    [ div [ HA.class "row", styles [ justifyContent spaceBetween, padding2 zero (px 10) ] ]
                        [ div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.str
                                , UI.greenScaledBar hero.attributes.str
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Strength" ]
                            ]
                        , div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.dex
                                , UI.greenScaledBar hero.attributes.dex
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Dexterity" ]
                            ]
                        , div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.int
                                , UI.greenScaledBar hero.attributes.int
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Intelligence" ]
                            ]
                        , div [ HA.class "column", styles [ alignItems center ] ]
                            [ div [ HA.class "row" ]
                                [ UI.scaledBar hero.attributes.con
                                , UI.greenScaledBar hero.attributes.con
                                ]
                            , div [ styles [ textAlign center ] ] [ Html.text "Constitution" ]
                            ]
                        ]
                    , div [ HA.class "row", styles [ marginTop (px 20) ] ]
                        [ div [ styles [ flex (int 2) ] ]
                            [ UI.labeledBox "Game Difficulty"
                                [ div [ HA.class "row", styles [ width (pct 100) ] ]
                                    [ div [ styles [ margin2 auto (px 15) ] ] [ Html.text (toString difficulty) ]
                                    , icon
                                    ]
                                ]
                            ]
                        , div [ styles [ flex (int 1), alignItems center ] ]
                            []
                        ]
                    ]
                , div [ HA.class "column block" ]
                    [ stats "Level:" (toString hero.expLevel)
                    , stats "Experience:" (toString hero.expPoints)
                    , stats "Next Level:" "100"
                    , stats "Weight:" (toString weight)
                    , stats "Bulk:" (toString bulk)
                    , stats "Speed:" "1"
                    , stats "Hit Points:" (toString hero.stats.maxHP)
                    , stats "Mana Points:" (toString hero.stats.maxSP)
                    , stats "Copper:" "Lots!"
                    , stats "Armour Value:" "Vulnerable"
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


viewRip : Maybe Monster -> List String -> Int -> Html msg
viewRip lastMonster lastMsgs turn =
    let
        name =
            "Conan the destroyer"

        monsterName =
            Maybe.map .name >> Maybe.withDefault "Foolishness"

        deathMessage =
            { killedBy = "Killed by: " ++ monsterName lastMonster
            , lastMessages = lastMsgs
            , turns = "He" ++ " survived " ++ toString turn ++ " turns."
            }
    in
    div [ HA.class "rip" ]
        [ div [ HA.class "rip__tombstone" ]
            [ div [ HA.class "tombstone__inscription" ]
                [ inscribeName name
                , inscribeDeathMessage deathMessage
                ]
            ]
        ]


inscribeName : String -> Html a
inscribeName name =
    span [ HA.class "inscription__name" ] [ Html.text name ]


type alias DeathMessage =
    { killedBy : String
    , lastMessages : List String
    , turns : String
    }


inscribeDeathMessage : DeathMessage -> Html msg
inscribeDeathMessage { killedBy, lastMessages, turns } =
    let
        inscribe str =
            span [ HA.class "inscription__text" ] [ Html.text str ]
    in
    div [ HA.class "inscription__message" ]
        [ inscribe killedBy
        , inscribeParagraph lastMessages
        , inscribe turns
        ]


inscribeParagraph : List String -> Html msg
inscribeParagraph paragraph =
    paragraph
        |> List.map Html.text
        |> List.intersperse (Html.br [] [])
        |> p []


simpleBtn : String -> Html Msg
simpleBtn txt =
    div [ HA.class "ui button" ] [ Html.text txt ]



-------------------
-- Style helpers --
-------------------
