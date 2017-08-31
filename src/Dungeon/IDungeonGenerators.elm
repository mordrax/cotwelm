module Dungeon.IDungeonGenerators exposing (IDungeonGenerator)

import Dungeon.Rooms.Config as Config
import Random.Pcg exposing (Generator)
import Tile exposing (Tile)


type alias IDungeonGenerator a =
    { clean : a -> a
    , init : Config.Config -> a
    , step : a -> Generator a
    , steps : Int -> a -> Generator a
    , toTiles : a -> List Tile
    }
