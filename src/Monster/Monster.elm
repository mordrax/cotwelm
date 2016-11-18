module Monster.Monster
    exposing
        ( Monster
        , MonsterType(..)
        , view
        , init
        , initWithOptions
        )

import Utils.Vector as Vector exposing (..)
import Utils.Lib exposing (vectorToHtmlStyle)
import Html exposing (..)
import Html.Attributes exposing (..)
import Stats exposing (..)
import Utils.IdGenerator exposing (ID)
import Equipment exposing (Equipment)
import Attributes exposing (Attributes)
import Utils.Lib as Lib
import Types
import Fighter exposing (Fighter)


type alias Monster =
    { name : String
    , type_ : Types.CreatureType
    , css : String
    , position : Vector
    , stats : Stats
    , attributes : Attributes
    , equipment : Equipment
    , expLevel : Int
    , bodySize : Types.BodySize
    , id : ID
    }


view : Monster -> Html a
view { css, position } =
    div [ vectorToHtmlStyle position, class ("tile monster " ++ css) ] []


init : MonsterType -> Vector -> ID -> Monster
init monsterType pos id =
    initWithOptions monsterType pos id Equipment.init


initWithOptions : MonsterType -> Vector -> ID -> Equipment -> Monster
initWithOptions monsterType pos id equipment =
    let
        make name level attributes bodySize =
            { name = name
            , type_ = Types.Monster
            , css = (Utils.Lib.toCSS name)
            , position = pos
            , stats = Stats.init attributes
            , attributes = attributes
            , equipment = equipment
            , expLevel = level
            , bodySize = bodySize
            , id = id
            }
    in
        case monsterType of
            GiantRat ->
                make "Giant Rat" 1 (Attributes 0 0 0 0 0) Types.Medium

            Goblin ->
                make "Goblin" 1 (Attributes 0 0 0 0 0) Types.Medium

            GiantBat ->
                make "Giant Bat" 2 (Attributes 0 0 0 0 0) Types.Medium

            Hobgoblin ->
                make "Hobgoblin" 2 (Attributes 0 0 0 0 0) Types.Medium

            Kobold ->
                make "Kobold" 2 (Attributes 0 0 0 0 0) Types.Medium

            LargeSnake ->
                make "Large Snake" 3 (Attributes 0 0 0 0 0) Types.Medium

            Skeleton ->
                make "Skeleton" 3 (Attributes 0 0 0 0 0) Types.Medium

            WildDog ->
                make "Wild Dog" 3 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Poison"
            Viper ->
                make "Viper" 5 (Attributes 0 0 0 0 0) Types.Medium

            GoblinFighter ->
                make "Goblin Fighter" 6 (Attributes 0 0 0 0 0) Types.Medium

            GiantRedAnt ->
                make "Giant Red Ant" 7 (Attributes 0 0 0 0 0) Types.Medium

            WalkingCorpse ->
                make "Walking Corpse" 7 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Arrow"
            Bandit ->
                make "Bandit" 10 (Attributes 0 0 0 0 0) Types.Medium

            GiantTrapdoorSpider ->
                make "Giant Trapdoor Spider" 10 (Attributes 0 0 0 0 0) Types.Medium

            HugeLizard ->
                make "Huge Lizard" 10 (Attributes 0 0 0 0 0) Types.Medium

            RatMan ->
                make "Rat-Man" 10 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Weapons"
            Slime ->
                make "Slime" 10 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Poison"
            GiantScorpion ->
                make "Giant Scorpion" 11 (Attributes 0 0 0 0 0) Types.Medium

            GrayWolf ->
                make "Gray Wolf" 11 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Lightning"
            GelantinousGlob ->
                make "Gelantinous Glob" 14 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Steals from Belt and Purse, Teleports"
            SmirkingSneakThief ->
                make "Smirking Sneak Thief" 15 (Attributes 0 0 0 0 0) Types.Medium

            CarrionCreeper ->
                make "Carrion Creeper" 16 (Attributes 0 0 0 0 0) Types.Medium

            HugeOgre ->
                make "Huge Ogre" 16 (Attributes 0 0 0 0 0) Types.Medium

            Shadow ->
                make "Shadow" 16 (Attributes 0 0 0 0 0) Types.Medium

            AnimatedWoodenStatue ->
                make "Animated Wooden Statue" 17 (Attributes 0 0 0 0 0) Types.Medium

            BrownBear ->
                make "Brown Bear" 17 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            YoungGreenDragon ->
                make "Young Green Dragon" 18 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Breathes Ice"
            YoungWhiteDragon ->
                make "Young White Dragon" 18 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Needles"
            Manticore ->
                make "Manticore" 19 (Attributes 0 0 0 0 0) Types.Medium

            EerieGhost ->
                make "Eerie Ghost" 20 (Attributes 0 0 0 0 0) Types.Medium

            GruesomeTroll ->
                make "Gruesome Troll" 20 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            YoungBlueDragon ->
                make "Young Blue Dragon" 20 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Fire, Breathes Fire"
            YoungRedDragon ->
                make "Young Red Dragon" 20 (Attributes 0 0 0 0 0) Types.Medium

            AnimatedBronzeStatue ->
                make "Animated Bronze Statue" 25 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Arrow"
            EvilWarrior ->
                make "Evil Warrior" 25 (Attributes 0 0 0 0 0) Types.Medium

            WolfMan ->
                make "Wolf-Man" 25 (Attributes 0 0 0 0 0) Types.Medium

            CaveBear ->
                make "Cave Bear" 27 (Attributes 0 0 0 0 0) Types.Medium

            WhiteWolf ->
                make "White Wolf" 28 (Attributes 0 0 0 0 0) Types.Medium

            Berserker ->
                make "Berserker" 30 (Attributes 0 0 0 0 0) Types.Medium

            AnimatedIronStatue ->
                make "Animated Iron Statue" 35 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            TunnelWight ->
                make "Tunnel Wight" 35 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            YoungAdultBlueDragon ->
                make "Young Adult Blue Dragon" 35 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            YoungAdultGreenDragon ->
                make "Young Adult Green Dragon" 35 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Breathes Ice"
            YoungAdultWhiteDragon ->
                make "Young Adult White Dragon" 35 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains Intelligence and Mana Permanently"
            PaleWraith ->
                make "Pale Wraith" 37 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            BarrowWight ->
                make "Barrow Wight" 40 (Attributes 0 0 0 0 0) Types.Medium

            BearMan ->
                make "Bear-Man" 40 (Attributes 0 0 0 0 0) Types.Medium

            DustElemental ->
                make "Dust Elemental" 40 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Stones"
            HillGiant ->
                make "Hill Giant" 40 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Fire, Breathes Fire"
            YoungAdultRedDragon ->
                make "Young Adult Red Dragon" 40 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Wizard ->
                make "Wizard" 45 (Attributes 0 0 0 0 0) Types.Medium

            BullMan ->
                make "Bull-Man" 50 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            CastleWight ->
                make "Castle Wight" 50 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains Intelligence and Mana Permanently"
            DarkWraith ->
                make "Dark Wraith" 50 (Attributes 0 0 0 0 0) Types.Medium

            IceElemental ->
                make "Ice Elemental" 50 (Attributes 0 0 0 0 0) Types.Medium

            Spectre ->
                make "Spectre" 50 (Attributes 0 0 0 0 0) Types.Medium

            AnimatedMarbleStatue ->
                make "Animated Marble Statue" 52 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            AdultBlueDragon ->
                make "Adult Blue Dragon" 55 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            AdultGreenDragon ->
                make "Adult Green Dragon" 55 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Breathes Ice"
            AdultWhiteDragon ->
                make "Adult White Dragon" 55 (Attributes 0 0 0 0 0) Types.Medium

            AirElemental ->
                make "Air Elemental" 55 (Attributes 0 0 0 0 0) Types.Medium

            MagmaElemental ->
                make "Magma Elemental" 55 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Stones"
            StoneGiant ->
                make "Stone Giant" 55 (Attributes 0 0 0 0 0) Types.Medium

            TwoHeadedGiant ->
                make "Two Headed Giant" 55 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Fire, Breathes Fire"
            AdultRedDragon ->
                make "Adult Red Dragon" 60 (Attributes 0 0 0 0 0) Types.Medium

            FireElemental ->
                make "Fire Elemental" 60 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Iceballs"
            FrostGiant ->
                make "Frost Giant" 60 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "SuBaseons Spiked Devil"
            SpikedDevil ->
                make "Spiked Devil" 60 (Attributes 0 0 0 0 0) Types.Medium

            WaterElemental ->
                make "Water Elemental" 60 (Attributes 0 0 0 0 0) Types.Medium

            EarthElemental ->
                make "Earth Elemental" 65 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Necromancer ->
                make "Necromancer" 65 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains HP Permanently"
            Vampire ->
                make "Vampire" 65 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Drains Intelligence and Mana Permanently"
            AbyssWraith ->
                make "Abyss Wraith" 70 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Boulders"
            Utgardhalok ->
                make "Utgardhalok" 70 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Stones"
            FireGiant ->
                make "Fire Giant" 75 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            OldBlueDragon ->
                make "Old Blue Dragon" 75 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            OldGreenDragon ->
                make "Old Green Dragon" 75 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Breathes Ice"
            OldWhiteDragon ->
                make "Old White Dragon" 75 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "SuBaseons Horned Devil"
            HornedDevil ->
                make "Horned Devil" 80 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Fire, Breathes Fire"
            OldRedDragon ->
                make "Old Red Dragon" 80 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws stones"
            Rungnir ->
                make "Rungnir" 80 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "SuBaseons Ice Devil"
            IceDevil ->
                make "Ice Devil" 85 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Iceballs"
            Thrym ->
                make "Thrym" 90 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            VeryOldGreenDragon ->
                make "Very Old Green Dragon" 90 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Breathes Ice"
            VeryOldWhiteDragon ->
                make "Very Old White Dragon" 90 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            VeryOldBlueDragon ->
                make "Very Old Blue Dragon" 95 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "SuBaseons Spiked Devil or Abyss Fiend"
            AbyssFiend ->
                make "Abyss Fiend" 100 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Throws Stones"
            Thiassa ->
                make "Thiassa" 100 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Fire, Breathes Fire"
            VeryOldRedDragon ->
                make "Very Old Red Dragon" 100 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            AncientGreenDragon ->
                make "Ancient Green Dragon" 105 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Cold, Breathes Ice"
            AncientWhiteDragon ->
                make "Ancient White Dragon" 105 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            AncientBlueDragon ->
                make "Ancient Blue Dragon" 110 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "IBaseune to Fire, Breathes Fire"
            AncientRedDragon ->
                make "Ancient Red Dragon" 120 (Attributes 0 0 0 0 0) Types.Medium

            -- Special: "Casts Fire, Lighting, and Wind Spells"
            Sultur ->
                make "Sultur" 344 (Attributes 0 0 0 0 0) Types.Medium


