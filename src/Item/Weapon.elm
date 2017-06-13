module Item.Weapon
    exposing
        ( damage
        , decoder
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
import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : WeaponType -> ItemStatus -> IdentificationStatus -> Weapon BasicItem
init weaponType status idStatus =
    EveryDict.get weaponType data
        |> Maybe.withDefault brokenSword
        |> setWeaponData weaponType


setWeaponData : WeaponType -> WeaponData -> Weapon BasicItem
setWeaponData weaponType (WeaponData damage baseItem) =
    initBasicItem baseItem BIT_Weapon
        |> setWeaponType weaponType
        |> setDamage damage


type WeaponData
    = WeaponData Dice BaseItem


brokenSword : WeaponData
brokenSword =
    WeaponData (damage 1 6 -2) (BaseItem "Broken Sword" (Prices 0 25) "broken-sword" (Mass 1000 5000) Normal Identified)


damage : Int -> Int -> Int -> Dice
damage n faces bonus =
    Dice n faces bonus


data : EveryDict WeaponType WeaponData
data =
    EveryDict.fromList
        [ ( BrokenSword, WeaponData (damage 1 6 -2) (BaseItem "Broken Sword" (Prices 0 25) "broken-sword" (Mass 1000 5000) Normal Identified) )
        , ( Club, WeaponData (damage 3 2 0) (BaseItem "Club" (Prices 105 60) "club" (Mass 2500 3000) Normal Identified) )
        , ( Dagger, WeaponData (damage 1 4 0) (BaseItem "Dagger" (Prices 420 240) "sword" (Mass 500 500) Normal Identified) )
        , ( Hammer, WeaponData (damage 2 2 0) (BaseItem "Hammer" (Prices 420 240) "hammer" (Mass 1500 3000) Normal Identified) )
        , ( HandAxe, WeaponData (damage 1 5 0) (BaseItem "Hand Axe" (Prices 472 270) "axe" (Mass 1000 3000) Normal Identified) )
        , ( Quarterstaff, WeaponData (damage 3 1 0) (BaseItem "Quarterstaff" (Prices 648 360) "spear" (Mass 1000 5000) Normal Identified) )
        , ( Spear, WeaponData (damage 1 9 0) (BaseItem "Spear" (Prices 840 480) "spear" (Mass 2500 5000) Normal Identified) )
        , ( ShortSword, WeaponData (damage 1 6 0) (BaseItem "Short Sword" (Prices 1470 840) "sword" (Mass 1500 5000) Normal Identified) )
        , ( Mace, WeaponData (damage 3 2 0) (BaseItem "Mace" (Prices 1728 960) "mace" (Mass 2500 4375) Normal Identified) )
        , ( Flail, WeaponData (damage 4 3 0) (BaseItem "Flail" (Prices 1512 840) "flail" (Mass 4500 3250) Normal Identified) )
        , ( Axe, WeaponData (damage 1 9 0) (BaseItem "Axe" (Prices 1944 1080) "axe" (Mass 3000 5000) Normal Identified) )
        , ( WarHammer, WeaponData (damage 4 3 -1) (BaseItem "War Hammer" (Prices 2160 1200) "hammer" (Mass 4000 7500) Normal Identified) )
        , ( LongSword, WeaponData (damage 1 8 0) (BaseItem "Long Sword" (Prices 3240 1800) "sword" (Mass 2500 8000) Normal Identified) )
        , ( BattleAxe, WeaponData (damage 2 5 0) (BaseItem "Battle Axe" (Prices 2160 1200) "axe" (Mass 3500 6000) Normal Identified) )
        , ( BroadSword, WeaponData (damage 1 9 0) (BaseItem "Broad Sword" (Prices 3240 1800) "sword" (Mass 3000 9000) Normal Identified) )
        , ( MorningStar, WeaponData (damage 4 2 0) (BaseItem "Morning Star" (Prices 2160 1200) "morning-star" (Mass 3000 9000) Normal Identified) )
        , ( BastardSword, WeaponData (damage 2 7 0) (BaseItem "Bastard Sword" (Prices 4320 2400) "sword" (Mass 4500 10000) Normal Identified) )
        , ( TwoHandedSword, WeaponData (damage 2 8 0) (BaseItem "Two Handed Sword" (Prices 6360 3600) "sword" (Mass 5000 12000) Normal Identified) )

        -- monster weapons
        , ( SmallClaws, WeaponData (damage 1 4 0) (BaseItem "Small Claws" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( SmallBite, WeaponData (damage 1 5 0) (BaseItem "Small Bite" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Crossbow, WeaponData (damage 1 10 0) (BaseItem "Crossbow" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Fangs, WeaponData (damage 1 4 0) (BaseItem "Fangs" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Pincers, WeaponData (damage 4 2 0) (BaseItem "Pincers" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Bow, WeaponData (damage 1 6 0) (BaseItem "Bow" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( LargeClaws, WeaponData (damage 1 8 0) (BaseItem "Large Claws" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( LargeClub, WeaponData (damage 3 4 2) (BaseItem "Large Club" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Pike, WeaponData (damage 1 15 2) (BaseItem "Pike" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( StoneClub, WeaponData (damage 3 8 5) (BaseItem "Stone Club" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( GiantAxe, WeaponData (damage 2 10 5) (BaseItem "Giant Axe" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Boulder, WeaponData (damage 3 3 3) (BaseItem "Boulder" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( GiantMaul, WeaponData (damage 4 6 10) (BaseItem "Giant Maul" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        ]


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
