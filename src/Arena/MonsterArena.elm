module Arena.MonsterArena
    exposing
        ( init
        , view
        , update
        , Msg
        , Model
        )

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


type alias Model =
    { matches : AllDict ( Contestant, Contestant ) Match String
    }


ord : ( Contestant, Contestant ) -> String
ord ( c1, c2 ) =
    c1.name ++ c2.name


init : Model
init =
    { matches =
        AllDict.empty ord
        --fromList ord initMatches
    }


initMatches : List ( ( Contestant, Contestant ), Match )
initMatches =
    let
        toKVP : Contestant -> Contestant -> ( ( Contestant, Contestant ), Match.Model Monster Monster )
        toKVP blue red =
            ( ( blue, red ), initMatch blue red )
    in
        List.map2 toKVP contestants contestants


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
            "Name" :: contestantsAsStrings

        header headerText =
            th [] [ text headerText ]
    in
        table [ HA.class "ui striped celled table" ]
            [ thead [] [ tr [] (List.map header headers) ]
            , tbody [] []
            ]


viewContestantRow : Contestant -> Html msg
viewContestantRow { name } =
    tr [] [ text name ]


contestants : List Monster
contestants =
    Monster.types
        |> List.map Monster.makeForArena


toFighter : Monster -> Combat.Fighter Monster
toFighter =
    identity
