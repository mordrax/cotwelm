module Hero
    exposing
        ( Hero
        , init
        , view
        , move
        , levelUp
        , teleport
        , position
        , stats
        , setStats
        , viewStats
        , updateEquipment
        , equip
        )

import Attributes exposing (Attributes)
import Equipment exposing (Equipment, EquipmentSlot)
import Types exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Item.Item as Item exposing (Item)
import Stats exposing (Stats)
import Types exposing (..)
import Utils.Direction as Direction exposing (Direction)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)


type alias Hero =
    { name : Name
    , type_ : Types.CreatureType
    , position : Vector
    , stats : Stats
    , gender : Gender
    , attributes : Attributes
    , equipment : Equipment
    , expLevel : Int
    , bodySize : Types.BodySize
    , attacks: Int
    }


type alias Name =
    String


init : Name -> Attributes -> Gender -> Hero
init name ({ str, int, con } as attributes) gender =
    { name = name
    , type_ = Types.Hero
    , position = ( 11, 17 )
    , stats = Stats.init attributes
    , gender = gender
    , attributes = attributes
    , equipment = Equipment.init
    , expLevel = 1
    , bodySize = Types.Medium
    , attacks = 1
    }


updateEquipment : Equipment -> Hero -> Hero
updateEquipment equipment model =
    { model | equipment = equipment }


move : Direction -> Hero -> Hero
move direction model =
    direction
        |> Vector.fromDirection
        |> Vector.add model.position
        |> \x -> { model | position = x }


teleport : Vector -> Hero -> Hero
teleport newPosition model =
    { model | position = newPosition }


position : Hero -> Vector
position model =
    model.position


stats : Hero -> Stats
stats model =
    model.stats


setStats : Stats -> Hero -> Hero
setStats stats model =
    { model | stats = stats }


levelUp : Hero -> Hero
levelUp hero =
    { hero | stats = Stats.incLevel 1 hero.attributes hero.stats }



-- Equipment


equip : ( EquipmentSlot, Item ) -> Hero -> Result Equipment.Msg Hero
equip ( slot, item ) model =
    Equipment.equip ( slot, item ) model.equipment
        |> Result.map (\equipment -> { model | equipment = equipment })



-- View


view : Hero -> Html a
view model =
    let
        heroCss =
            if model.gender == Male then
                "male-hero"
            else
                "female-hero"
    in
        div [ HA.class ("tile " ++ heroCss), HA.style (Misc.vectorToHtmlStyle model.position) ] []


viewStats : Hero -> Html a
viewStats model =
    div []
        [ div [] [ text "Stats:" ]
        , div [] [ text <| "HP: " ++ (Stats.printHP model.stats) ]
        , div [] [ text <| "SP: " ++ (Stats.printSP model.stats) ]
        ]
