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
import Utils.IdGenerator as IdGenerator
import Item.Data as ItemData
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
import Item.Weapon as Weapon


type alias Match =
    { hero : Hero
    , monster : Monster
    , battles : Int
    , wins : Int
    , hpRemaining : List Int
    , rounds : List Int
    , heroHitMonster : List Int
    , monsterHitHero : List Int
    }


type alias RoundResult =
    { rounds : Int
    , hpRemaining : Int
    , heroHitMonster : Int
    , monsterHitHero : Int
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
    | Sleep (Cmd Msg) Int
    | Stop
    | SetAttribute Attributes.Attribute Int
    | ChangeHeroWeapon ItemData.WeaponType


maxRounds : Int
maxRounds =
    2000


init : Model
init =
    let
        heroLookup =
            initHeroLookup (initHero customAttributes)

        attributesAtLevelOne =
            Dict.get 1 heroLookup
                |> Maybe.map .attributes
                |> Maybe.withDefault (Attributes.initCustom 0 0 0 0)
    in
        { matches = initMatches heroLookup
        , heroAttributes = attributesAtLevelOne
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
            Stop ->
                ( { model | resetCounter = model.resetCounter + 1 }, Cmd.none )

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
                        initHeroLookup (initHero attributes_)

                    model_ =
                        { model
                            | heroLookup = heroLookup_
                            , matches = initMatches heroLookup_
                            , heroAttributes = attributes_
                        }
                in
                    ( model_, Cmd.none )

            ChangeHeroWeapon weaponType ->
                let
                    _ =
                        Debug.log "Changing weapon to: " weaponType
                in
                    ( model, Cmd.none )


fights : Match -> Generator Match
fights ({ hero, monster } as vs) =
    let
        initRound =
            { rounds = 0
            , hpRemaining = hero.stats.maxHP
            , heroHitMonster = 0
            , monsterHitHero = 0
            }
    in
        if vs.battles >= maxRounds then
            Random.constant vs
        else
            round hero monster True initRound
                |> Random.map (\res -> updateVSFromRoundResult res vs)
                |> Random.andThen fights


updateVSFromRoundResult : RoundResult -> Match -> Match
updateVSFromRoundResult { rounds, hpRemaining, heroHitMonster, monsterHitHero } vs =
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
                , heroHitMonster = heroHitMonster :: vs.heroHitMonster
                , monsterHitHero = monsterHitHero :: vs.monsterHitHero
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

        updateHitHero h h_ roundResult =
            { roundResult | monsterHitHero = roundResult.monsterHitHero + oneIfDamaged h h_ }

        updateHitMonster m m_ roundResult =
            { roundResult | heroHitMonster = roundResult.heroHitMonster + oneIfDamaged m m_ }

        nextAttacker =
            not heroAttacking

        isDamaged a a_ =
            a.stats.currentHP > a_.stats.currentHP

        oneIfDamaged a a_ =
            if isDamaged a a_ then
                1
            else
                0
    in
        if Stats.isDead hero.stats then
            Random.constant { result | hpRemaining = 0 }
        else if Stats.isDead monster.stats then
            Random.constant { result | hpRemaining = hero.stats.currentHP }
        else if heroAttacking == True then
            Combat.attack hero monster
                |> Random.andThen
                    (\( _, monster_ ) ->
                        resultNextRound
                            |> updateHitMonster monster monster_
                            |> round hero monster_ nextAttacker
                    )
        else
            Combat.attack monster hero
                |> Random.andThen
                    (\( _, hero_ ) ->
                        resultNextRound
                            |> updateHitHero hero hero_
                            |> round hero_ monster nextAttacker
                    )



-- View


view : Model -> Html Msg
view model =
    div []
        [ welcomeView
        , menuView model
        , heroView (Dict.get 1 model.heroLookup |> Maybe.withDefault (initHero customAttributes))
        , combatView model
        ]



-- Hero view


heroView : Hero -> Html Msg
heroView hero =
    div []
        [ heroStatsView hero
        , heroAttributesView hero
        , heroEquipmentView hero
        ]


heroStatsView : Hero -> Html Msg
heroStatsView { stats } =
    div [] [ text ("Hero HP: " ++ toString stats.maxHP) ]


heroAttributesView : Hero -> Html Msg
heroAttributesView { attributes } =
    div []
        [ UI.labeledNumber "Str: " attributes.str (SetAttribute Attributes.Strength)
        , UI.labeledNumber "Dex: " attributes.dex (SetAttribute Attributes.Dexterity)
        , UI.labeledNumber "Con: " attributes.con (SetAttribute Attributes.Constitution)
        , UI.labeledNumber "Int: " attributes.int (SetAttribute Attributes.Intelligence)
        ]


heroEquipmentView : Hero -> Html Msg
heroEquipmentView hero =
    let
        weapons =
            List.map (\x -> ( x, False )) Weapon.listTypes
    in
        UI.list (toString >> text) ChangeHeroWeapon ( Weapon.encode, Weapon.decoder ) weapons



-- Combat table


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
            , th [] [ text "Avg Turns taken" ]
            , th [] [ text "Avg Hits (hero, monster)" ]
            , th [] [ text "Hero's CTH %" ]
            ]
        , tbody []
            (Monster.types
                |> List.map toString
                |> List.map (\monsterType -> Dict.get monsterType matchResults)
                |> List.map matchView
            )
        ]


