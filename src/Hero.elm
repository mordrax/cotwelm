module Hero
    exposing
        ( Hero
        , Msg(Move, Teleport)
        , init
        , update
        , pos
        )

import Equipment exposing (..)
import Vector exposing (..)
import GameData.Item exposing (..)


type alias Model =
    { name : String
    , pos : Vector
    }


type Hero
    = Hero Model


type Msg
    = Move Vector
    | Teleport Vector


init : Hero
init =
    Hero
        { name = "Bob the Brave"
        , pos = { x = 11, y = 17 }
        }


pos : Hero -> Vector
pos (Hero hero) =
    hero.pos


update : Msg -> Hero -> Hero
update msg (Hero model) =
    case msg of
        Move dir ->
            Hero { model | pos = Vector.add dir model.pos }

        Teleport pos ->
            Hero { model | pos = pos }
