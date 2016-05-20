module Game.Game exposing (..)

import Game.Data as Data exposing (..)
import Maps.Maps exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


initGame : Model
initGame =
    { name = "A new game"
    , map = Village
    }


update : Data.Msg -> Model -> Model
update msg model =
    model


view : Model -> Html Data.Msg
view model =
    div []
        [ h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]
        , viewMap model.map
        ]


viewMap : Map -> Html Data.Msg
viewMap map =
    case map of
        Village ->
            villageMap Data.Nothing

        notImplemented ->
            h2 [ style [ ( "color", "red" ) ] ] [ text ("Not implemented map specified: " ++ toString notImplemented) ]


viewVillage : Html Data.Msg
viewVillage =
    div [] [ text "Map of village" ]
