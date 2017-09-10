module Arena.MonsterArena
    exposing
        ( Model
        , Msg
        , init
        , subs
        , update
        , view
        )

{-| A round robin style tounament between all the monsters to determine the order in which
the hero will face them.

Each monster will face each other monster a number of times. The win % and the hp remaining (win ease)
will be used to determine how many points they get from the combat. This will be used to rank
the monsters relative to each other.

-}

import Arena.Match as Match
import EveryDict exposing (EveryDict)
import Game.Combat as Combat
import Html exposing (..)
import Html.Attributes as HA
import Monster exposing (Monster)
import Monsters.Types
import Random.Pcg as Random exposing (Generator)
import Time exposing (Time)
import Utils.Misc as Misc
import View.UI as UI


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


type alias Ranking =
    EveryDict Monsters.Types.MonsterType Int


type alias Model =
    { matches : Matches
    , vses : List VS
    , fightState : FightState
    , ranking : EveryDict Monsters.Types.MonsterType Int
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
    , ranking = EveryDict.empty
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
        Fight _ ->
            ( model, Random.generate FightResult (fight model) )

        FightResult matches ->
            ( { model
                | matches = matches
                , ranking = calculateRanking matches
              }
            , Cmd.none
            )

        ChangeFightState fightState ->
            let
                _ =
                    if fightState == Stopped then
                        Debug.log "Monster ranks:"
                            (model.ranking
                                |> EveryDict.toList
                                |> List.sortBy Tuple.second
                            )
                    else
                        []
            in
            ( { model | fightState = fightState }, Cmd.none )

        _ ->
            ( model, Cmd.none )


calculateRanking : Matches -> Ranking
calculateRanking matches =
    let
        addToWins_ monsterType timesWon wins =
            wins
                |> EveryDict.get monsterType
                |> Maybe.withDefault 0
                |> (+) timesWon
                |> (\newWins -> EveryDict.insert monsterType newWins wins)

        addToWins : ( VS, Match ) -> EveryDict Monsters.Types.MonsterType Int -> EveryDict Monsters.Types.MonsterType Int
        addToWins ( ( blue, red ), match ) wins =
            wins
                |> addToWins_ blue match.blueWins
                |> addToWins_ red (match.rounds - match.blueWins)

        winsToRanking wins =
            EveryDict.toList wins
                |> List.sortBy Tuple.second
                |> List.map Tuple.first
                |> List.indexedMap (\a b -> ( b, a ))
                |> EveryDict.fromList
    in
    matches
        |> EveryDict.toList
        |> List.foldl addToWins EveryDict.empty
        |> winsToRanking


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
            "Combatants" :: "Rank" :: contestantsAsStrings

        headStyle =
            HA.style [ ( "height", "150px" ), ( "white-space", "nowrap" ), ( "padding", "0" ), ( "width", "10px" ) ]

        divStyle =
            HA.style [ ( "transform", "rotate(270deg)" ), ( "width", "10px" ) ]

        header headerText =
            th [ headStyle ]
                [ div [ divStyle ] [ text headerText ]
                ]
    in
    div [ HA.style [ ( "width", "100%" ), ( "overflow", "scroll" ), ( "height", "800px" ) ] ]
        [ table [ HA.class "ui very basic compact striped celled table" ]
            [ thead [] [ tr [] (List.map header headers) ]
            , tbody [] (List.map (viewMatches model) Monster.types)
            ]
        ]


viewMatches : Model -> Monsters.Types.MonsterType -> Html msg
viewMatches { matches, ranking } contestant =
    let
        match opponent =
            EveryDict.get ( contestant, opponent ) matches
                |> Maybe.map viewMatch
                |> Maybe.withDefault (td [] [ text "N/A" ])

        rank =
            EveryDict.get contestant ranking
                |> Maybe.map toString
                |> Maybe.withDefault "N/A"

        tdata a =
            td [] [ text <| toString a ]
    in
    tr []
        (tdata contestant
            :: tdata rank
            :: List.map match monsterTypes
        )


viewMatch : Match -> Html msg
viewMatch { blueWins, rounds } =
    let
        pickHue x =
            if x > 128 then
                120
            else
                0

        winsPercent =
            toFloat blueWins / toFloat rounds

        hue =
            (winsPercent * 255)
                |> floor
                |> pickHue
                |> toString

        lightness =
            ((winsPercent * 100) - 50)
                |> abs
                |> (\x -> 100 - x)
                |> toString

        winsToColor =
            ( "background-color", "hsl(" ++ hue ++ ", 100%, " ++ lightness ++ "%)" )
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
