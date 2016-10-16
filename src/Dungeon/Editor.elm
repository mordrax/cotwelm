module Dungeon.Editor exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)
import Html.App exposing (map)
import Game.Maps as Maps exposing (..)


-- Dungeon

import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.DungeonGenerator as DungeonGenerator exposing (..)


-- libs

import Lodash exposing (..)
import Dict exposing (..)
import Random.Pcg as Random exposing (..)


type alias Model =
    { map : Maps.Map
    , config : Config.Model
    , dungeonSteps : List DungeonGenerator.Model
    }


type Msg
    = GenerateMap Int
    | Dungeon DungeonGenerator.Model
    | ConfigMsg Config.Msg
    | ResetMap
    | Clean


init : Model
init =
    { map = Dict.empty
    , config = Config.init
    , dungeonSteps = []
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
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
                firstStep =
                    case List.head model.dungeonSteps of
                        Just dungeonModel ->
                            DungeonGenerator.step { dungeonModel | config = model.config }

                        Nothing ->
                            DungeonGenerator.init model.config

                oneStep _ gen =
                    gen `andThen` DungeonGenerator.step

                dungeonGenerator =
                    if nSteps == 1 then
                        firstStep
                    else
                        List.foldl oneStep firstStep [0..nSteps - 1]
            in
                ( model, Random.generate Dungeon dungeonGenerator )

        Dungeon dungeonModel ->
            ( { model | dungeonSteps = dungeonModel :: [], map = updateMap dungeonModel }
            , Cmd.none
            )

        ConfigMsg msg ->
            ( { model | config = Config.update msg model.config }, Cmd.none )

        ResetMap ->
            ( { model | map = Dict.empty, dungeonSteps = [] }, Cmd.none )


updateMap : DungeonGenerator.Model -> Map
updateMap dungeonModel =
    dungeonModel
        |> DungeonGenerator.toTiles
        |> Maps.fromTiles


view : Model -> Html Msg
view model =
    let
        border =
            ( "border", "1px solid black" )

        screenMap =
            Maps.toScreenCoords model.map model.config.dungeonSize
    in
        div []
            [ div []
                [ --roomSizeView model,
                  button [ class "ui button", onClick <| GenerateMap 1 ] [ text "Step" ]
                , button [ class "ui button", onClick <| GenerateMap 50 ] [ text "Step x50" ]
                , button [ class "ui button", onClick <| Clean ] [ text "Clean" ]
                , button [ class "ui button", onClick <| ResetMap ] [ text "Destroy!" ]
                , mapSizeView model
                ]
            , div [ style [ ( "position", "absolute" ), ( "left", "300px" ), ( "top", "0px" ) ] ]
                (Maps.draw screenMap model.config.mapScale)
            ]


mapSizeView : Model -> Html Msg
mapSizeView model =
    p [ style [ ( "width", "300px" ) ] ]
        [ Html.App.map ConfigMsg (Config.dungeonSizeView model.config)
        , Html.App.map ConfigMsg (Config.roomsConfigView model.config)
        ]
