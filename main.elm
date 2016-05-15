import SplashView exposing (..)
import CharCreation.Main exposing (..)
import CharCreation.Msg exposing (..)
import CotwMsg as Cotw exposing (Msg(..), Page(..))

import Html exposing (..)
import Html.App exposing (map)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)


main = Html.App.beginnerProgram
  { model = initModel,
    update = update,
    view = view
  }

initModel: Model
initModel = {
    currentPage = SplashPage,
    character = CharCreation.Main.initModel
  }

type alias Model = {
  currentPage: Page,
  character: CharCreation.Msg.Model
  }

update: Cotw.Msg -> Model -> Model
update msg model =
  case msg of
    SplashMsg NewGame ->
      { model | currentPage = CharCreationPage }
    SplashMsg _ ->
      { model | currentPage = NotImplementedPage }
    CharCreationMsg msg ->
      { model | character = CharCreation.Main.update msg model.character }

view: Model -> Html Cotw.Msg
view model = 
  case model.currentPage of
    CharCreationPage ->
      div [] [map CharCreationMsg (CharCreation.Main.view model.character)]

    SplashPage ->
      div [] [map SplashMsg SplashView.view]

    _ ->
      h1 [] [text "Page not implemented!"]

