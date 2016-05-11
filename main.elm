import CounterPair exposing (update, view, init)

import Html.App

main = Html.App.beginnerProgram
  { model = init 0 0
  , update = update
  , view = view
  }

--view: Model -> Html Action
--view model =
--  div []
--    [ h1 [] [text "Castle of the winds [picture]"]
  --  , h1 [] [text "Part One a question of vengeance"]    
  --  , button [onClick Inc] [text "New Game"]
  --  , button [onClick Dec] [text "Load Game"]
  --  , button [onClick Dec] [text "Overview"]
    --]