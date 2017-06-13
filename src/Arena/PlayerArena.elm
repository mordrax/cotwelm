module Arena.PlayerArena exposing (..)

import Arena.Match as Match
import Arena.View as View
import Attributes exposing (Attributes)
import Char
import Dict exposing (Dict)
import Equipment exposing (Equipment)
import Game.Combat as Combat
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Item
import Item.Armour as Armour
import Item.Data exposing (..)
import Item.Weapon as Weapon
import Monster exposing (Monster)
import Process
import Random.Pcg as Random exposing (Generator)
import Task
import Types exposing (..)
import UI


type alias Model =
    { matches : List ArenaMatch
    , matchResults : Dict String ArenaMatch
    , heroAttributes : Attributes
    , heroLookup : Dict Int Hero
    , customEquipment : CustomEquipment
    , resetCounter : Int
    }


type alias ArenaMatch =
    Match.Model (Combat.Fighter Hero) (Combat.Fighter Monster)


type Msg
    = StartFight (List ArenaMatch) Int
    | Fight ArenaMatch (List ArenaMatch) Int
    | Sleep (Cmd Msg) Int
    | Stop
    | SetAttribute Attributes.Attribute Int
    | ChangeHeroWeapon WeaponType
    | ChangeHeroArmour ArmourType


init : Model
init =
    let
        customEquipment =
            ( ShortSword, LeatherArmour )

        heroLookup =
            initHeroLookup (initHero customAttributes customEquipment)

        attributesAtLevelOne =
            Dict.get 1 heroLookup
                |> Maybe.map .attributes
                |> Maybe.withDefault (Attributes.initCustom 0 0 0 0)
    in
    { matches = initMatches heroLookup customEquipment
    , heroAttributes = attributesAtLevelOne
    , heroLookup = heroLookup
    , matchResults = Dict.fromList []
    , resetCounter = 0
    , customEquipment = customEquipment
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        asyncCmd match matches resetCounter =
            Random.generate (\matchResult -> Fight matchResult matches resetCounter) (Match.fight match)

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
                        Dict.insert (removeSpace match.red.name) match model.matchResults
                  }
                , Cmd.none
                )

        Fight match (nextMatch :: remainingMatches) resetCounter ->
            if model.resetCounter /= resetCounter then
                ( model, Cmd.none )
            else
                ( { model
                    | matchResults = Dict.insert (removeSpace match.red.name) match model.matchResults
                  }
                , fightResult nextMatch remainingMatches resetCounter
                )

        SetAttribute attr val ->
            let
                attributes_ =
                    Attributes.set ( attr, val ) model.heroAttributes

                heroLookup_ =
                    initHeroLookup (initHero attributes_ model.customEquipment)

                model_ =
                    { model
                        | heroLookup = heroLookup_
                        , matches = initMatches heroLookup_ model.customEquipment
                        , heroAttributes = attributes_
                    }
            in
            ( model_, Cmd.none )

        ChangeHeroWeapon weaponType ->
            let
                customEquipment_ =
                    ( weaponType, Tuple.second model.customEquipment )

                model_ =
                    { model | customEquipment = customEquipment_ }
            in
            update (startNewFight model_) model_

        ChangeHeroArmour armourType ->
            let
                customEquipment_ =
                    ( Tuple.first model.customEquipment, armourType )

                model_ =
                    { model | customEquipment = customEquipment_ }
            in
            update (startNewFight model_) model_



-- View


view : Model -> Html Msg
view model =
    let
        hero =
            Dict.get 1 model.heroLookup
                |> Maybe.withDefault (initHero customAttributes model.customEquipment)
    in
    div []
        [ welcomeView
        , menuView model
        , heroView hero
        , combatView model
        ]



-- Hero view


heroView : Hero -> Html Msg
heroView hero =
    div []
        [ h3 [] [ text "Stats" ]
        , heroStatsView hero
        , heroAttributesView hero
        , h3 [] [ text "Equipment" ]
        , heroEquipmentView hero
        ]


heroStatsView : Hero -> Html Msg
heroStatsView hero =
    let
        ac =
            hero.equipment
                |> Equipment.calculateAC
                |> Item.Data.acToInt
    in
    div []
        [ div [] [ text ("Hero HP: " ++ toString hero.stats.maxHP) ]
        , div [] [ text ("Hero AC: " ++ toString ac) ]
        , div [] [ text <| View.weaponToString hero.equipment ]
        , div [] [ text <| View.armourToString hero.equipment ]
        ]


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
        weaponTypeMatches weaponType =
            Equipment.getWeapon hero.equipment
                |> Maybe.map .weaponType
                |> Maybe.map ((==) weaponType)
                |> Maybe.withDefault False

        armourTypeMatches armourType =
            Equipment.getArmour hero.equipment
                |> Maybe.map .armourType
                |> Maybe.map ((==) armourType)
                |> Maybe.withDefault False

        weapons =
            List.map (\x -> ( x, weaponTypeMatches x )) Weapon.listTypes

        armour =
            List.map (\x -> ( x, armourTypeMatches x )) Armour.listTypes
    in
    div []
        [ UI.list (toString >> text) ChangeHeroWeapon ( Weapon.encode, Weapon.decoder ) weapons
        , UI.list (toString >> text) ChangeHeroArmour ( Armour.encode, Armour.decoder ) armour
        ]



-- Combat table


