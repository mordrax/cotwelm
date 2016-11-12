module Monster.Monster
    exposing
        ( Monster
        , MonsterType(..)
        , Size(..)
        , new
        , view
        , damageRange
        , name
        )

import Utils.Vector as Vector exposing (..)
import Utils.Lib exposing (vectorToHtmlStyle)
import Html exposing (..)
import Html.Attributes exposing (..)
import Stats exposing (..)
import Utils.IdGenerator exposing (ID)


type BaseMonster
    = A Model


type alias Monster =
    { base : BaseMonster
    , position : Vector
    , stats : Stats
    , id : ID
    }


type Size
    = Tiny
    | Small
    | Medium
    | Large
    | Giant


type alias Model =
    { level : Int
    , css : String
    , name : String
    }


name : Monster -> String
name { base } =
    let
        (A model) =
            base
    in
        model.name


damageRange : Monster -> ( Int, Int )
damageRange { base } =
    let
        (A model) =
            base
    in
        ( model.level, model.level * 4 )


view : Monster -> Html a
view { base, position } =
    let
        (A model) =
            base
    in
        div [ vectorToHtmlStyle position, class ("tile monster " ++ model.css) ] []


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


new : MonsterType -> Vector -> ID -> Monster
new monsterType pos id =
    let
        newMonster class css name hp =
            -- class: overall how dangerous monster is
            -- css: css class for drawing
            newSpellcaster class css name hp 0

        newSpellcaster class css name hp sp =
            Monster (A <| Model class css name) pos (Stats.init hp sp) id
    in
        case monsterType of
            GiantRat ->
                newMonster 1 "giantRat" "Giant Rat" 2

            Goblin ->
                newMonster 1 "goblin" "Goblin" 1

            GiantBat ->
                newMonster 2 "giantBat" "Giant Bat" 1

            Hobgoblin ->
                newMonster 2 "hobgoblin" "Hobgoblin" 1

            Kobold ->
                newMonster 2 "kobold" "Kobold" 1

            LargeSnake ->
                newMonster 3 "largeSnake" "Large Snake" 1

            Skeleton ->
                newMonster 3 "skeleton" "Skeleton" 1

            WildDog ->
                newMonster 3 "wildDog" "Wild Dog" 1

            -- Special: "Poison"
            Viper ->
                newMonster 5 "viper" "Viper" 1

            GoblinFighter ->
                newMonster 6 "goblinFighter" "Goblin Fighter" 1

            GiantRedAnt ->
                newMonster 7 "giantRedAnt" "Giant Red Ant" 1

            WalkingCorpse ->
                newMonster 7 "walkingCorpse" "Walking Corpse" 1

            -- Special: "Arrow"
            Bandit ->
                newMonster 10 "bandit" "Bandit" 1

            GiantTrapdoorSpider ->
                newMonster 10 "giantTrapdoorSpider" "Giant Trapdoor Spider" 1

            HugeLizard ->
                newMonster 10 "hugeLizard" "Huge Lizard" 1

            RatMan ->
                newMonster 10 "rat" "Rat-Man" 1

            -- Special: "IBaseune to Weapons"
            Slime ->
                newMonster 10 "slime" "Slime" 1

            -- Special: "Poison"
            GiantScorpion ->
                newMonster 11 "giantScorpion" "Giant Scorpion" 1

            GrayWolf ->
                newMonster 11 "grayWolf" "Gray Wolf" 1

            -- Special: "IBaseune to Cold, Lightning"
            GelantinousGlob ->
                newMonster 14 "gelantinousGlob" "Gelantinous Glob" 1

            -- Special: "Steals from Belt and Purse, Teleports"
            SmirkingSneakThief ->
                newMonster 15 "smirkingSneakThief" "Smirking Sneak Thief" 1

            CarrionCreeper ->
                newMonster 16 "carrionCreeper" "Carrion Creeper" 1

            HugeOgre ->
                newMonster 16 "hugeOgre" "Huge Ogre" 1

            Shadow ->
                newMonster 16 "shadow" "Shadow" 1

            AnimatedWoodenStatue ->
                newMonster 17 "animatedWoodenStatue" "Animated Wooden Statue" 1

            BrownBear ->
                newMonster 17 "brownBear" "Brown Bear" 1

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            YoungGreenDragon ->
                newMonster 18 "youngGreenDragon" "Young Green Dragon" 1

            -- Special: "IBaseune to Cold, Breathes Ice"
            YoungWhiteDragon ->
                newMonster 18 "youngWhiteDragon" "Young White Dragon" 1

            -- Special: "Needles"
            Manticore ->
                newMonster 19 "manticore" "Manticore" 1

            EerieGhost ->
                newMonster 20 "eerieGhost" "Eerie Ghost" 1

            GruesomeTroll ->
                newMonster 20 "gruesomeTroll" "Gruesome Troll" 1

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            YoungBlueDragon ->
                newMonster 20 "youngBlueDragon" "Young Blue Dragon" 1

            -- Special: "IBaseune to Fire, Breathes Fire"
            YoungRedDragon ->
                newMonster 20 "youngRedDragon" "Young Red Dragon" 1

            AnimatedBronzeStatue ->
                newMonster 25 "animatedBronzeStatue" "Animated Bronze Statue" 1

            -- Special: "Arrow"
            EvilWarrior ->
                newMonster 25 "evilWarrior" "Evil Warrior" 1

            WolfMan ->
                newMonster 25 "wolf" "Wolf-Man" 1

            CaveBear ->
                newMonster 27 "caveBear" "Cave Bear" 1

            WhiteWolf ->
                newMonster 28 "whiteWolf" "White Wolf" 1

            Berserker ->
                newMonster 30 "berserker" "Berserker" 1

            AnimatedIronStatue ->
                newMonster 35 "animatedIronStatue" "Animated Iron Statue" 1

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            TunnelWight ->
                newMonster 35 "tunnelWight" "Tunnel Wight" 1

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            YoungAdultBlueDragon ->
                newMonster 35 "youngAdultBlueDragon" "Young Adult Blue Dragon" 1

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            YoungAdultGreenDragon ->
                newMonster 35 "youngAdultGreenDragon" "Young Adult Green Dragon" 1

            -- Special: "IBaseune to Cold, Breathes Ice"
            YoungAdultWhiteDragon ->
                newMonster 35 "youngAdultWhiteDragon" "Young Adult White Dragon" 1

            -- Special: "Drains Intelligence and Mana Permanently"
            PaleWraith ->
                newMonster 37 "paleWraith" "Pale Wraith" 1

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            BarrowWight ->
                newMonster 40 "barrowWight" "Barrow Wight" 1

            BearMan ->
                newMonster 40 "bear" "Bear-Man" 1

            DustElemental ->
                newMonster 40 "dustElemental" "Dust Elemental" 1

            -- Special: "Throws Stones"
            HillGiant ->
                newMonster 40 "hillGiant" "Hill Giant" 1

            -- Special: "IBaseune to Fire, Breathes Fire"
            YoungAdultRedDragon ->
                newMonster 40 "youngAdultRedDragon" "Young Adult Red Dragon" 1

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Wizard ->
                newMonster 45 "wizard" "Wizard" 1

            BullMan ->
                newMonster 50 "bull" "Bull-Man" 1

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            CastleWight ->
                newMonster 50 "castleWight" "Castle Wight" 1

            -- Special: "Drains Intelligence and Mana Permanently"
            DarkWraith ->
                newMonster 50 "darkWraith" "Dark Wraith" 1

            IceElemental ->
                newMonster 50 "iceElemental" "Ice Elemental" 1

            Spectre ->
                newMonster 50 "spectre" "Spectre" 1

            AnimatedMarbleStatue ->
                newMonster 52 "animatedMarbleStatue" "Animated Marble Statue" 1

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            AdultBlueDragon ->
                newMonster 55 "adultBlueDragon" "Adult Blue Dragon" 1

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            AdultGreenDragon ->
                newMonster 55 "adultGreenDragon" "Adult Green Dragon" 1

            -- Special: "IBaseune to Cold, Breathes Ice"
            AdultWhiteDragon ->
                newMonster 55 "adultWhiteDragon" "Adult White Dragon" 1

            AirElemental ->
                newMonster 55 "airElemental" "Air Elemental" 1

            MagmaElemental ->
                newMonster 55 "magmaElemental" "Magma Elemental" 1

            -- Special: "Throws Stones"
            StoneGiant ->
                newMonster 55 "stoneGiant" "Stone Giant" 1

            TwoHeadedGiant ->
                newMonster 55 "twoHeadedGiant" "Two Headed Giant" 1

            -- Special: "IBaseune to Fire, Breathes Fire"
            AdultRedDragon ->
                newMonster 60 "adultRedDragon" "Adult Red Dragon" 1

            FireElemental ->
                newMonster 60 "fireElemental" "Fire Elemental" 1

            -- Special: "Throws Iceballs"
            FrostGiant ->
                newMonster 60 "frostGiant" "Frost Giant" 1

            -- Special: "SuBaseons Spiked Devil"
            SpikedDevil ->
                newMonster 60 "spikedDevil" "Spiked Devil" 1

            WaterElemental ->
                newMonster 60 "waterElemental" "Water Elemental" 1

            EarthElemental ->
                newMonster 65 "earthElemental" "Earth Elemental" 1

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Necromancer ->
                newMonster 65 "necromancer" "Necromancer" 1

            -- Special: "Drains HP Permanently"
            Vampire ->
                newMonster 65 "vampire" "Vampire" 1

            -- Special: "Drains Intelligence and Mana Permanently"
            AbyssWraith ->
                newMonster 70 "abyssWraith" "Abyss Wraith" 1

            -- Special: "Throws Boulders"
            Utgardhalok ->
                newMonster 70 "utgardhalok" "Utgardhalok" 1

            -- Special: "Throws Stones"
            FireGiant ->
                newMonster 75 "fireGiant" "Fire Giant" 1

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            OldBlueDragon ->
                newMonster 75 "oldBlueDragon" "Old Blue Dragon" 1

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            OldGreenDragon ->
                newMonster 75 "oldGreenDragon" "Old Green Dragon" 1

            -- Special: "IBaseune to Cold, Breathes Ice"
            OldWhiteDragon ->
                newMonster 75 "oldWhiteDragon" "Old White Dragon" 1

            -- Special: "SuBaseons Horned Devil"
            HornedDevil ->
                newMonster 80 "hornedDevil" "Horned Devil" 1

            -- Special: "IBaseune to Fire, Breathes Fire"
            OldRedDragon ->
                newMonster 80 "oldRedDragon" "Old Red Dragon" 1

            -- Special: "Throws stones"
            Rungnir ->
                newMonster 80 "rungnir" "Rungnir" 1

            -- Special: "SuBaseons Ice Devil"
            IceDevil ->
                newMonster 85 "iceDevil" "Ice Devil" 1

            -- Special: "Throws Iceballs"
            Thrym ->
                newMonster 90 "thrym" "Thrym" 1

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            VeryOldGreenDragon ->
                newMonster 90 "veryOldGreenDragon" "Very Old Green Dragon" 1

            -- Special: "IBaseune to Cold, Breathes Ice"
            VeryOldWhiteDragon ->
                newMonster 90 "veryOldWhiteDragon" "Very Old White Dragon" 1

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            VeryOldBlueDragon ->
                newMonster 95 "veryOldBlueDragon" "Very Old Blue Dragon" 1

            -- Special: "SuBaseons Spiked Devil or Abyss Fiend"
            AbyssFiend ->
                newMonster 100 "abyssFiend" "Abyss Fiend" 1

            -- Special: "Throws Stones"
            Thiassa ->
                newMonster 100 "thiassa" "Thiassa" 1

            -- Special: "IBaseune to Fire, Breathes Fire"
            VeryOldRedDragon ->
                newMonster 100 "veryOldRedDragon" "Very Old Red Dragon" 1

            -- Special: "IBaseune to Poison, Breathes Poison Gas"
            AncientGreenDragon ->
                newMonster 105 "ancientGreenDragon" "Ancient Green Dragon" 1

            -- Special: "IBaseune to Cold, Breathes Ice"
            AncientWhiteDragon ->
                newMonster 105 "ancientWhiteDragon" "Ancient White Dragon" 1

            -- Special: "IBaseune to Lightning, Breathes Lightning"
            AncientBlueDragon ->
                newMonster 110 "ancientBlueDragon" "Ancient Blue Dragon" 1

            -- Special: "IBaseune to Fire, Breathes Fire"
            AncientRedDragon ->
                newMonster 120 "ancientRedDragon" "Ancient Red Dragon" 1

            -- Special: "Casts Fire, Lighting, and Wind Spells"
            Sultur ->
                newMonster 344 "sultur" "Sultur" 1
