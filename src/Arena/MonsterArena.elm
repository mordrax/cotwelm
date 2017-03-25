module Arena.MonsterArena
    exposing
        ( init
        , view
        , update
        , Msg
        , Model
        )

{-| A round robin style tounament between all the monsters to determine the order in which
the hero will face them.

Each monster will face each other monster a number of times. The win % and the hp remaining (win ease)
will be used to determine how many points they get from the combat. This will be used to rank
the monsters relative to each other.
-}

import Html exposing (..)
import Html.Attributes as HA
import Monster exposing (Monster)
import Arena.Match as Match
import Arena.Types exposing (..)
import Combat
import AllDict exposing (AllDict)
import Monsters.Types


type Msg
    = StartTournament


type alias Contestant =
    Monster


type alias Match =
    Match.Model Monster Monster


type alias Matches =
    AllDict ( Contestant, Contestant ) Match String


type alias Model =
    { matches : Matches
    }


ord : ( Contestant, Contestant ) -> String
ord ( c1, c2 ) =
    c1.name ++ c2.name


init : Model
init =
    { matches = initMatches
    }


initMatches : Matches
initMatches =
    let
        toKVP blue red =
            ( ( blue, red ), initMatch blue red )
    in
        List.map2 toKVP contestants contestants
            |> AllDict.fromList ord


initMatch : Monster -> Monster -> Match.Model Monster Monster
initMatch m1 m2 =
    let
        toFighter : Monster -> Combat.Fighter Monster
        toFighter =
            identity
    in
        Match.init (toFighter m1) (toFighter m2)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


view : Model -> Html msg
view model =
    let
        title =
            h1 [] [ text "Welcome to the pit!" ]
    in
        div []
            [ title
            , viewTournament model
            ]


viewTournament : Model -> Html msg
viewTournament model =
    let
        contestantsAsStrings =
            contestants
                |> List.map .name

        headers =
            "Combatants" :: contestantsAsStrings

        header headerText =
            th [] [ text headerText ]
    in
        table [ HA.class "ui striped celled table" ]
            [ thead [] [ tr [] (List.map header headers) ]
            , tbody [] (List.map (viewMatches model.matches) contestants)
            ]


viewMatches : Matches -> Contestant -> Html msg
viewMatches matches contestant =
    let
        match opponent =
            AllDict.get ( contestant, opponent ) matches
                |> Maybe.withDefault (initMatch contestant opponent)
                |> viewMatch
    in
        tr [] (text contestant.name :: List.map match contestants)


viewMatch : Match -> Html msg
viewMatch { red } =
    td [] [ text red.name ]


contestants : List Monster
contestants =
    Monster.types
        |> List.map Monster.makeForArena
