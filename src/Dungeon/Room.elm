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
--        , isCollision
--        , placeRoom
--        )

import Dice
import Dungeon.Corridor as Corridor exposing (..)
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
import Random.Pcg as Random exposing (Generator, constant, andThen)
import Set exposing (Set)
import Tile exposing (Tile)
import Utils.Direction as Direction exposing (..)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)


type alias Model =
    { entrances : List Entrance
    , floors : Floors
    , roomType : RoomType
    , dimension : Dimension
    , worldPos : Vector
    }


type alias Corners =
    List Vector


type Room
    = A Model


type alias Rooms =
    List Room


init : Room
init =
    A
        { entrances = []
        , floors = []
        , roomType = DeadEnd
        , dimension = ( 1, 1 )
        , worldPos = Vector.zero
        }


floors : Room -> List Vector
floors (A { floors, worldPos }) =
    List.map (Vector.add worldPos) floors


new : List Entrance -> Floors -> RoomType -> Dimension -> Vector -> Room
new entrances floors roomType dimension worldPos =
    A
        { entrances = entrances
        , floors = floors
        , roomType = roomType
        , dimension = dimension
        , worldPos = worldPos
        }


newDeadEnd : Vector -> Room
newDeadEnd worldPos =
    new [ Entrance.init Entrance.Door worldPos ] [] DeadEnd ( 1, 1 ) worldPos


generate : Config.Model -> Generator Room
generate config =
    let
        (A model) =
            init

        toRoomGenerator model =
            constant (A model)
    in
        roomTypeGenerator config model
            |> andThen (roomSizeGenerator config)
            |> andThen (positionGenerator config)
            |> andThen floorsGenerator
            |> andThen toRoomGenerator


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
generateEntrance (A ({ entrances, worldPos, floors } as model)) =
    let
        possibleEntrancePositions =
            adjacentToFloorsWithoutDiagonals floors
                |> List.map (Vector.add worldPos)
                |> List.filterMap (notTooClose entrances)

        toReturn entrance =
            ( A { model | entrances = entrance :: entrances }
            , entrance
            )
    in
        possibleEntrancePositions
            |> generateEntranceHelper
            |> Random.map toReturn


adjacentToFloorsWithoutDiagonals : Floors -> List Vector
adjacentToFloorsWithoutDiagonals floors =
    let
        lessFloors floorSet =
            Set.diff floorSet (Set.fromList floors)
    in
        floors
            |> List.map (Vector.cardinalNeighbours)
            |> List.concat
            |> Set.fromList
            |> lessFloors
            |> Set.toList


adjacentToFloors : Floors -> List Vector
adjacentToFloors floors =
    let
        lessFloors floorSet =
            Set.diff floorSet (Set.fromList floors)
    in
        floors
            |> List.map (Vector.neighbours)
            |> List.concat
            |> Set.fromList
            |> lessFloors
            |> Set.toList


boundary : Room -> List Vector
boundary (A model) =
    model.floors
        |> adjacentToFloors
        |> List.map (Vector.add model.worldPos)


addEntrance : Entrance -> Room -> Room
addEntrance entrance (A ({ worldPos, entrances } as model)) =
    let
        entrancePosition =
            Vector.sub (Entrance.position entrance) worldPos
    in
        A { model | entrances = entrance :: entrances }


removeEntrance : Entrance -> Room -> Room
removeEntrance entrance (A ({ entrances, worldPos } as model)) =
    let
        entrances_ =
            List.filter (Entrance.equal entrance >> not) entrances
    in
        A { model | entrances = entrances_ }


toTiles : Room -> List Tile
toTiles (A { floors, entrances, worldPos }) =
    let
        toWorldPos localPos =
            Vector.add worldPos localPos

        roomTileTypes =
            [ ( Tile.DarkDgn, floors )
            ]

        makeTiles ( tileType, positions ) =
            positions
                |> List.map toWorldPos
                |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.map Entrance.toTile entrances
            ++ List.concat (List.map makeTiles roomTileTypes)


entrances : Room -> List Entrance
entrances (A { entrances }) =
    entrances


entranceFacing : Room -> Entrance -> Direction
entranceFacing (A { floors, worldPos }) entrance =
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
placeRoom ( endPoint, endDirection ) (A ({ dimension, floors } as model)) =
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
                    <| A
                        { model
                            | entrances = [ entrance ]
                            , worldPos = roomWorldPosition
                        }
    in
        pickAWall candidateWalls |> andThen makeADoor


wallsFacingDirection : Direction -> Walls -> Dimension -> Walls
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
position (A { worldPos }) =
    worldPos


isCollision : Room -> Vector -> Bool
isCollision (A { entrances, floors, worldPos }) position =
    let
        localPosition =
            Vector.sub position worldPos

        isPositionAEntrance =
            entrances
                |> List.map Entrance.position
                |> List.any ((==) position)

        isPositionAdjacent =
            List.any ((==) localPosition) (adjacentToFloors floors)
    in
        isPositionAEntrance || isPositionAdjacent


pp : Room -> String
pp (A { worldPos }) =
    "Room at (" ++ toString worldPos ++ ")"



-- Privates


roomTypeGenerator : Config.Model -> Model -> Generator Model
roomTypeGenerator config model =
    Config.roomTypeGenerator config
        |> andThen (\roomType_ -> constant { model | roomType = roomType_ })


positionGenerator : Config.Model -> Model -> Generator Model
positionGenerator { dungeonSize } ({ dimension } as model) =
    let
        ( dimX, dimY ) =
            dimension

        ( maxX, maxY ) =
            ( dungeonSize - dimX - 1, dungeonSize - dimY - 1 )
                |> Vector.map (max 0)
    in
        (Dice.d2d maxX maxY)
            |> andThen (\worldPos_ -> constant { model | worldPos = worldPos_ })


roomSizeGenerator : Config.Model -> Model -> Generator Model
roomSizeGenerator config ({ roomType } as model) =
    Config.roomSizeGenerator roomType config
        |> andThen (\roomSize -> constant { model | dimension = ( roomSize, roomSize ) })


headOfWalls : List Walls -> Wall
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


floorsGenerator : Model -> Generator Model
floorsGenerator ({ roomType, dimension } as model) =
    let
        makeFloors =
            (templates roomType).makeFloors
    in
        constant { model | floors = makeFloors dimension }


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
