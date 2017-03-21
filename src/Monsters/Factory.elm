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
import Item.Data as ItemData
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


weaponSlot : ItemData.WeaponType -> ( Equipment.EquipmentSlot, Item )
weaponSlot weaponType =
    ( Equipment.WeaponSlot, Item.new (ItemData.ItemTypeWeapon weaponType) IdGenerator.empty )


armourSlot : ItemData.ArmourType -> ( Equipment.EquipmentSlot, Item )
armourSlot armourType =
    ( Equipment.ArmourSlot, Item.new (ItemData.ItemTypeArmour armourType) IdGenerator.empty )


makeShield : ItemData.ShieldType -> Item
makeShield shieldType =
    Item.new (ItemData.ItemTypeShield shieldType) IdGenerator.empty


basicEquipment : ItemData.WeaponType -> ItemData.ArmourType -> Equipment
basicEquipment weapon armour =
    Equipment.equipMany
        [ weaponSlot weapon
        , armourSlot armour
        ]
        Equipment.init


basicShieldEquipment : ItemData.WeaponType -> ItemData.ShieldType -> ItemData.ArmourType -> Equipment
basicShieldEquipment weapon shield armour =
    let
        equipment =
            basicEquipment weapon armour
    in
        equipment
            |> Equipment.equip ( Equipment.ShieldSlot, makeShield shield )
            |> Result.withDefault equipment


makeForArena : MonsterType -> Monster
makeForArena monsterType =
    make monsterType ( 0, 0 )


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


makeGiantInsect : MonsterType -> Monster
makeGiantInsect =
    make_ (Attributes 0 75 50 40 10)
        >> Model.setEquipment (basicEquipment ItemData.Pincers ItemData.Shell)
        >> Model.setBodySize Types.Large


