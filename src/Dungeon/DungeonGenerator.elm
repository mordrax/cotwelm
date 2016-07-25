module Dungeon.DungeonGenerator exposing (generate)

import Random exposing (..)
import Dict exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import List.Extra exposing (lift2)
import Dungeon.Room as Room exposing (..)
import Dice exposing (..)


type alias Model =
    {}


generate : Random.Seed -> ( Dict Vector Tile, Random.Seed )
generate seed =
    let
        roomSize =
            [0..30]

        toKVPair =
            \tile -> ( tile.position, tile )

        --tiles =
        --    List.Extra.lift2 (\x y -> makeTile x y Tile.DarkDgn) roomSize roomSize
        -- TODO: currently not using room
        -- need to incorporate walls, floor, entrances into dungeon
        -- start empty, add rooms, connections, lastly rocks to fill gap
        --( room, seed' ) =
        --    generateRoom seed 9
        ( rooms, startPositions, seed' ) =
            generateRooms 10 ( [], [], seed )

        tiles =
            List.concat <| List.map2 (\room pos -> roomToTiles room pos) rooms startPositions
    in
        ( Dict.fromList (List.map toKVPair tiles), seed' )


roomToTiles : Room -> Vector -> List Tile
roomToTiles room startPos =
    let
        ( doors, walls, floor ) =
            Room.design room

        toWorldPos =
            \localPos -> Vector.add startPos localPos

        items =
            [ ( Tile.DarkDgn, floor ), ( Tile.Rock, walls ) ]

        makeTiles =
            \( tileType, positions ) ->
                positions
                    |> List.map toWorldPos
                    |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles items)
            ++ List.map
                (\( entrance, pos ) ->
                    Tile.toTile (toWorldPos pos) (entranceToTileType entrance)
                )
                doors


generateRooms : Int -> ( List Room, List Vector, Random.Seed ) -> ( List Room, List Vector, Random.Seed )
generateRooms nRooms ( rooms, startPositions, seed ) =
    case nRooms of
        0 ->
            ( rooms, startPositions, seed )

        n ->
            let
                ( newRoom, seed' ) =
                    generateRoom seed 9

                ( newStartPos, seed'' ) =
                    Dice.roll2D 30 seed'
            in
                generateRooms (n - 1) ( newRoom :: rooms, newStartPos :: startPositions, seed'' )


generateRoom : Random.Seed -> Int -> ( Room, Random.Seed )
generateRoom seed size =
    Room.new Room.Rectangular size seed


entranceToTileType : Room.Entrance -> Tile.TileType
entranceToTileType entrance =
    case entrance of
        Door ->
            Tile.DoorClosed

        BrokenDoor ->
            Tile.DoorBroken

        NoDoor ->
            Tile.DarkDgn
