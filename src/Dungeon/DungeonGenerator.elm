module Dungeon.DungeonGenerator exposing (generate)

import AStar exposing (findPath, Position)
import Dungeon.Config as Config exposing (..)
import Dice exposing (..)
import Dict exposing (..)
import Dungeon.Room as Room exposing (..)
import List.Extra exposing (lift2)
import Random exposing (..)
import Set exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)


type alias Model =
    {}


generate : Random.Seed -> ( Dict Vector Tile, Random.Seed )
generate seed =
    let
        roomSize =
            [0..Config.size]

        toKVPair =
            \tile -> ( tile.position, tile )

        -- TODO: currently not using room
        -- need to incorporate walls, floor, entrances into dungeon
        -- start empty, add rooms, connections, lastly rocks to fill gap
        ( room1, seed1 ) =
            generateRoom seed

        ( room2, _ ) =
            generateRoom seed1

        ( rooms, startPositions, seed' ) =
            generateRooms 3 ( [], [], seed )

        tiles =
            List.concat <| List.map2 (\room pos -> roomToTiles room pos) [ room1, room2 ] startPositions

        map =
            Dict.fromList (List.map toKVPair tiles)

        defaultPosition =
            \x -> Maybe.withDefault ( 0, 0 ) x

        path =
            connectRooms ( room1, defaultPosition <| List.head startPositions )
                ( room2, defaultPosition <| List.head <| List.drop 1 startPositions )
                map

        corridor =
            case path of
                Nothing ->
                    []

                Just realPath ->
                    List.map (\x -> Tile.toTile x Tile.DarkDgn) realPath

        roomsWithCorridors =
            Dict.fromList (List.map toKVPair (corridor ++ tiles))

        filledMap =
            fillWithWall roomsWithCorridors
    in
        --( Dict.fromList (List.map toKVPair filledMap), seed' )
        ( roomsWithCorridors, seed' )


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
    in
        List.Extra.lift2 addWallIfTileDoesNotExist [0..Config.size] [0..Config.size]


roomToTiles : Room -> Vector -> List Tile
roomToTiles room startPos =
    let
        toWorldPos =
            \localPos -> Vector.add startPos localPos

        items =
            [ ( Tile.DarkDgn, room.floors ), ( Tile.Rock, room.walls ) ]

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


generateRooms : Int -> ( List Room, List Vector, Random.Seed ) -> ( List Room, List Vector, Random.Seed )
generateRooms nRooms ( rooms, startPositions, seed ) =
    case nRooms of
        0 ->
            ( rooms, startPositions, seed )

        n ->
            let
                ( newRoom, seed' ) =
                    generateRoom seed

                ( newStartPos, seed'' ) =
                    Dice.roll2D 30 seed'
            in
                generateRooms (n - 1) ( newRoom :: rooms, newStartPos :: startPositions, seed'' )


generateRoom : Random.Seed -> ( Room, Random.Seed )
generateRoom seed =
    Room.generate seed


entranceToTileType : Room.Entrance -> Tile.TileType
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
        add =
            \x y -> Vector.add position ( x, y )

        possibleNeighbours =
            \vector ->
                [ add -1 -1, add 0 -1, add 1 -1 ]
                    ++ [ add -1 0, add 1 0 ]
                    ++ [ add -1 1, add 0 1, add 1 1 ]

        isOutOfBounds =
            \( x, y ) ->
                if x > Config.roomSize || y > Config.roomSize then
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
