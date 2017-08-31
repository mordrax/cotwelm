module View.Difficulty exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)


easy : Html never
easy =
    i [ class "difficulty__easy" ]
        []


intermediate : Html never
intermediate =
    i [ class "difficulty__intermediate" ] []


hard : Html never
hard =
    div [ class "difficulty__hard-outer" ]
        [ i [ class "difficulty__hard-inner" ]
            []
        ]


impossible : Html never
impossible =
    div [ class "difficulty__impossible-outer" ]
        [ span [ class "difficulty__impossible-inner" ]
            [ span [ class "difficulty__impossible-inner-inner" ]
                [ text "!" ]
            ]
        ]
