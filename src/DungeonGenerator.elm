module DungeonGenerator exposing (generate)

import Random exposing (..)
import Dict exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import List.Extra exposing (lift2)


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
    in
        ( Dict.fromList (List.map toKVPair tiles), seed )
