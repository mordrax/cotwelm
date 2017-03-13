module Types exposing (..)

-- All Monsters and Hero has a body size. This is used to calculate cth


type BodySize
    = Tiny
    | Small
    | Medium
    | Large
    | Giant


type CreatureType
    = Hero
    | Monster


type Area
    = Village
    | Farm
    | DungeonLevelOne
    | DungeonLevel Int


type Gender
    = Male
    | Female


type Difficulty
    = Easy
    | Intermediate
    | Hard
    | Impossible


type Visibility
    = Hidden
    | Known
    | LineOfSight


type LightSource
    = Dark
    | Sun
    | Artificial
