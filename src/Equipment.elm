module Equipment
    exposing
        ( EquipmentSlot(..)
        , Equipment
        , Msg(..)
        , get
        , getPurse
        , getPack
        , getWeapon
        , getArmour
        , init
        , equip
        , equipMany
        , unequip
        , putInPack
        , removeFromPack
        , getPackContent
        , setPurse
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
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Belt as Belt exposing (Belt)
import Item.Purse as Purse exposing (Purse)
import Item.Pack as Pack exposing (Pack)
import Container


-- utils

import Utils.Lib as Lib
import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- core


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
    = A Model


type EquipmentSlot
    = WeaponSlot
    | FreehandSlot
    | ArmourSlot
    | ShieldSlot
    | HelmetSlot
    | BracersSlot
    | GauntletsSlot
    | BeltSlot
    | PurseSlot
    | PackSlot
    | NeckwearSlot
    | OvergarmentSlot
    | LeftRingSlot
    | RightRingSlot
    | BootsSlot


type Msg
    = Success
    | MassResult Mass.Msg
    | ContainerMsg Container.Msg
    | NoPackEquipped
    | WrongSlotForItemType
    | ItemAlreadyEquipped


init : Equipment
init =
    A
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


equipMany : List ( EquipmentSlot, Item ) -> Equipment -> Equipment
equipMany itemSlotPairs equipment =
    let
        equippingResult =
            Lib.foldResult (\item -> equip item) (Result.Ok equipment) itemSlotPairs
    in
        case equippingResult of
            Result.Ok equipment_ ->
                equipment_

            _ ->
                equipment


equip : ( EquipmentSlot, Item ) -> Equipment -> Result Msg Equipment
equip ( slot, item ) (A model) =
    case ( slot, item ) of
        ( WeaponSlot, ItemWeapon weapon ) ->
            case model.weapon of
                Nothing ->
                    Ok (A { model | weapon = Just weapon })

                _ ->
                    Err ItemAlreadyEquipped

        ( FreehandSlot, item ) ->
            case model.freehand of
                Nothing ->
                    Result.Ok (A { model | freehand = Just item })

                _ ->
                    Err ItemAlreadyEquipped

        ( ArmourSlot, ItemArmour armour ) ->
            case model.armour of
                Nothing ->
                    Result.Ok (A { model | armour = Just armour })

                _ ->
                    Err ItemAlreadyEquipped

        ( ShieldSlot, ItemShield shield ) ->
            case model.shield of
                Nothing ->
                    Result.Ok (A { model | shield = Just shield })

                _ ->
                    Err ItemAlreadyEquipped

        ( HelmetSlot, ItemHelmet helmet ) ->
            case model.helmet of
                Nothing ->
                    Result.Ok (A { model | helmet = Just helmet })

                _ ->
                    Err ItemAlreadyEquipped

        ( BracersSlot, ItemBracers bracers ) ->
            case model.bracers of
                Nothing ->
                    Result.Ok (A { model | bracers = Just bracers })

                _ ->
                    Err ItemAlreadyEquipped

        ( GauntletsSlot, ItemGauntlets gauntlets ) ->
            case model.gauntlets of
                Nothing ->
                    Result.Ok (A { model | gauntlets = Just gauntlets })

                _ ->
                    Err ItemAlreadyEquipped

        ( BeltSlot, ItemBelt belt ) ->
            case model.belt of
                Nothing ->
                    Result.Ok (A { model | belt = Just belt })

                _ ->
                    Err ItemAlreadyEquipped

        ( PurseSlot, ItemPurse purse ) ->
            case model.purse of
                Nothing ->
                    Result.Ok (A { model | purse = Just purse })

                _ ->
                    Err ItemAlreadyEquipped

        ( PackSlot, ItemPack pack ) ->
            case model.pack of
                Nothing ->
                    Result.Ok (A { model | pack = Just pack })

                _ ->
                    Err ItemAlreadyEquipped

        ( NeckwearSlot, ItemNeckwear neckwear ) ->
            case model.neckwear of
                Nothing ->
                    Result.Ok (A { model | neckwear = Just neckwear })

                _ ->
                    Err ItemAlreadyEquipped

        ( OvergarmentSlot, ItemOvergarment overgarment ) ->
            case model.overgarment of
                Nothing ->
                    Result.Ok (A { model | overgarment = Just overgarment })

                _ ->
                    Err ItemAlreadyEquipped

        ( LeftRingSlot, ItemRing leftRing ) ->
            case model.leftRing of
                Nothing ->
                    Result.Ok (A { model | leftRing = Just leftRing })

                _ ->
                    Err ItemAlreadyEquipped

        ( RightRingSlot, ItemRing rightRing ) ->
            case model.rightRing of
                Nothing ->
                    Result.Ok (A { model | rightRing = Just rightRing })

                _ ->
                    Err ItemAlreadyEquipped

        ( BootsSlot, ItemBoots boots ) ->
            case model.boots of
                Nothing ->
                    Result.Ok (A { model | boots = Just boots })

                _ ->
                    Err ItemAlreadyEquipped

        _ ->
            Result.Err WrongSlotForItemType


unequip : EquipmentSlot -> Equipment -> Result String Equipment
unequip slot (A model) =
    let
        maybeItem =
            get slot (A model)
    in
        case maybeItem of
            Just item ->
                if (Item.isCursed item) then
                    Result.Err "You cannot remove a cursed item!"
                else
                    Result.Ok (A <| unequip_ slot model)

            Nothing ->
                Result.Ok (A model)


{-| Puts an item in the pack slot of the equipment if there is currently a pack there.
-}
putInPack : Item -> Equipment -> ( Equipment, Msg )
putInPack item equipment =
    case item of
        Item.ItemCopper { value } ->
            ( putInPurse (Purse.Coins value 0 0 0) equipment, Success )

        Item.ItemSilver { value } ->
            ( putInPurse (Purse.Coins 0 value 0 0) equipment, Success )

        Item.ItemGold { value } ->
            ( putInPurse (Purse.Coins 0 0 value 0) equipment, Success )

        Item.ItemPlatinum { value } ->
            ( putInPurse (Purse.Coins 0 0 0 value) equipment, Success )

        _ ->
            putInPack_ item equipment


putInPack_ : Item -> Equipment -> ( Equipment, Msg )
putInPack_ item (A model) =
    let
        noChange =
            ( A model, Success )
    in
        case model.pack of
            Nothing ->
                ( A model, NoPackEquipped )

            Just pack ->
                let
                    ( packWithItem, msg ) =
                        Pack.add item pack
                in
                    ( A { model | pack = Just packWithItem }, ContainerMsg msg )


putInPurse : Purse.Coins -> Equipment -> Equipment
putInPurse coins equipment =
    let
        purse =
            getPurse equipment
                |> Maybe.withDefault Purse.init
                |> Purse.addCoins coins
    in
        setPurse purse equipment


removeFromPack : Item -> Equipment -> Equipment
removeFromPack item (A model) =
    let
        noChange =
            (A model)
    in
        case model.pack of
            Nothing ->
                noChange

            Just pack ->
                A { model | pack = Just (Pack.remove item pack) }


getPackContent : Equipment -> List Item
getPackContent (A model) =
    case model.pack of
        Just pack ->
            Pack.contents pack

        _ ->
            []


setPurse : Purse -> Equipment -> Equipment
setPurse purse (A model) =
    A { model | purse = Just purse }



--------------------------
-- Handle get/set slots --
--------------------------


getPurse : Equipment -> Maybe Purse
getPurse (A model) =
    model.purse


getPack : Equipment -> Maybe (Pack Item)
getPack (A model) =
    model.pack


getWeapon : Equipment -> Maybe Weapon
getWeapon (A model) =
    model.weapon


getArmour : Equipment -> Maybe Armour
getArmour (A model) =
    model.armour


get : EquipmentSlot -> Equipment -> Maybe Item
get slot (A model) =
    case slot of
        WeaponSlot ->
            model.weapon |> Maybe.map ItemWeapon

        FreehandSlot ->
            model.freehand

        ArmourSlot ->
            model.armour |> Maybe.map ItemArmour

        ShieldSlot ->
            model.shield |> Maybe.map ItemShield

        HelmetSlot ->
            model.helmet |> Maybe.map ItemHelmet

        BracersSlot ->
            model.bracers |> Maybe.map ItemBracers

        GauntletsSlot ->
            model.gauntlets |> Maybe.map ItemGauntlets

        BeltSlot ->
            model.belt |> Maybe.map ItemBelt

        PurseSlot ->
            model.purse |> Maybe.map ItemPurse

        PackSlot ->
            model.pack |> Maybe.map ItemPack

        NeckwearSlot ->
            model.neckwear |> Maybe.map ItemNeckwear

        OvergarmentSlot ->
            model.overgarment |> Maybe.map ItemOvergarment

        LeftRingSlot ->
            model.leftRing |> Maybe.map ItemRing

        RightRingSlot ->
            model.rightRing |> Maybe.map ItemRing

        BootsSlot ->
            model.boots |> Maybe.map ItemBoots


{-| Sets the equipment slot to either an item or nothing
-}
unequip_ : EquipmentSlot -> Model -> Model
unequip_ slot model =
    case slot of
        WeaponSlot ->
            { model | weapon = Nothing }

        FreehandSlot ->
            { model | freehand = Nothing }

        ArmourSlot ->
            { model | armour = Nothing }

        ShieldSlot ->
            { model | shield = Nothing }

        HelmetSlot ->
            { model | helmet = Nothing }

        BracersSlot ->
            { model | bracers = Nothing }

        GauntletsSlot ->
            { model | gauntlets = Nothing }

        BeltSlot ->
            { model | belt = Nothing }

        PurseSlot ->
            { model | purse = Nothing }

        PackSlot ->
            { model | pack = Nothing }

        NeckwearSlot ->
            { model | neckwear = Nothing }

        OvergarmentSlot ->
            { model | overgarment = Nothing }

        LeftRingSlot ->
            { model | leftRing = Nothing }

        RightRingSlot ->
            { model | rightRing = Nothing }

        BootsSlot ->
            { model | boots = Nothing }
