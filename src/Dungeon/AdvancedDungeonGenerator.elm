module Dungeon.AdvancedDungeonGenerator
    exposing
        ( Dungeon
        , clean
        , generate
        , init
        , steps
        , toTiles
        )

{-| The 'advanced' dungeon generator uses a different algorithm to try and simplify
room generation. The algorithm is as follows:

1.  Generate a number of non-overlapping dungeon rooms. These are unconnected rooms.
    To stop this from looping infinitely, cap failures.

2.  Pick any unconnected room and connect it to a number of other rooms.
    Add these to the connected rooms.

3.  Repeat.

When attempting to connect rooms, if two corridors collide, there is an option to stop
at the collision point, pass through or remove the corridor.

-}

import Dict
import Dungeon.IDungeonGenerators exposing (IDungeonGenerator)
import Dungeon.Room as Room exposing (Room)
import Dungeon.Rooms.Config as Config exposing (Config)
import EveryDict
import Game.Level exposing (Level)
import Random.Pcg as Random exposing (Generator)
import Tile.Model exposing (Tile)


type alias Dungeon =
    { rooms : List Room
    , config : Config
    }


init : Config -> Dungeon
init _ =
    { rooms = []
    , config = Config.init
    }


generate : Config -> Generator Level
generate config =
    generateRooms 20 config (Random.constant (init config))
        |> Random.map toLevel


toLevel : Dungeon -> Level
toLevel _ =
    Level Dict.empty [] [] [] [] Dict.empty


generateRooms : Int -> Config -> Generator Dungeon -> Generator Dungeon
generateRooms tries config dungeonGen =
    case tries of
        0 ->
            dungeonGen

        n ->
            Room.generate config
                |> Random.map2 (\dungeon room -> addRoom room dungeon) dungeonGen
                |> generateRooms (n - 1) config


steps : Int -> Config -> Dungeon -> Generator Dungeon
steps _ config dungeon =
    generateRooms 20 config (Random.constant dungeon)


clean : Dungeon -> Dungeon
clean =
    identity


toTiles : Dungeon -> List Tile
toTiles dungeon =
    dungeon.rooms
        |> List.concatMap (.tiles >> EveryDict.values)



-- Helpers


{-| If the room can fit in the dungeon, add it
-}
addRoom : Room -> Dungeon -> Dungeon
addRoom room dungeon =
    let
        withinBounds =
            List.all (\x -> Config.withinDungeonBounds x dungeon.config) room.corners

        overlapping =
            List.any (Room.overlap room) dungeon.rooms
    in
    if withinBounds && not overlapping then
        { dungeon | rooms = room :: dungeon.rooms }
    else
        dungeon
