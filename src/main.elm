module Main exposing (..)

--Splash Screen

import SplashView exposing (..)


-- Character creation

import CharCreation.CharCreation as CharCreation exposing (..)
import CharCreation.Data exposing (..)


-- Main game screen

import Game.Game exposing (..)
import Game.Data exposing (..)
import Game.Inventory as Inventory exposing (..)


-- Cotw specific data

import CotwData exposing (Msg(..), Page(..))


-- Keyboard/Controller subscriptions

import Game.Keyboard exposing (..)


-- Core/Elm imports

import Html exposing (..)
import Html.App exposing (map)
import Navigation
import String exposing (..)
import Task exposing (perform)
import Random exposing (initialSeed)
import Time exposing (inSeconds, now)


--import TimeTravel.Navigation as TimeTravel


main : Program Never
main =
    Navigation.program urlParser
        --TimeTravel.program urlParser
        { init = initModel
        , update = update
        , view = view
        , urlUpdate = urlUpdate
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub CotwData.Msg
subscriptions model =
    let
        convertToMainMsg =
            \x -> Sub.map GameMsg x

        convertToGameMsg =
            \x -> Sub.map InvMsg x

        keyboardSubs =
            List.map convertToMainMsg Game.Keyboard.subscriptions

        inventorySubs =
            Inventory.subscriptions model.game

        inventorySubsGameMsg =
            List.map convertToMainMsg (List.map convertToGameMsg inventorySubs)
    in
        Sub.batch
            (keyboardSubs
                |> List.append inventorySubsGameMsg
             --|> (::) (Sub.map getSeed)
            )


initModel : String -> ( Model, Cmd CotwData.Msg )
initModel url =
    let
        ( initGameState, gameCmds ) =
            Game.Game.initGame

        gameMainCmds =
            Cmd.map (\x -> GameMsg x) gameCmds

        model =
            { currentPage = GamePage
            , character = CharCreation.initChar
            , game = initGameState
            }

        ( modelWithUrl, urlCmds ) =
            urlUpdate url model
    in
        ( modelWithUrl, Cmd.batch [ urlCmds, gameMainCmds, getSeed ] )


type alias Model =
    { currentPage : Page
    , character : CharCreation.Data.Model
    , game : Game.Data.Model
    }


update : CotwData.Msg -> Model -> ( Model, Cmd CotwData.Msg )
update msg model =
    case msg of
        SplashMsg NewGame ->
            ( model, Navigation.newUrl "#/charCreation" )

        SplashMsg _ ->
            ( { model | currentPage = NotImplementedPage }, Cmd.none )

        CharCreationMsg StartGame ->
            ( model, Navigation.newUrl "#/game" )

        CharCreationMsg msg ->
            ( { model | character = CharCreation.update msg model.character }, Cmd.none )

        GameMsg msg ->
            let
                ( game', cmd ) =
                    Game.Game.update msg model.game
            in
                ( { model | game = game' }, Cmd.none )

        RNS seed ->
            let
                _ =
                    Debug.log "Seed: " seed
            in
                ( model, Cmd.none )


view : Model -> Html CotwData.Msg
view model =
    case model.currentPage of
        CharCreationPage ->
            div []
                [ Html.App.map CharCreationMsg
                    (CharCreation.view model.character)
                ]

        SplashPage ->
            div []
                [ Html.App.map SplashMsg SplashView.view
                ]

        GamePage ->
            div []
                [ Html.App.map CotwData.GameMsg
                    (Game.Game.view model.game)
                ]

        _ ->
            h1 [] [ text "Page not implemented!" ]


urlUpdate : String -> Model -> ( Model, Cmd CotwData.Msg )
urlUpdate url model =
    if url == "charCreation" then
        ( { model | currentPage = CharCreationPage }, Cmd.none )
    else if url == "game" then
        ( { model | currentPage = GamePage }, Cmd.none )
    else if url == "inventory" then
        ( { model | currentPage = GamePage }, Cmd.none )
    else
        ( { model | currentPage = SplashPage }, Cmd.none )



-- URL PARSERS - check out evancz/url-parser for fancier URL parsing


fromUrl : String -> String
fromUrl url =
    String.dropLeft 2 url


urlParser : Navigation.Parser String
urlParser =
    Navigation.makeParser (fromUrl << .hash)



-- Random number seed


getSeed : Cmd CotwData.Msg
getSeed =
    let
        generateSeed =
            \timeNow ->
                timeNow
                    |> Time.inSeconds
                    |> round
                    |> Random.initialSeed

        fail =
            \x ->
                let
                    _ =
                        Debug.log "FATAL: Unable to get a random seed." x
                in
                    CotwData.RNS (Random.initialSeed 92374093709223)
    in
        Task.perform (\x -> fail x)
            (\timeNow -> CotwData.RNS (generateSeed timeNow))
            Time.now
