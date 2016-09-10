-- temp placeholder for stuff, doesn't compile, don't import


module Main exposing (..)


generate : Config.Model -> Generator Map
generate config =
    let
        model =
            init
    in
        model
            |> toMap
            |> constant


toMap : Model -> Map
toMap model =
    let
        toKVPair tile =
            ( tile.position, tile )
    in
        model.rooms
            |> roomsToTiles
            |> List.map toKVPair
            |> Dict.fromList



--Room.generate config
--    `andThen` Room.generateDoor
--    `andThen` (\room -> constant (addRoomToModel model room))
--    `andThen` (toMap >> constant)


step : Model -> Generator Model
step ({ config, rooms, activeRooms, activeCorridors } as model) =
    constant model


addRoomToModel : Model -> ( DungeonRoom, Door ) -> Model
addRoomToModel model ( dungeonRoom, door ) =
    { model | rooms = dungeonRoom :: model.rooms, activeRooms = (RoomEntrance door) :: model.actives }


{-| Generate dungeon rooms based on the config
-}
generateDungeonRooms : Config.Model -> Int -> DungeonRooms -> Generator DungeonRooms
generateDungeonRooms config num dungeonRooms =
    let
        recurse dungeonRoom =
            generateDungeonRooms config (num - 1) (dungeonRoom :: dungeonRooms)
    in
        if num == 0 then
            Random.Extra.constant dungeonRooms
        else
            Room.generate config
                `andThen` roomToDungeonRoom config
                `andThen` recurse


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


removeOverlaps : DungeonRooms -> Generator DungeonRooms
removeOverlaps rooms =
    let
        overlapFolder room rooms =
            case isOverlapping room rooms of
                True ->
                    let
                        _ =
                            Debug.log "rejected" room
                    in
                        rooms

                False ->
                    let
                        _ =
                            Debug.log "accepted" room
                    in
                        room :: rooms
    in
        Random.Extra.constant <| List.foldl overlapFolder [] rooms


isOverlapping : DungeonRoom -> List DungeonRoom -> Bool
isOverlapping room rooms =
    let
        end room =
            Vector.add room.position room.room.dimension

        roomStart =
            room.position

        roomEnd =
            end room
    in
        case rooms of
            [] ->
                False

            firstRoom :: xs ->
                let
                    firstRoomStart =
                        firstRoom.position

                    firstRoomEnd =
                        Vector.add firstRoom.position firstRoom.room.dimension

                    intersects =
                        { startX = Vector.boxIntersectXAxis (fst roomStart) ( firstRoomStart, firstRoomEnd )
                        , endX = Vector.boxIntersectXAxis (fst roomEnd) ( firstRoomStart, firstRoomEnd )
                        , startY = Vector.boxIntersectYAxis (snd roomStart) ( firstRoomStart, firstRoomEnd )
                        , endY = Vector.boxIntersectYAxis (snd roomEnd) ( firstRoomStart, firstRoomEnd )
                        }
                in
                    if (intersects.startX || intersects.endX) && (intersects.startY || intersects.endY) then
                        True
                    else
                        isOverlapping room xs


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

        add x y =
            Vector.add position ( x, y )

        possibleNeighbours vector =
            [ add -1 -1, add 0 -1, add 1 -1 ]
                ++ [ add -1 0, add 1 0 ]
                ++ [ add -1 1, add 0 1, add 1 1 ]

        isOutOfBounds ( x, y ) =
            if x > dungeonSize || y > dungeonSize then
                True
            else if x < 0 || y < 0 then
                True
            else
                False

        isObstructed (( x, y ) as vector) =
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