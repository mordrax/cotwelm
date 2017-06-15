module Equipment
    exposing
        ( Equipment
        , EquipmentSlot(..)
        , Msg(..)
        , calculateAC
        , clearSlot_
        , equip
        , get
        , getArmour
        , getPack
        , getPackContent
        , getPurse
        , getWeapon
        , init
        , putInPack
        , removeFromPack
        , setMany_
        , setPurse
        , setSlot_
        , slotDisplayName
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
import EveryDict exposing (EveryDict)
import Item
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Purse as Purse
import Utils.Mass as Mass
import Utils.Misc


type alias Model =
    { weapon : Maybe ( Weapon, BaseItem )
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
    | CannotPutAPackInAPack


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
    let
        andThenEquipItem ( equipmentAfterUnequip, unequippedItem ) =
            setSlot_ ( slot, item ) equipmentAfterUnequip
                |> Result.andThen (\eq -> Result.Ok ( eq, unequippedItem ))
    in
    unequip slot (A model)
        |> Result.andThen andThenEquipItem


{-| setMany_ ignores all equiping errors
-}
setMany_ : List ( EquipmentSlot, Item ) -> Equipment -> Equipment
setMany_ itemSlotPairs equipment =
    Utils.Misc.foldResult (\itemSlotPair -> setSlot_ itemSlotPair) (Ok equipment) itemSlotPairs
        |> Result.withDefault equipment


{-| WARNING: This will destroy the item in the equipment slot.
-}
setSlot_ : ( EquipmentSlot, Item ) -> Equipment -> Result Msg Equipment
setSlot_ ( slot, item ) (A model) =
    case ( slot, item ) of
        ( WeaponSlot, ItemWeapon weapon ) ->
            Result.Ok (A { model | weapon = Just weapon })

        ( FreehandSlot, item ) ->
            Result.Ok (A { model | freehand = Just item })

        ( ArmourSlot, ItemArmour armour ) ->
            Result.Ok (A { model | armour = Just armour })

        ( ShieldSlot, ItemShield shield ) ->
            Result.Ok (A { model | shield = Just shield })

        ( HelmetSlot, ItemHelmet helmet ) ->
            Result.Ok (A { model | helmet = Just helmet })

        ( BracersSlot, ItemBracers bracers ) ->
            Result.Ok (A { model | bracers = Just bracers })

        ( GauntletsSlot, ItemGauntlets gauntlets ) ->
            Result.Ok (A { model | gauntlets = Just gauntlets })

        ( BeltSlot, ItemBelt belt ) ->
            Result.Ok (A { model | belt = Just belt })

        ( PurseSlot, ItemPurse purse ) ->
            Result.Ok (A { model | purse = Just purse })

        ( PackSlot, ItemPack pack ) ->
            Result.Ok (A { model | pack = Just pack })

        ( NeckwearSlot, ItemNeckwear neckwear ) ->
            Result.Ok (A { model | neckwear = Just neckwear })

        ( OvergarmentSlot, ItemOvergarment overgarment ) ->
            Result.Ok (A { model | overgarment = Just overgarment })

        ( LeftRingSlot, ItemRing leftRing ) ->
            Result.Ok (A { model | leftRing = Just leftRing })

        ( RightRingSlot, ItemRing rightRing ) ->
            Result.Ok (A { model | rightRing = Just rightRing })

        ( BootsSlot, ItemBoots boots ) ->
            Result.Ok (A { model | boots = Just boots })

        _ ->
            Result.Err WrongSlotForItemType


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
        ( Nothing, _ ) ->
            Result.Ok ( A model, Nothing )

        ( _, True ) ->
            Result.Err CannotUnequipCursedItem

        ( _, False ) ->
            Result.Ok ( A <| clearSlot_ slot model, maybeItem )


{-| Puts an item in the pack slot of the equipment if there is currently a pack there.
-}
putInPack : Item -> Equipment -> ( Equipment, Msg )
putInPack item equipment =
    case item of
        ItemCopper { value } ->
            ( putInPurse (Coins value 0 0 0) equipment, Success )

        ItemSilver { value } ->
            ( putInPurse (Coins 0 value 0 0) equipment, Success )

        ItemGold { value } ->
            ( putInPurse (Coins 0 0 value 0) equipment, Success )

        ItemPlatinum { value } ->
            ( putInPurse (Coins 0 0 0 value) equipment, Success )

        _ ->
            putInPack_ item equipment


putInPack_ : Item -> Equipment -> ( Equipment, Msg )
putInPack_ item (A model) =
    let
        noChange =
            ( A model, Success )
    in
    case ( model.pack, item ) of
        ( Nothing, _ ) ->
            ( A model, NoPackEquipped )

        ( _, ItemPack _ ) ->
            ( A model, CannotPutAPackInAPack )

        ( Just pack, _ ) ->
            let
                ( packWithItem, msg ) =
                    Pack.add item pack
            in
            ( A { model | pack = Just packWithItem }, ContainerMsg msg )


putInPurse : Coins -> Equipment -> Equipment
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
            A model
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


clearSlot_ : EquipmentSlot -> Model -> Model
clearSlot_ slot model =
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


slotDisplayName : EquipmentSlot -> String
slotDisplayName =
    getFromDict displayNameDict
        >> Maybe.withDefault "UnknownSlot"


getFromDict : EveryDict a b -> a -> Maybe b
getFromDict =
    flip EveryDict.get


displayNameDict : EveryDict EquipmentSlot String
displayNameDict =
    EveryDict.fromList
        [ ( WeaponSlot, "Weapon" )
        , ( FreehandSlot, "Free hand" )
        , ( ArmourSlot, "Armour" )
        , ( ShieldSlot, "Shield" )
        , ( HelmetSlot, "Helmet" )
        , ( BracersSlot, "Bracers" )
        , ( GauntletsSlot, "Gauntlets" )
        , ( BeltSlot, "Belt" )
        , ( PurseSlot, "Purse" )
        , ( PackSlot, "Pack" )
        , ( NeckwearSlot, "Neckwear" )
        , ( OvergarmentSlot, "Overgarment" )
        , ( LeftRingSlot, "Left ring" )
        , ( RightRingSlot, "Right ring" )
        , ( BootsSlot, "Boots" )
        ]
