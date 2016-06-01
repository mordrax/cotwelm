module Container exposing (Container, new)

{-| A container holds Items with a Mass up to a certain amount. This amount is specified by the weight and bulk capacity of the container.
You can add/remove Items and look through a list of them.

#

Items can also be containers, so containers can hold containers.
-}

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
