module Dungeon.Rooms.DeadEnd exposing (template)

{-| -}

import Dungeon.Rooms.Type exposing (..)


template : RoomTemplate
template =
    { makeWalls = walls
    , makeCorners = corners
    , makeFloors = floors
    }


corners : Dimension -> List LocalVector
corners dimension =
    []


floors : Dimension -> List LocalVector
floors dimension =
    []


walls : Dimension -> List LocalVector
walls dimension =
    []
