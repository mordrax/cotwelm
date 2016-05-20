module Hero.Hero exposing (..)

import Lib exposing (..)


type alias Model =
    { name : String
    , pos : Coordinate
    }


initHero : Model
initHero =
    { name = "Bob the Brave"
    , pos = ( 5, 10 )
    }
