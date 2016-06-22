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
                , baseItem = (Model id "Broken Sword" 1000 5000 "BrokenSword" status idStatus <| Mass.new 0 25)
                }

        Club ->
            WM Club
                { class = 1
                , baseItem = (Model id "Club" 1500 3000 "Club" status idStatus <| Mass.new 105 60)
                }

        Dagger ->
            WM Dagger
                { class = 2
                , baseItem = (Model id "Dagger" 500 500 "Sword" status idStatus <| Mass.new 420 240)
                }

        Hammer ->
            WM Hammer
                { class = 2
                , baseItem = (Model id "Hammer" 2000 3000 "Hammer" status idStatus <| Mass.new 420 240)
                }

        HandAxe ->
            WM HandAxe
                { class = 3
                , baseItem = (Model id "Hand Axe" 1000 3000 "Axe" status idStatus <| Mass.new 472 270)
                }

        Quarterstaff ->
            WM Quarterstaff
                { class = 3
                , baseItem = (Model id "Quarterstaff" 750 5000 "Spear" status idStatus <| Mass.new 648 360)
                }

        Spear ->
            WM Spear
                { class = 4
                , baseItem = (Model id "Spear" 1500 5000 "Spear" status idStatus <| Mass.new 840 480)
                }

        ShortSword ->
            WM ShortSword
                { class = 5
                , baseItem = (Model id "Short Sword" 1000 5000 "Sword" status idStatus <| Mass.new 1470 840)
                }

        Mace ->
            WM Mace
                { class = 5
                , baseItem = (Model id "Mace" 2500 4375 "Mace" status idStatus <| Mass.new 1728 960)
                }

        Flail ->
            WM Flail
                { class = 6
                , baseItem = (Model id "Flail" 2000 3250 "Flail" status idStatus <| Mass.new 1512 840)
                }

        Axe ->
            WM Axe
                { class = 6
                , baseItem = (Model id "Axe" 2000 5000 "Axe" status idStatus <| Mass.new 1944 1080)
                }

        WarHammer ->
            WM WarHammer
                { class = 7
                , baseItem = (Model id "War Hammer" 1400 7500 "Hammer" status idStatus <| Mass.new 2160 1200)
                }

        LongSword ->
            WM LongSword
                { class = 8
                , baseItem = (Model id "Long Sword" 1500 8000 "Sword" status idStatus <| Mass.new 3240 1800)
                }

        BattleAxe ->
            WM BattleAxe
                { class = 8
                , baseItem = (Model id "Battle Axe" 3000 6000 "Axe" status idStatus <| Mass.new 2160 1200)
                }

        BroadSword ->
            WM BroadSword
                { class = 9
                , baseItem = (Model id "Broad Sword" 1600 9000 "Sword" status idStatus <| Mass.new 3240 1800)
                }

        MorningStar ->
            WM MorningStar
                { class = 10
                , baseItem = (Model id "Morning Star" 3000 9000 "MorningStar" status idStatus <| Mass.new 2160 1200)
                }

        BastardSword ->
            WM BastardSword
                { class = 11
                , baseItem = (Model id "Bastard Sword" 3000 10000 "Sword" status idStatus <| Mass.new 4320 2400)
                }

        TwoHandedSword ->
            WM TwoHandedSword
                { class = 12
                , baseItem = (Model id "Two Handed Sword" 5000 12000 "Sword" status idStatus <| Mass.new 6360 3600)
                }
