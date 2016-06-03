module Hero exposing (..)

import Equipment exposing (..)
import Vector exposing (..)


type alias Model =
    { name : String
    , pos : Vector
    , equipment : Equipment
    }


initHero : Model
initHero =
    { name = "Bob the Brave"
    , pos = { x = 11, y = 17 }
    , equipment = Equipment.initModel
    }


update : Vector -> Model -> Model
update dir model =
    { model | pos = Vector.add dir model.pos }


moveY : Int -> Model -> Model
moveY dy model =
    { model | pos = { x = model.pos.x, y = model.pos.y + dy } }


moveX : Int -> Model -> Model
moveX dx model =
    { model | pos = { y = model.pos.y, x = model.pos.x + dx } }


teleport : Vector -> Model -> Model
teleport pos model =
    { model | pos = pos }
