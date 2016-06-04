module Main exposing (..)

--Splash Screen

import SplashView exposing (..)


-- Character creation

import CharCreation.CharCreation as CharCreation exposing (..)
import CharCreation.Data exposing (..)


-- Main game screen

import Game.Game exposing (..)
import Game.Data exposing (..)


-- Cotw specific data

import CotwData exposing (Msg(..), Page(..))
import Inventory exposing (..)


-- Keyboard/Controller subscriptions

import Game.Keyboard exposing (..)


-- Core/Elm imports

import Html exposing (..)
import Html.App exposing (map)
import Navigation
import String exposing (..)


main : Program Never
main =
    Navigation.program urlParser
        { init = initModel
        , update = update
        , view = view
        , urlUpdate = urlUpdate
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub CotwData.Msg
subscriptions model =
    Sub.batch (List.map (Sub.map GameMsg) Game.Keyboard.subscriptions)
        ++ (List.map (Sub.map GameMsg) Inventory.subscriptions)


initModel : String -> ( Model, Cmd CotwData.Msg )
initModel url =
    let
        model =
            { currentPage = GamePage
            , character = CharCreation.initChar
            , game = Game.Game.initGame
            }
    in
        urlUpdate url model


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


view : Model -> Html CotwData.Msg
view model =
    case model.currentPage of
        CharCreationPage ->
            div [] [ Html.App.map CharCreationMsg (CharCreation.view model.character) ]

        SplashPage ->
            div [] [ Html.App.map SplashMsg SplashView.view ]

        GamePage ->
            div [] [ Html.App.map CotwData.GameMsg (Game.Game.view model.game) ]

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
