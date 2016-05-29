module Equipment exposing (..)

import GameData.Item exposing (..)


type alias Model =
    { weapon : Maybe GameData.Item.Model
    , armour : Maybe GameData.Item.Model
    }


initModel : Model
initModel =
    { weapon = Just (GameData.Item.newWeapon Dagger)
    , armour = Just (GameData.Item.newArmour LeatherArmour)
    }
