module Dungeon.Editor exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)
import Html.App exposing (map)
import Game.Maps as Maps exposing (..)


--import UI exposing (..)
-- Dungeon
--import Dungeon.Room as Room exposing (..)

import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Room as Room exposing (..)
import Dungeon.DungeonGenerator as DungeonGenerator exposing (..)


-- libs

import Dict exposing (..)
import Random exposing (..)
import String exposing (..)


type alias Model =
    { map : Maps.Map
    , config : Config.Model
    }


type Msg
    = GenerateMap
    | Dungeon Maps.Map
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
            ( model, Random.generate Dungeon (DungeonGenerator.generate model.config) )

        Dungeon map ->
            ( { model | map = map }, Cmd.none )

        ConfigMsg msg ->
            ( { model | config = Config.update msg model.config }, Cmd.none )



--( { model | config = Config.update (Config.DungeonSize (toInt newSliderValue)) model.config }, Cmd.none )
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
    let
        border =
            ( "border", "1px solid black" )
    in
        div []
            [ div []
                [ --roomSizeView model,
                  button [ class "ui button", onClick GenerateMap ] [ text "Generate Dungeon" ]
                , mapSizeView model
                ]
            , div []
                (Maps.draw model.map model.config.mapScale)
            ]


mapSizeView : Model -> Html Msg
mapSizeView model =
    p [ style [ ( "width", "300px" ) ] ]
        [ Html.App.map ConfigMsg (Config.dungeonSizeView model.config)
        , Html.App.map ConfigMsg (Config.roomsConfigView model.config)
        ]
