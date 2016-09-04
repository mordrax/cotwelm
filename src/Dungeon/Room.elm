module Dungeon.Room
    exposing
        ( Room
        , Rooms
        , generate
        , generateEntrance
        , toTiles
        , entrances
        , unconnectedEntrances
        )

{-| The room module will generate random rooms given a seed. It uses Config.elm for
    all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and entrances. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.
-}

import Dungeon.Rooms.Config as Config exposing (..)
import Random exposing (andThen, Generator)
import Random.Extra exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Lodash exposing (..)
import Tile exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Utils.Vector as Vector exposing (..)
import Dice exposing (..)


-- room types

import Dungeon.Rooms.Rectangular as Rectangular exposing (..)
import Dungeon.Rooms.Cross as Cross exposing (..)
import Dungeon.Rooms.Diamond as Diamond exposing (..)
import Dungeon.Rooms.Potion as Potion exposing (..)
import Dungeon.Rooms.Circular as Circular exposing (..)
import Dungeon.Rooms.DiagonalSquares as DiagonalSquares exposing (..)
import Dungeon.Rooms.DeadEnd as DeadEnd exposing (..)


type alias Model =
    { entrances : Entrances
    , walls : List Walls
    , floors : Floors
    , corners : Walls
    , roomType : RoomType
    , dimension : Dimension
    , position : Vector
    }


type Room
    = A Model


type alias Rooms =
    List Room


init : Room
init =
    A
        { entrances = [ Entrance.init Door Vector.zero ]
        , walls = []
        , floors = []
        , corners = [ ( 0, 0 ) ]
        , roomType = DeadEnd
        , dimension = ( 1, 1 )
        , position = Vector.zero
        }


generate : Config.Model -> Generator Room
generate config =
    let
        (A model) =
            init

        toRoomGenerator model =
            constant (A model)
    in
        roomTypeGenerator config model
            `andThen` roomSizeGenerator config
            `andThen` wallsGenerator
            `andThen` floorsGenerator
            `andThen` cornersGenerator
            `andThen` toRoomGenerator


{-| Add a door to the room using one of the room's remaining walls.
It also reports the door that just got added)
-}
generateEntrance : Room -> Generator ( Room, Entrance )
generateEntrance (A ({ walls, entrances } as model)) =
    let
        toReturn ( door, walls ) =
            ( A { model | entrances = door :: entrances, walls = walls }, door )
    in
        walls
            |> generateEntranceHelper
            |> Random.map toReturn


toTiles : Room -> Tiles
toTiles (A { floors, walls, entrances, corners, position }) =
    let
        toWorldPos localPos =
            Vector.add position localPos

        roomTileTypes =
            [ ( Tile.DarkDgn, floors )
            , ( Tile.Rock, List.concat walls )
            , ( Tile.Rock, corners )
            ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map toWorldPos
                |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles roomTileTypes)
            ++ List.map Entrance.toTile entrances


entrances : Room -> Entrances
entrances (A { entrances }) =
    entrances


unconnectedEntrances : Room -> Entrances
unconnectedEntrances (A { entrances }) =
    entrances



-- Privates


roomTypeGenerator : Config.Model -> Model -> Generator Model
roomTypeGenerator config model =
    Config.roomTypeGenerator config
        `andThen` (\roomType' -> constant { model | roomType = roomType' })


positionGenerator : Config.Model -> Model -> Generator Model
positionGenerator { dungeonSize } model =
    (Dice.d2d dungeonSize dungeonSize)
        `andThen` (\position' -> constant { model | position = position' })


roomSizeGenerator : Config.Model -> Model -> Generator Model
roomSizeGenerator config ({ roomType } as model) =
    Config.roomSizeGenerator roomType config
        `andThen` (\roomSize -> constant { model | dimension = ( roomSize, roomSize ) })


headOfWalls : List Walls -> Wall
headOfWalls walls =
    walls
        |> List.concat
        |> List.head
        |> Maybe.withDefault ( 0, 0 )


generateEntranceHelper : List Walls -> Generator ( Entrance, List Walls )
generateEntranceHelper walls =
    let
        doorPosition walls =
            headOfWalls walls

        makeHeadADoor walls =
            walls
                |> headOfWalls
                |> (\x -> ( Entrance.init Door x, List.map (without x) walls ))
    in
        shuffle walls
            `andThen` (makeHeadADoor >> constant)


doorsGenerator : Model -> Generator Model
doorsGenerator ({ walls, entrances } as model) =
    let
        wallsDoorsGen =
            Config.addEntrances 4 ( walls, [], [] )

        model' =
            \( walls, entrances ) -> { model | walls = walls, entrances = entrances }
    in
        Random.map model' wallsDoorsGen


wallsGenerator : Model -> Generator Model
wallsGenerator ({ roomType, dimension } as model) =
    let
        makeWalls =
            (templates roomType).makeWalls
    in
        constant { model | walls = makeWalls dimension }


floorsGenerator : Model -> Generator Model
floorsGenerator ({ roomType, dimension } as model) =
    let
        makeFloors =
            (templates roomType).makeFloors
    in
        constant { model | floors = makeFloors dimension }


cornersGenerator : Model -> Generator Model
cornersGenerator ({ roomType, dimension } as model) =
    let
        makeCorners =
            (templates roomType).makeCorners
    in
        constant { model | corners = makeCorners dimension }


templates : RoomType -> RoomTemplate
templates roomType =
    case roomType of
        Rectangular ->
            Rectangular.template

        Cross ->
            Cross.template

        Diamond ->
            Diamond.template

        Potion ->
            Potion.template

        Circular ->
            Circular.template

        DiagonalSquares ->
            DiagonalSquares.template

        DeadEnd ->
            DeadEnd.template
