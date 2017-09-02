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


{-| A direction is adjacent if they are 45deg apart
-}
isAdjacent : Direction -> Direction -> Bool
isAdjacent a b =
    List.member b (adjacent a)


adjacent : Direction -> List Direction
adjacent a =
    case a of
        N ->
            [ NW, NE ]

        E ->
            [ NE, SE ]

        S ->
            [ SW, SE ]

        W ->
            [ NW, SW ]

        NE ->
            [ N, E ]

        NW ->
            [ N, W ]

        SE ->
            [ S, E ]

        SW ->
            [ S, W ]


isPerpendicular : Direction -> Direction -> Bool
isPerpendicular a b =
    List.member a (perpendicular b)


perpendicular : Direction -> List Direction
perpendicular a =
    case a of
        N ->
            [ W, E ]

        E ->
            [ N, S ]

        S ->
            [ W, E ]

        W ->
            [ N, S ]

        NE ->
            [ NW, SE ]

        NW ->
            [ NE, SW ]

        SE ->
            [ SW, NE ]

        SW ->
            [ SE, NW ]
