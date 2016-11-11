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
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Belt as Belt exposing (Belt)
import Item.Purse as Purse exposing (Purse)
import Item.Pack as Pack exposing (Pack)
import Container


-- utils

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
    = Ok
    | MassResult Mass.Msg
    | ContainerMsg Container.Msg
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


equip : Item -> Equipment -> Result Msg Equipment
equip item (A model) =
    case item of
        ItemWeapon weapon ->
            Result.Ok (A { model | weapon = Just weapon })

        ItemArmour armour ->
            Result.Ok (A { model | armour = Just armour })

        ItemShield shield ->
            Result.Ok (A { model | shield = Just shield })

        ItemHelmet helmet ->
            Result.Ok (A { model | helmet = Just helmet })

        ItemBracers bracers ->
            Result.Ok (A { model | bracers = Just bracers })

        ItemGauntlets gauntlets ->
            Result.Ok (A { model | gauntlets = Just gauntlets })

        ItemBelt belt ->
            Result.Ok (A { model | belt = Just belt })

        ItemPurse purse ->
            Result.Ok (A { model | purse = Just purse })

        ItemPack pack ->
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
putInPack : Item -> Equipment -> ( Equipment, Msg )
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
                    ( packWithItem, msg ) =
                        Pack.add item pack
                in
                    ( A { model | pack = Just packWithItem }, ContainerMsg msg )


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


updatePurseContents : Purse -> Equipment -> Equipment
updatePurseContents purse (A model) =
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
