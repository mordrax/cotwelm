module Dungeon.DungeonGenerator
    exposing
        ( step
        , toTiles
        , init
        , Model
        , clean
        )

import Dungeon.Rooms.Config as Config exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Dungeon.Corridor as Corridor exposing (..)
import Dungeon.Room as Room exposing (..)
import Dice exposing (..)
import Random.Pcg as Random exposing (..)
import Tile exposing (..)
import Utils.Vector as Vector exposing (..)
import Game.Maps as Maps exposing (..)
import Lodash exposing (..)
import List.Extra exposing (dropWhile)
import Utils.CompassDirection exposing (..)
import Maybe.Extra exposing (..)
import Dict
import Set


{-| The dungeon generator module creates a dungeon progressively by allowing the caller
to use the returned Generator type to step through a dungeon creation. The caller can
hook the generator up to a UI and have the user see it being created one step at a
time or it can be called in a fold and generated programmatically.

The strategy used here is like that of a miner with the overarching goal of making
a dungeon that looks like the original Castle of the Winds.

The algorithm is as follows:
1. On initialise, create a room, this will be the entrance to the level with a
   randomly generated up staircase.

2. On each call to 'step', look through the 'active' rooms and corridors. Pick the
   first active room found. Or the first active corridor if there is no active rooms.
   If there are neither active rooms nor corridor, end the step.

3a Given a active room, if there is an unconnected entrance

Active -
   A room or corridor which is still being explored. Once a room or corridor
   has all their entrances connected, and cannot hold any more entrances as
   dictated by the config model, they are no longer active and moved out of
   activePoints.
-}



-- types


type alias Model =
    { config : Config.Model
    , rooms : Rooms
    , corridors : Corridors
    , activePoints : ActivePoints
    , walls : Tiles
    }


type alias ActivePoints =
    List ActivePoint


type ActivePoint
    = ActiveRoom Room (Maybe Entrance)
    | ActiveCorridor Corridor


init : Config.Model -> Generator Model
init config =
    let
        model =
            Model config [] [] [] []

        addRoomToModel room =
            { model | activePoints = [ ActiveRoom room Maybe.Nothing ], rooms = [] }
    in
        Random.map addRoomToModel (Room.generate config)


