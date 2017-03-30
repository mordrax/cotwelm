module Utils.FieldOfView exposing (find, los)

{-| For any given graph, will span out from the source point, collecting visible nodes
    until there are no more nodes to collect.
-}

import Utils.Vector as Vector exposing (Vector)
import EveryDict exposing (EveryDict)
import Utils.BresenhamLine as BresenhamLine
import Set exposing (Set)


type alias Map =
    EveryDict Vector Bool


{-| The algorithm starts off with the source node which is unexplored and adds unexplored
 neighbours that are not part of the explored set. Each time it explores a node, it adds
 the node to the explored set and if visible, then to the visible set.
 Once there are no more unexplored nodes, it returns the visible set.
-}
type alias FieldOfView comparable =
    { unexplored : List comparable
    , explored : Set comparable
    , visible : Set comparable
    , isSeeThrough : comparable -> Bool
    , getNeighbours : comparable -> Set comparable
    }


find : Vector -> (Vector -> Bool) -> (Vector -> Set Vector) -> Set Vector
find source isSeeThrough neighbours =
    let
        fov =
            FieldOfView [ source ] Set.empty Set.empty isSeeThrough neighbours
    in
        find_ source fov
            |> .visible


find_ : Vector -> FieldOfView Vector -> FieldOfView Vector
find_ source ({ unexplored, explored, visible, isSeeThrough, getNeighbours } as fov) =
    let
        addNeighbours x fov =
            let
                neighbours =
                    getNeighbours x
            in
                { fov | unexplored = (Set.diff neighbours fov.explored |> Set.toList) ++ fov.unexplored }
    in
        case unexplored of
            [] ->
                fov

            x :: xs ->
                if los source x isSeeThrough then
                    { fov
                        | unexplored = xs
                        , explored = Set.insert x explored
                        , visible = Set.insert x visible
                    }
                        |> addNeighbours x
                        |> find_ source
                else
                    find_ source
                        { fov
                            | unexplored = xs
                            , explored = Set.insert x explored
                        }


los : Vector -> Vector -> (Vector -> Bool) -> Bool
los a b isSeeThrough =
    let
        isSeeThroughOrEitherEndpoints point =
            (isSeeThrough point) || (point == a) || (point == b) || Vector.adjacent a b
    in
        BresenhamLine.line a b
            |> List.all isSeeThroughOrEitherEndpoints
