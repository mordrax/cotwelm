module Monsters.Types exposing (..)


type AttackType
    = Melee
    | Ranged
    | Poison
    | Acid
    | Fire
    | Ice
    | Lightning
    | Drain
    | Steal
    | Spell


type MonsterType
    = Kobold
    | GiantRat
    | LargeSnake
    | GiantRedAnt
    | WildDog
    | Skeleton
    | GiantTrapdoorSpider
    | GiantBat
    | CarrionCreeper
    | GiantScorpion
    | GreenSlime
    | Viper
    | HugeOgre
    | WalkingCorpse
    | HugeLizard
    | Goblin
    | Hobgoblin
    | Shadow
    | SmirkingSneakThief
    | GrayWolf
    | WhiteWolf
    | BrownBear
    | CaveBear
    | GelatinousGlob
    | GruesomeTroll
    | Manticore
    | AnimatedBronzeStatue
    | AnimatedIronStatue
    | AnimatedMarbleStatue
    | AnimatedWoodenStatue
    | Bandit
    | EvilWarrior
    | Wizard
    | Necromancer
    | BarrowWight
    | DarkWraith
    | EerieGhost
    | Spectre
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
    | TwoHeadedGiant
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


type MonsterKind
    = GiantInsect
    | Undead
    | Humanoid
    | Canine
    | Animal
    | AnimalMan
    | Statue
    | Other
    | Dragon
    | Elemental
    | Giant
    | Devil


cappedRank : Int -> List MonsterType
cappedRank maxRank =
    let
        lessThanMaxRank ( monsterType, rank ) =
            rank < maxRank
    in
    List.filter lessThanMaxRank monsterRanking
        |> List.map Tuple.first


{-| generated from the pit
-}
monsterRanking : List ( MonsterType, Int )
monsterRanking =
    [ ( AnimatedWoodenStatue, 0 )
    , ( GreenSlime, 1 )
    , ( AnimatedBronzeStatue, 2 )
    , ( GiantRat, 3 )
    , ( LargeSnake, 4 )
    , ( SmirkingSneakThief, 5 )
    , ( GiantBat, 6 )
    , ( AnimatedMarbleStatue, 7 )
    , ( Goblin, 8 )
    , ( Bandit, 9 )
    , ( AnimatedIronStatue, 10 )
    , ( Hobgoblin, 11 )
    , ( WalkingCorpse, 12 )
    , ( WildDog, 13 )
    , ( GrayWolf, 14 )
    , ( Skeleton, 15 )
    , ( GiantTrapdoorSpider, 16 )
    , ( CarrionCreeper, 17 )
    , ( GelatinousGlob, 18 )
    , ( Kobold, 19 )
    , ( GiantScorpion, 20 )
    , ( Shadow, 21 )
    , ( Viper, 22 )
    , ( WhiteWolf, 23 )
    , ( EerieGhost, 24 )
    , ( BrownBear, 25 )
    , ( IceDevil, 26 )
    , ( HugeLizard, 27 )
    , ( WaterElemental, 28 )
    , ( HornedDevil, 29 )
    , ( BarrowWight, 30 )
    , ( GiantRedAnt, 31 )
    , ( SpikedDevil, 32 )
    , ( GruesomeTroll, 33 )
    , ( RatMan, 34 )
    , ( CaveBear, 35 )
    , ( IceElemental, 36 )
    , ( EarthElemental, 37 )
    , ( Spectre, 38 )
    , ( FireElemental, 39 )
    , ( MagmaElemental, 40 )
    , ( BearMan, 41 )
    , ( WolfMan, 42 )
    , ( BullMan, 43 )
    , ( WindElemental, 44 )
    , ( DustElemental, 45 )
    , ( Wizard, 46 )
    , ( HugeOgre, 47 )
    , ( EvilWarrior, 48 )
    , ( Necromancer, 49 )
    , ( Manticore, 50 )
    , ( Vampire, 51 )
    , ( HillGiant, 52 )
    , ( StoneGiant, 53 )
    , ( FireGiant, 54 )
    , ( DarkWraith, 55 )
    , ( FrostGiant, 56 )
    , ( TwoHeadedGiant, 57 )
    , ( AbyssFiend, 58 )
    , ( StoneGiantKing, 59 )
    , ( FireGiantKing, 60 )
    , ( FrostGiantKing, 61 )
    , ( HillGiantKing, 62 )
    , ( RedDragon, 63 )
    , ( BlueDragon, 64 )
    , ( WhiteDragon, 65 )
    , ( GreenDragon, 66 )
    , ( Surtur, 67 )
    ]


monsterTypesToList : List MonsterType
monsterTypesToList =
    [ Kobold
    , GiantRat
    , LargeSnake
    , GiantRedAnt
    , WildDog
    , Skeleton
    , GiantTrapdoorSpider
    , GiantBat
    , CarrionCreeper
    , GiantScorpion
    , GreenSlime
    , Viper
    , HugeOgre
    , WalkingCorpse
    , HugeLizard
    , Goblin
    , Hobgoblin
    , Shadow
    , SmirkingSneakThief
    , GrayWolf
    , WhiteWolf
    , BrownBear
    , CaveBear
    , GelatinousGlob
    , GruesomeTroll
    , Manticore
    , AnimatedBronzeStatue
    , AnimatedIronStatue
    , AnimatedMarbleStatue
    , AnimatedWoodenStatue
    , Bandit
    , EvilWarrior
    , Wizard
    , Necromancer
    , BarrowWight
    , DarkWraith
    , EerieGhost
    , Spectre
    , Vampire
    , IceDevil
    , RatMan
    , WolfMan
    , BearMan
    , BullMan
    , SpikedDevil
    , HornedDevil
    , AbyssFiend
    , WindElemental
    , DustElemental
    , FireElemental
    , WaterElemental
    , MagmaElemental
    , IceElemental
    , EarthElemental
    , HillGiant
    , TwoHeadedGiant
    , FrostGiant
    , StoneGiant
    , FireGiant
    , Surtur
    , FireGiantKing
    , FrostGiantKing
    , HillGiantKing
    , StoneGiantKing
    , RedDragon
    , BlueDragon
    , WhiteDragon
    , GreenDragon
    ]
