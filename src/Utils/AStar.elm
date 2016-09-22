module Utils.AStar
    exposing
        ( Position
        , Path
        , findPath
        , straightLineCost
        , pythagoreanCost
        )

{-| The A-Star pathfinding algorithm.

@docs Position
@docs Path
@docs findPath
@docs straightLineCost
@docs pythagoreanCost
-}

import Utils.AStar.Generalised
import Set exposing (Set)


{-| A position is just a pair of (x,y) coordinates.
-}
type alias Position =
    ( Int, Int )


{-| A path is a `List` of `Position`s.
-}
type alias Path =
    List Position


{-| Find a path between the `start` and `end` `Position`s. You must
  supply a cost function and a move function.

  The cost function must estimate the distance between any two
  positions. It doesn't really matter how accurate this estimate is,
  as long as it *never* underestimates.

  The move function takes a `Position` and returns a `Set` of possible
  places you can move to in one step.

  If this function returns `Nothing`, there is no path between the two
  points. Otherwise it returns `Just` a `List` of steps from `start`
  to `end`.

  Example usage.

     import AStar exposing (..)


     type World =
         ...your custom code...


     movesFrom : World -> Position -> Set Position
     movesFrom world (x,y) =
         ...your custom code...


     findPath
         straightLineCost
         (movesFrom currentWorld)
         ( 0, 0 ) ( 2, 0 )
     --> Just [ ( 1, 0 ), ( 2, 0 ) ]
-}
findPath :
    (Position -> Position -> Float)
    -> (Position -> Set Position)
    -> Position
    -> Position
    -> Maybe Path
findPath =
    Utils.AStar.Generalised.findPath


{-| A simple costing algorithm. Think of it as the number of moves a
rook/castle would have to make on a chessboard. Even if your piece can
move diagonally it will still work! A-Star only requires that the cost
function never *under*estimates.
-}
straightLineCost : Position -> Position -> Float
straightLineCost ( x1, y1 ) ( x2, y2 ) =
    let
        dx =
            abs (x1 - x2)

        dy =
            abs (y1 - y2)
    in
        toFloat <| dx + dy


{-| An alternative costing algorithm, which calculates pythagorean distance.
-}
pythagoreanCost : Position -> Position -> Float
pythagoreanCost ( x1, y1 ) ( x2, y2 ) =
    let
        dx =
            toFloat <| abs (x1 - x2)

        dy =
            toFloat <| abs (y1 - y2)
    in
        abs <| (sqrt 2 * min dx dy) + abs (dy - dx)