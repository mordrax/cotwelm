module Hero.Hero
    exposing
        ( Hero
        , init
        , view
        , move
        , teleport
        , position
        , stats
        , setStats
        , viewStats
        , equipment
        , attributes
        , updateEquipment
        , equip
        )

import Html.Attributes exposing (..)
import Html exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Direction as Direction exposing (Direction)
import Stats exposing (Stats)
import Hero.Attributes as Attributes exposing (Attributes)
import Equipment exposing (Equipment, EquipmentSlot)
import GameData.Types as Data
import Utils.Lib as Lib
import Item.Item as Item exposing (Item)



type Hero
    = Hero Model


type alias Model =
    { name : Name
    , position : Vector
    , stats : Stats
    , gender : Data.Gender
    , attributes : Attributes
    , equipment : Equipment
    , expLevel : Int
    }


type alias Name =
    String


init : Name -> Attributes -> Data.Gender -> Hero
init name ({ str, int, con } as attributes) gender =
    let
        hp =
            con // 10 + str // 20

        sp =
            int // 5
    in
        Hero
            { name = name
            , position = ( 11, 17 )
            , stats = Stats.init hp sp
            , gender = gender
            , attributes = attributes
            , equipment = Equipment.init
            , expLevel = 1
            }


attributes : Hero -> Attributes
attributes (Hero { attributes }) =
    attributes


equipment : Hero -> Equipment
equipment (Hero { equipment }) =
    equipment


updateEquipment : Equipment -> Hero -> Hero
updateEquipment equipment (Hero model) =
    Hero { model | equipment = equipment }


move : Direction -> Hero -> Hero
move direction (Hero model) =
    direction
        |> Vector.fromDirection
        |> Vector.add model.position
        |> \x -> Hero { model | position = x }


teleport : Vector -> Hero -> Hero
teleport newPosition (Hero model) =
    Hero { model | position = newPosition }


position : Hero -> Vector
position (Hero model) =
    model.position


stats : Hero -> Stats
stats (Hero model) =
    model.stats


setStats : Stats -> Hero -> Hero
setStats stats (Hero model) =
    Hero { model | stats = stats }



-- Equipment


equip : ( EquipmentSlot, Item ) -> Hero -> Result Equipment.Msg Hero
equip ( slot, item ) (Hero model) =
    Equipment.equip ( slot, item ) model.equipment
        |> Result.map (\equipment -> Hero { model | equipment = equipment })



-- View


view : Hero -> Html a
view (Hero model) =
    let
        heroCss =
            if model.gender == Data.Male then
                "maleHero"
            else
                "femaleHero"
    in
        div [ class ("tile " ++ heroCss), Lib.vectorToHtmlStyle <| model.position ] []


viewStats : Hero -> Html a
viewStats (Hero model) =
    div []
        [ div [] [ text "Stats:" ]
        , div [] [ text <| "HP: " ++ (Stats.printHP model.stats) ]
        , div [] [ text <| "SP: " ++ (Stats.printSP model.stats) ]
        ]
