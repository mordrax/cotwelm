module Equipment
    exposing
        ( EquipmentSlot(..)
        , Msg
        , Equipment
        , get
        , init
        , putInPack
        )

{-| Manages equipment slots and any items that are equipped in those slots.
Does not render equipment but will provide a API to retrieve them.
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
    = Ok
    | SlotTaken
    | InvalidSlot


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


equip : EquipmentSlot -> Item -> Model -> ( Model, Msg )
equip slot item model =
    case item of
        ItemWeapon _ ->
            ( model, Ok )

        _ ->
            ( model, Ok )


putInPack : Item -> Equipment -> Equipment
putInPack item (EquipmentModel model) =
    case model.pack of
        Nothing ->
            EquipmentModel model

        Just (ItemPack pack) ->
            let
                pack' =
                    Item.addToPack item pack
            in
                EquipmentModel { model | pack = Just <| ItemPack pack' }

        _ ->
            EquipmentModel model


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
