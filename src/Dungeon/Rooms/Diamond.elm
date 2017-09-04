module Dungeon.Rooms.Diamond exposing (..)

{-|

    Diamond rooms looks like this with potential entrances on it's single flat wall
    and cornices around the flat wall.

    Diamonds have a minimum size of 5 and their dimensions must
    be the same odd number (x, x) to keep the diagonal walls straight.

    If given a even sized dimension, the last row or column
    will be left blank and treated as if it wasn't part of the room.
      0 2 4
    0".###."
     "#/.\#"
    2"#...#"
     "#\./#"
    4".###."

      0 2 4 6 8
    0"...###..."
     "..#/.\#.."
    2".#/...\#."
     "#/.....\#"
    4"#.......#"
     "#\...../#"
    6".#\.../#."
     "..#\./#.."
    8"...###..."

-}

import Dungeon.Rooms.Type exposing (..)
import List exposing (map2, reverse)
import Set exposing (Set)
import Utils.Vector exposing (Vector)


template : RoomTemplate
template =
    { makeWalls = \_ -> []
    , makeCorners = \_ -> []
    , makeFloors = floors
    }


{-| Diamonds have 4 corners which are also the only walls that can support entrancess.
-}
floors : Dimension -> List LocalVector
floors ( width, _ ) =
    let
        -- get nearest odd number for size
        growth =
            (width + (1 - width % 2)) // 2
    in
    floors_ growth (Set.singleton ( width, width ))
        |> Set.toList
        |> List.map Local


floors_ : Int -> Set Vector -> Set Vector
floors_ growth currentFloors =
    case growth of
        0 ->
            currentFloors

        n ->
            List.concatMap Utils.Vector.cardinalNeighbours (Set.toList currentFloors)
                |> Set.fromList
                |> Set.union currentFloors
                |> floors_ (n - 1)
