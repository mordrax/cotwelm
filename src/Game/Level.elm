module Game.Level
    exposing
        ( Level
        , Map
        , downstairs
        , draw
        , drop
        , drops
        , pickup
        , fromTiles
        , generateMonsters
        , getPath
        , getTile
        , ground
        , initNonDungeon
        , insertPath
        , obstructed
        , queryPosition
        , setMonsters
        , size
        , toScreenCoords
        , updateFOV
        , updateGround
        , upstairs
        , view
        )

import Building exposing (Building)
import Container exposing (Container)
import Dict exposing (Dict)
import Dungeon.Corridor as Corridor exposing (Corridor)
import Dungeon.Room as Room exposing (Room)
import Item exposing (Item)
import Monster exposing (Monster)
import Tile exposing (Tile)
import Tile.Types
import Types exposing (..)
import Utils.BresenhamLine as BresenhamLine
import Utils.Vector as Vector exposing (Vector)
import Utils.FieldOfView
import Set
import Random.Pcg as Random exposing (Generator)
import Utils.Misc as Misc
import Html exposing (..)
import List.Extra as ListX


type alias Map =
    Dict Vector Tile


type alias MemoisedPaths =
    Dict ( Vector, Vector ) (List Vector)


type alias Level =
    { map : Map
    , buildings : List Building
    , monsters : List Monster
    , rooms : List Room
    , corridors : List Corridor
    , paths : MemoisedPaths
    }


type Msg
    = NoOp


insertPath : Vector -> Vector -> List Vector -> Level -> Level
insertPath from to path ({ paths } as level) =
    paths
        |> Dict.insert ( from, to ) path
        |> Dict.insert ( to, from ) (List.reverse path)
        |> (\newPaths -> { level | paths = newPaths })


getPath : Vector -> Vector -> Level -> Maybe (List Vector)
getPath from to { paths } =
    Dict.get ( from, to ) paths


setTile : Level -> Tile -> Level
setTile ({ map } as level) tile =
    { level | map = Dict.insert tile.position tile map }


setMonsters : List Monster -> Level -> Level
setMonsters monsters level =
    { level | monsters = monsters }


initNonDungeon : List Tile -> List Building -> List Monster -> Level
initNonDungeon tiles buildings monsters =
    { map = fromTiles tiles
    , buildings = buildings
    , monsters = monsters
    , rooms = []
    , corridors = []
    , paths = Dict.empty
    }


generateMonsters : Level -> Generator Level
generateMonsters level =
    Misc.shuffle (floors level)
        |> Random.map (List.take 15)
        |> Random.andThen Monster.makeRandomMonsters
        |> Random.map (\monsters -> { level | monsters = monsters })


fromTiles : List Tile -> Map
fromTiles tiles =
    let
        toKVPair tile =
            ( tile.position, tile )
    in
        tiles
            |> List.map toKVPair
            |> Dict.fromList


upstairs : Level -> Maybe Building
upstairs model =
    Building.byType Building.StairUp model.buildings
        |> List.head


downstairs : Level -> Maybe Building
downstairs model =
    Building.byType Building.StairDown model.buildings
        |> List.head


{-| Get the width and height of a map
-}
size : Level -> Vector
size { map } =
    let
        positions =
            Dict.keys map

        ( maxX, maxY ) =
            List.foldr (\( a, b ) ( c, d ) -> ( max a c, max b d )) ( 0, 0 ) positions
    in
        ( maxX + 1, maxY + 1 )


roomAtPosition : Vector -> List Room -> Maybe Room
roomAtPosition pos rooms =
    let
        inRoom room =
            Vector.boxIntersectVector pos ( room.worldPos, Vector.add room.worldPos room.dimension )
    in
        List.filter inRoom rooms
            |> List.head


buildingAtPosition : Vector -> List Building -> Maybe Building
buildingAtPosition pos buildings =
    let
        buildingsAtTile =
            List.filter (Building.isBuildingAtPosition pos) buildings
    in
        case buildingsAtTile of
            b :: rest ->
                Just b

            _ ->
                Nothing


toScreenCoords : Map -> Int -> Map
toScreenCoords map mapSize =
    let
        invertY ( ( x, y ), tile ) =
            ( ( x, mapSize - y ), Tile.setPosition ( x, mapSize - y ) tile )
    in
        map
            |> Dict.toList
            |> List.map invertY
            |> Dict.fromList


updateGround : Vector -> List Item -> Level -> Level
updateGround pos payload model =
    let
        maybeTile =
            Dict.get pos model.map
                |> Maybe.map (Tile.updateGround payload)
    in
        case maybeTile of
            Nothing ->
                model

            Just tile ->
                { model | map = Dict.insert pos tile model.map }


pickup : Vector -> Level -> ( Level, List Item )
pickup position level =
    let
        levelWithClearedTile ( items, clearedTile ) =
            ( setTile level clearedTile, items )
    in
        level
            |> getTile position
            |> Maybe.map Tile.pickup
            |> Maybe.map levelWithClearedTile
            |> Maybe.withDefault ( level, [] )


ground : Vector -> Level -> List Item
ground position { map } =
    Dict.get position map
        |> Maybe.map (.ground >> Container.list)
        |> Maybe.withDefault []


{-| Drop an item on the level.
-}
drop : ( Vector, Item ) -> Level -> Level
drop ( position, item ) ({ map } as level) =
    level
        |> getTile position
        |> Maybe.map (Tile.drop item >> setTile level)
        |> Maybe.withDefault level


