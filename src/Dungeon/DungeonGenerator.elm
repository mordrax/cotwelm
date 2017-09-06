module Dungeon.DungeonGenerator
    exposing
        ( Dungeon
        , candidate
        , clean
        , costFn
        , generate
        , init
        , moveFn
        , possibleMoves
        , possiblePaths
        , steps
        , toTiles
        )

{-| The 'advanced' dungeon generator uses a different algorithm to try and simplify
room generation. The algorithm is as follows:

1.  Generate a number of non-overlapping dungeon rooms. These are unconnected rooms.
    To stop this from looping infinitely, cap failures.

2.  Pick any unconnected room and connect it to a number of other rooms.
    Add these to the connected rooms.

3.  Repeat.

When attempting to connect rooms, if two corridors collide, there is an option to stop
at the collision point, pass through or remove the corridor.

-}

import Building exposing (Building)
import Dict exposing (Dict)
import Dungeon.Corridor as Corridor exposing (Corridor)
import Dungeon.Room as Room exposing (Room)
import Dungeon.Rooms.Config as Config exposing (Config)
import EverySet as Set exposing (EverySet)
import Game.Level exposing (Level)
import Maybe.Extra
import Random.Pcg as Random exposing (Generator)
import Tile
import Tile.Model exposing (Tile)
import Tile.Types
import Utils.AStarCustom as AStar
import Utils.Direction as Direction exposing (Direction(..))
import Utils.Vector as Vector exposing (DirectedVector, Vector)


type alias Dungeon =
    { rooms : Dict Vector Room
    , connectedRooms : Dict Vector Room
    , config : Config
    , corridors : List Corridor
    , map : Dict Vector Tile
    , buildings : List Building
    }


init : Config -> Dungeon
init _ =
    { rooms = Dict.empty
    , connectedRooms = Dict.empty
    , config = Config.init
    , corridors = []
    , map = Dict.empty
    , buildings = []
    }


generate : Config -> Generator Level
generate config =
    candidate config (init config)
        |> Random.map toLevel


toLevel : Dungeon -> Level
toLevel dungeon =
    Level dungeon.map dungeon.buildings [] (Dict.values dungeon.rooms) dungeon.corridors Dict.empty


generateRooms : Int -> Config -> Generator Dungeon -> Generator Dungeon
generateRooms tries config dungeonGen =
    case tries of
        0 ->
            dungeonGen

        n ->
            Room.generate config
                |> Random.map2 (\dungeon room -> addRoom room dungeon) dungeonGen
                |> generateRooms (n - 1) config


candidate : Config -> Dungeon -> Generator Dungeon
candidate config dungeon =
    let
        regenOnAnyCheckFail dungeon =
            if List.any (\checkFn -> checkFn dungeon) [ connections, stairs ] then
                candidate config (init config)
            else
                Random.constant dungeon

        stairs =
            .buildings >> List.length >> flip (<) 2

        connections =
            .connectedRooms >> Dict.keys >> List.length >> flip (<) 6
    in
    generateRooms config.nAttemptsAtRoomGen config (Random.constant dungeon)
        |> Random.andThen (connectRooms config.nAttemptsAtRoomConnection)
        |> Random.andThen
            (addStair
                (\pos ->
                    Building.new
                        Building.StairsUp
                        (Debug.log "upstairs at: " pos)
                        "UpStairs"
                        Building.StairUp
                )
            )
        |> Random.andThen
            (addStair
                (\pos ->
                    Building.new Building.StairsDown
                        (Debug.log "downstairs at: " pos)
                        "DownStairs"
                        Building.StairDown
                )
            )
        |> Random.andThen regenOnAnyCheckFail
        |> Random.map clean


addBuilding : Building -> Dungeon -> Dungeon
addBuilding building dungeon =
    let
        tileType =
            if building.buildingType == Building.StairUp then
                Tile.Types.StairsUp
            else
                Tile.Types.StairsDown
    in
    { dungeon
        | buildings = building :: dungeon.buildings
        , map = Dict.insert building.position (Tile.toTile building.position tileType) dungeon.map
    }


addStair : (Vector -> Building) -> Dungeon -> Generator Dungeon
addStair stairsAt dungeon =
    let
        addStairAt pos =
            addBuilding (stairsAt pos) dungeon

        addStairToRoom : Room -> Generator Dungeon
        addStairToRoom room =
            Random.sample room.floors
                |> Random.map (Maybe.map addStairAt)
                |> Random.map (Maybe.withDefault dungeon)
    in
    Random.sample (Dict.values dungeon.connectedRooms)
        |> Random.andThen (Maybe.map addStairToRoom >> Maybe.withDefault (Random.constant dungeon))


