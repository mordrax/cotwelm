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
            [0..10]

        toKVPair =
            \tile -> ( tile.position, tile )

        --tiles =
        --    List.Extra.lift2 (\x y -> makeTile x y Tile.DarkDgn) roomSize roomSize
        -- TODO: currently not using room
        -- need to incorporate walls, floor, entrances into dungeon
        -- start empty, add rooms, connections, lastly rocks to fill gap
        ( room, seed' ) =
            Room.new Room.Rectangular ( 3, 3 ) ( 6, 6 ) seed

        ( doors, walls, floor ) =
            Room.design room

        items =
            --[ ( Tile.DarkDgn, floor ), ( Tile.Rock, walls ), ( Tile.DoorClosed, doors ) ]
            [ ( Tile.DarkDgn, floor ), ( Tile.Rock, walls ) ]

        makeTiles =
            \( tileType, positions ) ->
                List.map (\pos -> Tile.toTile pos tileType) positions

        tiles =
            List.concat (List.map makeTiles items)
    in
        ( Dict.fromList (List.map toKVPair tiles), seed' )



--( Dict.empty, seed' )
