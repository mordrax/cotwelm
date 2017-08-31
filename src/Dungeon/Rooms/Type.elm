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


type WorldVector
    = World Vector


type alias Dimension =
    Vector


type alias RoomSize =
    Int


type alias RoomTemplate =
    { makeWalls : Dimension -> List LocalVector
    , makeCorners : Dimension -> List LocalVector
    , makeFloors : Dimension -> List LocalVector
    }


localToVector : LocalVector -> Vector
localToVector (Local v) =
    v


worldToVector : WorldVector -> Vector
worldToVector (World v) =
    v


worldAddScalar : WorldVector -> Vector -> WorldVector
worldAddScalar (World v) scalar =
    Vector.add v scalar
        |> World


vectorToWorld : Vector -> WorldVector
vectorToWorld =
    World


vectorToLocal : Vector -> LocalVector
vectorToLocal =
    Local


localToWorld : WorldVector -> LocalVector -> WorldVector
localToWorld (World worldVector) (Local localVector) =
    Vector.add localVector worldVector
        |> World


toWorldVectors : WorldVector -> List LocalVector -> List WorldVector
toWorldVectors worldVector =
    List.map (localToWorld worldVector)
