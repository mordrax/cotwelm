module Item.Item
    exposing
        ( Item(..)
        , Msg(..)
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
        , newPack
        , ItemType(..)
        , view
        , viewSlot
        , addToPack
        , removeFromPack
        , isCursed
        , packInfo
        , packContents
        , getPurse
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


{- import Item.Belt exposing (..)
   import Item.Pack exposing (..)
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



{-
   type alias Belt =
       Item.Belt.Belt


   type alias Pack =
       Item.Pack.Pack


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
    | ItemBelt Belt
    | ItemPack Pack
    | ItemPurse Purse
    | ItemNeckwear Neckwear
    | ItemOvergarment Overgarment
    | ItemRing Ring
    | ItemBoots Boots


type Msg
    = Ok
    | NestedItem
    | MassMsg Mass.Msg


type Belt
    = BeltModelTag BeltType Model BeltModel


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



------------
-- Armour --
------------


type alias BeltModel =
    { slot : Int
    , scroll : Int
    , wand : Int
    , potion : Int
    , container : Container Item
    }


newBelt : BeltType -> ID -> ItemStatus -> IdentificationStatus -> Belt
newBelt beltType id status idStatus =
    case beltType of
        TwoSlotBelt ->
            BeltModelTag TwoSlotBelt
                (Model id "Two Slot Belt" 300 300 "SlotBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 2 0 0 0 <| Container.new (Mass.new 2100 3100) getMass equals)

        ThreeSlotBelt ->
            BeltModelTag ThreeSlotBelt
                (Model id "Three Slot Belt" 300 300 "SlotBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 3 0 0 0 <| Container.new (Mass.new 2600 3600) getMass equals)

        FourSlotBelt ->
            BeltModelTag FourSlotBelt
                (Model id "Four Slot Belt" 300 300 "SlotBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 4 0 0 0 <| Container.new (Mass.new 3100 4100) getMass equals)

        UtilityBelt ->
            BeltModelTag UtilityBelt
                (Model id "Utility Belt" 1350 1800 "UtilityBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 2 4 4 0 <| Container.new (Mass.new 3100 4100) getMass equals)

        WandQuiverBelt ->
            BeltModelTag WandQuiverBelt
                (Model id "Wand Quiver Belt" 300 300 "WandQuiverBelt" status idStatus <| Mass.new 0 0)
                (BeltModel 2 0 0 4 <| Container.new (Mass.new 3100 4100) getMass equals)


addToPack : Item -> Pack -> ( Pack, Msg )
addToPack item (PackModelTag packType model packModel) =
    let
        isItemThePack =
            equals item (ItemPack (PackModelTag packType model packModel))

        ( container', msg ) =
            Container.add item packModel.container

        _ =
            Debug.log "is item the pack: " isItemThePack
    in
        if isItemThePack == True then
            ( (PackModelTag packType model packModel), NestedItem )
        else
            case msg of
                Container.Ok ->
                    ( PackModelTag packType model { packModel | container = container' }, Ok )

                Container.MassMsg massMsg ->
                    ( (PackModelTag packType model packModel), MassMsg massMsg )


removeFromPack : Item -> Pack -> Pack
removeFromPack item (PackModelTag packType model packModel) =
    PackModelTag packType model { packModel | container = Container.take item packModel.container }


{-| Get the current mass and mass capacity for the given pack
-}
packInfo : Pack -> ( Mass, Mass )
packInfo (PackModelTag _ model packModel) =
    ( Container.getMass packModel.container, Container.capacity packModel.container )


packContents : Pack -> List Item
packContents (PackModelTag packType model packModel) =
    Container.list packModel.container


type Pack
    = PackModelTag PackType Model PackModel


type alias PackModel =
    { container : Container Item }


newPack : PackType -> ID -> ItemStatus -> IdentificationStatus -> Pack
newPack packType id status idStatus =
    case packType of
        SmallBag ->
            PackModelTag SmallBag
                (Model id "Small Bag" 300 500 "Bag" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 5000 6000) getMass equals)

        MediumBag ->
            PackModelTag MediumBag
                (Model id "Medium Bag" 500 700 "Bag" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 10000 12000) getMass equals)

        LargeBag ->
            PackModelTag LargeBag
                (Model id "Large Bag" 900 900 "Bag" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 15000 18000) getMass equals)

        SmallPack ->
            PackModelTag SmallPack
                (Model id "Small Pack" 1000 1000 "Pack" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 12000 50000) getMass equals)

        MediumPack ->
            PackModelTag MediumPack
                (Model id "Medium Pack" 2000 1500 "Pack" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 22000 75000) getMass equals)

        LargePack ->
            PackModelTag LargePack
                (Model id "Large Pack" 4000 100000 "Pack" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 35000 100000) getMass equals)

        SmallChest ->
            PackModelTag SmallChest
                (Model id "Small Chest" 5000 100000 "Chest" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 100000 50000) getMass equals)

        MediumChest ->
            PackModelTag MediumChest
                (Model id "Medium Chest" 15000 150000 "Chest" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 100000 150000) getMass equals)

        LargeChest ->
            PackModelTag LargeChest
                (Model id "Large Chest" 25000 250000 "Chest" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 100000 250000) getMass equals)

        EnchantedSmallPackOfHolding ->
            PackModelTag EnchantedSmallPackOfHolding
                (Model id "Enchanted Small Pack Of Holding" 5000 75000 "EnchantedPack" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 50000 150000) getMass equals)

        EnchantedMediumPackOfHolding ->
            PackModelTag EnchantedMediumPackOfHolding
                (Model id "Enchanted Medium Pack Of Holding" 7500 100000 "EnchantedPack" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 75000 200000) getMass equals)

        EnchantedLargePackOfHolding ->
            PackModelTag EnchantedLargePackOfHolding
                (Model id "Enchanted Large Pack Of Holding" 10000 125000 "EnchantedPack" status idStatus <| Mass.new 0 0)
                (PackModel <| Container.new (Mass.new 100000 250000) getMass equals)



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


type NeckwearType
    = NoOp1


type OvergarmentType
    = NoOp2


type RingType
    = NoOp3


type BootsType
    = NoOp4



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
        ItemWeapon (WeaponModelTag _ model specificModel) ->
            model

        ItemArmour (ArmourModelTag _ model specificModel) ->
            model

        ItemShield (ShieldModelTag _ model specificModel) ->
            model

        ItemHelmet (HelmetModelTag _ model specificModel) ->
            model

        ItemBracers (BracersModelTag _ model specificModel) ->
            model

        ItemGauntlets (GauntletsModelTag _ model specificModel) ->
            model

        ItemBelt (BeltModelTag _ model specificModel) ->
            model

        ItemPack (PackModelTag _ model specificModel) ->
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
            ItemBelt (newBelt beltType id status idStatus)

        Pack packType ->
            ItemPack (newPack packType id status idStatus)

        Purse ->
            ItemPurse (newPurse id status idStatus)

        -- Neckwear
        --        Overgarment
        --        Ring
        --        Boots
        _ ->
            ItemWeapon (newWeapon Dagger id status idStatus)
