module Types exposing (..)

{-| DamageDie holds the die used to calculate the damage and a static bonus to add to the rolled die.
    eg DamageDie 6 2 would be 1D6 + 2
-}

type BodySize
    = Tiny
    | Small
    | Medium
    | Large
    | Giant

type CreatureType = Hero | Monster