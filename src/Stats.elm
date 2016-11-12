module Stats
    exposing
        ( Stats
        , Msg(..)
        , init
        , takeHit
        , isDead
        , printHP
        , printSP
        )


type Stats
    = Stats Model


type Msg
    = Alive
    | Dead


type alias Model =
    { maxHP : Int
    , currentHP : Int
    , hardMaxHP : Int
    , maxSP : Int
    , currentSP : Int
    , hardMaxSP : Int
    }


init : Int -> Int -> Stats
init hp sp =
    Stats (Model hp hp hp sp sp sp)


isDead : Stats -> Bool
isDead (Stats model) =
    model.currentHP < 0


takeHit : Int -> Stats -> ( Stats, Msg )
takeHit damage (Stats model) =
    let
        hp' =
            model.currentHP - damage

        msg =
            if hp' > 0 then
                Alive
            else
                Dead
    in
        ( Stats { model | currentHP = hp' }, msg )


printHP : Stats -> String
printHP (Stats model) =
    printAOverB model.currentHP model.maxHP


printSP : Stats -> String
printSP (Stats model) =
    printAOverB model.currentSP model.maxSP


printAOverB : a -> b -> String
printAOverB a b =
    toString a ++ " / " ++ toString b
