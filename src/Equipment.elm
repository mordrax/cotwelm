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

import EveryDict exposing (EveryDict)
import Item
import Item.Data exposing (..)
import Item.Pack as Pack
import Item.Purse as Purse
import Utils.Misc


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
        getAC : Maybe ( base, { b | ac : AC } ) -> AC
        getAC item =
            item
                |> Maybe.map Tuple.second
                |> Maybe.map .ac
                |> Maybe.withDefault (AC 0)
    in
    getAC armour
        |> addAC (getAC shield)
        |> addAC (getAC helmet)
        |> addAC (getAC bracers)
        |> addAC (getAC gauntlets)


equip : ( EquipmentSlot, Item ) -> Equipment -> Result String ( Equipment, Maybe Item, String )
equip ( slot, item ) (A model) =
    let
        equip_ ( equipmentAfterUnequip, unequippedItem ) =
            setSlot_ ( slot, item ) equipmentAfterUnequip
                |> Result.andThen (\eq -> Result.Ok ( eq, unequippedItem, equipMessage slot item ))
    in
    unequip slot (A model)
        |> Result.andThen equip_


equipMessage : EquipmentSlot -> Item -> String
equipMessage slot item =
    case slot of
        WeaponSlot ->
            "You brandish your " ++ Item.name item ++ " ... _impressively_"

        _ ->
            "You put on your new shiny armour."


{-| setMany_ ignores all equiping errors
-}
setMany_ : List ( EquipmentSlot, Item ) -> Equipment -> Equipment
setMany_ itemSlotPairs equipment =
    Utils.Misc.foldResult (\itemSlotPair -> setSlot_ itemSlotPair) (Ok equipment) itemSlotPairs
        |> Result.withDefault equipment


{-| WARNING: This will destroy the item in the equipment slot.
-}
setSlot_ : ( EquipmentSlot, Item ) -> Equipment -> Result String Equipment
setSlot_ ( slot, (Item base specific) as item ) (A model) =
    case ( slot, specific ) of
        ( WeaponSlot, WeaponDetail weapon ) ->
            Result.Ok (A { model | weapon = Just ( base, weapon ) })

        ( FreehandSlot, _ ) ->
            Result.Ok (A { model | freehand = Just item })

        ( ArmourSlot, ArmourDetail armour ) ->
            Result.Ok (A { model | armour = Just ( base, armour ) })

        ( ShieldSlot, ShieldDetail shield ) ->
            Result.Ok (A { model | shield = Just ( base, shield ) })

        ( HelmetSlot, HelmetDetail helmet ) ->
            Result.Ok (A { model | helmet = Just ( base, helmet ) })

        ( BracersSlot, BracersDetail bracers ) ->
            Result.Ok (A { model | bracers = Just ( base, bracers ) })

        ( GauntletsSlot, GauntletsDetail gauntlets ) ->
            Result.Ok (A { model | gauntlets = Just ( base, gauntlets ) })

        ( BeltSlot, BeltDetail belt ) ->
            Result.Ok (A { model | belt = Just ( base, belt ) })

        ( PurseSlot, PurseDetail purse ) ->
            Result.Ok (A { model | purse = Just ( base, purse ) })

        ( PackSlot, PackDetail pack ) ->
            Result.Ok (A { model | pack = Just ( base, pack ) })

        ( NeckwearSlot, NeckwearDetail neckwear ) ->
            Result.Ok (A { model | neckwear = Just ( base, neckwear ) })

        ( OvergarmentSlot, OvergarmentDetail overgarment ) ->
            Result.Ok (A { model | overgarment = Just ( base, overgarment ) })

        ( LeftRingSlot, RingDetail leftRing ) ->
            Result.Ok (A { model | leftRing = Just ( base, leftRing ) })

        ( RightRingSlot, RingDetail rightRing ) ->
            Result.Ok (A { model | rightRing = Just ( base, rightRing ) })

        ( BootsSlot, BootsDetail boots ) ->
            Result.Ok (A { model | boots = Just ( base, boots ) })

        _ ->
            Result.Err "Hum, it doesn't want to fit, weird..."


unequip : EquipmentSlot -> Equipment -> Result String ( Equipment, Maybe Item )
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
            Result.Err "Urgh, you can't seem to take the item off! Cursed..."

        ( _, False ) ->
            Result.Ok ( A <| clearSlot_ slot model, maybeItem )


{-| Puts an item in the pack slot of the equipment if there is currently a pack there.
-}
putInPack : Item -> Equipment -> Result String Equipment
putInPack (Item base specific) equipment =
    case specific of
        CopperDetail value ->
            Result.Ok (putInPurse (Coins value 0 0 0) equipment)

        SilverDetail value ->
            Result.Ok (putInPurse (Coins 0 value 0 0) equipment)

        GoldDetail value ->
            Result.Ok (putInPurse (Coins 0 0 value 0) equipment)

        PlatinumDetail value ->
            Result.Ok (putInPurse (Coins 0 0 0 value) equipment)

        _ ->
            putInPack_ (Item base specific) equipment


putInPack_ : Item -> Equipment -> Result String Equipment
putInPack_ ((Item base specific) as item) (A model) =
    case ( model.pack, specific ) of
        ( Nothing, _ ) ->
            Result.Err "You try to put it in your pack, only to find that you don't actually have any."

        ( _, PackDetail _ ) ->
            Result.Err "Cannot Put A Pack In A Pack In A Pack In a Pack inap Ackin ap AK on a donkey."

        ( Just pack, _ ) ->
            Pack.add item pack
                |> Result.andThen (\pack -> Result.Ok <| A { model | pack = Just pack })


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
    let
        toItem tag ( base, detail ) =
            Item base (tag detail)
    in
    case slot of
        WeaponSlot ->
            Maybe.map (toItem WeaponDetail) model.weapon

        FreehandSlot ->
            model.freehand

        ArmourSlot ->
            Maybe.map (toItem ArmourDetail) model.armour

        ShieldSlot ->
            Maybe.map (toItem ShieldDetail) model.shield

        HelmetSlot ->
            Maybe.map (toItem HelmetDetail) model.helmet

        BracersSlot ->
            Maybe.map (toItem BracersDetail) model.bracers

        GauntletsSlot ->
            Maybe.map (toItem GauntletsDetail) model.gauntlets

        BeltSlot ->
            Maybe.map (toItem BeltDetail) model.belt

        PurseSlot ->
            Maybe.map (toItem PurseDetail) model.purse

        PackSlot ->
            Maybe.map (toItem PackDetail) model.pack

        NeckwearSlot ->
            Maybe.map (toItem NeckwearDetail) model.neckwear

        OvergarmentSlot ->
            Maybe.map (toItem OvergarmentDetail) model.overgarment

        LeftRingSlot ->
            Maybe.map (toItem RingDetail) model.leftRing

        RightRingSlot ->
            Maybe.map (toItem RingDetail) model.rightRing

        BootsSlot ->
            Maybe.map (toItem BootsDetail) model.boots


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
