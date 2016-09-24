module Should exposing (it_should, it_should_not)

import Test exposing (..)
import Expect exposing (Expectation)

it_should : String -> Bool -> Test
it_should msg actual =
    it_should_helper ("should " ++ msg) True actual


it_should_not : String -> Bool -> Test
it_should_not msg actual =
    it_should_helper ("should not" ++ msg) False actual


it_should_helper : String -> Bool -> Bool -> Test
it_should_helper msg expected actual =
    test msg (\_ -> Expect.equal expected actual)
