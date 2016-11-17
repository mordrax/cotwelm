module Utils.Mass
    exposing
        ( Mass
        , Capacity
        , Msg(..)
        , withinCapacity
        , add
        , subtract
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
    { maxWeight : Weight, maxBulk : Bulk }


type Msg
    = Success
    | TooHeavy
    | TooBulky


add : Mass -> Mass -> Mass
add a b =
    Mass (a.bulk + b.bulk) (a.weight + b.weight)


subtract : Mass -> Mass -> Mass
subtract a b =
    Mass (a.bulk - b.bulk) (a.weight - b.weight)


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
