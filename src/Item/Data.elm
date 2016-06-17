module Item.Data exposing (..)

import Mass exposing (..)
import IdGenerator exposing (..)
import Item.TypeDef exposing (..)


type alias Model =
    { id : ID
    , name : String
    , buy : Int
    , sell : Int
    , css : String
    , status : ItemStatus
    , isIdentified : IdentificationStatus
    , mass : Mass
    }


type alias ArmourModel =
    { ac : Int }
