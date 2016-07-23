module Dungeon.DungeonGenerator exposing (generate)

import Random exposing (..)
import Dict exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import List.Extra exposing (lift2)
import Dungeon.Room as Room exposing (..)


type alias Model =
    {}


generate : Random.Seed -> ( Dict Vector Tile, Random.Seed )
generate seed =
    let
        roomSize =
            [0..30]

        makeTile =
            \x y -> Tile.toTile x y 'o'

        toKVPair =
            \tile -> ( tile.position, tile )

        tiles =
            List.Extra.lift2 makeTile roomSize roomSize

        -- TODO: currently not using room
        -- need to incorporate walls, floor, entrances into dungeon
        -- start empty, add rooms, connections, lastly rocks to fill gap
        ( room, seed' ) =
            Room.dig Room.Rectangular ( 6, 6 ) ( 2, 5 ) seed
    in
        ( Dict.fromList (List.map toKVPair tiles), seed' )
