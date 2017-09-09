module Game.Pathfinding
    exposing
        ( findPath
        , findPathForClickNavigation
        , heuristic
        )

import AStar
import Game.Level as Level exposing (Level)
import Set exposing (Set)
import Utils.Vector as Vector exposing (Vector)


{-| Manages pathfinding in the game. Is an adapter between the game code
and the AStar pathing library being used.
-}
findPath : Vector -> Vector -> Level -> ( Level, List Vector )
findPath from to level =
    let
        astar =
            AStar.findPath heuristic (neighbours level obstructionFilter)
    in
    case Level.getPath from to level of
        Just path ->
            ( level, Debug.log "using existing path" path )

        _ ->
            memoisePath from to level astar


findPathForClickNavigation : Vector -> Vector -> Level -> List Vector
findPathForClickNavigation from to level =
    AStar.findPath heuristic (neighbours level buildingAndCreaturesAllowedFilter) from to
        |> Maybe.withDefault []


{-| Manhattan but counts diagonal cost as one (since you can move diagonally)
-}
heuristic : Vector -> Vector -> Float
heuristic start end =
    let
        ( dx, dy ) =
            Vector.sub start end
    in
    (dx ^ 2 + dy ^ 2)
        |> toFloat
        |> sqrt


neighbours : Level -> (Level -> Vector -> Bool) -> Vector -> Set Vector
neighbours level filter position =
    position
        |> Vector.neighbours
        |> List.filter (filter level)
        |> Set.fromList


buildingAndCreaturesAllowedFilter : Level -> Vector -> Bool
buildingAndCreaturesAllowedFilter level position =
    case Level.queryPosition position level of
        ( _, False, _, _ ) ->
            True

        _ ->
            False


obstructionFilter : Level -> Vector -> Bool
obstructionFilter level position =
    case Level.queryPosition position level of
        ( _, False, Nothing, Nothing ) ->
            True

        _ ->
            False


memoisePath :
    Vector
    -> Vector
    -> Level
    -> (Vector -> Vector -> Maybe (List Vector))
    -> ( Level, List Vector )
memoisePath from to level astar =
    let
        newPath =
            astar from to
                |> Maybe.withDefault []
    in
    ( Level.insertPath from to newPath level, newPath )
