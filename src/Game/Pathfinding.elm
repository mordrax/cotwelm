module Game.Pathfinding exposing (findPath)

import AStar
import Game.Model exposing (Game)
import Game.Level as Level exposing (Level)
import Hero exposing (Hero)
import Monster exposing (Monster)
import Set exposing (Set)
import Utils.Vector as Vector exposing (Vector)


{-| Manages pathfinding in the game. Is an adapter between the game code
 and the AStar pathing library being used.
-}
findPath : Vector -> Vector -> Bool -> Game -> List Vector
findPath from to ignoreBuildingObstruction game =
    let
        neighboursFunction =
            if ignoreBuildingObstruction then
                neighboursIncludeBuildings
            else
                neighbours
    in
        AStar.findPath heuristic (neighboursFunction game) from to
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


neighboursIncludeBuildings : Game -> Vector -> Set Vector
neighboursIncludeBuildings { level, hero } position =
    let
        notObstructed vector =
            case (Level.queryPosition vector level) of
                ( False, _, Nothing ) ->
                    True

                _ ->
                    False
    in
        position
            |> Vector.neighbours
            |> List.filter notObstructed
            |> Set.fromList


neighbours : Game -> Vector -> Set Vector
neighbours { level } position =
    let
        notObstructed vector =
            not (isObstructed vector level)
    in
        position
            |> Vector.neighbours
            |> List.filter notObstructed
            |> Set.fromList


neighbours_ : Vector -> (Vector -> Bool) -> Set Vector
neighbours_ position isObstructedFilter =
    position
        |> Vector.neighbours
        |> List.filter isObstructedFilter
        |> Set.fromList


isObstructed : Vector -> Level -> Bool
isObstructed position level =
    case Level.queryPosition position level of
        ( False, Nothing, Nothing ) ->
            False

        _ ->
            True
