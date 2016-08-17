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


init : Model
init =
    { dungeonSize = 30
    , roomsConfig =
        { rectangular = RoomConfig ( 4, 10 ) 20
        , cross = RoomConfig ( 7, 11 ) 20
        , diamond = RoomConfig ( 4, 10 ) 20
        , potion = RoomConfig ( 4, 10 ) 20
        , circular = RoomConfig ( 4, 10 ) 20
        , diagonalSquares = RoomConfig ( 4, 10 ) 20
        , deadEnd = RoomConfig ( 1, 1 ) 20
        }
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        DungeonSize size ->
            { model | dungeonSize = size }

        RoomSize roomType val ->
            { model | roomsConfig = updateRoomSizeRange roomType val model.roomsConfig }


updateRoomSizeRange : RoomType -> MinMax -> RoomsConfig -> RoomsConfig
updateRoomSizeRange roomType val roomsConfig =
    let
        newRoomConfig =
            \sizeRange roomConfig -> { roomConfig | sizeRange = sizeRange }
    in
        case roomType of
            Rectangular ->
                { roomsConfig | rectangular = newRoomConfig val roomsConfig.rectangular }

            Cross ->
                { roomsConfig | cross = newRoomConfig val roomsConfig.cross }

            Diamond ->
                { roomsConfig | diamond = newRoomConfig val roomsConfig.diamond }

            Potion ->
                { roomsConfig | potion = newRoomConfig val roomsConfig.potion }

            Circular ->
                { roomsConfig | circular = newRoomConfig val roomsConfig.circular }

            DiagonalSquares ->
                { roomsConfig | diagonalSquares = newRoomConfig val roomsConfig.diagonalSquares }

            DeadEnd ->
                { roomsConfig | deadEnd = newRoomConfig val roomsConfig.deadEnd }


roomSizeGenerator : RoomType -> Model -> Generator Int
roomSizeGenerator roomType model =
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


{-| Given a int between 0 and 100 (will cap if outside of range), will return
    a room type based on the hardcoded distribution of types
-}
roomType : Int -> RoomType
roomType index =
    let
        clampedIndex =
            clamp 0 100 index
    in
        if clampedIndex < 40 then
            Rectangular
        else if clampedIndex < 50 then
            Cross
        else if clampedIndex < 60 then
            Diamond
        else if clampedIndex < 70 then
            Potion
        else if clampedIndex < 80 then
            Circular
        else if clampedIndex < 90 then
            DiagonalSquares
        else
            DeadEnd


roomTypeGenerator : Generator RoomType
roomTypeGenerator =
    Random.map roomType (Random.int 0 100)


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


roomSizesView : Model -> Html Msg
roomSizesView model =
    let
        rooms =
            [ ( Rectangular, model.roomsConfig.rectangular.sizeRange )
            , ( Cross, model.roomsConfig.cross.sizeRange )
            , ( Diamond, model.roomsConfig.diamond.sizeRange )
            , ( Potion, model.roomsConfig.potion.sizeRange )
            , ( Circular, model.roomsConfig.circular.sizeRange )
            , ( DiagonalSquares, model.roomsConfig.diagonalSquares.sizeRange )
            ]
    in
        div [] (List.map (\( roomType, val ) -> roomSizeView roomType val) rooms)


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
