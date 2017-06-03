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


{-| The price that shops are willing to sell an Item for, the buy field
-}
priceOf : Item -> Int
priceOf item =
    let
        (Prices buy sell) =
            getModel item |> .prices
    in
    sell


{-| The price that shops are willing to buy an Item for, the sell field
-}
costOf : Item -> Int
costOf item =
    let
        (Prices buy sell) =
            getModel item |> .prices
    in
    buy



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


mass : Item -> Mass
mass =
    getModel >> .mass


baseItemMass : BaseItem -> Mass
baseItemMass { mass } =
    mass


isCursed : Item -> Bool
isCursed =
    let
        isCursed status =
            status == Cursed
    in
    getModel >> .status >> isCursed


equals : Item -> Item -> Bool
equals a b =
    let
        ( baseA, baseB ) =
            ( getModel a, getModel b )
    in
    baseA.name == baseB.name


getModel : Item -> BaseItem
getModel anItem =
    case anItem of
        ItemWeapon { base } ->
            base

        ItemArmour { base } ->
            base

        ItemShield { base } ->
            base

        ItemHelmet { base } ->
            base

        ItemBracers { base } ->
            base

        ItemGauntlets { base } ->
            base

        ItemBelt { base } ->
            base

        ItemPack { base } ->
            base

        ItemPurse { base } ->
            base

        ItemNeckwear { base } ->
            base

        ItemOvergarment { base } ->
            base

        ItemRing { base } ->
            base

        ItemBoots { base } ->
            base

        ItemCopper { base } ->
            base

        ItemSilver { base } ->
            base

        ItemGold { base } ->
            base

        ItemPlatinum { base } ->
            base


view : Item -> Html msg
view item =
    viewSlot item ""


css : Item -> String
css =
    getModel >> .css


viewSlot : Item -> String -> Html msg
viewSlot item extraContent =
    let
        model =
            getModel item
    in
    div [ HA.class "item" ]
        [ div [ HA.class "item__img" ]
            [ i [ HA.class ("cotw-item " ++ model.css) ] []
            ]
        , div [ HA.class "item__name" ]
            [ a [ HA.class "header" ]
                [ text model.name
                ]
            , div [ HA.class "meta" ]
                [ span [ HA.class "date" ] [ text "" ]
                ]
            , div [ HA.class "description", HA.style [ ( "maxWidth", "7em" ) ] ]
                [ text ""
                ]
            ]
        , div [ HA.class "extra content" ] [ text extraContent ]
        ]


containerBuilder : Mass.Capacity -> Container Item
containerBuilder capacity =
    Container.init capacity mass equals


new : ItemType -> Item
new itemType =
    newWithOptions itemType Normal Identified


newWithOptions : ItemType -> ItemStatus -> IdentificationStatus -> Item
newWithOptions itemType status idStatus =
    case itemType of
        ItemTypeWeapon weaponType ->
            ItemWeapon <| Item.Weapon.init weaponType status idStatus

        ItemTypeArmour armourType ->
            ItemArmour <| Item.Armour.init armourType status idStatus

        ItemTypeShield shieldType ->
            ItemShield <| Item.Shield.init shieldType status idStatus

        ItemTypeHelmet helmetType ->
            ItemHelmet <| Item.Helmet.init helmetType status idStatus

        ItemTypeBracers bracersType ->
            ItemBracers <| Item.Bracers.init bracersType status idStatus

        ItemTypeGauntlets gauntletsType ->
            ItemGauntlets <| Item.Gauntlets.init gauntletsType status idStatus

        ItemTypeBelt beltType ->
            ItemBelt <| Belt.init beltType status idStatus

        ItemTypePack packType ->
            ItemPack <| Pack.init packType containerBuilder status idStatus

        ItemTypePurse ->
            ItemPurse Purse.init

        ItemTypeCopper value ->
            ItemCopper <| Purse.initCoppers value

        ItemTypeSilver value ->
            ItemSilver <| Purse.initSilvers value

        ItemTypeGold value ->
            ItemGold <| Purse.initGolds value

        ItemTypePlatinum value ->
            ItemPlatinum <| Purse.initPlatinums value

        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            ItemWeapon <| Item.Weapon.init Dagger status idStatus


ppWeapon : Weapon -> String
ppWeapon weapon =
    weapon.base.name ++ " ( " ++ Dice.pp weapon.damage ++ " )"


ppArmour : Armour -> String
ppArmour armour =
    armour.base.name ++ " ( " ++ toString armour.ac ++ " )"