make : MonsterType -> Vector -> Monster
make monsterType position =
    let
        init monsterType level attributes equipment =
            make_ attributes monsterType
                |> Model.setEquipment equipment
                |> Model.setPosition position
                |> Model.setExpLevel level

        leatherEquipment =
            Equipment.equipMany
                [ ( Equipment.ArmourSlot, Item.new (ItemData.ItemTypeArmour ItemData.LeatherArmour) IdGenerator.empty )
                , ( Equipment.HelmetSlot, Item.new (ItemData.ItemTypeHelmet ItemData.LeatherHelmet) IdGenerator.empty )
                , ( Equipment.GauntletsSlot, Item.new (ItemData.ItemTypeGauntlets ItemData.NormalGauntlets) IdGenerator.empty )
                , ( Equipment.BracersSlot, Item.new (ItemData.ItemTypeBracers ItemData.NormalBracers) IdGenerator.empty )
                ]
                Equipment.init

        ironEquipment =
            Equipment.equipMany
                [ ( Equipment.ArmourSlot, Item.new (ItemData.ItemTypeArmour ItemData.ChainMail) IdGenerator.empty )
                , ( Equipment.HelmetSlot, Item.new (ItemData.ItemTypeHelmet ItemData.IronHelmet) IdGenerator.empty )
                , ( Equipment.GauntletsSlot, Item.new (ItemData.ItemTypeGauntlets ItemData.NormalGauntlets) IdGenerator.empty )
                , ( Equipment.BracersSlot, Item.new (ItemData.ItemTypeBracers ItemData.NormalBracers) IdGenerator.empty )
                ]
                Equipment.init
    in
        case monsterType of
            --            -----------
            --            -- Other --
            --            -----------
            --            GreenSlime ->
            --                init GreenSlime
            --                    (Attributes 0 50 50 90 50)
            --                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)
            --                    |> Model.setAttackTypes [ Acid ]
            --
            --            GelatinousGlob ->
            --                init GelatinousGlob
            --                    (Attributes 0 50 50 50 50)
            --
            --            ------------
            --            -- Statue --
            --            ------------
            --            AnimatedBronzeStatue ->
            --                init AnimatedBronzeStatue
            --                    (Attributes 0 50 50 50 50)
            --
            --            AnimatedWoodenStatue ->
            --                init AnimatedWoodenStatue
            --                    (Attributes 0 50 50 50 50)
            --
            --            AnimatedIronStatue ->
            --                init AnimatedIronStatue
            --                    (Attributes 0 50 50 50 50)
            --
            --            AnimatedMarbleStatue ->
            --                init AnimatedMarbleStatue
            --                    (Attributes 0 50 50 50 50)
            --
            --            ---------------
            --            -- Humanoids --
            --            ---------------
            --            Kobold ->
            --                init Kobold
            --                    (Attributes 0 30 60 30 50)
            --                    (weaponSlot ItemData.Crossbow :: leatherEquipment)
            --                    |> Model.setBodySize Types.Small
            --                    |> Model.setAttackTypes [ Melee, Ranged ]
            --
            --            Goblin ->
            --                init Goblin
            --                    (Attributes 0 40 60 50 20)
            --                    (weaponSlot ItemData.Club :: leatherEquipment)
            --                    |> Model.setBodySize Types.Small
            --
            --            Hobgoblin ->
            --                init Hobgoblin
            --                    (Attributes 0 50 60 50 50)
            --                    (weaponSlot ItemData.Spear :: leatherEquipment)
            --
            --            Bandit ->
            --                init Bandit
            --                    (Attributes 0 60 75 60 50)
            --                    (weaponSlot ItemData.Bow :: leatherEquipment)
            --                    |> Model.setAttackTypes [ Ranged ]
            --
            --            SmirkingSneakThief ->
            --                init SmirkingSneakThief
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Steal ]
            --
            --            GruesomeTroll ->
            --                init GruesomeTroll
            --                    (Attributes 0 50 50 50 50)
            --
            --            EvilWarrior ->
            --                init EvilWarrior
            --                    (Attributes 0 50 50 50 50)
            -------------
            -- Insects --
            -------------
            GiantScorpion ->
                makeGiantInsect GiantScorpion
                    |> Model.setAttackTypes [ Poison, Melee ]
                    |> Model.modifyAttributes identity ((*) 1.2) identity identity

            GiantTrapdoorSpider ->
                makeGiantInsect GiantTrapdoorSpider

            CarrionCreeper ->
                makeGiantInsect CarrionCreeper
                    |> Model.modifyAttributes identity identity ((*) 1.5) identity

            ------------
            -- Wolves --
            ------------
            --            WildDog ->
            --                init WildDog
            --                    (Attributes 0 50 75 30 30)
            --                    (basicEquipment ItemData.SmallBite ItemData.SoftHide)
            --                    |> Model.setBodySize Types.Small
            --
            --            GrayWolf ->
            --                init GrayWolf
            --                    (Attributes 0 60 80 50 50)
            --                    (basicEquipment ItemData.SmallBite ItemData.ToughHide)
            --                    |> Model.setBodySize Types.Small
            --
            --            WhiteWolf ->
            --                init WhiteWolf
            --                    (Attributes 0 60 80 50 50)
            --                    (basicEquipment ItemData.SmallBite ItemData.ToughHide)
            --                    |> Model.setBodySize Types.Small
            --                    |> Model.setAttacks 2
            --
            --            -- Animals
            --            GiantRat ->
            --                init GiantRat
            --                    (Attributes 0 40 50 50 5)
            --                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
            --                    |> Model.setBodySize Types.Small
            --
            --            GiantBat ->
            --                init GiantBat
            --                    (Attributes 0 30 70 40 10)
            --                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
            --                    |> Model.setBodySize Types.Small
            --
            --            LargeSnake ->
            --                init LargeSnake
            --                    (Attributes 0 20 70 30 30)
            --                    (basicEquipment ItemData.Fangs ItemData.SoftHide)
            --                    |> Model.setBodySize Types.Tiny
            --                    |> Model.setAttackTypes [ Poison ]
            --
            --            Viper ->
            --                init Viper
            --                    (Attributes 0 20 80 20 30)
            --                    (basicEquipment ItemData.Fangs ItemData.SoftHide)
            --                    |> Model.setBodySize Types.Tiny
            --                    |> Model.setAttackTypes [ Poison ]
            --
            --            HugeLizard ->
            --                init HugeLizard
            --                    (Attributes 0 70 65 60 30)
            --                    (basicEquipment ItemData.LargeClaws ItemData.ToughHide)
            --                    |> Model.setBodySize Types.Large
            --
            --            GiantRedAnt ->
            --                init GiantRedAnt
            --                    (Attributes 0 80 50 60 40)
            --                    (basicEquipment ItemData.Pincers ItemData.Shell)
            --                    |> Model.setBodySize Types.Large
            --
            --            BrownBear ->
            --                init BrownBear
            --                    (Attributes 0 50 50 50 50)
            --
            --            CaveBear ->
            --                init CaveBear
            --                    (Attributes 0 50 50 50 50)
            --
            --            Manticore ->
            --                init Manticore
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Melee, Poison ]
            --
            --            -------------
            --            -- Undeads --
            --            -------------
            --            Skeleton ->
            --                init Skeleton
            --                    (Attributes 0 60 65 40 10)
            --                    (basicEquipment ItemData.ShortSword ItemData.Bones)
            --
            --            WalkingCorpse ->
            --                init WalkingCorpse
            --                    (Attributes 0 100 40 95 20)
            --                    (basicEquipment ItemData.SmallClaws ItemData.SoftHide)
            --
            --            Shadow ->
            --                init Shadow
            --                    (Attributes 0 50 50 50 50)
            --
            --            EerieGhost ->
            --                init EerieGhost
            --                    (Attributes 0 50 50 50 50)
            --
            --            BarrowWight ->
            --                init BarrowWight
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Drain ]
            --
            --            DarkWraith ->
            --                init DarkWraith
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Drain ]
            --
            --            Spectre ->
            --                init Spectre
            --                    (Attributes 0 50 50 50 50)
            --
            --            -- Special: "Drains HP Permanently"
            --            Vampire ->
            --                init Vampire
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Drain ]
            --
            --            ----------------
            --            -- Animan men --
            --            ----------------
            --            RatMan ->
            --                init RatMan
            --                    (Attributes 0 60 60 60 60)
            --                    (basicEquipment ItemData.MorningStar ItemData.ToughHide)
            --
            --            BearMan ->
            --                init BearMan
            --                    (Attributes 0 50 50 50 50)
            --
            --            BullMan ->
            --                init BullMan
            --                    (Attributes 0 50 50 50 50)
            --
            --            WolfMan ->
            --                init WolfMan
            --                    (Attributes 0 50 50 50 50)
            --
            --            -------------
            --            -- Casters --
            --            -------------
            --            -- Special: "Casts Bolt Spells, Slow, summon Monster, Phase Door, Teleport"
            --            Wizard ->
            --                init Wizard
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Spell ]
            --
            --            -- Special: "Casts Bolt Spells, Slow, summon Monster, Phase Door, Teleport"
            --            Necromancer ->
            --                init Necromancer
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Spell ]
            --
            --            ----------------
            --            -- Elementals --
            --            ----------------
            --            DustElemental ->
            --                init DustElemental
            --                    (Attributes 0 50 50 50 50)
            --
            --            IceElemental ->
            --                init IceElemental
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            WindElemental ->
            --                init WindElemental
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Lightning ]
            --
            --            MagmaElemental ->
            --                init MagmaElemental
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Fire ]
            --
            --            FireElemental ->
            --                init FireElemental
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Fire ]
            --
            --            WaterElemental ->
            --                init WaterElemental
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            EarthElemental ->
            --                init EarthElemental
            --                    (Attributes 0 50 50 50 50)
            --
            --            ------------
            --            -- Devils --
            --            ------------
            --            SpikedDevil ->
            --                init SpikedDevil
            --                    (Attributes 0 50 50 50 50)
            --
            --            HornedDevil ->
            --                init HornedDevil
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Melee, Fire ]
            --
            --            IceDevil ->
            --                init IceDevil
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            AbyssFiend ->
            --                init AbyssFiend
            --                    (Attributes 0 50 50 50 50)
            --
            --            ------------
            --            -- Giants --
            --            ------------
            --            HugeOgre ->
            --                init HugeOgre
            --                    (Attributes 0 50 50 50 50)
            --
            --            HillGiant ->
            --                init HillGiant
            --                    (Attributes 0 50 50 50 50)
            --
            --            StoneGiant ->
            --                init StoneGiant
            --                    (Attributes 0 50 50 50 50)
            --
            --            FrostGiant ->
            --                init FrostGiant
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            TwoHeadedGiant ->
            --                init TwoHeadedGiant
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ranged ]
            --
            --            FireGiant ->
            --                init FireGiant
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Fire, Ranged ]
            --
            --            HillGiantKing ->
            --                init HillGiantKing
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            FireGiantKing ->
            --                init FireGiantKing
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Fire ]
            --
            --            FrostGiantKing ->
            --                init FrostGiantKing
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            StoneGiantKing ->
            --                init StoneGiantKing
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ranged ]
            --
            --            -------------
            --            -- Dragons --
            --            -------------
            --            GreenDragon ->
            --                init GreenDragon
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Acid ]
            --
            --            WhiteDragon ->
            --                init WhiteDragon
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Ice ]
            --
            --            BlueDragon ->
            --                init BlueDragon
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Lightning ]
            --
            --            RedDragon ->
            --                init RedDragon
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Fire ]
            --
            --            -- Special: "Casts Fire, Lighting, and Wind Spells"
            --            Surtur ->
            --                init Surtur
            --                    (Attributes 0 50 50 50 50)
            --                    |> Model.setAttackTypes [ Melee, Spell, Fire, Lightning, Ice ]
            _ ->
                init Kobold 1 Attributes.init Equipment.init



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
