module Monster.Monster
    exposing
        ( Monster
        , MonsterType(..)
        , types
        , view
        , initForArena
        , init
        , update
        , remove
        , randomMonsters
        )

import Utils.Vector as Vector exposing (..)
import Utils.Lib exposing (vectorToHtmlStyle)
import Html exposing (..)
import Html.Attributes exposing (..)
import Stats exposing (..)
import Utils.IdGenerator as IdGenerator exposing (ID)
import Equipment exposing (Equipment)
import Attributes exposing (Attributes)
import Utils.Lib as Lib
import Types
import Random.Pcg as Random exposing (Generator)
import Lodash
import Maybe
import Item.Item as Item exposing (Item)
import Item.Data as ItemData


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
    }


view : Monster -> Html a
view { css, position } =
    div [ vectorToHtmlStyle position, class ("tile monster " ++ css) ] []


initForArena : MonsterType -> Monster
initForArena monsterType =
    init monsterType ( 0, 0 )


randomMonsters : List Vector -> Generator (List Monster)
randomMonsters positions =
    List.foldl randomMonstersReducer (Random.constant []) positions


randomMonstersReducer : Vector -> Generator (List Monster) -> Generator (List Monster)
randomMonstersReducer position monsters =
    randomMonster position
        |> (\monster -> Random.map2 (::) monster monsters)


randomMonster : Vector -> Generator Monster
randomMonster position =
    Lodash.shuffle types
        |> Random.map (List.head)
        |> Random.map (Maybe.withDefault GiantRat)
        |> Random.map (flip init position)


update : Monster -> List Monster -> List Monster
update monster monsters =
    monster :: remove monster monsters


remove : Monster -> List Monster -> List Monster
remove monster monsters =
    List.filter (\x -> monster.position /= x.position) monsters


