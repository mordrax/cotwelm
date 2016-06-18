module Item.Weapon exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Weapon
    = WeaponModelTag WeaponType Model WeaponModel


newWeapon : WeaponType -> ID -> ItemStatus -> IdentificationStatus -> Weapon
newWeapon weaponType id status idStatus =
    case weaponType of
        BrokenSword ->
            WeaponModelTag BrokenSword
                (Model id "Broken Sword" 1000 5000 "BrokenSword" status idStatus <| Mass.new 0 25)
                (WeaponModel 0)

        Club ->
            WeaponModelTag Club
                (Model id "Club" 1500 3000 "Club" status idStatus <| Mass.new 105 60)
                (WeaponModel 1)

        Dagger ->
            WeaponModelTag Dagger
                (Model id "Dagger" 500 500 "Sword" status idStatus <| Mass.new 420 240)
                (WeaponModel 2)

        Hammer ->
            WeaponModelTag Hammer
                (Model id "Hammer" 2000 3000 "Hammer" status idStatus <| Mass.new 420 240)
                (WeaponModel 2)

        HandAxe ->
            WeaponModelTag HandAxe
                (Model id "Hand Axe" 1000 3000 "Axe" status idStatus <| Mass.new 472 270)
                (WeaponModel 3)

        Quarterstaff ->
            WeaponModelTag Quarterstaff
                (Model id "Quarterstaff" 750 5000 "Spear" status idStatus <| Mass.new 648 360)
                (WeaponModel 3)

        Spear ->
            WeaponModelTag Spear
                (Model id "Spear" 1500 5000 "Spear" status idStatus <| Mass.new 840 480)
                (WeaponModel 4)

        ShortSword ->
            WeaponModelTag ShortSword
                (Model id "Short Sword" 1000 5000 "Sword" status idStatus <| Mass.new 1470 840)
                (WeaponModel 5)

        Mace ->
            WeaponModelTag Mace
                (Model id "Mace" 2500 4375 "Mace" status idStatus <| Mass.new 1728 960)
                (WeaponModel 5)

        Flail ->
            WeaponModelTag Flail
                (Model id "Flail" 2000 3250 "Flail" status idStatus <| Mass.new 1512 840)
                (WeaponModel 6)

        Axe ->
            WeaponModelTag Axe
                (Model id "Axe" 2000 5000 "Axe" status idStatus <| Mass.new 1944 1080)
                (WeaponModel 6)

        WarHammer ->
            WeaponModelTag WarHammer
                (Model id "War Hammer" 1400 7500 "Hammer" status idStatus <| Mass.new 2160 1200)
                (WeaponModel 7)

        LongSword ->
            WeaponModelTag LongSword
                (Model id "Long Sword" 1500 8000 "Sword" status idStatus <| Mass.new 3240 1800)
                (WeaponModel 8)

        BattleAxe ->
            WeaponModelTag BattleAxe
                (Model id "Battle Axe" 3000 6000 "Axe" status idStatus <| Mass.new 2160 1200)
                (WeaponModel 8)

        BroadSword ->
            WeaponModelTag BroadSword
                (Model id "Broad Sword" 1600 9000 "Sword" status idStatus <| Mass.new 3240 1800)
                (WeaponModel 9)

        MorningStar ->
            WeaponModelTag MorningStar
                (Model id "Morning Star" 3000 9000 "MorningStar" status idStatus <| Mass.new 2160 1200)
                (WeaponModel 10)

        BastardSword ->
            WeaponModelTag BastardSword
                (Model id "Bastard Sword" 3000 10000 "Sword" status idStatus <| Mass.new 4320 2400)
                (WeaponModel 11)

        TwoHandedSword ->
            WeaponModelTag TwoHandedSword
                (Model id "Two Handed Sword" 5000 12000 "Sword" status idStatus <| Mass.new 6360 3600)
                (WeaponModel 12)
