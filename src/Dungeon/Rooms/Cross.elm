module Dungeon.Rooms.Cross exposing (template)

{-| Crosses are at a minimum of 7x7 for a single square of doorable wall
The following picture shows a 7x7 cross with possible door positions
on any of the flat walls (not on any of the corners)
"..###.."
"..#.#.."
"###.###"
"#.....#"
"###.###"
"..#.#.."
"..###.."
-}

import Dungeon.Rooms.Type exposing (..)
import List.Extra exposing (..)
import Set exposing (..)


type alias WallSize =
    Int


template : RoomTemplate
template =
    { makeWalls = \_ -> []
    , makeCorners = \_ -> []
    , makeFloors = floors
    }


dot : WallSize -> Int -> Int
dot wallSize axis =
    (wallSize + 1) * axis


{-| F denotes the floor. To get all floor, add up
all Xs inside the dots 1, 2 for Y between 1 and Height - 1 inclusive
and all Ys in the same way

     0 1 2 3  <-- cross dot axis
    "..###.."
    "..#F#.."
    "###F###"
    "#FFFFF#"
    "###F###"
    "..#F#.."
    "..###.."

-}
floors : Dimension -> List LocalVector
floors ( wallSize, _ ) =
    let
        axis =
            dot wallSize

        floorMiddles =
            List.range (axis 1 + 1) (axis 2 - 1)

        vertical =
            lift2 (,) floorMiddles <| List.range (axis 0 + 1) (axis 3 - 1)

        horizontal =
            lift2 (,) (List.range (axis 0 + 1) (axis 3 - 1)) floorMiddles
    in
    (vertical ++ horizontal)
        |> Set.fromList
        |> Set.toList
        |> List.map Local
