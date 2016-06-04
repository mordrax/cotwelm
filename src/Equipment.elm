module Equipment
    exposing
        ( EquipmentSlot
        , Msg
        , Equipment
        , getPack
        , init
        , viewEquipment
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import GameData.Item as Item exposing (..)


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
    , leftring : Maybe Item
    , rightring : Maybe Item
    , boots : Maybe Item
    }


type Equipment
    = EM Model


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
    | SlotTaken
    | InvalidSlot


init : Equipment
init =
    let
        pack =
            newPack MediumPack Normal Identified

        ths =
            new (Weapon TwoHandedSword) Normal Identified

        pack' =
            Item.addToPack ths pack
    in
        EM
            { weapon = Just (new (Weapon Dagger) Normal Identified)
            , freehand = Nothing
            , armour = Just (new (Armour LeatherArmour) Normal Identified)
            , shield = Just (new (Shield SmallWoodenShield) Normal Identified)
            , helmet = Just (new (Helmet LeatherHelmet) Normal Identified)
            , bracers = Just (new (Bracers NormalBracers) Normal Identified)
            , gauntlets = Just (new (Gauntlets NormalGauntlets) Normal Identified)
            , belt = Just (new (Belt TwoSlotBelt) Normal Identified)
            , purse = Nothing
            , pack = Just (ItemPack pack')
            , neckwear = Nothing
            , overgarment = Nothing
            , leftring = Nothing
            , rightring = Nothing
            , boots = Nothing
            }


equip : EquipmentSlot -> Item -> Model -> ( Model, Msg )
equip slot item model =
    case item of
        ItemWeapon _ ->
            ( model, Ok )

        _ ->
            ( model, Ok )


getPack : Equipment -> Maybe Item
getPack (EM model) =
    model.pack


equipmentSlotStyle : Html.Attribute msg
equipmentSlotStyle =
    style [ ( "border", "1px Solid Black" ) ]


viewEquipment : Equipment -> Html msg
viewEquipment (EM model) =
    div []
        [ viewIfItem model.weapon
        , viewIfItem model.freehand
        , viewIfItem model.armour
        , viewIfItem model.shield
        , viewIfItem model.helmet
        , viewIfItem model.bracers
        , viewIfItem model.gauntlets
        , viewIfItem model.belt
        , viewIfItem model.purse
        , viewIfItem model.pack
        , viewIfItem model.neckwear
        , viewIfItem model.overgarment
        , viewIfItem model.leftring
        , viewIfItem model.rightring
        , viewIfItem model.boots
        ]


viewIfItem : Maybe Item -> Html msg
viewIfItem maybeItem =
    let
        slotCss =
            class "three wide column equipmentSlot"
    in
        case maybeItem of
            Just item ->
                div [ slotCss ]
                    [ Item.view item ]

            Nothing ->
                div [ slotCss ] [ text "Empty" ]
