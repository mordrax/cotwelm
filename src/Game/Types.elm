module Game.Types exposing (..)

import Building exposing (Building)
import Utils.Direction exposing (Direction)
import Utils.Vector exposing (Vector)
import Window


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
    | WaitATurn
    | WaitUntilHealed
    | KillHero
    | NoOp
