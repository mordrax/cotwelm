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
    | SlotTaken
    | InvalidSlot


init : Equipment
init =
    EM
        { weapon = Just (new (Item.Weapon Dagger) Normal Identified)
        , freehand = Nothing
        , armour = Just (new (Item.Armour LeatherArmour) Normal Identified)
        , shield = Just (new (Item.Shield SmallWoodenShield) Normal Identified)
        , helmet = Just (new (Item.Helmet LeatherHelmet) Normal Identified)
        , bracers = Just (new (Item.Bracers NormalBracers) Normal Identified)
        , gauntlets = Just (new (Item.Gauntlets NormalGauntlets) Normal Identified)
        , belt = Just (new (Item.Belt TwoSlotBelt) Normal Identified)
        , purse = Nothing
        , pack = Just (new (Item.Pack MediumPack) Normal Identified)
        , neckwear = Nothing
        , overgarment = Nothing
        , leftring = Nothing
        , rightring = Nothing
        , boots = Nothing
        }


equip : EquipmentSlot -> Item -> Model -> ( Model, Msg )
equip slot item model =
    let
        itemType =
            Item.getType item
    in
        case itemType of
            Item.Weapon _ ->
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
