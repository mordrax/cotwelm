module Dungeon.Editor exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)
import Game.Maps as Maps exposing (..)


-- Dungeon

import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.DungeonGenerator as DungeonGenerator exposing (..)
import Dungeon.Types
import Dungeon.Clean
import Level


-- libs

import Lodash exposing (..)
import Dict exposing (..)
import Random.Pcg as Random exposing (..)


type alias Model =
    { map : Level.Map
    , config : Config.Model
    , dungeonSteps : List Dungeon.Types.Model
    }


type Msg
    = GenerateMap Int
    | Dungeon Dungeon.Types.Model
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


generateCandidate : Model -> Generator Dungeon.Types.Model
generateCandidate model =
    let
        newCandidate =
            DungeonGenerator.steps 200 (DungeonGenerator.init model.config)

        fitness dungeonModel =
            List.length dungeonModel.rooms > model.config.minRooms
    in
        Random.map Dungeon.Clean.clean newCandidate
            |> Random.andThen
                (\dungeonModel ->
                    if fitness dungeonModel then
                        constant dungeonModel
                    else
                        generateCandidate model
                )


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
                            Dungeon.Clean.clean dungeonModel
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
                ( model, Random.generate Dungeon (DungeonGenerator.steps nSteps dungeonModel) )

        Dungeon dungeonModel ->
            ( { model | dungeonSteps = dungeonModel :: [], map = updateMap dungeonModel }
            , Cmd.none
            )

        ConfigMsg msg ->
            ( { model | config = Config.update msg model.config }, Cmd.none )

        ResetMap ->
            ( { model | map = Dict.empty, dungeonSteps = [] }, Cmd.none )

        Noop ->
            ( model, Cmd.none )


updateMap : Dungeon.Types.Model -> Level.Map
updateMap dungeonModel =
    dungeonModel
        |> Dungeon.Types.toTiles
        |> Level.fromTiles


view : Model -> Html Msg
view model =
    let
        border =
            ( "border", "1px solid black" )

        screenMap =
            Maps.toScreenCoords model.map model.config.dungeonSize

        clickTile position =
            Noop
    in
        div []
            [ div []
                [ --roomSizeView model,
                  button [ class "ui button", onClick <| GenerateMap 1 ] [ text "Step" ]
                , button [ class "ui button", onClick <| GenerateMap 50 ] [ text "Step x50" ]
                , button [ class "ui button", onClick <| Clean ] [ text "Clean" ]
                , button [ class "ui button", onClick <| ResetMap ] [ text "Destroy!" ]
                , button [ class "ui button", onClick <| NewCandidate ] [ text "NewCandidate" ]
                , mapSizeView model
                ]
            , div [ style [ ( "position", "absolute" ), ( "left", "300px" ), ( "top", "0px" ) ] ]
                (Maps.draw { start = ( 0, 0 ), size = ( 100, 100 ) } screenMap model.config.mapScale clickTile)
            ]


mapSizeView : Model -> Html Msg
mapSizeView model =
    p [ style [ ( "width", "300px" ) ] ]
        [ Html.map ConfigMsg (Config.dungeonSizeView model.config)
        , Html.map ConfigMsg (Config.roomsConfigView model.config)
        ]
