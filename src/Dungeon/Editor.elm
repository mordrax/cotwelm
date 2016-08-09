module Dungeon.Editor exposing (..)

import Html exposing (..)


type alias Model =
    {}


type Msg
    = Noop


init : Model
init =
    {}


update : Msg -> Model -> Model
update msg model =
    model


view : Model -> Html Msg
view model =
    text "Dungeon editor"
