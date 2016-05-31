module Container exposing (Container, new)

import Mass exposing (..)


type alias Model =
    { bulkCapacity : Int
    , weightCapacity : Int
    , mass : Mass
    }


type Container
    = Container Model


new : Int -> Int -> Container
new bulkCap weightCap =
    Container <| Model bulkCap weightCap (Mass.new 0 0)
