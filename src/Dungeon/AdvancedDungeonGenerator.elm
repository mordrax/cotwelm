module Dungeon.AdvancedDungeonGenerator
    exposing
        ( Dungeon
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
import Utils.Vector as Vector exposing (DirectedVector, Vector)


type alias Dungeon =
    { rooms : List Room
    , config : Config
    , corridors : List Corridor
    , map : Dict Vector Tile
    }


init : Config -> Dungeon
init _ =
    { rooms = []
    , config = Config.init
    , corridors = []
    , map = Dict.empty
    }


generate : Config -> Generator Level
generate config =
    generateRooms 20 config (Random.constant (init config))
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


steps : Int -> Config -> Dungeon -> Generator Dungeon
steps _ config dungeon =
    generateRooms 20 config (Random.constant dungeon)
        |> Random.andThen connectRooms


clean : Dungeon -> Dungeon
clean =
    identity


toTiles : Dungeon -> List Tile
toTiles dungeon =
    Dict.values dungeon.map


connectRooms : Dungeon -> Generator Dungeon
connectRooms dungeon =
    case dungeon.rooms of
        a :: b :: rest ->
            connectTwoRooms a b dungeon

        _ ->
            Random.constant dungeon


connectTwoRooms : Room -> Room -> Dungeon -> Generator Dungeon
connectTwoRooms a b dungeon =
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

        samplerWithDefault wall walls =
            Random.sample (wall :: walls)
                |> Random.map (Maybe.withDefault wall)
    in
    case ( aWalls, bWalls ) of
        ( [], _ ) ->
            Random.constant dungeon

        ( _, [] ) ->
            Random.constant dungeon

        ( aWall :: aRestWalls, bWall :: bRestWalls ) ->
            Random.map2 (,)
                (samplerWithDefault aWall aRestWalls)
                (samplerWithDefault bWall bRestWalls)
                |> Random.andThen (connectPoints dungeon aFaces)


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


connectPoints : Dungeon -> List Direction -> ( DirectedVector, DirectedVector ) -> Generator Dungeon
connectPoints dungeon faces ( ( startVector, direction ), ( endVector, _ ) ) =
    let
        _ =
            Debug.log "Between" ( startVector, endVector, faces )

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
            )
        |> Maybe.withDefault dungeon
        |> Random.constant



--        |> Debug.log ("PATH between " ++ toString startVector ++ " " ++ toString endVector)
--        |> (\_ -> Random.constant dungeon)


type alias DirectionChanges =
    Int


type alias PossibleMoves =
    List Vector


type alias LastMove =
    Vector


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
                |> List.filter (\movedTo -> isPathClear dungeon ( currentPosition, movedTo ))

        toPathData position =
            { pathData | currentPosition = position }
    in
    List.map toPathData nextPositions
        |> Set.fromList


isPathClear : Dungeon -> ( Vector, Vector ) -> Bool
isPathClear dungeon ( start, end ) =
    True



-- Helpers


{-| If the room can fit in the dungeon, add it
-}
addRoom : Room -> Dungeon -> Dungeon
addRoom room dungeon =
    let
        withinDungeonBounds =
            List.all (\x -> Config.withinDungeonBounds x dungeon.config) room.corners

        overlapping =
            List.any (Room.overlap room) dungeon.rooms
    in
    if withinDungeonBounds && not overlapping then
        { dungeon
            | rooms = room :: dungeon.rooms
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
