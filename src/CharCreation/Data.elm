module CharCreation.Data exposing (..)

--where


type Msg
    = Name String
    | Gender Gender
    | Difficulty Difficulty
    | Attributes Attribute Int


type alias AttributeModel =
    { ava : Int
    , str : Int
    , dex : Int
    , con : Int
    , int : Int
    }


type alias Model =
    { name : String
    , attributes : AttributeModel
    , gender : Gender
    , difficulty : Difficulty
    }


type Gender
    = Male
    | Female


type Difficulty
    = Easy
    | Intermediate
    | Hard
    | Impossible


type Attribute
    = Available
    | Strength
    | Intelligence
    | Constitution
    | Dexterity
