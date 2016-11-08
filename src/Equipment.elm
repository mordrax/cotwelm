module Equipment
    exposing
        ( EquipmentSlot(..)
        , Equipment
        , Msg(..)
        , get
        , getPurse
        , getPack
        , init
        , equip
        , unequip
        , putInPack
        , removeFromPack
        , getPackContent
        , updatePurseContents
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
import Item.Data


-- utils

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- core


type alias Model =
    { weapon : Maybe (Item Weapon)
    , freehand : Maybe AnyItem
    , armour : Maybe (Item Armour)
    , shield : Maybe (Item Shield)
    , helmet : Maybe (Item Helmet)
    , bracers : Maybe (Item Bracers)
    , gauntlets : Maybe (Item Gauntlets)
    , belt : Maybe (Item (Belt AnyItem))
    , purse : Maybe (Item Purse)
    , pack : Maybe (Item (Pack AnyItem))
    , neckwear : Maybe (Item Neckwear)
    , overgarment : Maybe (Item Overgarment)
    , leftRing : Maybe (Item Ring)
    , rightRing : Maybe (Item Ring)
    , boots : Maybe (Item Boots)
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
    = Ok
    | MassResult Mass.Msg
    | ItemMsg Item.Data.Msg
    | NoPackEquipped
    | WrongSlotForItemType


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


equip : AnyItem -> Equipment -> Result Msg Equipment
equip item (A model) =
    case item of
        AnyItemWeapon weapon ->
            Result.Ok (A { model | weapon = Just weapon })

        AnyItemArmour armour ->
            Result.Ok (A { model | armour = Just armour })

        AnyItemShield shield ->
            Result.Ok (A { model | shield = Just shield })

        AnyItemHelmet helmet ->
            Result.Ok (A { model | helmet = Just helmet })

        AnyItemBracers bracers ->
            Result.Ok (A { model | bracers = Just bracers })

        AnyItemGauntlets gauntlets ->
            Result.Ok (A { model | gauntlets = Just gauntlets })

        AnyItemBelt belt ->
            Result.Ok (A { model | belt = Just belt })

        AnyItemPurse purse ->
            Result.Ok (A { model | purse = Just purse })

        AnyItemPack pack ->
            Result.Ok (A { model | pack = Just pack })

        --         ( Neckwear, ItemNeckwear neckwear ) ->
        --             Result.Ok (A { model | neckwear = Just neckwear })
        --         ( Overgarment, ItemOvergarment overgarment ) ->
        --             Result.Ok (A { model | overgarment = Just overgarment })
        --         ( LeftRing, ItemRing leftRing ) ->
        --             Result.Ok (A { model | leftRing = Just leftRing })
        --         ( RightRing, ItemRing rightRing ) ->
        --             Result.Ok (A { model | rightRing = Just rightRing })
        --         ( Boots, ItemBoots boots ) ->
        --             Result.Ok (A { model | boots = Just boots })
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
putInPack : AnyItem -> Equipment -> ( Equipment, Msg )
putInPack item (A model) =
    let
        noChange =
            ( A model, Ok )
    in
        case model.pack of
            Nothing ->
                ( A model, NoPackEquipped )

            Just pack ->
                let
                    ( pack', msg ) =
                        Item.addToPack item pack
                in
                    ( A { model | pack = Just pack' }, ItemMsg msg )


removeFromPack : AnyItem -> Equipment -> Equipment
removeFromPack item (A model) =
    let
        noChange =
            (A model)
    in
        case model.pack of
            Nothing ->
                noChange

            Just pack ->
                A { model | pack = Just (Item.removeFromPack item pack) }


getPackContent : Equipment -> List AnyItem
getPackContent (A model) =
    case model.pack of
        Just pack ->
            Item.packContents pack

        _ ->
            []


updatePurseContents : Item Purse -> Equipment -> Equipment
updatePurseContents purse (A model) =
    A { model | purse = Just purse }



--------------------------
-- Handle get/set slots --
--------------------------


getPurse : Equipment -> Maybe (Item Purse)
getPurse (A model) =
    model.purse


getPack : Equipment -> Maybe (Item (Pack AnyItem))
getPack (A model) =
    model.pack


get : EquipmentSlot -> Equipment -> Maybe AnyItem
get slot (A model) =
    case slot of
        WeaponSlot ->
            model.weapon |> Maybe.map AnyItemWeapon

        FreehandSlot ->
            model.freehand

        ArmourSlot ->
            model.armour |> Maybe.map AnyItemArmour

        ShieldSlot ->
            model.shield |> Maybe.map AnyItemShield

        HelmetSlot ->
            model.helmet |> Maybe.map AnyItemHelmet

        BracersSlot ->
            model.bracers |> Maybe.map AnyItemBracers

        GauntletsSlot ->
            model.gauntlets |> Maybe.map AnyItemGauntlets

        BeltSlot ->
            model.belt |> Maybe.map AnyItemBelt

        PurseSlot ->
            model.purse |> Maybe.map AnyItemPurse

        PackSlot ->
            model.pack |> Maybe.map AnyItemPack

        NeckwearSlot ->
            model.neckwear |> Maybe.map AnyItemNeckwear

        OvergarmentSlot ->
            model.overgarment |> Maybe.map AnyItemOvergarment

        LeftRingSlot ->
            model.leftRing |> Maybe.map AnyItemRing

        RightRingSlot ->
            model.rightRing |> Maybe.map AnyItemRing

        BootsSlot ->
            model.boots |> Maybe.map AnyItemBoots


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