combatView : Model -> Html Msg
combatView { matchResults } =
    table [ HA.class "ui striped celled table" ]
        [ thead []
            [ tr []
                [ th [] [ text "Type" ]
                , th [] [ text "Level" ]
                , th [] [ text "Attributes" ]
                , th [] [ text "Weapon" ]
                , th [] [ text "Armour" ]
                , th [] [ text "Size" ]
                , th [] [ text "Hp" ]
                , th [] [ text "Win %" ]
                , th [] [ text "HP" ]
                , th [] [ text "Turns" ]
                , th [ HA.colspan 2 ] [ text "Hits / Turn" ]
                , th [ HA.colspan 2 ] [ text "CTH: base/wea/arm/size/crit = (total)" ]
                ]
            , tr []
                [ th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] []
                , th [] [ text "Hero" ]
                , th [] [ text "Monster" ]
                , th [] [ text "Hero" ]
                , th [] [ text "Monster" ]
                ]
            ]
        , tbody []
            (Monster.types
                |> List.map toString
                |> List.map (\monsterType -> Dict.get monsterType matchResults)
                |> List.map (Maybe.map Match.view >> Maybe.withDefault (div [] []))
            )
        ]


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
        [ btn "Fight!" (startNewFight model)
        , btn "Stop" Stop
        ]


startNewFight : Model -> Msg
startNewFight model =
    StartFight (initMatches model.heroLookup model.customEquipment) (model.resetCounter + 1)


welcomeView : Html Msg
welcomeView =
    h1 [] [ text "Welcome to the arena!" ]



-- Constants


customAttributes : Attributes
customAttributes =
    Attributes.initCustom 70 70 70 50


type alias CustomEquipment =
    ( WeaponType, ArmourType )


initHero : Attributes -> CustomEquipment -> Combat.Fighter Hero
initHero attrs equipment =
    Hero.init "Heox" attrs Types.Male
        |> (\x -> equipHero x equipment)


makeWeapon : WeaponType -> Item BasicItem
makeWeapon weaponType =
    Item.new (ItemTypeWeapon weaponType)


makeArmour : ArmourType -> Item BasicItem
makeArmour armourType =
    Item.new (ItemTypeArmour armourType)


equipHero : Hero -> ( WeaponType, ArmourType ) -> Hero
equipHero hero ( customWeaponType, customArmourType ) =
    let
        makeShield shieldType =
            Item.new (ItemTypeShield shieldType)

        makeHelmet helmetType =
            Item.new (ItemTypeHelmet helmetType)

        makeGauntlets gauntletsType =
            Item.new (ItemTypeGauntlets gauntletsType)

        makeBracers bracersType =
            Item.new (ItemTypeBracers bracersType)

        lowLevel =
            [ ( Equipment.WeaponSlot, makeWeapon customWeaponType )
            , ( Equipment.ArmourSlot, makeArmour customArmourType )
            , ( Equipment.HelmetSlot, makeHelmet LeatherHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers NormalBracers )
            , ( Equipment.ShieldSlot, makeShield SmallWoodenShield )
            ]

        midLevel =
            [ ( Equipment.WeaponSlot, makeWeapon customWeaponType )
            , ( Equipment.ArmourSlot, makeArmour customArmourType )
            , ( Equipment.HelmetSlot, makeHelmet IronHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers NormalBracers )
            , ( Equipment.ShieldSlot, makeShield LargeIronShield )
            ]

        highLevel =
            [ ( Equipment.WeaponSlot, makeWeapon customWeaponType )
            , ( Equipment.ArmourSlot, makeArmour customArmourType )
            , ( Equipment.HelmetSlot, makeHelmet MeteoricSteelHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers NormalBracers )
            , ( Equipment.ShieldSlot, makeShield LargeMeteoricSteelShield )
            ]
    in
    if hero.expLevel <= 10 then
        { hero | equipment = Equipment.setMany_ lowLevel hero.equipment }
    else if hero.expLevel <= 20 then
        { hero | equipment = Equipment.setMany_ midLevel hero.equipment }
    else
        { hero | equipment = Equipment.setMany_ highLevel hero.equipment }


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
                            Hero.levelUp hero
                    in
                    reducer (Dict.insert n hero dict) nextLvlHero (n + 1)
    in
    reducer Dict.empty hero 1


initMatches : Dict Int Hero -> CustomEquipment -> List ArenaMatch
initMatches heroLookup ( weaponType, armourType ) =
    let
        newMonster monsterType =
            Monster.makeForArena monsterType

        customEquipment =
            Equipment.setMany_
                [ ( Equipment.WeaponSlot, makeWeapon weaponType )
                , ( Equipment.ArmourSlot, makeArmour armourType )
                ]
                Equipment.init

        newMatch : Combat.Fighter Monster -> ArenaMatch
        newMatch monster =
            let
                hero : Combat.Fighter Hero
                hero =
                    case Dict.get monster.expLevel heroLookup of
                        Just lookedUpHero ->
                            Hero.setEquipment customEquipment lookedUpHero

                        Nothing ->
                            Debug.crash "Could not look up a hero with exp level: " monster.expLevel
            in
            Match.init hero monster
    in
    --        List.map newMatch (List.take 20 Monster.types)
    List.map newMonster Monster.types
        |> List.filter (.expLevel >> flip (>=) 5)
        |> List.map newMatch
