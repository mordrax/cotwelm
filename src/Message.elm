module Message exposing (..)

import Html exposing (..)
import Random.Pcg as Random exposing (Generator)


plain : String -> Html msg
plain =
    text


type Msg
    = Combat CombatOutcome


type Message
    = Message (Html Never)


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


bad : String -> Message
bad a =
    Message (text "")
