module Equipment
    exposing
        ( EquipmentSlot(..)
        , Msg(..)
        , Equipment
        , getSlot
        , init
        , update
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

import GameData.Item as Item exposing (..)
import Mass exposing (..)
import Container exposing (..)
import Purse exposing (..)


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


init : IdGenerator -> ( IdGenerator, Equipment )
init idGen =
    let
        -- ignore mass comparison as this is a test case with a empty pack so should be able to hold a single two handed sword
        ( weaponId, weaponIdGen ) =
            IdGenerator.get idGen

        ( armourId, armourIdGen ) =
            IdGenerator.get weaponIdGen

        ( shieldId, shieldIdGen ) =
            IdGenerator.get armourIdGen

        ( helmetId, helmetIdGen ) =
            IdGenerator.get shieldIdGen

        ( bracersId, bracersIdGen ) =
            IdGenerator.get helmetIdGen

        ( gauntletsId, gauntletsIdGen ) =
            IdGenerator.get bracersIdGen

        ( beltId, beltIdGen ) =
            IdGenerator.get gauntletsIdGen

        ( purseId, purseIdGen ) =
            IdGenerator.get beltIdGen

        ( packId, packIdGen ) =
            IdGenerator.get purseIdGen

        pack =
            Item.new Pack SmallPack

        ths =
            Item.new (Item.Weapon TwoHandedSword)

        ( pack', _ ) =
            Item.addToPack ths pack
    in
        ( ids'
        , EquipmentModel
            { weapon = Just (Item.new (Item.Weapon Dagger) weaponId)
            , freehand = Nothing
            , armour = Just (Item.new (Item.Armour ScaleMail) armourId)
            , shield = Just (Item.new (Item.Shield LargeIronShield) shieldId)
            , helmet = Just (Item.new (Item.Helmet LeatherHelmet) helmetId)
            , bracers = Just (Item.new (Item.Bracers NormalBracers) bracersId)
            , gauntlets = Just (Item.new (Item.Gauntlets NormalGauntlets) gauntletsId)
            , belt = Just (Item.new (Item.Belt TwoSlotBelt) beltId)
            , purse = Just (Item.new Item.Purse purseId)
            , pack = Just (pack')
            , neckwear = Just (ItemPack pack')
            , overgarment = Nothing
            , leftRing = Nothing
            , rightRing = Nothing
            , boots = Nothing
            }
        )


update : Msg -> Equipment -> Equipment
update msg (EquipmentModel model) =
    case msg of
        _ ->
            Debug.crash "Handle equipping and unequipping"


equip : EquipmentSlot -> Item -> Equipment -> Equipment
equip slot item (EquipmentModel model) =
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
putInPack : Item -> Equipment -> ( Equipment, Mass.MassComparison )
putInPack item (EquipmentModel model) =
    let
        noChange =
            ( EquipmentModel model, Mass.Ok )
    in
        case model.pack of
            Nothing ->
                noChange

            Just (ItemPack pack) ->
                let
                    ( pack', massComparison ) =
                        Item.addToPack item pack
                in
                    ( EquipmentModel { model | pack = Just <| ItemPack pack' }, massComparison )

            _ ->
                noChange


removeFromPack : IDItem Item -> Equipment -> Equipment
removeFromPack idItem (EquipmentModel model) =
    let
        noChange =
            (EquipmentModel model)
    in
        case model.pack of
            Nothing ->
                noChange

            Just (ItemPack pack) ->
                EquipmentModel { model | pack = Just (ItemPack (Item.removeFromPack idItem pack)) }

            _ ->
                Debug.crash "The pack seems to be a non-pack!" 1


getPackContent : Equipment -> List (IDItem Item)
getPackContent (EquipmentModel model) =
    case model.pack of
        Just (ItemPack pack) ->
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


{-| Sets the equipment slot to the maybe item.
-}
setSlot : EquipmentSlot -> Maybe Item -> Model -> Model
setSlot slot maybeItem model =
    case slot of
        Weapon ->
            { model | weapon = maybeItem }

        Freehand ->
            { model | freehand = maybeItem }

        Armour ->
            { model | armour = maybeItem }

        Shield ->
            { model | shield = maybeItem }

        Helmet ->
            { model | helmet = maybeItem }

        Bracers ->
            { model | bracers = maybeItem }

        Gauntlets ->
            { model | gauntlets = maybeItem }

        Belt ->
            { model | belt = maybeItem }

        Purse ->
            { model | purse = maybeItem }

        Pack ->
            { model | pack = maybeItem }

        Neckwear ->
            { model | neckwear = maybeItem }

        Overgarment ->
            { model | overgarment = maybeItem }

        LeftRing ->
            { model | leftRing = maybeItem }

        RightRing ->
            { model | rightRing = maybeItem }

        Boots ->
            { model | boots = maybeItem }
