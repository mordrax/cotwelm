module Utils.AStarCustom exposing (findPath)

{-| This is the real algorithm. The types are generalised here.

We publish simple types to the user which assume they're working with
a 2D grid.

But in reality, we aren't tied to (x,y) positions and we don't care
what the terrain model is. Positions can be any type you like (as long
as it's `comparable` so that we can use it as a dictionary
key).

But...that makes the type signatures pretty unintuitive to newer
users, so we hide them away here.

@docs findPath

-}

import AllDict as Dict exposing (AllDict)
import Array exposing (Array)
import EverySet as Set exposing (EverySet)
import Tuple exposing (first, second)


{-| Find a path between the `start` and `end` `Position`s. You must
supply a cost function and a move function.

See `AStar.findPath` for a getting-started guide. This is a more
general version of that same function.

-}
findPath :
    (a -> a -> Float)
    -> (a -> EverySet a)
    -> (a -> comparable)
    -> a
    -> a
    -> Maybe (List a)
findPath costFn moveFn hashFn start end =
    initialModel hashFn start
        |> astar costFn moveFn hashFn end
        |> Maybe.map Array.toList


type alias Model a comparable =
    { evaluated : EverySet a
    , openSet : EverySet a
    , costs : AllDict a Float comparable
    , cameFrom : AllDict a a comparable
    }


initialModel : (a -> comparable) -> a -> Model a comparable
initialModel hashFn start =
    { evaluated = Set.empty
    , openSet = Set.singleton start
    , costs = Dict.singleton hashFn start 0
    , cameFrom = Dict.empty hashFn
    }


cheapestOpen : (a -> Float) -> Model a comparable -> Maybe a
cheapestOpen costFn model =
    model.openSet
        |> Set.toList
        |> List.filterMap
            (\position ->
                case Dict.get position model.costs of
                    Nothing ->
                        Nothing

                    Just cost ->
                        Just ( position, cost + costFn position )
            )
        |> List.sortBy second
        |> List.head
        |> Maybe.map first


reconstructPath : AllDict a a comparable -> a -> Array a
reconstructPath cameFrom goal =
    case Dict.get goal cameFrom of
        Nothing ->
            Array.empty

        Just next ->
            Array.push goal
                (reconstructPath cameFrom next)


updateCost : a -> a -> Model a comparable -> Model a comparable
updateCost current neighbour model =
    let
        newCameFrom =
            Dict.insert neighbour current model.cameFrom

        newCosts =
            Dict.insert neighbour distanceTo model.costs

        distanceTo =
            reconstructPath newCameFrom neighbour
                |> Array.length
                |> toFloat

        newModel =
            { model
                | costs = newCosts
                , cameFrom = newCameFrom
            }
    in
    case Dict.get neighbour model.costs of
        Nothing ->
            newModel

        Just previousDistance ->
            if distanceTo < previousDistance then
                newModel
            else
                model


astar :
    (a -> a -> Float)
    -> (a -> EverySet a)
    -> (a -> comparable)
    -> a
    -> Model a comparable
    -> Maybe (Array a)
astar costFn moveFn hashFn goal model =
    case cheapestOpen (costFn goal) model of
        Nothing ->
            Nothing

        Just current ->
            if hashFn current == hashFn goal then
                Just (reconstructPath model.cameFrom goal)
            else
                let
                    modelPopped =
                        { model
                            | openSet = Set.remove current model.openSet
                            , evaluated = Set.insert current model.evaluated
                        }

                    neighbours =
                        moveFn current

                    newNeighbours =
                        Set.diff neighbours modelPopped.evaluated

                    modelWithNeighbours =
                        { modelPopped
                            | openSet =
                                Set.union modelPopped.openSet
                                    newNeighbours
                        }

                    modelWithCosts =
                        Set.foldl (updateCost current) modelWithNeighbours newNeighbours
                in
                astar costFn moveFn hashFn goal modelWithCosts
