module Monsters.View exposing (view)

import Html exposing (..)
import Html.Attributes as HA
import Monsters.Model exposing (Monster)
import Monsters.Types exposing (..)
import Utils.Vector exposing (Vector)


view : Monster -> Html a
view { monsterType, position } =
    div [ HA.style (vectorToHtmlStyle position), HA.class ("tile monster " ++ monsterTypeToCSS monsterType) ] []


vectorToHtmlStyle : Vector -> List ( String, String )
vectorToHtmlStyle ( x, y ) =
    [ ( "top", px (y * 32) )
    , ( "left", px (x * 32) )
    ]


px : number -> String
px a =
    toString a ++ "px"


monsterTypeToCSS : MonsterType -> String
monsterTypeToCSS monsterType =
    case monsterType of
        Kobold ->
            "kobold"

        GiantRat ->
            "giant-rat"

        LargeSnake ->
            "large-snake"

        GiantRedAnt ->
            "giant-red-ant"

        WildDog ->
            "wild-dog"

        Skeleton ->
            "skeleton"

        GiantTrapdoorSpider ->
            "giant-trapdoor-spider"

        GiantBat ->
            "giant-bat"

        CarrionCreeper ->
            "carrion-creeper"

        GiantScorpion ->
            "giant-scorpion"

        GreenSlime ->
            "green-slime"

        Viper ->
            "viper"

        HugeOgre ->
            "huge-ogre"

        WalkingCorpse ->
            "walking-corpse"

        HugeLizard ->
            "huge-lizard"

        Goblin ->
            "goblin"

        Hobgoblin ->
            "hobgoblin"

        Shadow ->
            "shadow"

        SmirkingSneakThief ->
            "smirking-sneak-thief"

        GrayWolf ->
            "gray-wolf"

        WhiteWolf ->
            "white-wolf"

        BrownBear ->
            "brown-bear"

        CaveBear ->
            "cave-bear"

        GelatinousGlob ->
            "gelatinous-glob"

        GruesomeTroll ->
            "gruesome-troll"

        Manticore ->
            "manticore"

        AnimatedBronzeStatue ->
            "animated-bronze-statue"

        AnimatedIronStatue ->
            "animated-iron-statue"

        AnimatedMarbleStatue ->
            "animated-marble-statue"

        AnimatedWoodenStatue ->
            "animated-wooden-statue"

        Bandit ->
            "bandit"

        EvilWarrior ->
            "evil-warrior"

        Wizard ->
            "wizard"

        Necromancer ->
            "necromancer"

        BarrowWight ->
            "barrow-wight"

        DarkWraith ->
            "dark-wraith"

        EerieGhost ->
            "eerie-ghost"

        Spectre ->
            "spectre"

        Vampire ->
            "vampire"

        IceDevil ->
            "ice-devil"

        RatMan ->
            "rat-man"

        WolfMan ->
            "wolf-man"

        BearMan ->
            "bear-man"

        BullMan ->
            "bull-man"

        SpikedDevil ->
            "spiked-devil"

        HornedDevil ->
            "horned-devil"

        AbyssFiend ->
            "abyss-fiend"

        WindElemental ->
            "wind-elemental"

        DustElemental ->
            "dust-elemental"

        FireElemental ->
            "fire-elemental"

        WaterElemental ->
            "water-elemental"

        MagmaElemental ->
            "magma-elemental"

        IceElemental ->
            "ice-elemental"

        EarthElemental ->
            "earth-elemental"

        HillGiant ->
            "hill-giant"

        TwoHeadedGiant ->
            "two-headed-giant"

        FrostGiant ->
            "frost-giant"

        StoneGiant ->
            "stone-giant"

        FireGiant ->
            "fire-giant"

        Surtur ->
            "surtur"

        FireGiantKing ->
            "fire-giant-king"

        FrostGiantKing ->
            "frost-giant-king"

        HillGiantKing ->
            "hill-giant-king"

        StoneGiantKing ->
            "stone-giant-king"

        RedDragon ->
            "red-dragon"

        BlueDragon ->
            "blue-dragon"

        WhiteDragon ->
            "white-dragon"

        GreenDragon ->
            "green-dragon"
