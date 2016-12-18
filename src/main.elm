module Main exposing (..)

--Splash Screen

import SplashView exposing (..)


-- Character creation

import CharCreation.CharCreation as CharCreation exposing (..)
import Hero.Hero as Hero exposing (Hero)


-- Main game screen

import Game.Game as Game


-- Core/Elm imports

import Html exposing (..)
import Html.Attributes as HA
import Navigation exposing (Location)
import String exposing (..)
import Task exposing (perform)
import Random.Pcg as Random exposing (initialSeed)
import Time exposing (inSeconds, now)


-- Tools

import Dungeon.Editor as Editor exposing (..)
import Arena


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Msg
    | GameMsg Game.Msg
    | GenerateGame Random.Seed CharCreation
    | EditorMsg Editor.Msg
    | ArenaMsg Arena.Msg
    | ChangePage Page


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | DungeonPage
    | EditorPage
    | ArenaPage
    | NotImplementedPage


init : Location -> ( Model, Cmd Msg )
init location =
    let
        model =
            { currentPage = urlToPage location
            , charCreation = CharCreation.init
            , game = Nothing
            , editor = Editor.init
            , arena = Arena.init
            }
    in
        ( model, Cmd.none )


type alias Model =
    { currentPage : Page
    , charCreation : CharCreation
    , game : Maybe Game.Model
    , editor : Editor.Model
    , arena : Arena.Model
    }


main : Program Never Model Msg
main =
    Navigation.program urlParser
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.game of
        Nothing ->
            Sub.none

        Just game ->
            Sub.map GameMsg (Game.subscription game)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SplashMsg NewGame ->
            ( model, Navigation.newUrl "#/charCreation" )

        SplashMsg _ ->
            ( { model | currentPage = NotImplementedPage }, Cmd.none )

        CharCreationMsg msg ->
            let
                ( charCreation_, isComplete ) =
                    CharCreation.update msg model.charCreation
            in
                case isComplete of
                    False ->
                        ( { model | charCreation = charCreation_ }, Cmd.none )

                    True ->
                        ( { model | charCreation = charCreation_ }
                        , Cmd.batch
                            [ Navigation.newUrl "#/game"
                            , startNewGame charCreation_
                            ]
                        )

        GameMsg msg ->
            case model.game of
                Nothing ->
                    ( model, Cmd.none )

                Just game ->
                    let
                        ( game_, cmd ) =
                            Game.update msg game
                    in
                        ( { model | game = Just game_ }, Cmd.map GameMsg cmd )

        EditorMsg msg ->
            let
                ( editor_, cmds ) =
                    Editor.update msg model.editor

                gameCmds =
                    Cmd.map EditorMsg cmds
            in
                ( { model | editor = editor_ }, gameCmds )

        ArenaMsg msg ->
            let
                ( arena_, cmds ) =
                    Arena.update msg model.arena

                gameCmds =
                    Cmd.map ArenaMsg cmds
            in
                ( { model | arena = arena_ }, gameCmds )

        GenerateGame seed charCreation ->
            let
                ( name, gender, difficulty, attributes ) =
                    CharCreation.info charCreation

                hero =
                    Hero.init name attributes gender

                ( game, gameCmds ) =
                    Game.init seed hero difficulty

                mainCmds =
                    Cmd.map GameMsg gameCmds
            in
                ( { model | game = Just game }, mainCmds )

        ChangePage page ->
            ( { model | currentPage = page }, Cmd.none )


view : Model -> Html Msg
view model =
    case model.currentPage of
        CharCreationPage ->
            Html.map CharCreationMsg
                (CharCreation.view model.charCreation)

        SplashPage ->
            Html.map SplashMsg SplashView.view

        GamePage ->
            case model.game of
                Nothing ->
                    h1 [] [ text "There is no game state. A possible reason is that you have not created a character." ]

                Just game ->
                    Html.map GameMsg (Game.view game)

        EditorPage ->
            Html.map EditorMsg (Editor.view model.editor)

        ArenaPage ->
            Html.map ArenaMsg (Arena.view model.arena)

        _ ->
            h1 [] [ text "Page not implemented!" ]



-- URL PARSERS - check out evancz/url-parser for fancier URL parsing


urlParser : Location -> Msg
urlParser location =
    ChangePage <| urlToPage location


urlToPage : Location -> Page
urlToPage { hash } =
    if hash == "#/charCreation" then
        CharCreationPage
    else if hash == "#/game" then
        GamePage
    else if hash == "#/editor" then
        EditorPage
    else if hash == "#/arena" then
        ArenaPage
    else
        SplashPage


{-| Random number seed
-}
startNewGame : CharCreation -> Cmd Msg
startNewGame charCreation =
    let
        success timeNow =
            timeNow
                |> Time.inSeconds
                |> round
                |> Random.initialSeed
                |> \seed -> GenerateGame seed charCreation
    in
        Task.perform success Time.now
