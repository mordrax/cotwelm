module Utils.FieldOfView exposing (fov)

import Utils.Vector exposing (Vector)
import EveryDict exposing (EveryDict)
import Utils.BresenhamLine as BresenhamLine


type alias Map =
    EveryDict Vector Bool


fov : Vector -> (Vector -> Bool) -> (Vector -> List Vector) -> List Vector
fov source isSolid neighbours =
    fov_ source source isSolid neighbours


fov_ : Vector -> Vector -> (Vector -> Bool) -> (Vector -> List Vector) -> List Vector
fov_ source current isSolid neighbours =
    let
        inSight target =
            lineOfSight source target isSolid

        inView revealedPosition =
            fov_ source revealedPosition isSolid neighbours
    in
        neighbours current
            |> List.map (inSight >> inView)
            |> List.concat


lineOfSight : Vector -> Vector -> (Vector -> Bool) -> Bool
lineOfSight a b isSolid ({ map, rooms } as level) =
    let
        roomLightSource tile =
            roomAtPosition tile.position rooms
                |> Maybe.map .lightSource
                |> Maybe.withDefault Dark

        isSeeThroughOrEitherEndpoints tile =
            ((not tile.solid) && (tile.type_ /= Tile.Types.DoorClosed) && (roomLightSource tile /= Dark))
                || (tile.position == a)
                || (tile.position == b)
                || (Vector.adjacent a b)
    in
        BresenhamLine.line a b
            |> List.map (\point -> Dict.get point map)
            |> List.map (Maybe.map isSeeThroughOrEitherEndpoints)
            |> List.map (Maybe.withDefault False)
            |> List.all identity
