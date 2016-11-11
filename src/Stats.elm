module Stats
    exposing
        ( Stats
        , Msg(..)
        , new
        , takeHit
        , combatStats
        , isDead
        , printHP
        , printSP
        )


type Stats
    = A Model


type Msg
    = Alive
    | Dead


type alias Model =
    { maxHP : Int
    , currentHP : Int
    , maxSP : Int
    , currentSP : Int
    , damageRange : ( Int, Int )
    , ac : Int
    , hitChance : Int
    }

{-| Attack Speed
    The attack speed depends on the following:
    - The weapon has a innate speed which should depend on it's weight and bulk. Both weight and bulk negatively affects attack speed.
    - The strength of the attacker will offset the weight of the weapon capped to reducing the weight used in the calculation to 0.
    - The dexterity of the attacker will offset the bulk much like the strength offsets the weight.
    - The encumberance of the attacker will affect the overall attack speed

    Attack speeds should be capped such that the weakest possible attacker using the heaviest most bulky weapon will not be so ridiculously slow as to render him useless.
    Something like the slowest attack at speed 50% and the fastest possible attack at 200%. At this speed, an attack by the slow person could be followed by 4 attacks from
    the fast person. This should probably be the rule for movements as well.
-}



new : Int -> Int -> Stats
new hp sp =
    A (Model hp hp sp sp ( 1, 6 ) 0 50)


isDead : Stats -> Bool
isDead (A model) =
    model.currentHP < 0


takeHit : Int -> Stats -> ( Stats, Msg )
takeHit damage (A model) =
    let
        hp' =
            model.currentHP - damage

        msg =
            if hp' > 0 then
                Alive
            else
                Dead
    in
        ( A { model | currentHP = hp' }, msg )


combatStats : Stats -> ( ( Int, Int ), Int, Int )
combatStats (A model) =
    ( model.damageRange, model.ac, model.hitChance )


printHP : Stats -> String
printHP (A model) =
    printAOverB model.currentHP model.maxHP


printSP : Stats -> String
printSP (A model) =
    printAOverB model.currentSP model.maxSP


printAOverB : a -> b -> String
printAOverB a b =
    toString a ++ " / " ++ toString b
