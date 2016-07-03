module Monster.Monsters exposing (..)

import Monster.Monster as Monster exposing (..)
import Utils.Vector as Vector exposing (..)


init : List Monster
init =
    [ Monster.new GiantRat (Vector.new 10 1)
    , Monster.new Kobold (Vector.new 4 10)
    , Monster.new Hobgoblin (Vector.new 5 11)
    , Monster.new LargeSnake (Vector.new 11 1)
    ]
