module Arena exposing (..)

import Attributes
import Attributes exposing (Attributes)
import Char
import Combat
import Dice
import Dict exposing (Dict)
import Equipment exposing (Equipment)
import GameData.Types as Types
import Hero.Hero as Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Item.Item as Item exposing (Item)
import Lodash
import Monster.Monster as Monster exposing (Monster)
import Process
import Random.Extra as RandomX
import Random.Pcg as Random exposing (Generator)
import Stats
import Task
import Time exposing (Time)
import UI


type alias Match =
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


type alias Matches =
    List Match


type alias Model =
    { matches : Matches
    , matchResults : Dict String Match
    , heroAttributes : Attributes
    , heroLookup : Dict Int Hero
    , resetCounter : Int
    }


type Msg
    = StartFight Matches Int
    | Fight Match Matches Int
    | SetAttribute Attributes.Attribute Int
    | Sleep (Cmd Msg) Int


maxRounds : Int
maxRounds =
    100


init : Model
init =
    let
        heroLookup =
            initHeroLookup initHero
    in
        { matches = initMatches heroLookup
        , heroAttributes = Attributes.init
        , heroLookup = heroLookup
        , matchResults = Dict.fromList []
        , resetCounter = 0
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        asyncCmd match matches resetCounter =
            Random.generate (\matchResult -> Fight matchResult matches resetCounter) (fights match)

        fightResult match matches resetCounter =
            Task.perform (\_ -> Sleep (asyncCmd match matches resetCounter) resetCounter) (Process.sleep 150)

        spaceChar =
            Char.fromCode 32

        removeSpace str =
            String.filter (not << (==) spaceChar) str
    in
        case msg of
            Sleep cmd resetCounter ->
                if resetCounter == model.resetCounter then
                    ( model, cmd )
                else
                    ( model, Cmd.none )

            StartFight [] resetCounter ->
                ( model, Cmd.none )

            StartFight (nextMatch :: remainingMatches) resetCounter ->
                ( { model | matchResults = Dict.fromList [], resetCounter = resetCounter }
                , fightResult nextMatch remainingMatches resetCounter
                )

            Fight match [] resetCounter ->
                if model.resetCounter /= resetCounter then
                    ( model, Cmd.none )
                else
                    ( { model
                        | matchResults =
                            Dict.insert (removeSpace match.monster.name) match model.matchResults
                      }
                    , Cmd.none
                    )

            Fight match (nextMatch :: remainingMatches) resetCounter ->
                if model.resetCounter /= resetCounter then
                    ( model, Cmd.none )
                else
                    ( { model
                        | matchResults = Dict.insert (Debug.log "monstername: " (removeSpace match.monster.name)) match model.matchResults
                      }
                    , fightResult nextMatch remainingMatches resetCounter
                    )

            SetAttribute attr val ->
                let
                    attributes_ =
                        Attributes.set ( attr, val ) model.heroAttributes

                    heroLookup_ =
                        initHeroLookup <| Hero.init "Heox" attributes_ Types.Male

                    model_ =
                        { model
                            | heroLookup = heroLookup_
                            , matches = initMatches heroLookup_
                            , heroAttributes = attributes_
                        }
                in
                    ( model_, Cmd.none )


fights : Match -> Generator Match
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


updateVSFromRoundResult : RoundResult -> Match -> Match
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
        , menuView model
        , heroView (Dict.get 1 model.heroLookup |> Maybe.withDefault initHero)
        , combatView model
        ]


heroView : Hero -> Html Msg
heroView { attributes, stats } =
    div []
        [ div []
            [ text ("Hero attributes: " ++ ppAttributes attributes)
            , text ("Hero HP: " ++ toString stats.maxHP)
            ]
        , div []
            [ UI.labeledNumber "Str: " attributes.str (SetAttribute Attributes.Strength)
            , UI.labeledNumber "Dex: " attributes.dex (SetAttribute Attributes.Dexterity)
            , UI.labeledNumber "Con: " attributes.con (SetAttribute Attributes.Constitution)
            , UI.labeledNumber "Int: " attributes.int (SetAttribute Attributes.Intelligence)
            ]
        ]


