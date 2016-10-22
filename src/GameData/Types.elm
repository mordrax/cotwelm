module GameData.Types exposing (..)

import Dict exposing (..)


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