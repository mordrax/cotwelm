module Utils.Mass
    exposing
        ( Mass(..)
        , Capacity(..)
        , Msg(..)
        , withinCapacity
        , add
        , subtract
        )

{-| A mass is anything with a bulk and a weight.
    Capacity defines the limit of mass that a container of some sort can hold.
-}


type Mass
    = Mass Bulk Weight


type alias Bulk =
    Int


type alias Weight =
    Int


type Capacity
    = Capacity Bulk Weight


type Msg
    = Ok
    | TooHeavy
    | TooBulky


add : Mass -> Mass -> Mass
add (Mass aBulk aWeight) (Mass bBulk bWeight) =
    Mass (aBulk + bBulk) (aWeight + bWeight)


subtract : Mass -> Mass -> Mass
subtract (Mass aBulk aWeight) (Mass bBulk bWeight) =
    Mass (aBulk - bBulk) (aWeight - bWeight)


withinCapacity : Mass -> Capacity -> Msg
withinCapacity (Mass bulk weight) (Capacity capBulk capWeight) =
    case ( bulk > capBulk, weight > capWeight ) of
        ( True, _ ) ->
            TooBulky

        ( _, True ) ->
            TooHeavy

        _ ->
            Ok



{- prettyPrint : Mass -> String
   prettyPrint (Mass model) =
       "Bulk: " ++ (toString model.bulk) ++ ", " ++ "Weight: " ++ (toString model.weight)
       (toString model.bulk) ++ ", " ++ (toString model.weight)
-}
