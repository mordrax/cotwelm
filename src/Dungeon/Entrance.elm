module Dungeon.Entrance
    exposing
        ( Entrance
        , Entrances
        , EntranceType(..)
        , init
        , toTile
        , position
        , equal
        )

import Utils.Vector exposing (..)
import Tile exposing (..)
import Tile.Types exposing (..)

type EntranceType
    = Door
    | NoDoor


type alias Model =
    ( EntranceType, Vector )


type Entrance
    = A Model


type alias Entrances =
    List Entrance


init : EntranceType -> Vector -> Entrance
init t v =
    A ( t, v )


position : Entrance -> Vector
position (A ( entranceType, position )) =
    position


toTile : Entrance -> Tile
toTile (A ( entranceType, pos )) =
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
        Tile.toTile pos tileType


equal : Entrance -> Entrance -> Bool
equal (A e1) (A e2) =
    Tuple.second e1 == Tuple.second e2
