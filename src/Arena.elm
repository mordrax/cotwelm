module Arena exposing (..)

import Combat
import Dict exposing (Dict)
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
import UI
import Attributes
import Item.Item as Item exposing (Item)
import Equipment exposing (Equipment)
import Dice


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
    , heroAttributes : Attributes
    , heroLookup : Dict Int Hero
    }


type Msg
    = Fight
    | FightResult (List VS)
    | SetAttribute Attributes.Attribute Int


maxRounds : Int
maxRounds =
    50


init : Model
init =
    let
        heroLookup =
            initHeroLookup initHero
    in
        { matches = initMatches heroLookup
        , heroAttributes = Attributes.init
        , heroLookup = heroLookup
        }


fightCmd : Model -> Cmd Msg
fightCmd model =
    model.matches
        |> List.map fights
        |> Lodash.combine
        |> Random.generate FightResult


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Fight ->
            let
                newModel =
                    { model | matches = initMatches model.heroLookup }
            in
                ( newModel, fightCmd newModel )

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
                ( model_, fightCmd model_ )

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
combatView { matches } =
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
        , tbody [] (List.map matchView matches)
        ]


matchView : VS -> Html Msg
matchView { monster, hpRemaining, battles, wins } =
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


initHeroLookup : Hero -> Dict Int Hero
initHeroLookup hero =
    let
        reducer dict hero lvl =
            case lvl of
                50 ->
                    dict

                n ->
                    let
                        nextLvlHero =
                            (Hero.level hero)
                    in
                        reducer (Dict.insert n nextLvlHero dict) nextLvlHero (n + 1)
    in
        reducer Dict.empty hero 1


initMatches : Dict Int Hero -> List VS
initMatches heroLookup =
    let
        newMonster monsterType =
            Monster.initForArena monsterType

        newMatch monsterType =
            let
                monster =
                    (newMonster monsterType)
            in
                VS (Dict.get monster.expLevel heroLookup |> Maybe.withDefault initHero) monster 0 0 [] []
    in
        List.map newMatch Monster.types
