module Item.Types exposing (..)

import Utils.Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Dice exposing (Dice)


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
    , id : ID
    }


type alias Weapon =
    { base : BaseItem
    , weaponType : WeaponType
    , wc : WC
    , damage : Dice
    }


type WC
    = WC Int


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
