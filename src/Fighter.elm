module Fighter exposing (..)

import Stats exposing (Stats)
import Attributes exposing (Attributes)
import Equipment exposing (Equipment)
import Types

type alias Fighter =
    { name : String
    , stats : Stats
    , attributes : Attributes
    , equipment : Equipment
    , expLevel : Int
    , bodySize : Types.BodySize
    }