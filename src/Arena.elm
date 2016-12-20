module Arena exposing (..)

import List exposing (..)
import Dict exposing (..)
import Set exposing (..)
import Combat
import Html exposing (..)
import Html.Events as HE
import Html.Attributes as HA
import Monster.Monster as Monster exposing (Monster)
import Hero.Hero as Hero exposing (Hero)
import Attributes exposing (Attributes)
import GameData.Types as Types
import Random.Pcg as Random exposing (Generator)
import Random.Extra as RandomX
import Stats
import Lodash


type alias VS =
    { hero : Hero
    , monster : Monster
    , battles : Int
    , wins : Int
    , hpRemaining : List Int
    , rounds : List Int
    }


type alias RoundResult =
    { rounds : Int
    , hpRemaining : Int
    }


type alias Model =
    { matches : List VS
    , hero : Hero
    }


type Msg
    = Fight
    | FightResult (List VS)


maxRounds : Int
maxRounds =
    100


init : Model
init =
    let
        hero =
            initHero
    in
        { matches = initMatches hero
        , hero = hero
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Fight ->
            let
                newModel =
                    init
            in
                ( newModel
                , newModel.matches
                    |> List.map fights
                    |> Lodash.combine
                    |> Random.generate FightResult
                )

        FightResult vses ->
            ( { model | matches = vses }, Cmd.none )


fights : VS -> Generator VS
fights ({ hero, monster } as vs) =
    let
        initRound =
            { rounds = 0
            , hpRemaining = hero.stats.maxHP
            }
    in
        if vs.battles >= maxRounds then
            Random.constant vs
        else
            round hero monster True initRound
                |> Random.map (\res -> updateVSFromRoundResult res vs)
                |> Random.andThen fights


updateVSFromRoundResult : RoundResult -> VS -> VS
updateVSFromRoundResult { rounds, hpRemaining } vs =
    let
        addWin vs =
            if hpRemaining > 0 then
                { vs | wins = vs.wins + 1 }
            else
                vs

        addResult vs =
            { vs
                | hpRemaining = hpRemaining :: vs.hpRemaining
                , rounds = rounds :: vs.rounds
            }

        incBattle vs =
            { vs | battles = vs.battles + 1 }
    in
        vs
            |> addWin
            |> addResult
            |> incBattle


round : Hero -> Monster -> Bool -> RoundResult -> Generator RoundResult
round hero monster heroAttacking result =
    let
        resultNextRound =
            { result | rounds = result.rounds + 1 }

        nextAttacker =
            not heroAttacking
    in
        if Stats.isDead hero.stats then
            Random.constant { result | hpRemaining = 0 }
        else if Stats.isDead monster.stats then
            Random.constant { result | hpRemaining = hero.stats.currentHP }
        else if heroAttacking == True then
            Combat.attack hero monster
                |> Random.andThen (\( _, monster_ ) -> round hero monster_ nextAttacker resultNextRound)
        else
            Combat.attack monster hero
                |> Random.andThen (\( _, hero_ ) -> round hero_ monster nextAttacker resultNextRound)



-- View


view : Model -> Html Msg
view model =
    div []
        [ welcomeView
        , menuView
        , heroView model.hero
        , combatView model
        ]


heroView : Hero -> Html Msg
heroView { attributes, stats } =
    div []
        [ text ("Hero attributes: " ++ ppAttributes attributes)
        , text ("Hero HP: " ++ toString stats.maxHP)
        ]


combatView : Model -> Html Msg
combatView { matches, hero } =
    table [ HA.class "ui striped celled table" ]
        [ thead []
            [ th [] [ text "Type" ]
            , th [] [ text "Level" ]
            , th [] [ text "Attributes" ]
            , th [] [ text "Size" ]
            , th [] [ text "Hp" ]
            , th [] [ text "Win %" ]
            , th [] [ text "Avg HP remaining" ]
            ]
        , tbody [] (List.map matchView matches)
        ]


matchView : VS -> Html Msg
matchView { monster, hpRemaining, battles, wins } =
    let
        over a b =
            toString a ++ " / " ++ toString b

        percent a =
            "  ( " ++ toString a ++ "% )"
    in
        tr []
            [ td [] [ text monster.name ]
            , td [] [ text <| toString monster.expLevel ]
            , td [] [ text <| ppAttributes monster.attributes ]
            , td [] [ text <| toString monster.bodySize ]
            , td [] [ text <| toString monster.stats.maxHP ]
            , td [] [ text <| (over wins battles) ++ percent (toFloat wins * 100 / toFloat battles) ]
            , td [] [ text <| toString (toFloat (sum hpRemaining) / toFloat battles) ]
            ]


menuView : Html Msg
menuView =
    let
        btn txt msg =
            button
                [ HE.onClick msg
                , HA.class "ui button"
                ]
                [ text txt ]
    in
        h1 []
            [ btn "Fight!" Fight
            ]


welcomeView : Html Msg
welcomeView =
    h1 [] [ text "Welcome to the arena!" ]


ppAttributes : Attributes -> String
ppAttributes { str, dex, int, con } =
    toString str
        ++ "/"
        ++ toString dex
        ++ "/"
        ++ toString con
        ++ "/"
        ++ toString int



-- Constants


initHero : Combat.Fighter Hero
initHero =
    Hero.init "Heox" (Attributes.initCustom 50 75 50 50) Types.Male


initMatches : Hero -> List VS
initMatches hero =
    let
        newMonster monsterType =
            Monster.initForArena monsterType

        newMatch monsterType =
            VS hero (newMonster monsterType) 0 0 [] []
    in
        List.map newMatch Monster.types
