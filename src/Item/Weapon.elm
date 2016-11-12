module Item.Weapon exposing (init, damage)

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)
import Types


damage : Weapon -> Types.DamageDie
damage { damage } =
    damage


init : WeaponType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Weapon
init weaponType status idStatus id =
    let
        make name mass css prices wc damage =
            { base = BaseItem name prices css mass status idStatus id
            , weaponType = weaponType
            , wc = wc
            , damage = damage
            }

        d die bonus =
            Types.DamageDie die bonus
    in
        case weaponType of
            BrokenSword ->
                make "Broken Sword" (Mass.Mass 1000 5000) "BrokenSword" (Prices 0 25) (WC 0) (d 6 -2)

            Club ->
                make "Club" (Mass.Mass 1500 3000) "Club" (Prices 105 60) (WC 1) (d 6 0)

            Dagger ->
                make "Dagger" (Mass.Mass 500 500) "Sword" (Prices 420 240) (WC 2) (d 4 0)

            Hammer ->
                make "Hammer" (Mass.Mass 2000 3000) "Hammer" (Prices 420 240) (WC 2) (d 5 0)

            HandAxe ->
                make "Hand Axe" (Mass.Mass 1000 3000) "Axe" (Prices 472 270) (WC 3) (d 6 0)

            Quarterstaff ->
                make "Quarterstaff" (Mass.Mass 750 5000) "Spear" (Prices 648 360) (WC 3) (d 6 0)

            Spear ->
                make "Spear" (Mass.Mass 1500 5000) "Spear" (Prices 840 480) (WC 4) (d 8 0)

            ShortSword ->
                make "Short Sword" (Mass.Mass 1000 5000) "Sword" (Prices 1470 840) (WC 5) (d 6 0)

            Mace ->
                make "Mace" (Mass.Mass 2500 4375) "Mace" (Prices 1728 960) (WC 5) (d 6 0)

            Flail ->
                make "Flail" (Mass.Mass 2000 3250) "Flail" (Prices 1512 840) (WC 6) (d 7 0)

            Axe ->
                make "Axe" (Mass.Mass 2000 5000) "Axe" (Prices 1944 1080) (WC 6) (d 7 0)

            WarHammer ->
                make "War Hammer" (Mass.Mass 1400 7500) "Hammer" (Prices 2160 1200) (WC 7) (d 7 0)

            LongSword ->
                make "Long Sword" (Mass.Mass 1500 8000) "Sword" (Prices 3240 1800) (WC 8) (d 8 0)

            BattleAxe ->
                make "Battle Axe" (Mass.Mass 3000 6000) "Axe" (Prices 2160 1200) (WC 8) (d 9 0)

            BroadSword ->
                make "Broad Sword" (Mass.Mass 1600 9000) "Sword" (Prices 3240 1800) (WC 9) (d 10 0)

            MorningStar ->
                make "Morning Star" (Mass.Mass 3000 9000) "MorningStar" (Prices 2160 1200) (WC 10) (d 10 0)

            BastardSword ->
                make "Bastard Sword" (Mass.Mass 3000 10000) "Sword" (Prices 4320 2400) (WC 11) (d 10 0)

            TwoHandedSword ->
                make "Two Handed Sword" (Mass.Mass 5000 12000) "Sword" (Prices 6360 3600) (WC 12) (d 12 0)
