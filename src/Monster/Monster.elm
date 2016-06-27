module Monster.Monster
    exposing
        ( Monster
        , MonsterType
        , new
        , view
        )

import Utils.Vector exposing (..)
import Utils.Lib exposing (vectorToHtmlStyle)
import Html exposing (..)
import Html.Attributes exposing (..)


type Monster
    = MM Model


type alias Model =
    { level : Int
    , css : String
    , name : String
    , pos : Vector
    }


view : Monster -> Html a
view (MM monster) =
    div [ vectorToHtmlStyle monster.pos, class ("tile monster " ++ monster.css) ] []


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


new : MonsterType -> Vector -> Monster
new monsterType pos =
    case monsterType of
        GiantRat ->
            MM (Model 1 "giantRat" "Giant Rat" pos)

        -- Special: " "
        Goblin ->
            MM (Model 1 "goblin" "Goblin" pos)

        -- Special: " "
        GiantBat ->
            MM (Model 2 "giantBat" "Giant Bat" pos)

        -- Special: " "
        Hobgoblin ->
            MM (Model 2 "hobgoblin" "Hobgoblin" pos)

        -- Special: " "
        Kobold ->
            MM (Model 2 "kobold" "Kobold" pos)

        -- Special: " "
        LargeSnake ->
            MM (Model 3 "largeSnake" "Large Snake" pos)

        -- Special: " "
        Skeleton ->
            MM (Model 3 "skeleton" "Skeleton" pos)

        -- Special: " "
        WildDog ->
            MM (Model 3 "wildDog" "Wild Dog" pos)

        -- Special: " "
        Viper ->
            MM (Model 5 "viper" "Viper" pos)

        -- Special: "Poison"
        GoblinFighter ->
            MM (Model 6 "goblinFighter" "Goblin Fighter" pos)

        -- Special: " "
        GiantRedAnt ->
            MM (Model 7 "giantRedAnt" "Giant Red Ant" pos)

        -- Special: " "
        WalkingCorpse ->
            MM (Model 7 "walkingCorpse" "Walking Corpse" pos)

        -- Special: " "
        Bandit ->
            MM (Model 10 "bandit" "Bandit" pos)

        -- Special: "Arrow"
        GiantTrapdoorSpider ->
            MM (Model 10 "giantTrapdoorSpider" "Giant Trapdoor Spider" pos)

        -- Special: " "
        HugeLizard ->
            MM (Model 10 "hugeLizard" "Huge Lizard" pos)

        -- Special: " "
        RatMan ->
            MM (Model 10 "rat" "Rat-Man" pos)

        -- Special: " "
        Slime ->
            MM (Model 10 "slime" "Slime" pos)

        -- Special: "Immune to Weapons"
        GiantScorpion ->
            MM (Model 11 "giantScorpion" "Giant Scorpion" pos)

        -- Special: "Poison"
        GrayWolf ->
            MM (Model 11 "grayWolf" "Gray Wolf" pos)

        -- Special: " "
        GelantinousGlob ->
            MM (Model 14 "gelantinousGlob" "Gelantinous Glob" pos)

        -- Special: "Immune to Cold, Lightning"
        SmirkingSneakThief ->
            MM (Model 15 "smirkingSneakThief" "Smirking Sneak Thief" pos)

        -- Special: "Steals from Belt and Purse, Teleports"
        CarrionCreeper ->
            MM (Model 16 "carrionCreeper" "Carrion Creeper" pos)

        -- Special: " "
        HugeOgre ->
            MM (Model 16 "hugeOgre" "Huge Ogre" pos)

        -- Special: " "
        Shadow ->
            MM (Model 16 "shadow" "Shadow" pos)

        -- Special: " "
        AnimatedWoodenStatue ->
            MM (Model 17 "animatedWoodenStatue" "Animated Wooden Statue" pos)

        -- Special: " "
        BrownBear ->
            MM (Model 17 "brownBear" "Brown Bear" pos)

        -- Special: " "
        YoungGreenDragon ->
            MM (Model 18 "youngGreenDragon" "Young Green Dragon" pos)

        -- Special: "Immune to Poison, Breathes Poison Gas"
        YoungWhiteDragon ->
            MM (Model 18 "youngWhiteDragon" "Young White Dragon" pos)

        -- Special: "Immune to Cold, Breathes Ice"
        Manticore ->
            MM (Model 19 "manticore" "Manticore" pos)

        -- Special: "Needles"
        EerieGhost ->
            MM (Model 20 "eerieGhost" "Eerie Ghost" pos)

        -- Special: " "
        GruesomeTroll ->
            MM (Model 20 "gruesomeTroll" "Gruesome Troll" pos)

        -- Special: " "
        YoungBlueDragon ->
            MM (Model 20 "youngBlueDragon" "Young Blue Dragon" pos)

        -- Special: "Immune to Lightning, Breathes Lightning"
        YoungRedDragon ->
            MM (Model 20 "youngRedDragon" "Young Red Dragon" pos)

        -- Special: "Immune to Fire, Breathes Fire"
        AnimatedBronzeStatue ->
            MM (Model 25 "animatedBronzeStatue" "Animated Bronze Statue" pos)

        -- Special: " "
        EvilWarrior ->
            MM (Model 25 "evilWarrior" "Evil Warrior" pos)

        -- Special: "Arrow"
        WolfMan ->
            MM (Model 25 "wolf" "Wolf-Man" pos)

        -- Special: " "
        CaveBear ->
            MM (Model 27 "caveBear" "Cave Bear" pos)

        -- Special: " "
        WhiteWolf ->
            MM (Model 28 "whiteWolf" "White Wolf" pos)

        -- Special: " "
        Berserker ->
            MM (Model 30 "berserker" "Berserker" pos)

        -- Special: " "
        AnimatedIronStatue ->
            MM (Model 35 "animatedIronStatue" "Animated Iron Statue" pos)

        -- Special: " "
        TunnelWight ->
            MM (Model 35 "tunnelWight" "Tunnel Wight" pos)

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        YoungAdultBlueDragon ->
            MM (Model 35 "youngAdultBlueDragon" "Young Adult Blue Dragon" pos)

        -- Special: "Immune to Lightning, Breathes Lightning"
        YoungAdultGreenDragon ->
            MM (Model 35 "youngAdultGreenDragon" "Young Adult Green Dragon" pos)

        -- Special: "Immune to Poison, Breathes Poison Gas"
        YoungAdultWhiteDragon ->
            MM (Model 35 "youngAdultWhiteDragon" "Young Adult White Dragon" pos)

        -- Special: "Immune to Cold, Breathes Ice"
        PaleWraith ->
            MM (Model 37 "paleWraith" "Pale Wraith" pos)

        -- Special: "Drains Intelligence and Mana Permanently"
        BarrowWight ->
            MM (Model 40 "barrowWight" "Barrow Wight" pos)

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        BearMan ->
            MM (Model 40 "bear" "Bear-Man" pos)

        -- Special: " "
        DustElemental ->
            MM (Model 40 "dustElemental" "Dust Elemental" pos)

        -- Special: " "
        HillGiant ->
            MM (Model 40 "hillGiant" "Hill Giant" pos)

        -- Special: "Throws Stones"
        YoungAdultRedDragon ->
            MM (Model 40 "youngAdultRedDragon" "Young Adult Red Dragon" pos)

        -- Special: "Immune to Fire, Breathes Fire"
        Wizard ->
            MM (Model 45 "wizard" "Wizard" pos)

        -- Special: "Casts Bolt Spells, Slow, Summon Monster, Phase Door, Teleport"
        BullMan ->
            MM (Model 50 "bull" "Bull-Man" pos)

        -- Special: " "
        CastleWight ->
            MM (Model 50 "castleWight" "Castle Wight" pos)

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        DarkWraith ->
            MM (Model 50 "darkWraith" "Dark Wraith" pos)

        -- Special: "Drains Intelligence and Mana Permanently"
        IceElemental ->
            MM (Model 50 "iceElemental" "Ice Elemental" pos)

        -- Special: " "
        Spectre ->
            MM (Model 50 "spectre" "Spectre" pos)

        -- Special: " "
        AnimatedMarbleStatue ->
            MM (Model 52 "animatedMarbleStatue" "Animated Marble Statue" pos)

        -- Special: " "
        AdultBlueDragon ->
            MM (Model 55 "adultBlueDragon" "Adult Blue Dragon" pos)

        -- Special: "Immune to Lightning, Breathes Lightning"
        AdultGreenDragon ->
            MM (Model 55 "adultGreenDragon" "Adult Green Dragon" pos)

        -- Special: "Immune to Poison, Breathes Poison Gas"
        AdultWhiteDragon ->
            MM (Model 55 "adultWhiteDragon" "Adult White Dragon" pos)

        -- Special: "Immune to Cold, Breathes Ice"
        AirElemental ->
            MM (Model 55 "airElemental" "Air Elemental" pos)

        -- Special: " "
        MagmaElemental ->
            MM (Model 55 "magmaElemental" "Magma Elemental" pos)

        -- Special: " "
        StoneGiant ->
            MM (Model 55 "stoneGiant" "Stone Giant" pos)

        -- Special: "Throws Stones"
        TwoHeadedGiant ->
            MM (Model 55 "twoHeadedGiant" "Two Headed Giant" pos)

        -- Special: " "
        AdultRedDragon ->
            MM (Model 60 "adultRedDragon" "Adult Red Dragon" pos)

        -- Special: "Immune to Fire, Breathes Fire"
        FireElemental ->
            MM (Model 60 "fireElemental" "Fire Elemental" pos)

        -- Special: " "
        FrostGiant ->
            MM (Model 60 "frostGiant" "Frost Giant" pos)

        -- Special: "Throws Iceballs"
        SpikedDevil ->
            MM (Model 60 "spikedDevil" "Spiked Devil" pos)

        -- Special: "Summons Spiked Devil"
        WaterElemental ->
            MM (Model 60 "waterElemental" "Water Elemental" pos)

        -- Special: " "
        EarthElemental ->
            MM (Model 65 "earthElemental" "Earth Elemental" pos)

        -- Special: " "
        Necromancer ->
            MM (Model 65 "necromancer" "Necromancer" pos)

        -- Special: "Casts Bolt Spells, Slow, Summon Monster, Phase Door, Teleport"
        Vampire ->
            MM (Model 65 "vampire" "Vampire" pos)

        -- Special: "Drains HP Permanently"
        AbyssWraith ->
            MM (Model 70 "abyssWraith" "Abyss Wraith" pos)

        -- Special: "Drains Intelligence and Mana Permanently"
        Utgardhalok ->
            MM (Model 70 "utgardhalok" "Utgardhalok" pos)

        -- Special: "Throws Boulders"
        FireGiant ->
            MM (Model 75 "fireGiant" "Fire Giant" pos)

        -- Special: "Throws Stones"
        OldBlueDragon ->
            MM (Model 75 "oldBlueDragon" "Old Blue Dragon" pos)

        -- Special: "Immune to Lightning, Breathes Lightning"
        OldGreenDragon ->
            MM (Model 75 "oldGreenDragon" "Old Green Dragon" pos)

        -- Special: "Immune to Poison, Breathes Poison Gas"
        OldWhiteDragon ->
            MM (Model 75 "oldWhiteDragon" "Old White Dragon" pos)

        -- Special: "Immune to Cold, Breathes Ice"
        HornedDevil ->
            MM (Model 80 "hornedDevil" "Horned Devil" pos)

        -- Special: "Summons Horned Devil"
        OldRedDragon ->
            MM (Model 80 "oldRedDragon" "Old Red Dragon" pos)

        -- Special: "Immune to Fire, Breathes Fire"
        Rungnir ->
            MM (Model 80 "rungnir" "Rungnir" pos)

        -- Special: "Throws stones"
        IceDevil ->
            MM (Model 85 "iceDevil" "Ice Devil" pos)

        -- Special: "Summons Ice Devil"
        Thrym ->
            MM (Model 90 "thrym" "Thrym" pos)

        -- Special: "Throws Iceballs"
        VeryOldGreenDragon ->
            MM (Model 90 "veryOldGreenDragon" "Very Old Green Dragon" pos)

        -- Special: "Immune to Poison, Breathes Poison Gas"
        VeryOldWhiteDragon ->
            MM (Model 90 "veryOldWhiteDragon" "Very Old White Dragon" pos)

        -- Special: "Immune to Cold, Breathes Ice"
        VeryOldBlueDragon ->
            MM (Model 95 "veryOldBlueDragon" "Very Old Blue Dragon" pos)

        -- Special: "Immune to Lightning, Breathes Lightning"
        AbyssFiend ->
            MM (Model 100 "abyssFiend" "Abyss Fiend" pos)

        -- Special: "Summons Spiked Devil or Abyss Fiend"
        Thiassa ->
            MM (Model 100 "thiassa" "Thiassa" pos)

        -- Special: "Throws Stones"
        VeryOldRedDragon ->
            MM (Model 100 "veryOldRedDragon" "Very Old Red Dragon" pos)

        -- Special: "Immune to Fire, Breathes Fire"
        AncientGreenDragon ->
            MM (Model 105 "ancientGreenDragon" "Ancient Green Dragon" pos)

        -- Special: "Immune to Poison, Breathes Poison Gas"
        AncientWhiteDragon ->
            MM (Model 105 "ancientWhiteDragon" "AncientWhite Dragon" pos)

        -- Special: "Immune to Cold, Breathes Ice"
        AncientBlueDragon ->
            MM (Model 110 "ancientBlueDragon" "Ancient Blue Dragon" pos)

        -- Special: "Immune to Lightning, Breathes Lightning"
        AncientRedDragon ->
            MM (Model 120 "ancientRedDragon" "Ancient Red Dragon" pos)

        -- Special: "Immune to Fire, Breathes Fire"
        Sultur ->
            MM (Model 344 "sultur" "Sultur" pos)



-- Special: "Casts Fire, Lighting, and Wind Spells"
