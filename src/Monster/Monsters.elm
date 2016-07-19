module Monster.Monsters exposing (init)

import Monster.Monster as Monster exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


init : IdGenerator -> ( List Monster, IdGenerator )
init gen =
    let
        monsterFactory =
            [ Monster.new GiantRat ( 10, 1 )
            , Monster.new Kobold ( 4, 10 )
            , Monster.new Hobgoblin ( 5, 11 )
            , Monster.new LargeSnake ( 11, 1 )
            ]
    in
        List.foldl IdGenerator.assignId ( [], gen ) monsterFactory
