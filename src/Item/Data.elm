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


type Item
    = Item BaseItem SpecificItem


type SpecificItem
    = ItemWeapon Weapon
    | ItemArmour Armour
    | ItemShield Shield
    | ItemHelmet Helmet
    | ItemBracers Bracers
    | ItemGauntlets Gauntlets
    | ItemBelt (Belt Item)
    | ItemPack (Pack Item)
    | ItemPurse Purse
    | ItemNeckwear Neckwear
    | ItemOvergarment Overgarment
    | ItemRing Ring
    | ItemBoots Boots
    | ItemCopper CopperCoins
    | ItemSilver SilverCoins
    | ItemGold GoldCoins
    | ItemPlatinum PlatinumCoins


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


{-| The common set of data for all items.
-}
type alias BaseItem =
    { name : String
    , prices : Prices
    , css : String
    , mass : Mass
    , status : ItemStatus
    , isIdentified : IdentificationStatus
    }


type alias Weapon =
    { base : BaseItem
    , weaponType : WeaponType
    , damage : Dice
    }


type alias Armour =
    { base : BaseItem
    , armourType : ArmourType
    , ac : AC
    }


type alias Gauntlets =
    { base : BaseItem
    , gauntletsType : GauntletsType
    , ac : AC
    }


type alias Helmet =
    { base : BaseItem
    , helmetType : HelmetType
    , ac : AC
    }


type alias Bracers =
    { base : BaseItem
    , bracersType : BracersType
    , ac : AC
    }


type alias Shield =
    { base : BaseItem
    , shieldType : ShieldType
    , ac : AC
    }


type alias Boots =
    { base : BaseItem, bootsType : BootsType }


type alias Neckwear =
    { base : BaseItem, neckwearType : NeckwearType }


type alias Overgarment =
    { base : BaseItem, overgarmentType : OvergarmentType }


type alias Ring =
    { base : BaseItem, ringType : RingType }


type BeltContainer a
    = TwoSlot ( Maybe a, Maybe a )
    | ThreeSlot ( Maybe a, Maybe a, Maybe a )
    | FourSlot ( Maybe a, Maybe a, Maybe a, Maybe a )


type alias Belt a =
    { base : BaseItem
    , beltType : BeltType
    , beltContainer : BeltContainer a
    }


type alias Pack a =
    { base : BaseItem
    , packType : PackType
    , container : Container a
    }


type alias Coins =
    { copper : Int
    , silver : Int
    , gold : Int
    , platinum : Int
    }


type alias Purse =
    { base : BaseItem
    , coins : Coins
    }


type alias CopperCoins =
    { base : BaseItem, value : Int }


type alias SilverCoins =
    { base : BaseItem, value : Int }


type alias GoldCoins =
    { base : BaseItem, value : Int }


type alias PlatinumCoins =
    { base : BaseItem, value : Int }



-- Sub item types


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
    = NoOp1


type OvergarmentType
    = NoOp2


type RingType
    = NoOp3


type BootsType
    = NoOp4
