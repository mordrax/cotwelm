module Item.Weapon
    exposing
        ( decoder
        , encode
        , init
        , initBasic
        , listTypes
        , usableWeapons
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

    -- A hero who's not strong enough for the weapon incurs a CTH penalty
    Max (Weight - Str, 0) = CTH Penalty

-}

import Dice exposing (Dice)
import Dict exposing (Dict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


initBasic : WeaponType -> Weapon
initBasic weaponType =
    init weaponType Normal Identified


init : WeaponType -> ItemStatus -> IdentificationStatus -> Weapon
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
            make "Broken Sword" (Mass 20 100) "broken-sword" (ItemValue 1) (d 1 6 -2)

        -- blades
        Dagger ->
            make "Dagger" (Mass 10 10) "sword" (ItemValue 16) (d 1 4 0)

        ShortSword ->
            make "Short Sword" (Mass 30 100) "sword" (ItemValue 36) (d 1 6 0)

        LongSword ->
            make "Long Sword" (Mass 50 160) "sword" (ItemValue 64) (d 1 8 0)

        BroadSword ->
            make "Broad Sword" (Mass 60 180) "sword" (ItemValue 59) (d 1 7 1)

        BastardSword ->
            make "Bastard Sword" (Mass 70 200) "sword" (ItemValue 100) (d 1 10 0)

        TwoHandedSword ->
            make "Two Handed Sword" (Mass 80 240) "sword" (ItemValue 225) (d 1 15 0)

        -- blunts
        Club ->
            make "Club" (Mass 70 120) "club" (ItemValue 12) (d 2 2 1)

        Hammer ->
            make "Hammer" (Mass 40 60) "hammer" (ItemValue 24) (d 2 2 0)

        Quarterstaff ->
            make "Quarterstaff" (Mass 20 50) "spear" (ItemValue 36) (d 1 6 0)

        Mace ->
            make "Mace" (Mass 50 90) "mace" (ItemValue 54) (d 2 3 0)

        MorningStar ->
            make "Morning Star" (Mass 60 180) "morning-star" (ItemValue 92) (d 2 4 0)

        WarHammer ->
            make "War Hammer" (Mass 70 150) "hammer" (ItemValue 288) (d 3 4 0)

        Flail ->
            make "Flail" (Mass 90 200) "flail" (ItemValue 450) (d 3 5 0)

        -- axes
        HandAxe ->
            make "Hand Axe" (Mass 20 60) "axe" (ItemValue 35) (d 1 5 1)

        Axe ->
            make "Axe" (Mass 60 100) "axe" (ItemValue 110) (d 1 10 1)

        Spear ->
            make "Spear" (Mass 50 120) "spear" (ItemValue 144) (d 1 12 0)

        BattleAxe ->
            make "Battle Axe" (Mass 70 120) "axe" (ItemValue 164) (d 1 12 2)

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


usableWeapons : List WeaponType
usableWeapons =
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
    ]


listTypes : List WeaponType
listTypes =
    usableWeapons
        ++ [ -- monster weapons
             SmallClaws
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