{-| Removes active entrances from rooms and
    end corridors that will hit walls with a single door room.
-}
clean : Model -> Model
clean ({ rooms, corridors, activePoints } as model) =
    case activePoints of
        (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
            clean
                { model
                    | rooms = room :: rooms
                    , activePoints = remainingPoints
                }

        (ActiveRoom room (Just entrance)) :: remainingPoints ->
            let
                cleanedRoom =
                    Room.removeEntrance entrance room

                modelWithCleanedRoom =
                    { model | rooms = cleanedRoom :: rooms, activePoints = remainingPoints }
            in
                clean modelWithCleanedRoom

        (ActiveCorridor corridor) :: remainingPoints ->
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
                        let
                            _ =
                                Debug.log "Clean - hitting edge, create dead end"
                                    { deadEndPosition = (Vector.add startPosition startDirectionVector)
                                    }
                        in
                            clean
                                { modelWithInactiveCorridorRemainingPoints
                                    | rooms = Room.newDeadEnd (Vector.add startPosition startDirectionVector) :: rooms
                                }

                    -- hits a room, join to the room with a door
                    ( Just room, _, newCorridorEndPosition, newEntrancePosition ) ->
                        let
                            corridor' =
                                Corridor.add ( newCorridorEndPosition, startDirection ) corridor

                            room' =
                                Room.addEntrance (Entrance.init Door newEntrancePosition) room

                            _ =
                                Debug.log "Clean - join room"
                                    { corridor = Corridor.pp corridor
                                    , newEndPoint = ( newCorridorEndPosition, startDirection )
                                    , room = Room.pp room
                                    , newEntrance = (Entrance.init Door newEntrancePosition)
                                    }
                        in
                            modelWithRemainingPoints
                                |> addCorridor corridor'
                                |> findAndUpdateRoom room'
                                |> clean

                    -- hits another corridor, join to the corridor with dungeon floor
                    ( _, Just joinedCorridor, newCorridorEndPosition, joinedCorridorNewFloor ) ->
                        let
                            corridor' =
                                Corridor.add ( newCorridorEndPosition, startDirection ) corridor

                            joinedCorridor' =
                                Corridor.addEntrance joinedCorridorNewFloor joinedCorridor

                            _ =
                                Debug.log "DungeonGenerator join corridor"
                                    { corridor = Corridor.pp corridor
                                    , corridorNewEnd = ( newCorridorEndPosition, startDirection )
                                    , joinedCorridorNewFloor = joinedCorridorNewFloor
                                    }
                        in
                            modelWithRemainingPoints
                                |> addCorridor corridor'
                                |> findAndUpdateCorridor joinedCorridor'
                                |> clean

        [] ->
            addWalls model



---------------
-- Add walls --
---------------


addWalls : Model -> Model
addWalls model =
    let
        map =
            toMap model

        mapPoints =
            Dict.keys map

        isNotAMapPoint point =
            List.all ((/=) point) mapPoints

        allPoints =
            List.Extra.lift2 (,) [1..model.config.dungeonSize] [1..model.config.dungeonSize]

        walls =
            allPoints
                |> List.filter isNotAMapPoint
                |> List.map (calculateTypeOfWall map)
    in
        { model | walls = walls }


calculateTypeOfWall : Map -> Vector -> Tile
calculateTypeOfWall map position =
    case ( hasAdjacentFloors position map, hasThreeOrMoreNeighbourFloors position map ) of
        ( True, True ) ->
            Tile.toTile position Tile.DarkDgn

        ( True, False ) ->
            Tile.toTile position Tile.WallDarkDgn

        _ ->
            Tile.toTile position Tile.Rock


adjacentNeighbourPairs : List CompassDirections
adjacentNeighbourPairs =
    [ [ N, E ]
    , [ E, S ]
    , [ S, W ]
    , [ W, N ]
    ]


adjacentNeighbourTriplets : List CompassDirections
adjacentNeighbourTriplets =
    [ [ N, E, S ]
    , [ E, S, W ]
    , [ S, W, N ]
    , [ W, N, E ]
    ]


hasThreeOrMoreNeighbourFloors : Vector -> Map -> Bool
hasThreeOrMoreNeighbourFloors position map =
    allDirectionsAreFloors adjacentNeighbourTriplets position map


hasAdjacentFloors : Vector -> Map -> Bool
hasAdjacentFloors position map =
    allDirectionsAreFloors adjacentNeighbourPairs position map


allDirectionsAreFloors : List CompassDirections -> Vector -> Map -> Bool
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


neighbours : Vector -> Map -> ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )
neighbours position map =
    let
        getTile direction =
            direction
                |> Vector.fromDirection
                |> Vector.add position
                |> flip Dict.get map
    in
        ( getTile N, getTile E, getTile S, getTile W )



---------------------------------------------------------
-- Update room/corridor in model via world coordinates --
---------------------------------------------------------


findAndUpdateRoom : Room -> Model -> Model
findAndUpdateRoom targetRoom ({ rooms, activePoints } as model) =
    let
        targetRoomPosition =
            Room.position targetRoom

        update room updatedRooms =
            if targetRoomPosition == Room.position room then
                targetRoom :: updatedRooms
            else
                room :: updatedRooms

        rooms' =
            List.foldl update [] rooms

        updateActivePoints pt updatedPoints =
            case pt of
                ActiveRoom room entrances ->
                    if targetRoomPosition == Room.position room then
                        ActiveRoom targetRoom entrances :: updatedPoints
                    else
                        ActiveRoom room entrances :: updatedPoints

                someOtherPoint ->
                    someOtherPoint :: updatedPoints

        activePoints' =
            List.foldl updateActivePoints [] activePoints
    in
        { model | rooms = rooms', activePoints = activePoints' }


findAndUpdateCorridor : Corridor -> Model -> Model
findAndUpdateCorridor targetCorridor ({ corridors, activePoints } as model) =
    let
        ( targetCorridorPosition, _ ) =
            Corridor.end targetCorridor

        update corridor updatedCorridors =
            if targetCorridorPosition == (fst <| Corridor.end corridor) then
                targetCorridor :: updatedCorridors
            else
                corridor :: updatedCorridors

        corridors' =
            List.foldl update [] corridors

        updateActivePoints pt updatedPoints =
            case pt of
                ActiveCorridor corridor ->
                    if targetCorridorPosition == (fst <| Corridor.end corridor) then
                        ActiveCorridor targetCorridor :: updatedPoints
                    else
                        ActiveCorridor corridor :: updatedPoints

                someOtherPoint ->
                    someOtherPoint :: updatedPoints

        activePoints' =
            List.foldl updateActivePoints [] activePoints
    in
        { model | corridors = corridors', activePoints = activePoints' }


