module Dungeon.Room
    exposing
        ( Room
        , generate
        , hit
        , overlap
        )

{-| The room module will generate random rooms given a seed. It uses Config.elm for
all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and entrances. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.

-}

import Dice
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
import Utils.Vector as Vector exposing (Vector)


type alias Room =
    { entrances : List Entrance
    , floors : List WorldVector
    , roomType : RoomType
    , dimension : Dimension
    , worldPos : WorldVector
    , lightSource : LightSource
    , walls : List WorldVector
    , corners : List WorldVector
    , tiles : EveryDict WorldVector Tile
    }


new : RoomType -> Dimension -> LightSource -> WorldVector -> Room
new roomType (( width, height ) as dimension) lightSource roomPosition =
    let
        floors =
            calculateFloors roomType dimension
                |> toWorldVectors roomPosition

        walls =
            floors
                |> List.map Dungeon.Rooms.Type.worldToVector
                |> adjacent
                |> List.map Dungeon.Rooms.Type.vectorToWorld

        corners =
            [ roomPosition
            , worldAddScalar roomPosition ( width, 0 )
            , worldAddScalar roomPosition ( 0, height )
            , worldAddScalar roomPosition dimension
            ]

        floorType =
            case lightSource of
                Dark ->
                    Tile.Types.DarkDgn

                _ ->
                    Tile.Types.LitDgn

        addFloorTile : WorldVector -> EveryDict WorldVector Tile -> EveryDict WorldVector Tile
        addFloorTile ((World tileVector) as tileWorldVector) dict =
            EveryDict.insert tileWorldVector (Tile.toTile tileVector floorType) dict

        addWallTile ((World tileVector) as tileWorldVector) dict =
            EveryDict.insert tileWorldVector (Tile.toTile tileVector Tile.Types.Rock) dict

        tiles =
            List.foldl addFloorTile EveryDict.empty floors
                |> (\dict -> List.foldl addWallTile dict walls)
    in
    { entrances = []
    , floors = floors
    , roomType = roomType
    , dimension = dimension
    , worldPos = roomPosition
    , lightSource = lightSource
    , walls = walls
    , corners = corners
    , tiles = tiles
    }


newDeadEnd : WorldVector -> Room
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


{-| Checks if two rooms overlap in any way. A room overlaps if any of either room's
corners is inside the other room.
-}
overlap : Room -> Room -> Bool
overlap r1 r2 =
    let
        r1Box =
            vectorBox r1

        r2Box =
            vectorBox r2

        intersect box cornerInWorldCoords =
            worldToVector cornerInWorldCoords
                |> flip Vector.boxIntersectVector box
    in
    List.any (intersect r1Box) r2.corners
        || List.any (intersect r2Box) r1.corners


{-| True if the world position is within the room
-}
hit : WorldVector -> Room -> Bool
hit (World v) room =
    Vector.boxIntersectVector v (vectorBox room)



-- Privates


lightSourceGenerator : Generator LightSource
lightSourceGenerator =
    Random.sample [ Artificial, Artificial, Artificial, Artificial, Dark ]
        |> Random.map (Maybe.withDefault Artificial)


positionGenerator : Config.Config -> Generator WorldVector
positionGenerator ({ dungeonSize } as config) =
    let
        ( dimX, dimY ) =
            Config.maxRoomSize config

        ( maxX, maxY ) =
            ( dungeonSize - dimX, dungeonSize - dimY )
                |> Vector.map (max 0)
    in
    Dice.d2d maxX maxY
        |> Random.map World


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


vectorBox : Room -> ( Vector, Vector )
vectorBox { worldPos, dimension } =
    worldToVector worldPos
        |> (\topLeft -> ( topLeft, Vector.add topLeft dimension ))


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


setFloors : List WorldVector -> Room -> Room
setFloors val room =
    { room | floors = val }


setRoomType : RoomType -> Room -> Room
setRoomType val room =
    { room | roomType = val }


setDimension : Dimension -> Room -> Room
setDimension val room =
    { room | dimension = val }


setWorldPos : WorldVector -> Room -> Room
setWorldPos val room =
    { room | worldPos = val }


setLightSource : LightSource -> Room -> Room
setLightSource val room =
    { room | lightSource = val }
