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
            [0..10]

        toKVPair =
            \tile -> ( tile.position, tile )

        --tiles =
        --    List.Extra.lift2 (\x y -> makeTile x y Tile.DarkDgn) roomSize roomSize
        -- TODO: currently not using room
        -- need to incorporate walls, floor, entrances into dungeon
        -- start empty, add rooms, connections, lastly rocks to fill gap
        ( room, seed' ) =
            generateRoom seed ( 3, 6 )

        ( startPos, seed'' ) =
            Dice.roll2D 20 seed'

        toWorldPos =
            \localPos -> Vector.add startPos localPos

        ( doors, walls, floor ) =
            Room.design room

        items =
            [ ( Tile.DarkDgn, floor ), ( Tile.Rock, walls ) ]

        makeTiles =
            \( tileType, positions ) ->
                positions
                    |> List.map toWorldPos
                    |> List.map (\pos -> Tile.toTile pos tileType)

        tiles =
            List.concat (List.map makeTiles items)
                ++ List.map
                    (\( entrance, pos ) ->
                        Tile.toTile (toWorldPos pos) (entranceToTileType entrance)
                    )
                    doors
    in
        ( Dict.fromList (List.map toKVPair tiles), seed'' )


generateRooms : Random.Seed -> Int -> ( List Room, Random.Seed )
generateRooms seed nRooms =
    ( [], seed )


generateRoom : Random.Seed -> ( Int, Int ) -> ( Room, Random.Seed )
generateRoom seed ( minSize, maxSize ) =
    let
        range =
            maxSize - minSize

        ( dimensions, seed' ) =
            Dice.roll2D range seed

        dimensions' =
            Vector.add ( minSize, minSize ) dimensions

        ( startPos, seed'' ) =
            Dice.roll2D 20 seed'

        ( room, seed''' ) =
            Room.new Room.Rectangular dimensions' seed''
    in
        ( room, seed''' )


entranceToTileType : Room.Entrance -> Tile.TileType
entranceToTileType entrance =
    case entrance of
        Door ->
            Tile.DoorClosed

        BrokenDoor ->
            Tile.DoorBroken

        NoDoor ->
            Tile.DarkDgn
