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

import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Corridor as Corridor exposing (..)
import Random.Pcg as Random exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Lodash exposing (..)
import Tile exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Utils.Vector as Vector exposing (..)
import Dice exposing (..)
import Dict exposing (..)
import List exposing (..)
import Dungeon.Corridor exposing (..)
import Utils.CompassDirection as CompassDirection exposing (..)
import Set exposing (..)


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
    , floors : Floors
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
        , floors = []
        , roomType = DeadEnd
        , dimension = ( 1, 1 )
        , worldPos = Vector.zero
        }


new : Entrances -> Floors -> RoomType -> Dimension -> Vector -> Room
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
    new [ Entrance.init Door worldPos ] [] DeadEnd ( 1, 1 ) worldPos


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
            `andThen` floorsGenerator
            `andThen` toRoomGenerator


notTooClose : Entrances -> Vector -> Maybe Vector
notTooClose entrances position =
    if List.any ((==) position) (List.map Entrance.position entrances) then
        Nothing
    else if tooCloseToEntrances position entrances then
        Nothing
    else
        Just position


tooCloseToEntrances : Vector -> Entrances -> Bool
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


adjacentToFloorsWithoutDiagonals : Floors -> Vectors
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


adjacentToFloors : Floors -> Vectors
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


boundary : Room -> Vectors
boundary (A model) =
     model.floors
    |> adjacentToFloors
    |> List.map (Vector.add model.worldPos)


addEntrance : Entrance -> Room -> Room
addEntrance entrance (A ({ worldPos, entrances } as model)) =
    let
        entrancePosition =
            Vector.sub (Entrance.position entrance) worldPos

        _ =
            Debug.log "addEntrance"
                { entrancePosition = entrancePosition
                }
    in
        A { model | entrances = entrance :: entrances }


removeEntrance : Entrance -> Room -> Room
removeEntrance entrance (A ({ entrances, worldPos } as model)) =
    let
        entrances' =
            List.filter (Entrance.equal entrance >> not) entrances
    in
        A { model | entrances = entrances' }


toTiles : Room -> Tiles
toTiles (A { floors, entrances, worldPos }) =
    let
        --        _ =
        --            Debug.log "Room.toTiles" entrances
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


entrances : Room -> Entrances
entrances (A { entrances }) =
    entrances


entranceFacing : Room -> Entrance -> CompassDirection
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


placeRoom : DirectedVector -> Room -> Generator Room
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

        _ =
            Debug.log "Room.placeRoom"
                { floors = floors
                , candidateWalls = candidateWalls
                }

        pickAWall walls =
            walls
                |> shuffle
                |> Random.map (headWithDefault ( 0, 0 ))

        makeADoor wall =
            let
                entrancePosition =
                    Vector.add endPoint (Vector.fromDirection endDirection)

                entrance =
                    Entrance.init Door entrancePosition

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
        `andThen` (\roomType' -> constant { model | roomType = roomType' })


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


generateEntranceHelper : Vectors -> Generator Entrance
generateEntranceHelper possibleEntrancePositions =
    let
        newEntrance pos =
            Entrance.init Door pos

        makeADoor positions =
            positions
                |> Lodash.headWithDefault ( 0, 0 )
                |> newEntrance
    in
        possibleEntrancePositions
            |> shuffle
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
