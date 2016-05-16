module CharCreation.Attributes exposing (..) --where

import Html exposing (..)
import Html.App exposing (map)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (..)

import CharCreation.Data exposing (..)

initModel: AttributeModel
initModel = {
  ava = 100,
  str = 20,
  dex = 30,
  con = 40,
  int = 60
  }

update: CharCreation.Data.Attribute -> Int -> AttributeModel -> AttributeModel
update attr val model =
  case attr of
    Available    -> { model | ava = model.ava + val}
    Strength     -> { model | str = model.str + val, ava = model.ava - val}
    Intelligence -> { model | int = model.int + val, ava = model.ava - val}
    Constitution -> { model | con = model.con + val, ava = model.ava - val}
    Dexterity    -> { model | dex = model.dex + val, ava = model.ava - val}

view: AttributeModel -> Html Msg
view model =
  div [] [
    viewAttribute Available model False,
    viewAttribute Strength model True,
    viewAttribute Intelligence model True,
    viewAttribute Dexterity model True,
    viewAttribute Constitution model True
  ]

progressBarStyle: Int -> Html.Attribute Msg
progressBarStyle val = style [
    ("width", (toString val) ++ "%"),
    ("min-width", "0")
  ]

getAttributeValue: CharCreation.Data.Attribute -> AttributeModel -> Int
getAttributeValue attr model = 
  case attr of
    Available    -> model.ava
    Strength     -> model.str
    Intelligence -> model.int
    Constitution -> model.con
    Dexterity    -> model.dex

getDataPercent: CharCreation.Data.Attribute -> CharCreation.Data.AttributeModel -> Html.Attribute Msg
getDataPercent attr model = attribute "data-percent" (toString (getAttributeValue attr model))

viewButtons: CharCreation.Data.Attribute -> Html Msg
viewButtons attr =
  div [class "ui buttons"] [
    button [class "ui icon button", onClick (Attributes attr -5)] [i [class "ui icon minus"] []],
    button [class "ui icon button", onClick (Attributes attr 5)] [i [class "ui icon plus"] []]
  ]

viewAttribute: CharCreation.Data.Attribute -> CharCreation.Data.AttributeModel -> Bool -> Html Msg
viewAttribute attr model buttons =
  div [class "ui segments"] [
    div [class "ui segment left aligned"] [
      h4 [class "ui header"] [text (toString attr)],
      div [class "ui indicating progress", getDataPercent attr model ] [
        div [class "bar", (progressBarStyle (getAttributeValue attr model)) ] [],
        div [class "label"] [text "TODO: Add label"]
      ],
      if buttons then viewButtons attr else div [] []
    ]
  ]

