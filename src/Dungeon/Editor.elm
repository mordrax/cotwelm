module Dungeon.Editor exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)
import Game.Maps as Maps exposing (..)
import UI exposing (..)


-- Dungeon

import Dungeon.Room as Room exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Cross as Cross exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.DungeonGenerator as DungeonGenerator exposing (..)


-- libs

import Dict exposing (..)
import Random exposing (..)
import String exposing (..)


type alias Model =
    { map : Map
    , config : Config.Model
    }


type Msg
    = GenerateMap
    | GenerateRoom Room
    | SliderMsg String
    | ConfigMsg Config.Msg


init : Model
init =
    { map = Dict.empty
    , config = Config.init
    }


toIntWithDefault : String -> Int -> Int
toIntWithDefault str default =
    Result.withDefault default (String.toInt str)


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

        SliderMsg newSliderValue ->
            ( model, Cmd.none )

        ConfigMsg msg ->
            ( { model | config = Config.update msg model.config }, Cmd.none )



--( { model | config = Config.update (Config.DungeonSize (toInt newSliderValue)) model.config }, Cmd.none )


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

                _ ->
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



--roomSizeView : Model -> RoomType -> Html Msg
--roomSizeView ({ config } as model) roomType =
--    let
--        ( min, max ) =
--            case roomType of
--                Rectangular ->
--                    config.roomSizeRanges.rectangular
--                Cross ->
--                    config.roomSizeRanges.cross
--                Diamond ->
--                    config.roomSizeRanges.diamond
--                Potion ->
--                    config.roomSizeRanges.potion
--                Circular ->
--                    config.roomSizeRanges.circular
--                DiagonalSquares ->
--                    config.roomSizeRanges.diagonalSquares
--                DeadEnd ->
--                    config.roomSizeRanges.deadEnd
--    in
--        p [ style [ ( "width", "300px" ) ] ]
--            [ h6 [] [ text "Room Size: " ++ (toString min) ++ " to " ++ (toString max) ]
--              --, Slider.view
--              --    [ Slider.onChange (SliderMsg (Room roomType))
--              --    , Slider.value (toFloat max)
--              --    , Slider.min min
--              --    , Slider.max max
--              --    ]
--            ]


view : Model -> Html Msg
view model =
    div []
        [ div []
            [ --roomSizeView model,
              mapSizeView model
            , button [ class "ui button", onClick GenerateMap ] [ text "Generate Dungeon" ]
            ]
        , div []
            (Maps.draw model.map)
        ]
