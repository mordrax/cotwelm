module Shop.Shop
    exposing
        ( Shop
        , new
        , view
        , update
        )

import Html exposing (..)
import Shop.Data exposing (..)


-- items

import Item.Item as Item exposing (..)
import Item.TypeDef exposing (..)


type Msg
    = Ok


type Shop
    = SM Model


type alias Model =
    { items : List Item }


new : Shop
new =
    SM (Model [])


update : Msg -> Model -> Model
update msg model =
    model


view : Html Msg
view =
    div [] []
