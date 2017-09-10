module View.Rip exposing (view)

import Html exposing (..)
import Html.Attributes as HA
import Monster exposing (Monster)


view : Maybe Monster -> List String -> Int -> Html msg
view lastMonster lastMsgs turn =
    let
        name =
            "Conan the destroyer"

        monsterName =
            Maybe.map .name >> Maybe.withDefault "Foolishness"

        deathMessage =
            { killedBy = "Killed by: " ++ monsterName lastMonster
            , lastMessages = lastMsgs
            , turns = "He" ++ " survived " ++ toString turn ++ " turns."
            }
    in
    div [ HA.class "rip" ]
        [ div [ HA.class "rip__tombstone" ]
            [ div [ HA.class "tombstone__inscription" ]
                [ inscribeName name
                , inscribeDeathMessage deathMessage
                ]
            ]
        ]


inscribeName : String -> Html a
inscribeName name =
    span [ HA.class "inscription__name" ] [ Html.text name ]


type alias DeathMessage =
    { killedBy : String
    , lastMessages : List String
    , turns : String
    }


inscribeDeathMessage : DeathMessage -> Html msg
inscribeDeathMessage { killedBy, lastMessages, turns } =
    let
        inscribe str =
            span [ HA.class "inscription__text" ] [ Html.text str ]
    in
    div [ HA.class "inscription__message" ]
        [ inscribe killedBy
        , inscribeParagraph lastMessages
        , inscribe turns
        ]


inscribeParagraph : List String -> Html msg
inscribeParagraph paragraph =
    paragraph
        |> List.map Html.text
        |> List.intersperse (Html.br [] [])
        |> p []
