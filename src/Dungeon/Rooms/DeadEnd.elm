module Dungeon.Rooms.DeadEnd exposing (template)

{-|

-}

import Dungeon.Rooms.Type exposing (..)


template : RoomTemplate
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
