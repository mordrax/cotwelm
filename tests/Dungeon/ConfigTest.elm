module Dungeon.ConfigTest exposing (all)

import Test exposing (..)
import Expect exposing (Expectation)
import Dungeon.Rooms.Config as Config exposing (..)
import Utils.Vector exposing (..)
import Utils.CompassDirection exposing (..)
import List.Extra exposing (find)


all : Test
all =
    describe "Dungeon.Config"
        [ withinDungeonBoundsTest ]



-- Fixtures


config : Config.Model
config =
    Config.init



-- Tests


withinDungeonBoundsTest : Test
withinDungeonBoundsTest =
    describe "withinDungeonBounds"
        [ test "(5, 5) should be in bounds"
            (\_ -> Expect.equal True (Config.withinDungeonBounds ( 5, 5 ) config))
        , test "(999, 999) should be out of bounds"
            (\_ -> Expect.equal False (Config.withinDungeonBounds ( 999, 999 ) config))
        , test "(-2, -1) should be out of bounds"
            (\_ -> Expect.equal False (Config.withinDungeonBounds (-2, -1 ) config))
        ]

