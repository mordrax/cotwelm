module Combat
    exposing
        ( attack
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
import Random.Pcg as Random exposing (Seed, Generator)
import Hero.Hero as Hero exposing (Hero)
import Attributes exposing (Attributes)
import Monster.Monster as Monster exposing (Monster)
import Item.Weapon as Weapon
import Item.Data
import Types
import Utils.Mass as Mass
import Equipment exposing (Equipment)
import Fighter exposing (Fighter)
import Debug exposing (log)


type alias CTH =
    { baseCTH : Int
    , weaponBulkPenalty : Int
    , armourPenalty : Int
    , sizeModifier : Int
    , blockPenalty : Int
    , critRange : Int
    }



{-
   }| Returns a percentage between 0 and 100 of the chance the attacker has to hit it's
       target based on the attacker's abilities.
-}


chanceToHit : Fighter attacker -> Fighter defender -> CTH
chanceToHit attacker defender =
    let
        ( weapon, armour ) =
            ( Equipment.getWeapon attacker.equipment, Equipment.getArmour attacker.equipment )

        armourMass =
            armour
                |> Maybe.map (.base >> .mass)
                |> Maybe.withDefault (Mass.Mass 0 0)

        -- At max str, can use max weight armour (plate) without penalty.
        -- At min str, when using plate, gives a max penalty of -20% CTH
        armourPenalty =
            (toFloat attacker.attributes.str / 100 - toFloat armourMass.weight / 15000)
                * 20
                |> clamp -20 0
                |> round

        weaponMass =
            weapon
                |> Maybe.map (.base >> .mass)
                |> Maybe.withDefault (Mass.Mass 0 0)

        -- Weapons less than 5000 (axe) has no bulk penalty, after which all weapons
        -- up to the THS at 12000 gets a linear penalty up to x% CTH
        weaponBulkPenalty =
            (1 - toFloat weaponMass.bulk / 6000)
                * 15
                |> clamp -15 15
                |> round

        sizeModifier =
            defender.bodySize
                |> bodySizeToDodge
                |> clamp -10 10
    in
        { baseCTH = attacker.attributes.dex
        , armourPenalty = armourPenalty
        , weaponBulkPenalty = weaponBulkPenalty
        , sizeModifier = sizeModifier
        , blockPenalty = 5
        , critRange = 20
        }


bodySizeToDodge : Types.BodySize -> Int
bodySizeToDodge bodySize =
    case bodySize of
        Types.Tiny ->
            10

        Types.Small ->
            5

        Types.Medium ->
            0

        Types.Large ->
            -5

        Types.Giant ->
            -10


attack : Fighter attacker -> Fighter defender -> Generator (String ,Fighter defender)
attack attacker defender =
    let
        cth =
            chanceToHit attacker defender

        hitDie =
            Random.int 1 100

        damageDie =
            damageCalculator attacker
    in
        Random.map2 (hitResult cth defender) hitDie damageDie


hitResult : CTH -> Fighter defender -> Int -> Int -> (String, Fighter defender)
hitResult cth defender hitRoll damageRoll =
    let
        takeDamage damage =
            { defender | stats = Stats.takeHit damage defender.stats }

        _ =
            Debug.log "hitResult"
                { cth = cth
                , hitRoll = hitRoll
                , damageRoll = damageRoll
                }

        noPenaltyCTH =
            cth.baseCTH + (max 0 cth.sizeModifier)
    in
        if hitRoll > noPenaltyCTH then
            -- the roll was so high (high is bad) that even without penalties, attack still misses
            ("You're lucky you didn't trip over your own sword.", defender)
        else if hitRoll > noPenaltyCTH + cth.armourPenalty then
            ("Your cumbersome armour gets in the way of the attack.", defender)
        else if hitRoll > noPenaltyCTH + cth.weaponBulkPenalty then
            ("You clumsily miss with the unweildy weapon", defender)
        else if hitRoll > cth.baseCTH + cth.sizeModifier then
            ("The small creature nimbly dodges out of the way of your strike.", defender)
        else
            ("The hit connected!", takeDamage damageRoll)


attackSpeed : Item.Data.Weapon -> Attributes -> Float
attackSpeed weapon { str, dex, int, con } =
    1


{-|
-}
damageCalculator : Fighter a -> Generator Int
damageCalculator { attributes, equipment } =
    let
        maybeWeapon =
            Equipment.getWeapon equipment

        dice =
            case maybeWeapon of
                Just weapon ->
                    Weapon.damage weapon

                _ ->
                    Types.Dice 1 (attributes.str // 10) 0
    in
        Dice.roll dice



-- Privates


newHitMessage : String -> String -> String -> String
newHitMessage attacker defender damage =
    let
        msg =
            attacker ++ " hit " ++ defender ++ " for " ++ damage ++ " damage!"

        _ =
            Debug.log msg ()
    in
        msg


weaponArmour : Equipment -> ( Maybe Item.Data.Weapon, Maybe Item.Data.Armour )
weaponArmour equipment =
    ( Equipment.getWeapon equipment, Equipment.getArmour equipment )
