module Item.Item
    exposing
        ( Item(..)
        , Item
        , Items
        , new
        , newFoldableItem
        , view
        , viewSlot
        , css
          -- item functions
        , isCursed
        , priceOf
        , costOf
          -- comparisons
        , equals
        , containerBuilder
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import Container exposing (Container)


-- utils

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- sub items

import Item.Data exposing (..)
import Item.Weapon
import Item.Armour
import Item.Shield
import Item.Helmet
import Item.Bracers
import Item.Gauntlets
import Item.Belt as Belt exposing (Belt)
import Item.Pack as Pack exposing (Pack)
import Item.Purse as Purse exposing (Purse)


type alias Items =
    List Item


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
    | ItemCopper Purse.CopperCoins
    | ItemSilver Purse.SilverCoins
    | ItemGold Purse.GoldCoins
    | ItemPlatinum Purse.PlatinumCoins



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
equals anItemA anItemB =
    let
        modelA =
            getModel anItemA

        modelB =
            getModel anItemB
    in
        IdGenerator.equals modelA.id modelB.id


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
        div [ class "card" ]
            [ div
                {- [ class "ui item"
                   , style
                       [ ( "opacity", "1" )
                       , ( "cursor", "move" )
                       , ( "width", "32px" )
                       , ( "height", "64px" )
                       ]
                   ]
                -}
                []
                [ div [ class "image" ]
                    [ i [ class ("cotw-item " ++ model.css) ] []
                    ]
                , div [ class "content" ]
                    [ a [ class "header" ]
                        [ text model.name
                        ]
                    , div [ class "meta" ]
                        [ span [ class "date" ] [ text "" ]
                        ]
                    , div [ class "description", style [ ( "maxWidth", "7em" ) ] ]
                        [ text ""
                        ]
                    ]
                , div [ class "extra content" ] [ text extraContent ]
                ]
            ]


containerBuilder : Capacity -> Container Item
containerBuilder capacity =
    Container.init capacity mass equals


newFoldableItem : ( key, ID -> Item ) -> ID -> ( key, Item )
newFoldableItem ( key, itemFactory ) id =
    ( key, itemFactory id )


new : ItemType -> ID -> Item
new itemType id =
    newWithOptions itemType id Normal Identified


newWithOptions : ItemType -> ID -> ItemStatus -> IdentificationStatus -> Item
newWithOptions itemType id status idStatus =
    case itemType of
        ItemTypeWeapon weaponType ->
            ItemWeapon <| Item.Weapon.init weaponType status idStatus id

        ItemTypeArmour armourType ->
            ItemArmour <| Item.Armour.init armourType status idStatus id

        ItemTypeShield shieldType ->
            ItemShield <| Item.Shield.init shieldType status idStatus id

        ItemTypeHelmet helmetType ->
            ItemHelmet <| Item.Helmet.init helmetType status idStatus id

        ItemTypeBracers bracersType ->
            ItemBracers <| Item.Bracers.init bracersType status idStatus id

        ItemTypeGauntlets gauntletsType ->
            ItemGauntlets <| Item.Gauntlets.init gauntletsType status idStatus id

        ItemTypeBelt beltType ->
            ItemBelt <| Belt.init beltType status idStatus id

        ItemTypePack packType ->
            ItemPack <| Pack.init packType containerBuilder status idStatus id

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
            ItemWeapon <| Item.Weapon.init Dagger status idStatus id