steps : Int -> Config -> Dungeon -> Generator Dungeon
steps n config dungeon =
    if Debug.log "last step" n == 0 then
        Random.constant dungeon
    else if Dict.isEmpty dungeon.rooms && Dict.isEmpty dungeon.connectedRooms then
        generateRooms config.nAttemptsAtRoomGen config (Random.constant dungeon)
            |> Random.andThen (steps (n - 1) config)
    else
        connectRooms config.nAttemptsAtRoomConnection dungeon
            |> Random.andThen (steps (n - 1) config)


toTiles : Dungeon -> List Tile
toTiles dungeon =
    Dict.values dungeon.map


{-| Tries to connect all rooms with corridors
-}
connectRooms : Int -> Dungeon -> Generator Dungeon
connectRooms nTries dungeon =
    case nTries of
        0 ->
            Random.constant dungeon

        n ->
            selectTwoRooms dungeon
                |> Maybe.map (Random.andThen (connectTwoRooms dungeon >> Random.andThen (connectRooms (n - 1))))
                |> Maybe.withDefault (Random.constant dungeon)


{-| Pick a room from the connected rooms and try to connect to an unconnected room
-}
selectTwoRooms : Dungeon -> Maybe (Generator ( Room, Room ))
selectTwoRooms dungeon =
    case ( Dict.values dungeon.rooms, Dict.values dungeon.connectedRooms ) of
        ( a :: restRooms, b :: restConnectedRooms ) ->
            Random.map2 (,)
                (samplerWithDefault a restRooms)
                (samplerWithDefault b restConnectedRooms)
                |> Just

        ( a :: b :: restRooms, [] ) ->
            Just (Random.constant ( a, b ))

        ( [], _ ) ->
            Nothing

        _ ->
            Nothing


connectTwoRooms : Dungeon -> ( Room, Room ) -> Generator Dungeon
connectTwoRooms dungeon ( roomA, roomB ) =
    let
        ( aFaces, bFaces ) =
            Room.faceOff roomA roomB

        roomPoints : { a : Maybe DirectedVector, b : Maybe DirectedVector }
        roomPoints =
            { a = Nothing, b = Nothing }

        sampleRoomA faces roomPoints =
            Random.sample (Room.entrancesFromFaces roomA faces)
                |> Random.map (\maybeEntrance -> { roomPoints | a = maybeEntrance })

        sampleRoomB roomPoints =
            roomPoints.a
                |> Maybe.map (Tuple.first >> entrancesFacingPoint roomB)
                |> Maybe.withDefault []
                |> Random.sample
                |> Random.map (\maybeEntrance -> { roomPoints | b = maybeEntrance })

        entrancesFacingPoint room point =
            Room.facesPoint point room
                |> Room.entrancesFromFaces room

        connectIfValid roomPoints =
            Maybe.map2 (connectPoints dungeon aFaces ( roomA, roomB )) roomPoints.a roomPoints.b
                |> Maybe.withDefault (Random.constant dungeon)
    in
    roomPoints
        |> sampleRoomA aFaces
        |> Random.andThen sampleRoomB
        |> Random.andThen connectIfValid


samplerWithDefault : a -> List a -> Generator a
samplerWithDefault default list =
    Random.sample (default :: list)
        |> Random.map (Maybe.withDefault default)


possibleMoves : List Direction -> List Vector
possibleMoves faces =
    case faces of
        [] ->
            Debug.log "No faces" []

        a :: [] ->
            Direction.adjacent a
                |> List.map Vector.fromDirection
                |> (::) (Vector.fromDirection a)

        a :: b :: [] ->
            [ Vector.fromDirection a
            , Vector.fromDirection b
            , Vector.add (Vector.fromDirection a) (Vector.fromDirection b)
            ]

        tooManyFaces ->
            Debug.log "Too many faces!!!" tooManyFaces
                |> List.map Vector.fromDirection


