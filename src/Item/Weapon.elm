module Item.Weapon exposing (init)

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : WeaponType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Weapon
init weaponType status idStatus id =
    let
        make name mass css prices wc =
            { base = BaseItem name prices css mass status idStatus id
            , weaponType = weaponType
            , wc = wc
            }
    in
        case weaponType of
            BrokenSword ->
                make "Broken Sword" (Mass.Mass 1000 5000) "BrokenSword" (Prices 0 25) (WC 0)

            Club ->
                make "Club" (Mass.Mass 1500 3000) "Club" (Prices 105 60) (WC 1)

            Dagger ->
                make "Dagger" (Mass.Mass 500 500) "Sword" (Prices 420 240) (WC 2)

            Hammer ->
                make "Hammer" (Mass.Mass 2000 3000) "Hammer" (Prices 420 240) (WC 2)

            HandAxe ->
                make "Hand Axe" (Mass.Mass 1000 3000) "Axe" (Prices 472 270) (WC 3)

            Quarterstaff ->
                make "Quarterstaff" (Mass.Mass 750 5000) "Spear" (Prices 648 360) (WC 3)

            Spear ->
                make "Spear" (Mass.Mass 1500 5000) "Spear" (Prices 840 480) (WC 4)

            ShortSword ->
                make "Short Sword" (Mass.Mass 1000 5000) "Sword" (Prices 1470 840) (WC 5)

            Mace ->
                make "Mace" (Mass.Mass 2500 4375) "Mace" (Prices 1728 960) (WC 5)

            Flail ->
                make "Flail" (Mass.Mass 2000 3250) "Flail" (Prices 1512 840) (WC 6)

            Axe ->
                make "Axe" (Mass.Mass 2000 5000) "Axe" (Prices 1944 1080) (WC 6)

            WarHammer ->
                make "War Hammer" (Mass.Mass 1400 7500) "Hammer" (Prices 2160 1200) (WC 7)

            LongSword ->
                make "Long Sword" (Mass.Mass 1500 8000) "Sword" (Prices 3240 1800) (WC 8)

            BattleAxe ->
                make "Battle Axe" (Mass.Mass 3000 6000) "Axe" (Prices 2160 1200) (WC 8)

            BroadSword ->
                make "Broad Sword" (Mass.Mass 1600 9000) "Sword" (Prices 3240 1800) (WC 9)

            MorningStar ->
                make "Morning Star" (Mass.Mass 3000 9000) "MorningStar" (Prices 2160 1200) (WC 10)

            BastardSword ->
                make "Bastard Sword" (Mass.Mass 3000 10000) "Sword" (Prices 4320 2400) (WC 11)

            TwoHandedSword ->
                make "Two Handed Sword" (Mass.Mass 5000 12000) "Sword" (Prices 6360 3600) (WC 12)
