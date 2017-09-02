module Dungeon.Room
    exposing
        ( Room
        , faceOff
        , facesPoint
        , generate
        , hit
        , makeDoor
        , overlap
        )

{-| The room module will generate random rooms given a seed. It uses Config.elm for
all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and entrances. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.

-}

import Dice
import Dict exposing (Dict)
import Dungeon.Entrance as Entrance exposing (Entrance)
import Dungeon.Rooms.Circular as Circular
import Dungeon.Rooms.Config as Config
import Dungeon.Rooms.Cross as Cross
import Dungeon.Rooms.DeadEnd as DeadEnd
import Dungeon.Rooms.DiagonalSquares as DiagonalSquares
import Dungeon.Rooms.Diamond as Diamond
import Dungeon.Rooms.Potion as Potion
import Dungeon.Rooms.Rectangular as Rectangular
import Dungeon.Rooms.Type exposing (..)
import EveryDict exposing (EveryDict)
import List
import Random.Pcg as Random exposing (Generator, andThen, constant)
import Set exposing (Set)
import Tile exposing (Tile)
import Tile.Types
import Types exposing (..)
import Utils.Direction as Direction exposing (..)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (DirectedVector, Vector)


type alias Room =
    { entrances : List Entrance
    , floors : List Vector
    , roomType : RoomType
    , dimension : Dimension
    , worldPos : Vector
    , lightSource : LightSource
    , walls : List Vector
    , candidateEntrancesByDirection : EveryDict Direction (List DirectedVector)
    , corners : List Vector
    , tiles : Dict Vector Tile
    }


addToDictOfList : key -> value -> EveryDict key (List value) -> EveryDict key (List value)
addToDictOfList key value dict =
    EveryDict.get key dict
        |> Maybe.withDefault []
        |> (::) value
        |> (\v -> EveryDict.insert key v dict)


new : RoomType -> Dimension -> LightSource -> Vector -> Room
new roomType (( width, height ) as dimension) lightSource (( minX, minY ) as roomPosition) =
    let
        floors =
            calculateFloors roomType dimension
                |> toWorldVectors roomPosition

        walls =
            adjacent floors

        -- walls that are not diagonal to floors are candidates for entrances
        entranceWalls =
            cardinallyAdjacent floors

        maxX =
            minX + width - 1

        maxY =
            minY + height - 1

        candidateEntrancesByDirection =
            [ ( N, List.filter (\( x, y ) -> y == maxY) entranceWalls |> List.map (Vector.toDirected N) )
            , ( S, List.filter (\( x, y ) -> y == minY) entranceWalls |> List.map (Vector.toDirected S) )
            , ( E, List.filter (\( x, y ) -> x == maxX) entranceWalls |> List.map (Vector.toDirected E) )
            , ( W, List.filter (\( x, y ) -> x == minX) entranceWalls |> List.map (Vector.toDirected W) )
            ]
                |> EveryDict.fromList

        corners =
            [ roomPosition
            , Vector.add roomPosition ( width, 0 )
            , Vector.add roomPosition ( 0, height )
            , Vector.add roomPosition dimension
            ]

        floorType =
            case lightSource of
                Dark ->
                    Tile.Types.DarkDgn

                _ ->
                    Tile.Types.LitDgn

        addFloorTile : Vector -> Dict Vector Tile -> Dict Vector Tile
        addFloorTile (tileVector as tileWorldVector) dict =
            Dict.insert tileWorldVector (Tile.toTile tileVector floorType) dict

        addWallTile (tileVector as tileWorldVector) dict =
            Dict.insert tileWorldVector (Tile.toTile tileVector Tile.Types.Rock) dict

        tiles =
            List.foldl addFloorTile Dict.empty floors
                |> (\dict -> List.foldl addWallTile dict walls)
    in
    { entrances = []
    , floors = floors
    , roomType = roomType
    , dimension = dimension
    , worldPos = roomPosition
    , lightSource = lightSource
    , walls = walls
    , candidateEntrancesByDirection = candidateEntrancesByDirection
    , corners = corners
    , tiles = tiles
    }


newDeadEnd : Vector -> Room
newDeadEnd roomPosition =
    new DeadEnd ( 1, 1 ) Artificial roomPosition
        |> setEntrances [ Entrance.init Entrance.Door roomPosition ]


{-| Generates a room with a config
-}
generate : Config.Config -> Generator Room
generate config =
    Config.roomTypeGenerator config
        |> Random.andThen
            (\roomType ->
                Random.map3
                    (new roomType)
                    (Config.roomSizeGenerator config roomType)
                    lightSourceGenerator
                    (positionGenerator config)
            )


makeDoor : Room -> Vector -> Room
makeDoor room position =
    case List.member position room.walls of
        False ->
            room

        True ->
            { room
                | entrances = Entrance.init Entrance.Door position :: room.entrances
                , walls = List.filter ((/=) position) room.walls
                , candidateEntrancesByDirection =
                    room.candidateEntrancesByDirection
                        |> EveryDict.values
                        |> List.concat
                        |> List.filter (Tuple.first >> (/=) position)
                        |> List.foldl (\( vector, direction ) dict -> addToDictOfList direction ( vector, direction ) dict) EveryDict.empty
                , tiles = Dict.insert position (Tile.toTile position Tile.Types.DoorClosed) room.tiles
            }



