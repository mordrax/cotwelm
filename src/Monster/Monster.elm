module Monster.Monster
    exposing
        ( Monster
        , MonsterType(..)
        , new
        , view
        )

import Utils.Vector as Vector exposing (..)
import Utils.Lib exposing (vectorToHtmlStyle)
import Html exposing (..)
import Html.Attributes exposing (..)


type BaseMonster
    = Base Model


type alias Monster =
    { base : BaseMonster
    , position : Vector
    }


type alias Model =
    { level : Int
    , css : String
    , name : String
    }


view : Monster -> Html a
view { base, position } =
    let
        (Base model) =
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


new : MonsterType -> Vector -> Monster
new monsterType pos =
    case monsterType of
        GiantRat ->
            Monster (Base <| Model 1 "giantRat" "Giant Rat") pos

        -- Special: " "
        Goblin ->
            Monster (Base <| Model 1 "goblin" "Goblin") pos

        -- Special: " "
        GiantBat ->
            Monster (Base <| Model 2 "giantBat" "Giant Bat") pos

        -- Special: " "
        Hobgoblin ->
            Monster (Base <| Model 2 "hobgoblin" "Hobgoblin") pos

        -- Special: " "
        Kobold ->
            Monster (Base <| Model 2 "kobold" "Kobold") pos

        -- Special: " "
        LargeSnake ->
            Monster (Base <| Model 3 "largeSnake" "Large Snake") pos

        -- Special: " "
        Skeleton ->
            Monster (Base <| Model 3 "skeleton" "Skeleton") pos

        -- Special: " "
        WildDog ->
            Monster (Base <| Model 3 "wildDog" "Wild Dog") pos

        -- Special: " "
        Viper ->
            Monster (Base <| Model 5 "viper" "Viper") pos

        -- Special: "Poison"
        GoblinFighter ->
            Monster (Base <| Model 6 "goblinFighter" "Goblin Fighter") pos

        -- Special: " "
        GiantRedAnt ->
            Monster (Base <| Model 7 "giantRedAnt" "Giant Red Ant") pos

        -- Special: " "
        WalkingCorpse ->
            Monster (Base <| Model 7 "walkingCorpse" "Walking Corpse") pos

        -- Special: " "
        Bandit ->
            Monster (Base <| Model 10 "bandit" "Bandit") pos

        -- Special: "Arrow"
        GiantTrapdoorSpider ->
            Monster (Base <| Model 10 "giantTrapdoorSpider" "Giant Trapdoor Spider") pos

        -- Special: " "
        HugeLizard ->
            Monster (Base <| Model 10 "hugeLizard" "Huge Lizard") pos

        -- Special: " "
        RatMan ->
            Monster (Base <| Model 10 "rat" "Rat-Man") pos

        -- Special: " "
        Slime ->
            Monster (Base <| Model 10 "slime" "Slime") pos

        -- Special: "IBaseune to Weapons"
        GiantScorpion ->
            Monster (Base <| Model 11 "giantScorpion" "Giant Scorpion") pos

        -- Special: "Poison"
        GrayWolf ->
            Monster (Base <| Model 11 "grayWolf" "Gray Wolf") pos

        -- Special: " "
        GelantinousGlob ->
            Monster (Base <| Model 14 "gelantinousGlob" "Gelantinous Glob") pos

        -- Special: "IBaseune to Cold, Lightning"
        SmirkingSneakThief ->
            Monster (Base <| Model 15 "smirkingSneakThief" "Smirking Sneak Thief") pos

        -- Special: "Steals from Belt and Purse, Teleports"
        CarrionCreeper ->
            Monster (Base <| Model 16 "carrionCreeper" "Carrion Creeper") pos

        -- Special: " "
        HugeOgre ->
            Monster (Base <| Model 16 "hugeOgre" "Huge Ogre") pos

        -- Special: " "
        Shadow ->
            Monster (Base <| Model 16 "shadow" "Shadow") pos

        -- Special: " "
        AnimatedWoodenStatue ->
            Monster (Base <| Model 17 "animatedWoodenStatue" "Animated Wooden Statue") pos

        -- Special: " "
        BrownBear ->
            Monster (Base <| Model 17 "brownBear" "Brown Bear") pos

        -- Special: " "
        YoungGreenDragon ->
            Monster (Base <| Model 18 "youngGreenDragon" "Young Green Dragon") pos

        -- Special: "IBaseune to Poison, Breathes Poison Gas"
        YoungWhiteDragon ->
            Monster (Base <| Model 18 "youngWhiteDragon" "Young White Dragon") pos

        -- Special: "IBaseune to Cold, Breathes Ice"
        Manticore ->
            Monster (Base <| Model 19 "manticore" "Manticore") pos

        -- Special: "Needles"
        EerieGhost ->
            Monster (Base <| Model 20 "eerieGhost" "Eerie Ghost") pos

        -- Special: " "
        GruesomeTroll ->
            Monster (Base <| Model 20 "gruesomeTroll" "Gruesome Troll") pos

        -- Special: " "
        YoungBlueDragon ->
            Monster (Base <| Model 20 "youngBlueDragon" "Young Blue Dragon") pos

        -- Special: "IBaseune to Lightning, Breathes Lightning"
        YoungRedDragon ->
            Monster (Base <| Model 20 "youngRedDragon" "Young Red Dragon") pos

        -- Special: "IBaseune to Fire, Breathes Fire"
        AnimatedBronzeStatue ->
            Monster (Base <| Model 25 "animatedBronzeStatue" "Animated Bronze Statue") pos

        -- Special: " "
        EvilWarrior ->
            Monster (Base <| Model 25 "evilWarrior" "Evil Warrior") pos

        -- Special: "Arrow"
        WolfMan ->
            Monster (Base <| Model 25 "wolf" "Wolf-Man") pos

        -- Special: " "
        CaveBear ->
            Monster (Base <| Model 27 "caveBear" "Cave Bear") pos

        -- Special: " "
        WhiteWolf ->
            Monster (Base <| Model 28 "whiteWolf" "White Wolf") pos

        -- Special: " "
        Berserker ->
            Monster (Base <| Model 30 "berserker" "Berserker") pos

        -- Special: " "
        AnimatedIronStatue ->
            Monster (Base <| Model 35 "animatedIronStatue" "Animated Iron Statue") pos

        -- Special: " "
        TunnelWight ->
            Monster (Base <| Model 35 "tunnelWight" "Tunnel Wight") pos

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        YoungAdultBlueDragon ->
            Monster (Base <| Model 35 "youngAdultBlueDragon" "Young Adult Blue Dragon") pos

        -- Special: "IBaseune to Lightning, Breathes Lightning"
        YoungAdultGreenDragon ->
            Monster (Base <| Model 35 "youngAdultGreenDragon" "Young Adult Green Dragon") pos

        -- Special: "IBaseune to Poison, Breathes Poison Gas"
        YoungAdultWhiteDragon ->
            Monster (Base <| Model 35 "youngAdultWhiteDragon" "Young Adult White Dragon") pos

        -- Special: "IBaseune to Cold, Breathes Ice"
        PaleWraith ->
            Monster (Base <| Model 37 "paleWraith" "Pale Wraith") pos

        -- Special: "Drains Intelligence and Mana Permanently"
        BarrowWight ->
            Monster (Base <| Model 40 "barrowWight" "Barrow Wight") pos

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        BearMan ->
            Monster (Base <| Model 40 "bear" "Bear-Man") pos

        -- Special: " "
        DustElemental ->
            Monster (Base <| Model 40 "dustElemental" "Dust Elemental") pos

        -- Special: " "
        HillGiant ->
            Monster (Base <| Model 40 "hillGiant" "Hill Giant") pos

        -- Special: "Throws Stones"
        YoungAdultRedDragon ->
            Monster (Base <| Model 40 "youngAdultRedDragon" "Young Adult Red Dragon") pos

        -- Special: "IBaseune to Fire, Breathes Fire"
        Wizard ->
            Monster (Base <| Model 45 "wizard" "Wizard") pos

        -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
        BullMan ->
            Monster (Base <| Model 50 "bull" "Bull-Man") pos

        -- Special: " "
        CastleWight ->
            Monster (Base <| Model 50 "castleWight" "Castle Wight") pos

        -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
        DarkWraith ->
            Monster (Base <| Model 50 "darkWraith" "Dark Wraith") pos

        -- Special: "Drains Intelligence and Mana Permanently"
        IceElemental ->
            Monster (Base <| Model 50 "iceElemental" "Ice Elemental") pos

        -- Special: " "
        Spectre ->
            Monster (Base <| Model 50 "spectre" "Spectre") pos

        -- Special: " "
        AnimatedMarbleStatue ->
            Monster (Base <| Model 52 "animatedMarbleStatue" "Animated Marble Statue") pos

        -- Special: " "
        AdultBlueDragon ->
            Monster (Base <| Model 55 "adultBlueDragon" "Adult Blue Dragon") pos

        -- Special: "IBaseune to Lightning, Breathes Lightning"
        AdultGreenDragon ->
            Monster (Base <| Model 55 "adultGreenDragon" "Adult Green Dragon") pos

        -- Special: "IBaseune to Poison, Breathes Poison Gas"
        AdultWhiteDragon ->
            Monster (Base <| Model 55 "adultWhiteDragon" "Adult White Dragon") pos

        -- Special: "IBaseune to Cold, Breathes Ice"
        AirElemental ->
            Monster (Base <| Model 55 "airElemental" "Air Elemental") pos

        -- Special: " "
        MagmaElemental ->
            Monster (Base <| Model 55 "magmaElemental" "Magma Elemental") pos

        -- Special: " "
        StoneGiant ->
            Monster (Base <| Model 55 "stoneGiant" "Stone Giant") pos

        -- Special: "Throws Stones"
        TwoHeadedGiant ->
            Monster (Base <| Model 55 "twoHeadedGiant" "Two Headed Giant") pos

        -- Special: " "
        AdultRedDragon ->
            Monster (Base <| Model 60 "adultRedDragon" "Adult Red Dragon") pos

        -- Special: "IBaseune to Fire, Breathes Fire"
        FireElemental ->
            Monster (Base <| Model 60 "fireElemental" "Fire Elemental") pos

        -- Special: " "
        FrostGiant ->
            Monster (Base <| Model 60 "frostGiant" "Frost Giant") pos

        -- Special: "Throws Iceballs"
        SpikedDevil ->
            Monster (Base <| Model 60 "spikedDevil" "Spiked Devil") pos

        -- Special: "SuBaseons Spiked Devil"
        WaterElemental ->
            Monster (Base <| Model 60 "waterElemental" "Water Elemental") pos

        -- Special: " "
        EarthElemental ->
            Monster (Base <| Model 65 "earthElemental" "Earth Elemental") pos

        -- Special: " "
        Necromancer ->
            Monster (Base <| Model 65 "necromancer" "Necromancer") pos

        -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
        Vampire ->
            Monster (Base <| Model 65 "vampire" "Vampire") pos

        -- Special: "Drains HP Permanently"
        AbyssWraith ->
            Monster (Base <| Model 70 "abyssWraith" "Abyss Wraith") pos

        -- Special: "Drains Intelligence and Mana Permanently"
        Utgardhalok ->
            Monster (Base <| Model 70 "utgardhalok" "Utgardhalok") pos

        -- Special: "Throws Boulders"
        FireGiant ->
            Monster (Base <| Model 75 "fireGiant" "Fire Giant") pos

        -- Special: "Throws Stones"
        OldBlueDragon ->
            Monster (Base <| Model 75 "oldBlueDragon" "Old Blue Dragon") pos

        -- Special: "IBaseune to Lightning, Breathes Lightning"
        OldGreenDragon ->
            Monster (Base <| Model 75 "oldGreenDragon" "Old Green Dragon") pos

        -- Special: "IBaseune to Poison, Breathes Poison Gas"
        OldWhiteDragon ->
            Monster (Base <| Model 75 "oldWhiteDragon" "Old White Dragon") pos

        -- Special: "IBaseune to Cold, Breathes Ice"
        HornedDevil ->
            Monster (Base <| Model 80 "hornedDevil" "Horned Devil") pos

        -- Special: "SuBaseons Horned Devil"
        OldRedDragon ->
            Monster (Base <| Model 80 "oldRedDragon" "Old Red Dragon") pos

        -- Special: "IBaseune to Fire, Breathes Fire"
        Rungnir ->
            Monster (Base <| Model 80 "rungnir" "Rungnir") pos

        -- Special: "Throws stones"
        IceDevil ->
            Monster (Base <| Model 85 "iceDevil" "Ice Devil") pos

        -- Special: "SuBaseons Ice Devil"
        Thrym ->
            Monster (Base <| Model 90 "thrym" "Thrym") pos

        -- Special: "Throws Iceballs"
        VeryOldGreenDragon ->
            Monster (Base <| Model 90 "veryOldGreenDragon" "Very Old Green Dragon") pos

        -- Special: "IBaseune to Poison, Breathes Poison Gas"
        VeryOldWhiteDragon ->
            Monster (Base <| Model 90 "veryOldWhiteDragon" "Very Old White Dragon") pos

        -- Special: "IBaseune to Cold, Breathes Ice"
        VeryOldBlueDragon ->
            Monster (Base <| Model 95 "veryOldBlueDragon" "Very Old Blue Dragon") pos

        -- Special: "IBaseune to Lightning, Breathes Lightning"
        AbyssFiend ->
            Monster (Base <| Model 100 "abyssFiend" "Abyss Fiend") pos

        -- Special: "SuBaseons Spiked Devil or Abyss Fiend"
        Thiassa ->
            Monster (Base <| Model 100 "thiassa" "Thiassa") pos

        -- Special: "Throws Stones"
        VeryOldRedDragon ->
            Monster (Base <| Model 100 "veryOldRedDragon" "Very Old Red Dragon") pos

        -- Special: "IBaseune to Fire, Breathes Fire"
        AncientGreenDragon ->
            Monster (Base <| Model 105 "ancientGreenDragon" "Ancient Green Dragon") pos

        -- Special: "IBaseune to Poison, Breathes Poison Gas"
        AncientWhiteDragon ->
            Monster (Base <| Model 105 "ancientWhiteDragon" "AncientWhite Dragon") pos

        -- Special: "IBaseune to Cold, Breathes Ice"
        AncientBlueDragon ->
            Monster (Base <| Model 110 "ancientBlueDragon" "Ancient Blue Dragon") pos

        -- Special: "IBaseune to Lightning, Breathes Lightning"
        AncientRedDragon ->
            Monster (Base <| Model 120 "ancientRedDragon" "Ancient Red Dragon") pos

        -- Special: "IBaseune to Fire, Breathes Fire"
        Sultur ->
            Monster (Base <| Model 344 "sultur" "Sultur") pos



-- Special: "Casts Fire, Lighting, and Wind Spells"
