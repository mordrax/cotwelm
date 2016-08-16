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
    , roomSizeRanges : RoomSizeRanges
    }


type alias MinMax =
    ( Int, Int )


type alias RoomSizeRanges =
    { rectangular : MinMax
    , cross : MinMax
    , diamond : MinMax
    , potion : MinMax
    , circular : MinMax
    , diagonalSquares : MinMax
    , deadEnd : MinMax
    }


type Msg
    = DungeonSize Int
    | RoomSize RoomType MinMax


init : Model
init =
    { dungeonSize = 30
    , roomSizeRanges =
        { rectangular = ( 4, 10 )
        , cross = ( 1, 4 )
        , diamond = ( 4, 10 )
        , potion = ( 4, 10 )
        , circular = ( 4, 10 )
        , diagonalSquares = ( 4, 10 )
        , deadEnd = ( 1, 1 )
        }
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        DungeonSize size ->
            { model | dungeonSize = size }

        RoomSize roomType val ->
            { model | roomSizeRanges = updateRoomSizeRanges roomType val model.roomSizeRanges }


updateRoomSizeRanges : RoomType -> MinMax -> RoomSizeRanges -> RoomSizeRanges
updateRoomSizeRanges roomType val ranges =
    case roomType of
        Rectangular ->
            { ranges | rectangular = val }

        Cross ->
            { ranges | cross = val }

        Diamond ->
            { ranges | diamond = val }

        Potion ->
            { ranges | potion = val }

        Circular ->
            { ranges | circular = val }

        DiagonalSquares ->
            { ranges | diagonalSquares = val }

        DeadEnd ->
            { ranges | deadEnd = val }


roomSizeGenerator : RoomType -> Model -> Generator Int
roomSizeGenerator roomType model =
    let
        tupleToGen =
            \( min, max ) -> Random.int min max
    in
        case roomType of
            Rectangular ->
                tupleToGen model.roomSizeRanges.rectangular

            Cross ->
                tupleToGen model.roomSizeRanges.cross

            Diamond ->
                tupleToGen model.roomSizeRanges.diamond

            Potion ->
                tupleToGen model.roomSizeRanges.potion

            Circular ->
                tupleToGen model.roomSizeRanges.circular

            DiagonalSquares ->
                tupleToGen model.roomSizeRanges.diagonalSquares

            DeadEnd ->
                tupleToGen model.roomSizeRanges.deadEnd


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


dungeonSizeView : Model -> Html Msg
dungeonSizeView model =
    UI.labeledNumber "Dungeon size" model.dungeonSize DungeonSize


roomSizesView : Model -> Html Msg
roomSizesView model =
    let
        rooms =
            [ ( Rectangular, model.roomSizeRanges.rectangular )
            , ( Cross, model.roomSizeRanges.cross )
            , ( Diamond, model.roomSizeRanges.diamond )
            , ( Potion, model.roomSizeRanges.potion )
            , ( Circular, model.roomSizeRanges.circular )
            , ( DiagonalSquares, model.roomSizeRanges.diagonalSquares )
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