--  +---+
--+-------+
--| |   | |
--+-------+
--  |   |
--  +---+
-- Fig 1, Two rooms who's corners are not inside the other room but still overlaps


{-| Checks if two rooms overlap in any way. A room overlaps if any of either room's
corners is inside the other room.

This failed to catch the configuration in Fig.1 above, so we also check if either
of the centres is within the other.

-}
overlap : Room -> Room -> Bool
overlap a b =
    List.any (\cornerOfB -> hit cornerOfB a) b.corners
        || List.any (\cornerOfA -> hit cornerOfA b) a.corners
        || hit (centre a) b
        || hit (centre b) a


{-| True if the world position is within the room
-}
hit : Vector -> Room -> Bool
hit v room =
    Vector.boxIntersectVector v (vectorBox room)


{-| Given a point in the world and a room, work out which faces of the room can reach that
point with a corridor.
Remember that corridors must only have one bend and travel in 45/90 degree angles other than
straight.
If the point is in the room, return nothing.
-}
facesPoint : Vector -> Room -> List Direction
facesPoint (( x, y ) as point) ({ worldPos, dimension } as room) =
    let
        ( minX, minY ) =
            worldPos

        ( maxX, maxY ) =
            Vector.add ( minX, minY ) dimension
    in
    [ ( x < minX, W )
    , ( x > maxX, E )
    , ( y < minY, S )
    , ( y > maxY, N )
    , ( x < minX && y < minY, SW )
    , ( x < minX && y > maxY, NW )
    , ( x > maxX && y < minY, SE )
    , ( x > maxX && y > maxY, NE )
    ]
        |> List.filter Tuple.first
        |> List.map Tuple.second


faceOff : Room -> Room -> ( List Direction, List Direction )
faceOff a b =
    ( facesPoint (centre b) a, facesPoint (centre a) b )



-- Privates


lightSourceGenerator : Generator LightSource
lightSourceGenerator =
    Random.sample [ Artificial, Artificial, Artificial, Artificial, Dark ]
        |> Random.map (Maybe.withDefault Artificial)


positionGenerator : Config.Config -> Generator Vector
positionGenerator ({ dungeonSize } as config) =
    let
        ( dimX, dimY ) =
            Config.maxRoomSize config

        ( maxX, maxY ) =
            ( dungeonSize - dimX, dungeonSize - dimY )
                |> Vector.map (max 0)
    in
    Dice.d2d maxX maxY


{-| Given a room type and the dimensions of the room, will return a list of all floor tiles
in local coordinates.
-}
calculateFloors : RoomType -> Dimension -> List LocalVector
calculateFloors roomType dimension =
    (templates roomType).makeFloors dimension


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



-------------
-- Helpers --
-------------


type alias BottomLeft =
    Vector


type alias TopRight =
    Vector


vectorBox : Room -> ( BottomLeft, TopRight )
vectorBox { worldPos, dimension } =
    worldPos
        |> (\topLeft -> ( topLeft, Vector.add topLeft dimension ))


centre : Room -> Vector
centre { worldPos, dimension } =
    let
        halfDimension =
            Vector.scale 0.5 dimension
    in
    Vector.add worldPos halfDimension


{-| Given a list of vectors, will get all unique vectors adjacent to them.
Used to generate wrap around walls from floors.
-}
adjacent : List Vector -> List Vector
adjacent =
    adjacent_ Vector.neighbours


{-| Given a list of vectors, will get all unique vectors that's adjacent
in any of the cardinal (N, E, S, W) directions.
Used to generate walls which are candiate for doors. It would look strange
to have a door be on the corner of a room.
-}
cardinallyAdjacent : List Vector -> List Vector
cardinallyAdjacent =
    adjacent_ Vector.cardinalNeighbours


adjacent_ : (Vector -> List Vector) -> List Vector -> List Vector
adjacent_ adjacencyFn startingVectors =
    let
        lessStartingVectors set =
            Set.diff set (Set.fromList startingVectors)
    in
    startingVectors
        |> List.map adjacencyFn
        |> List.concat
        |> Set.fromList
        |> lessStartingVectors
        |> Set.toList



-------------
-- Setters --
-------------


setEntrances : List Entrance -> Room -> Room
setEntrances val room =
    { room | entrances = val }


setFloors : List Vector -> Room -> Room
setFloors val room =
    { room | floors = val }


setRoomType : RoomType -> Room -> Room
setRoomType val room =
    { room | roomType = val }


setDimension : Dimension -> Room -> Room
setDimension val room =
    { room | dimension = val }


setWorldPos : Vector -> Room -> Room
setWorldPos val room =
    { room | worldPos = val }


setLightSource : LightSource -> Room -> Room
setLightSource val room =
    { room | lightSource = val }
