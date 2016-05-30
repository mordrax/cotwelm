module Equipment exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import GameData.Item exposing (..)


type alias Model =
    { weapon : Maybe GameData.Item.Model
    , armour : Maybe GameData.Item.Model
    }


initModel : Model
initModel =
    { weapon = Just (GameData.Item.newWeapon Dagger)
    , armour = Just (GameData.Item.newArmour LeatherArmour)
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
            ]
        ]


maybeItemView : Maybe GameData.Item.Model -> Html msg
maybeItemView maybeItem =
    case maybeItem of
        Just item ->
            viewItem item

        Nothing ->
            div [] []
