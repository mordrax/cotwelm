import Html exposing (..)
import Html.App
import Html.Events exposing (onClick)
import Html.Attributes exposing (src)

main = Html.App.beginnerProgram
  { model = 0
  , update = update
  , view = view
  }

type alias Model = Int
type Action = Inc | Dec

update: Action -> Model -> Model
update action model =
  case action of
    Inc -> model + 1
    Dec -> model - 1

view: Model -> Html Action
view model =
  div [] [ 
    h1 [] [text "Castle of the winds [picture]"], 
    h1 [] [text "Part One a question of vengeance"],
    img [src "public/assets/landing_cotw2.jpg"] []
  --  , button [onClick Inc] [text "New Game"]
  --  , button [onClick Dec] [text "Load Game"]
  --  , button [onClick Dec] [text "Overview"]
    ]