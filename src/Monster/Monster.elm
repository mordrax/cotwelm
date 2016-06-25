module Monster.Monster exposing (..)


type Monster
    = MM Model


type alias Model =
    { name : String
    , level : Int
    , css : String
    }


type MonsterType
    = MaleHero
    | FemaleHero
    | Kobold
    | GiantRat
    | LargeSnake
    | GiantAnt
    | WildDog
    | Skeleton
    | GiantTrapdoorSpider
    | GiantBat
    | CarrionCreeper
    | GiantScorpion
    | GreenSlime
    | Viper
    | Ogre
    | WalkingCorpse
    | HugeLizard
    | Goblin
    | Hobgoblin
    | Spectre
    | Thief
    | Wolf
    | DireWolf
    | BrownBear
    | CaveBear
    | GelatinousGlob
    | Troll
    | Manticore
    | BronzeGolem
    | IronGolem
    | DiamondGolem
    | WoodenGolem
    | Bandit
    | Warrior
    | Wizard
    | Necromancer
    | Wight
    | Wraith
    | Ghost
    | Shadow
    | Vampire
    | IceDevil
    | RatMan
    | WolfMan
    | BearMan
    | BullMan
    | SpikedDevil
    | HornedDevil
    | AbyssFiend
    | WindElemental
    | DustElemental
    | FireElemental
    | WaterElemental
    | MagmaElemental
    | IceElemental
    | EarthElemental
    | HillGiant
    | TwoHeadGiant
    | FrostGiant
    | StoneGiant
    | FireGiant
    | Surtur
    | FireGiantKing
    | FrostGiantKing
    | HillGiantKing
    | StoneGiantKing
    | RedDragon
    | BlueDragon
    | WhiteDragon
    | GreenDragon


new : MonsterType -> Monster
new monsterType =
    case monsterType of
        MaleHero ->
            MM (Model "Male Hero" 0 "maleHero")

        FemaleHero ->
            MM (Model "Female Hero" 0 "femaleHero")

        Kobold ->
            MM (Model "Kobold" 2 "kobold")

        GiantRat ->
            MM (Model "Giant Rat" 1 "giantRat")

        LargeSnake ->
            MM (Model "Large Snake" 3 "largeSnake")

        GiantAnt ->
            MM (Model "Giant Ant" 7 "giantAnt")

        WildDog ->
            MM (Model "Wild Dog" 3 "wildDog")

        Skeleton ->
            MM (Model "Skeleton" 3 "skeleton")

        GiantTrapdoorSpider ->
            MM (Model "Giant Trapdoor Spider" 10 "giantTrapdoorSpider")

        GiantBat ->
            MM (Model "Giant Bat" 2 "giantBat")

        CarrionCreeper ->
            MM (Model "Carrion Creeper" 16 "carrionCreeper")

        GiantScorpion ->
            MM (Model "Giant Scorpion" 11 "giantScorpion")

        GreenSlime ->
            MM (Model "Slime" 10 "greenSlime")

        Viper ->
            MM (Model "Viper" 5 "viper")

        Ogre ->
            MM (Model "Huge Ogre" 16 "ogre")

        WalkingCorpse ->
            MM (Model "Walking Corpse" 7 "walkingCorpse")

        HugeLizard ->
            MM (Model "Huge Lizard" 10 "hugeLizard")

        Goblin ->
            MM (Model "Goblin" 1 "goblin")

        Hobgoblin ->
            MM (Model "Hobgoblin" 2 "hobgoblin")

        Spectre ->
            MM (Model "Spectre" 50 "spectre")

        Thief ->
            MM (Model "Smirking Sneak Thief" 15 "thief")

        Wolf ->
            MM (Model "White Wolf" 28 "wolf")

        DireWolf ->
            MM (Model "Gray Wolf" 11 "direWolf")

        BrownBear ->
            MM (Model "Brown Bear" 17 "brownBear")

        CaveBear ->
            MM (Model "Cave Bear" 27 "caveBear")

        GelatinousGlob ->
            MM (Model "Gelatinous Glob" 14 "gelatinousGlob")

        Troll ->
            MM (Model "Gruesome Troll" 20 "troll")

        Manticore ->
            MM (Model "Manticore" 19 "manticore")

        BronzeGolem ->
            MM (Model "Animated Bronze Statue" 25 "bronzeGolem")

        IronGolem ->
            MM (Model "Animated Iron Statue" 35 "ironGolem")

        DiamondGolem ->
            MM (Model "Animated Marble Statue" 52 "diamondGolem")

        WoodenGolem ->
            MM (Model "Animated Wooden Statue" 17 "woodenGolem")

        Bandit ->
            MM (Model "Bandit" "bandit")

        Warrior ->
            MM (Model "Warrior" "warrior")

        Wizard ->
            MM (Model "Wizard" "wizard")

        Necromancer ->
            MM (Model "Necromancer" "necromancer")

        Wight ->
            MM (Model "Wight" "wight")

        Wraith ->
            MM (Model "Wraith" "wraith")

        Ghost ->
            MM (Model "Ghost" "ghost")

        Shadow ->
            MM (Model "Shadow" "shadow")

        Vampire ->
            MM (Model "Vampire" "vampire")

        IceDevil ->
            MM (Model "Ice Devil" "iceDevil")

        RatMan ->
            MM (Model "Rat Man" "ratMan")

        WolfMan ->
            MM (Model "Wolf Man" "wolfMan")

        BearMan ->
            MM (Model "Bear Man" "bearMan")

        BullMan ->
            MM (Model "Bull Man" "bullMan")

        SpikedDevil ->
            MM (Model "Spiked Devil" "spikedDevil")

        HornedDevil ->
            MM (Model "Horned Devil" "hornedDevil")

        AbyssFiend ->
            MM (Model "Abyss Fiend" "abyssFiend")

        WindElemental ->
            MM (Model "Wind Elemental" "windElemental")

        DustElemental ->
            MM (Model "Dust Elemental" "dustElemental")

        FireElemental ->
            MM (Model "Fire Elemental" "fireElemental")

        WaterElemental ->
            MM (Model "Water Elemental" "waterElemental")

        MagmaElemental ->
            MM (Model "Magma Elemental" "magmaElemental")

        IceElemental ->
            MM (Model "Ice Elemental" "iceElemental")

        EarthElemental ->
            MM (Model "Earth Elemental" "earthElemental")

        HillGiant ->
            MM (Model "Hill Giant" "hillGiant")

        TwoHeadGiant ->
            MM (Model "Two Head Giant" "twoHeadGiant")

        FrostGiant ->
            MM (Model "Frost Giant" "frostGiant")

        StoneGiant ->
            MM (Model "Stone Giant" "stoneGiant")

        FireGiant ->
            MM (Model "Fire Giant" "fireGiant")

        Surtur ->
            MM (Model "Surtur" "surtur")

        FireGiantKing ->
            MM (Model "Fire Giant King" "fireGiantKing")

        FrostGiantKing ->
            MM (Model "Frost Giant King" "frostGiantKing")

        HillGiantKing ->
            MM (Model "Hill Giant King" "hillGiantKing")

        StoneGiantKing ->
            MM (Model "Stone Giant King" "stoneGiantKing")

        RedDragon ->
            MM (Model "Red Dragon" "redDragon")

        BlueDragon ->
            MM (Model "Blue Dragon" "blueDragon")

        WhiteDragon ->
            MM (Model "White Dragon" "whiteDragon")

        GreenDragon ->
            MM (Model "Green Dragon" "greenDragon")
