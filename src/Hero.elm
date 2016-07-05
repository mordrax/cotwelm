module Hero
    exposing
        ( Hero
        , init
        )

import Utils.Vector as Vector exposing (..)
import Stats exposing (..)


type alias Hero =
    { base : BaseHero
    , position : Vector
    , stats : Stats
    }


type alias Model =
    { name : String
    }


type BaseHero
    = A Model


init : Hero
init =
    { base = (A <| Model "Bob the Brave")
    , position = Vector.new 11 17
    , stats = Stats.new 20 10
    }
