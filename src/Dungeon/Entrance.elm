module Dungeon.Entrance
    exposing
        ( Entrance
        , EntranceType(..)
        , Entrances
        , equal
        , init
        , position
        , toTile
        )

import Dungeon.Rooms.Type exposing (WorldVector(World))
import Tile exposing (..)
import Tile.Types exposing (..)
import Utils.Vector exposing (..)


type EntranceType
    = Door
    | NoDoor


type alias Model =
    ( EntranceType, WorldVector )


type Entrance
    = A Model


type alias Entrances =
    List Entrance


init : EntranceType -> WorldVector -> Entrance
init t v =
    A ( t, v )


position : Entrance -> WorldVector
position (A ( entranceType, position )) =
    position


toTile : Entrance -> Tile
toTile (A ( entranceType, World position )) =
    let
        tileType =
            case entranceType of
                Door ->
                    DoorClosed

                --BrokenDoor ->
                --    Tile.DoorBroken
                NoDoor ->
                    DarkDgn
    in
    Tile.toTile position tileType


equal : Entrance -> Entrance -> Bool
equal (A e1) (A e2) =
    Tuple.second e1 == Tuple.second e2
