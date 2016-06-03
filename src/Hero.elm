module Hero
    exposing
        ( Hero
        , init
        , teleport
        , update
        , equipment
        , pos
        )

import Equipment exposing (..)
import Vector exposing (..)


type alias Model =
    { name : String
    , pos : Vector
    , equipment : Equipment
    }


type Hero
    = Hero Model


init : Hero
init =
    Hero
        { name = "Bob the Brave"
        , pos = { x = 11, y = 17 }
        , equipment = Equipment.init
        }


pos : Hero -> Vector
pos (Hero hero) =
    hero.pos


equipment : Hero -> Equipment
equipment (Hero hero) =
    hero.equipment


update : Vector -> Hero -> Hero
update dir (Hero model) =
    Hero { model | pos = Vector.add dir model.pos }


moveY : Int -> Model -> Hero
moveY dy model =
    Hero { model | pos = { x = model.pos.x, y = model.pos.y + dy } }


moveX : Int -> Model -> Hero
moveX dx model =
    Hero { model | pos = { y = model.pos.y, x = model.pos.x + dx } }


teleport : Vector -> Hero -> Hero
teleport pos (Hero model) =
    Hero { model | pos = pos }
