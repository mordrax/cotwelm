module Utils.FieldOfView exposing (fov, los)

import Utils.Vector as Vector exposing (Vector)
import EveryDict exposing (EveryDict)
import Utils.BresenhamLine as BresenhamLine


type alias Map =
    EveryDict Vector Bool


fov : Vector -> (Vector -> Bool) -> (Vector -> List Vector) -> List Vector
fov source isSeeThrough neighbours =
    fov_ source source isSeeThrough neighbours


fov_ : Vector -> Vector -> (Vector -> Bool) -> (Vector -> List Vector) -> List Vector
fov_ source current isSeeThrough neighbours =
    let
        inSight target =
            los source target isSeeThrough

        inView revealedPosition =
            fov_ source revealedPosition isSeeThrough neighbours
    in
        neighbours current
            |> List.filter inSight
            |> List.map inView
            |> List.concat


los : Vector -> Vector -> (Vector -> Bool) -> Bool
los a b isSeeThrough =
    let
        isSeeThroughOrEitherEndpoints point =
            (isSeeThrough point) || (point == a) || (point == b) || Vector.adjacent a b
    in
        BresenhamLine.line a b
            |> List.all isSeeThroughOrEitherEndpoints
