module Dungeon.Room exposing (generate, generateDoor)

{-| The room module will generate random rooms given a seed. It uses Config.elm for
    all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and doors. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.
-}

import Dungeon.Rooms.Config as Config exposing (..)
import Random exposing (andThen, Generator)
import Random.Extra exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Lodash exposing (..)


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
    { doors = [ ( Door, ( 0, 0 ) ) ]
    , walls = []
    , floors = []
    , corners = [ ( 0, 0 ) ]
    , roomType = DeadEnd
    , dimension = ( 1, 1 )
    }


generate : Config.Model -> Generator Room
generate model =
    let
        roomTypeToRoom =
            (\roomType -> constant <| Room [] [] [] [] roomType ( 0, 0 ))
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
generateDoor : Room -> Generator ( Room, Door )
generateDoor ({ walls, doors } as room) =
    let
        toReturn ( door, walls ) =
            ( { room | doors = door :: doors, walls = walls }, door )
    in
        generateDoorHelper walls
            |> Random.map toReturn



-- Privates


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


generateDoorHelper : List Walls -> Generator ( Door, List Walls )
generateDoorHelper walls =
    let
        doorPosition walls =
            headOfWalls walls

        makeHeadADoor walls =
            walls
                |> headOfWalls
                |> (\x -> ( ( Door, x ), List.map (without x) walls ))
    in
        shuffle walls
            `andThen` (makeHeadADoor >> constant)


doorsGenerator : Room -> Generator Room
doorsGenerator ({ walls, doors } as room) =
    let
        wallsDoorsGen =
            Config.addDoors 4 ( walls, [], [] )

        room' =
            \( walls, doors ) -> { room | walls = walls, doors = doors }
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
