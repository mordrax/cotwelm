module Arena.Round
    exposing
        ( RoundResult
        , fight
        )

import Arena.Types exposing (..)
import Game.Combat as Combat
import Random.Pcg as Random exposing (Generator, constant)
import Stats


type alias RoundResult a b =
    { blue : Combat.Fighter a
    , red : Combat.Fighter b
    , isBlueAttacking : Bool
    , blueTurns : Int
    , redTurns : Int
    , hpRemaining : Int
    , blueHitRed : Int
    , redHitBlue : Int
    }


fight : Combat.Fighter a -> Combat.Fighter b -> Generator (RoundResult a b)
fight blue red =
    fighting (RoundResult blue red True 0 0 0 0 0)


fighting : RoundResult a b -> Generator (RoundResult a b)
fighting ({ blue, red, isBlueAttacking } as result) =
    let
        updateRed newRed =
            { result
                | red = newRed
                , blueTurns = result.blueTurns + 1
                , isBlueAttacking = False
                , blueHitRed = result.blueHitRed + oneIfDamaged result.red newRed
            }

        updateBlue newBlue =
            { result
                | blue = newBlue
                , redTurns = result.redTurns + 1
                , isBlueAttacking = True
                , redHitBlue = result.redHitBlue + oneIfDamaged result.blue newBlue
            }

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
    else if isBlueAttacking == True then
        Combat.attack blue red
            |> Random.andThen (\( _, red_ ) -> fighting (updateRed red_))
    else
        Combat.attack red blue
            |> Random.andThen (\( _, blue_ ) -> fighting (updateBlue blue_))
