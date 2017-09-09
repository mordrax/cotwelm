module Dungeon.Entrance
    exposing
        ( Entrance
        , EntranceType(..)
        , equal
        , init
        , position
        , toTile
        )

import Tile exposing (..)
import Tile.Types exposing (..)
import Utils.Vector exposing (..)


type EntranceType
    = Door
    | NoDoor


type alias Entrance =
    { entranceType : EntranceType
    , position : Vector
    }


init : EntranceType -> Vector -> Entrance
init =
    Entrance


position : Entrance -> Vector
position { entranceType, position } =
    position


toTile : Entrance -> Tile
toTile { entranceType, position } =
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
equal e1 e2 =
    e1.position == e2.position
