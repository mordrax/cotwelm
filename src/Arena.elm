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


type alias Match =
    { hero : Hero
    , monster : Monster
    , currentHero : Hero
    , currentMonster : Monster
    , battles : Int
    , wins : Int
    , hpRemaining : List Int
    }


type alias Model =
    { matches : List Match
    , hero : Hero
    }


type Msg
    = GenerateCombatants
    | Fight


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
        GenerateCombatants ->
            ( model, Cmd.none )

        _ ->
            ( model, Cmd.none )



-- View


view : Model -> Html Msg
view model =
    div []
        [ welcomeView
        , menuView
        , combatView model
        ]


combatView : Model -> Html Msg
combatView { matches, hero } =
    table [HA.class "ui striped celled table"]
        [ thead []
            [ th [] [ text "Type" ]
            , th [] [ text "Level" ]
            , th [] [ text "Attributes" ]
            , th [] [ text "Size" ]
            , th [] [ text "Win %" ]
            , th [] [ text "HP remaining" ]
            ]
        , tbody [] (List.map matchView matches)
        ]


matchView : Match -> Html Msg
matchView { monster, hpRemaining, battles, wins } =
    tr []
        [ td [] [ text monster.name ]
        , td [] [ text <| toString monster.expLevel ]
        , td [] [ text <| ppAttributes monster.attributes ]
        , td [] [ text <| toString monster.bodySize ]
        , td [] [ text <| toString (toFloat wins / toFloat battles) ]
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
            [ btn "Generate Fighters" GenerateCombatants
            , btn "Fight!" Fight
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
    Hero.init "Heox" Attributes.init Types.Male


initMatches : Hero -> List Match
initMatches hero =
    let
        newMonster monsterType = Monster.init monsterType (0,0)
        newMatch monsterType =
            Match hero (newMonster monsterType) hero (newMonster monsterType) 0 0 []
    in
        List.map newMatch Monster.types
