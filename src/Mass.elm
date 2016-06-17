module Mass
    exposing
        ( Mass
        , Msg(..)
        , new
        , ltOrEqTo
        , add
        , subtract
        , info
        )


type alias Model =
    { bulk : Int
    , weight : Int
    }


type Mass
    = Mass Model


type Msg
    = Ok
    | TooHeavy
    | TooBulky


new : Int -> Int -> Mass
new bulk weight =
    Mass <| Model bulk weight


add : Mass -> Mass -> Mass
add (Mass a) (Mass b) =
    Mass
        { bulk = a.bulk + b.bulk
        , weight = a.weight + b.weight
        }


subtract : Mass -> Mass -> Mass
subtract (Mass a) (Mass b) =
    Mass
        { bulk = a.bulk - b.bulk
        , weight = a.weight - b.weight
        }


ltOrEqTo : Mass -> Mass -> Msg
ltOrEqTo (Mass a) (Mass b) =
    let
        bulkWeight =
            ( a.bulk > b.bulk, a.weight > b.weight )
    in
        case bulkWeight of
            ( True, _ ) ->
                TooBulky

            ( _, True ) ->
                TooHeavy

            _ ->
                Ok


info : Mass -> ( Int, Int )
info (Mass model) =
    ( model.bulk, model.weight )



{- prettyPrint : Mass -> String
   prettyPrint (Mass model) =
       "Bulk: " ++ (toString model.bulk) ++ ", " ++ "Weight: " ++ (toString model.weight)
       (toString model.bulk) ++ ", " ++ (toString model.weight)
-}
