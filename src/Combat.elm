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
  - A larger defender is easier to hit.
  - Bulk, a smaller weapon is easier to hit with.
  - Wearing bulky armour negatively affects your CTH.

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
import Utils.Mass as Mass
import EveryDict exposing (EveryDict)


cth : Attributes -> Item.Data.Weapon -> Item.Data.Armour -> Monster.Size -> Int
cth { str, dex } weapon armour monsterSize =
    let
        baseCTH =
            dex

        (Mass.Mass armourWeight armourBulk) =
            armour.base.mass

        -- At max str, can use max weight armour (plate) without penalty.
        -- At min str, when using plate, gives a max penalty of -20% CTH
        armourPenalty =
            (str / 100 + armourWeight / 15000) * 20 |> clamp -20 0

        (Mass.Mass weaponWeight weaponBulk) =
            weapon.base.mass

        -- Weapons less than 5000 (axe) has no bulk penalty, after which all weapons
        -- up to the THS at 12000 gets a linear penalty up to x% CTH
        weaponBulkPenalty =
            (weaponBulk - 6000) / 6000 * 15 |> clamp -15 15

        monsterSizePenalty =
            monsterSize
                |> (\x -> EveryDict.get x monsterSizeToPenalty)
                |> Maybe.withDefault 0
    in
        baseCTH + armourPenalty + weaponBulkPenalty + monsterSizePenalty


monsterSizeToPenalty : EveryDict Monster.Size Int
monsterSizeToPenalty =
    EveryDict.fromList
        [ ( Monster.Tiny, -10 )
        , ( Monster.Small, -5 )
        , ( Monster.Medium, 0 )
        , ( Monster.Large, 5 )
        , ( Monster.Giant, 10 )
        ]


attack : Hero -> Monster -> Seed -> ( Monster, Seed )
attack hero monster seed =
    let
        ( stats_, seed_, damage ) =
            hit (Hero.attributes hero) monster.stats seed

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
            hit monster.stats (Hero.attributes hero) seed

        hero_ =
            Hero.setStats heroStats_ hero

        newMsg =
            newHitMessage ("The " ++ Monster.name monster) "you" (toString damage)
    in
        ( hero_, seed_ )


attackSpeed : Item.Data.Weapon -> Attributes -> Float
attackSpeed weapon { str, dex, int, con } =
    1


{-|
-}
damage : Item.Data.Weapon -> Attributes -> Types.DamageDie
damage weapon { str, dex, int, con } =
    let
        baseDamage =
            Weapon.damage weapon
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
