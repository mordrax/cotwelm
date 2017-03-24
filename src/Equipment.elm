module Equipment
    exposing
        ( EquipmentSlot(..)
        , Equipment
        , Msg(..)
        , calculateAC
        , equip
        , setMany_
        , get
        , getArmour
        , getPack
        , getPackContent
        , getPurse
        , getWeapon
        , init
        , putInPack
        , removeFromPack
        , setPurse
        , setSlot_
        , unequip
        )

{-| Manages equipment slots and any items that are equipped in those slots.
Does not render equipment but will provide a API to retrieve them.

# Equipment basics
@docs EquipmentSlot, Msg, Equipment

# Ingame interactions
@docs get, init, putInPack
-}

import Container
import Html exposing (..)
import Item.Belt as Belt exposing (Belt)
import Item.Data exposing (..)
import Item.Item as Item exposing (Item)
import Item.Pack as Pack exposing (Pack)
import Item.Purse as Purse exposing (Purse)
import Utils.Misc as Misc
import Utils.Mass as Mass


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
    | CannotUnequipCursedItem


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


calculateAC : Equipment -> AC
calculateAC (A { armour, shield, helmet, bracers, gauntlets }) =
    let
        getAC : Maybe { b | ac : AC } -> AC
        getAC item =
            item
                |> Maybe.map .ac
                |> Maybe.withDefault (AC 0)
    in
        getAC armour
            |> addAC (getAC shield)
            |> addAC (getAC helmet)
            |> addAC (getAC bracers)
            |> addAC (getAC gauntlets)


equip : ( EquipmentSlot, Item ) -> Equipment -> Result Msg ( Equipment, Maybe Item )
equip ( slot, item ) (A model) =
    unequip slot (A model)
        |> Result.map (\( equipmentAfterUnequip, unequippedItem ) -> ( setSlot_ ( slot, item ) equipmentAfterUnequip, unequippedItem ))


setMany_ : List ( EquipmentSlot, Item ) -> Equipment -> Equipment
setMany_ itemSlotPairs equipment =
    List.foldl (\itemSlotPair -> setSlot_ itemSlotPair) equipment itemSlotPairs


{-| WARNING: This will destroy the item in the equipment slot.
-}
setSlot_ : ( EquipmentSlot, Item ) -> Equipment -> Equipment
setSlot_ ( slot, item ) (A model) =
    case ( slot, item ) of
        ( WeaponSlot, Item.ItemWeapon weapon ) ->
            (A { model | weapon = Just weapon })

        ( FreehandSlot, item ) ->
            (A { model | freehand = Just item })

        ( ArmourSlot, Item.ItemArmour armour ) ->
            (A { model | armour = Just armour })

        ( ShieldSlot, Item.ItemShield shield ) ->
            (A { model | shield = Just shield })

        ( HelmetSlot, Item.ItemHelmet helmet ) ->
            (A { model | helmet = Just helmet })

        ( BracersSlot, Item.ItemBracers bracers ) ->
            (A { model | bracers = Just bracers })

        ( GauntletsSlot, Item.ItemGauntlets gauntlets ) ->
            (A { model | gauntlets = Just gauntlets })

        ( BeltSlot, Item.ItemBelt belt ) ->
            (A { model | belt = Just belt })

        ( PurseSlot, Item.ItemPurse purse ) ->
            (A { model | purse = Just purse })

        ( PackSlot, Item.ItemPack pack ) ->
            (A { model | pack = Just pack })

        ( NeckwearSlot, Item.ItemNeckwear neckwear ) ->
            (A { model | neckwear = Just neckwear })

        ( OvergarmentSlot, Item.ItemOvergarment overgarment ) ->
            (A { model | overgarment = Just overgarment })

        ( LeftRingSlot, Item.ItemRing leftRing ) ->
            (A { model | leftRing = Just leftRing })

        ( RightRingSlot, Item.ItemRing rightRing ) ->
            (A { model | rightRing = Just rightRing })

        ( BootsSlot, Item.ItemBoots boots ) ->
            (A { model | boots = Just boots })

        _ ->
            (A model)


unequip : EquipmentSlot -> Equipment -> Result Msg ( Equipment, Maybe Item )
unequip slot (A model) =
    let
        maybeItem =
            get slot (A model)

        itemCursed =
            maybeItem
                |> Maybe.map Item.isCursed
                |> Maybe.withDefault False
    in
        case ( maybeItem, itemCursed ) of
            ( Just item, False ) ->
                Result.Ok ( (A <| clearSlot slot model), Just item )

            ( Just item, True ) ->
                Result.Err CannotUnequipCursedItem

            ( Nothing, _ ) ->
                Result.Ok ( (A model), Nothing )


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
            model.weapon |> Maybe.map Item.ItemWeapon

        FreehandSlot ->
            model.freehand

        ArmourSlot ->
            model.armour |> Maybe.map Item.ItemArmour

        ShieldSlot ->
            model.shield |> Maybe.map Item.ItemShield

        HelmetSlot ->
            model.helmet |> Maybe.map Item.ItemHelmet

        BracersSlot ->
            model.bracers |> Maybe.map Item.ItemBracers

        GauntletsSlot ->
            model.gauntlets |> Maybe.map Item.ItemGauntlets

        BeltSlot ->
            model.belt |> Maybe.map Item.ItemBelt

        PurseSlot ->
            model.purse |> Maybe.map Item.ItemPurse

        PackSlot ->
            model.pack |> Maybe.map Item.ItemPack

        NeckwearSlot ->
            model.neckwear |> Maybe.map Item.ItemNeckwear

        OvergarmentSlot ->
            model.overgarment |> Maybe.map Item.ItemOvergarment

        LeftRingSlot ->
            model.leftRing |> Maybe.map Item.ItemRing

        RightRingSlot ->
            model.rightRing |> Maybe.map Item.ItemRing

        BootsSlot ->
            model.boots |> Maybe.map Item.ItemBoots


clearSlot : EquipmentSlot -> Model -> Model
clearSlot slot model =
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
