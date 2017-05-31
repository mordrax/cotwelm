module Arena.View
    exposing
        ( armourToString
        , weaponToString
        )

import Equipment exposing (Equipment)
import Item


weaponToString : Equipment -> String
weaponToString equipment =
    equipment
        |> Equipment.getWeapon
        |> Maybe.map Item.ppWeapon
        |> Maybe.withDefault "No Weapon"


armourToString : Equipment -> String
armourToString equipment =
    equipment
        |> Equipment.getArmour
        |> Maybe.map Item.ppArmour
        |> Maybe.withDefault "No Armour"
