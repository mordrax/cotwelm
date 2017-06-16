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
    = Item BaseItem ItemDetail


type AmountOfCoins
    = Int


type ItemDetail
    = WeaponDetail WeaponDetails
    | ArmourDetail ArmourDetails
    | ShieldDetail ShieldDetails
    | HelmetDetail HelmetDetails
    | BracersDetail BracersDetails
    | GauntletsDetail GauntletsDetails
    | BeltDetail (BeltDetails Item)
    | PackDetail (PackDetails Item)
    | PurseDetail PurseDetails
    | NeckwearDetail NeckwearDetails
    | OvergarmentDetail OvergarmentDetails
    | RingDetail RingDetails
    | BootsDetail BootsDetails
    | CopperDetail AmountOfCoins
    | SilverDetail AmountOfCoins
    | GoldDetail AmountOfCoins
    | PlatinumDetail AmountOfCoins


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
    | ItemTypeCopper
    | ItemTypeSilver
    | ItemTypeGold
    | ItemTypePlatinum


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
    ( BaseItem, WeaponDetails )


type alias WeaponDetails =
    { weaponType : WeaponType
    , damage : Dice
    }


type alias Armour =
    ( BaseItem, ArmourDetails )


type alias ArmourDetails =
    { armourType : ArmourType
    , ac : AC
    }


type alias Gauntlets =
    ( BaseItem, GauntletsDetails )


type alias GauntletsDetails =
    { gauntletsType : GauntletsType
    , ac : AC
    }


type alias Helmet =
    ( BaseItem, HelmetDetails )


type alias HelmetDetails =
    { helmetType : HelmetType
    , ac : AC
    }


type alias Bracers =
    ( BaseItem, BracersDetails )


type alias BracersDetails =
    { bracersType : BracersType
    , ac : AC
    }


type alias Shield =
    ( BaseItem, ShieldDetails )


type alias ShieldDetails =
    { shieldType : ShieldType
    , ac : AC
    }


type alias Boots =
    ( BaseItem, BootsDetails )


type alias BootsDetails =
    { bootsType : BootsType
    }


type alias Neckwear =
    ( BaseItem, NeckwearDetails )


type alias NeckwearDetails =
    { neckwearType : NeckwearType
    }


type alias Overgarment =
    ( BaseItem, OvergarmentDetails )


type alias OvergarmentDetails =
    { overgarmentType : OvergarmentType
    }


type alias Ring =
    ( BaseItem, RingDetails )


type alias RingDetails =
    { ringType : RingType
    }


type BeltContainer a
    = TwoSlot (Maybe a) (Maybe a)
    | ThreeSlot (Maybe a) (Maybe a) (Maybe a)
    | FourSlot (Maybe a) (Maybe a) (Maybe a) (Maybe a)


type alias Belt a =
    ( BaseItem, BeltDetails a )


type alias BeltDetails a =
    { beltType : BeltType
    , beltContainer : BeltContainer a
    }


type alias Pack a =
    ( BaseItem, PackDetails a )


type alias PackDetails a =
    { packType : PackType
    , container : Container a
    }


type alias Purse =
    ( BaseItem, PurseDetails )


type alias PurseDetails =
    { coins : Coins
    }


type alias CopperCoins =
    ( BaseItem, CopperCoinsDetails )


type alias CopperCoinsDetails =
    { value : Int
    }


type alias SilverCoins =
    ( BaseItem, SilverCoinsDetails )


type alias SilverCoinsDetails =
    { value : Int
    }


type alias GoldCoins =
    ( BaseItem, GoldCoinsDetails )


type alias GoldCoinsDetails =
    { value : Int
    }


type alias PlatinumCoins =
    ( BaseItem, PlatinumCoinsDetails )


type alias PlatinumCoinsDetails =
    { value : Int
    }


type alias Coins =
    { copper : Int
    , silver : Int
    , gold : Int
    , platinum : Int
    }



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
