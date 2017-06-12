module Item.Data exposing (..)

import Container exposing (Container)
import Dice exposing (Dice)
import Utils.Mass exposing (..)


type Msg
    = ItemOk
    | NestedItem
    | MassMsg Utils.Mass.Msg


type ItemStatus
    = Normal
    | Cursed
    | Enchanted


type AC
    = AC Int


addAC : AC -> AC -> AC
addAC (AC a) (AC b) =
    AC (a + b)


acToInt : AC -> Int
acToInt (AC a) =
    a


type IdentificationStatus
    = Identified
    | Unidentified


type alias ItemTypes =
    List ItemType



--type Item compatible
--    = ItemWeapon Weapon
--    | ItemArmour Armour
--    | ItemShield Shield
--    | ItemHelmet Helmet
--    | ItemBracers Bracers
--    | ItemGauntlets Gauntlets
--    | ItemBelt (Belt Item)
--    | ItemPack (Pack Item)
--    | ItemPurse Purse
--    | ItemNeckwear Neckwear
--    | ItemOvergarment Overgarment
--    | ItemRing Ring
--    | ItemBoots Boots
--    | ItemCopper CopperCoins
--    | ItemSilver SilverCoins
--    | ItemGold GoldCoins
--    | ItemPlatinum PlatinumCoins


type ItemType
    = ItemTypeWeapon WeaponType
    | ItemTypeArmour ArmourType
    | ItemTypeShield ShieldType
    | ItemTypeHelmet HelmetType
    | ItemTypeBracers BracersType
    | ItemTypeGauntlets GauntletsType
    | ItemTypeBelt BeltType
    | ItemTypePack PackType
    | ItemTypePurse
    | ItemTypeNeckwear NeckwearType
    | ItemTypeOvergarment OvergarmentType
    | ItemTypeRing RingType
    | ItemTypeBoots BootsType
    | ItemTypeCopper Int
    | ItemTypeSilver Int
    | ItemTypeGold Int
    | ItemTypePlatinum Int


type alias Buy =
    Int


type alias Sell =
    Int


type Prices
    = Prices Buy Sell


type ItemCompatible
    = ItemCompatible


type alias BaseItem =
    { name : String
    , prices : Prices
    , css : String
    , mass : Mass
    , status : ItemStatus
    , idStatus : IdentificationStatus
    }


initBaseItem : String -> Prices -> String -> Mass -> ItemStatus -> IdentificationStatus -> BaseItem
initBaseItem name prices css mass status idStatus =
    { name = name
    , prices = prices
    , css = css
    , mass = mass
    , status = status
    , idStatus = idStatus
    }


initBasicItem : BaseItem -> BasicItem
initBasicItem baseItem =
    { base = baseItem

    -- stubs
    , weapon = ItemCompatible
    , weaponType = BrokenSword
    , damage = Dice.die 0 0 0

    -- armour
    , armour = ItemCompatible
    , ac = AC 0
    , armourType = RustyArmour

    -- gauntlets
    , gauntlets = ItemCompatible
    , gauntletsType = NormalGauntlets

    -- helmet
    , helmet = ItemCompatible
    , helmetType = BrokenHelmet

    -- bracers
    , bracers = ItemCompatible
    , bracersType = NormalBracers

    -- shield
    , shield = ItemCompatible
    , shieldType = BrokenShield

    -- misc
    , bootsType = BootsType
    , neckwearType = NeckwearType
    , overgarmentType = OvergarmentType
    , ringType = RingType

    -- belt
    , beltType = TwoSlotBelt
    , beltContainer = TwoSlot Nothing Nothing

    -- pack
    , pack = ItemCompatible
    , packType = SmallBag
    , container = PackOfItems (Container.init (Capacity 0 0) fakeMass (==))

    -- purse and single pile of coins
    , purse = ItemCompatible
    , coins = Coins 0 0 0 0
    , coin = ItemCompatible
    , value = 0
    }


fakeMass : a -> Mass
fakeMass _ =
    Mass 0 0


