module Dungeon.Corridor exposing (..)

--    exposing
--        ( Corridor
--        , Corridors
--        , init
--        , new
--        , add
--        , toTiles
--        , path
--          --    , addEntrance
--          --    , addPoint
--          --    , addPointAsEntrance
--        )

import List exposing (..)
import Dict exposing (..)
import Set exposing (..)
import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Tile exposing (..)
import Lodash exposing (..)
import Utils.CompassDirection as CompassDirection exposing (..)


type Corridor
    = A Model


type alias Corridors =
    List Corridor


type alias Model =
    { start : DirectedVector
    , points : Vectors
    , end : Maybe DirectedVector
    , walls : List Walls
    , entrances : Entrances
    }


new : DirectedVector -> Corridor
new start =
    A
        { start = start
        , points = []
        , walls = []
        , entrances = []
        , end = Nothing
        }


facing : Vector -> Vectors -> CompassDirection
facing start points =
    case List.reverse (start :: points) of
        last :: secondLast :: _ ->
            Vector.sub last secondLast |> Vector.toDirection

        _ ->
            -- if in doubt, journey to the west
            W


type alias CorridorEnding =
    ( Corridor, Vector, CompassDirection )


allPossibleEndings : Corridor -> DirectedVectors
allPossibleEndings ((A ({ start, points } as model)) as corridor) =
    let
        ( startVector, startDirection ) =
            start

        lastPoint =
            points |> reverse |> headWithDefault startVector

        straightAhead =
            facing startVector points

        straightAheadVector =
            straightAhead |> Vector.fromCompass

        ( left, right ) =
            ( Vector.rotate straightAheadVector Left
            , Vector.rotate straightAheadVector Right
            )

        ( leftEnd, rightEnd ) =
            ( Vector.add lastPoint left
            , Vector.add lastPoint right
            )

        ( leftEndFacing, rightEndFacing ) =
            ( Vector.rotateUnlessCardinal left Left |> Vector.toDirection
            , Vector.rotateUnlessCardinal right Right |> Vector.toDirection
            )

        corridorWithEnd point facing =
            addEnd ( point, facing ) corridor
    in
        (if CompassDirection.isCardinal straightAhead then
            [ ( lastPoint, straightAhead ) ]
         else
            []
        )
            ++ [ ( leftEnd, leftEndFacing ), ( rightEnd, rightEndFacing ) ]


add : Vector -> Corridor -> Corridor
add point (A ({ points } as model)) =
    A { model | points = points ++ [ point ] }


addEnd : DirectedVector -> Corridor -> Corridor
addEnd end (A model) =
    A { model | end = Just end }


end : Corridor -> Maybe DirectedVector
end (A { end }) =
    end


toTiles : Corridor -> Tiles
toTiles (A { start, points, walls, entrances, end }) =
    let
        ( startVector, startDirection ) =
            start

        paths =
            case end of
                Just ( endTile, _ ) ->
                    constructPath (startVector :: points ++ [ endTile ])

                Nothing ->
                    constructPath (startVector :: points)

        data =
            [ ( Tile.DarkDgn, paths )
            , ( Tile.Rock, List.concat walls )
            ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles data)
            ++ List.map Entrance.toTile entrances



-- Privates


{-| Give a list of points that denote the start, end and each turn of a corridor
   generates all the points in between.
-}
constructPath : Vectors -> Vectors
constructPath points =
    case points of
        [] ->
            []

        pt :: [] ->
            [ pt ]

        p1 :: ((p2 :: _) as remainingPts) ->
            (path p1 p2) ++ (constructPath remainingPts)


{-| The path between any two vectors is the linear line that connects them.
   e.g path (5, 0) (0, 5) = [(5, 0), (4, 1), (3, 2), (2, 3), (1, 4), (0, 5)]
-}
path : Vector -> Vector -> Vectors
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            max (abs (x1 - x2)) (abs (y1 - y2))

        rangeX =
            if x1 == x2 then
                repeat length x1
            else
                Lodash.range x1 x2

        rangeY =
            if y1 == y2 then
                repeat length y1
            else
                Lodash.range y1 y2
    in
        List.map2 (,) rangeX rangeY
