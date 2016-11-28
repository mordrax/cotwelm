module Item.Weapon exposing (init, damage)

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)
import Types


damage : Weapon -> Types.Dice
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

        d n faces bonus =
            Types.Dice n faces bonus
    in
        case weaponType of
            BrokenSword ->
                make "Broken Sword" (Mass.Mass 1000 5000) "broken-sword" (Prices 0 25) (WC 0) (d 1 6 -2)

            Club ->
                make "Club" (Mass.Mass 1500 3000) "club" (Prices 105 60) (WC 1) (d 1 6 0)

            Dagger ->
                make "Dagger" (Mass.Mass 500 500) "sword" (Prices 420 240) (WC 2) (d 1 4 0)

            Hammer ->
                make "Hammer" (Mass.Mass 2000 3000) "hammer" (Prices 420 240) (WC 2) (d 1 5 0)

            HandAxe ->
                make "Hand Axe" (Mass.Mass 1000 3000) "axe" (Prices 472 270) (WC 3) (d 1 6 0)

            Quarterstaff ->
                make "Quarterstaff" (Mass.Mass 750 5000) "spear" (Prices 648 360) (WC 3) (d 1 6 0)

            Spear ->
                make "Spear" (Mass.Mass 1500 5000) "spear" (Prices 840 480) (WC 4) (d 1 8 0)

            ShortSword ->
                make "Short Sword" (Mass.Mass 1000 5000) "sword" (Prices 1470 840) (WC 5) (d 1 6 0)

            Mace ->
                make "Mace" (Mass.Mass 2500 4375) "mace" (Prices 1728 960) (WC 5) (d 1 6 0)

            Flail ->
                make "Flail" (Mass.Mass 2000 3250) "flail" (Prices 1512 840) (WC 6) (d 1 7 0)

            Axe ->
                make "Axe" (Mass.Mass 2000 5000) "axe" (Prices 1944 1080) (WC 6) (d 1 7 0)

            WarHammer ->
                make "War Hammer" (Mass.Mass 1400 7500) "hammer" (Prices 2160 1200) (WC 7) (d 1 7 0)

            LongSword ->
                make "Long Sword" (Mass.Mass 1500 8000) "sword" (Prices 3240 1800) (WC 8) (d 1 8 0)

            BattleAxe ->
                make "Battle Axe" (Mass.Mass 3000 6000) "axe" (Prices 2160 1200) (WC 8) (d 1 9 0)

            BroadSword ->
                make "Broad Sword" (Mass.Mass 1600 9000) "sword" (Prices 3240 1800) (WC 9) (d 1 10 0)

            MorningStar ->
                make "Morning Star" (Mass.Mass 3000 9000) "morning-star" (Prices 2160 1200) (WC 10) (d 1 10 0)

            BastardSword ->
                make "Bastard Sword" (Mass.Mass 3000 10000) "sword" (Prices 4320 2400) (WC 11) (d 1 10 0)

            TwoHandedSword ->
                make "Two Handed Sword" (Mass.Mass 5000 12000) "sword" (Prices 6360 3600) (WC 12) (d 1 12 0)
