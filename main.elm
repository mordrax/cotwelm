import SplashView exposing (view)
import CharCreation exposing (view)

import Html exposing (..)
import Html.App
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)


main = Html.App.beginnerProgram
  { model = {currentPage = "splash"}
  , update = update
  , view = view
  }

type alias Model = {
  currentPage: String
  }

type Msg = NewGame | LoadGame | Overview

update: String -> Model -> Model
update msg model =
  case msg of
    "new" -> 
      { model | currentPage = "new" }
    _ -> 
      model

view: Model -> Html String
view model = 
  case model.currentPage of
    "new" -> CharCreation.view
    _ -> SplashView.view
