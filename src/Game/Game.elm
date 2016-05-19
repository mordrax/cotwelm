module Game.Game exposing (..)

import Game.Data as Data exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


initGame : Model
initGame =
    { name = "A new game"
    }


update : Data.Msg -> Model -> Model
update msg model =
    model


view : Model -> Html Data.Msg
view model =
    div []
        [ h1 [] [ text "Main game view" ]
        , div [ class "tile Grass", style [ ( "left", "32px" ), ( "top", "64px" ) ] ] []
        ]
