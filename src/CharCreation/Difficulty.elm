module CharCreation.Difficulty exposing (view) -- where

import CharCreation.Data exposing (..)
import Html exposing (..)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)

view: Difficulty -> Html Msg
view difficulty = 
  let 
    activeEasy = if difficulty == Easy then "active" else ""
    activeIntermediate = if difficulty == Intermediate then "active" else ""
    activeHard = if difficulty == Hard then "active" else ""
    activeImpossible = if difficulty == Impossible then "active" else ""
  in
    div [class "four ui buttons"] [
      button [class ("ui icon button " ++ activeEasy), onClick (Difficulty Easy)] [
        div [] [i [class "huge green circle icon"] []],
        label [] [text "Easy"]
      ],
      button [class ("ui icon button " ++ activeIntermediate), onClick (Difficulty Intermediate)] [
        div [] [i [class "huge blue square icon"] []],
        label [] [text "Intermediate"]
      ],
      button [class ("ui icon button " ++ activeHard), onClick (Difficulty Hard)] [
        div [] [i [class "huge black square icon"] []],
        label [] [text "Hard"]
      ],
      button [class ("ui icon button " ++ activeImpossible), onClick (Difficulty Impossible)] [
        div [] [i [class "huge yellow warning sign icon"] []],
        label [] [text "Impossible"]
      ]
    ]

    