{-| The common set of data for all items.
-}
type alias BasicItem =
    { base : BaseItem

    -- weapon
    , weapon : ItemCompatible
    , weaponType : WeaponType
    , damage : Dice

    -- armour
    , armour : ItemCompatible
    , armourType : ArmourType
    , gauntlets : ItemCompatible
    , gauntletsType : GauntletsType
    , helmet : ItemCompatible
    , helmetType : HelmetType
    , bracers : ItemCompatible
    , bracersType : BracersType
    , shield : ItemCompatible
    , shieldType : ShieldType
    , ac : AC

    -- misc
    , bootsType : BootsType
    , neckwearType : NeckwearType
    , overgarmentType : OvergarmentType
    , ringType : RingType

    -- belt
    , beltType : BeltType
    , beltContainer : BeltOfItems

    -- pack
    , pack : ItemCompatible
    , packType : PackType
    , container : PackOfItems

    -- purse and single pile of coins
    , purse : ItemCompatible
    , coins : Coins
    , coin : ItemCompatible
    , value : Int
    }



-- set Item field helpers


setWeaponType : WeaponType -> BasicItem -> BasicItem
setWeaponType val model =
    { model | weaponType = val }


setDamage : Dice -> BasicItem -> BasicItem
setDamage val model =
    { model | damage = val }


setArmourType : ArmourType -> BasicItem -> BasicItem
setArmourType val model =
    { model | armourType = val }


setGauntletsType : GauntletsType -> BasicItem -> BasicItem
setGauntletsType val model =
    { model | gauntletsType = val }


setHelmetType : HelmetType -> BasicItem -> BasicItem
setHelmetType val model =
    { model | helmetType = val }


setBracersType : BracersType -> BasicItem -> BasicItem
setBracersType val model =
    { model | bracersType = val }


setShieldType : ShieldType -> BasicItem -> BasicItem
setShieldType val model =
    { model | shieldType = val }


setAC : AC -> BasicItem -> BasicItem
setAC val model =
    { model | ac = val }


setBootsType : BootsType -> BasicItem -> BasicItem
setBootsType val model =
    { model | bootsType = val }


setNeckwearType : NeckwearType -> BasicItem -> BasicItem
setNeckwearType val model =
    { model | neckwearType = val }


setOvergarmentType : OvergarmentType -> BasicItem -> BasicItem
setOvergarmentType val model =
    { model | overgarmentType = val }


setRingType : RingType -> BasicItem -> BasicItem
setRingType val model =
    { model | ringType = val }


setBeltType : BeltType -> BasicItem -> BasicItem
setBeltType val model =
    { model | beltType = val }


setPackType : PackType -> BasicItem -> BasicItem
setPackType val model =
    { model | packType = val }


setBeltContainer : BeltOfItems -> BasicItem -> BasicItem
setBeltContainer val model =
    { model | beltContainer = val }


setContainer : PackOfItems -> BasicItem -> BasicItem
setContainer val model =
    { model | container = val }


setCoins : Coins -> BasicItem -> BasicItem
setCoins val model =
    { model | coins = val }


setValue : Int -> BasicItem -> BasicItem
setValue val model =
    { model | value = val }


type alias Weapon compatible =
    { compatible
        | base : BaseItem
        , weapon : ItemCompatible
        , weaponType : WeaponType
        , damage : Dice
    }


type alias Armour compatible =
    { compatible
        | armour : ItemCompatible
        , base : BaseItem
        , armourType : ArmourType
        , ac : AC
    }


type alias Gauntlets compatible =
    { compatible
        | gauntlets : ItemCompatible
        , base : BaseItem
        , gauntletsType : GauntletsType
        , ac : AC
    }


type alias Helmet compatible =
    { compatible
        | helmet : ItemCompatible
        , base : BaseItem
        , helmetType : HelmetType
        , ac : AC
    }


type alias Bracers compatible =
    { compatible
        | bracers : ItemCompatible
        , base : BaseItem
        , bracersType : BracersType
        , ac : AC
    }


type alias Shield compatible =
    { compatible
        | shield : ItemCompatible
        , base : BaseItem
        , shieldType : ShieldType
        , ac : AC
    }


type alias Boots compatible =
    { compatible
        | base : BaseItem
        , bootsType : BootsType
    }


type alias Neckwear compatible =
    { compatible
        | base : BaseItem
        , neckwearType : NeckwearType
    }


type alias Overgarment compatible =
    { compatible
        | base : BaseItem
        , overgarmentType : OvergarmentType
    }


type alias Ring compatible =
    { compatible
        | base : BaseItem
        , ringType : RingType
    }


