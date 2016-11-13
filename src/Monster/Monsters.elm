module Monster.Monsters
    exposing
        ( init
        , updateOne
        , removeOne
        )

import Monster.Monster as Monster exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


init : IdGenerator -> ( List Monster, IdGenerator )
init gen =
    let
        monsterFactory =
            [ Monster.init GiantRat ( 10, 1 )
            , Monster.init Kobold ( 4, 10 )
            , Monster.init Hobgoblin ( 5, 11 )
            , Monster.init LargeSnake ( 11, 1 )
            ]
    in
        List.foldl IdGenerator.assignId ( [], gen ) monsterFactory


updateOne : Monster -> List Monster -> List Monster
updateOne monster monsters =
    monster :: removeOne monster monsters


removeOne : Monster -> List Monster -> List Monster
removeOne monster monsters =
    List.filter (\x -> not (IdGenerator.equals monster.id x.id)) monsters
