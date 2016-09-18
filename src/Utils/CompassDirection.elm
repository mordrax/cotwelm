module Utils.CompassDirection exposing (..)


type CompassDirection
    = N
    | E
    | S
    | W
    | NE
    | NW
    | SE
    | SW


isCardinal : CompassDirection -> Bool
isCardinal dir =
    List.member dir cardinalDirections


cardinalDirections : List CompassDirection
cardinalDirections =
    [ N, E, S, W ]