toOneDecimal : Float -> String
toOneDecimal num =
    num
        |> (*) 10
        |> Basics.round
        |> toFloat
        |> flip (/) 10
        |> toString


matchView : Maybe Match -> Html Msg
matchView maybeMatch =
    case maybeMatch of
        Nothing ->
            tr [] []

        Just { monster, hpRemaining, rounds, battles, wins, hero, heroHitMonster, monsterHitHero } ->
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

                avgHpRemaining =
                    toOneDecimal (toFloat (List.sum hpRemaining) / toFloat battles)

                avgTurnsTaken =
                    toOneDecimal (toFloat (List.sum rounds) / toFloat battles)

                cth =
                    Combat.chanceToHit hero monster

                cthText =
                    "Base: "
                        ++ toString cth.baseCTH
                        ++ " Penalties: wea/arm ("
                        ++ toString cth.weaponBulkPenalty
                        ++ "/"
                        ++ toString cth.armourPenalty
                        ++ ") size("
                        ++ toString (cth.sizeModifier * -1)
                        ++ ")"

                avgHeroHitMonster =
                    toOneDecimal (toFloat (List.sum heroHitMonster) / toFloat battles)

                avgMonsterHitHero =
                    toOneDecimal (toFloat (List.sum monsterHitHero) / toFloat battles)
            in
                tr []
                    [ td [] [ text <| monster.name ]
                    , td [] [ text <| toString monster.expLevel ]
                    , td [] [ text <| ppAttributes monster.attributes ]
                    , td [] [ text <| weapon ]
                    , td [] [ text <| armour ]
                    , td [] [ text <| toString monster.bodySize ]
                    , td [] [ text <| toString monster.stats.maxHP ]
                    , td [] [ text <| percent (toFloat wins * 100 / toFloat battles) ]
                    , td [] [ text <| avgHpRemaining ++ " / " ++ toString hero.stats.maxHP ]
                    , td [] [ text <| avgTurnsTaken ]
                    , td [] [ text <| "(" ++ avgHeroHitMonster ++ " , " ++ avgMonsterHitHero ++ ")" ]
                    , td [] [ text <| cthText ]
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
            , btn "Stop" Stop
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


customAttributes =
    Attributes.initCustom 70 70 70 50


initHero : Attributes -> Combat.Fighter Hero
initHero attrs =
    Hero.init "Heox" attrs Types.Male
        |> equipHero


equipHero : Hero -> Hero
equipHero hero =
    let
        makeWeapon weaponType =
            Item.new (ItemData.ItemTypeWeapon weaponType) IdGenerator.empty

        makeArmour armourType =
            Item.new (ItemData.ItemTypeArmour armourType) IdGenerator.empty

        makeShield shieldType =
            Item.new (ItemData.ItemTypeShield shieldType) IdGenerator.empty

        makeHelmet helmetType =
            Item.new (ItemData.ItemTypeHelmet helmetType) IdGenerator.empty

        makeGauntlets gauntletsType =
            Item.new (ItemData.ItemTypeGauntlets gauntletsType) IdGenerator.empty

        makeBracers bracersType =
            Item.new (ItemData.ItemTypeBracers bracersType) IdGenerator.empty

        lowLevel =
            [ ( Equipment.WeaponSlot, makeWeapon ItemData.ShortSword )
            , ( Equipment.ArmourSlot, makeArmour ItemData.LeatherArmour )
            , ( Equipment.HelmetSlot, makeHelmet ItemData.LeatherHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets ItemData.NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers ItemData.NormalBracers )
            , ( Equipment.ShieldSlot, makeShield ItemData.SmallWoodenShield )
            ]

        midLevel =
            [ ( Equipment.WeaponSlot, makeWeapon ItemData.BroadSword )
            , ( Equipment.ArmourSlot, makeArmour ItemData.ChainMail )
            , ( Equipment.HelmetSlot, makeHelmet ItemData.IronHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets ItemData.NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers ItemData.NormalBracers )
            , ( Equipment.ShieldSlot, makeShield ItemData.LargeIronShield )
            ]

        highLevel =
            [ ( Equipment.WeaponSlot, makeWeapon ItemData.TwoHandedSword )
            , ( Equipment.ArmourSlot, makeArmour ItemData.PlateArmour )
            , ( Equipment.HelmetSlot, makeHelmet ItemData.MeteoricSteelHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets ItemData.NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers ItemData.NormalBracers )
            , ( Equipment.ShieldSlot, makeShield ItemData.LargeMeteoricSteelShield )
            ]
    in
        if hero.expLevel <= 10 then
            { hero | equipment = Equipment.equipMany lowLevel hero.equipment }
        else if hero.expLevel <= 20 then
            { hero | equipment = Equipment.equipMany midLevel hero.equipment }
        else
            { hero | equipment = Equipment.equipMany highLevel hero.equipment }


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
                Match (Dict.get monster.expLevel heroLookup |> Maybe.withDefault (initHero customAttributes)) monster 0 0 [] [] [] []
    in
        --        List.map newMatch (List.take 20 Monster.types)
        List.map newMatch Monster.types
