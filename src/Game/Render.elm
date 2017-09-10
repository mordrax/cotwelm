module Game.Render exposing (view, viewRip)

import Building exposing (Building)
import Css exposing (..)
import Game.Model exposing (..)
import Game.Types
import Html exposing (..)
import Html.Attributes as HA
import Message
import Monster exposing (Monster)
import Stats exposing (Stats)
import Time.DateTime as DateTime
import View.CharacterInfo
import View.Inventory
import View.Map
import Window


styles : List Css.Mixin -> Html.Attribute a
styles =
    asPairs >> HA.style


screenWidth : Window.Size -> Int
screenWidth windowSize =
    min windowSize.width 768


view : Game -> Html Msg
view model =
    let
        viewGame child =
            div [ HA.class "game" ]
                [ child
                , viewStatus model
                ]
    in
    case model.currentScreen of
        Game.Types.MapScreen ->
            View.Map.view model
                |> viewGame

        Game.Types.BuildingScreen building ->
            case building.buildingType of
                Building.Shop shopType ->
                    Html.map InventoryMsg (View.Inventory.view model.inventory)
                        |> viewGame

                _ ->
                    viewBuilding building
                        |> viewGame

        Game.Types.InventoryScreen ->
            Html.map InventoryMsg (View.Inventory.view model.inventory)
                |> viewGame

        Game.Types.RipScreen ->
            viewGame (viewRip model.lastMonsterToAttackHero (Message.last model.messages) model.turn)

        Game.Types.CharacterInfoScreen ->
            View.CharacterInfo.view model


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
        , viewStats model.hero.expLevel model.hero.stats model.turn
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


viewStats : Int -> Stats -> Int -> Html Msg
viewStats expLevel stats turn =
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

        formattedTime =
            DateTime.fromTimestamp (toFloat turn * 1000)
                |> (\time -> [ DateTime.hour time, DateTime.minute time, DateTime.second time ])
                |> List.map (toString >> String.padLeft 2 '0')
                |> String.join ":"
    in
    div [ HA.class "game-bottom-hud__stats" ]
        [ viewStat [] "Level" (toString expLevel)
        , viewStat hpStyles "HP" ppHP
        , viewStat spStyles "Mana" ppSP
        , viewStat [] "Speed" "100% / 200%"
        , viewStat [] "Time" ("0d, " ++ formattedTime)
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
