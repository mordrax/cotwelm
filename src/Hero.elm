module Hero
    exposing
        ( Hero
        , init
        )

import Utils.Vector as Vector exposing (..)


type alias Hero =
    { base : BaseHero
    , position : Vector
    }


type alias Model =
    { name : String
    }


type BaseHero
    = BaseHero Model


init : Hero
init =
    Hero (BaseHero <| Model "Bob the Brave")
        (Vector.new 11 17)



--update : Msg -> Hero -> Hero
--update msg (Base model) =
--    case msg of
--        Move dir ->
--            Base { model | pos = Vector.add dir model.pos }
--        Teleport pos ->
--            Base { model | pos = pos }
