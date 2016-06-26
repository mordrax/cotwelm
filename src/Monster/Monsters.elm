module Monster.Monsters exposing (..)

import Monster.Monster as Monster exposing (..)


init : List Monster
init =
    [ Monster.new GiantRat
    , Monster.new Kobold
    ]
