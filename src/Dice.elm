module Dice exposing (..)

{-| Simple dice system that will generate a random int between 1 and the max passed in.
-}

import Random.Pcg as Random exposing (Generator)


type alias Dice =
    { nDice : Int
    , sides : Int
    , bonus : Int
    }


type alias Sides =
    Int


pp : Dice -> String
pp { nDice, sides, bonus } =
    if bonus > 0 then
        toString nDice ++ "D" ++ toString sides ++ "+" ++ toString bonus
    else
        toString nDice ++ "D" ++ toString sides


{-| Create nDx + a where:
    n - number of dice to roll, is a minimum of 1
    x - the number of faces on the die
    a - a constant bonus to add to the dice
-}
die : Int -> Sides -> Int -> Dice
die nDice sides bonus =
    Dice (min 1 nDice) sides bonus


roll : Dice -> Generator Int
roll { nDice, sides, bonus } =
    roll_ (nDice - 1) sides (d sides)
        |> Random.map (\x -> x + bonus)


d2d : Sides -> Sides -> Generator ( Int, Int )
d2d f1 f2 =
    Random.map2 (,) (d f1) (d f2)


roll_ : Int -> Sides -> Generator Int -> Generator Int
roll_ nDice sides currentDieRoll =
    let
        acc face =
            Random.map2 (+) currentDieRoll (d face)
    in
        case nDice of
            0 ->
                currentDieRoll

            _ ->
                roll_ (nDice - 1) sides (acc sides)


d : Int -> Generator Int
d face =
    range 1 face


range : Int -> Int -> Generator Int
range small large =
    Random.int (min small large) (max small large)
