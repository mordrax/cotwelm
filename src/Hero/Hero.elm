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
        )

import Html.Attributes exposing (..)
import Html exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Direction as Direction exposing (Direction)
import Stats exposing (..)
import Hero.Attributes as Attributes exposing (Attributes)
import GameData.Types as GDT exposing (Gender(..), Difficulty(..))
import Utils.Lib as Lib


type Hero
    = A Model


type alias Model =
    { name : Name
    , position : Vector
    , stats : Stats
    , gender : Gender
    , attributes : Attributes
    }


type alias Name =
    String


init : Name -> Attributes -> Gender -> Hero
init name attributes gender =
    A
        { name = name
        , position = ( 11, 17 )
        , stats = Stats.new 20 10
        , gender = gender
        , attributes = attributes
        }


move : Direction -> Hero -> Hero
move direction (A model) =
    A { model | position = Vector.add model.position (Vector.fromDirection direction) }


position : Hero -> Vector
position (A model) =
    model.position


stats : Hero -> Stats
stats (A model) =
    model.stats


setStats : Stats -> Hero -> Hero
setStats stats (A model) =
    A { model | stats = stats }



-- View


view : Hero -> Html a
view (A model) =
    let
        heroCss =
            if model.gender == Male then
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
