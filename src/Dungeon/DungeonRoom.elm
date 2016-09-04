module Dungeon.DungeonRoom
    exposing
        ( DungeonRoom
        , roomToTiles
        )

import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Tile exposing (..)
import Dungeon.Entrance as Entrance exposing (..)


type DungeonRoom
    = A Model


type alias Model =
    { position : Vector
    , room : Room
    }


type Msg
    = NoOp


roomToTiles : Model -> Tiles
roomToTiles { room, position } =
    let
        toWorldPos localPos =
            Vector.add position localPos

        roomTileTypes =
            [ ( Tile.DarkDgn, room.floors )
            , ( Tile.Rock, List.concat room.walls )
            , ( Tile.Rock, room.corners )
            ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map toWorldPos
                |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles roomTileTypes)
            ++ List.map Entrance.toTile room.entrances
