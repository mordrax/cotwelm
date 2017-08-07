module Stats
    exposing
        ( Msg(..)
        , Stats
        , hpLow
        , incLevel
        , init
        , initExperienced
        , isDead
        , printHP
        , printSP
        , spLow
        , takeHit
        , tick
        )

import Attributes exposing (Attributes)
import Types exposing (..)


type Msg
    = Alive
    | Dead


type alias RegenerationStatus =
    { hpRate : Int
    , hpCounter : Int
    , spRate : Int
    , spCounter : Int
    }


type alias Stats =
    { currentHP : Int
    , maxHP : Int
    , hardMaxHP : Int
    , currentSP : Int
    , maxSP : Int
    , hardMaxSP : Int
    , effects : Effects
    , regeneration : RegenerationStatus
    }


type alias Effects =
    { poison : PoisonStatus
    , adrenaline : AdrenalineStatus
    , burn : BurnStatus
    , frost : FreezeStatus
    , shock : ShockStatus
    }


tick : Stats -> Stats
tick =
    regenerateHP >> regenerateSP


regenerateHP : Stats -> Stats
regenerateHP ({ regeneration, currentHP, maxHP } as stats) =
    case regeneration.hpCounter of
        0 ->
            { regeneration | hpCounter = regeneration.hpRate }
                |> (\regen ->
                        { stats
                            | regeneration = regen
                            , currentHP = min (currentHP + 1) maxHP
                        }
                   )

        _ ->
            (regeneration.hpCounter - 1)
                |> (\counter -> { regeneration | hpCounter = counter })
                |> (\regen -> { stats | regeneration = regen })


regenerateSP : Stats -> Stats
regenerateSP ({ regeneration, currentSP, maxSP } as stats) =
    case regeneration.hpCounter of
        0 ->
            { stats
                | regeneration = { regeneration | hpCounter = regeneration.hpRate }
                , currentSP = min (currentSP + 1) maxSP
            }

        _ ->
            { stats
                | regeneration = { regeneration | hpCounter = regeneration.hpCounter - 1 }
            }


init : Attributes -> Stats
init attributes =
    let
        baseHp =
            10

        hp =
            hpBonus attributes + baseHp

        baseSp =
            5

        sp =
            spBonus attributes + baseSp
    in
    { currentHP = hp
    , maxHP = hp
    , hardMaxHP = hp
    , currentSP = sp
    , maxSP = sp
    , hardMaxSP = sp
    , effects = Effects NotPoisoned Calm NotBurning NotFrozen NotShocked
    , regeneration =
        { hpRate = 10
        , hpCounter = 10
        , spRate = 10
        , spCounter = 10
        }
    }


initExperienced : Attributes -> Int -> Stats
initExperienced attributes level =
    init attributes
        |> incLevel level attributes


hpBonus : Attributes -> Int
hpBonus { str, con } =
    con // 10 + str // 20


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


hpLow : Stats -> Bool
hpLow { currentHP, maxHP } =
    let
        hpLessThanTen =
            currentHP < 10

        hpLowerThanThreshold =
            toFloat currentHP / toFloat maxHP < 0.2
    in
    hpLessThanTen || hpLowerThanThreshold


spLow : Stats -> Bool
spLow { currentSP, maxSP } =
    let
        spLessThanTen =
            currentSP < 10

        spLowerThanThreshold =
            toFloat currentSP / toFloat maxSP < 0.2
    in
    spLessThanTen || spLowerThanThreshold


printHP : Stats -> String
printHP model =
    printAOverB model.currentHP model.maxHP


printSP : Stats -> String
printSP model =
    printAOverB model.currentSP model.maxSP


printAOverB : a -> b -> String
printAOverB a b =
    toString a ++ " [" ++ toString b ++ "]"
