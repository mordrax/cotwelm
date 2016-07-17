module Utils.Astar exposing (findPath, Position, Path)

-- Deftly 'borrowed' from: https://github.com/krisajenkins/the-prize/blob/master/src/Astar.elm

import Set exposing (Set)
import Dict exposing (Dict)
import Array exposing (Array)


type alias Position =
    ( Int, Int )


type alias Path =
    Array Position


type alias Model =
    { evaluated : Set Position
    , openSet : Set Position
    , costs : Dict Position Int
    , cameFrom : Dict Position Position
    }


initialModel : Position -> Model
initialModel start =
    { evaluated = Set.empty
    , openSet = Set.singleton start
    , costs = Dict.singleton start 0
    , cameFrom = Dict.empty
    }


cheapestOpen : (Position -> Int) -> Model -> Maybe Position
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
        |> List.sortBy snd
        |> List.head
        |> Maybe.map fst


reconstructPath : Dict Position Position -> Position -> Path
reconstructPath cameFrom goal =
    case Dict.get goal cameFrom of
        Nothing ->
            Array.empty

        Just next ->
            Array.push goal
                (reconstructPath cameFrom next)


bestCost : Int -> Maybe Int -> Int
bestCost newDistance oldDistance =
    case oldDistance of
        Nothing ->
            newDistance

        Just distance ->
            min distance newDistance


updateCost : Position -> Position -> Model -> Model
updateCost current neighbour model =
    let
        newCameFrom =
            Dict.insert neighbour current model.cameFrom

        distanceTo =
            Array.length (reconstructPath newCameFrom neighbour)

        newModel =
            { model
                | costs = Dict.insert neighbour distanceTo model.costs
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


astar : (Position -> Position -> Int) -> (Position -> Set Position) -> Position -> Model -> Maybe Path
astar costFn moveFn goal model =
    case cheapestOpen (costFn goal) model of
        Nothing ->
            Nothing

        Just current ->
            if current == goal then
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
                    astar costFn moveFn goal modelWithCosts


{-| Find a path between `start` and `end`. You must supply a cost function and a move function.

  The cost function must estimate the distance between any two
  positions. It doesn't really matter how accurate this estimate is,
  as long as it _never_ underestimates.

  The move function takes a `Position` and returns a `Set` of possible
  places you can move to in one step.

  If this function returns `Nothing`, there is no path between the two
  points. Otherwise it returns `Just` an `Array` of steps from `start`
  to `end`.
-}
findPath : (Position -> Position -> Int) -> (Position -> Set Position) -> Position -> Position -> Maybe Path
findPath costFn moveFn start end =
    initialModel start
        |> astar costFn moveFn end
