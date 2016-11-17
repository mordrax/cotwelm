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

import Attributes exposing (Attributes)


type Stats
    = Stats Model


type Msg
    = Alive
    | Dead


type Poison
    = NotPoisoned
    | MinorPoison
    | MajorPoison
    | AcutePoison


type Adrenaline
    = Calm
    | Rush Int
    | CoolOff Int


type Burn
    = NotBurning
    | Burning Int


type Frost
    = NotFrozen
    | Frozen Int


type Shock
    = NotShocked
    | Shocked Int


type alias Model =
    { currentHP : Int
    , maxHP : Int
    , hardMaxHP : Int
    , currentSP : Int
    , maxSP : Int
    , hardMaxSP : Int
    , effects : Effects
    }


type alias Effects =
    { poison : Poison
    , adrenaline : Adrenaline
    , burn : Burn
    , frost : Frost
    , shock : Shock
    }


init : Attributes -> Stats
init { str, con, int } =
    let
        hp =
            con // 10 + str // 20

        sp =
            int // 5
    in
        Stats <| Model hp hp hp sp sp sp <| Effects NotPoisoned Calm NotBurning NotFrozen NotShocked


isDead : Stats -> Bool
isDead (Stats model) =
    model.currentHP < 0


takeHit : Int -> Stats -> Stats
takeHit damage (Stats model) =
    Stats { model | currentHP = model.currentHP - damage }


printHP : Stats -> String
printHP (Stats model) =
    printAOverB model.currentHP model.maxHP


printSP : Stats -> String
printSP (Stats model) =
    printAOverB model.currentSP model.maxSP


printAOverB : a -> b -> String
printAOverB a b =
    toString a ++ " / " ++ toString b
