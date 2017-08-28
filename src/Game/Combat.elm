module Game.Combat
    exposing
        ( AttackMessage
          -- for Arena
        , Fighter
        , attack
        , chanceToHit
        , cthThreshold
        , quadraticCTHCalculator
        )

{-| Combat takes place between an attacker and defender. It only deals with melee combat.
Castle of the winds does not concern itself with pesky ranged combat. (So bandits firing arrows
would have to be modeled with magic methinks).

Combat can be split into the following areas:

1.  Chance to hit - If we do not hit the defender, then no damage is calculated, it is a absolute miss.
2.  Damage - Hitting does not automatically guarantee damage. Armour acts to absorb some of that damage.
3.  Attack speed - Though turn based, there is time in the game, so a monster with a faster attack
    speed will attack more often.

Experience (level) plays a part in all aspects of combat as a seasoned warrior will fight better
than beginners in general.

---


## LEVEL

  - Max level is 50
  - At higher levels, a attacker should have a better chance to hit and defend against incoming hits

---


## CHANCE TO HIT

  - Dexterity is the major contributor to a weapon's CTH%
  - A larger defender is easier to hit.
  - Bulk, a smaller weapon is easier to hit with.
  - Wearing bulky armour negatively affects your CTH.

---


## DAMAGE

  - All weapons have a base damage
  - Heavier, unbalanced weapons that takes longer to recover gets bonuses from strength
  - Precision based weapons gets a bonus from dexterity

---


## ATTACK SPEED (assuming all weapons are made balanced and perfect), attack speed depends on:

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

import Attributes exposing (Attributes)
import Dice exposing (Dice)
import Equipment exposing (Equipment)
import Item
import Item.Data
import Random.Pcg as Random exposing (Generator, Seed)
import Stats exposing (Stats)
import Types exposing (..)
import Utils.Mass as Mass


type alias AttackMessage =
    String


type alias Defender a =
    Fighter a


type alias Attacker a =
    Fighter a


type alias HitRoll =
    Int


type alias Fighter a =
    { a
        | name : String
        , type_ : Types.CreatureType
        , stats : Stats
        , attributes : Attributes
        , equipment : Equipment
        , expLevel : Int
        , bodySize : Types.BodySize
        , attacks : Int
    }


attack : Attacker a -> Defender b -> Generator ( AttackMessage, Defender b )
attack attacker defender =
    attack_ attacker defender attacker.attacks


attack_ : Attacker a -> Defender b -> Int -> Generator ( AttackMessage, Defender b )
attack_ attacker defender numAttacks =
    let
        cth =
            chanceToHit attacker defender

        -- Idea is to roll 1-100 under the chance to hit. So the higher cth, the better.
        hitDie =
            Random.int 1 100

        damageDie =
            damageCalculator attacker

        names =
            makeNames attacker defender

        genResult =
            Random.map2 (,) hitDie damageDie
                |> Random.andThen (\rolls -> hitResult cth names defender rolls)

        attackAgain ( msg, def ) =
            attack_ attacker def (numAttacks - 1)
                |> Random.map (\( newMsg, newDef ) -> ( msg ++ newMsg, newDef ))
    in
    case numAttacks of
        1 ->
            genResult

        n ->
            genResult
                |> Random.andThen attackAgain



-------------------
-- Chance to hit --
-- SAC: Add up all the AC for armour, this is the Sum of AC
-- Dex: The dex value of the attacker from 0 to 100.
-- A hit is rolling a D100 over (Dex - SAC)
-------------------


type alias CTH =
    { baseCTH : Int
    , ac : Int
    , weaponBulkPenalty : Int
    , armourPenalty : Int
    , sizeModifier : Int
    , blockPenalty : Int
    , critRange : Int
    }


{-| -- y = x^2
-- y - cth, x - normalised value (-50 to 50)
-- y / cthMax = (x / 50)^2
-- cthMax - CTH range (a capped range for cth effect e.g 15 means -15 to 15)
-- x = (y / normalizedVar) ^ 1/2 * cthMax
-}
quadraticCTHCalculator : Int -> Int -> Int
quadraticCTHCalculator cthMax y =
    let
        sign =
            y // abs y

        absY =
            abs y
    in
    (toFloat absY / 50.0)
        |> (\x -> x ^ 2)
        |> clamp 0 1
        |> (*) (toFloat cthMax)
        |> round
        |> (*) sign


cthThreshold : CTH -> Int
cthThreshold cth =
    (cth.baseCTH
        - cth.ac
        + cth.sizeModifier
        + cth.weaponBulkPenalty
        + cth.armourPenalty
    )
        |> clamp 1 99


chanceToHit : Attacker a -> Defender b -> CTH
chanceToHit attacker defender =
    let
        ac =
            Equipment.calculateAC defender.equipment

        armourMass =
            Equipment.getArmour attacker.equipment
                |> Maybe.map Item.base
                |> Maybe.map .mass
                |> Maybe.withDefault (Mass.Mass 0 0)

        -- At max str, can use max weight armour (plate) without penalty.
        -- At min str, when using plate, gives a max penalty of -20% CTH
        armourPenalty =
            quadraticCTHCalculator 20 (attacker.attributes.str - round (toFloat armourMass.weight / 15000 * 100))
                |> clamp -20 0

        weaponMass =
            Equipment.getWeapon attacker.equipment
                |> Maybe.map Item.base
                |> Maybe.map .mass
                |> Maybe.withDefault (Mass.Mass 0 0)

        -- Weak users are penalised for heavy weapons. The base curve is y = x*3 where
        -- y is the weight difference in what the attacker can wield and what the weapon weight is
        -- x is the max adv/penalty to cth provided
        -- The formula below is derived from y = -3000 * (x/15)^3
        -- This means that the x can range between -15 and 15% cth with the weapon penalty
        -- maxing out at about 3000 wt difference,
        -- e.g an attacker of str 50 can use up to 3000 wt, wielding a THS of weight 5000
        -- should incur ~ -12% penalty to CTH
        weaponBulkPenalty =
            quadraticCTHCalculator 15 weaponWeightToWielderCapacityDifference
                |> clamp -15 10

        maxWeaponWeight =
            5000.0

        weaponWeightToWielderCapacityDifference =
            attacker.attributes.str - round (toFloat weaponMass.weight / maxWeaponWeight * 100)

        -- Hitting tiny to giant creatures give either a penalty or a bonus to hit
        -- The bigger the creature the easier to hit, with a range of -+10% CTH
        sizeModifier =
            defender.bodySize
                |> bodySizeToDodge
                |> clamp -10 10
    in
    { baseCTH = attacker.attributes.dex + attacker.expLevel * 2
    , ac = Item.Data.acToInt ac + defender.expLevel * 2
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
            -10

        Types.Small ->
            -5

        Types.Medium ->
            0

        Types.Large ->
            5

        Types.Huge ->
            10



-----------------
-- Hit result: -- Generate hit message, update defender
-----------------


hitResult : CTH -> Names -> Defender b -> ( HitRoll, ( DamageRoll, MaxDamage ) ) -> Generator ( AttackMessage, Defender b )
hitResult cth names defender ( hitRoll, ( damageRoll, maxDamage ) ) =
    let
        hitThreshold =
            cthThreshold cth

        isHit =
            hitRoll <= hitThreshold

        isCrit =
            hitRoll <= ceiling (toFloat cth.critRange * toFloat hitThreshold / 100)

        isBlocked =
            hitRoll <= hitThreshold
    in
    case ( isHit, isCrit, isBlocked ) of
        ( _, True, _ ) ->
            hitMsg names ( maxDamage, maxDamage ) defender

        ( True, _, _ ) ->
            hitMsg names ( damageRoll, maxDamage ) defender

        ( False, _, True ) ->
            blockedMsg names
                |> Random.map (\msg -> ( msg, defender ))

        _ ->
            missMsg names
                |> Random.map (\msg -> ( msg, defender ))


type alias MaxDamage =
    Int


type alias DamageRoll =
    Int


damageCalculator : Attacker a -> Generator ( DamageRoll, MaxDamage )
damageCalculator { attributes, equipment } =
    let
        maybeWeapon =
            Equipment.getWeapon equipment

        strBonus str =
            ((str - 50) // 10)
                |> clamp 0 5

        addStrToBonus str die =
            { die | bonus = die.bonus + strBonus str }

        dice =
            case maybeWeapon of
                Just ( base, { damage } ) ->
                    addStrToBonus attributes.str damage

                _ ->
                    Dice 1 (attributes.str // 10) 0
    in
    Dice.roll dice
        |> Random.map (\roll -> ( roll, dice.nDice * dice.sides + dice.bonus ))



------------------
-- Attack speed --
------------------


attackSpeed : Item.Data.Weapon -> Attributes -> Float
attackSpeed weapon { str, dex, int, con } =
    1



-----------------------
-- Hit/Miss messages --
-----------------------


missMsg : Names -> Generator AttackMessage
missMsg { att, attr, def, defr } =
    Random.sample
        [ attr ++ " half arsed attack failed to hit " ++ def ++ "."
        , attr ++ " fancy footwork did not fool " ++ def ++ "."
        , att ++ " could not hit the broadside of a barn with that pathetic attempt."
        , att ++ " perform a decent attack but " ++ def ++ " perfectly parried the shot."
        ]
        |> Random.map (Maybe.withDefault <| attr ++ " fumbled attack complete missed " ++ def ++ ".")


blockedMsg : Names -> Generator AttackMessage
blockedMsg { att, attr, def, defr } =
    Random.sample []
        |> Random.map (Maybe.withDefault <| attr ++ " swing clanged against " ++ defr ++ " shield.")


hitMsg : Names -> ( DamageRoll, MaxDamage ) -> Defender a -> Generator ( AttackMessage, Defender a )
hitMsg { att, attr, def, defr } ( damageRoll, maxDamage ) defender =
    let
        critMsgs =
            []

        hitMsgs =
            []

        defaultHitMsg =
            att ++ " scored a hit on " ++ def ++ "!"

        defaultCritMsg =
            att ++ " found a weak spot in " ++ defr ++ " defense! Ouch!"

        defenderAfterDamage =
            { defender | stats = Stats.takeHit damageRoll defender.stats }

        addStatus msg =
            case defender.type_ of
                Types.Hero ->
                    msg

                _ ->
                    msg ++ " " ++ statusMsg defenderAfterDamage.stats
    in
    if damageRoll >= maxDamage then
        Random.sample critMsgs
            |> Random.map (Maybe.withDefault defaultCritMsg)
            |> Random.map addStatus
            |> Random.map (\msg -> ( msg, defenderAfterDamage ))
    else
        Random.sample hitMsgs
            |> Random.map (Maybe.withDefault defaultHitMsg)
            |> Random.map addStatus
            |> Random.map (\msg -> ( msg, defenderAfterDamage ))


statusMsg : Stats -> String
statusMsg stats =
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



-----------
-- Names --
-----------


{-| We cater for the following texts:
'You totally miss the giant rat'
'Your swing totally misses the giant rat'
'The giant rat totally misses you'
'The giant rat's attack bounces harmlessly off your shield'
'The giant rat's attack hits you'

Namely the texts you, your, the giant rat, the giant rat's needs to be identified.

-}
type alias Names =
    { att : String
    , attr : String
    , def : String
    , defr : String
    }


makeNames : Attacker a -> Defender b -> Names
makeNames attacker defender =
    { att = attackerName attacker NonPossessive
    , attr = attackerName attacker Possessive
    , def = defenderName defender NonPossessive
    , defr = defenderName defender Possessive
    }


type Adjective
    = Possessive
    | NonPossessive


attackerName : Attacker a -> Adjective -> String
attackerName { type_, name } adjective =
    case ( type_, adjective ) of
        ( Types.Hero, Possessive ) ->
            "Your "

        ( Types.Hero, NonPossessive ) ->
            "You "

        ( _, Possessive ) ->
            name ++ "'s"

        ( _, NonPossessive ) ->
            name


defenderName : Defender a -> Adjective -> String
defenderName { type_, name } adjective =
    case ( type_, adjective ) of
        ( Types.Hero, Possessive ) ->
            "your"

        ( Types.Hero, NonPossessive ) ->
            "you"

        ( _, Possessive ) ->
            name ++ "'s"

        ( _, NonPossessive ) ->
            name
