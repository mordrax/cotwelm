module Hero.Hero exposing (..)

import Hero.Data exposing (..)
import Vector exposing (..)


initHero : Model
initHero =
    { name = "Bob the Brave"
    , pos = { x = 11, y = 17 }
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
