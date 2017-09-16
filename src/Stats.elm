module Stats
    exposing
        ( Msg(..)
        , Stats
        , healthDescription
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


healthDescription : Stats -> String
healthDescription stats =
    let
        healthPercent =
            toFloat stats.currentHP / toFloat stats.hardMaxHP
    in
    if healthPercent == 1 then
        "Still in top shape!"
    else if healthPercent >= 0.9 then
        "It is slightly injured."
    else if healthPercent >= 0.8 then
        "It's looking a little worried."
    else if healthPercent >= 0.7 then
        "It is taking the fight seriously now."
    else if healthPercent >= 0.6 then
        "It has a few decent wounds."
    else if healthPercent >= 0.5 then
        "It has seen better days."
    else if healthPercent >= 0.4 then
        "It looks bruised and battered, shoulders drooping."
    else if healthPercent >= 0.3 then
        "It doesn't look like it can handle much more."
    else if healthPercent >= 0.2 then
        "It saying it's prayers."
    else if healthPercent >= 0.1 then
        "It is bleeding from critical wounds."
    else if healthPercent >= 0.0 then
        "It seems to be mortally wounded."
    else if healthPercent >= -0.5 then
        "It is clinically dead."
    else if healthPercent >= -1 then
        "It has been well and truly put down. Well done!"
    else
        "It has been pummeled into an unrecognisable heap."
