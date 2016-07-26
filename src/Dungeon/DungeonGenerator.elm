module Dungeon.DungeonGenerator exposing (generate)

import Random exposing (..)
import Dict exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import List.Extra exposing (lift2)
import Dungeon.Room as Room exposing (..)
import Dice exposing (..)
import AStar exposing (findPath, Position)
import Set exposing (..)


type alias Model =
    {}


generate : Random.Seed -> ( Dict Vector Tile, Random.Seed )
generate seed =
    let
        roomSize =
            [0..30]

        toKVPair =
            \tile -> ( tile.position, tile )

        -- TODO: currently not using room
        -- need to incorporate walls, floor, entrances into dungeon
        -- start empty, add rooms, connections, lastly rocks to fill gap
        ( room1, _ ) =
            generateRoom seed 9

        ( room2, _ ) =
            generateRoom seed 5

        ( rooms, startPositions, seed' ) =
            generateRooms 3 ( [], [], seed )

        tiles =
            List.concat <| List.map2 (\room pos -> roomToTiles room pos) [ room1, room2 ] startPositions

        map =
            Dict.fromList (List.map toKVPair tiles)

        path =
            connectRooms room1 room2 map

        _ =
            Debug.log "pathfinding"
                { room1 = room1
                , room2 = room2
                , path = path
                }

        corridor =
            case path of
                Nothing ->
                    []

                Just realPath ->
                    List.map (\x -> Tile.toTile x Tile.DarkDgn) realPath
    in
        ( Dict.fromList (List.map toKVPair (corridor ++ tiles)), seed' )


roomToTiles : Room -> Vector -> List Tile
roomToTiles room startPos =
    let
        ( doors, walls, floor ) =
            Room.design room

        toWorldPos =
            \localPos -> Vector.add startPos localPos

        items =
            [ ( Tile.DarkDgn, floor ), ( Tile.Rock, walls ) ]

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
                doors


generateRooms : Int -> ( List Room, List Vector, Random.Seed ) -> ( List Room, List Vector, Random.Seed )
generateRooms nRooms ( rooms, startPositions, seed ) =
    case nRooms of
        0 ->
            ( rooms, startPositions, seed )

        n ->
            let
                ( newRoom, seed' ) =
                    generateRoom seed 9

                ( newStartPos, seed'' ) =
                    Dice.roll2D 30 seed'
            in
                generateRooms (n - 1) ( newRoom :: rooms, newStartPos :: startPositions, seed'' )


generateRoom : Random.Seed -> Int -> ( Room, Random.Seed )
generateRoom seed size =
    Room.new Room.Rectangular size seed


entranceToTileType : Room.Entrance -> Tile.TileType
entranceToTileType entrance =
    case entrance of
        Door ->
            Tile.DoorClosed

        BrokenDoor ->
            Tile.DoorBroken

        NoDoor ->
            Tile.DarkDgn


connectRooms : Room -> Room -> Dict Vector Tile -> Maybe AStar.Path
connectRooms r1 r2 map =
    let
        ( door1, _, _ ) =
            Room.design r1

        ( door2, _, _ ) =
            Room.design r2
    in
        case ( door1, door2 ) of
            ( [], _ ) ->
                Nothing

            ( _, [] ) ->
                Nothing

            ( ( _, start ) :: _, ( _, end ) :: _ ) ->
                AStar.findPath heuristic (neighbours map) start end



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

        notObstructed =
            \vector ->
                case Dict.get vector map of
                    Just tile ->
                        not (Tile.isSolid tile)

                    Nothing ->
                        True
    in
        position
            |> possibleNeighbours
            |> List.filter notObstructed
            |> Set.fromList
