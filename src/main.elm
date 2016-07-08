module Main exposing (..)

--Splash Screen

import SplashView exposing (..)


-- Character creation

import CharCreation.CharCreation as CharCreation exposing (..)
import CharCreation.Data exposing (..)


-- Main game screen

import Game.Game as Game exposing (..)
import Game.Data exposing (..)
import Game.Inventory as Inventory exposing (..)


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


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Data.Msg
    | GameMsg (Game.Data.Msg)
    | RNS Random.Seed


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | NotImplementedPage



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


subscriptions : Model -> Sub Msg
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


initModel : String -> ( Model, Cmd Msg )
initModel url =
    let
        ( gameState, _ ) =
            Game.initGame (Random.initialSeed 0)

        model =
            { currentPage = GamePage
            , character = CharCreation.initChar
            , game = gameState
            }

        ( modelWithUrl, urlCmds ) =
            urlUpdate url model
    in
        ( modelWithUrl, Cmd.batch [ urlCmds, getSeed ] )


type alias Model =
    { currentPage : Page
    , character : CharCreation.Data.Model
    , game : Game.Data.Model
    }


update : Msg -> Model -> ( Model, Cmd Msg )
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
                    Game.update msg model.game
            in
                ( { model | game = game' }, Cmd.none )

        RNS seed ->
            let
                ( game, gameCmds ) =
                    Game.initGame seed

                mainCmds =
                    Cmd.map (\x -> GameMsg x) gameCmds
            in
                ( { model | game = game }, mainCmds )


view : Model -> Html Msg
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
                [ Html.App.map GameMsg
                    (Game.view model.game)
                ]

        _ ->
            h1 [] [ text "Page not implemented!" ]


urlUpdate : String -> Model -> ( Model, Cmd Msg )
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


getSeed : Cmd Msg
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
                    RNS (Random.initialSeed 92374093709223)
    in
        Task.perform (\x -> fail x)
            (\timeNow -> RNS (generateSeed timeNow))
            Time.now
