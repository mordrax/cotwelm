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
import Item.Data as ItemData
import Item.Weapon as Weapon
import Item.Wearable as Wearable
import Monster exposing (Monster)
import Process
import Random.Pcg as Random exposing (Generator)
import Task
import Types exposing (..)
import View.UI as UI


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
    | ChangeHeroWeapon ItemData.WeaponType
    | ChangeHeroArmour ItemData.ArmourType


init : Model
init =
    let
        customEquipment =
            ( ItemData.ShortSword, ItemData.LeatherArmour )

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
            let
                _ =
                    Debug.log "starting a fight with no one" 1
            in
            ( model, Cmd.none )

        StartFight (nextMatch :: remainingMatches) resetCounter ->
            let
                _ =
                    Debug.log "starting a fight" nextMatch
            in
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
            model.heroLookup
                |> Dict.get 1
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
                |> ItemData.acToInt
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
                |> Maybe.map Item.detail
                |> Maybe.map .weaponType
                |> Maybe.map ((==) weaponType)
                |> Maybe.withDefault False

        armourTypeMatches armourType =
            Equipment.getArmour hero.equipment
                |> Maybe.map Item.detail
                |> Maybe.map .armourType
                |> Maybe.map ((==) armourType)
                |> Maybe.withDefault False

        weapons =
            List.map (\x -> ( x, weaponTypeMatches x )) Weapon.listTypes

        armour =
            List.map (\x -> ( x, armourTypeMatches x )) Wearable.armourTypes
    in
    div []
        [ UI.list (toString >> text) ChangeHeroWeapon ( Weapon.encode, Weapon.decoder ) weapons
        , UI.list (toString >> text) ChangeHeroArmour ( Wearable.encodeArmour, Wearable.decodeArmour ) armour
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
    ( ItemData.WeaponType, ItemData.ArmourType )


initHero : Attributes -> CustomEquipment -> Combat.Fighter Hero
initHero attrs equipment =
    Hero.init "Heox" attrs Types.Male
        |> (\x -> equipHero x equipment)


makeWeapon : ItemData.WeaponType -> ItemData.Item
makeWeapon weaponType =
    Item.new (ItemData.ItemTypeWeapon weaponType)


makeArmour : ItemData.ArmourType -> ItemData.Item
makeArmour armourType =
    Item.new (ItemData.ItemTypeArmour armourType)


equipHero : Hero -> ( ItemData.WeaponType, ItemData.ArmourType ) -> Hero
equipHero hero ( customWeaponType, customArmourType ) =
    let
        makeShield shieldType =
            Item.new (ItemData.ItemTypeShield shieldType)

        makeHelmet helmetType =
            Item.new (ItemData.ItemTypeHelmet helmetType)

        makeGauntlets gauntletsType =
            Item.new (ItemData.ItemTypeGauntlets gauntletsType)

        makeBracers bracersType =
            Item.new (ItemData.ItemTypeBracers bracersType)

        lowLevel =
            [ ( Equipment.WeaponSlot, makeWeapon customWeaponType )
            , ( Equipment.ArmourSlot, makeArmour customArmourType )
            , ( Equipment.HelmetSlot, makeHelmet ItemData.LeatherHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets ItemData.NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers ItemData.NormalBracers )
            , ( Equipment.ShieldSlot, makeShield ItemData.SmallWoodenShield )
            ]

        midLevel =
            [ ( Equipment.WeaponSlot, makeWeapon customWeaponType )
            , ( Equipment.ArmourSlot, makeArmour customArmourType )
            , ( Equipment.HelmetSlot, makeHelmet ItemData.IronHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets ItemData.NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers ItemData.NormalBracers )
            , ( Equipment.ShieldSlot, makeShield ItemData.LargeIronShield )
            ]

        highLevel =
            [ ( Equipment.WeaponSlot, makeWeapon customWeaponType )
            , ( Equipment.ArmourSlot, makeArmour customArmourType )
            , ( Equipment.HelmetSlot, makeHelmet ItemData.MeteoricSteelHelmet )
            , ( Equipment.GauntletsSlot, makeGauntlets ItemData.NormalGauntlets )
            , ( Equipment.BracersSlot, makeBracers ItemData.NormalBracers )
            , ( Equipment.ShieldSlot, makeShield ItemData.LargeMeteoricSteelShield )
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

        monstersHigherThanLevel x =
            .expLevel >> flip (>=) x
    in
    Monster.types
        |> List.take 20
        |> List.map Monster.makeForArena
        |> List.map newMatch



--List.map newMonster Monster.types
--    |> List.filter (monstersHigherThanLevel 5)
--    |> List.map newMatch
