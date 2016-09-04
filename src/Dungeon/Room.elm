module Dungeon.Room
    exposing
        ( generate
        , generateEntrance
        , toTiles
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


init : Room
init =
    { entrances = [ Entrance.init Door Vector.zero ]
    , walls = []
    , floors = []
    , corners = [ ( 0, 0 ) ]
    , roomType = DeadEnd
    , dimension = ( 1, 1 )
    , position = Vector.zero
    }


generate : Config.Model -> Generator Room
generate model =
    let
        roomTypeToRoom roomType =
            constant { init | roomType = roomType }
    in
        Config.roomTypeGenerator model
            `andThen` roomTypeToRoom
            `andThen` roomSizeGenerator model
            `andThen` wallsGenerator
            `andThen` floorsGenerator
            `andThen` cornersGenerator


{-| Add a door to the room using one of the room's remaining walls.
It also reports the door that just got added)
-}
generateEntrance : Room -> Generator ( Room, Entrance )
generateEntrance ({ walls, entrances } as room) =
    let
        toReturn ( door, walls ) =
            ( { room | entrances = door :: entrances, walls = walls }, door )
    in
        walls
            |> generateEntranceHelper
            |> Random.map toReturn


toTiles : Room -> Tiles
toTiles { floors, walls, entrances, corners, position } =
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



-- Privates


positionGenerator : Config.Model -> Room -> Generator Room
positionGenerator { dungeonSize } room =
    (Dice.d2d dungeonSize dungeonSize)
        `andThen` (\position' -> constant { room | position = position' })


roomSizeGenerator : Config.Model -> Room -> Generator Room
roomSizeGenerator config ({ roomType } as room) =
    Config.roomSizeGenerator roomType config
        `andThen` (\roomSize -> constant { room | dimension = ( roomSize, roomSize ) })


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


doorsGenerator : Room -> Generator Room
doorsGenerator ({ walls, entrances } as room) =
    let
        wallsDoorsGen =
            Config.addEntrances 4 ( walls, [], [] )

        room' =
            \( walls, entrances ) -> { room | walls = walls, entrances = entrances }
    in
        Random.map room' wallsDoorsGen


wallsGenerator : Room -> Generator Room
wallsGenerator ({ roomType, dimension } as room) =
    let
        makeWalls =
            (templates roomType).makeWalls
    in
        constant { room | walls = makeWalls dimension }


floorsGenerator : Room -> Generator Room
floorsGenerator ({ roomType, dimension } as room) =
    let
        makeFloors =
            (templates roomType).makeFloors
    in
        constant { room | floors = makeFloors dimension }


cornersGenerator : Room -> Generator Room
cornersGenerator ({ roomType, dimension } as room) =
    let
        makeCorners =
            (templates roomType).makeCorners
    in
        constant { room | corners = makeCorners dimension }


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
