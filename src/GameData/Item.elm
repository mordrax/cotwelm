module GameData.Item exposing (..)

import Dict exposing (..)


type Item
    = Weapon WeaponModel
    | Armour ArmourModel
    | Shield
    | Helmet
    | Bracers
    | Gauntlets
    | Belt
    | Purse
    | Bag
    | Pack
    | Chest
    | PackOfHolding
    | Neckwear
    | Overgarment
    | Ring
    | Boots


type ItemStatus
    = Normal
    | Cursed
    | Enchanted


type alias Model =
    Dict String Item


initModel : Model
initModel =
    Dict.empty



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


type alias BaseItemModel =
    { name : String
    , buy : Int
    , sell : Int
    , weight : Int
    , bulk : Int
    , css : String
    , status : ItemStatus
    , isIdentified : Bool
    }


newBaseItem : String -> Int -> Int -> Int -> Int -> String -> BaseItemModel
newBaseItem name weight bulk buy sell css =
    { name = name
    , buy = buy
    , sell = sell
    , weight = weight
    , bulk = bulk
    , css = css
    , status = Normal
    , isIdentified = True
    }


emptyBaseItem : BaseItemModel
emptyBaseItem =
    newBaseItem "" 0 0 0 0 ""



-------------
-- Weapons --
-------------


type WeaponType
    = BrokenSword
    | Club
    | Dagger
    | Hammer
    | HandAxe
    | Quarterstaff
    | Spear
    | ShortSword
    | Mace
    | Flail
    | Axe
    | WarHammer
    | LongSword
    | BattleAxe
    | BroadSword
    | MorningStar
    | BastardSword
    | TwoHandedSword


type alias WeaponModel =
    { id : String
    , class : Int
    , base : BaseItemModel
    }


newWeapon : String -> WeaponType -> WeaponModel
newWeapon id weaponType =
    let
        model =
            { id = id, class = 0, base = emptyBaseItem }
    in
        case weaponType of
            BrokenSword ->
                { model | class = 0, base = (newBaseItem "Broken Sword" 1000 5000 0 25 "BrokenSword") }

            Club ->
                { model | class = 1, base = newBaseItem "Club" 1500 3000 105 60 "Club" }

            Dagger ->
                { model | class = 2, base = newBaseItem "Dagger" 500 500 420 240 "Sword" }

            Hammer ->
                { model | class = 2, base = newBaseItem "Hammer" 2000 3000 420 240 "Hammer" }

            HandAxe ->
                { model | class = 3, base = newBaseItem "Hand Axe" 1000 3000 472 270 "Axe" }

            Quarterstaff ->
                { model | class = 3, base = newBaseItem "Quarterstaff" 750 5000 648 360 "Spear" }

            Spear ->
                { model | class = 4, base = newBaseItem "Spear" 1500 5000 840 480 "Spear" }

            ShortSword ->
                { model | class = 5, base = newBaseItem "Short Sword" 1000 5000 1470 840 "Sword" }

            Mace ->
                { model | class = 5, base = newBaseItem "Mace" 2500 4375 1728 960 "Mace" }

            Flail ->
                { model | class = 6, base = newBaseItem "Flail" 2000 3250 1512 840 "Flail" }

            Axe ->
                { model | class = 6, base = newBaseItem "Axe" 2000 5000 1944 1080 "Axe" }

            WarHammer ->
                { model | class = 7, base = newBaseItem "War Hammer" 1400 7500 2160 1200 "Hammer" }

            LongSword ->
                { model | class = 8, base = newBaseItem "Long Sword" 1500 8000 3240 1800 "Sword" }

            BattleAxe ->
                { model | class = 8, base = newBaseItem "Battle Axe" 3000 6000 2160 1200 "Axe" }

            BroadSword ->
                { model | class = 9, base = newBaseItem "Broad Sword" 1600 9000 3240 1800 "Sword" }

            MorningStar ->
                { model | class = 10, base = newBaseItem "Morning Star" 3000 9000 2160 1200 "MorningStar" }

            BastardSword ->
                { model | class = 11, base = newBaseItem "Bastard Sword" 3000 10000 4320 2400 "Sword" }

            TwoHandedSword ->
                { model | class = 12, base = newBaseItem "Two Handed Sword" 5000 12000 6360 3600 "Sword" }



------------
-- Armour --
------------


type ArmourType
    = RustyArmour
    | LeatherArmour
    | StuddedLeatherArmour
    | RingMail
    | ScaleMail
    | ChainMail
    | SplintMail
    | PlateMail
    | PlateArmour
    | MeteoricSteelPlate
    | ElvenChainMail


type alias ArmourModel =
    { id : String, ac : Int, base : BaseItemModel }


newArmour : String -> ArmourType -> ArmourModel
newArmour id armourType =
    let
        model =
            { id = id, ac = 0, base = emptyBaseItem }
    in
        case armourType of
            RustyArmour ->
                { model | ac = 0, base = newBaseItem "Rusty Armour" 10000 30000 0 25 "BrokenArmour" }

            LeatherArmour ->
                { model | ac = 6, base = newBaseItem "Leather Armour" 5000 2400 1080 600 "LeatherArmour" }

            StuddedLeatherArmour ->
                { model | ac = 12, base = newBaseItem "Studded Leather Armour" 7000 25000 3150 1800 "LeatherArmour" }

            RingMail ->
                { model | ac = 18, base = newBaseItem "Ring Mail" 8000 30000 6300 3600 "MetalArmour" }

            ScaleMail ->
                { model | ac = 24, base = newBaseItem "Scale Mail" 9000 30000 10800 6000 "MetalArmour" }

            ChainMail ->
                { model | ac = 30, base = newBaseItem "Chain Mail" 10000 30000 16200 9000 "MetalArmour" }

            SplintMail ->
                { model | ac = 36, base = newBaseItem "Splint Mail" 12000 40000 27000 15000 "MetalArmour" }

            PlateMail ->
                { model | ac = 42, base = newBaseItem "Plate Mail" 15000 40000 42000 24000 "MetalArmour" }

            PlateArmour ->
                { model | ac = 48, base = newBaseItem "Plate Armour" 15000 60000 42000 24000 "MetalArmour" }

            MeteoricSteelPlate ->
                { model | ac = 54, base = newBaseItem "Meteoric Steel Plate" 5000 30000 105000 60000 "MetalArmour" }

            ElvenChainMail ->
                { model | ac = 52, base = newBaseItem "Elven Chain Mail" 50000 24000 162000 90000 "MetalArmour" }
