module CharCreation exposing (view) -- where

import Html exposing (..)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)

view: Html String
view =
  let 
    bgStyle = [("backgroundColor", "black")]
  in
  h1 [] [ text "Char creation" ]
