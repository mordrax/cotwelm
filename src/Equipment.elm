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
    { weapon : Maybe (Weapon BasicItem)
    , freehand : Maybe (Item BasicItem)
    , armour : Maybe (Armour BasicItem)
    , shield : Maybe (Shield BasicItem)
    , helmet : Maybe (Helmet BasicItem)
    , bracers : Maybe (Bracers BasicItem)
    , gauntlets : Maybe (Gauntlets BasicItem)
    , belt : Maybe (Belt BasicItem)
    , purse : Maybe (Purse BasicItem)
    , pack : Maybe (Pack BasicItem)
    , neckwear : Maybe (Neckwear BasicItem)
    , overgarment : Maybe (Overgarment BasicItem)
    , leftRing : Maybe (Ring BasicItem)
    , rightRing : Maybe (Ring BasicItem)
    , boots : Maybe (Boots BasicItem)
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


equip : ( EquipmentSlot, Item BasicItem ) -> Equipment -> Result Msg ( Equipment, Maybe (Item BasicItem) )
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
setMany_ : List ( EquipmentSlot, Item BasicItem ) -> Equipment -> Equipment
setMany_ itemSlotPairs equipment =
    Utils.Misc.foldResult (\itemSlotPair -> setSlot_ itemSlotPair) (Ok equipment) itemSlotPairs
        |> Result.withDefault equipment


{-| WARNING: This will destroy the item in the equipment slot.
-}
setSlot_ : ( EquipmentSlot, Item BasicItem ) -> Equipment -> Result Msg Equipment
setSlot_ ( slot, { type_ } as item ) (A model) =
    case ( slot, type_ ) of
        ( WeaponSlot, BIT_Weapon ) ->
            Result.Ok (A { model | weapon = Just item })

        ( FreehandSlot, _ ) ->
            Result.Ok (A { model | freehand = Just item })

        ( ArmourSlot, BIT_Armour ) ->
            Result.Ok (A { model | armour = Just item })

        ( ShieldSlot, BIT_Shield ) ->
            Result.Ok (A { model | shield = Just item })

        ( HelmetSlot, BIT_Helmet ) ->
            Result.Ok (A { model | helmet = Just item })

        ( BracersSlot, BIT_Bracers ) ->
            Result.Ok (A { model | bracers = Just item })

        ( GauntletsSlot, BIT_Gauntlets ) ->
            Result.Ok (A { model | gauntlets = Just item })

        ( BeltSlot, BIT_Belt ) ->
            Result.Ok (A { model | belt = Just item })

        ( PurseSlot, BIT_Purse ) ->
            Result.Ok (A { model | purse = Just item })

        ( PackSlot, BIT_Pack ) ->
            Result.Ok (A { model | pack = Just item })

        ( NeckwearSlot, BIT_Neckwear ) ->
            Result.Ok (A { model | neckwear = Just item })

        ( OvergarmentSlot, BIT_Overgarment ) ->
            Result.Ok (A { model | overgarment = Just item })

        ( LeftRingSlot, BIT_Ring ) ->
            Result.Ok (A { model | leftRing = Just item })

        ( RightRingSlot, BIT_Ring ) ->
            Result.Ok (A { model | rightRing = Just item })

        ( BootsSlot, BIT_Boots ) ->
            Result.Ok (A { model | boots = Just item })

        _ ->
            Result.Err WrongSlotForItemType


unequip : EquipmentSlot -> Equipment -> Result Msg ( Equipment, Maybe (Item BasicItem) )
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
putInPack : Item BasicItem -> Equipment -> ( Equipment, Msg )
putInPack ({ type_ } as item) equipment =
    let
        toCoins : Item BasicItem -> CopperCoins BasicItem
        toCoins x =
            x
    in
    case type_ of
        BIT_Copper ->
            toCoins item
                |> (\coins -> ( putInPurse (Coins coins.value 0 0 0) equipment, Success ))

        BIT_Silver ->
            toCoins item
                |> (\coins -> ( putInPurse (Coins 0 coins.value 0 0) equipment, Success ))

        BIT_Gold ->
            toCoins item
                |> (\coins -> ( putInPurse (Coins 0 0 coins.value 0) equipment, Success ))

        BIT_Platinum ->
            toCoins item
                |> (\coins -> ( putInPurse (Coins 0 0 0 coins.value) equipment, Success ))

        _ ->
            putInPack_ item equipment


putInPack_ : Item BasicItem -> Equipment -> ( Equipment, Msg )
putInPack_ ({ type_ } as item) (A model) =
    let
        noChange =
            ( A model, Success )
    in
    case ( model.pack, type_ ) of
        ( Nothing, _ ) ->
            ( A model, NoPackEquipped )

        ( _, BIT_Pack ) ->
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


removeFromPack : Item BasicItem -> Equipment -> Equipment
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


getPackContent : Equipment -> List (Item BasicItem)
getPackContent (A model) =
    case model.pack of
        Just pack ->
            Pack.contents pack

        _ ->
            []


setPurse : Purse BasicItem -> Equipment -> Equipment
setPurse purse (A model) =
    A { model | purse = Just purse }



--------------------------
-- Handle get/set slots --
--------------------------


getPurse : Equipment -> Maybe (Purse BasicItem)
getPurse (A model) =
    model.purse


getPack : Equipment -> Maybe (Pack BasicItem)
getPack (A model) =
    model.pack


getWeapon : Equipment -> Maybe (Weapon BasicItem)
getWeapon (A model) =
    model.weapon


getArmour : Equipment -> Maybe (Armour BasicItem)
getArmour (A model) =
    model.armour


get : EquipmentSlot -> Equipment -> Maybe (Item BasicItem)
get slot (A model) =
    case slot of
        WeaponSlot ->
            model.weapon

        FreehandSlot ->
            model.freehand

        ArmourSlot ->
            model.armour

        ShieldSlot ->
            model.shield

        HelmetSlot ->
            model.helmet

        BracersSlot ->
            model.bracers

        GauntletsSlot ->
            model.gauntlets

        BeltSlot ->
            model.belt

        PurseSlot ->
            model.purse

        PackSlot ->
            model.pack

        NeckwearSlot ->
            model.neckwear

        OvergarmentSlot ->
            model.overgarment

        LeftRingSlot ->
            model.leftRing

        RightRingSlot ->
            model.rightRing

        BootsSlot ->
            model.boots


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
