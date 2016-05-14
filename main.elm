import Html exposing (..)
import Html.App
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)

main = Html.App.beginnerProgram
  { model = 0
  , update = update
  , view = view
  }

type alias Model = Int
type Msg = NewGame | LoadGame | Overview

update: Msg -> Model -> Model
update action model =
  model
  
view: Model -> Html Msg
view model =
  let 
    bgStyle = [("backgroundColor", "black")]
  in
  div [class "ui middle aligned center aligned grid fullscreen",
       style bgStyle] [
    div [class "ui one column"] [
      div [class "ui column"] [
        img [src "public/assets/landing_cotw1.jpg"] []
      ],

      div [class "ui column"] [
        img [src "public/assets/landing_cotw2.jpg"] []
      ],

      div [class "ui column"] [
        div [class "ui buttons"] [
          button [class "ui button primary", onClick NewGame] [text "New Game"],
          button [class "ui button", onClick LoadGame] [text "Load Game"],
          button [class "ui button", onClick Overview] [text "Overview"]
        ]
      ]
    ]
  ]