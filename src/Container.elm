module Container exposing (..)


type alias Model =
    { bulkCapacity : Int
    , weightCapacity : Int
    , bulk : Int
    , weight : Int
    }


initModel : Model
initModel =
    { bulkCapacity = 0
    , weightCapacity = 0
    , bulk = 0
    , weight = 0
    }
