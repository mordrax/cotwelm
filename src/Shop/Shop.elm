module Shop.Shop exposing (..)

import Html exposing (..)
import Shop.Data exposing (..)


type alias Model =
    Int


initShop : Model
initShop =
    5


update : Msg -> Model -> Model
update msg model =
    model


view : Html Msg
view =
    div [] []