init : MonsterType -> Vector -> Monster
init monsterType position =
    let
        makeEquipment equipment =
            Equipment.equipMany equipment Equipment.init

        make name level attributes bodySize itemSlotPair =
            { name = name
            , type_ = Types.Monster
            , css = (Utils.Lib.toCSS name)
            , position = position
            , stats = Stats.initExperienced attributes level
            , attributes = attributes
            , equipment = makeEquipment itemSlotPair
            , expLevel = level
            , bodySize = bodySize
            }

        weaponSlot weaponType =
            ( Equipment.WeaponSlot, Item.new (ItemData.ItemTypeWeapon weaponType) IdGenerator.empty )

        armourSlot armourType =
            ( Equipment.ArmourSlot, Item.new (ItemData.ItemTypeArmour armourType) IdGenerator.empty )

        makeShield shieldType =
            Item.new (ItemData.ItemTypeShield shieldType) IdGenerator.empty

        basicEquipment weapon armour =
            [ weaponSlot weapon
            , armourSlot armour
            ]

        leatherEquipment =
            [ ( Equipment.ArmourSlot, Item.new (ItemData.ItemTypeArmour ItemData.LeatherArmour) IdGenerator.empty )
            , ( Equipment.HelmetSlot, Item.new (ItemData.ItemTypeHelmet ItemData.LeatherHelmet) IdGenerator.empty )
            , ( Equipment.GauntletsSlot, Item.new (ItemData.ItemTypeGauntlets ItemData.NormalGauntlets) IdGenerator.empty )
            , ( Equipment.BracersSlot, Item.new (ItemData.ItemTypeBracers ItemData.NormalBracers) IdGenerator.empty )
            ]

        ironEquipment =
            [ ( Equipment.ArmourSlot, Item.new (ItemData.ItemTypeArmour ItemData.ChainMail) IdGenerator.empty )
            , ( Equipment.HelmetSlot, Item.new (ItemData.ItemTypeHelmet ItemData.IronHelmet) IdGenerator.empty )
            , ( Equipment.GauntletsSlot, Item.new (ItemData.ItemTypeGauntlets ItemData.NormalGauntlets) IdGenerator.empty )
            , ( Equipment.BracersSlot, Item.new (ItemData.ItemTypeBracers ItemData.NormalBracers) IdGenerator.empty )
            ]

        basicShieldEquipment weapon shield armour =
            ( Equipment.ShieldSlot, makeShield shield ) :: basicEquipment weapon armour
    in
        case monsterType of
            GiantRat ->
                make "Giant Rat"
                    1
                    (Attributes 0 40 50 50 5)
                    Types.Small
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)

            Goblin ->
                make "Goblin"
                    1
                    (Attributes 0 40 60 50 20)
                    Types.Small
                    (weaponSlot ItemData.Club :: leatherEquipment)

            GiantBat ->
                make "Giant Bat"
                    1
                    (Attributes 0 30 70 40 10)
                    Types.Small
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)

            Kobold ->
                make "Kobold"
                    2
                    (Attributes 0 30 60 30 50)
                    Types.Small
                    (weaponSlot ItemData.Crossbow :: leatherEquipment)

            Hobgoblin ->
                make "Hobgoblin"
                    2
                    (Attributes 0 50 60 50 50)
                    Types.Medium
                    (weaponSlot ItemData.Spear :: leatherEquipment)

            LargeSnake ->
                make "Large Snake"
                    2
                    (Attributes 0 20 70 30 30)
                    Types.Tiny
                    (basicEquipment ItemData.Fangs ItemData.SoftHide)

            Skeleton ->
                make "Skeleton"
                    3
                    (Attributes 0 60 65 40 10)
                    Types.Medium
                    (basicEquipment ItemData.ShortSword ItemData.Bones)

            WildDog ->
                make "Wild Dog"
                    3
                    (Attributes 0 50 75 30 30)
                    Types.Small
                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)

            -- Special: "Poison"
            Viper ->
                make "Viper"
                    3
                    (Attributes 0 20 80 20 30)
                    Types.Tiny
                    (basicEquipment ItemData.Fangs ItemData.SoftHide)

            GoblinFighter ->
                make "Goblin Fighter"
                    4
                    (Attributes 0 50 75 50 50)
                    Types.Small
                    (basicShieldEquipment ItemData.Axe ItemData.MediumIronShield ItemData.StuddedLeatherArmour)

            GiantRedAnt ->
                make "Giant Red Ant"
                    4
                    (Attributes 0 80 50 60 40)
                    Types.Large
                    (basicEquipment ItemData.Pincers ItemData.Shell)

            WalkingCorpse ->
                make "Walking Corpse"
                    4
                    (Attributes 0 100 40 95 20)
                    Types.Medium
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)

            -- Special: "Arrow"
            Bandit ->
                make "Bandit"
                    4
                    (Attributes 0 60 75 60 50)
                    Types.Medium
                    (weaponSlot ItemData.Bow :: leatherEquipment)

            GiantTrapdoorSpider ->
                make "Giant Trapdoor Spider"
                    5
                    (Attributes 0 60 60 60 50)
                    Types.Large
                    (basicEquipment ItemData.Pincers ItemData.Shell)

            HugeLizard ->
                make "Huge Lizard"
                    5
                    (Attributes 0 70 65 60 50)
                    Types.Large
                    (basicEquipment ItemData.LargeClaws ItemData.ToughHide)

            RatMan ->
                make "Rat-Man"
                    5
                    (Attributes 0 50 50 50 50)
                    Types.Medium
                    (basicEquipment ItemData.MorningStar ItemData.ToughHide)

            -- Special: "Immune to Weapons"
            Slime ->
                make "Slime" 6 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Poison"
            GiantScorpion ->
                make "Giant Scorpion" 6 (Attributes 0 50 50 50 50) Types.Medium []

            GrayWolf ->
                make "Gray Wolf" 6 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Lightning"
            GelantinousGlob ->
                make "Gelantinous Glob" 7 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Steals from Belt and Purse, Teleports"
            SmirkingSneakThief ->
                make "Smirking Sneak Thief" 7 (Attributes 0 50 50 50 50) Types.Medium []

            CarrionCreeper ->
                make "Carrion Creeper" 7 (Attributes 0 50 50 50 50) Types.Medium []

            HugeOgre ->
                make "Huge Ogre" 8 (Attributes 0 50 50 50 50) Types.Medium []

            Shadow ->
                make "Shadow" 8 (Attributes 0 50 50 50 50) Types.Medium []

            AnimatedWoodenStatue ->
                make "Animated Wooden Statue" 8 (Attributes 0 50 50 50 50) Types.Medium []

            BrownBear ->
                make "Brown Bear" 9 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            -- Special: "Needles"
            Manticore ->
                make "Manticore" 10 (Attributes 0 50 50 50 50) Types.Medium []

            EerieGhost ->
                make "Eerie Ghost" 10 (Attributes 0 50 50 50 50) Types.Medium []

            GruesomeTroll ->
                make "Gruesome Troll" 10 (Attributes 0 50 50 50 50) Types.Medium []

            YoungGreenDragon ->
                make "Young Green Dragon" 11 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Breathes Ice"
            YoungWhiteDragon ->
                make "Young White Dragon" 11 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Lightning, Breathes Lightning"
            YoungBlueDragon ->
                make "Young Blue Dragon" 11 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Fire, Breathes Fire"
            YoungRedDragon ->
                make "Young Red Dragon" 11 (Attributes 0 50 50 50 50) Types.Medium []

            AnimatedBronzeStatue ->
                make "Animated Bronze Statue" 11 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Arrow"
            EvilWarrior ->
                make "Evil Warrior" 11 (Attributes 0 50 50 50 50) Types.Medium []

            WolfMan ->
                make "Wolf Man" 12 (Attributes 0 50 50 50 50) Types.Medium []

            CaveBear ->
                make "Cave Bear" 12 (Attributes 0 50 50 50 50) Types.Medium []

            WhiteWolf ->
                make "White Wolf" 12 (Attributes 0 50 50 50 50) Types.Medium []

            Berserker ->
                make "Berserker" 13 (Attributes 0 50 50 50 50) Types.Medium []

            AnimatedIronStatue ->
                make "Animated Iron Statue" 13 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            TunnelWight ->
                make "Tunnel Wight" 13 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Lightning, Breathes Lightning"
            YoungAdultBlueDragon ->
                make "Young Adult Blue Dragon" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            YoungAdultGreenDragon ->
                make "Young Adult Green Dragon" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Breathes Ice"
            YoungAdultWhiteDragon ->
                make "Young Adult White Dragon" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains Intelligence and Mana Permanently"
            PaleWraith ->
                make "Pale Wraith" 14 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            BarrowWight ->
                make "Barrow Wight" 14 (Attributes 0 50 50 50 50) Types.Medium []

            BearMan ->
                make "Bear-Man" 14 (Attributes 0 50 50 50 50) Types.Medium []

            DustElemental ->
                make "Dust Elemental" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Stones"
            HillGiant ->
                make "Hill Giant" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Fire, Breathes Fire"
            YoungAdultRedDragon ->
                make "Young Adult Red Dragon" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Wizard ->
                make "Wizard" 18 (Attributes 0 50 50 50 50) Types.Medium []

            BullMan ->
                make "Bull-Man" 16 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            CastleWight ->
                make "Castle Wight" 14 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains Intelligence and Mana Permanently"
            DarkWraith ->
                make "Dark Wraith" 15 (Attributes 0 50 50 50 50) Types.Medium []

            IceElemental ->
                make "Ice Elemental" 16 (Attributes 0 50 50 50 50) Types.Medium []

            Spectre ->
                make "Spectre" 17 (Attributes 0 50 50 50 50) Types.Medium []

            AnimatedMarbleStatue ->
                make "Animated Marble Statue" 18 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Lightning, Breathes Lightning"
            AdultBlueDragon ->
                make "Adult Blue Dragon" 19 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            AdultGreenDragon ->
                make "Adult Green Dragon" 19 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Breathes Ice"
            AdultWhiteDragon ->
                make "Adult White Dragon" 19 (Attributes 0 50 50 50 50) Types.Medium []

            AirElemental ->
                make "Air Elemental" 16 (Attributes 0 50 50 50 50) Types.Medium []

            MagmaElemental ->
                make "Magma Elemental" 18 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Stones"
            StoneGiant ->
                make "Stone Giant" 19 (Attributes 0 50 50 50 50) Types.Medium []

            TwoHeadedGiant ->
                make "Two Headed Giant" 21 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Fire, Breathes Fire"
            AdultRedDragon ->
                make "Adult Red Dragon" 24 (Attributes 0 50 50 50 50) Types.Medium []

            FireElemental ->
                make "Fire Elemental" 20 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Iceballs"
            FrostGiant ->
                make "Frost Giant" 19 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "SuBaseons Spiked Devil"
            SpikedDevil ->
                make "Spiked Devil" 20 (Attributes 0 50 50 50 50) Types.Medium []

            WaterElemental ->
                make "Water Elemental" 19 (Attributes 0 50 50 50 50) Types.Medium []

            EarthElemental ->
                make "Earth Elemental" 19 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Necromancer ->
                make "Necromancer" 16 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains HP Permanently"
            Vampire ->
                make "Vampire" 20 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Drains Intelligence and Mana Permanently"
            AbyssWraith ->
                make "Abyss Wraith" 21 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Boulders"
            Utgardhalok ->
                make "Utgardhalok" 25 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Stones"
            FireGiant ->
                make "Fire Giant" 21 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Lightning, Breathes Lightning"
            OldBlueDragon ->
                make "Old Blue Dragon" 28 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            OldGreenDragon ->
                make "Old Green Dragon" 28 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Breathes Ice"
            OldWhiteDragon ->
                make "Old White Dragon" 28 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "SuBaseons Horned Devil"
            HornedDevil ->
                make "Horned Devil" 23 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Fire, Breathes Fire"
            OldRedDragon ->
                make "Old Red Dragon" 28 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws stones"
            Rungnir ->
                make "Rungnir" 15 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "SuBaseons Ice Devil"
            IceDevil ->
                make "Ice Devil" 23 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Iceballs"
            Thrym ->
                make "Thrym" 25 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            VeryOldGreenDragon ->
                make "Very Old Green Dragon" 32 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Breathes Ice"
            VeryOldWhiteDragon ->
                make "Very Old White Dragon" 32 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Lightning, Breathes Lightning"
            VeryOldBlueDragon ->
                make "Very Old Blue Dragon" 32 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "SuBaseons Spiked Devil or Abyss Fiend"
            AbyssFiend ->
                make "Abyss Fiend" 26 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Throws Stones"
            Thiassa ->
                make "Thiassa" 26 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Fire, Breathes Fire"
            VeryOldRedDragon ->
                make "Very Old Red Dragon" 32 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            AncientGreenDragon ->
                make "Ancient Green Dragon" 35 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Cold, Breathes Ice"
            AncientWhiteDragon ->
                make "Ancient White Dragon" 35 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Lightning, Breathes Lightning"
            AncientBlueDragon ->
                make "Ancient Blue Dragon" 35 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Immune to Fire, Breathes Fire"
            AncientRedDragon ->
                make "Ancient Red Dragon" 35 (Attributes 0 50 50 50 50) Types.Medium []

            -- Special: "Casts Fire, Lighting, and Wind Spells"
            Sultur ->
                make "Sultur" 40 (Attributes 0 50 50 50 50) Types.Medium []


