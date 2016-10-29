module Hero.Hero
    exposing
        ( Hero
        , init
        , view
        , move
        , position
        , stats
        , setStats
        , viewStats
        , equipment
        , equip
        )

import Html.Attributes exposing (..)
import Html exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Direction as Direction exposing (Direction)
import Stats exposing (Stats)
import Hero.Attributes as Attributes exposing (Attributes)
import Equipment exposing (Equipment)
import GameData.Types as Data
import Utils.Lib as Lib
import Item.Item as Item exposing (Item)


type Hero
    = A Model


type alias Model =
    { name : Name
    , position : Vector
    , stats : Stats
    , gender : Data.Gender
    , attributes : Attributes
    , equipment : Equipment
    }


type alias Name =
    String


init : Name -> Attributes -> Data.Gender -> Hero
init name attributes gender =
    A
        { name = name
        , position = ( 11, 17 )
        , stats = Stats.new 20 10
        , gender = gender
        , attributes = attributes
        , equipment = Equipment.init
        }


equipment : Hero -> Equipment
equipment (A model) =
    model.equipment


move : Direction -> Hero -> Hero
move direction (A model) =
    direction
        |> Vector.fromDirection
        |> Vector.add model.position
        |> \x -> A { model | position = x }


position : Hero -> Vector
position (A model) =
    model.position


stats : Hero -> Stats
stats (A model) =
    model.stats


setStats : Stats -> Hero -> Hero
setStats stats (A model) =
    A { model | stats = stats }



-- Equipment


equip : Equipment.EquipmentSlot -> Item -> Hero -> Result Equipment.Msg Hero
equip slot item (A model) =
    Equipment.equip ( slot, item ) model.equipment
        `Result.andThen` \equipment -> Result.Ok (A { model | equipment = equipment })



-- View


view : Hero -> Html a
view (A model) =
    let
        heroCss =
            if model.gender == Data.Male then
                "maleHero"
            else
                "femaleHero"
    in
        div [ class ("tile " ++ heroCss), Lib.vectorToHtmlStyle <| model.position ] []


viewStats : Hero -> Html a
viewStats (A model) =
    div []
        [ div [] [ text "Stats:" ]
        , div [] [ text <| "HP: " ++ (Stats.printHP model.stats) ]
        , div [] [ text <| "SP: " ++ (Stats.printSP model.stats) ]
        ]
