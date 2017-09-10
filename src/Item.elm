module Item
    exposing
        ( Items
        , base
        , baseValue
        , containerBuilder
        , css
        , detail
        , equals
        , isCursed
        , markupValue
        , mass
        , name
        , new
        , ppArmour
        , ppWeapon
        , view
        , viewSlot
        )

import Container exposing (Container)
import Dice
import Html exposing (..)
import Html.Attributes as HA
import Item.Belt as Belt
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Purse as Purse
import Item.Weapon
import Item.Wearable
import Utils.Mass as Mass exposing (Mass)
import View.UI


type alias Items =
    List Item



{-
   import Item.Purse exposing (..)
      import Item.Neckwear exposing (..)
      import Item.Overgarment exposing (..)
      import Item.Ring exposing (..)
      import Item.Boots exposing (..)
-}
-- for exporting


markupValue : Item -> Int
markupValue (Item base _) =
    let
        (ItemValue value) =
            base.itemValue
    in
    (value + 25)
        |> toFloat
        |> (*) 1.5
        |> round


baseValue : Item -> Int
baseValue (Item base _) =
    let
        (ItemValue value) =
            base.itemValue
    in
    value


name : Item -> String
name (Item base _) =
    base.name



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


mass : Item -> Mass
mass (Item base _) =
    base.mass


isCursed : Item -> Bool
isCursed (Item base _) =
    base.status == Cursed


equals : Item -> Item -> Bool
equals (Item baseA _) (Item baseB _) =
    baseA.name == baseB.name


view : Item -> Html msg
view item =
    viewSlot item ""


css : Item -> String
css (Item base _) =
    base.css


viewSlot : Item -> String -> Html msg
viewSlot (Item base specific) extraContent =
    let
        itemImg =
            i [ HA.class ("cotw-item " ++ base.css) ] []

        itemName =
            case specific of
                CopperDetail coins ->
                    toString coins ++ " Copper pieces"

                SilverDetail coins ->
                    toString coins ++ " Silver pieces"

                GoldDetail coins ->
                    toString coins ++ " Gold pieces"

                PlatinumDetail coins ->
                    toString coins ++ " Platinum pieces"

                _ ->
                    base.name
    in
    View.UI.viewWithTooltip (itemName ++ "!!!")
        (div [ HA.class "item" ]
            [ div [ HA.class "item__img" ] [ itemImg ]
            , div [ HA.class "item__name" ] [ text itemName ]
            ]
        )


containerBuilder : Mass.Capacity -> Container Item
containerBuilder capacity =
    Container.init capacity mass equals


new : ItemType -> Item
new itemType =
    newWithOptions itemType Normal Identified


newWithOptions : ItemType -> ItemStatus -> IdentificationStatus -> Item
newWithOptions itemType status idStatus =
    let
        makeItem tag ( base, detail ) =
            Item base (tag detail)
    in
    case itemType of
        ItemTypeWeapon weaponType ->
            makeItem WeaponDetail (Item.Weapon.init weaponType status idStatus)

        ItemTypeArmour armourType ->
            makeItem ArmourDetail (Item.Wearable.initArmour armourType status idStatus)

        ItemTypeShield shieldType ->
            makeItem ShieldDetail (Item.Wearable.initShield shieldType status idStatus)

        ItemTypeHelmet helmetType ->
            makeItem HelmetDetail (Item.Wearable.initHelmet helmetType status idStatus)

        ItemTypeBracers bracersType ->
            makeItem BracersDetail (Item.Wearable.initBracers bracersType status idStatus)

        ItemTypeGauntlets gauntletsType ->
            makeItem GauntletsDetail (Item.Wearable.initGauntlets gauntletsType status idStatus)

        ItemTypeBelt beltType ->
            makeItem BeltDetail (Belt.init beltType status idStatus)

        ItemTypePack packType ->
            makeItem PackDetail (Pack.init packType containerBuilder status idStatus)

        ItemTypePurse ->
            makeItem PurseDetail Purse.init

        ItemTypeCopper value ->
            makeItem CopperDetail (Purse.initCoppers value)

        ItemTypeSilver value ->
            makeItem SilverDetail (Purse.initSilvers value)

        ItemTypeGold value ->
            makeItem GoldDetail (Purse.initGolds value)

        ItemTypePlatinum value ->
            makeItem PlatinumDetail (Purse.initPlatinums value)

        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            makeItem WeaponDetail (Item.Weapon.init Dagger status idStatus)


base : ( BaseItem, specific ) -> BaseItem
base =
    Tuple.first


detail : ( BaseItem, specific ) -> specific
detail =
    Tuple.second


ppWeapon : Weapon -> String
ppWeapon ( base, weapon ) =
    base.name ++ " ( " ++ Dice.pp weapon.damage ++ " )"


ppArmour : Armour -> String
ppArmour ( base, armour ) =
    base.name ++ " ( " ++ toString armour.ac ++ " )"
