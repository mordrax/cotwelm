module Counter exposing(Model, init, update, view, Msg) -- where

import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)

type alias Model = Int

type Msg = Inc | Dec

init: Int -> Model
init number =
  number

update: Msg -> Model -> Model
update msg model = 
  case msg of
    Inc ->
      model + 1
    Dec ->
      model - 1


view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Dec ] [ text "-" ]    
    , div [ countStyle ] [ text (toString model) ]
    , button [ onClick Inc ] [ text "+" ]
    ]

countStyle : Attribute Msg
countStyle = 
  style 
    [ ("font-size", "20px")
    , ("font-family", "monospace")
    , ("display", "inline-block")
    , ("width", "50px")
    , ("text-align", "center")
    ]