module Equipment exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import GameData.Item as Item exposing (..)


type alias Model =
    { weapon : Maybe Item
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
    , ring : Maybe Item
    , boots : Maybe Item
    }


initModel : Model
initModel =
    { weapon = Just (Item.new (Weapon Dagger) Normal Identified)
    , armour = Just (Item.new (Armour LeatherArmour) Normal Identified)
    , shield = Just (Item.new (Shield SmallWoodenShield) Normal Identified)
    , helmet = Just (Item.new (Helmet LeatherHelmet) Normal Identified)
    , bracers = Just (Item.new (Bracers NormalBracers) Normal Identified)
    , gauntlets = Just (Item.new (Gauntlets NormalGauntlets) Normal Identified)
    , belt = Just (Item.new (Belt TwoSlotBelt) Normal Identified)
    , purse = Nothing
    , pack = Just (Item.new (Pack MediumPack) Normal Identified)
    , neckwear = Nothing
    , overgarment = Nothing
    , ring = Nothing
    , boots = Nothing
    }


equipmentSlotStyle : Html.Attribute msg
equipmentSlotStyle =
    style [ ( "border", "1px Solid Black" ) ]


viewEquipment : Model -> Html msg
viewEquipment model =
    div [ class "ui grid" ]
        [ div [ class "three wide column equipmentSlot" ]
            [ maybeItemView model.weapon
            , maybeItemView model.armour
            , maybeItemView model.shield
            , maybeItemView model.helmet
            , maybeItemView model.bracers
            , maybeItemView model.gauntlets
            , maybeItemView model.belt
            , maybeItemView model.purse
            , maybeItemView model.pack
            , maybeItemView model.neckwear
            , maybeItemView model.overgarment
            , maybeItemView model.ring
            , maybeItemView model.boots
            ]
        ]


maybeItemView : Maybe Item -> Html msg
maybeItemView maybeItem =
    case maybeItem of
        Just item ->
            viewItem item

        Nothing ->
            div [] []
