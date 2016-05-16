module CharCreation.Gender exposing (view) -- where

import CharCreation.Data exposing (..)
import Html exposing (..)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)

view: Gender -> Html Msg
view gender = 
  let 
    activeMale = if gender == Male then "active" else ""
    activeFemale = if gender == Female then "active" else ""
  in
    div [class "equal width column"] [
      div [class "ui large buttons"] [ 
        button [ class ("ui labeled icon button " ++ activeMale), 
              onClick (Gender Male) ]
            [ 
              i [ class "large male icon" ] [], 
              text "Male" 
            ],
        div [ class "or"] [],
        button [ class ("ui labeled icon button " ++ activeFemale),
             onClick (Gender Female)] [
          i [class "large female icon"] [],
          text "Female"
        ]
      ]
    ]