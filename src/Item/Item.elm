module Item.Item
    exposing
        ( Item(..)
        , Weapon
        , Shield
        , Helmet
        , Bracers
        , Gauntlets
        , Belt
        , Pack
        , Neckwear
        , Overgarment
        , Ring
        , Boots
        , new
        , ItemType(..)
        , view
        , viewSlot
        , isCursed
        , getPurse
          -- pack functions
        , addToPack
        , removeFromPack
        , packInfo
        , packContents
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import Container exposing (Container)
import Mass exposing (..)
import Purse exposing (..)
import IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)
import Item.Weapon exposing (..)
import Item.Armour exposing (..)
import Item.Shield exposing (..)
import Item.Helmet exposing (..)
import Item.Bracers exposing (..)
import Item.Gauntlets exposing (..)
import Item.Belt exposing (..)
import Item.Pack exposing (..)


{-
   import Item.Purse exposing (..)
      import Item.Neckwear exposing (..)
      import Item.Overgarment exposing (..)
      import Item.Ring exposing (..)
      import Item.Boots exposing (..)
-}


type alias Weapon =
    Item.Weapon.Weapon


type alias Shield =
    Item.Shield.Shield


type alias Helmet =
    Item.Helmet.Helmet


type alias Bracers =
    Item.Bracers.Bracers


type alias Gauntlets =
    Item.Gauntlets.Gauntlets


type alias Belt a =
    Item.Belt.Belt a


type alias Pack a =
    Item.Pack.Pack a



{-
   type alias Purse =
       Item.Purse.Purse


   type alias Neckwear =
       Item.Neckwear.Neckwear


   type alias Overgarment =
       Item.Overgarment.Overgarment


   type alias Ring =
       Item.Ring.Ring


   type alias Boots =
       Item.Boots.Boots
-}


type ItemType
    = Weapon WeaponType
    | Armour ArmourType
    | Shield ShieldType
    | Helmet HelmetType
    | Bracers BracersType
    | Gauntlets GauntletsType
    | Belt BeltType
    | Pack PackType
    | Purse
    | Neckwear NeckwearType
    | Overgarment OvergarmentType
    | Ring RingType
    | Boots BootsType


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


type Purse
    = PurseModelTag Purse.Purse Model


type Neckwear
    = NeckwearModelTag NeckwearType Model


type Overgarment
    = OvergarmentModelTag OvergarmentType Model


type Ring
    = RingModelTag RingType Model


type Boots
    = BootsModelTag BootsType Model



{- addToPack : Item -> Pack Item -> ( Pack Item, Msg )
   addToPack item pack =
       let
           isItemThePack =
               equals item (ItemPack pack)

           ( container', msg ) =
               Container.add item packModel.container

           (PM packType model packModel) =
               pack
       in
           if isItemThePack == True then
               ( pack, NestedItem )
           else
               case msg of
                   Container.Ok ->
                       ( PackModelTag packType model { packModel | container = container' }, Ok )

                   Container.MassMsg massMsg ->
                       ( pack, MassMsg massMsg )
-}
--------------------
-- Pack functions --
--------------------


addToPack : Item -> Pack Item -> ( Pack Item, Item.TypeDef.Msg )
addToPack item pack =
    let
        isItemThePack =
            equals item (ItemPack pack)

        ( container', msg ) =
            Container.add item packModel.container

        (PM packType model packModel) =
            pack

        _ =
            Debug.log "is item the pack: " isItemThePack
    in
        if isItemThePack == True then
            ( pack, NestedItem )
        else
            case msg of
                Container.Ok ->
                    ( PM packType model { packModel | container = container' }, Item.TypeDef.Ok )

                Container.MassMsg massMsg ->
                    ( pack, Item.TypeDef.MassMsg massMsg )


removeFromPack : a -> Pack a -> Pack a
removeFromPack item (PM packType model packModel) =
    PM packType model { packModel | container = Container.take item packModel.container }


{-| Get the current mass and mass capacity for the given pack
-}
packInfo : Pack a -> ( Mass, Mass )
packInfo (PM _ _ packModel) =
    ( Container.getMass packModel.container, Container.capacity packModel.container )


packContents : Pack a -> List a
packContents (PM _ _ packModel) =
    Container.list packModel.container



-----------
-- Purse --
-----------


newPurse : ID -> ItemStatus -> IdentificationStatus -> Purse
newPurse id status idStatus =
    PurseModelTag Purse.new (Model id "Purse" 0 0 "Purse" status idStatus <| Mass.new 0 0)


getPurse : Item -> Maybe Purse.Purse
getPurse item =
    case item of
        ItemPurse (PurseModelTag purse model) ->
            Just purse

        _ ->
            Nothing



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


getMass : Item -> Mass
getMass item =
    let
        model =
            getModel item
    in
        model.mass


isCursed : Item -> Bool
isCursed item =
    let
        { status } =
            getModel item
    in
        case status of
            Cursed ->
                True

            _ ->
                False


getModel : Item -> Model
getModel item =
    case item of
        ItemWeapon (WeaponModelTag _ model _) ->
            model

        ItemArmour (ArmourModelTag _ model _) ->
            model

        ItemShield (ShieldModelTag _ model _) ->
            model

        ItemHelmet (HelmetModelTag _ model _) ->
            model

        ItemBracers (BracersModelTag _ model _) ->
            model

        ItemGauntlets (GauntletsModelTag _ model _) ->
            model

        ItemBelt (BeltModelTag _ model _) ->
            model

        ItemPack (PM _ model _) ->
            model

        ItemPurse (PurseModelTag _ model) ->
            model

        ItemNeckwear (NeckwearModelTag _ model) ->
            model

        ItemOvergarment (OvergarmentModelTag _ model) ->
            model

        ItemRing (RingModelTag _ model) ->
            model

        ItemBoots (BootsModelTag _ model) ->
            model


equals : Item -> Item -> Bool
equals a b =
    let
        modelA =
            getModel a

        modelB =
            getModel b
    in
        IdGenerator.equals modelA.id modelB.id


view : Item -> Html msg
view item =
    viewSlot item ""


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
                    [ i [ class ("cotwItem " ++ model.css) ] []
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


newContainer : Mass -> Container Item
newContainer mass =
    Container.new mass getMass equals


new : ItemType -> ID -> Item
new itemType id =
    newWithOptions itemType id Normal Identified


newWithOptions : ItemType -> ID -> ItemStatus -> IdentificationStatus -> Item
newWithOptions itemType id status idStatus =
    case itemType of
        Weapon weaponType ->
            ItemWeapon (newWeapon weaponType id status idStatus)

        Armour armourType ->
            ItemArmour (newArmour armourType id status idStatus)

        Shield shieldType ->
            ItemShield (newShield shieldType id status idStatus)

        Helmet helmetType ->
            ItemHelmet (newHelmet helmetType id status idStatus)

        Bracers bracersType ->
            ItemBracers (newBracers bracersType id status idStatus)

        Gauntlets gauntletsType ->
            ItemGauntlets (newGauntlets gauntletsType id status idStatus)

        Belt beltType ->
            ItemBelt (newBelt beltType id status idStatus newContainer)

        Pack packType ->
            ItemPack (newPack packType id status idStatus newContainer)

        Purse ->
            ItemPurse (newPurse id status idStatus)

        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            ItemWeapon (newWeapon Dagger id status idStatus)
