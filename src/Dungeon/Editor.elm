module Dungeon.Editor exposing (..)

import Dict exposing (Dict)
import Dungeon.AdvancedDungeonGenerator as DungeonGenerator exposing (Dungeon)
import Dungeon.Rooms.Config as Config exposing (..)
import Game.Level as Level
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Random.Pcg as Random exposing (Generator, constant)


type alias Model =
    { map : Level.Map
    , config : Config.Config
    , dungeonSteps : List Dungeon
    }


type Msg
    = GenerateMap Int
    | Dungeon Dungeon
    | ConfigMsg Config.Msg
    | ResetMap
    | Clean
    | NewCandidate
    | Noop


init : Model
init =
    { map = Dict.empty
    , config = Config.init
    , dungeonSteps = []
    }


generateCandidate : Model -> Generator Dungeon
generateCandidate model =
    DungeonGenerator.candidate model.config (DungeonGenerator.init model.config)
        |> Random.map DungeonGenerator.clean
        |> Random.andThen (\dungeonModel -> constant dungeonModel)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewCandidate ->
            ( model, Random.generate Dungeon (generateCandidate model) )

        Clean ->
            case List.head model.dungeonSteps of
                Just dungeonModel ->
                    let
                        cleanedModel =
                            DungeonGenerator.clean dungeonModel
                    in
                    ( { model
                        | dungeonSteps = cleanedModel :: model.dungeonSteps
                        , map = updateMap cleanedModel
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        GenerateMap nSteps ->
            let
                dungeonModel =
                    model.dungeonSteps
                        |> List.reverse
                        |> List.head
                        |> Maybe.withDefault (DungeonGenerator.init model.config)
            in
            ( model, Random.generate Dungeon (DungeonGenerator.steps nSteps model.config dungeonModel) )

        Dungeon dungeonModel ->
            ( { model
                | dungeonSteps = dungeonModel :: []
                , map = updateMap dungeonModel
              }
            , Cmd.none
            )

        ConfigMsg msg ->
            ( { model | config = Config.update msg model.config }, Cmd.none )

        ResetMap ->
            ( { model | map = Dict.empty, dungeonSteps = [] }, Cmd.none )

        Noop ->
            ( model, Cmd.none )


updateMap : Dungeon -> Level.Map
updateMap dungeon =
    dungeon
        |> DungeonGenerator.toTiles
        |> Level.fromTiles


view : Model -> Html Msg
view model =
    let
        border =
            ( "border", "1px solid black" )

        screenMap =
            Level.toScreenCoords model.map model.config.dungeonSize

        viewportSize =
            ( 200, 200 )

        clickTile position =
            Noop
    in
    div [ HA.style [ ( "width", "100%" ), ( "height", "100%" ) ] ]
        [ div [ HA.style [ ( "position", "absolute" ) ] ]
            [ button [ HA.class "ui button", HE.onClick <| GenerateMap 1 ] [ text "Step" ]
            , button [ HA.class "ui button", HE.onClick <| GenerateMap 5 ] [ text "Step x5" ]
            , button [ HA.class "ui button", HE.onClick <| GenerateMap 15 ] [ text "Step x15" ]
            , button [ HA.class "ui button", HE.onClick <| Clean ] [ text "Clean" ]
            , button [ HA.class "ui button", HE.onClick <| ResetMap ] [ text "Destroy!" ]
            , button [ HA.class "ui button", HE.onClick <| NewCandidate ] [ text "NewCandidate" ]
            , mapSizeView model
            ]
        , div [ HA.style [ ( "left", "300px" ), ( "position", "absolute" ), ( "top", "30px" ), ( "width", "100%" ), ( "height", "100%" ) ] ]
            (Level.draw
                { start = ( 0, 0 )
                , size = viewportSize
                }
                screenMap
                model.config.mapScale
                clickTile
            )
        ]


mapSizeView : Model -> Html Msg
mapSizeView model =
    p [ HA.style [ ( "width", "300px" ) ] ]
        [ Html.map ConfigMsg (Config.dungeonSizeView model.config)
        , Html.map ConfigMsg (Config.roomsConfigView model.config)
        ]
