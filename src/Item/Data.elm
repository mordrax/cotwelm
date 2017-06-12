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


type ItemCompatible
    = ItemCompatible


{-| The common set of data for all items.
-}
type alias BaseItem =
    { name : String
    , prices : Prices
    , css : String
    , mass : Mass
    , status : ItemStatus
    , isIdentified : IdentificationStatus

    -- weapon
    , weapon : ItemCompatible
    , weaponType : WeaponType
    , damage : Dice

    -- armour
    , armourType : ArmourType
    , gauntletsType : GauntletsType
    , helmetType : HelmetType
    , bracersType : BracersType
    , shieldType : ShieldType
    , ac : AC

    -- misc
    , bootsType : BootsType
    , neckwearType : NeckwearType
    , overgarmentType : OvergarmentType
    , ringType : RingType
    , beltType : BeltType
    , beltContainer : BeltContainer
    , container : Container

    -- purse and single pile of coins
    , coins : Coins
    , value : Int
    }


type alias Weapon compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , weapon : ItemCompatible
        , weaponType : WeaponType
        , damage : Dice
    }


type alias Armour compatible =
    { compatible
        | armour : ItemCompatible
        , name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , armourType : ArmourType
        , ac : AC
    }


type alias Gauntlets compatible =
    { compatible
        | gauntlets : ItemCompatible
        , name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , gauntletsType : GauntletsType
        , ac : AC
    }


type alias Helmet compatible =
    { compatible
        | helmet : ItemCompatible
        , name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , helmetType : HelmetType
        , ac : AC
    }


type alias Bracers compatible =
    { compatible
        | bracers : ItemCompatible
        , name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , bracersType : BracersType
        , ac : AC
    }


type alias Shield compatible =
    { compatible
        | shield : ItemCompatible
        , name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , shieldType : ShieldType
        , ac : AC
    }


type alias Boots compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , bootsType : BootsType
    }


type alias Neckwear compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , neckwearType : NeckwearType
    }


type alias Overgarment compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , overgarmentType : OvergarmentType
    }


type alias Ring compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , ringType : RingType
    }


type alias Belt compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , beltType : BeltType
        , beltContainer : BeltContainer Item
    }


type alias Pack compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , packType : PackType
        , container : Container Item
    }


type alias Coins =
    { copper : Int
    , silver : Int
    , gold : Int
    , platinum : Int
    }


type alias Purse compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , coins : Coins
    }


type alias CopperCoins compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , value : Int
    }


type alias SilverCoins compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , value : Int
    }


type alias GoldCoins compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , value : Int
    }


type alias PlatinumCoins compatible =
    { compatible
        | name : String
        , prices : Prices
        , css : String
        , mass : Mass
        , status : ItemStatus
        , isIdentified : IdentificationStatus
        , value : Int
    }


type BeltContainer a
    = TwoSlot ( Maybe a, Maybe a )
    | ThreeSlot ( Maybe a, Maybe a, Maybe a )
    | FourSlot ( Maybe a, Maybe a, Maybe a, Maybe a )



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
