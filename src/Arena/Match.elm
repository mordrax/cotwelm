module Arena.Match
    exposing
        ( Match
        , fight
        , updateMatch
        )

{-| A match is between two fighters, herein referred to as blue and red.
  A match consists of a number of rounds, each round will have a victor with stats
-}

import Combat
import Arena.Round exposing (RoundResult)
import Html exposing (..)
import Attributes exposing (Attributes)
import Item.Item as Item exposing (Item)
import Equipment exposing (Equipment)
import Dice


type alias Match a b =
    { blue : Combat.Fighter a
    , red : Combat.Fighter b
    , rounds : Int
    , blueWins : Int
    , hpRemaining : List Int
    , blueRounds : List Int
    , redRounds : List Int
    , blueHitRed : List Int
    , redHitBlue : List Int
    }


fight : Match a b -> Match a b
fight match =
    match


updateMatch : RoundResult a b -> Match a b -> Match a b
updateMatch { blueTurns, redTurns, hpRemaining, blueHitRed, redHitBlue } match =
    let
        addWin match =
            if hpRemaining > 0 then
                { match | blueWins = match.blueWins + 1 }
            else
                match

        addResult match =
            { match
                | hpRemaining = hpRemaining :: match.hpRemaining
                , blueRounds = blueTurns :: match.blueRounds
                , redRounds = redTurns :: match.redRounds
                , blueHitRed = blueHitRed :: match.blueHitRed
                , redHitBlue = redHitBlue :: match.redHitBlue
            }

        incBattle match =
            { match | rounds = match.rounds + 1 }
    in
        match
            |> addWin
            |> addResult
            |> incBattle


view : Maybe (Match a b) -> Html Never
view maybeMatch =
    case maybeMatch of
        Nothing ->
            tr [] []

        Just { monster, hpRemaining, heroRounds, monsterRounds, battles, wins, hero, heroHitMonster, monsterHitHero } ->
            let
                over a b =
                    toString a ++ " / " ++ toString b

                percent a =
                    toString a ++ "%"

                brackets a =
                    "( " ++ a ++ " )"

                weapon =
                    monster.equipment
                        |> Equipment.get Equipment.WeaponSlot
                        |> ppWeapon

                armour =
                    monster.equipment
                        |> Equipment.get Equipment.ArmourSlot
                        |> ppArmour

                totalArmour =
                    Equipment.calculateAC monster.equipment
                        |> toString
                        |> brackets

                avgHpRemaining =
                    toOneDecimal (toFloat (List.sum hpRemaining) / toFloat battles)

                avgTurnsTaken =
                    toFloat (List.sum heroRounds + List.sum monsterRounds) / toFloat battles

                avgHeroTurnsTaken =
                    toFloat (List.sum heroRounds) / toFloat battles

                cth =
                    Combat.chanceToHit hero monster

                cthText =
                    toString cth.baseCTH
                        ++ "/"
                        ++ toString cth.weaponBulkPenalty
                        ++ "/"
                        ++ toString cth.armourPenalty
                        ++ "/"
                        ++ toString (cth.sizeModifier)
                        ++ " = ("
                        ++ toString heroCTHThreshold
                        ++ ")"

                monsterCTH =
                    Combat.chanceToHit monster hero

                monsterCTHText =
                    toString monsterCTH.baseCTH
                        ++ "/"
                        ++ toString monsterCTH.weaponBulkPenalty
                        ++ "/"
                        ++ toString monsterCTH.armourPenalty
                        ++ "/"
                        ++ toString (monsterCTH.sizeModifier)
                        ++ " = ("
                        ++ toString monsterCTHThreshold
                        ++ ")"

                avgHeroHitMonster =
                    toFloat (List.sum heroHitMonster) / toFloat (List.sum heroRounds)

                avgMonsterHitHero =
                    toFloat (List.sum monsterHitHero) / toFloat (List.sum monsterRounds)

                heroCTHThreshold =
                    Combat.chanceToHit hero monster |> Combat.cthThreshold

                monsterCTHThreshold =
                    Combat.chanceToHit monster hero |> Combat.cthThreshold
            in
                tr []
                    [ td [] [ text <| monster.name ]
                    , td [] [ text <| toString monster.expLevel ]
                    , td [] [ text <| ppAttributes monster.attributes ]
                    , td [] [ text <| weapon ]
                    , td [] [ text <| (armour ++ " " ++ totalArmour) ]
                    , td [] [ text <| toString monster.bodySize ]
                    , td [] [ text <| toString monster.stats.maxHP ]
                    , td [] [ text <| percent (toFloat wins * 100 / toFloat battles) ]
                    , td [] [ text <| avgHpRemaining ++ " / " ++ toString hero.stats.maxHP ]
                    , td [] [ text <| toOneDecimal avgTurnsTaken ++ " " ++ brackets (toOneDecimal avgHeroTurnsTaken) ]
                    , td [] [ text <| toPercentage avgHeroHitMonster ++ "%" ]
                    , td [] [ text <| toPercentage avgMonsterHitHero ++ "%" ]
                    , td [] [ text <| cthText ]
                    , td [] [ text <| monsterCTHText ]
                    ]


ppAttributes : Attributes -> String
ppAttributes { str, dex, int, con } =
    toString str
        ++ "/"
        ++ toString dex
        ++ "/"
        ++ toString con
        ++ "/"
        ++ toString int


toOneDecimal : Float -> String
toOneDecimal num =
    toNSignificantPlaces num 1
        |> toString


toNSignificantPlaces : Float -> Int -> Float
toNSignificantPlaces num sig =
    let
        factor =
            toFloat (10 ^ sig)
    in
        num
            |> (*) factor
            |> Basics.round
            |> toFloat
            |> flip (/) factor


toPercentage : Float -> String
toPercentage num =
    num
        |> (*) 100
        |> toString
        |> String.slice 0 4


ppWeapon : Maybe Item -> String
ppWeapon item =
    case item of
        Just (Item.ItemWeapon weapon) ->
            weapon.base.name ++ " ( " ++ Dice.pp weapon.damage ++ " )"

        _ ->
            "No weapon"


ppArmour : Maybe Item -> String
ppArmour item =
    case item of
        Just (Item.ItemArmour armour) ->
            armour.base.name ++ " ( " ++ toString armour.ac ++ " )"

        _ ->
            "No armour"
