module Dungeon.Clean exposing (clean)

import Dict exposing (Dict)
import Dungeon.Corridor as Corridor exposing (Corridor)
import Dungeon.Entrance as Entrance exposing (Entrance)
import Dungeon.Room as Room exposing (Room)
import Dungeon.Rooms.Config as Config
import Dungeon.Types as Types
import Level
import List.Extra
import Maybe.Extra exposing (..)
import Tile exposing (Tile)
import Utils.Direction exposing (Direction(..), Directions)
import Utils.Vector as Vector exposing (Vector)


cleanRoom : Room -> Maybe Entrance -> Room
cleanRoom room maybeEntrance =
    case maybeEntrance of
        Maybe.Nothing ->
            room

        Just entrance ->
            Room.removeEntrance entrance room


{-| Removes active entrances from rooms and
    end corridors that will hit walls with a single door room.
-}
clean : Types.Model -> Types.Model
clean ({ rooms, corridors, activePoints } as model) =
    case activePoints of
        (Types.ActiveRoom room maybeEntrance) :: remainingPoints ->
            clean
                { model
                    | rooms = cleanRoom room maybeEntrance :: rooms
                    , activePoints = remainingPoints
                }

        (Types.ActiveCorridor corridor) :: remainingPoints ->
            let
                modelWithRemainingPoints =
                    { model
                        | activePoints = remainingPoints
                    }

                modelWithInactiveCorridorRemainingPoints =
                    { modelWithRemainingPoints
                        | corridors = corridor :: corridors
                    }

                ( startPosition, startDirection ) =
                    Corridor.end corridor

                startDirectionVector =
                    Vector.fromDirection startDirection

                addCorridor c m =
                    { m | corridors = c :: m.corridors }
            in
                case firstObstacle startDirectionVector startPosition modelWithRemainingPoints of
                    -- hits map edge, no obstacles
                    ( Maybe.Nothing, Maybe.Nothing, _, _ ) ->
                        clean
                            { modelWithInactiveCorridorRemainingPoints
                                | rooms = Room.newDeadEnd (Vector.add startPosition startDirectionVector) :: rooms
                            }

                    -- hits a room, join to the room with a door
                    ( Just room, _, newCorridorEndPosition, newEntrancePosition ) ->
                        let
                            corridor_ =
                                Corridor.add ( newCorridorEndPosition, startDirection ) corridor

                            room_ =
                                Room.addEntrance (Entrance.init Entrance.Door newEntrancePosition) room
                        in
                            modelWithRemainingPoints
                                |> addCorridor corridor_
                                |> findAndUpdateRoom room_
                                |> clean

                    -- hits another corridor, join to the corridor with dungeon floor
                    ( _, Just joinedCorridor, newCorridorEndPosition, joinedCorridorNewFloor ) ->
                        let
                            corridor_ =
                                Corridor.add ( newCorridorEndPosition, startDirection ) corridor

                            joinedCorridor_ =
                                Corridor.addEntrance joinedCorridorNewFloor joinedCorridor
                        in
                            modelWithRemainingPoints
                                |> addCorridor corridor_
                                |> findAndUpdateCorridor joinedCorridor_
                                |> clean

        [] ->
            addWalls model



---------------
-- Add walls --
---------------


addWalls : Types.Model -> Types.Model
addWalls model =
    let
        { map } =
            Types.toLevel model

        mapPoints =
            Dict.keys map

        isNotAMapPoint point =
            List.all ((/=) point) mapPoints

        allPoints =
            List.Extra.lift2 (,) (List.range 1 model.config.dungeonSize) (List.range 1 model.config.dungeonSize)

        walls =
            allPoints
                |> List.filter isNotAMapPoint
                |> List.map (calculateTypeOfWall map)
    in
        { model | walls = walls }


calculateTypeOfWall : Level.Map -> Vector -> Tile
calculateTypeOfWall map position =
    case ( hasAdjacentFloors position map, hasThreeOrMoreNeighbourFloors position map ) of
        ( True, True ) ->
            Tile.toTile position Tile.DarkDgn

        ( True, False ) ->
            Tile.toTile position Tile.WallDarkDgn

        _ ->
            Tile.toTile position Tile.Rock


adjacentNeighbourPairs : List Directions
adjacentNeighbourPairs =
    [ [ N, E ]
    , [ E, S ]
    , [ S, W ]
    , [ W, N ]
    ]


adjacentNeighbourTriplets : List Directions
adjacentNeighbourTriplets =
    [ [ N, E, S ]
    , [ E, S, W ]
    , [ S, W, N ]
    , [ W, N, E ]
    ]


hasThreeOrMoreNeighbourFloors : Vector -> Level.Map -> Bool
hasThreeOrMoreNeighbourFloors position map =
    allDirectionsAreFloors adjacentNeighbourTriplets position map


hasAdjacentFloors : Vector -> Level.Map -> Bool
hasAdjacentFloors position map =
    allDirectionsAreFloors adjacentNeighbourPairs position map


