module Monster
    exposing
        ( Monster
        , MonsterType(..)
        , make
        , makeForArena
        , types
        , view
        , update
        , remove
        , randomMonsters
        )

import Attributes exposing (Attributes)
import Equipment exposing (Equipment)
import Html exposing (..)
import Html.Attributes as HA
import Item.Data as ItemData
import Item.Item as Item exposing (Item)
import Maybe
import Random.Pcg as Random exposing (Generator)
import Stats exposing (Stats)
import String.Extra as StringX
import Types exposing (..)
import Utils.IdGenerator as IdGenerator exposing (ID)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)


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
    , visible : Visibility
    }


setName : String -> Monster -> Monster
setName val monster =
    { monster | name = val }


setType_ : Types.CreatureType -> Monster -> Monster
setType_ val monster =
    { monster | type_ = val }


setCss : String -> Monster -> Monster
setCss val monster =
    { monster | css = val }


setPosition : Vector -> Monster -> Monster
setPosition val monster =
    { monster | position = val }


setStats : Stats -> Monster -> Monster
setStats val monster =
    { monster | stats = val }


setAttributes : Attributes -> Monster -> Monster
setAttributes val monster =
    { monster | attributes = val }


setEquipment : Equipment -> Monster -> Monster
setEquipment val monster =
    { monster | equipment = val }


setExpLevel : Int -> Monster -> Monster
setExpLevel val monster =
    { monster | expLevel = val }


setBodySize : Types.BodySize -> Monster -> Monster
setBodySize val monster =
    { monster | bodySize = val }


setAttackTypes : List AttackType -> Monster -> Monster
setAttackTypes val monster =
    { monster | attackTypes = val }


setAttacks : Int -> Monster -> Monster
setAttacks val monster =
    { monster | attacks = val }


setSpeed : Int -> Monster -> Monster
setSpeed val monster =
    { monster | speed = val }


setVisible : Visibility -> Monster -> Monster
setVisible val monster =
    { monster | visible = val }


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
    div [ HA.style (Misc.vectorToHtmlStyle position), HA.class ("tile monster " ++ css) ] []


makeForArena : MonsterType -> Monster
makeForArena monsterType =
    make monsterType ( 0, 0 )


randomMonsters : List Vector -> Generator (List Monster)
randomMonsters positions =
    List.foldl randomMonstersReducer (Random.constant []) positions


randomMonstersReducer : Vector -> Generator (List Monster) -> Generator (List Monster)
randomMonstersReducer position monsters =
    randomMonster position
        |> (\monster -> Random.map2 (::) monster monsters)


randomMonster : Vector -> Generator Monster
randomMonster position =
    Misc.shuffle types
        |> Random.map (List.head)
        |> Random.map (Maybe.withDefault GiantRat)
        |> Random.map (flip make position)


update : Monster -> List Monster -> List Monster
update monster monsters =
    monster :: remove monster monsters


remove : Monster -> List Monster -> List Monster
remove monster monsters =
    List.filter (\x -> monster.position /= x.position) monsters


