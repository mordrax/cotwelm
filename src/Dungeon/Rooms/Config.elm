module Dungeon.Rooms.Config exposing (..)

{-| This module houses the configuration properties of the dungeon such as dungeon size,
max number of rooms on a floor, all details about the rooms, corridor lengths etc...

The module has no model but rather are mostly a collection of constants used by the
dungeon generator to create random dungeon levels.
-}

import UI exposing (..)
import Array exposing (..)
import Random exposing (..)
import Random.Array exposing (..)
import Random.Extra exposing (..)
import Dungeon.Rooms.Type exposing (..)


-- html

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)


type alias Model =
    { -- Width and height dimensions of the dungeon level
      dungeonSize : Int
    , roomsConfig : RoomsConfig
    }


type alias RoomsConfig =
    { rectangular : RoomConfig
    , cross : RoomConfig
    , diamond : RoomConfig
    , potion : RoomConfig
    , circular : RoomConfig
    , diagonalSquares : RoomConfig
    , deadEnd : RoomConfig
    }


type alias RoomConfig =
    { sizeRange : MinMax
    , frequency : Int
    }


type alias MinMax =
    ( Int, Int )


type Msg
    = DungeonSize Int
    | RoomSize RoomType MinMax
    | ChangeFrequency RoomType Int


init : Model
init =
    { dungeonSize = 30
    , roomsConfig =
        { rectangular = RoomConfig ( 4, 10 ) 0
        , cross = RoomConfig ( 7, 11 ) 0
        , diamond = RoomConfig ( 4, 10 ) 1
        , potion = RoomConfig ( 4, 10 ) 0
        , circular = RoomConfig ( 4, 10 ) 0
        , diagonalSquares = RoomConfig ( 4, 10 ) 0
        , deadEnd = RoomConfig ( 1, 1 ) 0
        }
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        DungeonSize size ->
            { model | dungeonSize = size }

        RoomSize roomType val ->
            let
                updateSizeRange =
                    (\sizeRange' config -> { config | sizeRange = sizeRange' })
            in
                { model | roomsConfig = updateRoomsConfig roomType (updateSizeRange val) model.roomsConfig }

        ChangeFrequency roomType freq ->
            let
                updateFrequency =
                    (\freq config -> { config | frequency = freq })
            in
                { model | roomsConfig = updateRoomsConfig roomType (updateFrequency freq) model.roomsConfig }


updateRoomsConfig : RoomType -> (RoomConfig -> RoomConfig) -> RoomsConfig -> RoomsConfig
updateRoomsConfig roomType updater roomsConfig =
    case roomType of
        Rectangular ->
            { roomsConfig | rectangular = updater roomsConfig.rectangular }

        Cross ->
            { roomsConfig | cross = updater roomsConfig.cross }

        Diamond ->
            { roomsConfig | diamond = updater roomsConfig.diamond }

        Potion ->
            { roomsConfig | potion = updater roomsConfig.potion }

        Circular ->
            { roomsConfig | circular = updater roomsConfig.circular }

        DiagonalSquares ->
            { roomsConfig | diagonalSquares = updater roomsConfig.diagonalSquares }

        DeadEnd ->
            { roomsConfig | deadEnd = updater roomsConfig.deadEnd }


roomSizeGenerator : RoomType -> Model -> Generator Int
roomSizeGenerator roomType ({ roomsConfig } as model) =
    let
        tupleToGen =
            \( min, max ) -> Random.int min max
    in
        case roomType of
            Rectangular ->
                tupleToGen model.roomsConfig.rectangular.sizeRange

            Cross ->
                tupleToGen model.roomsConfig.cross.sizeRange

            Diamond ->
                tupleToGen model.roomsConfig.diamond.sizeRange

            Potion ->
                tupleToGen model.roomsConfig.potion.sizeRange

            Circular ->
                tupleToGen model.roomsConfig.circular.sizeRange

            DiagonalSquares ->
                tupleToGen model.roomsConfig.diagonalSquares.sizeRange

            DeadEnd ->
                tupleToGen model.roomsConfig.deadEnd.sizeRange