allDirectionsAreFloors : List Directions -> Vector -> Level.Map -> Bool
allDirectionsAreFloors neighbourDirections position map =
    let
        toNeighbours directions =
            directions
                |> List.map Vector.fromDirection
                |> List.map (Vector.add position)
                |> List.map (flip Dict.get map)

        isFloorTiles maybeTiles =
            maybeTiles
                |> List.map (Maybe.Extra.filter (\x -> Tile.tileType x == Tile.DarkDgn))
                |> List.all ((/=) Nothing)
    in
        neighbourDirections
            |> List.map toNeighbours
            |> List.any isFloorTiles


neighbours : Vector -> Level.Map -> ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )
neighbours position map =
    let
        getTile direction =
            direction
                |> Vector.fromDirection
                |> Vector.add position
                |> flip Dict.get map
    in
        ( getTile N, getTile E, getTile S, getTile W )


findAndUpdateRoom : Room -> Types.Model -> Types.Model
findAndUpdateRoom targetRoom ({ rooms, activePoints } as model) =
    let
        targetRoomPosition =
            Room.position targetRoom

        update room updatedRooms =
            if targetRoomPosition == Room.position room then
                targetRoom :: updatedRooms
            else
                room :: updatedRooms

        rooms_ =
            List.foldl update [] rooms

        updateActivePoints pt updatedPoints =
            case pt of
                Types.ActiveRoom room entrances ->
                    if targetRoomPosition == Room.position room then
                        Types.ActiveRoom targetRoom entrances :: updatedPoints
                    else
                        Types.ActiveRoom room entrances :: updatedPoints

                someOtherPoint ->
                    someOtherPoint :: updatedPoints

        activePoints_ =
            List.foldl updateActivePoints [] activePoints
    in
        { model | rooms = rooms_, activePoints = activePoints_ }


findAndUpdateCorridor : Corridor -> Types.Model -> Types.Model
findAndUpdateCorridor targetCorridor ({ corridors, activePoints } as model) =
    let
        ( targetCorridorPosition, _ ) =
            Corridor.end targetCorridor

        update corridor updatedCorridors =
            if targetCorridorPosition == (Tuple.first <| Corridor.end corridor) then
                targetCorridor :: updatedCorridors
            else
                corridor :: updatedCorridors

        corridors_ =
            List.foldl update [] corridors

        updateActivePoints pt updatedPoints =
            case pt of
                Types.ActiveCorridor corridor ->
                    if targetCorridorPosition == (Tuple.first <| Corridor.end corridor) then
                        Types.ActiveCorridor targetCorridor :: updatedPoints
                    else
                        Types.ActiveCorridor corridor :: updatedPoints

                someOtherPoint ->
                    someOtherPoint :: updatedPoints

        activePoints_ =
            List.foldl updateActivePoints [] activePoints
    in
        { model | corridors = corridors_, activePoints = activePoints_ }


{-| Returns the first room or corridor encountered and the point prior just before hitting
    the obstacle as well as the point where it hits the obstacle.
-}
firstObstacle : Vector -> Vector -> Types.Model -> ( Maybe Room, Maybe Corridor, Vector, Vector )
firstObstacle digDirectionVector (( x, y ) as currentPosition) ({ rooms, corridors, activePoints, config } as model) =
    if not <| Config.withinDungeonBounds currentPosition config then
        ( Maybe.Nothing, Maybe.Nothing, ( 0, 0 ), ( 0, 0 ) )
    else
        case query currentPosition model of
            ( Maybe.Nothing, Maybe.Nothing ) ->
                firstObstacle digDirectionVector (Vector.add digDirectionVector currentPosition) model

            ( r, c ) ->
                ( r, c, Vector.sub currentPosition digDirectionVector, currentPosition )



---------------------------------------------------------
-- Update room/corridor in model via world coordinates --
---------------------------------------------------------


query : Vector -> Types.Model -> ( Maybe Room, Maybe Corridor )
query position { rooms, corridors, activePoints } =
    let
        maybeRoom =
            (rooms
                ++ (List.filterMap activePointToRoom activePoints)
            )
                |> List.filter (\room -> Room.isCollision room position)
                |> List.head

        maybeCorridor =
            (corridors
                ++ (List.filterMap activePointToCorridor activePoints)
            )
                |> List.filter (Corridor.isCollision position)
                |> List.head
    in
        ( maybeRoom, maybeCorridor )


activePointToRoom : Types.ActivePoint -> Maybe Room
activePointToRoom activePoint =
    case activePoint of
        Types.ActiveRoom room _ ->
            Just room

        _ ->
            Nothing


activePointToCorridor : Types.ActivePoint -> Maybe Corridor
activePointToCorridor activePoint =
    case activePoint of
        Types.ActiveCorridor corridor ->
            Just corridor

        _ ->
            Nothing
