module Item.Weapon
    exposing
        ( init
        , damage
        , listTypes
        , encode
        , decoder
        )

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
        make name ( weight, bulk ) css ( buy, sell ) wc damage =
            { base = BaseItem name (Prices buy sell) css (Mass.Mass weight bulk) status idStatus id
            , weaponType = weaponType
            , wc = wc
            , damage = damage
            }

        makeMonsterWeapon name wc damage =
            make name ( 0, 0 ) "" ( 0, 0 ) wc damage

        d n faces bonus =
            Dice n faces bonus
    in
        case weaponType of
            BrokenSword ->
                make "Broken Sword" ( 1000, 5000 ) "broken-sword" ( 0, 25 ) (WC 0) (d 1 6 -2)

            Club ->
                make "Club" ( 2500, 3000 ) "club" ( 105, 60 ) (WC 1) (d 1 4 2)

            Dagger ->
                make "Dagger" ( 500, 500 ) "sword" ( 420, 240 ) (WC 2) (d 1 4 0)

            Hammer ->
                make "Hammer" ( 1500, 3000 ) "hammer" ( 420, 240 ) (WC 2) (d 2 3 0)

            HandAxe ->
                make "Hand Axe" ( 1000, 3000 ) "axe" ( 472, 270 ) (WC 3) (d 1 6 0)

            Quarterstaff ->
                make "Quarterstaff" ( 750, 5000 ) "spear" ( 648, 360 ) (WC 3) (d 1 6 0)

            Spear ->
                make "Spear" ( 1500, 5000 ) "spear" ( 840, 480 ) (WC 4) (d 1 8 0)

            ShortSword ->
                make "Short Sword" ( 1200, 5000 ) "sword" ( 1470, 840 ) (WC 5) (d 1 6 0)

            Mace ->
                make "Mace" ( 2500, 4375 ) "mace" ( 1728, 960 ) (WC 5) (d 2 4 0)

            Flail ->
                make "Flail" ( 3300, 3250 ) "flail" ( 1512, 840 ) (WC 6) (d 3 4 0)

            Axe ->
                make "Axe" ( 3000, 5000 ) "axe" ( 1944, 1080 ) (WC 6) (d 1 10 0)

            WarHammer ->
                make "War Hammer" ( 4000, 7500 ) "hammer" ( 2160, 1200 ) (WC 7) (d 4 4 0)

            LongSword ->
                make "Long Sword" ( 2500, 8000 ) "sword" ( 3240, 1800 ) (WC 8) (d 1 9 0)

            BattleAxe ->
                make "Battle Axe" ( 3000, 6000 ) "axe" ( 2160, 1200 ) (WC 8) (d 1 10 0)

            BroadSword ->
                make "Broad Sword" ( 2500, 9000 ) "sword" ( 3240, 1800 ) (WC 9) (d 1 6 2)

            MorningStar ->
                make "Morning Star" ( 3000, 9000 ) "morning-star" ( 2160, 1200 ) (WC 10) (d 2 6 0)

            BastardSword ->
                make "Bastard Sword" ( 3500, 10000 ) "sword" ( 4320, 2400 ) (WC 11) (d 1 8 2)

            TwoHandedSword ->
                make "Two Handed Sword" ( 5000, 12000 ) "sword" ( 6360, 3600 ) (WC 12) (d 2 10 0)

            -- monster weapons
            SmallClaws ->
                makeMonsterWeapon "Small Claws" (WC 1) (d 1 3 0)

            SmallBite ->
                makeMonsterWeapon "Small Bite" (WC 2) (d 1 6 0)
            Crossbow ->
                makeMonsterWeapon "Crossbow" (WC 5) (d 3 4 0)

            Fangs ->
                makeMonsterWeapon "Fangs" (WC 10) (d 1 2 0)

            Pincers ->
                makeMonsterWeapon "Pincers" (WC 10) (d 2 6 0)

            Bow ->
                makeMonsterWeapon "Bow" (WC 6) (d 1 6 0)

            LargeClaws ->
                makeMonsterWeapon "Large Claws" (WC 8) (d 2 6 0)


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
    , SmallClaws
    , SmallBite
    , Crossbow
    , Fangs
    , Pincers
    , Bow
    , LargeClaws
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
