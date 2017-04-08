module Monster
    exposing
        ( Monster
        , make
        , makeForArena
        , makeRandomMonsters
        , types
        , remove
        , replace
        , replaceMoved
        , view
        )

{-|
Monsters are the main ways to advance in the game. They exist in the dungeon levels only and get progressively more dangerous
as you venture deeper.

Monsters are separated into types, each type will have special characteristics such as the dragons all having
a form of elemental attack or the undeads being able to drain stats.

Monsters do not have levels, instead what determines their difficulty is their stats and attributes. Each monster type has
a base set of attributes which is changed by specific monsters of that type. Their stats (hp/sp) is determined by their
size and type.
-}

import Html exposing (Html)
import Monsters.Factory exposing (make)
import Monsters.Model
import Monsters.Types exposing (..)
import Monsters.View
import Utils.Vector as Vector exposing (Vector)


-- types


type alias Monster =
    Monsters.Model.Monster


types =
    Monsters.Types.monsterTypesToList



-- maker functions


makeForArena =
    Monsters.Factory.makeForArena


makeRandomMonsters =
    Monsters.Factory.makeRandomMonsters


make =
    Monsters.Factory.make



-- view


view =
    Monsters.View.view



-- base


{-| Replaces a monster uniquely identified by it's position.
-}
replace : Monster -> List Monster -> List Monster
replace monster monsters =
    monster :: remove monster monsters


{-| Replace a monster with a new instance using the old monster's position.
-}
replaceMoved : Monster -> Monster -> List Monster -> List Monster
replaceMoved existing new monsters =
    monsters
        |> remove existing
        |> (::) new


remove : Monster -> List Monster -> List Monster
remove monster monsters =
    List.filter (\x -> monster.position /= x.position) monsters


{-| generated from the pit
-}
rank : List ( MonsterType, Int )
rank =
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
