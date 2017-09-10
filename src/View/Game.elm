module View.Game exposing (view)

import Building exposing (Building)
import Css exposing (..)
import Game.Model exposing (..)
import Game.Types
import Html exposing (..)
import Html.Attributes as HA
import Message
import View.CharacterInfo
import View.Hud
import View.Inventory
import View.Map
import View.Rip
import View.UI
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
        subMenu =
            [ ( "Exit!", Game.Model.GameAction (Game.Types.GoToScreen Game.Types.MapScreen) )
            , ( "Character!", Game.Model.GameAction (Game.Types.GoToScreen Game.Types.CharacterInfoScreen) )
            , ( "Sort Pack!", NoOp )
            , ( "Name Object", NoOp )
            , ( "Window", NoOp )
            , ( "Activate", NoOp )
            , ( "Help", NoOp )
            ]

        viewGame title menu child =
            div [ HA.class "game" ]
                [ div [ HA.class "window__title" ] [ Html.text title ]
                , View.UI.viewMenu menu
                , child
                , View.Hud.view model
                ]

        mainMenu =
            [ ( "File", NoOp )
            , ( "Character!", GameAction (Game.Types.GoToScreen Game.Types.CharacterInfoScreen) )
            , ( "Inventory!", GameAction Game.Types.OpenInventory )
            , ( "Map!", NoOp )
            , ( "Spells", NoOp )
            , ( "Activate", NoOp )
            , ( "Verbs", NoOp )
            , ( "Options", NoOp )
            , ( "Window", NoOp )
            , ( "Help", NoOp )
            ]
    in
    case model.currentScreen of
        Game.Types.MapScreen ->
            View.Map.view model
                |> viewGame "Castle of the Winds" mainMenu

        Game.Types.BuildingScreen building ->
            case building.buildingType of
                Building.Shop shopType ->
                    Html.map InventoryMsg (View.Inventory.view model.inventory)
                        |> viewGame (toString shopType) subMenu

                _ ->
                    viewBuilding building
                        |> viewGame building.name subMenu

        Game.Types.InventoryScreen ->
            Html.map InventoryMsg (View.Inventory.view model.inventory)
                |> viewGame "Inventory" subMenu

        Game.Types.RipScreen ->
            View.Rip.view model.lastMonsterToAttackHero (Message.last model.messages) model.turn
                |> viewGame "Game Over!" []

        Game.Types.CharacterInfoScreen ->
            View.CharacterInfo.view model
                |> viewGame "Character Info" subMenu


viewBuilding : Building -> Html Msg
viewBuilding building =
    div [] [ h1 [] [ Html.text "TODO: Get the internal view of the building" ] ]
