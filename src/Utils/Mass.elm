module Utils.Mass
    exposing
        ( Capacity
        , Mass
        , add
        , subtract
        , withinCapacity
        )

{-| A mass is anything with a bulk and a weight.
Capacity defines the limit of mass that a container of some sort can hold.
-}


type alias Mass =
    { weight : Weight, bulk : Bulk }


type alias Bulk =
    Int


type alias Weight =
    Int


type alias Capacity =
    { maxBulk : Bulk, maxWeight : Weight }


add : Mass -> Mass -> Mass
add a b =
    { bulk = a.bulk + b.bulk
    , weight = a.weight + b.weight
    }


subtract : Mass -> Mass -> Mass
subtract a b =
    { bulk = a.bulk - b.bulk
    , weight = a.weight - b.weight
    }


withinCapacity : Mass -> Capacity -> ( Bool, Bool )
withinCapacity { bulk, weight } { maxBulk, maxWeight } =
    ( bulk <= maxBulk, weight <= maxWeight )
