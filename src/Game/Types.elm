module Game.Types exposing (..)

import Building exposing (Building)
import Utils.Direction exposing (Direction)


type Screen
    = MapScreen
    | InventoryScreen
    | BuildingScreen Building
    | RipScreen


type GameAction
    = Move Direction
    | Walk Direction
    | BackToMapScreen
    | OpenInventory
    | GoUpstairs
    | GoDownstairs
    | Pickup
    | WaitATurn Bool
    | WaitUntilHealed
    | KillHero
    | NoOp
