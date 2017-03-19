module Arena.Round exposing (init, Round, fight)

import Arena.Types exposing (..)
import Random.Pcg as Random exposing (Generator, constant)


type alias Round =
    { blue : Blue
    , red : Red
    }


type alias RoundResult =
    { blueTurns : Int
    , redTurns : Int
    , hpRemaining : Int
    , blueHitRed : Int
    , redHitBlue : Int
    }


init : Combat.Fighter a -> Combat.Fighter b -> Round
init blue red =
    Round blue red


fight : Round -> RoundResult
fight round =
    RoundResult 0 0 0 0 0


round : Blue -> Red -> Bool -> RoundResult -> Generator RoundResult
round blue red blueAttacking result =
    let
        resultNextRound blueAttacking =
            case blueAttacking of
                True ->
                    { result | blueRounds = result.blueRounds + 1 }

                False ->
                    { result | redRounds = result.redRounds + 1 }

        updateHitBlue h h_ roundResult =
            { roundResult | redHitBlue = roundResult.redHitBlue + oneIfDamaged h h_ }

        updateHitRed m m_ roundResult =
            { roundResult | blueHitRed = roundResult.blueHitRed + oneIfDamaged m m_ }

        nextAttacker =
            not blueAttacking

        isDamaged a a_ =
            a.stats.currentHP > a_.stats.currentHP

        oneIfDamaged a a_ =
            if isDamaged a a_ then
                1
            else
                0
    in
        if Stats.isDead blue.stats then
            Random.constant { result | hpRemaining = 0 }
        else if Stats.isDead red.stats then
            Random.constant { result | hpRemaining = blue.stats.currentHP }
        else if blueAttacking == True then
            Combat.attack blue red
                |> Random.andThen
                    (\( _, red_ ) ->
                        resultNextRound blueAttacking
                            |> updateHitRed red red_
                            |> round blue red_ nextAttacker
                    )
        else
            Combat.defend red blue
                |> Random.andThen
                    (\( _, blue_ ) ->
                        resultNextRound blueAttacking
                            |> updateHitBlue blue blue_
                            |> round blue_ red nextAttacker
                    )
