module Mass exposing (Mass, new, getMass)


type alias Model =
    { bulk : Int
    , weight : Int
    }


type Mass
    = Mass Model


new : Int -> Int -> Mass
new bulk weight =
    Mass <| Model bulk weight


getMass : Mass -> ( Int, Int )
getMass (Mass model) =
    ( model.bulk, model.weight )
