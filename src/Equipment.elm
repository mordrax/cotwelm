module Equipment exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import GameData.Item exposing (..)


type alias Model =
    { weapon : Maybe GameData.Item.Model
    , armour : Maybe GameData.Item.Model
    , shield : Maybe GameData.Item.Model
    , helmet : Maybe GameData.Item.Model
    , bracers : Maybe GameData.Item.Model
    , gauntlets : Maybe GameData.Item.Model
    , belt : Maybe GameData.Item.Model
    , purse : Maybe GameData.Item.Model
    , pack : Maybe GameData.Item.Model
    , neckwear : Maybe GameData.Item.Model
    , overgarment : Maybe GameData.Item.Model
    , ring : Maybe GameData.Item.Model
    , boots : Maybe GameData.Item.Model
    }


initModel : Model
initModel =
    { weapon = Just (GameData.Item.newWeapon Dagger Normal True)
    , armour = Just (GameData.Item.newArmour LeatherArmour Normal True)
    , shield = Just (GameData.Item.newShield SmallWoodenShield Normal True)
    , helmet = Just (GameData.Item.newHelmet LeatherHelmet Normal True)
    , bracers = Just (GameData.Item.newBracers NormalBracers Normal True)
    , gauntlets = Just (GameData.Item.newGauntlets NormalGauntlet Normal True)
    , belt = Just (GameData.Item.newBelt TwoSlotBelt Normal True)
    , purse = Nothing
    , pack = Just (GameData.Item.newPack MediumPack Normal True)
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


maybeItemView : Maybe GameData.Item.Model -> Html msg
maybeItemView maybeItem =
    case maybeItem of
        Just item ->
            viewItem item

        Nothing ->
            div [] []
