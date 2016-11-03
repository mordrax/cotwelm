module Main exposing (..)

--Splash Screen

import SplashView exposing (..)


-- Character creation

import CharCreation.CharCreation as CharCreation exposing (..)
import Hero.Hero as Hero exposing (Hero)


-- Main game screen

import Game.Game as Game exposing (Game)


-- Core/Elm imports

import Html exposing (..)
import Html.App exposing (map)
import Navigation
import String exposing (..)
import Task exposing (perform)
import Random.Pcg as Random exposing (initialSeed)
import Time exposing (inSeconds, now)


-- Dungeon Editor

import Dungeon.Editor as Editor exposing (..)


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Msg
    | GameMsg (Game.Msg)
    | GenerateGame Random.Seed CharCreation
    | EditorMsg Editor.Msg


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | DungeonPage
    | EditorPage
    | NotImplementedPage


init : String -> ( Model, Cmd Msg )
init url =
    let
        model =
            { currentPage = GamePage
            , charCreation = CharCreation.init
            , game = Nothing
            , editor = Editor.init
            }

        ( modelWithUrl, urlCmds ) =
            urlUpdate url model
    in
        ( modelWithUrl, urlCmds )


type alias Model =
    { currentPage : Page
    , charCreation : CharCreation
    , game : Maybe Game
    , editor : Editor.Model
    }


main : Program Never
main =
    Navigation.program urlParser
        { init = init
        , update = update
        , view = view
        , urlUpdate = urlUpdate
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
                        ( game', cmd ) =
                            Game.update msg game
                    in
                        ( { model | game = Just game' }, Cmd.map GameMsg cmd )

        EditorMsg msg ->
            let
                ( editor', cmds ) =
                    Editor.update msg model.editor

                gameCmds =
                    Cmd.map EditorMsg cmds
            in
                ( { model | editor = editor' }, gameCmds )

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


view : Model -> Html Msg
view model =
    case model.currentPage of
        CharCreationPage ->
            div []
                [ Html.App.map CharCreationMsg
                    (CharCreation.view model.charCreation)
                ]

        SplashPage ->
            div []
                [ Html.App.map SplashMsg SplashView.view
                ]

        GamePage ->
            case model.game of
                Nothing ->
                    h1 [] [ text "There is no game state. A possible reason is that you have not created a character." ]

                Just game ->
                    div []
                        [ Html.App.map GameMsg (Game.view game) ]

        EditorPage ->
            Html.App.map EditorMsg (Editor.view model.editor)

        _ ->
            h1 [] [ text "Page not implemented!" ]


urlUpdate : String -> Model -> ( Model, Cmd Msg )
urlUpdate url model =
    let
        setPage =
            \x -> ( { model | currentPage = x }, Cmd.none )
    in
        if url == "charCreation" then
            setPage CharCreationPage
        else if url == "game" then
            setPage GamePage
        else if url == "editor" then
            setPage EditorPage
        else
            setPage SplashPage



-- URL PARSERS - check out evancz/url-parser for fancier URL parsing


fromUrl : String -> String
fromUrl url =
    String.dropLeft 2 url


urlParser : Navigation.Parser String
urlParser =
    Navigation.makeParser (fromUrl << .hash)


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

        fail msg =
            let
                _ =
                    Debug.log "FATAL: Unable to get a random seed, using 92374093709223 instead." msg
            in
                GenerateGame (Random.initialSeed 92374093709223) charCreation
    in
        Task.perform fail success Time.now
