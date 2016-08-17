module Dungeon.Rooms.Potion exposing (template)

{-|

-}

import Dungeon.Rooms.Type exposing (..)


template : RoomTemplates
template =
    { makeWalls = walls
    , makeCorners = corners
    , makeFloors = floors
    }


corners : RoomSize -> Walls
corners roomSize =
    []


floors : RoomSize -> Floors
floors roomSize =
    []


walls : RoomSize -> List Walls
walls roomSize =
    []
