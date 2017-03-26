module Level
    exposing
        ( Level
        , Map
        , initNonDungeon
        , fromTiles
        , downstairs
        , upstairs
        , size
        , updateGround
        , tileAtPosition
        , floors
        , drop
        , updateFOV
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


setMap : Level -> Map -> Level
setMap level map =
    { level | map = map }


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


drop : ( Vector, Item ) -> Level -> Level
drop ( position, item ) level =
    Dict.get position level.map
        |> Maybe.map (Tile.drop item)
        |> Maybe.map (\x -> Dict.insert position x level.map)
        |> Maybe.withDefault level.map
        |> setMap level


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


lineOfSight : Vector -> Vector -> Level -> Bool
lineOfSight a b ({ map, rooms } as level) =
    let
        roomLightSource tile =
            roomAtPosition tile.position rooms
                |> Maybe.map .lightSource
                |> Maybe.withDefault Dark

        isSeeThroughOrEitherEndpoints tile =
            ((not tile.solid) && (tile.type_ /= Tile.Types.DoorClosed) && (roomLightSource tile /= Dark))
                || (tile.position == a)
                || (tile.position == b)
                || (Vector.adjacent a b)
    in
        BresenhamLine.line a b
            |> List.map (\point -> Dict.get point map)
            |> List.map (Maybe.map isSeeThroughOrEitherEndpoints)
            |> List.map (Maybe.withDefault False)
            |> List.all identity


calculateMonsterVisibility : Monster -> Vector -> Level -> Monster
calculateMonsterVisibility monster heroPosition ({ map } as level) =
    if lineOfSight monster.position heroPosition level then
        { monster | visible = LineOfSight }
    else
        monster


updateFOV : Vector -> Level -> Level
updateFOV heroPosition ({ map, rooms, corridors, monsters } as level) =
    let
        newExploredTiles =
            level
                |> unexploredTiles
                |> List.filter (\tile -> lineOfSight heroPosition tile.position level)
                |> List.map (Tile.setVisibility Known)

        addToMap tile map =
            Dict.insert tile.position tile map

        newMap =
            List.foldl addToMap map newExploredTiles

        newMonsters =
            monsters
                |> List.map (\monster -> calculateMonsterVisibility monster heroPosition level)
    in
        { level | map = newMap, monsters = newMonsters }


unexploredTiles : Level -> List Tile
unexploredTiles { map } =
    map
        |> Dict.toList
        |> List.map Tuple.second
        |> List.filter (.visible >> (==) Hidden)
