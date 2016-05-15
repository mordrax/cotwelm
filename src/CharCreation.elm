module CharCreation exposing (view, Model, initModel, update, Msg) -- where

import Html exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (..)

type alias Model = {
  name: String,
  str: Int,
  dex: Int,
  con: Int,
  agi: Int,
  gender: Gender,
  difficulty: Difficulty
}

initModel: Model
initModel = {
  name = "testing",
  str = 50,
  dex = 50,
  con = 50,
  agi = 50,
  gender = Female,
  difficulty = Hard 
  }

type Gender = Male | Female
type Difficulty = Easy | Intermediate | Hard | Impossible
type Msg =
  Name String

update: Msg -> Model -> Model
update msg model =
  case msg of
    Name newName -> {model | name = newName}

view: Model -> Html Msg
view model =
  let 
    bgStyle = [("backgroundColor", "black")]
  in
  div [class "ui middle aligned center aligned grid"] [
    div [class "ui one column"] [
      div [class "ui stacked vertical segment"] [
        div [class "ui vertical segment"] [
          div [class "ui labeled fluid input"] [
            div [class "ui label"] [text ("Character name: " ++ model.name)],
            input [
                   --type "text"
                   name "name",
                   placeholder "What word did your mother utter as you came kicking and screaming into this world?",
                   onInput Name,
                   value model.name
                  ]
              []
          ]
        ]
      ]
    ]
  ]
      --  <Attributes attributes={player.attributes} onChangeAttribute={onChangeAttribute}/>
      --  div [class "ui vertical segments">]
      --    div [class "ui vertical segment">Character Gender</div>]
      --    div [class "ui vertical segment">]
      --      <Gender gender={player.gender} onChangeGender={onChangeGender}/>
      --    </div>
      --  </div>
      --  <GameDifficulty difficulty={player.difficulty} setDifficulty={onSetDifficulty}/>
      --  div [class "ui button primary" onClick={() => onCompleted(player)}>Ok</div>]
      --  div [class "ui button" onClick={onCancelled}>Cancel</div>]
      --  div [class "ui button">View Icon</div>]
      --  div [class "ui button">Help</div>]
      --</div>