{-| Returns the first room or corridor encountered and the point prior just before hitting
    the obstacle as well as the point where it hits the obstacle.
-}
firstObstacle : Vector -> Vector -> Model -> ( Maybe Room, Maybe Corridor, Vector, Vector )
firstObstacle digDirectionVector (( x, y ) as currentPosition) ({ rooms, corridors, activePoints, config } as model) =
    if not <| Config.withinDungeonBounds currentPosition config then
        ( Maybe.Nothing, Maybe.Nothing, ( 0, 0 ), ( 0, 0 ) )
    else
        case query currentPosition model of
            ( Maybe.Nothing, Maybe.Nothing ) ->
                firstObstacle digDirectionVector (Vector.add digDirectionVector currentPosition) model

            ( r, c ) ->
                ( r, c, Vector.sub currentPosition digDirectionVector, currentPosition )


query : Vector -> Model -> ( Maybe Room, Maybe Corridor )
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


activePointToRoom : ActivePoint -> Maybe Room
activePointToRoom activePoint =
    case activePoint of
        ActiveRoom room _ ->
            Just room

        _ ->
            Nothing


activePointToCorridor : ActivePoint -> Maybe Corridor
activePointToCorridor activePoint =
    case activePoint of
        ActiveCorridor corridor ->
            Just corridor

        _ ->
            Nothing


{-| For each of the active rooms and corridors, generate another 'step'.
For a room this could be make doors if the room has no doors or for a corridor
this could be create a dead end, link up to a room etc.
-}
step : Model -> Generator Model
step model =
    let
        printPoint point =
            case point of
                ActiveRoom room _ ->
                    Room.pp room

                ActiveCorridor corridor ->
                    Corridor.pp corridor

        print steppedModel =
            Debug.log "DungeonGenerator.step"
                { rooms = List.map Room.pp steppedModel.rooms
                , corridors = List.map Corridor.pp steppedModel.corridors
                , activePoints = List.map printPoint steppedModel.activePoints
                }
    in
        shuffle model.activePoints
            `andThen` \x ->
                        step' { model | activePoints = x }
                            `andThen` \model ->
                                        let
                                            _ =
                                                print model
                                        in
                                            constant model


step' : Model -> Generator Model
step' ({ activePoints } as model) =
    case activePoints of
        -- when nothing's active, no more exploration
        [] ->
            constant model

        (ActiveRoom room (Maybe.Nothing)) :: remainingPoints ->
            generateEntrance room { model | activePoints = remainingPoints }

        -- make a corridor from a existing entrance
        (ActiveRoom room (Just entrance)) :: remainingPoints ->
            let
                modelWithActiveRoom corridor =
                    { model
                        | activePoints =
                            ActiveCorridor corridor
                                :: ActiveRoom room (Maybe.Nothing)
                                :: remainingPoints
                    }

                updateModel corridor =
                    if canFitCorridor model corridor then
                        modelWithActiveRoom corridor
                    else
                        model

                ( startPosition, entranceFacing ) =
                    corridorStartFromRoomEntrance room entrance
            in
                Corridor.generate startPosition entranceFacing model.config
                    |> Random.map updateModel

        -- pick a active corridor and dig a room
        (ActiveCorridor corridor) :: remainingPoints ->
            let
                modelWithoutActiveCorridor =
                    { model | activePoints = remainingPoints }

                modelWithInactiveCorridor =
                    { modelWithoutActiveCorridor | corridors = corridor :: model.corridors }
            in
                generateActivePointFromCorridor corridor model
                    |> Random.map
                        (\activePoint ->
                            case activePoint of
                                (ActiveCorridor corridor) as activePoint ->
                                    if canFitCorridor modelWithoutActiveCorridor corridor then
                                        { modelWithoutActiveCorridor
                                            | activePoints = activePoint :: remainingPoints
                                        }
                                    else
                                        model

                                (ActiveRoom room _) as activePoint ->
                                    if canFitRoom model room then
                                        { modelWithInactiveCorridor
                                            | activePoints = activePoint :: remainingPoints
                                        }
                                    else
                                        model
                        )


corridorStartFromRoomEntrance : Room -> Entrance -> ( Vector, CompassDirection )
corridorStartFromRoomEntrance room entrance =
    let
        roomEntrancePosition =
            Entrance.position entrance

        roomEntranceFacing =
            Room.entranceFacing room entrance

        corridorEntranceFacing =
            Vector.oppositeDirection roomEntranceFacing

        corridorStartPosition =
            roomEntranceFacing
                |> Vector.fromDirection
                |> Vector.add roomEntrancePosition
    in
        ( corridorStartPosition, corridorEntranceFacing )


