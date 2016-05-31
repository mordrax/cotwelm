module Mass exposing (Mass, new)


type alias Model =
    { bulk : Int
    , weight : Int
    }


type Mass
    = Mass Model


new : Int -> Int -> Mass
new bulk weight =
    Mass <| Model bulk weight
