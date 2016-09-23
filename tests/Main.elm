port module Main exposing (..)

import Test.Runner.Node exposing (run)
import Json.Encode exposing (Value)
import Test exposing (..)
import Expect
import String


-- Dungeon tests

import Dungeon.CorridorTest
import Dungeon.ConfigTest

main : Program Value
main =
    run emit suite


port emit : ( String, Value ) -> Cmd msg


suite : Test
suite =
    describe "Castle of the Winds Test Suite"
        [ Dungeon.CorridorTest.all, Dungeon.ConfigTest.all ]
