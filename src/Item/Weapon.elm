module Item.Weapon exposing (Weapon(..), newWeapon)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Weapon
    = WM WeaponType WeaponModel


type alias WeaponModel =
    { class : Int
    , baseItem : Model
    }


newWeapon : WeaponType -> ID -> ItemStatus -> IdentificationStatus -> Weapon
newWeapon weaponType id status idStatus =
    case weaponType of
        BrokenSword ->
            WM BrokenSword
                { class = 0
                , baseItem = (Model id "Broken Sword" 0 25 "BrokenSword" status idStatus <| Mass.new 1000 5000)
                }

        Club ->
            WM Club
                { class = 1
                , baseItem = (Model id "Club" 105 60 "Club" status idStatus <| Mass.new 1500 3000)
                }

        Dagger ->
            WM Dagger
                { class = 2
                , baseItem = (Model id "Dagger" 420 240 "Sword" status idStatus <| Mass.new 500 500)
                }

        Hammer ->
            WM Hammer
                { class = 2
                , baseItem = (Model id "Hammer" 420 240 "Hammer" status idStatus <| Mass.new 2000 3000)
                }

        HandAxe ->
            WM HandAxe
                { class = 3
                , baseItem = (Model id "Hand Axe" 472 270 "Axe" status idStatus <| Mass.new 1000 3000)
                }

        Quarterstaff ->
            WM Quarterstaff
                { class = 3
                , baseItem = (Model id "Quarterstaff" 648 360 "Spear" status idStatus <| Mass.new 750 5000)
                }

        Spear ->
            WM Spear
                { class = 4
                , baseItem = (Model id "Spear" 840 480 "Spear" status idStatus <| Mass.new 1500 5000)
                }

        ShortSword ->
            WM ShortSword
                { class = 5
                , baseItem = (Model id "Short Sword" 1470 840 "Sword" status idStatus <| Mass.new 1000 5000)
                }

        Mace ->
            WM Mace
                { class = 5
                , baseItem = (Model id "Mace" 1728 960 "Mace" status idStatus <| Mass.new 2500 4375)
                }

        Flail ->
            WM Flail
                { class = 6
                , baseItem = (Model id "Flail" 1512 840 "Flail" status idStatus <| Mass.new 2000 3250)
                }

        Axe ->
            WM Axe
                { class = 6
                , baseItem = (Model id "Axe" 1944 1080 "Axe" status idStatus <| Mass.new 2000 5000)
                }

        WarHammer ->
            WM WarHammer
                { class = 7
                , baseItem = (Model id "War Hammer" 2160 1200 "Hammer" status idStatus <| Mass.new 1400 7500)
                }

        LongSword ->
            WM LongSword
                { class = 8
                , baseItem = (Model id "Long Sword" 3240 1800 "Sword" status idStatus <| Mass.new 1500 8000)
                }

        BattleAxe ->
            WM BattleAxe
                { class = 8
                , baseItem = (Model id "Battle Axe" 2160 1200 "Axe" status idStatus <| Mass.new 3000 6000)
                }

        BroadSword ->
            WM BroadSword
                { class = 9
                , baseItem = (Model id "Broad Sword" 3240 1800 "Sword" status idStatus <| Mass.new 1600 9000)
                }

        MorningStar ->
            WM MorningStar
                { class = 10
                , baseItem = (Model id "Morning Star" 2160 1200 "MorningStar" status idStatus <| Mass.new 3000 9000)
                }

        BastardSword ->
            WM BastardSword
                { class = 11
                , baseItem = (Model id "Bastard Sword" 4320 2400 "Sword" status idStatus <| Mass.new 3000 10000)
                }

        TwoHandedSword ->
            WM TwoHandedSword
                { class = 12
                , baseItem = (Model id "Two Handed Sword" 6360 3600 "Sword" status idStatus <| Mass.new 5000 12000)
                }
