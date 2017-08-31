module Dungeon.Room
    exposing
        ( Room
        , generate
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
import List
import Random.Pcg as Random exposing (Generator, andThen, constant)
import Set exposing (Set)
import Tile exposing (Tile)
import Tile.Types
import Types exposing (..)
import Utils.Direction as Direction exposing (..)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)


-- Model: Room


type alias Room =
    { entrances : List Entrance
    , floors : List WorldVector
    , roomType : RoomType
    , dimension : Dimension
    , worldPos : WorldVector
    , lightSource : LightSource
    , walls : List WorldVector
    }


new : RoomType -> Dimension -> LightSource -> WorldVector -> Room
new roomType dimension lightSource worldVector =
    let
        floors =
            calculateFloors roomType dimension
                |> toWorldVectors worldVector

        walls =
            floors
                |> List.map Dungeon.Rooms.Type.worldToVector
                |> adjacent
                |> List.map Dungeon.Rooms.Type.vectorToWorld
    in
    { entrances = []
    , floors = floors
    , roomType = roomType
    , dimension = dimension
    , worldPos = worldVector
    , lightSource = lightSource
    , walls = walls
    }


newDeadEnd : Vector -> Room
newDeadEnd worldPos =
    new DeadEnd ( 1, 1 ) Artificial worldPos
        |> setEntrances [ Entrance.init Entrance.Door worldPos ]


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


notTooClose : List Entrance -> Vector -> Maybe Vector
notTooClose entrances position =
    if List.any ((==) position) (List.map Entrance.position entrances) then
        Nothing
    else if tooCloseToEntrances position entrances then
        Nothing
    else
        Just position


tooCloseToEntrances : Vector -> List Entrance -> Bool
tooCloseToEntrances ( x, y ) entrances =
    let
        tooCloseToEntrance entrance =
            let
                ( ex, ey ) =
                    Entrance.position entrance

                ( dx, dy ) =
                    ( abs (ex - x)
                    , abs (ey - y)
                    )
            in
            (dx == 0 && dy <= 2) || (dy == 0 && dx <= 2)
    in
    List.any tooCloseToEntrance entrances


{-| Add a door to the room using one of the room's remaining walls.
It also reports the door that just got added)
-}
generateEntrance : Room -> Generator ( Room, Entrance )
generateEntrance ({ entrances, worldPos, floors } as room) =
    let
        possibleEntrancePositions =
            cardinallyAdjacent floors
                |> List.map (Vector.add worldPos)
                |> List.filterMap (notTooClose entrances)

        toReturn entrance =
            ( { room | entrances = entrance :: entrances }
            , entrance
            )
    in
    possibleEntrancePositions
        |> generateEntranceHelper
        |> Random.map toReturn


addEntrance : Entrance -> Room -> Room
addEntrance entrance ({ worldPos, entrances } as room) =
    let
        entrancePosition =
            Vector.sub (Entrance.position entrance) worldPos
    in
    { room | entrances = entrance :: entrances }


removeEntrance : Entrance -> Room -> Room
removeEntrance entrance ({ entrances, worldPos } as model) =
    let
        entrances_ =
            List.filter (Entrance.equal entrance >> not) entrances
    in
    { model | entrances = entrances_ }


toTiles : Room -> List Tile
toTiles { floors, entrances, worldPos, lightSource } =
    let
        toWorldPos localPos =
            Vector.add worldPos localPos

        roomTileTypes =
            case lightSource of
                Dark ->
                    [ ( Tile.Types.DarkDgn, floors ) ]

                _ ->
                    [ ( Tile.Types.LitDgn, floors ) ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map toWorldPos
                |> List.map (\pos -> Tile.toTile pos tileType)
    in
    List.map Entrance.toTile entrances
        ++ List.concat (List.map makeTiles roomTileTypes)


entrances : Room -> List Entrance
entrances { entrances } =
    entrances


entranceFacing : Room -> Entrance -> Direction
entranceFacing { floors, worldPos } entrance =
    let
        entrancePos =
            entrance
                |> Entrance.position
                |> flip Vector.sub worldPos

        isFloor direction =
            direction
                |> Vector.fromDirection
                |> Vector.add entrancePos
                |> (\x -> List.member x floors)
    in
    if isFloor N then
        S
    else if isFloor S then
        N
    else if isFloor E then
        W
    else if isFloor W then
        E
    else
        N


placeRoom : Vector.DirectedVector -> Room -> Generator Room
placeRoom ( endPoint, endDirection ) ({ dimension, floors } as room) =
    let
        wallFacing =
            Vector.oppositeDirection endDirection

        candidateWalls =
            floors
                |> List.map (\floor -> Vector.neighbourInDirection floor wallFacing)
                |> Set.fromList
                |> flip Set.diff (Set.fromList floors)
                |> Set.toList

        pickAWall walls =
            walls
                |> Misc.shuffle
                |> Random.map (Misc.headWithDefault ( 0, 0 ))

        makeADoor wall =
            let
                entrancePosition =
                    Vector.add endPoint (Vector.fromDirection endDirection)

                entrance =
                    Entrance.init Entrance.Door entrancePosition

                roomWorldPosition =
                    Vector.sub entrancePosition wall
            in
            constant
                { room
                    | entrances = [ entrance ]
                    , worldPos = roomWorldPosition
                }
    in
    pickAWall candidateWalls |> andThen makeADoor


wallsFacingDirection : Direction -> List WorldVector -> Dimension -> List WorldVector
wallsFacingDirection direction walls ( maxX, maxY ) =
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
    case direction of
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


position : Room -> Vector
position { worldPos } =
    worldPos


isInRectangularRoom : Room -> Vector -> Bool
isInRectangularRoom { floors, worldPos, dimension } position =
    Vector.boxIntersectVector position ( worldPos, Vector.add worldPos dimension )


isInRoom : Room -> Vector -> Bool
isInRoom { floors, worldPos } position =
    List.any (Vector.add worldPos >> (==) position) floors


isCollision : Room -> Vector -> Bool
isCollision { entrances, floors, worldPos } position =
    let
        localPosition =
            Vector.sub position worldPos

        isPositionAEntrance =
            entrances
                |> List.map Entrance.position
                |> List.any ((==) position)

        isPositionAdjacent =
            List.any ((==) localPosition) (adjacent floors)
    in
    isPositionAEntrance || isPositionAdjacent


pp : Room -> String
pp { worldPos } =
    "Room at (" ++ toString worldPos ++ ")"



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


headOfWalls : List (List WorldVector) -> WorldVector
headOfWalls walls =
    walls
        |> List.concat
        |> List.head
        |> Maybe.withDefault ( 0, 0 )


generateEntranceHelper : List Vector -> Generator Entrance
generateEntranceHelper possibleEntrancePositions =
    let
        newEntrance pos =
            Entrance.init Entrance.Door pos

        makeADoor positions =
            positions
                |> Misc.headWithDefault ( 0, 0 )
                |> newEntrance
    in
    possibleEntrancePositions
        |> Misc.shuffle
        |> Random.map makeADoor


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
