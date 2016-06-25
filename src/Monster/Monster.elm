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
