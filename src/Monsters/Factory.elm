module Monsters.Factory
    exposing
        ( make
        , makeForArena
        , makeRandomMonsters
        )

{-| The factory is a helper module for making monsters based on the monster type.
-}

import Attributes exposing (Attributes)
import Equipment exposing (Equipment)
import Item.Data as ItemData exposing (..)
import Item.Item as Item exposing (Item)
import Monsters.Model as Model exposing (Monster)
import Monsters.Types exposing (..)
import Random.Pcg as Random exposing (Generator)
import Stats exposing (Stats)
import String.Extra as StringX
import Types exposing (..)
import Utils.IdGenerator as IdGenerator exposing (ID)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)


{-| Give a list of positions, fill those places in with random monsters
-}
makeRandomMonsters : List Vector -> Generator (List Monster)
makeRandomMonsters positions =
    List.foldl randomMonstersReducer (Random.constant []) positions


randomMonstersReducer : Vector -> Generator (List Monster) -> Generator (List Monster)
randomMonstersReducer position monsters =
    randomMonster position
        |> (\monster -> Random.map2 (::) monster monsters)


randomMonster : Vector -> Generator Monster
randomMonster position =
    Misc.shuffle monsterTypesToList
        |> Random.map (List.head)
        |> Random.map (Maybe.withDefault GiantRat)
        |> Random.map (flip make position)


weaponSlot : WeaponType -> ( Equipment.EquipmentSlot, Item )
weaponSlot weaponType =
    ( Equipment.WeaponSlot, Item.new (ItemTypeWeapon weaponType) IdGenerator.empty )


armourSlot : ArmourType -> ( Equipment.EquipmentSlot, Item )
armourSlot armourType =
    ( Equipment.ArmourSlot, Item.new (ItemTypeArmour armourType) IdGenerator.empty )


makeShield : ShieldType -> Item
makeShield shieldType =
    Item.new (ItemTypeShield shieldType) IdGenerator.empty


basicEquipment : WeaponType -> ArmourType -> Equipment
basicEquipment weapon armour =
    Equipment.setMany_
        [ weaponSlot weapon
        , armourSlot armour
        ]
        Equipment.init


makeForArena : MonsterType -> Monster
makeForArena monsterType =
    make monsterType ( 0, 0 )


leatherEquipment : Equipment
leatherEquipment =
    Equipment.setMany_
        [ ( Equipment.ArmourSlot, Item.new (ItemTypeArmour LeatherArmour) IdGenerator.empty )
        , ( Equipment.HelmetSlot, Item.new (ItemTypeHelmet LeatherHelmet) IdGenerator.empty )
        , ( Equipment.GauntletsSlot, Item.new (ItemTypeGauntlets NormalGauntlets) IdGenerator.empty )
        , ( Equipment.BracersSlot, Item.new (ItemTypeBracers NormalBracers) IdGenerator.empty )
        ]
        Equipment.init


ironEquipment : Equipment
ironEquipment =
    Equipment.setMany_
        [ ( Equipment.ArmourSlot, Item.new (ItemTypeArmour ChainMail) IdGenerator.empty )
        , ( Equipment.HelmetSlot, Item.new (ItemTypeHelmet IronHelmet) IdGenerator.empty )
        , ( Equipment.GauntletsSlot, Item.new (ItemTypeGauntlets NormalGauntlets) IdGenerator.empty )
        , ( Equipment.BracersSlot, Item.new (ItemTypeBracers NormalBracers) IdGenerator.empty )
        ]
        Equipment.init


plateEquipment : Equipment
plateEquipment =
    Equipment.setMany_
        [ ( Equipment.ArmourSlot, Item.new (ItemTypeArmour PlateArmour) IdGenerator.empty )
        , ( Equipment.HelmetSlot, Item.new (ItemTypeHelmet MeteoricSteelHelmet) IdGenerator.empty )
        , ( Equipment.GauntletsSlot, Item.new (ItemTypeGauntlets NormalGauntlets) IdGenerator.empty )
        , ( Equipment.BracersSlot, Item.new (ItemTypeBracers NormalBracers) IdGenerator.empty )
        ]
        Equipment.init


