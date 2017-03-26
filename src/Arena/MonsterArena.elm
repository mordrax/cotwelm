module Arena.MonsterArena
    exposing
        ( init
        , view
        , update
        , subs
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
import EveryDict exposing (EveryDict)
import Monsters.Types
import Time exposing (Time)
import Random.Pcg as Random exposing (Generator)
import Utils.Misc as Misc
import UI


type Msg
    = StartTournament
    | Fight Time
    | FightResult Matches
    | ChangeFightState FightState


type alias Match =
    Match.Model Monster Monster


type alias Matches =
    EveryDict VS Match


type FightState
    = Started
    | Stopped


type alias Model =
    { matches : Matches
    , vses : List VS
    , fightState : FightState
    }


type alias VS =
    ( Monsters.Types.MonsterType, Monsters.Types.MonsterType )


init : Model
init =
    let
        vses =
            generateVSes [] monsterTypes
    in
        { matches = initMatches vses
        , vses = vses
        , fightState = Started
        }


initMatches : List VS -> Matches
initMatches vses =
    let
        toKVP vs =
            ( vs, initMatch vs )
    in
        List.map toKVP vses
            |> EveryDict.fromList


initMatch : VS -> Match.Model Monster Monster
initMatch ( monsterType1, monsterType2 ) =
    let
        createFighter : Monsters.Types.MonsterType -> Combat.Fighter Monster
        createFighter =
            Monster.makeForArena
    in
        Match.init (createFighter monsterType1) (createFighter monsterType2)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Fight time ->
            ( model, Random.generate FightResult (fight model) )

        FightResult matches ->
            ( { model | matches = matches }, Cmd.none )

        ChangeFightState fightState ->
            ( { model | fightState = fightState }, Cmd.none )

        _ ->
            ( model, Cmd.none )


fight : Model -> Generator Matches
fight { matches } =
    let
        toGeneratorKVP : ( VS, Match ) -> Generator ( VS, Match )
        toGeneratorKVP ( k, v ) =
            Match.fightSingleRound v
                |> Random.map (\match -> ( k, match ))
    in
        EveryDict.toList matches
            |> List.map toGeneratorKVP
            |> Misc.combine
            |> Random.map EveryDict.fromList


view : Model -> Html Msg
view model =
    let
        title =
            h1 [] [ text "Welcome to the pit!" ]
    in
        div []
            [ title
            , viewUI
            , viewTournament model
            ]


viewUI : Html Msg
viewUI =
    div []
        [ UI.btn "Start" (ChangeFightState Started)
        , UI.btn "Stop" (ChangeFightState Stopped)
        ]


viewTournament : Model -> Html msg
viewTournament model =
    let
        contestantsAsStrings =
            monsterTypes
                |> List.map toString

        headers =
            "Combatants" :: contestantsAsStrings

        header headerText =
            th [] [ text headerText ]
    in
        div [ HA.style [ ( "width", "4000px" ), ( "overflow-x", "scroll" ) ] ]
            [ table [ HA.class "ui basic small compact striped celled table", HA.style [ ( "overflow-x", "scroll" ) ] ]
                [ thead [] [ tr [] (List.map header headers) ]
                , tbody [] (List.map (viewMatches model.matches) Monster.types)
                ]
            ]


viewMatches : Matches -> Monsters.Types.MonsterType -> Html msg
viewMatches matches contestant =
    let
        match opponent =
            EveryDict.get ( contestant, opponent ) matches
                |> Maybe.map viewMatch
                |> Maybe.withDefault (td [] [ text "N/A" ])
    in
        tr [] ((text <| toString contestant) :: List.map match monsterTypes)


viewMatch : Match -> Html msg
viewMatch { blueWins, red, rounds } =
    let
        winsToColor =
            (toFloat blueWins / toFloat rounds)
                * 255
                |> floor
                |> (\red -> ( "background-color", "rgb(" ++ (toString (255 - red)) ++ ", " ++ (toString red) ++ ", 128)" ))
    in
        td [ HA.style [ winsToColor ] ] [ text <| toRoundedPercent blueWins rounds ]


toRoundedPercent : Int -> Int -> String
toRoundedPercent a b =
    (toFloat a / toFloat b)
        |> (*) 100
        |> floor
        |> toString
        |> flip (++) "%"


contestants : List Monster
contestants =
    Monster.types
        |> List.map Monster.makeForArena


monsterTypes : List Monsters.Types.MonsterType
monsterTypes =
    Monster.types


generateVSes : List VS -> List Monsters.Types.MonsterType -> List VS
generateVSes currentVSes remainingMonsters =
    case remainingMonsters of
        [] ->
            currentVSes

        m :: ms ->
            generateVSes currentVSes ms
                |> (++) (List.map (\x -> ( x, m )) ms)


subs : Model -> Sub Msg
subs { fightState } =
    case fightState of
        Started ->
            Time.every (Time.millisecond * 500) Fight

        _ ->
            Sub.none