type MonsterType
    = GiantRat
    | Goblin
    | GiantBat
    | Hobgoblin
    | Kobold
    | LargeSnake
    | Skeleton
    | WildDog
    | Viper
    | GoblinFighter
    | GiantRedAnt
    | WalkingCorpse
    | Bandit
    | GiantTrapdoorSpider
    | HugeLizard
    | RatMan
    | Slime
    | GiantScorpion
    | GrayWolf
    | GelantinousGlob
    | SmirkingSneakThief
    | CarrionCreeper
    | HugeOgre
    | Shadow
    | AnimatedWoodenStatue
    | BrownBear
    | YoungGreenDragon
    | YoungWhiteDragon
    | Manticore
    | EerieGhost
    | GruesomeTroll
    | YoungBlueDragon
    | YoungRedDragon
    | AnimatedBronzeStatue
    | EvilWarrior
    | WolfMan
    | CaveBear
    | WhiteWolf
    | Berserker
    | AnimatedIronStatue
    | TunnelWight
    | YoungAdultBlueDragon
    | YoungAdultGreenDragon
    | YoungAdultWhiteDragon
    | PaleWraith
    | BarrowWight
    | BearMan
    | DustElemental
    | HillGiant
    | YoungAdultRedDragon
    | Wizard
    | BullMan
    | CastleWight
    | DarkWraith
    | IceElemental
    | Spectre
    | AnimatedMarbleStatue
    | AdultBlueDragon
    | AdultGreenDragon
    | AdultWhiteDragon
    | AirElemental
    | MagmaElemental
    | StoneGiant
    | TwoHeadedGiant
    | AdultRedDragon
    | FireElemental
    | FrostGiant
    | SpikedDevil
    | WaterElemental
    | EarthElemental
    | Necromancer
    | Vampire
    | AbyssWraith
    | Utgardhalok
    | FireGiant
    | OldBlueDragon
    | OldGreenDragon
    | OldWhiteDragon
    | HornedDevil
    | OldRedDragon
    | Rungnir
    | IceDevil
    | Thrym
    | VeryOldGreenDragon
    | VeryOldWhiteDragon
    | VeryOldBlueDragon
    | AbyssFiend
    | Thiassa
    | VeryOldRedDragon
    | AncientGreenDragon
    | AncientWhiteDragon
    | AncientBlueDragon
    | AncientRedDragon
    | Sultur