make_ : Attributes -> MonsterType -> Monster
make_ attributes monsterType =
    { name = StringX.toTitleCase (toString monsterType)
    , type_ = Types.Monster
    , monsterType = monsterType
    , position = ( 0, 0 )
    , stats = Stats.init attributes
    , attributes = attributes
    , equipment = Equipment.init
    , expLevel = 1
    , bodySize = Types.Medium
    , attackTypes = [ Melee ]
    , attacks = 1
    , speed = 100
    , visible = Hidden
    }


makeHumanoid : MonsterType -> Monster
makeHumanoid =
    make_ (Attributes 0 50 50 50 50)
        >> Model.setBodySize Types.Medium
        >> Model.setEquipment leatherEquipment


makeGiantInsect : MonsterType -> Monster
makeGiantInsect =
    make_ (Attributes 0 75 50 40 10)
        >> Model.setEquipment (basicEquipment Pincers Shell)
        >> Model.setBodySize Types.Large


makeCanine : MonsterType -> Monster
makeCanine =
    make_ (Attributes 0 50 80 40 40)
        >> Model.setEquipment (basicEquipment SmallBite ToughHide)
        >> Model.setBodySize Types.Small


makeSmallAnimal : MonsterType -> Monster
makeSmallAnimal =
    make_ (Attributes 0 40 60 60 30)
        >> Model.setEquipment (basicEquipment SmallClaws SoftHide)
        >> Model.setBodySize Types.Small


makeLargeAnimal : MonsterType -> Monster
makeLargeAnimal =
    make_ (Attributes 0 80 60 80 30)
        >> Model.setEquipment (basicEquipment LargeClaws ToughHide)
        >> Model.setBodySize Types.Large


makeUndead : MonsterType -> Monster
makeUndead =
    make_ (Attributes 0 100 50 100 50)


makeAnimalMen : MonsterType -> Monster
makeAnimalMen =
    make_ (Attributes 0 75 60 60 30)
        >> Model.setEquipment leatherEquipment


makeCaster : MonsterType -> Monster
makeCaster =
    make_ (Attributes 0 25 50 50 150)
        >> Model.setAttackTypes [ Spell ]


makeElemental : MonsterType -> Monster
makeElemental =
    make_ (Attributes 0 100 60 100 50)


makeDevil : MonsterType -> Monster
makeDevil =
    make_ (Attributes 0 90 75 90 80)


makeGiant : MonsterType -> Monster
makeGiant =
    make_ (Attributes 0 200 40 200 50)
        >> Model.setBodySize Huge
        >> Model.setEquipment leatherEquipment


makeDragon : MonsterType -> Monster
makeDragon =
    make_ (Attributes 0 300 100 300 100)
        >> Model.setBodySize Huge


makeStatue : MonsterType -> Monster
makeStatue =
    make_ (Attributes 0 50 50 75 50)


