module Monster.Monsters exposing (init)

import Monster.Monster as Monster exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)
import Utils.Vector as Vector exposing (..)


init : IdGenerator -> ( List Monster, IdGenerator )
init gen =
    let
        monsterFactory =
            [ Monster.new GiantRat (Vector.new 10 1)
            , Monster.new Kobold (Vector.new 4 10)
            , Monster.new Hobgoblin (Vector.new 5 11)
            , Monster.new LargeSnake (Vector.new 11 1)
            ]
    in
        List.foldl IdGenerator.assignId ( [], gen ) monsterFactory