type alias Belt compatible =
    { compatible
        | base : BaseItem
        , beltType : BeltType
        , beltContainer : BeltOfItems
    }


type alias Pack compatible =
    { compatible
        | base : BaseItem
        , packType : PackType
        , container : PackOfItems
    }


type PackOfItems
    = PackOfItems (Container BasicItem)


type alias Coins =
    { copper : Int
    , silver : Int
    , gold : Int
    , platinum : Int
    }


type alias Purse compatible =
    { compatible
        | base : BaseItem
        , purse : ItemCompatible
        , coins : Coins
    }


type alias CopperCoins compatible =
    { compatible
        | coin : ItemCompatible
        , base : BaseItem
        , value : Int
    }


type alias SilverCoins compatible =
    { compatible
        | coin : ItemCompatible
        , base : BaseItem
        , value : Int
    }


type alias GoldCoins compatible =
    { compatible
        | coin : ItemCompatible
        , base : BaseItem
        , value : Int
    }


type alias PlatinumCoins compatible =
    { compatible
        | coin : ItemCompatible
        , base : BaseItem
        , value : Int
    }


type BeltOfItems
    = TwoSlot (Maybe BasicItem) (Maybe BasicItem)
    | ThreeSlot (Maybe BasicItem) (Maybe BasicItem) (Maybe BasicItem)
    | FourSlot (Maybe BasicItem) (Maybe BasicItem) (Maybe BasicItem) (Maybe BasicItem)



--Sub item types


type WeaponType
    = BrokenSword
    | Club
    | Dagger
    | Hammer
    | HandAxe
    | Quarterstaff
    | Spear
    | ShortSword
    | Mace
    | Flail
    | Axe
    | WarHammer
    | LongSword
    | BattleAxe
    | BroadSword
    | MorningStar
    | BastardSword
    | TwoHandedSword
      -- monster weapons
    | SmallClaws
    | SmallBite
    | Crossbow
    | Fangs
    | Pincers
    | Bow
    | LargeClaws
    | Pike
    | LargeClub
    | StoneClub
    | GiantAxe
    | Boulder
    | GiantMaul


type HelmetType
    = BrokenHelmet
    | LeatherHelmet
    | IronHelmet
    | SteelHelmet
    | MeteoricSteelHelmet
    | HelmetOfDetectMonsters
    | EnchantedHelmOfStorms


type ArmourType
    = RustyArmour
    | LeatherArmour
    | StuddedLeatherArmour
    | RingMail
    | ScaleMail
    | ChainMail
    | SplintMail
    | PlateMail
    | PlateArmour
    | MeteoricSteelPlate
    | ElvenChainMail
      -- monster armour
    | SoftHide
    | Bones
    | Shell
    | ToughHide


type ShieldType
    = BrokenShield
    | SmallWoodenShield
    | MediumWoodenShield
    | LargeWoodenShield
    | SmallIronShield
    | MediumIronShield
    | LargeIronShield
    | SmallSteelShield
    | MediumSteelShield
    | LargeSteelShield
    | SmallMeteoricSteelShield
    | MediumMeteoricSteelShield
    | LargeMeteoricSteelShield


type BracersType
    = NormalBracers
    | BracersOfDefenseNormal
    | BracersOfDefenseS
    | BracersOfDefenseVS


type GauntletsType
    = NormalGauntlets
    | GauntletOfProtection
    | GauntletOfProtectionS
    | GauntletOfProtectionVS
    | GauntletOfSlaying
    | GauntletOfSlayingS_S
    | GauntletOfSlayingVS_VS
    | GauntletOfDexterity
    | GauntletOfDexterityS
    | GauntletOfDexterityVS
    | GauntletOfStrength
    | GauntletOfStrengthS
    | GauntletOfStrengthVS


type PackType
    = SmallBag
    | MediumBag
    | LargeBag
    | SmallPack
    | MediumPack
    | LargePack
    | SmallChest
    | MediumChest
    | LargeChest
    | EnchantedSmallPackOfHolding
    | EnchantedMediumPackOfHolding
    | EnchantedLargePackOfHolding


type BeltType
    = TwoSlotBelt
    | ThreeSlotBelt
    | FourSlotBelt
    | UtilityBelt
    | WandQuiverBelt


type NeckwearType
    = NeckwearType


type OvergarmentType
    = OvergarmentType


type RingType
    = RingType


type BootsType
    = BootsType
