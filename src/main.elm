module Main exposing (..)

import Arena.PlayerArena as PlayerArena
import CharCreation exposing (CharCreation)
import Dungeon.Editor as Editor exposing (..)
import Game
import Game.Model exposing (Game)
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Navigation exposing (Location)
import Random.Pcg as Random exposing (initialSeed)
import SplashView
import Task exposing (perform)
import Time exposing (inSeconds, now)
import Arena.MonsterArena as MonsterArena


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Msg
    | GameMsg Game.Model.Msg
    | GenerateGame Random.Seed CharCreation
    | EditorMsg Editor.Msg
    | ArenaMsg PlayerArena.Msg
    | PitMsg MonsterArena.Msg
    | ChangePage Page


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | DungeonPage
    | EditorPage
    | ArenaPage
    | PitPage
    | NotImplementedPage


init : Location -> ( Model, Cmd Msg )
init location =
    let
        model =
            { currentPage = urlToPage location
            , charCreation = CharCreation.init
            , game = Nothing
            , editor = Editor.init
            , arena = PlayerArena.init
            , pit = MonsterArena.init
            }
    in
        ( model, Cmd.none )


type alias Model =
    { currentPage : Page
    , charCreation : CharCreation
    , game : Maybe Game
    , editor : Editor.Model
    , arena : PlayerArena.Model
    , pit : MonsterArena.Model
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
    let
        gameSub =
            model.game
                |> Maybe.map (Game.subscription >> Sub.map GameMsg)
                |> Maybe.withDefault Sub.none
    in
        case model.currentPage of
            PitPage ->
                Sub.map PitMsg (MonsterArena.subs model.pit)

            _ ->
                gameSub


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SplashMsg (SplashView.NewGame) ->
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
                    PlayerArena.update msg model.arena

                gameCmds =
                    Cmd.map ArenaMsg cmds
            in
                ( { model | arena = arena_ }, gameCmds )

        PitMsg msg ->
            let
                ( pit_, cmds ) =
                    MonsterArena.update msg model.pit
            in
                ( { model | pit = pit_ }, Cmd.map PitMsg cmds )

        RIPMsg msg ->
            ( model, Cmd.none )

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
            Html.map ArenaMsg (PlayerArena.view model.arena)

        PitPage ->
            Html.map PitMsg (MonsterArena.view model.pit)

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
    else if hash == "#/pit" then
        PitPage
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
