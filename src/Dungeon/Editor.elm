module Dungeon.Editor exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Game.Maps as Maps exposing (..)


-- Dungeon

import Dungeon.Room as Room exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Cross as Cross exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.DungeonGenerator as DungeonGenerator exposing (..)


-- libs

import Dict exposing (..)
import Random exposing (..)


-- mdl

import Material exposing (..)
import Material.Scheme exposing (..)
import Material.Button as Button exposing (..)
import Material.Slider as Slider


type alias Model =
    { map : Map
    , mdl : Material.Model
    , config : Config.Model
    }


type Msg
    = GenerateMap
    | GenerateRoom Room
    | Mdl (Material.Msg Msg)
    | SliderMsg SliderType Float


type SliderType
    = Room RoomType
    | Map


init : Model
init =
    { map = Dict.empty
    , mdl = Material.model
    , config = Config.init
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GenerateMap ->
            ( model, Random.generate GenerateRoom (Cross.generate model.config) )

        GenerateRoom room ->
            let
                tiles =
                    DungeonGenerator.roomToTiles room ( 10, 0 )
            in
                ( { model | map = Maps.toMap tiles }, Cmd.none )

        SliderMsg sliderType newSliderValue ->
            case sliderType of
                Room roomType ->
                    ( { model | roomSize = round newSliderValue }, Cmd.none )

                Map ->
                    ( { model | mapSize = round newSliderValue }, Cmd.none )

        Mdl msg' ->
            Material.update msg' model


type alias Mdl =
    Material.Model


updateRoomSizeMax : RoomType -> Int -> Model -> Model
updateRoomSizeMax roomType max ({ config } as model) =
    let
        mapSnd =
            \( x, y ) y' -> ( x, y' )

        roomSizeRanges =
            config.roomSizeRanges

        roomSizeRanges' =
            case roomType of
                Rectangular ->
                    { roomSizeRanges | rectangular = mapSnd roomSizeRanges.rectangular max }

        --Cross ->
        --    config.roomSizeRanges.cross
        --Diamond ->
        --    config.roomSizeRanges.diamond
        --Potion ->
        --    config.roomSizeRanges.potion
        --Circular ->
        --    config.roomSizeRanges.circular
        --DiagonalSquares ->
        --    config.roomSizeRanges.diagonalSquares
        --DeadEnd ->
        --    config.roomSizeRanges.deadEnd
    in
        model


button : String -> Model -> Msg -> Html Msg
button txt model msg =
    Button.render Mdl
        [ 0 ]
        model.mdl
        [ Button.colored
        , Button.ripple
        , Button.raised
        , Button.onClick msg
        ]
        [ text txt ]


roomSizeView : Model -> RoomType -> Html Msg
roomSizeView ({ config } as model) roomType =
    let
        ( min, max ) =
            case roomType of
                Rectangular ->
                    config.roomSizeRanges.rectangular

                Cross ->
                    config.roomSizeRanges.cross

                Diamond ->
                    config.roomSizeRanges.diamond

                Potion ->
                    config.roomSizeRanges.potion

                Circular ->
                    config.roomSizeRanges.circular

                DiagonalSquares ->
                    config.roomSizeRanges.diagonalSquares

                DeadEnd ->
                    config.roomSizeRanges.deadEnd
    in
        p [ style [ ( "width", "300px" ) ] ]
            [ h6 [] [ text "Room Size: " ++ (toString min) ++ " to " ++ (toString max) ]
            , Slider.view
                [ Slider.onChange (SliderMsg (Room roomType))
                , Slider.value (toFloat max)
                , Slider.min min
                , Slider.max max
                ]
            ]


mapSizeView : Model -> Html Msg
mapSizeView model =
    p [ style [ ( "width", "300px" ) ] ]
        [ h6 [] [ text "Map Size: ", text (toString model.config.dungeonSize) ]
        , Slider.view
            [ Slider.onChange (SliderMsg Map)
            , Slider.value (toFloat model.config.dungeonSize)
            , Slider.min 10
            , Slider.max 100
            ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ div []
            [ roomSizeView model
            , mapSizeView model
            , button "Generate Dungeon" model GenerateMap
            ]
            |> Material.Scheme.top
        , div []
            (Maps.draw model.map)
        ]
