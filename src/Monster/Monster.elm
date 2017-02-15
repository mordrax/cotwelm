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
    , attackTypes : List AttackType
    , attacks : Int
    , speed : Int
    }


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

        make name level attributes itemSlotPair =
            { name = name
            , type_ = Types.Monster
            , css = (Utils.Lib.toCSS name)
            , position = position
            , stats = Stats.initExperienced attributes level
            , attributes = attributes
            , equipment = makeEquipment itemSlotPair
            , expLevel = level
            , bodySize = Types.Medium
            , attackTypes = [ Melee ]
            , attacks = 1
            , speed = 100
            }

        setAttacks attacks monster =
            { monster | attacks = attacks }

        setSpeed speed monster =
            { monster | speed = speed }

        setAttackTypes attackTypes monster =
            { monster | attackTypes = attackTypes }

        setBodySize size monster =
            { monster | bodySize = size }

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
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
                    |> setBodySize Types.Small

            Goblin ->
                make "Goblin"
                    1
                    (Attributes 0 40 60 50 20)
                    (weaponSlot ItemData.Club :: leatherEquipment)
                    |> setBodySize Types.Small

            GiantBat ->
                make "Giant Bat"
                    1
                    (Attributes 0 30 70 40 10)
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
                    |> setBodySize Types.Small

            Kobold ->
                make "Kobold"
                    2
                    (Attributes 0 30 60 30 50)
                    (weaponSlot ItemData.Crossbow :: leatherEquipment)
                    |> setBodySize Types.Small
                    |> setAttackTypes [ Melee, Ranged ]

            Hobgoblin ->
                make "Hobgoblin"
                    2
                    (Attributes 0 50 60 50 50)
                    (weaponSlot ItemData.Spear :: leatherEquipment)

            LargeSnake ->
                make "Large Snake"
                    2
                    (Attributes 0 20 70 30 30)
                    (basicEquipment ItemData.Fangs ItemData.SoftHide)
                    |> setBodySize Types.Tiny
                    |> setAttackTypes [ Poison ]

            Skeleton ->
                make "Skeleton"
                    3
                    (Attributes 0 60 65 40 10)
                    (basicEquipment ItemData.ShortSword ItemData.Bones)

            WildDog ->
                make "Wild Dog"
                    3
                    (Attributes 0 50 75 30 30)
                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)
                    |> setBodySize Types.Small

            -- Special: "Poison"
            Viper ->
                make "Viper"
                    3
                    (Attributes 0 20 80 20 30)
                    (basicEquipment ItemData.Fangs ItemData.SoftHide)
                    |> setBodySize Types.Tiny
                    |> setAttackTypes [ Poison ]

            GoblinFighter ->
                make "Goblin Fighter"
                    4
                    (Attributes 0 50 75 50 50)
                    (basicShieldEquipment ItemData.Axe ItemData.MediumIronShield ItemData.StuddedLeatherArmour)
                    |> setBodySize Types.Small

            GiantRedAnt ->
                make "Giant Red Ant"
                    4
                    (Attributes 0 80 50 60 40)
                    (basicEquipment ItemData.Pincers ItemData.Shell)
                    |> setBodySize Types.Large

            WalkingCorpse ->
                make "Walking Corpse"
                    4
                    (Attributes 0 100 40 95 20)
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)

            -- Special: "Arrow"
            Bandit ->
                make "Bandit"
                    4
                    (Attributes 0 60 75 60 50)
                    (weaponSlot ItemData.Bow :: leatherEquipment)
                    |> setAttackTypes [ Ranged ]

            GiantTrapdoorSpider ->
                make "Giant Trapdoor Spider"
                    5
                    (Attributes 0 60 60 60 30)
                    (basicEquipment ItemData.Pincers ItemData.Shell)
                    |> setBodySize Types.Large

            HugeLizard ->
                make "Huge Lizard"
                    5
                    (Attributes 0 70 65 60 30)
                    (basicEquipment ItemData.LargeClaws ItemData.ToughHide)
                    |> setBodySize Types.Large

            RatMan ->
                make "Rat Man"
                    5
                    (Attributes 0 60 60 60 60)
                    (basicEquipment ItemData.MorningStar ItemData.ToughHide)

            -- Special: "Immune to Weapons", "Acid"
            Slime ->
                make "Slime"
                    6
                    (Attributes 0 50 50 90 50)
                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)
                    |> setAttackTypes [ Acid ]

            -- Special: "Poison"
            GiantScorpion ->
                make "Giant Scorpion"
                    6
                    (Attributes 0 75 50 60 50)
                    (basicEquipment ItemData.Pincers ItemData.Shell)
                    |> setBodySize Types.Large
                    |> setAttackTypes [ Poison ]

            GrayWolf ->
                make "Gray Wolf"
                    6
                    (Attributes 0 60 80 50 50)
                    (basicEquipment ItemData.SmallBite ItemData.ToughHide)
                    |> setBodySize Types.Small

            WhiteWolf ->
                make "White Wolf"
                    6
                    (Attributes 0 60 80 50 50)
                    (basicEquipment ItemData.SmallBite ItemData.ToughHide)
                    |> setBodySize Types.Small
                    |> setAttacks 2

            -- Special: "Immune to Cold, Lightning"
            GelantinousGlob ->
                make "Gelantinous Glob"
                    7
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Steals from Belt and Purse, Teleports"
            SmirkingSneakThief ->
                make "Smirking Sneak Thief"
                    7
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Steal ]

            CarrionCreeper ->
                make "Carrion Creeper"
                    7
                    (Attributes 0 50 50 50 50)
                    []

            HugeOgre ->
                make "Huge Ogre"
                    8
                    (Attributes 0 50 50 50 50)
                    []

            Shadow ->
                make "Shadow"
                    8
                    (Attributes 0 50 50 50 50)
                    []

            AnimatedWoodenStatue ->
                make "Animated Wooden Statue"
                    8
                    (Attributes 0 50 50 50 50)
                    []

            BrownBear ->
                make "Brown Bear"
                    9
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Immune to Poison, Breathes Poison Gas"
            -- Special: "Needles"
            Manticore ->
                make "Manticore"
                    10
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Melee, Poison ]

            EerieGhost ->
                make "Eerie Ghost"
                    10
                    (Attributes 0 50 50 50 50)
                    []

            GruesomeTroll ->
                make "Gruesome Troll"
                    10
                    (Attributes 0 50 50 50 50)
                    []

            YoungGreenDragon ->
                make "Young Green Dragon"
                    11
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            -- Special: "Immune to Cold, Breathes Ice"
            YoungWhiteDragon ->
                make "Young White Dragon"
                    11
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Immune to Lightning, Breathes Lightning"
            YoungBlueDragon ->
                make "Young Blue Dragon"
                    11
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            -- Special: "Immune to Fire, Breathes Fire"
            YoungRedDragon ->
                make "Young Red Dragon"
                    11
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            AnimatedBronzeStatue ->
                make "Animated Bronze Statue"
                    11
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Arrow"
            EvilWarrior ->
                make "Evil Warrior"
                    11
                    (Attributes 0 50 50 50 50)
                    []

            WolfMan ->
                make "Wolf Man"
                    12
                    (Attributes 0 50 50 50 50)
                    []

            CaveBear ->
                make "Cave Bear"
                    12
                    (Attributes 0 50 50 50 50)
                    []

            Berserker ->
                make "Berserker"
                    13
                    (Attributes 0 50 50 50 50)
                    []

            AnimatedIronStatue ->
                make "Animated Iron Statue"
                    13
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            TunnelWight ->
                make "Tunnel Wight"
                    13
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            -- Special: "Immune to Lightning, Breathes Lightning"
            YoungAdultBlueDragon ->
                make "Young Adult Blue Dragon"
                    15
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            -- Special: "Immune to Poison, Breathes Poison Gas"
            YoungAdultGreenDragon ->
                make "Young Adult Green Dragon"
                    15
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            -- Special: "Immune to Cold, Breathes Ice"
            YoungAdultWhiteDragon ->
                make "Young Adult White Dragon"
                    15
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Drains Intelligence and Mana Permanently"
            PaleWraith ->
                make "Pale Wraith"
                    14
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            BarrowWight ->
                make "Barrow Wight"
                    14
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            BearMan ->
                make "Bear-Man"
                    14
                    (Attributes 0 50 50 50 50)
                    []

            DustElemental ->
                make "Dust Elemental"
                    15
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Throws Stones"
            HillGiant ->
                make "Hill Giant"
                    15
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Immune to Fire, Breathes Fire"
            YoungAdultRedDragon ->
                make "Young Adult Red Dragon"
                    15
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Wizard ->
                make "Wizard"
                    18
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Spell ]

            BullMan ->
                make "Bull-Man"
                    16
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Drains Strength, Constitution, and Dexterity Permanently"
            CastleWight ->
                make "Castle Wight"
                    14
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            -- Special: "Drains Intelligence and Mana Permanently"
            DarkWraith ->
                make "Dark Wraith"
                    15
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            IceElemental ->
                make "Ice Elemental"
                    16
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            Spectre ->
                make "Spectre"
                    17
                    (Attributes 0 50 50 50 50)
                    []

            AnimatedMarbleStatue ->
                make "Animated Marble Statue"
                    18
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Immune to Lightning, Breathes Lightning"
            AdultBlueDragon ->
                make "Adult Blue Dragon"
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            -- Special: "Immune to Poison, Breathes Poison Gas"
            AdultGreenDragon ->
                make "Adult Green Dragon"
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            -- Special: "Immune to Cold, Breathes Ice"
            AdultWhiteDragon ->
                make "Adult White Dragon"
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            AirElemental ->
                make "Air Elemental"
                    16
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            MagmaElemental ->
                make "Magma Elemental"
                    18
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Throws Stones"
            StoneGiant ->
                make "Stone Giant"
                    19
                    (Attributes 0 50 50 50 50)
                    []

            TwoHeadedGiant ->
                make "Two Headed Giant"
                    21
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Immune to Fire, Breathes Fire"
            AdultRedDragon ->
                make "Adult Red Dragon"
                    24
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            FireElemental ->
                make "Fire Elemental"
                    20
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Throws Iceballs"
            FrostGiant ->
                make "Frost Giant"
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "SuBaseons Spiked Devil"
            SpikedDevil ->
                make "Spiked Devil"
                    20
                    (Attributes 0 50 50 50 50)
                    []

            WaterElemental ->
                make "Water Elemental"
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            EarthElemental ->
                make "Earth Elemental"
                    19
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Casts Bolt Spells, Slow, SuBaseon Monster, Phase Door, Teleport"
            Necromancer ->
                make "Necromancer"
                    16
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Spell ]

            -- Special: "Drains HP Permanently"
            Vampire ->
                make "Vampire"
                    20
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            -- Special: "Drains Intelligence and Mana Permanently"
            AbyssWraith ->
                make "Abyss Wraith"
                    21
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            -- Special: "Throws Boulders"
            Utgardhalok ->
                make "Utgardhalok"
                    25
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ranged ]

            -- Special: "Throws Stones"
            FireGiant ->
                make "Fire Giant"
                    21
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire, Ranged ]

            -- Special: "Immune to Lightning, Breathes Lightning"
            OldBlueDragon ->
                make "Old Blue Dragon"
                    28
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            -- Special: "Immune to Poison, Breathes Poison Gas"
            OldGreenDragon ->
                make "Old Green Dragon"
                    28
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            -- Special: "Immune to Cold, Breathes Ice"
            OldWhiteDragon ->
                make "Old White Dragon"
                    28
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "SuBaseons Horned Devil"
            HornedDevil ->
                make "Horned Devil"
                    23
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Melee, Fire ]

            -- Special: "Immune to Fire, Breathes Fire"
            OldRedDragon ->
                make "Old Red Dragon"
                    28
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Throws stones"
            Rungnir ->
                make "Rungnir"
                    15
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ranged ]

            -- Special: "SuBaseons Ice Devil"
            IceDevil ->
                make "Ice Devil"
                    23
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Throws Iceballs"
            Thrym ->
                make "Thrym"
                    25
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Immune to Poison, Breathes Poison Gas"
            VeryOldGreenDragon ->
                make "Very Old Green Dragon"
                    32
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            -- Special: "Immune to Cold, Breathes Ice"
            VeryOldWhiteDragon ->
                make "Very Old White Dragon"
                    32
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Immune to Lightning, Breathes Lightning"
            VeryOldBlueDragon ->
                make "Very Old Blue Dragon"
                    32
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            -- Special: "SuBaseons Spiked Devil or Abyss Fiend"
            AbyssFiend ->
                make "Abyss Fiend"
                    26
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Throws Stones"
            Thiassa ->
                make "Thiassa"
                    26
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ranged ]

            -- Special: "Immune to Fire, Breathes Fire"
            VeryOldRedDragon ->
                make "Very Old Red Dragon"
                    32
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Immune to Poison, Breathes Poison Gas"
            AncientGreenDragon ->
                make "Ancient Green Dragon"
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            -- Special: "Immune to Cold, Breathes Ice"
            AncientWhiteDragon ->
                make "Ancient White Dragon"
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Immune to Lightning, Breathes Lightning"
            AncientBlueDragon ->
                make "Ancient Blue Dragon"
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            -- Special: "Immune to Fire, Breathes Fire"
            AncientRedDragon ->
                make "Ancient Red Dragon"
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Casts Fire, Lighting, and Wind Spells"
            Sultur ->
                make "Sultur"
                    40
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Melee, Spell, Fire, Lightning, Ice ]


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
    , WhiteWolf
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
--    , WhiteWolf
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
