module Monster.Monsters exposing (..)

import Monster.Monster as Monster exposing (..)
import Utils.Vector as Vector exposing (..)


init : List Monster
init =
    [ Monster.new GiantRat (Vector.new 10 1)
    , Monster.new Kobold (Vector.new 1 10)
    ]
