module Stats
    exposing
        ( Stats
        , Msg(..)
        , init
        , initExperienced
        , incLevel
        , takeHit
        , isDead
        , printHP
        , printSP
        )

import Attributes exposing (Attributes)


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


type alias Stats =
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
init attributes =
    let
        hp =
            hpBonus attributes

        sp =
            spBonus attributes
    in
        Stats hp hp hp sp sp sp <|
            Effects NotPoisoned Calm NotBurning NotFrozen NotShocked


initExperienced : Attributes -> Int -> Stats
initExperienced attributes level =
    init attributes
        |> incLevel level attributes


hpBonus : Attributes -> Int
hpBonus { str, con } =
    con // 15 + str // 25


spBonus : Attributes -> Int
spBonus { int } =
    int // 10


incLevel : Int -> Attributes -> Stats -> Stats
incLevel newLevel attributes stats =
    let
        totalHpBonus =
            newLevel * hpBonus attributes

        totalSpBonus =
            newLevel * spBonus attributes
    in
        { stats
            | currentHP = stats.currentHP + totalHpBonus
            , maxHP = stats.maxHP + totalHpBonus
            , hardMaxHP = stats.hardMaxHP + totalHpBonus
            , currentSP = stats.currentSP + totalSpBonus
            , maxSP = stats.maxSP + totalSpBonus
            , hardMaxSP = stats.hardMaxSP + totalSpBonus
        }


isDead : Stats -> Bool
isDead model =
    model.currentHP < 0


takeHit : Int -> Stats -> Stats
takeHit damage model =
    { model | currentHP = model.currentHP - damage }


printHP : Stats -> String
printHP model =
    printAOverB model.currentHP model.maxHP


printSP : Stats -> String
printSP model =
    printAOverB model.currentSP model.maxSP


printAOverB : a -> b -> String
printAOverB a b =
    toString a ++ " / " ++ toString b
