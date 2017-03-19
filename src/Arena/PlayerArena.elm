module Arena.PlayerArena exposing (..)

import Arena.Types exposing (..)
import Arena.Match as Match exposing (Match)
import Arena.Round as Round exposing (RoundResult)
import Attributes exposing (Attributes)
import Char
import Combat
import Dice
import Dict exposing (Dict)
import Equipment exposing (Equipment)
import Types exposing (..)
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Item.Armour as Armour
import Item.Data as ItemData
import Item.Item as Item exposing (Item)
import Item.Weapon as Weapon
import Monster exposing (Monster)
import Process
import Random.Extra as RandomX
import Random.Pcg as Random exposing (Generator)
import Stats
import Task
import Time exposing (Time)
import UI
import Utils.IdGenerator as IdGenerator


type alias Model =
    { matches : List (Match Hero Monster)
    , matchResults : Dict String (Match Hero Monster)
    , heroAttributes : Attributes
    , heroLookup : Dict Int Hero
    , customEquipment : CustomEquipment
    , resetCounter : Int
    }


type Msg
    = StartFight (List (Match Hero Monster)) Int
    | Fight (Match Hero Monster) (List (Match Hero Monster)) Int
    | Sleep (Cmd Msg) Int
    | Stop
    | SetAttribute Attributes.Attribute Int
    | ChangeHeroWeapon ItemData.WeaponType
    | ChangeHeroArmour ItemData.ArmourType


maxRounds : Int
maxRounds =
    2000


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


fights : Match -> Generator Match
fights ({ hero, monster } as match) =
    let
        initRound =
            { heroRounds = 0
            , monsterRounds = 0
            , hpRemaining = hero.stats.maxHP
            , heroHitMonster = 0
            , monsterHitHero = 0
            }
    in
        if match.battles >= maxRounds then
            Random.constant match
        else
            Round.fight hero monster
                |> Random.map (\roundResult -> Match.updateMatch roundResult match)
                |> Random.andThen fights



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
                |> ItemData.acToInt
    in
        div []
            [ div [] [ text ("Hero HP: " ++ toString hero.stats.maxHP) ]
            , div [] [ text ("Hero AC: " ++ toString ac) ]
            , div [] [ text <| ppWeapon <| Equipment.get Equipment.WeaponSlot hero.equipment ]
            , div [] [ text <| ppArmour <| Equipment.get Equipment.ArmourSlot hero.equipment ]
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
                |> List.map matchView
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


customAttributes =
    Attributes.initCustom 70 70 70 50


type alias CustomEquipment =
    ( ItemData.WeaponType, ItemData.ArmourType )


initHero : Attributes -> CustomEquipment -> Combat.Fighter Hero
initHero attrs equipment =
    Hero.init "Heox" attrs Types.Male
        |> \x -> equipHero x equipment


makeWeapon : ItemData.WeaponType -> Item
makeWeapon weaponType =
    Item.new (ItemData.ItemTypeWeapon weaponType) IdGenerator.empty


makeArmour : ItemData.ArmourType -> Item
makeArmour armourType =
    Item.new (ItemData.ItemTypeArmour armourType) IdGenerator.empty


equipHero : Hero -> ( ItemData.WeaponType, ItemData.ArmourType ) -> Hero
equipHero hero ( customWeaponType, customArmourType ) =
    let
        makeShield shieldType =
            Item.new (ItemData.ItemTypeShield shieldType) IdGenerator.empty

        makeHelmet helmetType =
            Item.new (ItemData.ItemTypeHelmet helmetType) IdGenerator.empty

        makeGauntlets gauntletsType =
            Item.new (ItemData.ItemTypeGauntlets gauntletsType) IdGenerator.empty

        makeBracers bracersType =
            Item.new (ItemData.ItemTypeBracers bracersType) IdGenerator.empty

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
                            (Hero.levelUp hero)
                    in
                        reducer (Dict.insert n hero dict) nextLvlHero (n + 1)
    in
        reducer Dict.empty hero 1


initMatches : Dict Int Hero -> CustomEquipment -> List (Match a b)
initMatches heroLookup ( weaponType, armourType ) =
    let
        newMonster monsterType =
            Monster.makeForArena monsterType

        newMatch monster =
            let
                addCustomEquipment hero =
                    { hero
                        | equipment =
                            hero.equipment
                                |> Equipment.unequip Equipment.WeaponSlot
                                |> Result.andThen (Equipment.unequip Equipment.ArmourSlot)
                                |> Result.toMaybe
                                |> Maybe.map
                                    (\x ->
                                        Equipment.equipMany
                                            [ ( Equipment.WeaponSlot, makeWeapon weaponType )
                                            , ( Equipment.ArmourSlot, makeArmour armourType )
                                            ]
                                            x
                                    )
                                |> Maybe.withDefault hero.equipment
                    }

                hero =
                    case Dict.get monster.expLevel heroLookup of
                        Just lookedUpHero ->
                            addCustomEquipment lookedUpHero

                        Nothing ->
                            Debug.crash "Could not look up a hero with exp level: " monster.expLevel
            in
                Match hero monster 0 0 [] [] [] [] []
    in
        --        List.map newMatch (List.take 20 Monster.types)
        List.map newMonster Monster.types
            |> List.filter (.expLevel >> flip (>=) 5)
            |> List.map newMatch
