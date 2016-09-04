module Dungeon.DungeonRoom
    exposing
        ( DungeonRoom
        , DungeonRooms
        , generate
        , generateEntrance
        , roomToTiles
        )

import Utils.Vector as Vector exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Room as Room exposing (..)
import Tile exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Random exposing (..)
import Random.Extra exposing (..)
import Dice exposing (..)


type alias DungeonRooms =
    List DungeonRoom


type DungeonRoom
    = A Model


type alias Model =
    { position : Vector
    , room : Room
    }


roomToTiles : DungeonRoom -> Tiles
roomToTiles (A { room, position }) =
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


generate : Config.Model -> Room -> Generator DungeonRoom
generate { dungeonSize } room =
    (Dice.d2d dungeonSize dungeonSize)
        `andThen` (\pos -> Random.Extra.constant (A <| Model pos room))


generateEntrance : DungeonRoom -> Generator ( DungeonRoom, Entrance )
generateEntrance (A ({ room } as model)) =
    let
        entranceGenerator =
            Room.generateEntrance room
    in
        Random.map
            (\( room', entrance' ) ->
                ( A { model | room = room' }, entrance' )
            )
            entranceGenerator
