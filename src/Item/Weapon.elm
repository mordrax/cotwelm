module Item.Weapon
    exposing
        ( decoder
        , encode
        , init
        , listTypes
        )

{-|

    Blunt weapons
    - Smaller range of damage
    - More dice (more consistent / higher average)

    Slice weapons
    - Average dice range

    Pierce weapons
    - Larger dice range (piercing in the right spot)
    - Larger crit range

    Damage by weight:
        500  - D4  / 2D1  / D5
        1000 - D5  / 3D1  / D6
        1500 - D6  / 2D2  / D7
        2000 - D7  / 2D2+1/ D8
        2500 - D8  / 3D2  / D9
        3000 - D9  / 4D2  / D10
        3500 - 2D5 / 3D3  / D12
        4000 - 2D6 / 4D3-1/ D14
        4500 - 2D7 / 4D3  / D16
        5000 - 2D8 / 5D3  / D18

    Speed by weight/bulk:

-}

import Dice exposing (Dice)
import Dict exposing (Dict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : WeaponType -> ItemStatus -> IdentificationStatus -> ( BaseItem, WeaponDetails )
init weaponType status idStatus =
    let
        make name mass css itemValue damage =
            ( BaseItem name itemValue css mass status idStatus
            , { weaponType = weaponType
              , damage = damage
              }
            )

        makeMonsterWeapon name damage =
            make name (Mass 0 0) "" (ItemValue 0) damage

        d n faces bonus =
            Dice n faces bonus
    in
    case weaponType of
        BrokenSword ->
            make "Broken Sword" (Mass 1000 5000) "broken-sword" (ItemValue 25) (d 1 6 -2)

        Club ->
            make "Club" (Mass 2500 3000) "club" (ItemValue 105) (d 3 2 0)

        Dagger ->
            make "Dagger" (Mass 500 500) "sword" (ItemValue 420) (d 1 4 0)

        Hammer ->
            make "Hammer" (Mass 1500 3000) "hammer" (ItemValue 420) (d 2 2 0)

        HandAxe ->
            make "Hand Axe" (Mass 1000 3000) "axe" (ItemValue 472) (d 1 5 0)

        Quarterstaff ->
            make "Quarterstaff" (Mass 1000 5000) "spear" (ItemValue 648) (d 3 1 0)

        Spear ->
            make "Spear" (Mass 2500 5000) "spear" (ItemValue 840) (d 1 9 0)

        ShortSword ->
            make "Short Sword" (Mass 1500 5000) "sword" (ItemValue 1470) (d 1 6 0)

        Mace ->
            make "Mace" (Mass 2500 4375) "mace" (ItemValue 1728) (d 3 2 0)

        Flail ->
            make "Flail" (Mass 4500 3250) "flail" (ItemValue 1512) (d 4 3 0)

        Axe ->
            make "Axe" (Mass 3000 5000) "axe" (ItemValue 1944) (d 1 9 0)

        WarHammer ->
            make "War Hammer" (Mass 4000 7500) "hammer" (ItemValue 2160) (d 4 3 -1)

        LongSword ->
            make "Long Sword" (Mass 2500 8000) "sword" (ItemValue 3240) (d 1 8 0)

        BattleAxe ->
            make "Battle Axe" (Mass 3500 6000) "axe" (ItemValue 2160) (d 2 5 0)

        BroadSword ->
            make "Broad Sword" (Mass 3000 9000) "sword" (ItemValue 3240) (d 1 9 0)

        MorningStar ->
            make "Morning Star" (Mass 3000 9000) "morning-star" (ItemValue 1200) (d 4 2 0)

        BastardSword ->
            make "Bastard Sword" (Mass 4500 10000) "sword" (ItemValue 4320) (d 2 7 0)

        TwoHandedSword ->
            make "Two Handed Sword" (Mass 5000 12000) "sword" (ItemValue 6360) (d 2 8 0)

        -- monster weapons
        SmallClaws ->
            makeMonsterWeapon "Small Claws" (d 1 4 0)

        SmallBite ->
            makeMonsterWeapon "Small Bite" (d 1 5 0)

        Crossbow ->
            makeMonsterWeapon "Crossbow" (d 1 10 0)

        Fangs ->
            makeMonsterWeapon "Fangs" (d 1 4 0)

        Pincers ->
            makeMonsterWeapon "Pincers" (d 4 2 0)

        Bow ->
            makeMonsterWeapon "Bow" (d 1 6 0)

        LargeClaws ->
            makeMonsterWeapon "Large Claws" (d 1 8 0)

        LargeClub ->
            makeMonsterWeapon "Large Club" (d 3 4 2)

        Pike ->
            makeMonsterWeapon "Pike" (d 1 15 2)

        StoneClub ->
            makeMonsterWeapon "Stone Club" (d 3 8 5)

        GiantAxe ->
            makeMonsterWeapon "Giant Axe" (d 2 10 5)

        Boulder ->
            makeMonsterWeapon "Boulder" (d 3 3 3)

        GiantMaul ->
            makeMonsterWeapon "Giant Maul" (d 4 6 10)


listTypes : List WeaponType
listTypes =
    [ BrokenSword
    , Club
    , Dagger
    , Hammer
    , HandAxe
    , Quarterstaff
    , Spear
    , ShortSword
    , Mace
    , Flail
    , Axe
    , WarHammer
    , LongSword
    , BattleAxe
    , BroadSword
    , MorningStar
    , BastardSword
    , TwoHandedSword

    -- monster weapons
    , SmallClaws
    , SmallBite
    , Crossbow
    , Fangs
    , Pincers
    , Bow
    , LargeClaws
    , Pike
    , LargeClub
    , StoneClub
    , GiantAxe
    , Boulder
    , GiantMaul
    ]


encode : WeaponType -> String
encode =
    toString


decoder : String -> WeaponType
decoder value =
    Dict.get value weaponTypeDict
        |> Maybe.withDefault BrokenSword


weaponTypeDict : Dict String WeaponType
weaponTypeDict =
    let
        makeKVP x =
            ( toString x, x )
    in
    listTypes
        |> List.map makeKVP
        |> Dict.fromList