make : MonsterType -> Vector -> Monster
make monsterType position =
    let
        makeEquipment equipment =
            Equipment.equipMany equipment Equipment.init

        init monsterType level attributes itemSlotPair =
            { name = StringX.toTitleCase (toString monsterType)
            , type_ = Types.Monster
            , css = monsterTypeToCSS monsterType
            , position = position
            , stats = Stats.initExperienced attributes level
            , attributes = attributes
            , equipment = makeEquipment itemSlotPair
            , expLevel = level
            , bodySize = Types.Medium
            , attackTypes = [ Melee ]
            , attacks = 1
            , speed = 100
            , visible = Hidden
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
            -- Misc
            GreenSlime ->
                init GreenSlime
                    6
                    (Attributes 0 50 50 90 50)
                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)
                    |> setAttackTypes [ Acid ]

            GelatinousGlob ->
                init GelatinousGlob
                    7
                    (Attributes 0 50 50 50 50)
                    []

            LargeSnake ->
                init LargeSnake
                    2
                    (Attributes 0 20 70 30 30)
                    (basicEquipment ItemData.Fangs ItemData.SoftHide)
                    |> setBodySize Types.Tiny
                    |> setAttackTypes [ Poison ]

            Viper ->
                init Viper
                    3
                    (Attributes 0 20 80 20 30)
                    (basicEquipment ItemData.Fangs ItemData.SoftHide)
                    |> setBodySize Types.Tiny
                    |> setAttackTypes [ Poison ]

            Manticore ->
                init Manticore
                    10
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Melee, Poison ]

            GruesomeTroll ->
                init GruesomeTroll
                    10
                    (Attributes 0 50 50 50 50)
                    []

            -- Humanoids --
            Kobold ->
                init Kobold
                    2
                    (Attributes 0 30 60 30 50)
                    (weaponSlot ItemData.Crossbow :: leatherEquipment)
                    |> setBodySize Types.Small
                    |> setAttackTypes [ Melee, Ranged ]

            Goblin ->
                init Goblin
                    1
                    (Attributes 0 40 60 50 20)
                    (weaponSlot ItemData.Club :: leatherEquipment)
                    |> setBodySize Types.Small

            Hobgoblin ->
                init Hobgoblin
                    2
                    (Attributes 0 50 60 50 50)
                    (weaponSlot ItemData.Spear :: leatherEquipment)

            Bandit ->
                init Bandit
                    4
                    (Attributes 0 60 75 60 50)
                    (weaponSlot ItemData.Bow :: leatherEquipment)
                    |> setAttackTypes [ Ranged ]

            SmirkingSneakThief ->
                init SmirkingSneakThief
                    7
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Steal ]

            EvilWarrior ->
                init EvilWarrior
                    11
                    (Attributes 0 50 50 50 50)
                    []

            -------------
            -- Insects --
            -------------
            GiantScorpion ->
                init GiantScorpion
                    6
                    (Attributes 0 75 50 60 50)
                    (basicEquipment ItemData.Pincers ItemData.Shell)
                    |> setBodySize Types.Large
                    |> setAttackTypes [ Poison ]

            GiantTrapdoorSpider ->
                init GiantTrapdoorSpider
                    5
                    (Attributes 0 60 60 60 30)
                    (basicEquipment ItemData.Pincers ItemData.Shell)
                    |> setBodySize Types.Large

            CarrionCreeper ->
                init CarrionCreeper
                    7
                    (Attributes 0 50 50 50 50)
                    []

            ------------
            -- Wolves --
            ------------
            WildDog ->
                init WildDog
                    3
                    (Attributes 0 50 75 30 30)
                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)
                    |> setBodySize Types.Small

            GrayWolf ->
                init GrayWolf
                    6
                    (Attributes 0 60 80 50 50)
                    (basicEquipment ItemData.SmallBite ItemData.ToughHide)
                    |> setBodySize Types.Small

            WhiteWolf ->
                init WhiteWolf
                    6
                    (Attributes 0 60 80 50 50)
                    (basicEquipment ItemData.SmallBite ItemData.ToughHide)
                    |> setBodySize Types.Small
                    |> setAttacks 2

            -- Animals
            GiantRat ->
                init GiantRat
                    1
                    (Attributes 0 40 50 50 5)
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
                    |> setBodySize Types.Small

            GiantBat ->
                init GiantBat
                    1
                    (Attributes 0 30 70 40 10)
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
                    |> setBodySize Types.Small

            HugeLizard ->
                init HugeLizard
                    5
                    (Attributes 0 70 65 60 30)
                    (basicEquipment ItemData.LargeClaws ItemData.ToughHide)
                    |> setBodySize Types.Large

            GiantRedAnt ->
                init GiantRedAnt
                    4
                    (Attributes 0 80 50 60 40)
                    (basicEquipment ItemData.Pincers ItemData.Shell)
                    |> setBodySize Types.Large

            BrownBear ->
                init BrownBear
                    9
                    (Attributes 0 50 50 50 50)
                    []

            CaveBear ->
                init CaveBear
                    12
                    (Attributes 0 50 50 50 50)
                    []

            -------------
            -- Statues --
            -------------
            AnimatedBronzeStatue ->
                init AnimatedBronzeStatue
                    11
                    (Attributes 0 50 50 50 50)
                    []

            AnimatedWoodenStatue ->
                init AnimatedWoodenStatue
                    8
                    (Attributes 0 50 50 50 50)
                    []

            AnimatedIronStatue ->
                init AnimatedIronStatue
                    13
                    (Attributes 0 50 50 50 50)
                    []

            AnimatedMarbleStatue ->
                init AnimatedMarbleStatue
                    18
                    (Attributes 0 50 50 50 50)
                    []

            -------------
            -- Undeads --
            -------------
            Skeleton ->
                init Skeleton
                    3
                    (Attributes 0 60 65 40 10)
                    (basicEquipment ItemData.ShortSword ItemData.Bones)

            WalkingCorpse ->
                init WalkingCorpse
                    4
                    (Attributes 0 100 40 95 20)
                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)

            Shadow ->
                init Shadow
                    8
                    (Attributes 0 50 50 50 50)
                    []

            EerieGhost ->
                init EerieGhost
                    10
                    (Attributes 0 50 50 50 50)
                    []

            BarrowWight ->
                init BarrowWight
                    13
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            DarkWraith ->
                init DarkWraith
                    14
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            Spectre ->
                init Spectre
                    17
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Drains HP Permanently"
            Vampire ->
                init Vampire
                    20
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Drain ]

            ----------------
            -- Animan men --
            ----------------
            RatMan ->
                init RatMan
                    5
                    (Attributes 0 60 60 60 60)
                    (basicEquipment ItemData.MorningStar ItemData.ToughHide)

            BearMan ->
                init BearMan
                    14
                    (Attributes 0 50 50 50 50)
                    []

            BullMan ->
                init BullMan
                    16
                    (Attributes 0 50 50 50 50)
                    []

            WolfMan ->
                init WolfMan
                    12
                    (Attributes 0 50 50 50 50)
                    []

            -------------
            -- Casters --
            -------------
            -- Special: "Casts Bolt Spells, Slow, summon Monster, Phase Door, Teleport"
            Wizard ->
                init Wizard
                    18
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Spell ]

            -- Special: "Casts Bolt Spells, Slow, summon Monster, Phase Door, Teleport"
            Necromancer ->
                init Necromancer
                    16
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Spell ]

            ----------------
            -- Elementals --
            ----------------
            DustElemental ->
                init DustElemental
                    15
                    (Attributes 0 50 50 50 50)
                    []

            IceElemental ->
                init IceElemental
                    16
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            WindElemental ->
                init WindElemental
                    16
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            MagmaElemental ->
                init MagmaElemental
                    18
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Immune to Fire, Breathes Fire"
            FireElemental ->
                init FireElemental
                    20
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            WaterElemental ->
                init WaterElemental
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            EarthElemental ->
                init EarthElemental
                    19
                    (Attributes 0 50 50 50 50)
                    []

            ------------
            -- Devils --
            ------------
            SpikedDevil ->
                init SpikedDevil
                    20
                    (Attributes 0 50 50 50 50)
                    []

            HornedDevil ->
                init HornedDevil
                    23
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Melee, Fire ]

            IceDevil ->
                init IceDevil
                    23
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            AbyssFiend ->
                init AbyssFiend
                    26
                    (Attributes 0 50 50 50 50)
                    []

            ------------
            -- Giants --
            ------------
            HugeOgre ->
                init HugeOgre
                    8
                    (Attributes 0 50 50 50 50)
                    []

            HillGiant ->
                init HillGiant
                    15
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Throws Stones"
            StoneGiant ->
                init StoneGiant
                    19
                    (Attributes 0 50 50 50 50)
                    []

            -- Special: "Throws Iceballs"
            FrostGiant ->
                init FrostGiant
                    19
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Throws Boulders"
            TwoHeadedGiant ->
                init TwoHeadedGiant
                    25
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ranged ]

            -- Special: "Throws Stones"
            FireGiant ->
                init FireGiant
                    21
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire, Ranged ]

            HillGiantKing ->
                init HillGiantKing
                    25
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            FireGiantKing ->
                init FireGiantKing
                    25
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Throws Iceballs"
            FrostGiantKing ->
                init FrostGiantKing
                    25
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            -- Special: "Throws Stones"
            StoneGiantKing ->
                init StoneGiantKing
                    26
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ranged ]

            -------------
            -- Dragons --
            -------------
            GreenDragon ->
                init GreenDragon
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Acid ]

            WhiteDragon ->
                init WhiteDragon
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Ice ]

            BlueDragon ->
                init BlueDragon
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Lightning ]

            RedDragon ->
                init RedDragon
                    35
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Fire ]

            -- Special: "Casts Fire, Lighting, and Wind Spells"
            Surtur ->
                init Surtur
                    40
                    (Attributes 0 50 50 50 50)
                    []
                    |> setAttackTypes [ Melee, Spell, Fire, Lightning, Ice ]


