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
import IdGenerator exposing (..)
import Dict exposing (..)


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
init idGenerator =
    let
        getPartialFold =
            \key partialItem id -> ( key, partialItem id )

        preFoldedItems =
            [ getPartialFold "weapon" (Item.new (Item.Weapon Dagger))
            , getPartialFold "armour" (Item.new (Item.Armour ScaleMail))
            , getPartialFold "shield" (Item.new (Item.Shield LargeIronShield))
            , getPartialFold "helmet" (Item.new (Item.Helmet LeatherHelmet))
            , getPartialFold "gauntlets" (Item.new (Item.Gauntlets NormalGauntlets))
            , getPartialFold "belt" (Item.new (Item.Belt TwoSlotBelt))
            , getPartialFold "purse" (Item.new (Item.Purse))
            , getPartialFold "pack" (Item.new (Item.Pack MediumPack))
            , getPartialFold "ths" (Item.new (Item.Weapon TwoHandedSword))
            ]

        ( idedItems, idGenerator' ) =
            List.foldl IdGenerator.assignId ( [], idGenerator ) preFoldedItems

        itemDict =
            Dict.fromList idedItems

        _ =
            Debug.log "ided items" idedItems

        maybePack =
            (Dict.get "pack" itemDict)

        maybeTHS =
            Dict.get "ths" itemDict

        ( pack', _ ) =
            case ( maybePack, maybeTHS ) of
                ( Just (ItemPack pack), Just ths ) ->
                    Item.addToPack ths pack

                _ ->
                    Debug.crash "This is not possible!"
    in
        ( idGenerator'
        , EquipmentModel
            { weapon = Dict.get "weapon" itemDict
            , freehand = Nothing
            , armour = Dict.get "armour" itemDict
            , shield = Dict.get "shield" itemDict
            , helmet = Dict.get "helmet" itemDict
            , bracers = Dict.get "bracers" itemDict
            , gauntlets = Dict.get "gauntlets" itemDict
            , belt = Dict.get "belt" itemDict
            , purse = Dict.get "purse" itemDict
            , pack = Just (ItemPack pack')
            , neckwear =
                Nothing
                --Just (ItemPack pack')
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


removeFromPack : Item -> Equipment -> Equipment
removeFromPack item (EquipmentModel model) =
    let
        noChange =
            (EquipmentModel model)
    in
        case model.pack of
            Nothing ->
                noChange

            Just (ItemPack pack) ->
                EquipmentModel { model | pack = Just (ItemPack (Item.removeFromPack item pack)) }

            _ ->
                Debug.crash "The pack seems to be a non-pack!" 1


getPackContent : Equipment -> List Item
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
