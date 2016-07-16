module Utils.Astar
    exposing
        ( Astar
        , findPath
        )

import Utils.Vector as Vector exposing (..)
import Utils.PairingHeap as Queue exposing (..)
import EveryDict exposing (..)


type Node
    = Node NodeData


{-| h - heuristic, estimated distance to the goal
    d - distance, from the start, so far
    f - priority, h + d
-}
type alias NodeData =
    { point : Vector
    , from : Maybe Node
    , f : Int
    , h : Int
    , d : Int
    }


type alias Cost =
    Int


type alias Model =
    { frontier : Queue.PairingHeap Int Node
    , allNodes : EveryDict Vector Node
    , start : Vector
    , finish : Vector
    }


type Astar
    = A Model


makeNode : ( Vector, Cost ) -> Node
makeNode ( vector, weight ) =
    Node (NodeData vector Nothing 0 0 0)


init : List ( Vector, Cost ) -> ( Vector, Vector ) -> Astar
init inputNodes ( start, finish ) =
    let
        nodeToKVP =
            \(( vector, cost ) as node) -> ( vector, makeNode node )

        tuples =
            List.map nodeToKVP inputNodes
    in
        A
            { frontier = Queue.empty
            , allNodes = EveryDict.fromList tuples
            , start = start
            , finish = finish
            }


findPath : Astar -> List Vector
findPath (A model) =
    []


find : Model -> List Vector
find { frontier, allNodes, start, finish } =
    let
        ( maybeNode, frontier' ) =
            ( Queue.findMin frontier, Queue.deleteMin frontier )

        neighbours =
            case maybeNode of
                Nothing ->
                    Debug.crash "Could not find a path to" finish

                Just node ->
                    neighbours allNodes node
    in
        []

neighbours: EveryDict Vector Node -> Node -> List Node
neighbours allNodes centreNode =
    


{-| Manhattan distance between two points, taking max because you can move diagonally
-}
heuristic : NodeData -> NodeData -> Cost
heuristic a b =
    let
        { x, y } =
            Vector.sub a.point b.point
    in
        max x y
