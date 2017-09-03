module Dungeon.Rooms.Type exposing (..)

import Utils.Vector as Vector exposing (..)


type RoomType
    = Rectangular
    | Cross
    | Diamond
    | Potion
    | Circular
    | DiagonalSquares
    | DeadEnd


type LocalVector
    = Local Vector


type alias Dimension =
    Vector


type alias RoomSize =
    Int


type alias RoomTemplate =
    { makeWalls : Dimension -> List LocalVector
    , makeCorners : Dimension -> List LocalVector
    , makeFloors : Dimension -> List LocalVector
    }


localToWorld : Vector -> LocalVector -> Vector
localToWorld worldVector (Local localVector) =
    Vector.add localVector worldVector


toWorldVectors : Vector -> List LocalVector -> List Vector
toWorldVectors worldVector =
    List.map (localToWorld worldVector)
