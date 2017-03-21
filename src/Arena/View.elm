module Arena.View
    exposing
        ( weaponToString
        , armourToString
        )

import Equipment exposing (Equipment)
import Item.Item as Item exposing (Item)


weaponToString : Equipment -> String
weaponToString equipment =
    equipment
        |> Equipment.getWeapon
        |> Maybe.map Item.ppWeapon
        |> Maybe.withDefault ("No Weapon")

armourToString : Equipment -> String
armourToString equipment =
    equipment
        |> Equipment.getArmour
        |> Maybe.map Item.ppArmour
        |> Maybe.withDefault ("No Armour")