roomTypeGenerator : Model -> Generator RoomType
roomTypeGenerator { roomsConfig } =
    Random.Extra.frequency
        [ ( toFloat roomsConfig.rectangular.frequency, constant Rectangular )
        , ( toFloat roomsConfig.cross.frequency, constant Cross )
        , ( toFloat roomsConfig.diamond.frequency, constant Diamond )
        , ( toFloat roomsConfig.potion.frequency, constant Potion )
        , ( toFloat roomsConfig.circular.frequency, constant Circular )
        , ( toFloat roomsConfig.diagonalSquares.frequency, constant DiagonalSquares )
        , ( toFloat roomsConfig.deadEnd.frequency, constant DeadEnd )
        ]


wallSampler : Walls -> Generator Wall
wallSampler walls =
    case walls of
        [] ->
            constant ( 0, 0 )

        wall :: restOfWalls ->
            Random.Extra.sample walls
                |> Random.map (Maybe.withDefault wall)


without : Wall -> Walls -> Walls
without wall walls =
    List.filter (\x -> x /= wall) walls


addDoors :
    Int
    -> ( List Walls, List Walls, List Door )
    -> Generator ( List Walls, List Door )
addDoors nDoors ( walls, fullWalls, doors ) =
    let
        createGenerator =
            constant ( walls ++ fullWalls, doors )
    in
        case ( nDoors, walls ) of
            ( 0, _ ) ->
                createGenerator

            ( _, [] ) ->
                createGenerator

            ( _, [] :: restOfWalls ) ->
                createGenerator

            ( n, wall :: restOfWalls ) ->
                let
                    generateWall =
                        wallSampler wall

                    wallWithoutDoor =
                        flip without wall

                    recurse =
                        \(( _, pos ) as door) ->
                            addDoors (n - 1)
                                ( restOfWalls ++ [ wallWithoutDoor pos ]
                                , fullWalls
                                , door :: doors
                                )
                in
                    (wallToDoor generateWall)
                        `andThen` recurse


wallToDoor : Generator Wall -> Generator Door
wallToDoor wallGen =
    Random.map (\pos -> ( Door, pos )) wallGen


shuffle : List a -> Generator (List a)
shuffle list =
    list
        |> Array.fromList
        |> Random.Array.shuffle
        |> Random.map Array.toList



-----------
-- Views --
-----------


dungeonSizeView : Model -> Html Msg
dungeonSizeView model =
    UI.labeledNumber "Dungeon size" model.dungeonSize DungeonSize


roomsConfigView : Model -> Html Msg
roomsConfigView model =
    let
        rooms =
            [ ( Rectangular, model.roomsConfig.rectangular )
            , ( Cross, model.roomsConfig.cross )
            , ( Diamond, model.roomsConfig.diamond )
            , ( Potion, model.roomsConfig.potion )
            , ( Circular, model.roomsConfig.circular )
            , ( DiagonalSquares, model.roomsConfig.diagonalSquares )
            ]
    in
        div []
            (List.concat
                <| List.map
                    (\( roomType, config ) ->
                        [ roomSizeView roomType config.sizeRange
                        , roomFrequencyView roomType config.frequency
                        ]
                    )
                    rooms
            )


roomSizeView : RoomType -> MinMax -> Html Msg
roomSizeView roomType ( min, max ) =
    let
        lbl =
            (toString roomType) ++ " size: "
    in
        UI.labeled2TupleNumber lbl
            ( min, max )
            (\min' -> RoomSize roomType ( min', max ))
            (\max' -> RoomSize roomType ( min, max' ))


roomFrequencyView : RoomType -> Int -> Html Msg
roomFrequencyView roomType freq =
    UI.labeledNumber "Freq" freq (ChangeFrequency roomType)