types : List MonsterType
types =
    [ GiantRat
    , Goblin
    , GiantBat
    , Hobgoblin
    , Kobold
    , LargeSnake
    , Skeleton
    , WildDog
    , Viper
    , GoblinFighter
    , GiantRedAnt
    , WalkingCorpse
    , Bandit
    , GiantTrapdoorSpider
    , HugeLizard
    , RatMan
    , Slime
    , GiantScorpion
    , GrayWolf
    , GelantinousGlob
    , SmirkingSneakThief
    , CarrionCreeper
    , HugeOgre
    , Shadow
    , AnimatedWoodenStatue
    , BrownBear
    , YoungGreenDragon
    , YoungWhiteDragon
    , Manticore
    , EerieGhost
    , GruesomeTroll
    , YoungBlueDragon
    , YoungRedDragon
    , AnimatedBronzeStatue
    , EvilWarrior
    , WolfMan
    , CaveBear
    , WhiteWolf
    , Berserker
    , AnimatedIronStatue
    , TunnelWight
    , YoungAdultBlueDragon
    , YoungAdultGreenDragon
    , YoungAdultWhiteDragon
    , PaleWraith
    , BarrowWight
    , BearMan
    , DustElemental
    , HillGiant
    , YoungAdultRedDragon
    , Wizard
    , BullMan
    , CastleWight
    , DarkWraith
    , IceElemental
    , Spectre
    , AnimatedMarbleStatue
    , AdultBlueDragon
    , AdultGreenDragon
    , AdultWhiteDragon
    , AirElemental
    , MagmaElemental
    , StoneGiant
    , TwoHeadedGiant
    , AdultRedDragon
    , FireElemental
    , FrostGiant
    , SpikedDevil
    , WaterElemental
    , EarthElemental
    , Necromancer
    , Vampire
    , AbyssWraith
    , Utgardhalok
    , FireGiant
    , OldBlueDragon
    , OldGreenDragon
    , OldWhiteDragon
    , HornedDevil
    , OldRedDragon
    , Rungnir
    , IceDevil
    , Thrym
    , VeryOldGreenDragon
    , VeryOldWhiteDragon
    , VeryOldBlueDragon
    , AbyssFiend
    , Thiassa
    , VeryOldRedDragon
    , AncientGreenDragon
    , AncientWhiteDragon
    , AncientBlueDragon
    , AncientRedDragon
    , Sultur
    ]


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