make : MonsterType -> Vector -> Monster
make monsterType position =
    let
        addPosition makeFn monsterType =
            makeFn monsterType
                |> Model.setPosition position
    in
        case monsterType of
            -----------
            -- Other --
            -----------
            GreenSlime ->
                make_ (Attributes 0 50 50 75 50) GreenSlime
                    |> Model.setAttackTypes [ Acid ]
                    |> Model.setPosition position

            GelatinousGlob ->
                make_ (Attributes 0 75 75 100 50) GelatinousGlob
                    |> Model.setAttackTypes [ Steal ]
                    |> Model.setPosition position

            ------------
            -- Statue --
            ------------
            AnimatedWoodenStatue ->
                addPosition makeStatue AnimatedWoodenStatue
                    |> Model.scaleAttributes 0.75 1 0.75 1

            AnimatedBronzeStatue ->
                addPosition makeStatue AnimatedBronzeStatue

            AnimatedIronStatue ->
                addPosition makeStatue AnimatedIronStatue
                    |> Model.scaleAttributes 1.5 1 1 1

            AnimatedMarbleStatue ->
                addPosition makeStatue AnimatedMarbleStatue
                    |> Model.scaleAttributes 1.5 0.8 2 1

            ---------------
            -- Humanoids --
            ---------------
            Kobold ->
                addPosition makeHumanoid Kobold
                    |> Model.scaleAttributes 0.5 1.5 0.5 1
                    |> Model.setBodySize Types.Small
                    |> Model.setAttackTypes [ Melee, Ranged ]
                    |> Model.setEquipmentSlot (weaponSlot Crossbow)

            Goblin ->
                addPosition makeHumanoid Goblin
                    |> Model.scaleAttributes 0.5 1 0.6 1
                    |> Model.setBodySize Types.Small
                    |> Model.setEquipmentSlot (weaponSlot Club)

            Hobgoblin ->
                addPosition makeHumanoid Hobgoblin
                    |> Model.scaleAttributes 0.7 1 0.7 1
                    |> Model.setEquipmentSlot (weaponSlot Spear)

            Bandit ->
                addPosition makeHumanoid Bandit
                    |> Model.setEquipmentSlot (weaponSlot Bow)
                    |> Model.setAttackTypes [ Ranged ]

            SmirkingSneakThief ->
                addPosition makeHumanoid SmirkingSneakThief
                    |> Model.setAttackTypes [ Steal ]

            EvilWarrior ->
                addPosition makeHumanoid EvilWarrior
                    |> Model.scaleAttributes 1.5 1.5 1.5 1
                    |> Model.setEquipment ironEquipment
                    |> Model.setEquipmentSlot (weaponSlot BastardSword)

            -------------
            -- Insects --
            -------------
            GiantScorpion ->
                addPosition makeGiantInsect GiantScorpion
                    |> Model.setAttackTypes [ Poison, Melee ]
                    |> Model.scaleAttributes 1.0 1.2 1.0 1.0

            GiantTrapdoorSpider ->
                addPosition makeGiantInsect GiantTrapdoorSpider

            CarrionCreeper ->
                addPosition makeGiantInsect CarrionCreeper
                    |> Model.scaleAttributes 1.0 1.0 1.5 1.0

            ------------
            -- Wolves --
            ------------
            WildDog ->
                addPosition makeCanine WildDog
                    |> Model.scaleAttributes 0.8 0.8 0.5 1

            GrayWolf ->
                addPosition makeCanine GrayWolf

            WhiteWolf ->
                addPosition makeCanine WhiteWolf
                    |> Model.setAttacks 2

            -------------
            -- Animals --
            -------------
            GiantRat ->
                addPosition makeSmallAnimal GiantRat

            GiantBat ->
                addPosition makeSmallAnimal GiantBat
                    |> Model.scaleAttributes 0.8 1.2 1 1

            LargeSnake ->
                addPosition makeSmallAnimal LargeSnake
                    |> Model.scaleAttributes 0.5 1 0.7 1
                    |> Model.setEquipment (basicEquipment Fangs SoftHide)
                    |> Model.setBodySize Types.Tiny
                    |> Model.setAttackTypes [ Poison ]

            Viper ->
                addPosition makeSmallAnimal Viper
                    |> Model.scaleAttributes 0.5 1.5 0.5 1.5
                    |> Model.setEquipment (basicEquipment Fangs SoftHide)
                    |> Model.setBodySize Types.Tiny
                    |> Model.setAttackTypes [ Poison ]
                    |> Model.setAttacks 2

            HugeLizard ->
                addPosition makeLargeAnimal HugeLizard

            GiantRedAnt ->
                addPosition makeLargeAnimal GiantRedAnt
                    |> Model.setEquipment (basicEquipment Pincers Shell)

            GruesomeTroll ->
                addPosition makeLargeAnimal GruesomeTroll
                    |> Model.scaleAttributes 1.5 1 1 1

            BrownBear ->
                addPosition makeLargeAnimal BrownBear
                    |> Model.scaleAttributes 0.8 1.2 1 1

            CaveBear ->
                addPosition makeLargeAnimal CaveBear
                    |> Model.scaleAttributes 1.2 1.2 1.2 1

            Manticore ->
                addPosition makeLargeAnimal Manticore
                    |> Model.scaleAttributes 2 1 1.5 1
                    |> Model.setAttackTypes [ Melee, Poison ]
                    |> Model.setAttacks 3

            -------------
            -- Undeads --
            -------------
            Skeleton ->
                addPosition makeUndead Skeleton
                    |> Model.scaleAttributes 0.6 0.8 0.5 0.2
                    |> Model.setEquipment (basicEquipment ShortSword Bones)

            WalkingCorpse ->
                addPosition makeUndead WalkingCorpse
                    |> Model.scaleAttributes 0.6 0.8 0.75 0.2
                    |> Model.setEquipment (basicEquipment SmallClaws SoftHide)

            Shadow ->
                addPosition makeUndead Shadow
                    |> Model.scaleAttributes 0.8 1 1 0.5
                    |> Model.setEquipmentSlot (weaponSlot BroadSword)

            EerieGhost ->
                addPosition makeUndead EerieGhost
                    |> Model.scaleAttributes 1 1.2 1.2 1

            BarrowWight ->
                addPosition makeUndead BarrowWight
                    |> Model.scaleAttributes 1.2 1.2 1.2 0.8
                    |> Model.setAttackTypes [ Drain ]

            DarkWraith ->
                addPosition makeUndead DarkWraith
                    |> Model.scaleAttributes 50 50 50 50
                    |> Model.setAttackTypes [ Drain ]

            Spectre ->
                addPosition makeUndead Spectre
                    |> Model.scaleAttributes 1.5 1.5 2 1.2

            Vampire ->
                addPosition makeUndead Vampire
                    |> Model.scaleAttributes 2 2 2 2
                    |> Model.setAttackTypes [ Drain ]

            ----------------
            -- Animan men --
            ----------------
            RatMan ->
                addPosition makeAnimalMen RatMan
                    |> Model.scaleAttributes 1 1.2 1 2
                    |> Model.setEquipment (basicEquipment LargeClaws ToughHide)

            BearMan ->
                addPosition makeAnimalMen BearMan
                    |> Model.scaleAttributes 1.5 1 1.5 0.5
                    |> Model.setEquipment (basicEquipment Flail ToughHide)

            BullMan ->
                addPosition makeAnimalMen BullMan
                    |> Model.scaleAttributes 2 1 2 0.5
                    |> Model.setEquipment (basicEquipment BattleAxe ToughHide)

            WolfMan ->
                addPosition makeAnimalMen WolfMan
                    |> Model.scaleAttributes 1 1.5 1 1
                    |> Model.setEquipment (basicEquipment MorningStar ToughHide)

            -------------
            -- Casters --
            -------------
            -- Special: "Casts Bolt Spells, Slow, summon Monster, Phase Door, Teleport"
            Wizard ->
                addPosition makeCaster Wizard
                    |> Model.scaleAttributes 50 50 50 50
                    |> Model.setAttackTypes [ Spell ]

            -- Special: "Casts Bolt Spells, Slow, summon Monster, Phase Door, Teleport"
            Necromancer ->
                addPosition makeCaster Necromancer
                    |> Model.scaleAttributes 50 50 50 50
                    |> Model.setAttackTypes [ Spell ]

            ----------------
            -- Elementals --
            ----------------
            DustElemental ->
                addPosition makeElemental DustElemental
                    |> Model.scaleAttributes 1 2 1 1

            IceElemental ->
                addPosition makeElemental IceElemental
                    |> Model.scaleAttributes 1.5 1 1.5 1
                    |> Model.setAttackTypes [ Ice ]

            WindElemental ->
                addPosition makeElemental WindElemental
                    |> Model.scaleAttributes 1 2 1 1
                    |> Model.setAttackTypes [ Lightning ]

            MagmaElemental ->
                addPosition makeElemental MagmaElemental
                    |> Model.scaleAttributes 2 1 1 1
                    |> Model.setAttackTypes [ Fire ]

            FireElemental ->
                addPosition makeElemental FireElemental
                    |> Model.scaleAttributes 2 1 1 1
                    |> Model.setAttackTypes [ Fire ]

            WaterElemental ->
                addPosition makeElemental WaterElemental
                    |> Model.scaleAttributes 1 1 2 1
                    |> Model.setAttackTypes [ Ice ]

            EarthElemental ->
                addPosition makeElemental EarthElemental
                    |> Model.scaleAttributes 2 1 2 1
                    |> Model.setBodySize Large

            ------------
            -- Devils --
            ------------
            SpikedDevil ->
                addPosition makeDevil SpikedDevil
                    |> Model.scaleAttributes 1 1 1 1
                    |> Model.setBodySize Small
                    |> Model.setAttackTypes [ Spell, Melee ]

            HornedDevil ->
                addPosition makeDevil HornedDevil
                    |> Model.scaleAttributes 1 1 1 1
                    |> Model.setAttackTypes [ Fire, Spell ]

            IceDevil ->
                addPosition makeDevil IceDevil
                    |> Model.scaleAttributes 1 1 1 1
                    |> Model.setAttackTypes [ Ice, Spell ]

            AbyssFiend ->
                addPosition makeDevil AbyssFiend
                    |> Model.scaleAttributes 2 2 2 2
                    |> Model.setEquipment (basicEquipment LargeClaws ToughHide)
                    |> Model.setAttacks 2
                    |> Model.setAttackTypes [ Fire, Lightning, Spell ]

            ------------
            -- Giants --
            ------------
            HugeOgre ->
                addPosition makeGiant HugeOgre
                    |> Model.scaleAttributes 0.9 1 0.8 0.5
                    |> Model.setEquipmentSlot (weaponSlot Pike)

            HillGiant ->
                addPosition makeGiant HillGiant
                    |> Model.setEquipmentSlot (weaponSlot LargeClub)

            StoneGiant ->
                addPosition makeGiant StoneGiant
                    |> Model.scaleAttributes 1.2 1 1.5 0.5
                    |> Model.setEquipmentSlot (weaponSlot StoneClub)

            FrostGiant ->
                addPosition makeGiant FrostGiant
                    |> Model.scaleAttributes 1 1.5 1 1
                    |> Model.setAttackTypes [ Ice ]
                    |> Model.setEquipmentSlot (weaponSlot GiantAxe)

            TwoHeadedGiant ->
                addPosition makeGiant TwoHeadedGiant
                    |> Model.scaleAttributes 1 2 2 1
                    |> Model.setAttackTypes [ Ranged, Melee ]
                    |> Model.setEquipmentSlot (weaponSlot Boulder)

            FireGiant ->
                addPosition makeGiant FireGiant
                    |> Model.scaleAttributes 1 1 1 1
                    |> Model.setAttackTypes [ Fire ]
                    |> Model.setEquipment ironEquipment
                    |> Model.setEquipmentSlot (weaponSlot TwoHandedSword)

            HillGiantKing ->
                addPosition makeGiant HillGiantKing
                    |> Model.scaleAttributes 2 1 2 1
                    |> Model.setEquipment plateEquipment
                    |> Model.setEquipmentSlot (weaponSlot GiantMaul)

            FireGiantKing ->
                addPosition makeGiant FireGiantKing
                    |> Model.scaleAttributes 2 1 2 1
                    |> Model.setAttackTypes [ Fire ]
                    |> Model.setEquipment plateEquipment

            FrostGiantKing ->
                addPosition makeGiant FrostGiantKing
                    |> Model.scaleAttributes 2 1 2 1
                    |> Model.setAttackTypes [ Ice ]
                    |> Model.setEquipment plateEquipment

            StoneGiantKing ->
                addPosition makeGiant StoneGiantKing
                    |> Model.scaleAttributes 3 1 4 1
                    |> Model.setAttackTypes [ Ranged ]
                    |> Model.setEquipment plateEquipment
                    |> Model.setEquipmentSlot (weaponSlot Boulder)

            -------------
            -- Dragons --
            -------------
            GreenDragon ->
                addPosition makeDragon GreenDragon
                    |> Model.setAttackTypes [ Acid ]

            WhiteDragon ->
                addPosition makeDragon WhiteDragon
                    |> Model.setAttackTypes [ Ice ]

            BlueDragon ->
                addPosition makeDragon BlueDragon
                    |> Model.setAttackTypes [ Lightning ]

            RedDragon ->
                addPosition makeDragon RedDragon
                    |> Model.setAttackTypes [ Fire ]

            Surtur ->
                make_ (Attributes 0 400 100 1000 200) Surtur
                    |> Model.setEquipment plateEquipment
                    |> Model.setAttackTypes [ Melee, Spell, Fire, Lightning, Ice, Acid, Drain, Ranged, Poison ]
                    |> Model.setAttacks 3
                    |> Model.setPosition position



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
