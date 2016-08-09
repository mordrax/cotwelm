module Dungeon.Editor exposing (..)

import Html exposing (..)
import Game.Maps as Maps exposing (..)
import Dungeon.Room as Room exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Rooms.Cross as Cross exposing (..)
import Dungeon.DungeonGenerator as DungeonGenerator exposing (..)


-- libs

import Dict exposing (..)
import Random exposing (..)


-- mdl

import Material exposing (..)
import Material.Scheme exposing (..)
import Material.Button as Button exposing (..)


type alias Model =
    { map : Map, mdl : Material.Model }


type Msg
    = GenerateMap
    | GenerateRoom Room
    | Mdl (Material.Msg Msg)


init : Model
init =
    { map = Dict.empty, mdl = Material.model }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateMap ->
            ( model, Random.generate GenerateRoom Cross.generate )

        GenerateRoom room ->
            let
                tiles =
                    DungeonGenerator.roomToTiles room ( 10, 0 )
            in
                ( { model | map = Maps.toMap tiles }, Cmd.none )

        Mdl msg' ->
            Material.update msg' model


type alias Mdl =
    Material.Model


view : Model -> Html Msg
view model =
    div []
        [ div []
            [ Button.render Mdl
                [ 0 ]
                model.mdl
                [ Button.colored
                , Button.ripple
                , Button.onClick GenerateMap
                ]
                [ text "Generate Dungeon" ]
            ]
            |> Material.Scheme.top
        , div []
            (Maps.draw model.map)
        ]
