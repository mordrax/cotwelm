module Arena.Match exposing (fight, Match)

{-| A match is between two fighters, herein referred to as blue and red.
  A match consists of a number of rounds, each round will have a victor with stats
-}
import Combat

type alias Match =
    { blue : Combat.Fighter
    , red : Combat.Fighter
    , rounds : Int
    , blueWins : Int
    , hpRemaining : List Int
    , blueRounds : List Int
    , redRounds : List Int
    , blueHitRed : List Int
    , redHitBlue : List Int
    }

fight : Match -> Match
fight match =
    match
