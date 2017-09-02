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
import Utils.Vector as Vector exposing (DirectedVector, Vector)


type alias Corridor =
    { path : List Vector
    , lightSource : LightSource
    , walls : List Vector
    , tiles : Dict Vector Tile
    }


init : List Vector -> Corridor
init path =
    let
        floorTiles =
            List.map (flip Tile.toTile Tile.Types.DarkDgn) (Debug.log "Corridor: " path)

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
