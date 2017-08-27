module Message exposing (..)

import Html exposing (..)
import Random.Pcg as Random exposing (Generator)


plain : String -> Html msg
plain =
    text


type alias Messages =
    { messages : List (List Message)
    }


init : Messages
init =
    { messages =
        []
    }


type Msg
    = Combat CombatOutcome


type Message
    = Message MessageKind String


type MessageKind
    = Good
    | Bad
    | Neutral


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
    Message Bad a


good : String -> Message
good a =
    Message Good a


neutral : String -> Message
neutral a =
    Message Neutral a


pp : Message -> String
pp (Message _ a) =
    a


add : Message -> Messages -> Messages
add message ({ messages } as model) =
    case messages of
        [] ->
            { model | messages = [ [ message ] ] }

        a :: rest ->
            { model | messages = (message :: a) :: rest }


all : Messages -> List (List String)
all { messages } =
    List.map (List.map pp) messages


addNeutral : String -> Messages -> Messages
addNeutral msg messages =
    msg
        |> neutral
        |> flip add messages


tick : Messages -> Messages
tick ({ messages } as model) =
    case messages of
        [] ->
            model

        [] :: _ ->
            model

        _ :: _ ->
            { model | messages = [] :: messages }
