module Combat exposing (..)

{-| The art of war takes into account many factors including military morale, supply chain, political stability of the enemy. However, this module takes none of that into account.

Here, we simply calculate the result of a toHit% and then add damage and report back whether the attack killed the opponent or not.
-}

import Stats exposing (..)
import Dice exposing (..)
import Random exposing (..)


attack : Stats -> Stats -> Seed -> ( Stats, Seed )
attack attacker defender seed =
    let
        ( ( min, max ), _, toHit ) =
            Stats.combatStats attacker

        bonus =
            min - 1

        ( cappedDamage, seed' ) =
            Dice.d (max - bonus) seed

        damage =
            cappedDamage + bonus

        ( stats', msg ) =
            Stats.takeHit damage defender
    in
        ( stats', seed' )