drops : ( Vector, List Item ) -> Level -> Level
drops ( position, items ) level =
    List.foldl drop level (ListX.lift2 (,) [ position ] items)


floors : Level -> List Vector
floors { map } =
    map
        |> Dict.toList
        |> List.map Tuple.second
        |> List.filter (.solid >> not)
        |> List.map .position


{-| Work out if there is a (solid tile, building, monster) at the given position on the level.
-}
queryPosition : Vector -> Level -> ( Bool, Maybe Building, Maybe Monster )
queryPosition position ({ monsters, buildings, map } as level) =
    let
        maybeBuilding =
            buildingAtPosition position buildings

        maybeMonster =
            monsters
                |> List.filter (.position >> (==) position)
                |> List.head

        tileObstruction =
            level
                |> getTile position
                |> Maybe.map .solid
                |> Maybe.withDefault True
    in
        ( tileObstruction, maybeBuilding, maybeMonster )


obstructed : Vector -> Level -> Bool
obstructed position level =
    case queryPosition position level of
        ( False, Nothing, Nothing ) ->
            False

        _ ->
            True


view : ( Vector, Vector ) -> (Vector -> a) -> Level -> Html a
view ( start, size ) onClick level =
    let
        viewport =
            { start = start, size = size }

        onVisibleTile building =
            level
                |> getTile building.position
                |> Maybe.map .visible
                |> Maybe.withDefault Hidden
                |> ((/=) Hidden)

        buildingsHtml =
            level.buildings
                |> List.filter onVisibleTile
                |> List.map Building.view
    in
        div [] (draw viewport level.map 1.0 onClick ++ buildingsHtml)


draw :
    { viewport | start : Vector, size : Vector }
    -> Map
    -> Float
    -> (Vector -> a)
    -> List (Html a)
draw viewport map scale onClick =
    let
        mapTiles =
            Dict.toList map
                |> List.map Tuple.second

        toHtml tile =
            Tile.view tile scale (cardinalTileNeighbours map tile.position) onClick

        withinViewport tile =
            tile.position
                |> flip Vector.boxIntersectVector ( viewport.start, Vector.add viewport.start viewport.size )
    in
        mapTiles
            |> List.filter withinViewport
            |> List.map toHtml
            |> List.concat



-- FOV
------
-- Field of view is used for two things
-- 1. Calculating which monsters are visible
-- 2. Determining which tile is explored. Once a tile is explored, it does not
--    matter if its in view anymore.
--
------


calculateMonsterVisibility : Monster -> Vector -> Level -> Monster
calculateMonsterVisibility monster heroPosition ({ map } as level) =
    let
        isInLOS =
            Utils.FieldOfView.los monster.position heroPosition (isSeeThrough level)
    in
        if isInLOS then
            { monster | visible = LineOfSight }
        else if monster.visible /= Hidden then
            { monster | visible = Known }
        else
            monster


roomAndDark : List Room -> Vector -> Bool
roomAndDark rooms position =
    roomAtPosition position rooms
        |> Maybe.map .lightSource
        |> Maybe.withDefault Dark
        |> (==) Dark


isSeeThrough : Level -> Vector -> Bool
isSeeThrough ({ map, rooms } as level) target =
    let
        notSolid =
            .solid >> not

        notClosedDoor =
            .type_ >> ((/=) Tile.Types.DoorClosed)

        notDarkRoom =
            roomAndDark rooms >> not
    in
        level
            |> getTile target
            |> Maybe.map (\tile -> (notSolid tile && notClosedDoor tile && notDarkRoom target))
            |> Maybe.withDefault False


updateFOV : Vector -> Level -> Level
updateFOV heroPosition ({ map, rooms, corridors, monsters } as level) =
    let
        isTileVisible position =
            getTile position level
                |> Maybe.map (.visible >> (==) Known)
                |> Maybe.withDefault True

        newMap =
            Utils.FieldOfView.find heroPosition (isSeeThrough level) (Vector.neighbours >> Set.fromList) isTileVisible
                |> Set.toList
                |> List.foldl addToMapAsVisibleTile map

        addToMapAsVisibleTile : Vector -> Map -> Map
        addToMapAsVisibleTile tilePosition map =
            level
                |> getTile tilePosition
                |> Maybe.map (Tile.setVisibility Known)
                |> Maybe.map (\x -> Dict.insert x.position x map)
                |> Maybe.withDefault map

        newMonsters =
            monsters
                |> List.map (\monster -> calculateMonsterVisibility monster heroPosition level)
    in
        { level | map = newMap, monsters = newMonsters }


{-| Returns a tuple (N, E, S, W) of tiles neighbouring the center tile.
-}
getTile : Vector -> Level -> Maybe Tile
getTile position { map } =
    Dict.get position map


{-| Returns 4 direction tiles as a tuple to calculate tile rotation.
-}
cardinalTileNeighbours : Map -> Vector -> Tile.TileNeighbours
cardinalTileNeighbours map center =
    let
        addTilePosition =
            Vector.add center

        getNeighbour =
            addTilePosition >> (flip Dict.get map)
    in
        ( getNeighbour ( 0, -1 )
        , getNeighbour ( 1, 0 )
        , getNeighbour ( 0, 1 )
        , getNeighbour ( -1, 0 )
        )
