module Combat
    exposing
        ( attack
        , defend
        )

{-| Combat takes place between an attacker and defender. It only deals with melee combat.
    Castle of the winds does not concern itself with pesky ranged combat. (So bandits firing arrows
    would have to be modeled with magic methinks).

  Combat can be split into the following areas:

  1. Chance to hit - If we do not hit the defender, then no damage is calculated, it is a absolute miss.
  2. Damage - Hitting does not automatically guarantee damage. Armour acts to absorb some of that damage.
  3. Attack speed - Though turn based, there is time in the game, so a monster with a faster attack
                    speed will attack more often.

  Experience (level) plays a part in all aspects of combat as a seasoned warrior will fight better
  than beginners in general.

  -------------
  CHANCE TO HIT
  -------------
  - Dexterity is the major contributor to a weapon's CTH%
  - Defender's dexterity acts as dodging, so a high dex reduces the attacker's CTH.
  - A larger defender is easier to hit.
  - Bulk, a smaller weapon is easier to hit with.

  ------
  DAMAGE
  ------
  - All weapons have a base damage
  - Heavier, unbalanced weapons that takes longer to recover gets bonuses from strength
  - Precision based weapons gets a bonus from dexterity

  ------------
  ATTACK SPEED (assuming all weapons are made balanced and perfect), attack speed depends on:
  ------------
  - Weight, the heavier a weapon, the longer it will take to swing and get back to position
  - Strength, physical strength does not help make an attack faster, but lack of strength will
    impede an attack by making it slower. Only the strongest can wield THS for eg.
  - Bulk, a bulky weapon is more awkward to swing, especially weapons like a morningstar which
    is harder to balance. Attack speed is reduced to account for the recovery time.
  - Dexterity acts to counter-act bulky weapons. A high dexterity allows the attacker to better
    guide the weapon thus minimising the time spent out of balance.
  - Encumberance of the carried items affect the player, mitigated equally by strength and constitution.

    Attack speeds should be capped such that the weakest possible attacker using the heaviest most bulky weapon will not be so ridiculously slow as to render him useless.
    Something like the slowest attack at speed 50% and the fastest possible attack at 200%. At this speed, an attack by the slow person could be followed by 4 attacks from
    the fast person. This should probably be the rule for movements as well.


-}

import Stats exposing (..)
import Dice exposing (..)
import Random.Pcg as Random exposing (..)
import Hero.Hero as Hero exposing (Hero)
import Hero.Attributes as Attributes exposing (Attributes)
import Monster.Monster as Monster exposing (Monster)
import Item.Weapon as Weapon
import Item.Data
import Types


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


attackSpeed : Item.Data.Weapon -> Attributes -> Float
attackSpeed weapon attributes =
    let
        { str, dex, int, con } =
            Attributes.get attributes
    in
        1


{-|
-}
damage : Item.Data.Weapon -> Attributes -> Types.DamageDie
damage weapon attributes =
    let
        baseDamage =
            Weapon.damage weapon

        { str, dex, int, con } =
            Attributes.get attributes
    in
        Types.DamageDie 1 1



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