types : List MonsterType
types =
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



--1   name: "Giant Rat"                   Special: " "
--1   name: "Goblin"                      Special: " "
--2   name: "Giant Bat"                   Special: " "
--2   name: "Hobgoblin"                   Special: " "
--2   name: "Kobold"                      Special: " "
--3   name: "Large Snake"                 Special: " "
--3   name: "Skeleton"                    Special: " "
--3   name: "Wild Dog"                    Special: " "
--5   name: "Viper"                       Special: "Poison"
--6   name: "Goblin Fighter"              Special: " "
--7   name: "Giant Red Ant"               Special: " "
--7   name: "Walking Corpse"              Special: " "
--10  name: "Bandit"                      Special: "Arrow"
--10  name: "Giant Trapdoor Spider"       Special: " "
--10  name: "Huge Lizard"                 Special: " "
--10  name: "Rat-Man"                     Special: " "
--10  name: "Slime"                       Special: "Immune to Weapons"
--11  name: "Giant Scorpion"              Special: "Poison"
--11  name: "Gray Wolf"                   Special: " "
--14  name: "Gelantinous Glob"            Special: "Immune to Cold, Lightning"
--15  name: "Smirking Sneak Thief"        Special: "Steals from Belt and Purse, Teleports"
--16  name: "Carrion Creeper"             Special: " "
--16  name: "Huge Ogre"                   Special: " "
--16  name: "Shadow"                      Special: " "
--17  name: "Animated Wooden Statue"      Special: " "
--17  name: "Brown Bear"                  Special: " "
--18  name: "Young Green Dragon"          Special: "Immune to Poison, Breathes Poison Gas"
--18  name: "Young White Dragon"          Special: "Immune to Cold, Breathes Ice"
--19  name: "Manticore"                   Special: "Needles"
--20  name: "Eerie Ghost"                 Special: " "
--20  name: "Gruesome Troll"              Special: " "
--20  name: "Young Blue Dragon"           Special: "Immune to Lightning, Breathes Lightning"
--20  name: "Young Red Dragon"            Special: "Immune to Fire, Breathes Fire"
--25  name: "Animated Bronze Statue"      Special: " "
--25  name: "Evil Warrior"                Special: "Arrow"
--25  name: "Wolf-Man"                    Special: " "
--27  name: "Cave Bear"                   Special: " "
--28  name: "White Wolf"                  Special: " "
--30  name: "Berserker"                   Special: " "
--35  name: "Animated Iron Statue"        Special: " "
--35  name: "Tunnel Wight"                Special: "Drains Strength, Constitution, and Dexterity Permanently"
--35  name: "Young Adult Blue Dragon"     Special: "Immune to Lightning, Breathes Lightning"
--35  name: "Young Adult Green Dragon"    Special: "Immune to Poison, Breathes Poison Gas"
--35  name: "Young Adult White Dragon"    Special: "Immune to Cold, Breathes Ice"
--37  name: "Pale Wraith"                 Special: "Drains Intelligence and Mana Permanently"
--40  name: "Barrow Wight"                Special: "Drains Strength, Constitution, and Dexterity Permanently"
--40  name: "Bear-Man"                    Special: " "
--40  name: "Dust Elemental"              Special: " "
--40  name: "Hill Giant"                  Special: "Throws Stones"
--40  name: "Young Adult Red Dragon"      Special: "Immune to Fire, Breathes Fire"
--45  name: "Wizard"                      Special: "Casts Bolt Spells, Slow, Summon Monster, Phase Door, Teleport"
--50  name: "Bull-Man"                    Special: " "
--50  name: "Castle Wight"                Special: "Drains Strength, Constitution, and Dexterity Permanently"
--50  name: "Dark Wraith"                 Special: "Drains Intelligence and Mana Permanently"
--50  name: "Ice Elemental"               Special: " "
--50  name: "Spectre"                     Special: " "
--52  name: "Animated Marble Statue"      Special: " "
--55  name: "Adult Blue Dragon"           Special: "Immune to Lightning, Breathes Lightning"
--55  name: "Adult Green Dragon"          Special: "Immune to Poison, Breathes Poison Gas"
--55  name: "Adult White Dragon"          Special: "Immune to Cold, Breathes Ice"
--55  name: "Air Elemental"               Special: " "
--55  name: "Magma Elemental"             Special: " "
--55  name: "Stone Giant"                 Special: "Throws Stones"
--55  name: "Two Headed Giant"            Special: " "
--60  name: "Adult Red Dragon"            Special: "Immune to Fire, Breathes Fire"
--60  name: "Fire Elemental"              Special: " "
--60  name: "Frost Giant"                 Special: "Throws Iceballs"
--60  name: "Spiked Devil"                Special: "Summons Spiked Devil"
--60  name: "Water Elemental"             Special: " "
--65  name: "Earth Elemental"             Special: " "
--65  name: "Necromancer"                 Special: "Casts Bolt Spells, Slow, Summon Monster, Phase Door, Teleport"
--65  name: "Vampire"                     Special: "Drains HP Permanently"
--70  name: "Abyss Wraith"                Special: "Drains Intelligence and Mana Permanently"
--70  name: "Utgardhalok"                 Special: "Throws Boulders"
--75  name: "Fire Giant"                  Special: "Throws Stones"
--75  name: "Old Blue Dragon"             Special: "Immune to Lightning, Breathes Lightning"
--75  name: "Old Green Dragon"            Special: "Immune to Poison, Breathes Poison Gas"
--75  name: "Old White Dragon"            Special: "Immune to Cold, Breathes Ice"
--80  name: "Horned Devil"                Special: "Summons Horned Devil"
--80  name: "Old Red Dragon"              Special: "Immune to Fire, Breathes Fire"
--80  name: "Rungnir"                     Special: "Throws stones"
--85  name: "Ice Devil"                   Special: "Summons Ice Devil"
--90  name: "Thrym"                       Special: "Throws Iceballs"
--90  name: "Very Old Green Dragon"       Special: "Immune to Poison, Breathes Poison Gas"
--90  name: "Very Old White Dragon"       Special: "Immune to Cold, Breathes Ice"
--95  name: "Very Old Blue Dragon"        Special: "Immune to Lightning, Breathes Lightning"
--100 name: "Abyss Fiend"                 Special: "Summons Spiked Devil or Abyss Fiend"
--100 name: "Thiassa"                     Special: "Throws Stones"
--100 name: "Very Old Red Dragon"         Special: "Immune to Fire, Breathes Fire"
--105 name: "Ancient Green Dragon"        Special: "Immune to Poison, Breathes Poison Gas"
--105 name: "AncientWhite Dragon"         Special: "Immune to Cold, Breathes Ice"
--110 name: "Ancient Blue Dragon"         Special: "Immune to Lightning, Breathes Lightning"
--120 name: "Ancient Red Dragon"          Special: "Immune to Fire, Breathes Fire"
--344 name: "Sultur"                      Special: "Casts Fire, Lighting, and Wind Spells"
--


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