generateActivePointFromCorridor : Corridor -> Model -> Generator ActivePoint
generateActivePointFromCorridor corridor model =
    let
        activeRoom =
            generateRoom corridorEnd model.config
                |> Random.map (\room -> ActiveRoom room (Maybe.Nothing))

        activeCorridor =
            Corridor.extend corridor model.config
                |> Random.map (\corridor -> ActiveCorridor corridor)

        corridorEnd =
            Corridor.end corridor
    in
        choices [ activeRoom, activeCorridor ]


{-| Generate a new entrance for a room, then adds the room/entrance as a
    active point
-}
generateEntrance : Room -> Model -> Generator Model
generateEntrance room ({ config } as model) =
    let
        isRoomAtMaxEntrances =
            (room |> Room.entrances |> List.length) >= config.maxEntrances

        modelWithActiveRoomRemoved =
            { model | rooms = room :: model.rooms }

        mapEntranceToModel ( room', entrance ) =
            { model
                | activePoints = ActiveRoom room' (Just entrance) :: model.activePoints
            }
    in
        if isRoomAtMaxEntrances then
            constant modelWithActiveRoomRemoved
        else
            Random.map mapEntranceToModel (Room.generateEntrance room)


generateRoom : DirectedVector -> Config.Model -> Generator Room
generateRoom corridorEnding config =
    Room.generate config
        `andThen` Room.placeRoom corridorEnding



---------------
-- Collision --
---------------


canFitCorridor : Model -> Corridor -> Bool
canFitCorridor model corridor =
    let
        occupiedPositions =
            toOccupied model

        corridorPositions =
            (List.map Tile.position (Corridor.toTiles corridor))
                ++ (Corridor.boundary corridor)

        inModelTiles tile =
            List.any ((==) tile) occupiedPositions

        withinBounds =
            List.all (\x -> Config.withinDungeonBounds x model.config) corridorPositions

        overlappingTiles =
            corridorPositions
                |> List.filter inModelTiles

        canFit =
            List.isEmpty overlappingTiles

        _ =
            Debug.log "DungeonGenerator.canFitCorridor"
                { canFit = canFit
                , corridor = Corridor.pp corridor
                }
    in
        canFit && withinBounds


canFitRoom : Model -> Room -> Bool
canFitRoom model room =
    let
        modelPositions =
            toOccupied model
                |> Set.fromList

        roomPositions =
            (room
                |> Room.toTiles
                |> List.map Tile.position
            )
                ++ (Room.boundary room)

        roomPositionSet =
            Set.fromList roomPositions

        withinBounds =
            List.all (\x -> Config.withinDungeonBounds x model.config) roomPositions

        collisions =
            Set.toList <| Set.intersect roomPositionSet modelPositions

        _ =
            Debug.log "DungeonGenerator.canFitRoom"
                { collisions = collisions
                , roomPosition = roomPositions
                }
    in
        withinBounds && List.isEmpty collisions



------------------
-- Model to Map --
------------------


toMap : Model -> Map
toMap model =
    model
        |> toTiles
        |> Maps.fromTiles


toOccupied : Model -> Vectors
toOccupied { rooms, corridors, activePoints } =
    let
        ( activeRooms, activeCorridors ) =
            List.foldl roomsAndCorridorsFromActivePoint ( [], [] ) activePoints

        roomVectors =
            (rooms ++ activeRooms)
                |> List.map Room.boundary
                |> List.concat

        corridorVectors =
            (corridors ++ activeCorridors)
                |> List.map Corridor.boundary
                |> List.concat
    in
        roomVectors ++ corridorVectors


toTiles : Model -> Tiles
toTiles { rooms, corridors, activePoints, walls } =
    let
        ( activeRooms, activeCorridors ) =
            List.foldl roomsAndCorridorsFromActivePoint ( [], [] ) activePoints

        roomTiles =
            (rooms ++ activeRooms)
                |> List.map Room.toTiles
                |> List.concat

        corridorTiles =
            (corridors ++ activeCorridors)
                |> List.map Corridor.toTiles
                |> List.concat
    in
        roomTiles ++ corridorTiles ++ walls


roomsAndCorridorsFromActivePoint : ActivePoint -> ( Rooms, Corridors ) -> ( Rooms, Corridors )
roomsAndCorridorsFromActivePoint point ( rooms, corridors ) =
    case point of
        ActiveRoom room _ ->
            ( room :: rooms, corridors )

        ActiveCorridor corridor ->
            ( rooms, corridor :: corridors )
