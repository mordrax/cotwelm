module Types exposing (..)

-- All Monsters and Hero has a body size. This is used to calculate cth


type BodySize
    = Tiny
    | Small
    | Medium
    | Large
    | Huge


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



-- Hero/Monster status effects


type PoisonStatus
    = NotPoisoned
    | MinorPoison
    | MajorPoison
    | AcutePoison


type AdrenalineStatus
    = Calm
    | Rush Int
    | CoolOff Int


type BurnStatus
    = NotBurning
    | Burning Int


type FreezeStatus
    = NotFrozen
    | Frozen Int


type ShockStatus
    = NotShocked
    | Shocked Int
