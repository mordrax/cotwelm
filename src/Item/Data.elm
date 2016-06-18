module Item.Data exposing (..)

import Mass exposing (..)
import IdGenerator exposing (..)
import Item.TypeDef exposing (..)
import Container exposing (..)


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


type alias WeaponModel =
    { class : Int
    }


type alias ArmourModel =
    { ac : Int }


type alias BeltModel a =
    { slot : Int
    , scroll : Int
    , wand : Int
    , potion : Int
    , container : Container a
    }


type alias PackModel a =
    { container : Container a }
