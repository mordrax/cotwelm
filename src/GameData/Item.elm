module GameData.Item exposing (..)


type ItemType
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



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


type alias Model =
    { name : String
    , buy : Int
    , sell : Int
    , weight : Int
    , bulk : Int
    , css : String
    , status : ItemStatus
    , isIdentified : Bool
    , itemType : ItemType
    }


newItem : ItemType -> String -> Int -> Int -> Int -> Int -> String -> Model
newItem itemType name weight bulk buy sell css =
    { name = name
    , buy = buy
    , sell = sell
    , weight = weight
    , bulk = bulk
    , css = css
    , status = Normal
    , isIdentified = True
    , itemType = itemType
    }



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
    { class : Int
    }


newWeapon : WeaponType -> Model
newWeapon weaponType =
    case weaponType of
        BrokenSword ->
            newItem (Weapon { class = 0 }) "Broken Sword" 1000 5000 0 25 "BrokenSword"

        Club ->
            newItem (Weapon { class = 1 }) "Club" 1500 3000 105 60 "Club"

        Dagger ->
            newItem (Weapon { class = 2 }) "Dagger" 500 500 420 240 "Sword"

        Hammer ->
            newItem (Weapon { class = 2 }) "Hammer" 2000 3000 420 240 "Hammer"

        HandAxe ->
            newItem (Weapon { class = 3 }) "Hand Axe" 1000 3000 472 270 "Axe"

        Quarterstaff ->
            newItem (Weapon { class = 3 }) "Quarterstaff" 750 5000 648 360 "Spear"

        Spear ->
            newItem (Weapon { class = 4 }) "Spear" 1500 5000 840 480 "Spear"

        ShortSword ->
            newItem (Weapon { class = 5 }) "Short Sword" 1000 5000 1470 840 "Sword"

        Mace ->
            newItem (Weapon { class = 5 }) "Mace" 2500 4375 1728 960 "Mace"

        Flail ->
            newItem (Weapon { class = 6 }) "Flail" 2000 3250 1512 840 "Flail"

        Axe ->
            newItem (Weapon { class = 6 }) "Axe" 2000 5000 1944 1080 "Axe"

        WarHammer ->
            newItem (Weapon { class = 7 }) "War Hammer" 1400 7500 2160 1200 "Hammer"

        LongSword ->
            newItem (Weapon { class = 8 }) "Long Sword" 1500 8000 3240 1800 "Sword"

        BattleAxe ->
            newItem (Weapon { class = 8 }) "Battle Axe" 3000 6000 2160 1200 "Axe"

        BroadSword ->
            newItem (Weapon { class = 9 }) "Broad Sword" 1600 9000 3240 1800 "Sword"

        MorningStar ->
            newItem (Weapon { class = 10 }) "Morning Star" 3000 9000 2160 1200 "MorningStar"

        BastardSword ->
            newItem (Weapon { class = 11 }) "Bastard Sword" 3000 10000 4320 2400 "Sword"

        TwoHandedSword ->
            newItem (Weapon { class = 12 }) "Two Handed Sword" 5000 12000 6360 3600 "Sword"



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
    { ac : Int }


newArmour : ArmourType -> Model
newArmour armourType =
    case armourType of
        RustyArmour ->
            newItem (Armour { ac = 0 }) "Rusty Armour" 10000 30000 0 25 "BrokenArmour"

        LeatherArmour ->
            newItem (Armour { ac = 6 }) "Leather Armour" 5000 2400 1080 600 "LeatherArmour"

        StuddedLeatherArmour ->
            newItem (Armour { ac = 12 }) "Studded Leather Armour" 7000 25000 3150 1800 "LeatherArmour"

        RingMail ->
            newItem (Armour { ac = 18 }) "Ring Mail" 8000 30000 6300 3600 "MetalArmour"

        ScaleMail ->
            newItem (Armour { ac = 24 }) "Scale Mail" 9000 30000 10800 6000 "MetalArmour"

        ChainMail ->
            newItem (Armour { ac = 30 }) "Chain Mail" 10000 30000 16200 9000 "MetalArmour"

        SplintMail ->
            newItem (Armour { ac = 36 }) "Splint Mail" 12000 40000 27000 15000 "MetalArmour"

        PlateMail ->
            newItem (Armour { ac = 42 }) "Plate Mail" 15000 40000 42000 24000 "MetalArmour"

        PlateArmour ->
            newItem (Armour { ac = 48 }) "Plate Armour" 15000 60000 42000 24000 "MetalArmour"

        MeteoricSteelPlate ->
            newItem (Armour { ac = 54 }) "Meteoric Steel Plate" 5000 30000 105000 60000 "MetalArmour"

        ElvenChainMail ->
            newItem (Armour { ac = 52 }) "Elven Chain Mail" 50000 24000 162000 90000 "MetalArmour"