{-| -}
connectPoints : Dungeon -> List Direction -> ( Room, Room ) -> DirectedVector -> DirectedVector -> Generator Dungeon
connectPoints dungeon faces ( room1, room2 ) start end =
    let
        room1WithDoor =
            Room.makeDoor room1 (Tuple.first start)

        room2WithDoor =
            Room.makeDoor room2 (Tuple.first end)

        startVector =
            Vector.advance start

        endVector =
            Vector.advance end

        pathData =
            { currentPosition = startVector
            , goal = endVector
            , validDirections = faces
            , directionChanges = 0
            }

        goalData =
            { currentPosition = endVector
            , goal = endVector
            , validDirections = []
            , directionChanges = 0
            }

        hashFn { currentPosition } =
            currentPosition

        generateAndAddRooms dungeon =
            Random.map2 (,) room1WithDoor room2WithDoor
                |> Random.map (\( r1, r2 ) -> addRooms r1 r2 dungeon)

        addRooms r1 r2 dungeon =
            dungeon
                |> addConnectedRoom r1
                |> addConnectedRoom r2
    in
    AStar.findPath costFn (moveFn dungeon) hashFn pathData goalData
        |> Maybe.map
            (List.map hashFn
                >> (::) startVector
                >> Corridor.init
                >> flip addCorridor dungeon
                >> generateAndAddRooms
            )
        |> Maybe.withDefault (Random.constant dungeon)


addConnectedRoom : Room -> Dungeon -> Dungeon
addConnectedRoom room dungeon =
    { dungeon
        | map = Dict.union room.tiles dungeon.map
        , rooms = Dict.remove room.worldPos dungeon.rooms
        , connectedRooms = Dict.insert room.worldPos room dungeon.connectedRooms
    }


type alias PathData =
    { currentPosition : Vector
    , goal : Vector
    , validDirections : List Direction
    , directionChanges : Int
    }


{-| cotw had alot of diagonals, so favor diagonal paths.
-}
costFn : PathData -> PathData -> Float
costFn a b =
    1 / Vector.distance a.currentPosition b.currentPosition


{-| A corridor can have one of the three orientations:
horizontal, vertical, diagonal (45 deg)

Therefore, between two points, the shortest path is either:

1.  A straight line if the x or y axis align or they both align in a 45 deg fashion.
    ( eg ( 0, 0) to ( 5, 5) )
2.  A bend with the bend either being 45deg or 90deg.
    eg from (0,0) to (2, 3) there are 4 possible outcomes with one bend ending at (2, 3)
    a. along the y (0, 1) and (0,3)
    b. along the x (2, 0) and (2, 2)

An additional requirement is that the path leading out of the room cannot turn 90deg right away.

-}
moveFn : Dungeon -> PathData -> EverySet PathData
moveFn dungeon ({ currentPosition, goal, validDirections, directionChanges } as pathData) =
    let
        --        _ =
        --            Debug.log "Path: " currentPosition
        nextPositions =
            possiblePaths validDirections currentPosition goal
                |> List.filter (\( pos, _ ) -> Config.withinDungeonBounds pos dungeon.config)
                |> List.filterMap
                    (\( pos, dir ) ->
                        toLastUnobstructedTile dungeon (Vector.path currentPosition pos)
                            |> Maybe.map (\p -> ( p, dir ))
                    )

        toPathData ( position, newDirection ) =
            { pathData | currentPosition = position }
    in
    List.map toPathData nextPositions
        |> Set.fromList


toLastUnobstructedTile : Dungeon -> List Vector -> Maybe Vector
toLastUnobstructedTile dungeon path =
    case path of
        [] ->
            Nothing

        [ a ] ->
            if obstructed dungeon a then
                Nothing
            else
                Just a

        a :: b :: rest ->
            if obstructed dungeon b then
                Just a
            else
                toLastUnobstructedTile dungeon (b :: rest)


obstructed : Dungeon -> Vector -> Bool
obstructed dungeon position =
    Dict.member position dungeon.map



-- Helpers


{-| If the room can fit in the dungeon, add it
-}
addRoom : Room -> Dungeon -> Dungeon
addRoom room dungeon =
    let
        withinDungeonBounds =
            List.all (\x -> Config.withinDungeonBounds x dungeon.config) room.corners

        overlapping =
            List.any (Room.overlap room) (Dict.values dungeon.rooms)
    in
    if withinDungeonBounds && not overlapping then
        { dungeon
            | rooms = Dict.insert (Debug.log ("adding room of size " ++ toString room.dimension ++ " at ") room.worldPos) room dungeon.rooms
            , map = Dict.union room.tiles dungeon.map
        }
    else
        dungeon


