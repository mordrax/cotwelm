module Item.Model exposing (..)

import Item.Types exposing (..)
import Utils.IdGenerator as IdGenerator exposing (ID)
import Utils.Mass as Mass exposing (Mass)
import Dice exposing (Dice)

type alias Item =
    { name : String
    , prices : Prices
    , css : String
    , mass : Mass
    , status : ItemStatus
    , isIdentified : IdentificationStatus
    , id : ID
    , itemType :
        ItemType
        -- weapon
    , weaponType : WeaponType
    , wc : WC
    , damage :
        Dice
        -- common armour fields
    , ac :
        AC
        -- armour
    , armourType :
        ArmourType
        -- gauntlets
    , gauntletsType :
        GauntletsType
        -- helmet
    , helmetType :
        HelmetType
        -- bracers
    , bracersType :
        BracersType
        -- shield
    , shieldType :
        ShieldType
        -- boots
    , bootsType :
        BootsType
        -- neckwear
    , neckwearType :
        NeckwearType
        -- overgarment
    , overgarmentType :
        OvergarmentType
        -- ring
    , ringType : RingType
    }

initItem: String -> Prices -> String -> Mass -> ItemStatus -> IdentificationStatus -> ID -> Item -> Item
initItem