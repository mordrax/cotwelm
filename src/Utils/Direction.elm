module Utils.Direction exposing (..)


type Direction
    = N
    | E
    | S
    | W
    | NE
    | NW
    | SE
    | SW


type alias Directions =
    List Direction


isCardinal : Direction -> Bool
isCardinal dir =
    List.member dir cardinalDirections


cardinalDirections : List Direction
cardinalDirections =
    [ N, E, S, W ]


directions : List Direction
directions =
    [ N, E, S, W, NE, NW, SE, SW ]
