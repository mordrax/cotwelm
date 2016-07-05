module Stats
    exposing
        ( Stats
        , Msg(..)
        , new
        , takeHit
        )


type Stats
    = A Model


type Msg
    = Ok
    | Dead


type alias Model =
    { maxHP : Int
    , currentHP : Int
    , maxSP : Int
    , currentSP : Int
    }


new : Int -> Int -> Stats
new hp sp =
    A (Model hp hp sp sp)


takeHit : Int -> Stats -> ( Stats, Msg )
takeHit damage (A model) =
    let
        hp' =
            model.currentHP - damage

        msg =
            if hp' > 0 then
                Ok
            else
                Dead

        _ =
            Debug.log "hp:" ((toString hp') ++ (toString msg))
    in
        ( A { model | currentHP = hp' }, msg )
