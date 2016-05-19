module CharCreation.Name exposing (view)

-- where

import CharCreation.Data exposing (..)
import Html exposing (..)
import Html.Events exposing (onInput)
import Html.Attributes exposing (..)


view : String -> Html Msg
view playerName =
    div [ class "ui vertical segment" ]
        [ div [ class "ui labeled fluid input" ]
            [ div [ class "ui label" ] []
            , input
                [ name "name"
                , placeholder "What word did your mother utter as you came kicking and screaming into this world?"
                , onInput Name
                , value playerName
                ]
                []
            ]
        ]
