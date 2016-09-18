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

import Dict exposing (..)
import Random exposing (..)


type alias Model =
    { map : Maps.Map
    , config : Config.Model
    , dungeonSteps : List DungeonGenerator.Model
    }


type Msg
    = GenerateMap
    | Dungeon DungeonGenerator.Model
    | ConfigMsg Config.Msg
    | ResetMap


init : Model
init =
    { map = Dict.empty
    , config = Config.init
    , dungeonSteps = []
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
--    let
--        _ =
--            Debug.log "Editor.update" msg
--    in
        case msg of
            GenerateMap ->
                let
                    latestDungeonModel =
                        List.head model.dungeonSteps

                    dungeonGenerator =
                        case latestDungeonModel of
                            Just dungeonModel ->
                                DungeonGenerator.step { dungeonModel | config = model.config }

                            Nothing ->
                                DungeonGenerator.init model.config
                in
                    ( model, Random.generate Dungeon dungeonGenerator )

            Dungeon dungeonModel ->
                let
                    map =
                        dungeonModel
                            |> DungeonGenerator.toTiles
                            |> Maps.fromTiles
                in
                    ( { model | dungeonSteps = dungeonModel :: [], map = map }
                    , Cmd.none
                    )

            ConfigMsg msg ->
                ( { model | config = Config.update msg model.config }, Cmd.none )

            ResetMap ->
                ( { model | map = Dict.empty, dungeonSteps = [] }, Cmd.none )


view : Model -> Html Msg
view model =
    let
        border =
            ( "border", "1px solid black" )
    in
        div []
            [ div []
                [ --roomSizeView model,
                  button [ class "ui button", onClick GenerateMap ] [ text "Step" ]
                , button [ class "ui button", onClick ResetMap ] [ text "Reset" ]
                , mapSizeView model
                ]
            , div [ style [ ( "position", "absolute" ), ( "left", "300px" ), ( "top", "0px" ) ] ]
                (Maps.draw model.map model.config.mapScale)
            ]


mapSizeView : Model -> Html Msg
mapSizeView model =
    p [ style [ ( "width", "300px" ) ] ]
        [ Html.App.map ConfigMsg (Config.dungeonSizeView model.config)
        , Html.App.map ConfigMsg (Config.roomsConfigView model.config)
        ]
