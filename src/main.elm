module Main exposing (..)

import SplashView exposing (..)
import CharCreation.CharCreation as CharCreation exposing (..)
import CharCreation.Data exposing (..)
import Game.Game as Game exposing (..)
import Game.Data exposing (..)
import CotwData as Cotw exposing (Msg(..), Page(..))
import Html exposing (..)
import Html.App exposing (map)


main : Platform.Program Basics.Never
main =
    Html.App.beginnerProgram
        { model = initModel
        , update = update
        , view = view
        }


initModel : Model
initModel =
    { currentPage = GamePage
    , character = CharCreation.initChar
    , game = Game.initGame
    }


type alias Model =
    { currentPage : Page
    , character : CharCreation.Data.Model
    , game : Game.Data.Model
    }


update : Cotw.Msg -> Model -> Model
update msg model =
    case msg of
        SplashMsg NewGame ->
            { model | currentPage = CharCreationPage }

        SplashMsg _ ->
            { model | currentPage = NotImplementedPage }

        CharCreationMsg StartGame ->
            { model | currentPage = GamePage }

        CharCreationMsg msg ->
            { model | character = CharCreation.update msg model.character }

        GameMsg msg ->
            { model
                | game = Game.update msg model.game
            }


view : Model -> Html Cotw.Msg
view model =
    case model.currentPage of
        CharCreationPage ->
            div [] [ map CharCreationMsg (CharCreation.view model.character) ]

        SplashPage ->
            div [] [ map SplashMsg SplashView.view ]

        GamePage ->
            div [] [ map Cotw.GameMsg (Game.view model.game) ]

        _ ->
            h1 [] [ text "Page not implemented!" ]
