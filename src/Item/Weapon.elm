module Item.Weapon
    exposing
        ( init
        , damage
        , listTypes
        , encode
        , decoder
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

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)
import Dice exposing (Dice)
import Json.Decode as JD
import Dict exposing (Dict)


damage : Weapon -> Dice
damage { damage } =
    damage


init : WeaponType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Weapon
init weaponType status idStatus id =
    let
        make name ( weight, bulk ) css ( buy, sell ) damage =
            { base = BaseItem name (Prices buy sell) css (Mass.Mass weight bulk) status idStatus id
            , weaponType = weaponType
            , damage = damage
            }

        makeMonsterWeapon name damage =
            make name ( 0, 0 ) "" ( 0, 0 ) damage

        d n faces bonus =
            Dice n faces bonus
    in
        case weaponType of
            BrokenSword ->
                make "Broken Sword" ( 1000, 5000 ) "broken-sword" ( 0, 25 ) (d 1 6 -2)

            Club ->
                make "Club" ( 2500, 3000 ) "club" ( 105, 60 ) (d 3 2 0)

            Dagger ->
                make "Dagger" ( 500, 500 ) "sword" ( 420, 240 ) (d 1 4 0)

            Hammer ->
                make "Hammer" ( 1500, 3000 ) "hammer" ( 420, 240 ) (d 2 2 0)

            HandAxe ->
                make "Hand Axe" ( 1000, 3000 ) "axe" ( 472, 270 ) (d 1 5 0)

            Quarterstaff ->
                make "Quarterstaff" ( 1000, 5000 ) "spear" ( 648, 360 ) (d 3 1 0)

            Spear ->
                make "Spear" ( 2500, 5000 ) "spear" ( 840, 480 ) (d 1 9 0)

            ShortSword ->
                make "Short Sword" ( 1500, 5000 ) "sword" ( 1470, 840 ) (d 1 6 0)

            Mace ->
                make "Mace" ( 2500, 4375 ) "mace" ( 1728, 960 ) (d 3 2 0)

            Flail ->
                make "Flail" ( 4500, 3250 ) "flail" ( 1512, 840 ) (d 4 3 0)

            Axe ->
                make "Axe" ( 3000, 5000 ) "axe" ( 1944, 1080 ) (d 1 9 0)

            WarHammer ->
                make "War Hammer" ( 4000, 7500 ) "hammer" ( 2160, 1200 ) (d 4 3 -1)

            LongSword ->
                make "Long Sword" ( 2500, 8000 ) "sword" ( 3240, 1800 ) (d 1 8 0)

            BattleAxe ->
                make "Battle Axe" ( 3500, 6000 ) "axe" ( 2160, 1200 ) (d 2 5 0)

            BroadSword ->
                make "Broad Sword" ( 3000, 9000 ) "sword" ( 3240, 1800 ) (d 1 9 0)

            MorningStar ->
                make "Morning Star" ( 3000, 9000 ) "morning-star" ( 2160, 1200 ) (d 4 2 0)

            BastardSword ->
                make "Bastard Sword" ( 4500, 10000 ) "sword" ( 4320, 2400 ) (d 2 7 0)

            TwoHandedSword ->
                make "Two Handed Sword" ( 5000, 12000 ) "sword" ( 6360, 3600 ) (d 2 8 0)

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
