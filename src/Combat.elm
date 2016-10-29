module Combat
    exposing
        ( attack
        , defend
        )

{-| The art of war takes into account many factors including military morale, supply chain, political stability of the enemy. However, this module takes none of that into account.

Here, we simply calculate the result of a toHit% and then add damage and report back whether the attack killed the opponent or not.
-}

import Stats exposing (..)
import Dice exposing (..)
import Random.Pcg as Random exposing (..)
import Hero.Hero as Hero exposing (Hero)
import Monster.Monster as Monster exposing (Monster)


attack : Hero -> Monster -> Seed -> ( Monster, Seed )
attack hero monster seed =
    let
        ( stats_, seed_, damage ) =
            hit (Hero.stats hero) monster.stats seed

        monster_ =
            { monster | stats = stats_ }

        newMsg =
            newHitMessage "You" ("the " ++ Monster.name monster) (toString damage)
    in
        ( monster_, seed_ )


defend : Monster -> Hero -> Seed -> ( Hero, Seed )
defend monster hero seed =
    let
        ( heroStats_, seed_, damage ) =
            hit monster.stats (Hero.stats hero) seed

        hero_ =
            Hero.setStats heroStats_ hero

        newMsg =
            newHitMessage ("The " ++ Monster.name monster) "you" (toString damage)
    in
        ( hero_, seed_ )



-- Privates


newHitMessage : String -> String -> String -> String
newHitMessage attacker defender damage =
    attacker ++ " hit " ++ defender ++ " for " ++ damage ++ " damage!"


hit : Stats -> Stats -> Seed -> ( Stats, Seed, Int )
hit attacker defender seed =
    let
        ( ( min, max ), _, toHit ) =
            Stats.combatStats attacker

        bonus =
            min - 1

        ( cappedDamage, seed' ) =
            Dice.rollD (max - bonus) seed

        damage =
            cappedDamage + bonus

        ( stats', msg ) =
            Stats.takeHit damage defender
    in
        ( stats', seed', damage )
