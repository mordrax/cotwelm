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
import Arena.View
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
    , blueTurnsInRounds : List Int
    , redTurnsInRounds : List Int
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
                , blueTurnsInRounds = blueTurns :: match.blueTurnsInRounds
                , redTurnsInRounds = redTurns :: match.redTurnsInRounds
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

        Just { red, hpRemaining, blueTurnsInRounds, redTurnsInRounds, rounds, blueWins, blue, blueHitRed, redHitBlue } ->
            let
                over a b =
                    toString a ++ " / " ++ toString b

                percent a =
                    toString a ++ "%"

                brackets a =
                    "( " ++ a ++ " )"

                weapon =
                    Arena.View.weaponToString red.equipment

                armour =
                    Arena.View.armourToString red.equipment

                totalArmour =
                    Equipment.calculateAC red.equipment
                        |> toString
                        |> brackets

                avgHpRemaining =
                    toOneDecimal (toFloat (List.sum hpRemaining) / toFloat rounds)

                avgTurnsTaken =
                    toFloat (List.sum blueTurnsInRounds + List.sum redTurnsInRounds) / toFloat rounds

                avgBlueTurnsTaken =
                    toFloat (List.sum blueTurnsInRounds) / toFloat rounds

                cth =
                    Combat.chanceToHit blue red

                cthText =
                    toString cth.baseCTH
                        ++ "/"
                        ++ toString cth.weaponBulkPenalty
                        ++ "/"
                        ++ toString cth.armourPenalty
                        ++ "/"
                        ++ toString (cth.sizeModifier)
                        ++ " = ("
                        ++ toString blueCTHThreshold
                        ++ ")"

                redCTH =
                    Combat.chanceToHit red blue

                redCTHText =
                    toString redCTH.baseCTH
                        ++ "/"
                        ++ toString redCTH.weaponBulkPenalty
                        ++ "/"
                        ++ toString redCTH.armourPenalty
                        ++ "/"
                        ++ toString (redCTH.sizeModifier)
                        ++ " = ("
                        ++ toString redCTHThreshold
                        ++ ")"

                avgBlueHitRed =
                    toFloat (List.sum blueHitRed) / toFloat (List.sum blueTurnsInRounds)

                avgRedHitBlue =
                    toFloat (List.sum redHitBlue) / toFloat (List.sum redTurnsInRounds)

                blueCTHThreshold =
                    Combat.chanceToHit blue red |> Combat.cthThreshold

                redCTHThreshold =
                    Combat.chanceToHit red blue |> Combat.cthThreshold
            in
                tr []
                    [ td [] [ text <| red.name ]
                    , td [] [ text <| toString red.expLevel ]
                    , td [] [ text <| ppAttributes red.attributes ]
                    , td [] [ text <| weapon ]
                    , td [] [ text <| (armour ++ " " ++ totalArmour) ]
                    , td [] [ text <| toString red.bodySize ]
                    , td [] [ text <| toString red.stats.maxHP ]
                    , td [] [ text <| percent (toFloat blueWins * 100 / toFloat rounds) ]
                    , td [] [ text <| avgHpRemaining ++ " / " ++ toString blue.stats.maxHP ]
                    , td [] [ text <| toOneDecimal avgTurnsTaken ++ " " ++ brackets (toOneDecimal avgBlueTurnsTaken) ]
                    , td [] [ text <| toPercentage avgBlueHitRed ++ "%" ]
                    , td [] [ text <| toPercentage avgRedHitBlue ++ "%" ]
                    , td [] [ text <| cthText ]
                    , td [] [ text <| redCTHText ]
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
