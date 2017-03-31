module Level
    exposing
        ( Level
        , Map
        , downstairs
        , drop
        , floors
        , fromTiles
        , initNonDungeon
        , neighbours
        , size
        , tileAtPosition
        , updateFOV
        , updateGround
        , upstairs
        )

import Building exposing (Building)
import Container exposing (Container)
import Dict exposing (Dict)
import Dungeon.Corridor as Corridor exposing (Corridor)
import Dungeon.Room as Room exposing (Room)
import Item.Item as Item exposing (Item)
import Monster exposing (Monster)
import Tile exposing (Tile)
import Tile.Types
import Types exposing (..)
import Utils.BresenhamLine as BresenhamLine
import Utils.Vector as Vector exposing (Vector)
import Utils.FieldOfView
import Set


type alias Map =
    Dict Vector Tile


type alias Level =
    { map : Map
    , buildings : List Building
    , monsters : List Monster
    , rooms : List Room
    , corridors : List Corridor
    }


type Msg
    = NoOp


setTile : Level -> Tile -> Level
setTile ({ map } as level) tile =
    { level | map = Dict.insert tile.position tile map }


initNonDungeon : List Tile -> List Building -> List Monster -> Level
initNonDungeon tiles buildings monsters =
    { map = fromTiles tiles
    , buildings = buildings
    , monsters = monsters
    , rooms = []
    , corridors = []
    }


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


tileAtPosition : Vector -> Level -> Maybe Tile
tileAtPosition pos { map } =
    Dict.get pos map


roomAtPosition : Vector -> List Room -> Maybe Room
roomAtPosition pos rooms =
    let
        inRoom room =
            Vector.boxIntersectVector pos ( room.worldPos, Vector.add room.worldPos room.dimension )
    in
        List.filter inRoom rooms
            |> List.head


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


{-| Drop an item on the level.
-}
drop : ( Vector, Item ) -> Level -> Level
drop ( position, item ) ({ map } as level) =
    getTile map position
        |> Tile.drop item
        |> setTile level


floors : Level -> List Vector
floors { map } =
    map
        |> Dict.toList
        |> List.map Tuple.second
        |> List.filter (.solid >> not)
        |> List.map .position



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
    if Utils.FieldOfView.los monster.position heroPosition (isSeeThrough level) then
        { monster | visible = LineOfSight }
    else
        monster


roomAndDark : List Room -> Vector -> Bool
roomAndDark rooms position =
    roomAtPosition position rooms
        |> Maybe.map .lightSource
        |> Maybe.withDefault Dark
        |> (==) Dark


isSeeThrough : Level -> Vector -> Bool
isSeeThrough { map, rooms } target =
    let
        notSolid =
            .solid >> not

        notClosedDoor =
            .type_ >> ((/=) Tile.Types.DoorClosed)

        notDarkRoom =
            roomAndDark rooms >> not
    in
        getTile map target
            |> (\tile -> (notSolid tile && notClosedDoor tile && notDarkRoom target))


updateFOV : Vector -> Level -> Level
updateFOV heroPosition ({ map, rooms, corridors, monsters } as level) =
    let
        newMap =
            Utils.FieldOfView.find heroPosition (isSeeThrough level) (Vector.neighbours >> Set.fromList)
                |> Set.toList
                |> List.foldl addToMapAsVisibleTile map

        addToMapAsVisibleTile : Vector -> Map -> Map
        addToMapAsVisibleTile tilePosition map =
            tilePosition
                |> getTile map
                |> Tile.setVisibility Known
                |> (\x -> Dict.insert x.position x map)

        newMonsters =
            monsters
                |> List.map (\monster -> calculateMonsterVisibility monster heroPosition level)
    in
        { level | map = newMap, monsters = newMonsters }


{-| Returns a tuple (N, E, S, W) of tiles neighbouring the center tile.
-}
getTile : Map -> Vector -> Tile
getTile map position =
    case Dict.get position map of
        Just tile ->
            tile

        Nothing ->
            Debug.crash <| "Level.getTile: " ++ (toString position)


neighbours : Map -> Vector -> Tile.TileNeighbours
neighbours map center =
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


allNeighbours : Map -> Vector -> List Tile
allNeighbours map center =
    let
        reducer a b =
            Dict.get a map
                |> Maybe.map (flip (::) b)
                |> Maybe.withDefault b
    in
        List.foldl reducer [] (Vector.neighbours center)
