module Monster.Monster exposing (..)


type Monster
    = MM Model


type alias Model =
    { level : Int
    , css : String
    , name : String
    }


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


new : MonsterType -> Monster
new monsterType =
    case monsterType of
        GiantRat ->
            MM (Model 1 "giantRat" "Giant Rat")

        -- Special: " "
        Goblin ->
            MM (Model 1 "goblin" "Goblin")

        -- Special: " "
        GiantBat ->
            MM (Model 2 "giantBat" "Giant Bat")

        -- Special: " "
        Hobgoblin ->
            MM (Model 2 "hobgoblin" "Hobgoblin")

        -- Special: " "
        Kobold ->
            MM (Model 2 "kobold" "Kobold")

        -- Special: " "
        LargeSnake ->
            MM (Model 3 "largeSnake" "Large Snake")

        -- Special: " "
        Skeleton ->
            MM (Model 3 "skeleton" "Skeleton")

        -- Special: " "
        WildDog ->
            MM (Model 3 "wildDog" "Wild Dog")

        -- Special: " "
        Viper ->
            MM (Model 5 "viper" "Viper")

        -- Special: "Poison"
        GoblinFighter ->
            MM (Model 6 "goblinFighter" "Goblin Fighter")

        -- Special: " "
        GiantRedAnt ->
            MM (Model 7 "giantRedAnt" "Giant Red Ant")

        -- Special: " "
        WalkingCorpse ->
            MM (Model 7 "walkingCorpse" "Walking Corpse")

        -- Special: " "
        Bandit ->
            MM (Model 10 "bandit" "Bandit")

        -- Special: "Arrow"
        GiantTrapdoorSpider ->
            MM (Model 10 "giantTrapdoorSpider" "Giant Trapdoor Spider")

        -- Special: " "
        HugeLizard ->
            MM (Model 10 "hugeLizard" "Huge Lizard")

        -- Special: " "
        RatMan ->
            MM (Model 10 "rat" "Rat-Man")

        -- Special: " "
        Slime ->
            MM (Model 10 "slime" "Slime")

        -- Special: "Immune to Weapons"
        GiantScorpion ->
            MM (Model 11 "giantScorpion" "Giant Scorpion")

        -- Special: "Poison"
        GrayWolf ->
            MM (Model 11 "grayWolf" "Gray Wolf")

        -- Special: " "
        GelantinousGlob ->
            MM (Model 14 "gelantinousGlob" "Gelantinous Glob")

        -- Special: "Immune to Cold, Lightning"
        SmirkingSneakThief ->
            MM (Model 15 "smirkingSneakThief" "Smirking Sneak Thief")

        -- Special: "Steals from Belt and Purse, Teleports"
        CarrionCreeper ->
            MM (Model 16 "carrionCreeper" "Carrion Creeper")

        -- Special: " "
        HugeOgre ->
            MM (Model 16 "hugeOgre" "Huge Ogre")

        -- Special: " "
        Shadow ->
            MM (Model 16 "shadow" "Shadow")

        -- Special: " "
        AnimatedWoodenStatue ->
            MM (Model 17 "animatedWoodenStatue" "Animated Wooden Statue")

        -- Special: " "
        BrownBear ->
            MM (Model 17 "brownBear" "Brown Bear")

        -- Special: " "
        YoungGreenDragon ->
            MM (Model 18 "youngGreenDragon" "Young Green Dragon")

        -- Special: "Immune to Poison, Breathes Poison Gas"
        YoungWhiteDragon ->
            MM (Model 18 "youngWhiteDragon" "Young White Dragon")

        -- Special: "Immune to Cold, Breathes Ice"
        Manticore ->
            MM (Model 19 "manticore" "Manticore")

        -- Special: "Needles"
        EerieGhost ->
            MM (Model 20 "eerieGhost" "Eerie Ghost")

        -- Special: " "
        GruesomeTroll ->
            MM (Model 20 "gruesomeTroll" "Gruesome Troll")

        -- Special: " "
        YoungBlueDragon ->
            MM (Model 20 "youngBlueDragon" "Young Blue Dragon")

        -- Special: "Immune to Lightning, Breathes Lightning"
        YoungRedDragon ->
            MM (Model 20 "youngRedDragon" "Young Red Dragon")

        -- Special: "Immune to Fire, Breathes Fire"
        AnimatedBronzeStatue ->
            MM (Model 25 "animatedBronzeStatue" "Animated Bronze Statue")

        -- Special: " "
        EvilWarrior ->
            MM (Model 25 "evilWarrior" "Evil Warrior")

        -- Special: "Arrow"
        WolfMan ->
            MM (Model 25 "wolf" "Wolf-Man")

        -- Special: " "
        CaveBear ->
            MM (Model 27 "caveBear" "Cave Bear")

        -- Special: " "
        WhiteWolf ->
            MM (Model 28 "whiteWolf" "White Wolf")

        -- Special: " "
        Berserker ->
            MM (Model 30 "berserker" "Berserker")

        -- Special: " "
        AnimatedIronStatue ->
            MM (Model 35 "animatedIronStatue" "Animated Iron Statue")

        -- Special: " "
        TunnelWight ->
            MM (Model 35 "tunnelWight" "Tunnel Wight")

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        YoungAdultBlueDragon ->
            MM (Model 35 "youngAdultBlueDragon" "Young Adult Blue Dragon")

        -- Special: "Immune to Lightning, Breathes Lightning"
        YoungAdultGreenDragon ->
            MM (Model 35 "youngAdultGreenDragon" "Young Adult Green Dragon")

        -- Special: "Immune to Poison, Breathes Poison Gas"
        YoungAdultWhiteDragon ->
            MM (Model 35 "youngAdultWhiteDragon" "Young Adult White Dragon")

        -- Special: "Immune to Cold, Breathes Ice"
        PaleWraith ->
            MM (Model 37 "paleWraith" "Pale Wraith")

        -- Special: "Drains Intelligence and Mana Permanently"
        BarrowWight ->
            MM (Model 40 "barrowWight" "Barrow Wight")

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        BearMan ->
            MM (Model 40 "bear" "Bear-Man")

        -- Special: " "
        DustElemental ->
            MM (Model 40 "dustElemental" "Dust Elemental")

        -- Special: " "
        HillGiant ->
            MM (Model 40 "hillGiant" "Hill Giant")

        -- Special: "Throws Stones"
        YoungAdultRedDragon ->
            MM (Model 40 "youngAdultRedDragon" "Young Adult Red Dragon")

        -- Special: "Immune to Fire, Breathes Fire"
        Wizard ->
            MM (Model 45 "wizard" "Wizard")

        -- Special: "Casts Bolt Spells, Slow, Summon Monster, Phase Door, Teleport"
        BullMan ->
            MM (Model 50 "bull" "Bull-Man")

        -- Special: " "
        CastleWight ->
            MM (Model 50 "castleWight" "Castle Wight")

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        DarkWraith ->
            MM (Model 50 "darkWraith" "Dark Wraith")

        -- Special: "Drains Intelligence and Mana Permanently"
        IceElemental ->
            MM (Model 50 "iceElemental" "Ice Elemental")

        -- Special: " "
        Spectre ->
            MM (Model 50 "spectre" "Spectre")

        -- Special: " "
        AnimatedMarbleStatue ->
            MM (Model 52 "animatedMarbleStatue" "Animated Marble Statue")

        -- Special: " "
        AdultBlueDragon ->
            MM (Model 55 "adultBlueDragon" "Adult Blue Dragon")

        -- Special: "Immune to Lightning, Breathes Lightning"
        AdultGreenDragon ->
            MM (Model 55 "adultGreenDragon" "Adult Green Dragon")

        -- Special: "Immune to Poison, Breathes Poison Gas"
        AdultWhiteDragon ->
            MM (Model 55 "adultWhiteDragon" "Adult White Dragon")

        -- Special: "Immune to Cold, Breathes Ice"
        AirElemental ->
            MM (Model 55 "airElemental" "Air Elemental")

        -- Special: " "
        MagmaElemental ->
            MM (Model 55 "magmaElemental" "Magma Elemental")

        -- Special: " "
        StoneGiant ->
            MM (Model 55 "stoneGiant" "Stone Giant")

        -- Special: "Throws Stones"
        TwoHeadedGiant ->
            MM (Model 55 "twoHeadedGiant" "Two Headed Giant")

        -- Special: " "
        AdultRedDragon ->
            MM (Model 60 "adultRedDragon" "Adult Red Dragon")

        -- Special: "Immune to Fire, Breathes Fire"
        FireElemental ->
            MM (Model 60 "fireElemental" "Fire Elemental")

        -- Special: " "
        FrostGiant ->
            MM (Model 60 "frostGiant" "Frost Giant")

        -- Special: "Throws Iceballs"
        SpikedDevil ->
            MM (Model 60 "spikedDevil" "Spiked Devil")

        -- Special: "Summons Spiked Devil"
        WaterElemental ->
            MM (Model 60 "waterElemental" "Water Elemental")

        -- Special: " "
        EarthElemental ->
            MM (Model 65 "earthElemental" "Earth Elemental")

        -- Special: " "
        Necromancer ->
            MM (Model 65 "necromancer" "Necromancer")

        -- Special: "Casts Bolt Spells, Slow, Summon Monster, Phase Door, Teleport"
        Vampire ->
            MM (Model 65 "vampire" "Vampire")

        -- Special: "Drains HP Permanently"
        AbyssWraith ->
            MM (Model 70 "abyssWraith" "Abyss Wraith")

        -- Special: "Drains Intelligence and Mana Permanently"
        Utgardhalok ->
            MM (Model 70 "utgardhalok" "Utgardhalok")

        -- Special: "Throws Boulders"
        FireGiant ->
            MM (Model 75 "fireGiant" "Fire Giant")

        -- Special: "Throws Stones"
        OldBlueDragon ->
            MM (Model 75 "oldBlueDragon" "Old Blue Dragon")

        -- Special: "Immune to Lightning, Breathes Lightning"
        OldGreenDragon ->
            MM (Model 75 "oldGreenDragon" "Old Green Dragon")

        -- Special: "Immune to Poison, Breathes Poison Gas"
        OldWhiteDragon ->
            MM (Model 75 "oldWhiteDragon" "Old White Dragon")

        -- Special: "Immune to Cold, Breathes Ice"
        HornedDevil ->
            MM (Model 80 "hornedDevil" "Horned Devil")

        -- Special: "Summons Horned Devil"
        OldRedDragon ->
            MM (Model 80 "oldRedDragon" "Old Red Dragon")

        -- Special: "Immune to Fire, Breathes Fire"
        Rungnir ->
            MM (Model 80 "rungnir" "Rungnir")

        -- Special: "Throws stones"
        IceDevil ->
            MM (Model 85 "iceDevil" "Ice Devil")

        -- Special: "Summons Ice Devil"
        Thrym ->
            MM (Model 90 "thrym" "Thrym")

        -- Special: "Throws Iceballs"
        VeryOldGreenDragon ->
            MM (Model 90 "veryOldGreenDragon" "Very Old Green Dragon")

        -- Special: "Immune to Poison, Breathes Poison Gas"
        VeryOldWhiteDragon ->
            MM (Model 90 "veryOldWhiteDragon" "Very Old White Dragon")

        -- Special: "Immune to Cold, Breathes Ice"
        VeryOldBlueDragon ->
            MM (Model 95 "veryOldBlueDragon" "Very Old Blue Dragon")

        -- Special: "Immune to Lightning, Breathes Lightning"
        AbyssFiend ->
            MM (Model 100 "abyssFiend" "Abyss Fiend")

        -- Special: "Summons Spiked Devil or Abyss Fiend"
        Thiassa ->
            MM (Model 100 "thiassa" "Thiassa")

        -- Special: "Throws Stones"
        VeryOldRedDragon ->
            MM (Model 100 "veryOldRedDragon" "Very Old Red Dragon")

        -- Special: "Immune to Fire, Breathes Fire"
        AncientGreenDragon ->
            MM (Model 105 "ancientGreenDragon" "Ancient Green Dragon")

        -- Special: "Immune to Poison, Breathes Poison Gas"
        AncientWhiteDragon ->
            MM (Model 105 "ancientWhiteDragon" "AncientWhite Dragon")

        -- Special: "Immune to Cold, Breathes Ice"
        AncientBlueDragon ->
            MM (Model 110 "ancientBlueDragon" "Ancient Blue Dragon")

        -- Special: "Immune to Lightning, Breathes Lightning"
        AncientRedDragon ->
            MM (Model 120 "ancientRedDragon" "Ancient Red Dragon")

        -- Special: "Immune to Fire, Breathes Fire"
        Sultur ->
            MM (Model 344 "sultur" "Sultur")



-- Special: "Casts Fire, Lighting, and Wind Spells"
