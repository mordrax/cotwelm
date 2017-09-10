module Game.Types exposing (..)

import Building exposing (Building)
import Utils.Direction exposing (Direction)


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building
    | RipScreen
    | CharacterInfoScreen


type GameAction
    = Move Direction
    | Walk Direction
    | OpenInventory
    | GoUpstairs
    | GoDownstairs
    | Pickup
    | WaitATurn Bool
    | WaitUntilHealed
    | KillHero
    | GoToScreen Screen
    | Look
