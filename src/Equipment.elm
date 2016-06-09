module Equipment
    exposing
        ( EquipmentSlot(..)
        , Msg(..)
        , Equipment
        , get
        , init
        , update
        )

{-| Manages equipment slots and any items that are equipped in those slots.
Does not render equipment but will provide a API to retrieve them.

# Equipment basics
@docs EquipmentSlot, Msg, Equipment

# Ingame interactions
@docs get, init, putInPack
-}

import GameData.Item as Item exposing (..)


type alias Model =
    { weapon : Maybe Item
    , freehand : Maybe Item
    , armour : Maybe Item
    , shield : Maybe Item
    , helmet : Maybe Item
    , bracers : Maybe Item
    , gauntlets : Maybe Item
    , belt : Maybe Item
    , purse : Maybe Item
    , pack : Maybe Item
    , neckwear : Maybe Item
    , overgarment : Maybe Item
    , leftRing : Maybe Item
    , rightRing : Maybe Item
    , boots : Maybe Item
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
    = Equip EquipmentSlot Item
    | Unequip EquipmentSlot
    | PutInPack Item


init : Equipment
init =
    let
        pack =
            newPack MediumPack Normal Identified

        ths =
            new (Item.Weapon TwoHandedSword) Normal Identified

        pack' =
            Item.addToPack ths pack
    in
        EquipmentModel
            { weapon = Just (new (Item.Weapon Dagger) Normal Identified)
            , freehand = Nothing
            , armour = Just (new (Item.Armour LeatherArmour) Normal Identified)
            , shield = Just (new (Item.Shield SmallWoodenShield) Normal Identified)
            , helmet = Just (new (Item.Helmet LeatherHelmet) Normal Identified)
            , bracers = Just (new (Item.Bracers NormalBracers) Normal Identified)
            , gauntlets = Just (new (Item.Gauntlets NormalGauntlets) Normal Identified)
            , belt = Just (new (Item.Belt TwoSlotBelt) Normal Identified)
            , purse = Nothing
            , pack = Just (ItemPack pack')
            , neckwear = Nothing
            , overgarment = Nothing
            , leftRing = Nothing
            , rightRing = Nothing
            , boots = Nothing
            }


update : Msg -> Equipment -> Equipment
update msg (EquipmentModel model) =
    case msg of
        PutInPack item ->
            EquipmentModel (putInPack item model)

        _ ->
            Debug.crash "Handle equipping and unequipping"


equip : EquipmentSlot -> Item -> Model -> Model
equip slot item model =
    case item of
        ItemWeapon _ ->
            Debug.crash "TODO: What is this?"

        _ ->
            Debug.crash "TODO: What is this?"


{-| Puts an item in the pack slot of the equipment if there is currently a pack there.
-}
putInPack : Item -> Model -> Model
putInPack item model =
    case model.pack of
        Nothing ->
            model

        Just (ItemPack pack) ->
            let
                pack' =
                    Item.addToPack item pack
            in
                { model | pack = Just <| ItemPack pack' }

        _ ->
            model


get : EquipmentSlot -> Equipment -> Maybe Item
get slot (EquipmentModel model) =
    case slot of
        Weapon ->
            model.weapon

        Freehand ->
            model.freehand

        Armour ->
            model.armour

        Shield ->
            model.shield

        Helmet ->
            model.helmet

        Bracers ->
            model.bracers

        Gauntlets ->
            model.gauntlets

        Belt ->
            model.belt

        Purse ->
            model.purse

        Pack ->
            model.pack

        Neckwear ->
            model.neckwear

        Overgarment ->
            model.overgarment

        LeftRing ->
            model.leftRing

        RightRing ->
            model.rightRing

        Boots ->
            model.boots
