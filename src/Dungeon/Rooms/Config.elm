module Dungeon.Rooms.Config exposing (..)

{-| This module houses the configuration properties of the dungeon such as dungeon size,
max number of rooms on a floor, all details about the rooms, corridor lengths etc...

The module has no model but rather are mostly a collection of constants used by the
dungeon generator to create random dungeon levels.

-}

import Dice
import Dungeon.Entrance as Entrance exposing (Entrance)
import Dungeon.Rooms.Type exposing (..)
import Html exposing (..)
import Random.Pcg as Random exposing (Generator, constant)
import UI exposing (..)
import Utils.Vector as Vector exposing (Vector)


type alias Config =
    { -- Width and height dimensions of the dungeon level
      dungeonSize : Int
    , roomsConfig : RoomsConfig
    , mapScale : Float
    , maxEntrances : Int
    , corridor : CorridorConfig
    , minRooms : Int
    }


type alias CorridorConfig =
    { minLength : Int
    , maxLength : Int
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
    | MapScale Float


init : Config
init =
    { dungeonSize = 50
    , corridor =
        { minLength = 10
        , maxLength = 20
        }
    , roomsConfig =
        { rectangular = RoomConfig ( 6, 12 ) 1
        , cross = RoomConfig ( 7, 11 ) 0
        , diamond = RoomConfig ( 5, 11 ) 0
        , potion = RoomConfig ( 4, 10 ) 0
        , circular = RoomConfig ( 4, 10 ) 0
        , diagonalSquares = RoomConfig ( 4, 10 ) 0
        , deadEnd = RoomConfig ( 1, 1 ) 0
        }
    , minRooms = 4
    , mapScale = 0.2
    , maxEntrances = 4
    }


maxRoomSize : Config -> MinMax
maxRoomSize { roomsConfig } =
    let
        keepLargest ( x, y ) ( a, b ) =
            ( max x a, max y b )
    in
    [ roomsConfig.rectangular
    , roomsConfig.cross
    , roomsConfig.diamond
    , roomsConfig.potion
    , roomsConfig.circular
    , roomsConfig.diagonalSquares
    , roomsConfig.deadEnd
    ]
        |> List.map .sizeRange
        |> List.foldl keepLargest ( 0, 0 )


update : Msg -> Config -> Config
update msg model =
    let
        _ =
            Debug.log "Config.update" msg
    in
    case msg of
        DungeonSize size ->
            { model | dungeonSize = size }

        RoomSize roomType val ->
            let
                updateSizeRange sizeRange_ config =
                    { config | sizeRange = sizeRange_ }
            in
            { model | roomsConfig = updateRoomsConfig roomType (updateSizeRange val) model.roomsConfig }

        ChangeFrequency roomType freq ->
            let
                updateFrequency freq config =
                    { config | frequency = freq }
            in
            { model | roomsConfig = updateRoomsConfig roomType (updateFrequency freq) model.roomsConfig }

        MapScale scale ->
            { model | mapScale = scale }


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


roomSizeGenerator : Config -> RoomType -> Generator ( Int, Int )
roomSizeGenerator { roomsConfig } roomType =
    let
        sizeGen =
            Random.int minRoomSize maxRoomSize

        ( minRoomSize, maxRoomSize ) =
            sizeRange roomType roomsConfig
    in
    Random.map2 (\x y -> ( x, y )) sizeGen sizeGen


sizeRange : RoomType -> RoomsConfig -> MinMax
sizeRange roomType roomsConfig =
    case roomType of
        Rectangular ->
            roomsConfig.rectangular.sizeRange

        Cross ->
            roomsConfig.cross.sizeRange

        Diamond ->
            roomsConfig.diamond.sizeRange

        Potion ->
            roomsConfig.potion.sizeRange

        Circular ->
            roomsConfig.circular.sizeRange

        DiagonalSquares ->
            roomsConfig.diagonalSquares.sizeRange

        DeadEnd ->
            roomsConfig.deadEnd.sizeRange


roomTypeGenerator : Config -> Generator RoomType
roomTypeGenerator { roomsConfig } =
    Random.frequency
        [ ( toFloat roomsConfig.rectangular.frequency, constant Rectangular )
        , ( toFloat roomsConfig.cross.frequency, constant Cross )
        , ( toFloat roomsConfig.diamond.frequency, constant Diamond )
        , ( toFloat roomsConfig.potion.frequency, constant Potion )
        , ( toFloat roomsConfig.circular.frequency, constant Circular )
        , ( toFloat roomsConfig.diagonalSquares.frequency, constant DiagonalSquares )
        , ( toFloat roomsConfig.deadEnd.frequency, constant DeadEnd )
        ]


wallSampler : List WorldVector -> Generator WorldVector
wallSampler walls =
    case walls of
        [] ->
            constant (World ( 0, 0 ))

        wall :: restOfWalls ->
            Random.sample walls
                |> Random.map (Maybe.withDefault wall)


addEntrances :
    Int
    -> ( List (List WorldVector), List (List WorldVector), List Entrance )
    -> Generator ( List (List WorldVector), List Entrance )
addEntrances nEntrances ( walls, fullWalls, entrances ) =
    let
        createGenerator =
            constant ( walls ++ fullWalls, entrances )
    in
    case ( nEntrances, walls ) of
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

                wallWithoutEntrance entrance =
                    List.filter ((/=) (Entrance.position entrance)) wall

                recurse entrance =
                    addEntrances (n - 1)
                        ( restOfWalls ++ [ wallWithoutEntrance entrance ]
                        , fullWalls
                        , entrance :: entrances
                        )
            in
            wallToEntrance generateWall
                |> Random.andThen recurse


wallToEntrance : Generator WorldVector -> Generator Entrance
wallToEntrance wallGen =
    Random.map (Entrance.init Entrance.Door) wallGen


withinDungeonBounds : WorldVector -> Config -> Bool
withinDungeonBounds (World ( x, y )) { dungeonSize } =
    (x >= 0)
        && (y >= 0)
        && (x <= dungeonSize)
        && (y <= dungeonSize)



-----------
-- Views --
-----------


dungeonSizeView : Config -> Html Msg
dungeonSizeView model =
    div []
        [ UI.labeledNumber "Dungeon size" model.dungeonSize DungeonSize
        , UI.labeledFloat "Map scale" model.mapScale MapScale
        ]


roomsConfigView : Config -> Html Msg
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
        (List.concat <|
            List.map
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
            toString roomType ++ " size: "
    in
    UI.labeled2TupleNumber lbl
        ( min, max )
        (\min_ -> RoomSize roomType ( min_, max ))
        (\max_ -> RoomSize roomType ( min, max_ ))


roomFrequencyView : RoomType -> Int -> Html Msg
roomFrequencyView roomType freq =
    UI.labeledNumber "Freq" freq (ChangeFrequency roomType)
