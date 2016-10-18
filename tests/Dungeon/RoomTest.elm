module Dungeon.RoomTest exposing (all)

import Test exposing (..)
import Expect exposing (Expectation)
import Should exposing (..)
import Dungeon.Room as Room
import Utils.Vector exposing (..)
import Utils.CompassDirection exposing (..)
import List.Extra exposing (find)
import Set


all : Test
all =
    describe "Dungeon.Rooms"
        [ floor_adjacency
        ]


floor_adjacency : Test
floor_adjacency =
    let
        floors =
            [ ( 0, 0 ), ( 0, 1 ), ( 1, 0 ), ( 1, 1 ) ]

        expected_adjacencies =
            [ ( 1, 2 ), ( 0, 2 ), ( 2, 1 ), ( 2, 0 ), ( 0, -1 ), ( 1, -1 ), ( -1, 0 ), ( -1, 1 ), ( 2, 2 ), ( 1, 2 ), ( 2, 1 ), ( 0, 2 ), ( -1, 1 ), ( -1, 2 ), ( 2, 0 ), ( 1, -1 ), ( 2, -1 ), ( -1, -1 ), ( -1, 0 ), ( 0, -1 ) ]

        expected_north_adjacencies =
            [ ( 0, 2 ), ( 1, 2 ) ]
    in
        describe "adjacent tiles to a floor space"
            [ it_should "contain all adjacent tiles"
                (listEquals (Room.adjacentToFloors floors) expected_adjacencies)
            , it_should "get the correct northen adjacency"
                (listEquals (Room.adjacentToFloorsWithEmptynessInDirection floors N) expected_north_adjacencies)
            ]


listEquals : List comparable -> List comparable -> Bool
listEquals a b =
    Set.diff (Set.fromList a) (Set.fromList b)
        |> Set.toList
        |> List.length
        |> (==) 0
