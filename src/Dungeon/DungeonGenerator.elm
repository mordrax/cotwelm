module Dungeon.DungeonGenerator exposing (..)

import AStar exposing (findPath, Position)
import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dice exposing (..)
import Dict exposing (..)
import Dungeon.Room as Room exposing (..)
import List.Extra exposing (lift2)
import Random exposing (..)
import Set exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)


type alias Model =
    { config : Config.Model
    }


type alias DungeonRoom =
    { position : Vector
    , room : Room
    }


init : Model
init =
    { config = Config.init
    }


generate : Random.Seed -> ( Dict Vector Tile, Random.Seed )
generate seed =
    ( Dict.empty, seed )



--let
--    toKVPair =
--        \tile -> ( tile.position, tile )
--    -- TODO: currently not using room
--    -- need to incorporate walls, floor, entrances into dungeon
--    -- start empty, add rooms, connections, lastly rocks to fill gap
--    ( dungeonRooms, seed' ) =
--        generateRooms 3 ( 30, [], seed )
--    tiles =
--        List.concat
--            <| List.map (\x -> roomToTiles x.room x.position) dungeonRooms
--    map =
--        Dict.fromList (List.map toKVPair tiles)
--    defaultPosition =
--        \x -> Maybe.withDefault ( 0, 0 ) x
--    --path =
--    --    connectRooms ( room1, defaultPosition <| List.head startPositions )
--    --        ( room2, defaultPosition <| List.head <| List.drop 1 startPositions )
--    --        map
--    --corridor =
--    --    case path of
--    --        Nothing ->
--    --            []
--    --        Just realPath ->
--    --            List.map (\x -> Tile.toTile x Tile.DarkDgn) realPath
--    --roomsWithCorridors =
--    --    Dict.fromList (List.map toKVPair (corridor ++ tiles))
--    --filledMap =
--    --    fillWithWall roomsWithCorridors
--in
--    ( Dict.fromList (List.map toKVPair tiles), seed' )
--( roomsWithCorridors, seed' )


fillWithWall : Dict Vector Tile -> List Tile
fillWithWall partialMap =
    let
        addWallIfTileDoesNotExist =
            \x y ->
                case Dict.get ( x, y ) partialMap of
                    Nothing ->
                        Tile.toTile ( x, y ) Tile.Rock

                    Just tile ->
                        tile

        dungeonSize =
            .dungeonSize Config.init
    in
        List.Extra.lift2 addWallIfTileDoesNotExist [0..dungeonSize] [0..dungeonSize]


roomToTiles : Room -> Vector -> List Tile
roomToTiles room startPos =
    let
        toWorldPos =
            \localPos -> Vector.add startPos localPos

        items =
            [ ( Tile.DarkDgn, room.floors ), ( Tile.Rock, List.concat room.walls ), ( Tile.Rock, room.corners ) ]

        makeTiles =
            \( tileType, positions ) ->
                positions
                    |> List.map toWorldPos
                    |> List.map (\pos -> Tile.toTile pos tileType)
    in
        List.concat (List.map makeTiles items)
            ++ List.map
                (\( entrance, pos ) ->
                    Tile.toTile (toWorldPos pos) (entranceToTileType entrance)
                )
                room.doors



--generateRooms : Int -> ( Int, List DungeonRoom, Random.Seed ) -> ( List DungeonRoom, Random.Seed )
--generateRooms nRooms ( retries, rooms, seed ) =
--    case ( nRooms, retries ) of
--        ( 0, _ ) ->
--            ( rooms, seed )
--        ( _, 0 ) ->
--            ( rooms, seed )
--        ( n, _ ) ->
--            let
--                ( room, seed' ) =
--                    Room.generate seed
--                ( pos, seed'' ) =
--                    Dice.roll2D 30 seed'
--            in
--                if overlapsRooms room pos rooms then
--                    generateRooms n ( (retries - 1), rooms, seed'' )
--                else
--                    generateRooms (n - 1) ( (retries - 1), (DungeonRoom pos room) :: rooms, seed'' )


overlapsRooms : Room -> Vector -> List DungeonRoom -> Bool
overlapsRooms newRoom pos rooms =
    case rooms of
        [] ->
            False

        dungeonRoom :: restOfRooms ->
            let
                roomBox =
                    ( dungeonRoom.position, Vector.add dungeonRoom.position dungeonRoom.room.dimension )
            in
                if List.any (\x -> Vector.boxIntersect (Vector.add x pos) roomBox) newRoom.corners then
                    True
                else
                    overlapsRooms newRoom pos restOfRooms


entranceToTileType : Entrance -> Tile.TileType
entranceToTileType entrance =
    case entrance of
        Door ->
            Tile.DoorClosed

        --BrokenDoor ->
        --    Tile.DoorBroken
        NoDoor ->
            Tile.DarkDgn


connectRooms : ( Room, Vector ) -> ( Room, Vector ) -> Dict Vector Tile -> Maybe AStar.Path
connectRooms ( r1, r1Offset ) ( r2, r2Offset ) map =
    case ( r1.doors, r2.doors ) of
        ( [], _ ) ->
            Nothing

        ( _, [] ) ->
            Nothing

        ( ( _, start ) :: _, ( _, end ) :: _ ) ->
            AStar.findPath heuristic
                (neighbours map)
                (Vector.add start r1Offset)
                (Vector.add end r2Offset)



--------------------------
-- Corridor pathfinding --
--------------------------


heuristic : Vector -> Vector -> Float
heuristic start end =
    let
        ( dx, dy ) =
            Vector.sub start end
    in
        toFloat (max dx dy)


neighbours : Dict Vector Tile -> Vector -> Set Position
neighbours map position =
    let
        dungeonSize =
            .dungeonSize Config.init

        add =
            \x y -> Vector.add position ( x, y )

        possibleNeighbours =
            \vector ->
                [ add -1 -1, add 0 -1, add 1 -1 ]
                    ++ [ add -1 0, add 1 0 ]
                    ++ [ add -1 1, add 0 1, add 1 1 ]

        isOutOfBounds =
            \( x, y ) ->
                if x > dungeonSize || y > dungeonSize then
                    True
                else if x < 0 || y < 0 then
                    True
                else
                    False

        isObstructed =
            \(( x, y ) as vector) ->
                if isOutOfBounds vector then
                    True
                else
                    case Dict.get vector map of
                        Just tile ->
                            Tile.isSolid tile

                        Nothing ->
                            False
    in
        position
            |> possibleNeighbours
            |> List.filter (\x -> not <| isObstructed x)
            |> Set.fromList
