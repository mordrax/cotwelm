module Game.Render exposing (view, viewRip)

import Building exposing (Building)
import Css exposing (..)
import Game.Model exposing (..)
import Game.Types
import Html exposing (..)
import Html.Attributes as HA
import Message
import Monster exposing (Monster)
import View.CharacterInfo
import View.Hud
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
                , View.Hud.view model
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
