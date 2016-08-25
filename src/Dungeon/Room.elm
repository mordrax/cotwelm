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



-- Privates


roomSizeGenerator : Config.Model -> Room -> Generator Room
roomSizeGenerator config ({ roomType } as room) =
    Config.roomSizeGenerator roomType config
        `andThen` (\roomSize -> constant { room | dimension = ( roomSize, roomSize ) })


shuffleWalls : Room -> Generator Room
shuffleWalls ({ walls } as room) =
    let
        room' =
            \walls -> { room | walls = walls }
    in
        Random.map room' (shuffle room.walls)


generateDoor : Room -> Generator Room
generateDoor ({ walls, doors } as room) =
    let
        headOfWalls walls =
            walls
                |> List.concat
                |> List.head
                |> Maybe.withDefault ( 0, 0 )

        doorGenerator =
            shuffle walls
                `andThen` (headOfWalls >> constant)

        wallsWithoutDoor doorPos =
            let
                _ =
                    Debug.log "wallsWithoutDoor" { doorpos = doorPos, walls = walls }
            in
                List.map (without doorPos) walls

        wallsGenerator =
            doorGenerator
                `andThen` (wallsWithoutDoor >> constant)

        mapToRoom doorPos walls =
            { room | doors = ( Door, doorPos ) :: doors, walls = walls }
    in
        Random.map2 mapToRoom doorGenerator wallsGenerator


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
