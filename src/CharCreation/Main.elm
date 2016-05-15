module CharCreation.Main exposing (view, initModel, update) -- where

import Html exposing (..)
import Html.App exposing (map)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (..)
import CharCreation.Name exposing (view)
import CharCreation.Gender exposing (view)
import CharCreation.Msg exposing (..)
import CharCreation.Difficulty exposing (view)

initModel: Model
initModel = {
  name       = "testing",
  str        = 50,
  dex        = 50,
  con        = 50,
  agi        = 50,
  gender     = Female,
  difficulty = Hard 
  }


update: Msg -> Model -> Model
update msg model =
  case msg of
    Name newName          -> {model | name       = newName   }
    Gender gender         -> {model | gender     = gender    }
    Difficulty difficulty -> {model | difficulty = difficulty}

view: Model -> Html Msg
view model =
  let 
    bgStyle = [("backgroundColor", "black")]
  in
  div [] [
    div [] [text ("Name: " ++ model.name ++ " Difficulty: " ++ (toString model.difficulty) ++ " Gender: " ++ (toString model.gender))],
    div [class "ui middle aligned center aligned grid"] [    
      div [class "ui one column"] [
        div [class "ui stacked vertical segment"] [
          -- name
          CharCreation.Name.view model.name
        ],

        div [] [text "TODO: Attributes"],

        div [class "ui vertical segments"] [
          div [class "ui vertical segment"] [text "Character Gender"],
          div [class "ui vertical segment"] [
            CharCreation.Gender.view model.gender
          ]
        ],

        CharCreation.Difficulty.view model.difficulty,

        div [class "ui button primary"] [text "Ok"],
        div [class "ui button"] [text "Cancel"],
        div [class "ui button"] [text "View Icon"],
        div [class "ui button"] [text "Help"]
      ]
    ]
  ]