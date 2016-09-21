module Dungeon.Room exposing (..)

{-| The room module will generate random rooms given a seed. It uses Config.elm for
    all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and entrances. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.
-}

--    exposing
--        ( Room
--        , Rooms
--        , generate
--        , generateEntrance
--        , toTiles
--        , entranceFacing
--        , entrances
--        , isPositionWithinRoom
--        , placeRoom
--        )

import Dungeon.Rooms.Config as Config exposing (..)
import Random exposing (andThen, Generator)
import Random.Extra exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Lodash exposing (..)
import Tile exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Utils.Vector as Vector exposing (..)
import Dice exposing (..)
import List exposing (..)
import Dungeon.Corridor exposing (..)
import Utils.CompassDirection exposing (..)


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
    , corners : Corners
    , roomType : RoomType
    , dimension : Dimension
    , worldPos : Vector
    }


type alias Corners =
    Vectors


type Room
    = A Model


type alias Rooms =
    List Room


init : Room
init =
    A
        { entrances = []
        , walls = []
        , floors = []
        , corners = [ ( 0, 0 ) ]
        , roomType = DeadEnd
        , dimension = ( 1, 1 )
        , worldPos = Vector.zero
        }


new : Entrances -> List Walls -> Floors -> Corners -> RoomType -> Dimension -> Vector -> Room
new entrances walls floors corners roomType dimension worldPos =
    A
        { entrances = entrances
        , walls = walls
        , floors = floors
        , corners = corners
        , roomType = roomType
        , dimension = dimension
        , worldPos = worldPos
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
            `andThen` positionGenerator config
            `andThen` wallsGenerator
            `andThen` floorsGenerator
            `andThen` cornersGenerator
            `andThen` toRoomGenerator


{-| Add a door to the room using one of the room's remaining walls.
It also reports the door that just got added)
-}
generateEntrance : Room -> Generator ( Room, Entrance )
generateEntrance (A ({ walls, entrances, worldPos } as model)) =
    let
        toReturn ( entrance, walls ) =
            ( A { model | entrances = entrance :: entrances, walls = walls }
            , entrance
            )
    in
        walls
            |> generateEntranceHelper worldPos
            |> Random.map toReturn


toTiles : Room -> Tiles
toTiles (A { floors, walls, entrances, corners, worldPos }) =
    let
        --        _ =
        --            Debug.log "Room.toTiles" entrances
        toWorldPos localPos =
            Vector.add worldPos localPos

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
        List.map Entrance.toTile entrances
            ++ List.concat (List.map makeTiles roomTileTypes)


entrances : Room -> Entrances
entrances (A { entrances }) =
    entrances


entranceFacing : Room -> Entrance -> Vector
entranceFacing (A { walls, floors, worldPos }) entrance =
    let
        entrancePos =
            entrance
                |> Entrance.position
                |> flip Vector.sub worldPos

        north =
            ( 0, 1 )

        east =
            ( 1, 0 )

        south =
            ( 0, -1 )

        west =
            ( -1, 0 )
    in
        if List.member (Vector.add entrancePos north) floors then
            south
        else if List.member (Vector.add entrancePos south) floors then
            north
        else if List.member (Vector.add entrancePos east) floors then
            west
        else if List.member (Vector.add entrancePos west) floors then
            east
        else
            north


placeRoom : CorridorEnding -> Room -> Generator Room
placeRoom ( corridor, endPoint, facing ) (A ({ walls, dimension } as model)) =
    let
        wallFacing =
            facing
                |> Vector.fromCompass
                |> Vector.scale -1
                |> Vector.toDirection

        candidateWalls =
            wallsFacingDirection wallFacing (List.concat walls) dimension

        pickAWall walls =
            walls
                |> shuffle
                |> Random.map (headWithDefault ( 0, 0 ))

        makeADoor wall =
            let
                entrancePosition =
                    Vector.sub endPoint (Vector.fromCompass wallFacing)

                entrance =
                    Entrance.init Door entrancePosition

                roomWorldPosition =
                    Vector.sub entrancePosition wall

                _ =
                    Debug.log "Room.placeRoom"
                        { entrancePosition = entrancePosition
                        , wall = wall
                        , roomWorldPosition = roomWorldPosition
                        , endPoint = endPoint
                        , facing = facing
                        , dim = dimension
                        }
            in
                constant
                    <| A
                        { model
                            | walls = List.map (without wall) walls
                            , entrances = [ entrance ]
                            , worldPos = roomWorldPosition
                        }
    in
        pickAWall candidateWalls `andThen` makeADoor


wallsFacingDirection : CompassDirection -> Walls -> Dimension -> Walls
wallsFacingDirection compassDirection walls ( maxX, maxY ) =
    let
        yEqualsZero ( _, y ) =
            y == 0

        yEqualsMaxY ( _, y ) =
            y == maxY - 1

        xEqualsZero ( x, _ ) =
            x == 0

        xEqualsMaxX ( x, _ ) =
            x == maxX - 1
    in
        case compassDirection of
            N ->
                List.filter yEqualsMaxY walls

            E ->
                List.filter xEqualsMaxX walls

            S ->
                List.filter yEqualsZero walls

            W ->
                List.filter xEqualsZero walls

            _ ->
                []


isPositionWithinRoom : Room -> Vector -> Bool
isPositionWithinRoom (A { entrances, walls, floors, corners }) position =
    let
        isPositionAEntrance =
            entrances
                |> List.map Entrance.position
                |> List.any (\x -> x == position)

        isPositionAWallFloorOrCorner =
            (List.concat walls)
                ++ floors
                ++ corners
                |> List.any (\x -> x == position)
    in
        isPositionAEntrance || isPositionAWallFloorOrCorner



-- Privates


roomTypeGenerator : Config.Model -> Model -> Generator Model
roomTypeGenerator config model =
    Config.roomTypeGenerator config
        `andThen` (\roomType' -> constant { model | roomType = roomType' })


positionGenerator : Config.Model -> Model -> Generator Model
positionGenerator { dungeonSize } model =
    (Dice.d2d dungeonSize dungeonSize)
        `andThen` (\worldPos' -> constant { model | worldPos = worldPos' })


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


generateEntranceHelper : Vector -> List Walls -> Generator ( Entrance, List Walls )
generateEntranceHelper topLeft walls =
    let
        newEntrance pos =
            Entrance.init Door (Vector.add pos topLeft)

        makeHeadADoor walls =
            walls
                |> headOfWalls
                |> \x ->
                    ( newEntrance x, List.map (without x) walls )
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
