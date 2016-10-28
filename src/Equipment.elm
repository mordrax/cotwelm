module Equipment
    exposing
        ( EquipmentSlot(..)
        , Equipment
        , Msg(..)
        , get
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
import Item.TypeDef exposing (..)


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
    , purse : Maybe Item.Purse
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
    | MassResult Mass.Msg
    | ItemMsg Item.TypeDef.Msg
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


equip : ( EquipmentSlot, Item ) -> Equipment -> Result Msg Equipment
equip ( slot, item ) (A model) =
    case ( slot, item ) of
        ( Weapon, ItemWeapon weapon ) ->
            Result.Ok (A { model | weapon = Just weapon })

        ( Freehand, item ) ->
            Result.Ok (A { model | freehand = Just item })

        ( Armour, ItemArmour armour ) ->
            Result.Ok (A { model | armour = Just armour })

        ( Shield, ItemShield shield ) ->
            Result.Ok (A { model | shield = Just shield })

        ( Helmet, ItemHelmet helmet ) ->
            Result.Ok (A { model | helmet = Just helmet })

        ( Bracers, ItemBracers bracers ) ->
            Result.Ok (A { model | bracers = Just bracers })

        ( Gauntlets, ItemGauntlets gauntlets ) ->
            Result.Ok (A { model | gauntlets = Just gauntlets })

        ( Belt, ItemBelt belt ) ->
            Result.Ok (A { model | belt = Just belt })

        ( Purse, ItemPurse purse ) ->
            Result.Ok (A { model | purse = Just purse })

        ( Pack, ItemPack pack ) ->
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
                    Result.Ok (A <| (setSlot ( slot, Nothing ) model))

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
                    ( pack', msg ) =
                        Item.addToPack item pack
                in
                    ( A { model | pack = Just pack' }, ItemMsg msg )


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
                A { model | pack = Just (Item.removeFromPack item pack) }


getPackContent : Equipment -> List Item
getPackContent (A model) =
    case model.pack of
        Just pack ->
            Item.packContents pack

        _ ->
            []


updatePurseContents : Item.Purse -> Equipment -> Equipment
updatePurseContents purse (A model) =
    A { model | purse = Just purse }



--------------------------
-- Handle get/set slots --
--------------------------


get : EquipmentSlot -> Equipment -> Maybe Item
get slot (A model) =
    case slot of
        Weapon ->
            Maybe.map ItemWeapon model.weapon

        Freehand ->
            model.freehand

        Armour ->
            Maybe.map ItemArmour model.armour

        Shield ->
            Maybe.map ItemShield model.shield

        Helmet ->
            Maybe.map ItemHelmet model.helmet

        Bracers ->
            Maybe.map ItemBracers model.bracers

        Gauntlets ->
            Maybe.map ItemGauntlets model.gauntlets

        Belt ->
            Maybe.map ItemBelt model.belt

        Purse ->
            Maybe.map ItemPurse model.purse

        Pack ->
            Maybe.map ItemPack model.pack

        Neckwear ->
            Maybe.map ItemNeckwear model.neckwear

        Overgarment ->
            Maybe.map ItemOvergarment model.overgarment

        LeftRing ->
            Maybe.map ItemRing model.leftRing

        RightRing ->
            Maybe.map ItemRing model.rightRing

        Boots ->
            Maybe.map ItemBoots model.boots


{-| Sets the equipment slot to either an item or nothing
-}
setSlot : ( EquipmentSlot, Maybe Item ) -> Model -> Model
setSlot ( slot, item ) model =
    case slot of
        Weapon ->
            case item of
                Just (ItemWeapon weapon) ->
                    { model | weapon = Just weapon }

                _ ->
                    { model | weapon = Nothing }

        Freehand ->
            case item of
                Just item ->
                    { model | freehand = Just item }

                _ ->
                    { model | freehand = Nothing }

        Armour ->
            case item of
                Just (ItemArmour armour) ->
                    { model | armour = Just armour }

                _ ->
                    { model | armour = Nothing }

        Shield ->
            case item of
                Just (ItemShield shield) ->
                    { model | shield = Just shield }

                _ ->
                    { model | shield = Nothing }

        Helmet ->
            case item of
                Just (ItemHelmet helmet) ->
                    { model | helmet = Just helmet }

                _ ->
                    { model | helmet = Nothing }

        Bracers ->
            case item of
                Just (ItemBracers bracers) ->
                    { model | bracers = Just bracers }

                _ ->
                    { model | bracers = Nothing }

        Gauntlets ->
            case item of
                Just (ItemGauntlets gauntlets) ->
                    { model | gauntlets = Just gauntlets }

                _ ->
                    { model | gauntlets = Nothing }

        Belt ->
            case item of
                Just (ItemBelt belt) ->
                    { model | belt = Just belt }

                _ ->
                    { model | belt = Nothing }

        Purse ->
            case item of
                Just (ItemPurse purse) ->
                    { model | purse = Just purse }

                _ ->
                    { model | purse = Nothing }

        Pack ->
            case item of
                Just (ItemPack pack) ->
                    { model | pack = Just pack }

                _ ->
                    { model | pack = Nothing }

        Neckwear ->
            case item of
                Just (ItemNeckwear neckwear) ->
                    { model | neckwear = Just neckwear }

                _ ->
                    { model | neckwear = Nothing }

        Overgarment ->
            case item of
                Just (ItemOvergarment overgarment) ->
                    { model | overgarment = Just overgarment }

                _ ->
                    { model | overgarment = Nothing }

        LeftRing ->
            case item of
                Just (ItemRing leftRing) ->
                    { model | leftRing = Just leftRing }

                _ ->
                    { model | leftRing = Nothing }

        RightRing ->
            case item of
                Just (ItemRing rightRing) ->
                    { model | rightRing = Just rightRing }

                _ ->
                    { model | rightRing = Nothing }

        Boots ->
            case item of
                Just (ItemBoots boots) ->
                    { model | boots = Just boots }

                _ ->
                    { model | boots = Nothing }
