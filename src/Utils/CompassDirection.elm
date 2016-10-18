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


type alias CompassDirections =
    List CompassDirection


isCardinal : CompassDirection -> Bool
isCardinal dir =
    List.member dir cardinalDirections


cardinalDirections : List CompassDirection
cardinalDirections =
    [ N, E, S, W ]


directions : List CompassDirection
directions =
    [ N, E, S, W, NE, NW, SE, SW ]
