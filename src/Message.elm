module Message exposing (..)

import Html exposing (..)
import Random.Pcg as Random exposing (Generator)


plain : String -> Html msg
plain =
    text


type CombatOutcome
    = HeroSuccess
    | HeroFail
    | Monster


combatMessage : CombatOutcome -> String -> String -> Generator (Html msg)
combatMessage combatOutcome heroName monsterName =
    case combatOutcome of
        HeroSuccess ->
            Random.constant (text "boo!")

        _ ->
            Random.constant (text "boo!")
