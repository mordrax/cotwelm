module Main exposing (..)

import SplashView exposing (..)


-- Character creation

import CharCreation.CharCreation as CharCreation exposing (..)
import CharCreation.Data exposing (..)


-- Main game screen

import Game.Game exposing (..)
import Game.Data exposing (..)


-- Cotw specific data

import CotwData exposing (Msg(..), Page(..))


-- Keyboard/Controller subscriptions

import Game.Keyboard exposing (..)


-- Core/Elm imports

import Html exposing (..)
import Html.App exposing (map)


main : Platform.Program Basics.Never
main =
    Html.App.program
        { init = initModel
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub CotwData.Msg
subscriptions model =
    Sub.map GameMsg Game.Keyboard.subscriptions


initModel : ( Model, Cmd a )
initModel =
    ( { currentPage = GamePage
      , character = CharCreation.initChar
      , game = Game.Game.initGame
      }
    , Cmd.none
    )


type alias Model =
    { currentPage : Page
    , character : CharCreation.Data.Model
    , game : Game.Data.Model
    }


update : CotwData.Msg -> Model -> ( Model, Cmd CotwData.Msg )
update msg model =
    case msg of
        SplashMsg NewGame ->
            ( { model | currentPage = CharCreationPage }, Cmd.none )

        SplashMsg _ ->
            ( { model | currentPage = NotImplementedPage }, Cmd.none )

        CharCreationMsg StartGame ->
            ( { model | currentPage = GamePage }, Cmd.none )

        CharCreationMsg msg ->
            ( { model | character = CharCreation.update msg model.character }, Cmd.none )

        GameMsg (Just msg) ->
            let
                ( game', cmd ) =
                    Game.Game.update msg model.game
            in
                ( { model | game = game' }, Cmd.none )

        GameMsg Nothing ->
            ( model, Cmd.none )


view : Model -> Html CotwData.Msg
view model =
    case model.currentPage of
        CharCreationPage ->
            div [] [ map CharCreationMsg (CharCreation.view model.character) ]

        SplashPage ->
            div [] [ map SplashMsg SplashView.view ]

        GamePage ->
            div [] [ map CotwData.GameMsg (Game.Game.view model.game) ]

        _ ->
            h1 [] [ text "Page not implemented!" ]
