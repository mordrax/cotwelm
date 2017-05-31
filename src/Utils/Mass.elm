module Utils.Mass
    exposing
        ( Capacity
        , Mass
        , Msg(..)
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


type Msg
    = Success
    | TooHeavy
    | TooBulky


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


withinCapacity : Mass -> Capacity -> Msg
withinCapacity { bulk, weight } { maxBulk, maxWeight } =
    case ( bulk > maxBulk, weight > maxWeight ) of
        ( True, _ ) ->
            TooBulky

        ( _, True ) ->
            TooHeavy

        _ ->
            Success



{- prettyPrint : Mass -> String
   prettyPrint (Mass model) =
       "Bulk: " ++ (toString model.bulk) ++ ", " ++ "Weight: " ++ (toString model.weight)
       (toString model.bulk) ++ ", " ++ (toString model.weight)
-}
