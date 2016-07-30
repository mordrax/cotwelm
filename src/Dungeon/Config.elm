module Dungeon.Config exposing (..)

{-| This module houses the configuration properties of the dungeon such as dungeon size,
max number of rooms on a floor, all details about the rooms, corridor lengths etc...

The module has no model but rather are mostly a collection of constants used by the
dungeon generator to create random dungeon levels.
-}


type RoomType
    = Rectangular
    | Cross
    | Diamond
    | Potion
    | Circular
    | DiagonalSquares
    | DeadEnd


{-| Width and height dimensions of the dungeon level
-}
size : Int
size =
    30


{-| Maximum allowed width and height dimension of a room. The minimum dimension is
   dependent on the room type (e.g the rectangular room has a minimum of 3 x 3)
-}
roomSize : Int
roomSize =
    10


{-| Given a int between 0 and 100 (will cap if outside of range), will return
    a room type based on the hardcoded distribution of types
-}
generateRoomType : Int -> RoomType
generateRoomType uncappedRandomIndex =
    let
        random =
            uncappedRandomIndex
                |> min 0
                |> max 100
    in
        if random < 40 then
            Rectangular
        else if random < 50 then
            Cross
        else if random < 60 then
            Diamond
        else if random < 70 then
            Potion
        else if random < 80 then
            Circular
        else if random < 90 then
            DiagonalSquares
        else
            DeadEnd