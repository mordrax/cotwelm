module Item
    exposing
        ( Items
        , containerBuilder
        , costOf
          -- comparisons
        , css
          -- item functions
        , equals
        , isCursed
        , new
        , ppArmour
        , ppWeapon
        , priceOf
        , view
        , viewSlot
        )

import Container exposing (Container)
import Dice
import Html exposing (..)
import Html.Attributes as HA
import Item.Armour
import Item.Belt as Belt
import Item.Bracers
import Item.Data exposing (..)
import Item.Gauntlets
import Item.Helmet
import Item.Pack as Pack
import Item.Purse as Purse
import Item.Shield
import Item.Weapon
import Utils.Mass as Mass exposing (Mass)


type alias Items compatible =
    List (Item compatible)



{-
   import Item.Purse exposing (..)
      import Item.Neckwear exposing (..)
      import Item.Overgarment exposing (..)
      import Item.Ring exposing (..)
      import Item.Boots exposing (..)
-}
-- for exporting


{-| The price that shops are willing to sell an Item for, the buy field
-}
priceOf : Item compatible -> Int
priceOf { base } =
    let
        (Prices buy sell) =
            base.prices
    in
    sell


{-| The price that shops are willing to buy an Item for, the sell field
-}
costOf : Item compatible -> Int
costOf { base } =
    let
        (Prices buy sell) =
            base.prices
    in
    buy



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


mass : Item compatible -> Mass
mass { base } =
    base.mass


isCursed : Item compatible -> Bool
isCursed =
    let
        isCursed status =
            status == Cursed
    in
    .base >> .status >> isCursed


equals : Item compatible -> Item compatible -> Bool
equals a b =
    a.base.name == b.base.name


view : Item BasicItem -> Html msg
view item =
    viewSlot item ""


css : Item compatible -> String
css { base } =
    base.css


viewSlot : Item BasicItem -> String -> Html msg
viewSlot ({ base, type_ } as item) extraContent =
    let
        itemImg =
            i [ HA.class ("cotw-item " ++ base.css) ] []

        toCoins : Item BasicItem -> CopperCoins BasicItem
        toCoins x =
            x

        itemName =
            case type_ of
                BIT_Copper ->
                    toCoins item
                        |> (\coins -> toString coins.value ++ " Copper pieces")

                BIT_Silver ->
                    toCoins item
                        |> (\coins -> toString coins.value ++ " Silver pieces")

                BIT_Gold ->
                    toCoins item
                        |> (\coins -> toString coins.value ++ " Gold pieces")

                BIT_Platinum ->
                    toCoins item
                        |> (\coins -> toString coins.value ++ " Platinum pieces")

                _ ->
                    base.name
    in
    div [ HA.class "item" ]
        [ div [ HA.class "item__img" ] [ itemImg ]
        , div [ HA.class "item__name" ] [ text itemName ]
        ]


containerBuilder : Mass.Capacity -> Container BasicItem
containerBuilder capacity =
    Container.init capacity mass equals


new : ItemType -> Item BasicItem
new itemType =
    newWithOptions itemType Normal Identified


newWithOptions : ItemType -> ItemStatus -> IdentificationStatus -> Item BasicItem
newWithOptions itemType status idStatus =
    case itemType of
        ItemTypeWeapon weaponType ->
            Item.Weapon.init weaponType status idStatus

        ItemTypeArmour armourType ->
            Item.Armour.init armourType status idStatus

        ItemTypeShield shieldType ->
            Item.Shield.init shieldType status idStatus

        ItemTypeHelmet helmetType ->
            Item.Helmet.init helmetType status idStatus

        ItemTypeBracers bracersType ->
            Item.Bracers.init bracersType status idStatus

        ItemTypeGauntlets gauntletsType ->
            Item.Gauntlets.init gauntletsType status idStatus

        ItemTypeBelt beltType ->
            Belt.init beltType status idStatus

        ItemTypePack packType ->
            Pack.init packType containerBuilder status idStatus

        ItemTypePurse ->
            Purse.init

        ItemTypeCopper value ->
            Purse.initCoppers value

        ItemTypeSilver value ->
            Purse.initSilvers value

        ItemTypeGold value ->
            Purse.initGolds value

        ItemTypePlatinum value ->
            Purse.initPlatinums value

        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            Item.Weapon.init Dagger status idStatus


ppWeapon : Weapon compatible -> String
ppWeapon { base, damage } =
    base.name ++ " ( " ++ Dice.pp damage ++ " )"


ppArmour : Armour compatible -> String
ppArmour { base, ac } =
    base.name ++ " ( " ++ toString ac ++ " )"
