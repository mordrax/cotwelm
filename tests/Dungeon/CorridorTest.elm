module Dungeon.CorridorTest exposing (all)

import Test exposing (..)
import Expect exposing (Expectation)
import Dungeon.Corridor as Corridor exposing (..)
import Tile exposing (..)
import Utils.Vector exposing (..)
import Utils.CompassDirection exposing (..)
import List.Extra exposing (find)


all : Test
all =
    describe "Corridors"
        [ test "create a new corridor with a single entry point" createCorridor
        , test "add points to a corridor" addCorridorPoints
        , test "straight corridor has walls" straightCorridorWalls
        , test "diagonal corridor has walls" diagonalCorridorWalls
        ]


createCorridor : () -> Expectation
createCorridor _ =
    let
        corridorPosition =
            ( 5, 5 )

        corridor =
            Corridor.new ( corridorPosition, N )

        tiles =
            Corridor.toTiles corridor

        floorTile =
            tileAtPosition Tile.DarkDgn corridorPosition tiles

        doorTile =
            tileAtPosition Tile.DoorClosed corridorPosition tiles
    in
        Expect.true "A floor or door at the start point" (floorTile || doorTile)


addCorridorPoints : () -> Expectation
addCorridorPoints _ =
    Expect.fail "TODO"


straightCorridorWalls : () -> Expectation
straightCorridorWalls _ =
    Expect.fail "TODO"


diagonalCorridorWalls : () -> Expectation
diagonalCorridorWalls _ =
    Expect.fail "TODO"



------------------
-- Test helpers --
------------------


tileAtPosition : TileType -> Vector -> Tiles -> Bool
tileAtPosition tileType pos tiles =
    let
        atPosition { position } =
            position == pos
    in
        case find atPosition tiles of
            Nothing ->
                False

            Just tile ->
                tileType == Tile.tileType tile
