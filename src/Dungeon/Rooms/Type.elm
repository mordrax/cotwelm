module Dungeon.Rooms.Type exposing (..)

import Utils.Vector exposing (..)


type RoomType
    = Rectangular
    | Cross
    | Diamond
    | Potion
    | Circular
    | DiagonalSquares
    | DeadEnd


type alias Dimension =
    Vector


type Entrance
    = Door
    | NoDoor


type alias Door =
    ( Entrance, Vector )


type alias Walls =
    List Vector


type alias Wall =
    Vector


type alias Floors =
    List Vector


type alias RoomSize =
    Int


type alias Room =
    { doors : List Door
    , walls : Walls
    , floors : Floors
    , corners : Walls
    , roomType : RoomType
    , dimension : Dimension
    }