addCorridor : Corridor -> Dungeon -> Dungeon
addCorridor corridor dungeon =
    { dungeon
        | corridors = corridor :: dungeon.corridors

        -- prefer the map over the corridor as the corridor has wrap around
        -- walls that overlap with bits of the rooms that they connect
        , map = Dict.union dungeon.map corridor.tiles
    }


{-| This is a move function helper. Given two points, returns the shortest path between them
with at most one bend.

e.g
Therefore, between two points, the shortest path is either:

         1.  A straight line if the x or y axis align or they both align in a 45 deg fashion.
             ( eg ( 0, 0) to ( 5, 5) )
         2.  A bend with the bend either being 45deg or 90deg.
             eg from (0,0) to (2, 3) there are 4 possible outcomes with one bend ending at (2, 3)
             a. along the y (0, 1) and (0,3)
             b. along the x (2, 0) and (2, 2)

-}
possiblePaths : List Direction -> Vector -> Vector -> List DirectedVector
possiblePaths validDirections (( x_a, y_a ) as a) (( x_b, y_b ) as b) =
    let
        -- d_vector is the magnitude of the difference of a to b
        -- useful for calculating distance travelled on either axis
        (( d_x, d_y ) as d_vector) =
            ( abs (x_b - x_a), abs (y_b - y_a) )

        pathInDirection direction =
            let
                alongAxis =
                    Vector.mul (Vector.fromDirection direction) d_vector
                        |> Vector.add a

                diagonal =
                    Vector.scaleInt (min d_x d_y) (Vector.fromDirection direction)
                        |> Vector.add a

                diagonalToB =
                    Vector.sub b diagonal
                        |> Vector.add a
            in
            if Direction.isCardinal direction then
                [ ( alongAxis, direction ) ]
            else
                [ ( diagonal, direction ), ( diagonalToB, direction ) ]
    in
    List.concatMap pathInDirection validDirections



--------------
-- Cleaning --
--------------


clean : Dungeon -> Dungeon
clean dungeon =
    let
        replaceTile tile dict =
            calculateTypeOfWall dungeon.map tile.position
                |> (\newTile -> Dict.insert newTile.position newTile dict)
    in
    Dict.values dungeon.map
        |> List.filter (.type_ >> (==) Tile.Types.Rock)
        |> List.foldl replaceTile dungeon.map
        |> (\newMap -> { dungeon | map = newMap })


calculateTypeOfWall : Dict Vector Tile -> Vector -> Tile
calculateTypeOfWall map position =
    case ( hasAdjacentFloors position map, hasThreeOrMoreNeighbourFloors position map ) of
        ( True, True ) ->
            Tile.toTile position Tile.Types.DarkDgn

        ( True, False ) ->
            Tile.toTile position Tile.Types.WallDarkDgn

        _ ->
            Tile.toTile position Tile.Types.Rock


adjacentNeighbourPairs : List (List Direction)
adjacentNeighbourPairs =
    [ [ N, E ]
    , [ E, S ]
    , [ S, W ]
    , [ W, N ]
    ]


adjacentNeighbourTriplets : List (List Direction)
adjacentNeighbourTriplets =
    [ [ N, E, S ]
    , [ E, S, W ]
    , [ S, W, N ]
    , [ W, N, E ]
    ]


hasThreeOrMoreNeighbourFloors : Vector -> Dict Vector Tile -> Bool
hasThreeOrMoreNeighbourFloors position map =
    allDirectionsAreFloors adjacentNeighbourTriplets position map


hasAdjacentFloors : Vector -> Dict Vector Tile -> Bool
hasAdjacentFloors position map =
    allDirectionsAreFloors adjacentNeighbourPairs position map


allDirectionsAreFloors : List (List Direction) -> Vector -> Dict Vector Tile -> Bool
allDirectionsAreFloors neighbourDirections position map =
    let
        toNeighbours directions =
            directions
                |> List.map Vector.fromDirection
                |> List.map (Vector.add position)
                |> List.map (flip Dict.get map)

        isFloorTiles maybeTiles =
            maybeTiles
                |> List.map (Maybe.Extra.filter (\x -> x.type_ == Tile.Types.DarkDgn))
                |> List.all ((/=) Nothing)
    in
    neighbourDirections
        |> List.map toNeighbours
        |> List.any isFloorTiles


neighbours : Vector -> Dict Vector Tile -> ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )
neighbours position map =
    let
        getTile direction =
            direction
                |> Vector.fromDirection
                |> Vector.add position
                |> flip Dict.get map
    in
    ( getTile N, getTile E, getTile S, getTile W )
