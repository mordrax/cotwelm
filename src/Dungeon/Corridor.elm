module Dungeon.Corridor
    exposing
        ( Corridor
        , init
        )

{-| A corridor is a single width line of tiles that can be either horizontal/vertical or
at 45 degrees. It can have between 0 to a few bends in it depending on the original
game.

    Corridors can also intersect with other corridors forming 'entrances' where another
    corridor intersects with this one.

    A corridor has one entrance and one exit with 0 to many points in between.
    The entrance, exit and all points are List DirectedVector that points to the next point.
    The exit's direction points at where the exit faces but the entrance points to the next
    point so we need a entranceFacing to point backwards to where the entrance comes from.

    ###############
    ########^######
    ######<-X->####
    ########|######
    ########|######
    ########P######
    #######/#######
    ##^###/########
    <-E--P#########
    ##v############

    The above is a corridor with a (E)ntrance facing West and a e(X)it facing North with
    two internal (P)oints.

    Corridors are made up of dungeon floor tiles and wall tiles with entrances on either end.

    At each 'point' in the corridor, a DirectedVector will denote where the corridor is
    and which direction the current point is facing. This facing is important as the next
    point must be somewhere on this path unless it's the last point.

    Corridors will be generated based on whatever coordinate system is passed into it so
    it does not know about world/local coordinates. It just uses whatever it's given and makes
    the corridor relative to that coordinate system.

-}

import Dict exposing (Dict)
import Set exposing (Set)
import Tile exposing (Tile)
import Tile.Types
import Types exposing (..)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (DirectedVector, Vector)


type alias Corridor =
    { path : List Vector
    , lightSource : LightSource
    , walls : List Vector
    , tiles : Dict Vector Tile
    }


init : List Vector -> Corridor
init pathPoints =
    let
        path =
            paths (Debug.log "corridor" pathPoints)

        floorTiles =
            List.map (flip Tile.toTile Tile.Types.DarkDgn) path

        headAsList list =
            list
                |> List.head
                |> Maybe.map (\x -> [ x ])
                |> Maybe.withDefault []

        walls =
            adjacent path

        wallTiles =
            List.map (flip Tile.toTile Tile.Types.Rock) walls

        tiles =
            (floorTiles ++ wallTiles)
                |> List.map (\tile -> ( tile.position, tile ))
                |> Dict.fromList
    in
    { path = path
    , walls = walls
    , lightSource = Artificial
    , tiles = tiles
    }


adjacent : List Vector -> List Vector
adjacent startingVectors =
    let
        lessStartingVectors set =
            Set.diff set (Set.fromList startingVectors)
    in
    startingVectors
        |> List.map Vector.neighbours
        |> List.concat
        |> Set.fromList
        |> lessStartingVectors
        |> Set.toList


{-| A path between any number of vectors using the path function
-}
paths : List Vector -> List Vector
paths points =
    case points of
        [] ->
            []

        a :: [] ->
            []

        a :: b :: rest ->
            path a b ++ paths (b :: rest)


{-| The path between any two vectors is the linear line that connects them.
e.g path (5, 0) (0, 5) = [(5, 0), (4, 1), (3, 2), (2, 3), (1, 4), (0, 5)]
-}
path : Vector -> Vector -> List Vector
path ( x1, y1 ) ( x2, y2 ) =
    let
        length =
            max (abs (x1 - x2)) (abs (y1 - y2)) + 1

        rangeX =
            if x1 == x2 then
                List.repeat length x1
            else
                Misc.range x1 x2

        rangeY =
            if y1 == y2 then
                List.repeat length y1
            else
                Misc.range y1 y2
    in
    List.map2 (,) rangeX rangeY
