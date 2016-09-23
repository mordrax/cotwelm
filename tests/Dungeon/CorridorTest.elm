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
    describe "Dungeon.Corridors"
        [ create_corridor
        , add_points_to_corridor_draws_correct_path
        , horizontal_corridors_have_walls
        , diagonal_corridors_have_walls_too
        , diagonal_corridors_have_walls_that_bend_around_corners
        ]



-- Helpers


tilesContains : TileType -> Vectors -> Tiles -> Bool
tilesContains tileType positions tiles =
    let
        paths =
            tiles
                |> List.filter (\x -> Tile.tileType x == tileType)
                |> List.map .position

        isPath pos =
            List.member pos paths
    in
        List.all isPath positions



-- Test


create_corridor : Test
create_corridor =
    let
        corridor =
            Corridor.new ( ( 5, 5 ), N )

        tiles =
            Corridor.toTiles corridor

        floorTile =
            tileAtPosition Tile.DarkDgn ( 5, 5 ) tiles

        doorTile =
            tileAtPosition Tile.DoorClosed ( 5, 5 ) tiles
    in
        test "create a new corridor with a single entry point"
            (\_ ->
                Expect.true "Expected a floor or door at the start point." (floorTile || doorTile)
            )


add_points_to_corridor_draws_correct_path : Test
add_points_to_corridor_draws_correct_path =
    let
        corridor =
            Corridor.new ( ( 5, 5 ), N )

        corridor7 =
            Corridor.add ( 7, 7 ) corridor

        corridor10 =
            Corridor.add ( 7, 10 ) corridor7

        tiles7 =
            Corridor.toTiles corridor7

        tiles10 =
            Corridor.toTiles corridor10

        -- we leave out the start/end as they may not be paths
        expectedTiles7 =
            [ ( 6, 6 ), ( 7, 7 ) ]

        expectedTiles10 =
            expectedTiles7 ++ [ ( 7, 8 ), ( 7, 9 ) ]

        invalidTiles =
            [ ( 1, 10 ), ( 50, 50 ) ]
    in
        describe "adding points to path"
            [ test "add a diagonal point to (7, 7)"
                (\_ ->
                    Expect.true "Expected a path between (5, 5) to (7, 7)" (tilesContains Tile.DarkDgn expectedTiles7 tiles7)
                )
            , test "add a second, vertical point to (7, 10)"
                (\_ ->
                    Expect.true "Expected a path between (5, 5) to (7, 7) to (7, 10)" (tilesContains Tile.DarkDgn expectedTiles10 tiles10)
                )
            , test "make sure invalid tiles are not paths"
                (\_ ->
                    Expect.false "Expected no paths for other tiles" (tilesContains Tile.DarkDgn invalidTiles tiles10)
                )
            ]


horizontal_corridors_have_walls : Test
horizontal_corridors_have_walls =
    let
        tiles =
            Corridor.new ( ( 10, 10 ), E )
                |> Corridor.add ( 8, 10 )
                |> Corridor.toTiles

        walls =
            [ ( 10, 9 )
            , ( 9, 9 )
            , ( 8, 9 )
            , ( 10, 11 )
            , ( 9, 11 )
            , ( 8, 11 )
            ]
    in
        test "horizontal corridors have walls"
            (\_ ->
                Expect.true "Expected horizontal walls wrap the corridor" (tilesContains Tile.Rock walls tiles)
            )


{-|

A diagonal corridor should look something like this with points at (2, 0) and (5, 3).
The facing and corners will affect walls neighbouring the two end points so only test for the middle two
points.

 0 2 4 6
0#\ \##
 ##\ \##
2 ##\ \##
   ##\ \#

# - walls
\ - half walls


-}
diagonal_corridors_have_walls_too : Test
diagonal_corridors_have_walls_too =
    let
        tiles =
            Corridor.new ( ( 5, 3 ), N )
                |> Corridor.add ( 2, 0 )
                |> Corridor.toTiles

        walls =
            [ ( 0, 1 ), ( 1, 1 ), ( 5, 1 ), ( 6, 1 ) ]
                ++ [ ( 1, 2 ), ( 2, 2 ), ( 6, 2 ), ( 7, 2 ) ]

        pathWalls =
            [ ( 2, 1 ), ( 4, 1 ) ]
                ++ [ ( 3, 2 ), ( 5, 2 ) ]
    in
        test "diagonal corridors have walls"
            (\_ ->
                let
                    diagonalRocks =
                        tilesContains Tile.Rock walls tiles

                    diagonalHalfRocks =
                        tilesContains Tile.PathRock pathWalls tiles
                in
                    Expect.true "Expected full and half walls wrap diagonal corridor" (diagonalRocks && diagonalHalfRocks)
            )


{-|

When a corridor turns at a corner, make sure there are walls that encircle around the turn.
Disregard x=0 because that's part of the room
 0 2 4 6
 #####
1D<-\##
 ##\ \##
3###\ \##
 # ##\ \#

# - walls
\ - half walls
D - door of a room, unrelated
< - Westward facing corridor at (1, 1)

-}
diagonal_corridors_have_walls_that_bend_around_corners : Test
diagonal_corridors_have_walls_that_bend_around_corners =
    let
        corridorTilesEndingAt1_1 =
            Corridor.new ( ( 5, 4 ), N )
                |> Corridor.add ( 2, 1 )
                |> Corridor.add ( 1, 1 )
                |> Corridor.toTiles

        corridorTilesStartingAt1_1 =
            Corridor.new ( ( 1, 1 ), W )
                |> Corridor.add ( 2, 1 )
                |> Corridor.add ( 5, 4 )
                |> Corridor.toTiles

        expectedWalls =
            [ ( 1, 0 ), ( 2, 0 ), ( 3, 0 ), ( 4, 0 ), ( 4, 1 ), ( 5, 1 ), ( 1, 2 ), ( 5, 2 ), ( 6, 2 ) ]

        expectedHalfWalls =
            [ ( 3, 1 ), ( 2, 2 ), ( 4, 2 ) ]
    in
        describe "Diagonal corridors meeting rooms"
            [ test "full walls"
                (\_ ->
                    Expect.true "Expected to wrap around corridors"
                        <| tilesContains Tile.Rock expectedWalls corridorTilesEndingAt1_1
                )
            , test "half walls"
                (\_ ->
                    Expect.true "Expected to line the points on either side"
                        <| tilesContains Tile.PathRock expectedHalfWalls corridorTilesEndingAt1_1
                )
            ]



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
