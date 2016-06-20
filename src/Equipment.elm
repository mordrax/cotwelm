module Equipment
    exposing
        ( EquipmentSlot(..)
        , Equipment
        , Msg(..)
        , getSlot
        , init
        , equip
        , unequip
        , putInPack
        , removeFromPack
        , getPackContent
        )

{-| Manages equipment slots and any items that are equipped in those slots.
Does not render equipment but will provide a API to retrieve them.

# Equipment basics
@docs EquipmentSlot, Msg, Equipment

# Ingame interactions
@docs get, init, putInPack
-}

--items

import Item.Item as Item exposing (..)
import Item.TypeDef exposing (..)


-- utils

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- core

import Dict exposing (..)


type alias Model =
    { weapon : Maybe Weapon
    , freehand : Maybe Item
    , armour : Maybe Armour
    , shield : Maybe Shield
    , helmet : Maybe Helmet
    , bracers : Maybe Bracers
    , gauntlets : Maybe Gauntlets
    , belt : Maybe (Belt Item)
    , purse : Maybe Purse
    , pack : Maybe (Pack Item)
    , neckwear : Maybe Neckwear
    , overgarment : Maybe Overgarment
    , leftRing : Maybe Ring
    , rightRing : Maybe Ring
    , boots : Maybe Boots
    }


type Equipment
    = EquipmentModel Model


type EquipmentSlot
    = Weapon
    | Freehand
    | Armour
    | Shield
    | Helmet
    | Bracers
    | Gauntlets
    | Belt
    | Purse
    | Pack
    | Neckwear
    | Overgarment
    | LeftRing
    | RightRing
    | Boots


type Msg
    = Ok
    | MassResult Mass.Msg
    | ItemMsg Item.TypeDef.Msg
    | NoPackEquipped


new : Equipment
new =
    EquipmentModel
        { weapon = Nothing
        , freehand = Nothing
        , armour = Nothing
        , shield = Nothing
        , helmet = Nothing
        , bracers = Nothing
        , gauntlets = Nothing
        , belt = Nothing
        , purse = Nothing
        , pack = Nothing
        , neckwear = Nothing
        , overgarment = Nothing
        , leftRing = Nothing
        , rightRing = Nothing
        , boots = Nothing
        }