combatView : Model -> Html Msg
combatView { matchResults } =
    table [ HA.class "ui striped celled table" ]
        [ thead []
            [ th [] [ text "Type" ]
            , th [] [ text "Level" ]
            , th [] [ text "Attributes" ]
            , th [] [ text "Weapon" ]
            , th [] [ text "Armour" ]
            , th [] [ text "Size" ]
            , th [] [ text "Hp" ]
            , th [] [ text "Win %" ]
            , th [] [ text "Avg HP remaining" ]
            ]
        , tbody []
            (Monster.types
                |> List.map toString
                |> List.map (\monsterType -> Dict.get monsterType matchResults)
                |> List.map matchView
            )
        ]


matchView : Maybe Match -> Html Msg
matchView maybeMatch =
    case maybeMatch of
        Nothing ->
            tr [] []

        Just { monster, hpRemaining, battles, wins } ->
            let
                over a b =
                    toString a ++ " / " ++ toString b

                percent a =
                    "  ( " ++ toString a ++ "% )"

                weapon =
                    monster.equipment
                        |> Equipment.get Equipment.WeaponSlot
                        |> ppWeapon

                armour =
                    monster.equipment
                        |> Equipment.get Equipment.ArmourSlot
                        |> ppArmour
            in
                tr []
                    [ td [] [ text monster.name ]
                    , td [] [ text <| toString monster.expLevel ]
                    , td [] [ text <| ppAttributes monster.attributes ]
                    , td [] [ text weapon ]
                    , td [] [ text armour ]
                    , td [] [ text <| toString monster.bodySize ]
                    , td [] [ text <| toString monster.stats.maxHP ]
                    , td [] [ text <| (over wins battles) ++ percent (toFloat wins * 100 / toFloat battles) ]
                    , td [] [ text <| toString (toFloat (List.sum hpRemaining) / toFloat battles) ]
                    ]


ppWeapon : Maybe Item -> String
ppWeapon item =
    case item of
        Just (Item.ItemWeapon weapon) ->
            weapon.base.name ++ " ( " ++ Dice.pp weapon.damage ++ " )"

        _ ->
            "No weapon"


ppArmour : Maybe Item -> String
ppArmour item =
    case item of
        Just (Item.ItemArmour armour) ->
            armour.base.name ++ " ( " ++ toString armour.ac ++ " )"

        _ ->
            "No armour"


menuView : Model -> Html Msg
menuView model =
    let
        btn txt msg =
            button
                [ HE.onClick msg
                , HA.class "ui button"
                ]
                [ text txt ]
    in
        h1 []
            [ btn "Fight!" <| StartFight (initMatches model.heroLookup) (model.resetCounter + 1)
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
    Hero.init "Heox" (Attributes.initCustom 60 60 60 50) Types.Male


initHeroLookup : Hero -> Dict Int Hero
initHeroLookup hero =
    let
        reducer dict hero lvl =
            case lvl of
                500 ->
                    dict

                n ->
                    let
                        nextLvlHero =
                            (Hero.level hero)
                    in
                        reducer (Dict.insert n nextLvlHero dict) nextLvlHero (n + 1)
    in
        reducer Dict.empty hero 1


initMatches : Dict Int Hero -> List Match
initMatches heroLookup =
    let
        newMonster monsterType =
            Monster.initForArena monsterType

        newMatch monsterType =
            let
                monster =
                    (newMonster monsterType)
            in
                Match (Dict.get monster.expLevel heroLookup |> Maybe.withDefault initHero) monster 0 0 [] []
    in
        --        List.map newMatch (List.take 20 Monster.types)
        List.map newMatch Monster.types
