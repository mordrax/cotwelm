module Item.Weapon
    exposing
        ( Weapon
        , init
        , blueprint
        )

import Item.Data exposing (..)


type Weapon
    = Weapon WeaponType Class


type Class
    = Class Int


init : WeaponType -> Weapon
init weaponType =
    case weaponType of
        BrokenSword ->
            Weapon BrokenSword (Class 0)

        Club ->
            Weapon Club (Class 1)

        Dagger ->
            Weapon Dagger (Class 2)

        Hammer ->
            Weapon Hammer (Class 2)

        HandAxe ->
            Weapon HandAxe (Class 3)

        Quarterstaff ->
            Weapon Quarterstaff (Class 3)

        Spear ->
            Weapon Spear (Class 4)

        ShortSword ->
            Weapon ShortSword (Class 5)

        Mace ->
            Weapon Mace (Class 5)

        Flail ->
            Weapon Flail (Class 6)

        Axe ->
            Weapon Axe (Class 6)

        WarHammer ->
            Weapon WarHammer (Class 7)

        LongSword ->
            Weapon LongSword (Class 8)

        BattleAxe ->
            Weapon BattleAxe (Class 8)

        BroadSword ->
            Weapon BroadSword (Class 9)

        MorningStar ->
            Weapon MorningStar (Class 10)

        BastardSword ->
            Weapon BastardSword (Class 11)

        TwoHandedSword ->
            Weapon TwoHandedSword (Class 12)


blueprint : WeaponType -> BaseItemData
blueprint weaponType =
    case weaponType of
        BrokenSword ->
            BaseItemData "Broken Sword" 1000 5000 "BrokenSword" 0 25

        Club ->
            BaseItemData "Club" 1500 3000 "Club" 105 60

        Dagger ->
            BaseItemData "Dagger" 500 500 "Sword" 420 240

        Hammer ->
            BaseItemData "Hammer" 2000 3000 "Hammer" 420 240

        HandAxe ->
            BaseItemData "Hand Axe" 1000 3000 "Axe" 472 270

        Quarterstaff ->
            BaseItemData "Quarterstaff" 750 5000 "Spear" 648 360

        Spear ->
            BaseItemData "Spear" 1500 5000 "Spear" 840 480

        ShortSword ->
            BaseItemData "Short Sword" 1000 5000 "Sword" 1470 840

        Mace ->
            BaseItemData "Mace" 2500 4375 "Mace" 1728 960

        Flail ->
            BaseItemData "Flail" 2000 3250 "Flail" 1512 840

        Axe ->
            BaseItemData "Axe" 2000 5000 "Axe" 1944 1080

        WarHammer ->
            BaseItemData "War Hammer" 1400 7500 "Hammer" 2160 1200

        LongSword ->
            BaseItemData "Long Sword" 1500 8000 "Sword" 3240 1800

        BattleAxe ->
            BaseItemData "Battle Axe" 3000 6000 "Axe" 2160 1200

        BroadSword ->
            BaseItemData "Broad Sword" 1600 9000 "Sword" 3240 1800

        MorningStar ->
            BaseItemData "Morning Star" 3000 9000 "MorningStar" 2160 1200

        BastardSword ->
            BaseItemData "Bastard Sword" 3000 10000 "Sword" 4320 2400

        TwoHandedSword ->
            BaseItemData "Two Handed Sword" 5000 12000 "Sword" 6360 3600