init : IdGenerator -> ( IdGenerator, Equipment )
init idGenerator =
    let
        preFoldedItems =
            List.map newFoldableItem
                [ ( Weapon, (Item.new (Item.Weapon Dagger)) )
                , ( Armour, (Item.new (Item.Armour ScaleMail)) )
                , ( Shield, (Item.new (Item.Shield LargeIronShield)) )
                , ( Helmet, (Item.new (Item.Helmet LeatherHelmet)) )
                , ( Gauntlets, (Item.new (Item.Gauntlets NormalGauntlets)) )
                , ( Belt, (Item.new (Item.Belt TwoSlotBelt)) )
                , ( Purse, (Item.new (Item.Purse)) )
                , ( Pack, (Item.new (Item.Pack MediumPack)) )
                ]

        ( itemsWithSlots, idGenerator' ) =
            List.foldl IdGenerator.assignId ( [], idGenerator ) preFoldedItems

        ( id, idGenerator'' ) =
            IdGenerator.getUniqueId idGenerator'

        ths =
            Item.new (Item.Weapon TwoHandedSword) id

        equipment' =
            List.foldl equip new itemsWithSlots

        ( equipment'', _ ) =
            putInPack ths equipment'
    in
        ( idGenerator', equipment'' )


equip : ( EquipmentSlot, Item ) -> Equipment -> Equipment
equip ( slot, item ) (EquipmentModel model) =
    EquipmentModel (setSlot slot (Just item) model)


unequip : EquipmentSlot -> Equipment -> Result String Equipment
unequip slot (EquipmentModel model) =
    let
        maybeItem =
            getSlot slot (EquipmentModel model)
    in
        case maybeItem of
            Just item ->
                if (Item.isCursed item) then
                    Result.Err "You cannot remove a cursed item!"
                else
                    Result.Ok (EquipmentModel <| (setSlot slot Nothing model))

            Nothing ->
                Result.Ok (EquipmentModel model)


{-| Puts an item in the pack slot of the equipment if there is currently a pack there.
-}
putInPack : Item -> Equipment -> ( Equipment, Msg )
putInPack item (EquipmentModel model) =
    let
        noChange =
            ( EquipmentModel model, Ok )
    in
        case model.pack of
            Nothing ->
                ( EquipmentModel model, NoPackEquipped )

            Just pack ->
                let
                    ( pack', msg ) =
                        Item.addToPack item pack
                in
                    ( EquipmentModel { model | pack = Just pack' }, ItemMsg msg )



--             _ ->
--                 noChange


removeFromPack : Item -> Equipment -> Equipment
removeFromPack item (EquipmentModel model) =
    let
        noChange =
            (EquipmentModel model)
    in
        case model.pack of
            Nothing ->
                noChange

            Just pack ->
                EquipmentModel { model | pack = Just (Item.removeFromPack item pack) }



--             _ ->
--                 Debug.crash "The pack seems to be a non-pack!" 1


getPackContent : Equipment -> List Item
getPackContent (EquipmentModel model) =
    case model.pack of
        Just pack ->
            Item.packContents pack

        _ ->
            []



--------------------------
-- Handle get/set slots --
--------------------------


getSlot : EquipmentSlot -> Equipment -> Maybe Item
getSlot slot (EquipmentModel model) =
    case slot of
        Weapon ->
            Maybe.map ItemWeapon model.weapon

        Freehand ->
            model.freehand

        Armour ->
            Maybe.map ItemArmour model.armour

        Shield ->
            Maybe.map ItemShield model.shield

        Helmet ->
            Maybe.map ItemHelmet model.helmet

        Bracers ->
            Maybe.map ItemBracers model.bracers

        Gauntlets ->
            Maybe.map ItemGauntlets model.gauntlets

        Belt ->
            Maybe.map ItemBelt model.belt

        Purse ->
            Maybe.map ItemPurse model.purse

        Pack ->
            Maybe.map ItemPack model.pack

        Neckwear ->
            Maybe.map ItemNeckwear model.neckwear

        Overgarment ->
            Maybe.map ItemOvergarment model.overgarment

        LeftRing ->
            Maybe.map ItemRing model.leftRing

        RightRing ->
            Maybe.map ItemRing model.rightRing

        Boots ->
            Maybe.map ItemBoots model.boots


{-| Sets the equipment slot to the maybe item.
-}
setSlot : EquipmentSlot -> Maybe Item -> Model -> Model
setSlot slot item model =
    case ( slot, item ) of
        --        ( Weapon, Just (ItemWeapon weapon) ) ->
        --            { model | weapon = Just weapon }
        --
        --        --
        --        ( Weapon, Nothing ) ->
        --            { model | weapon = Nothing }
        --
        --        --
        --        ( Freehand, Just item ) ->
        --            { model | freehand = Just item }
        --
        --        --
        --        ( Freehand, Nothing ) ->
        --            { model | freehand = Nothing }
        --
        --        --
        --        ( Armour, Just (ItemArmour armour) ) ->
        --            { model | armour = Just armour }
        --
        --        --
        --        ( Armour, Nothing ) ->
        --            { model | armour = Nothing }
        --
        --        --
        --        ( Shield, Just (ItemShield shield) ) ->
        --            { model | shield = Just shield }
        --
        --        --
        --        ( Shield, Nothing ) ->
        --            { model | shield = Nothing }
        --
        --        --
        --        ( Helmet, Just (ItemHelmet helmet) ) ->
        --            { model | helmet = Just helmet }
        --
        --        --
        --        ( Helmet, Nothing ) ->
        --            { model | helmet = Nothing }
        --
        --        --
        --        ( Bracers, Just (ItemBracers bracers) ) ->
        --            { model | bracers = Just bracers }
        --
        --        --
        --        ( Bracers, Nothing ) ->
        --            { model | bracers = Nothing }
        --
        --        --
        --        ( Gauntlets, Just (ItemGauntlets gauntlets) ) ->
        --            { model | gauntlets = Just gauntlets }
        --
        --        --
        --        ( Gauntlets, Nothing ) ->
        --            { model | gauntlets = Nothing }
        --
        ( Belt, Just (ItemBelt belt) ) ->
            { model | belt = Just belt }

        --
        ( Belt, Nothing ) ->
            { model | belt = Nothing }

        --
        ( Purse, Just (ItemPurse purse) ) ->
            { model | purse = Just purse }

        --
        ( Purse, Nothing ) ->
            { model | purse = Nothing }

        --
        --        ( Pack, Just (ItemPack pack) ) ->
        --            { model | pack = Just pack }
        --
        --        ( Pack, Nothing ) ->
        --            { model | pack = Nothing }
        --
        --        ( Neckwear, Just (ItemNeckwear neckwear) ) ->
        --            { model | neckwear = Just neckwear }
        --
        --        ( Neckwear, Nothing ) ->
        --            { model | neckwear = Nothing }
        --
        --        ( Overgarment, Just (ItemOvergarment overgarment) ) ->
        --            { model | overgarment = Just overgarment }
        --
        --        ( Overgarment, Nothing ) ->
        --            { model | overgarment = Nothing }
        --
        --        ( LeftRing, Just (ItemRing leftRing) ) ->
        --            { model | leftRing = Just leftRing }
        --
        --        ( LeftRing, Nothing ) ->
        --            { model | leftRing = Nothing }
        --
        --        ( RightRing, Just (ItemRing rightRing) ) ->
        --            { model | rightRing = Just rightRing }
        --
        --        ( RightRing, Nothing ) ->
        --            { model | rightRing = Nothing }
        --
        --        ( Boots, Just (ItemBoots boots) ) ->
        --            { model | boots = Just boots }
        --
        --        ( Boots, Nothing ) ->
        --            { model | boots = Nothing }
        ( _, _ ) ->
            model
