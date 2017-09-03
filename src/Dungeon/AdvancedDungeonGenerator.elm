module Dungeon.AdvancedDungeonGenerator
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
import EveryDict
import EverySet as Set exposing (EverySet)
import Game.Level exposing (Level)
import Random.Pcg as Random exposing (Generator)
import Tile.Model exposing (Tile)
import Utils.AStarCustom as AStar
import Utils.Direction as Direction exposing (Direction)
import Utils.Misc
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
    generateRooms config.nAttemptsAtRoomGen config (Random.constant (init config))
        |> Random.andThen (connectRooms config.nAttemptsAtRoomConnection)
        |> Random.map toLevel


toLevel : Dungeon -> Level
toLevel _ =
    Level Dict.empty [] [] [] [] Dict.empty


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
    generateRooms config.nAttemptsAtRoomGen config (Random.constant dungeon)
        |> Random.andThen (connectRooms config.nAttemptsAtRoomConnection)
        |> Random.andThen (addStair (\pos -> Building.new Building.StairsUp pos "UpStairs" Building.StairUp))
        |> Random.andThen (addStair (\pos -> Building.new Building.StairsDown pos "DownStairs" Building.StairDown))


addBuilding : Building -> Dungeon -> Dungeon
addBuilding building dungeon =
    { dungeon
        | buildings = building :: dungeon.buildings
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
    if n == 0 then
        Random.constant dungeon
    else if Dict.isEmpty dungeon.rooms then
        generateRooms config.nAttemptsAtRoomGen config (Random.constant dungeon)
            |> Random.andThen (steps (n - 1) config)
    else
        connectRooms config.nAttemptsAtRoomConnection dungeon
            |> Random.andThen (steps (n - 1) config)


clean : Dungeon -> Dungeon
clean =
    identity


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
connectTwoRooms dungeon ( a, b ) =
    let
        ( aFaces, bFaces ) =
            Room.faceOff a b

        addWallsFromCandidates dict face walls =
            EveryDict.get face dict
                |> Maybe.withDefault []
                |> (++) walls

        aWalls =
            List.foldl (addWallsFromCandidates a.candidateEntrancesByDirection) [] aFaces

        bWalls =
            List.foldl (addWallsFromCandidates b.candidateEntrancesByDirection) [] bFaces
    in
    case ( aWalls, bWalls ) of
        ( [], _ ) ->
            Random.constant dungeon

        ( _, [] ) ->
            Random.constant dungeon

        ( aWall :: aRestWalls, bWall :: bRestWalls ) ->
            Random.map2 (,) (samplerWithDefault aWall aRestWalls) (samplerWithDefault bWall bRestWalls)
                |> Random.map (connectPoints dungeon aFaces ( a, b ))


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
connectPoints : Dungeon -> List Direction -> ( Room, Room ) -> ( DirectedVector, DirectedVector ) -> Dungeon
connectPoints dungeon faces ( room1, room2 ) ( start, end ) =
    let
        _ =
            Debug.log "Between" ( startVector, end, faces )

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
    in
    AStar.findPath costFn (moveFn dungeon) hashFn pathData goalData
        |> Maybe.map
            (List.map hashFn
                >> (::) startVector
                >> Corridor.init
                >> flip addCorridor dungeon
                >> addConnectedRoom room1WithDoor
                >> addConnectedRoom room2WithDoor
            )
        |> Maybe.withDefault dungeon


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


{-| Use a simple pythagorean distance which will favor the longest path first as
that will get closest to the goal.
-}
costFn : PathData -> PathData -> Float
costFn a b =
    Vector.distance a.currentPosition b.currentPosition


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
        _ =
            Debug.log "Path: " currentPosition

        nextPositions =
            possiblePaths validDirections currentPosition goal
                |> List.filter (flip Config.withinDungeonBounds dungeon.config)
                |> List.filterMap (\movedTo -> toLastUnobstructedTile dungeon (Vector.path currentPosition movedTo))

        toPathData position =
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
            | rooms = Dict.insert room.worldPos room dungeon.rooms
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
possiblePaths : List Direction -> Vector -> Vector -> List Vector
possiblePaths validDirections (( x_a, y_a ) as a) (( x_b, y_b ) as b) =
    let
        (( d_x, d_y ) as d_vector) =
            ( abs (x_b - x_a), abs (y_b - y_a) )

        pathFromDirection direction =
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
                [ alongAxis ]
            else
                [ diagonal, diagonalToB ]
    in
    List.concatMap pathFromDirection validDirections
