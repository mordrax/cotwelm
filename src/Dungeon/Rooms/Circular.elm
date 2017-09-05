module Dungeon.Rooms.Circular exposing (template)

{-| -}

import Dungeon.Rooms.Type exposing (..)
import List.Extra
import Utils.Vector


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
floors ( radius, _ ) =
    let
        gridRange =
            List.range 1 (radius * 2 + 3)

        gridCoords =
            List.Extra.lift2 (,) gridRange gridRange

        withinRadius point =
            Utils.Vector.distance ( radius + 1, radius + 1 ) point <= toFloat radius + 0.5
    in
    List.filter withinRadius gridCoords
        |> List.map Local


walls : Dimension -> List LocalVector
walls dimension =
    []
