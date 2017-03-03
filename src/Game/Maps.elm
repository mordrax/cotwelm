module Game.Maps
    exposing
        ( Model
        , Msg
        , init
        , update
        , updateArea
        , updateCurrentLevel
        , view
        , draw
        , fromTiles
        , currentLevel
        , getASCIIMap
        , tileNeighbours
        , toScreenCoords
        , downstairs
        , upstairs
        , getTile
        )

{-| Handles rendering of all the static/dynamic game areas

Static areas are:
Village
Farm
Mines lvl 0

Dynamic lvls are:
Mines lvl 1 - 8
-}

import GameData.ASCIIMaps exposing (..)
import GameData.Building as Building exposing (..)
import Tile exposing (Tile)
import GameData.Types exposing (..)
import Utils.Vector as Vector exposing (..)
import Html exposing (..)
import Html.Lazy as Lazy
import Dict exposing (..)
import Random.Pcg as Random exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Shops
import Array.Hamt as Array exposing (Array)
import Dungeon.DungeonGenerator as DungeonGenerator
import Level exposing (Level)
import Item.Item as Item exposing (Item)
import Monster.Monster as Monster
import Lodash


type alias Model =
    { currentArea : Area
    , village : Level
    , farm : Level
    , abandonedMinesEntry : Level
    , abandonedMines : Array Level
    }


type Msg
    = GenerateDungeonLevel Int


init : Item -> Random.Seed -> ( Model, Cmd Msg, Random.Seed )
init armour seed =
    let
        makeExplored tile =
            { tile | visible = Tile.Explored }

        getTiles area =
            Tile.mapToTiles (getASCIIMap area)
                |> List.map makeExplored

        mapOfArea area =
            (getTiles area)
                |> List.map toKVPair
                |> Dict.fromList

        levelOfArea area =
            Level (mapOfArea area) (buildingsOfArea area) []

        toKVPair tile =
            ( tile.position, tile )

        mineEntryLevel =
            levelOfArea DungeonLevelOne

        mineEntryLevelWithArmour =
            { mineEntryLevel
                | map = Dict.insert ( 13, 19 ) darkDungeonWithArmour mineEntryLevel.map
            }

        darkDungeonWithArmour =
            Tile.toTile ( 13, 19 ) Tile.DarkDgn
                |> Tile.drop armour
    in
        ( { currentArea = Village
          , abandonedMines = Array.fromList []
          , village = levelOfArea Village
          , farm = levelOfArea Farm
          , abandonedMinesEntry = mineEntryLevelWithArmour
          }
        , Cmd.none
        , seed
        )


update : Msg -> Model -> Model
update msg model =
    let
        _ =
            Debug.log "maps update" 1
    in
        { model | currentArea = Village }


upstairs : Model -> Model
upstairs model =
    let
        modelWithArea area =
            { model | currentArea = area }
    in
        case model.currentArea of
            DungeonLevel 0 ->
                modelWithArea DungeonLevelOne

            DungeonLevel n ->
                modelWithArea (DungeonLevel (n - 1))

            _ ->
                modelWithArea Farm


downstairs : Model -> Generator Model
downstairs model =
    let
        nextLevel =
            case model.currentArea of
                DungeonLevelOne ->
                    0

                DungeonLevel level ->
                    level + 1

                _ ->
                    0
    in
        case Array.get nextLevel model.abandonedMines of
            Just level ->
                Random.constant { model | currentArea = DungeonLevel nextLevel }

            Nothing ->
                DungeonGenerator.generate Config.init
                    |> Random.andThen addMonstersToLevel
                    |> Random.map (\level -> Array.push level model.abandonedMines)
                    |> Random.map
                        (\abandonedMines ->
                            { model
                                | abandonedMines = abandonedMines
                                , currentArea = DungeonLevel nextLevel
                            }
                        )


addMonstersToLevel : Level -> Generator Level
addMonstersToLevel level =
    let
        floors =
            Level.floors level
    in
        Lodash.shuffle floors
            |> Random.map (List.take 10)
            |> Random.andThen Monster.randomMonsters
            |> Random.map (\monsters -> { level | monsters = monsters })


updateArea : GameData.Types.Area -> Model -> Model
updateArea area model =
    { model | currentArea = area }


updateCurrentLevel : Level -> Model -> Model
updateCurrentLevel level model =
    case model.currentArea of
        Village ->
            { model | village = level }

        Farm ->
            { model | farm = level }

        DungeonLevelOne ->
            { model | abandonedMinesEntry = level }

        DungeonLevel n ->
            { model | abandonedMines = Array.set n level model.abandonedMines }


view : ( Vector, Vector ) -> (Vector -> a) -> Model -> Html a
view ( start, size ) onClick maps =
    let
        viewport =
            { start = start, size = size }

        level =
            currentLevel maps

        onVisibleTile building =
            building.position
                |> (\x -> Level.getTile x level)
                |> Maybe.map .visible
                |> Maybe.withDefault Tile.Unknown
                |> ((/=) Tile.Unknown)

        buildingsHtml =
            level.buildings
                |> List.filter onVisibleTile
                |> List.map Building.view
    in
        div [] (draw viewport level.map 1.0 onClick ++ buildingsHtml)


fromTiles : List Tile -> Level.Map
fromTiles tiles =
    let
        toKVPair tile =
            ( tile.position, tile )
    in
        tiles
            |> List.map toKVPair
            |> Dict.fromList


draw :
    { viewport | start : Vector, size : Vector }
    -> Level.Map
    -> Float
    -> (Vector -> a)
    -> List (Html a)
draw viewport map scale onClick =
    let
        neighbours center =
            tileNeighbours map center

        mapTiles =
            toTiles map

        toHtml tile =
            Tile.view tile scale (neighbours <| tile.position) onClick

        withinViewport tile =
            tile.position
                |> flip Vector.boxIntersectVector ( viewport.start, Vector.add viewport.start viewport.size )
    in
        mapTiles
            |> List.filter withinViewport
            |> List.map toHtml
            |> List.concat


toTiles : Level.Map -> List Tile
toTiles =
    Dict.toList >> List.map Tuple.second


toScreenCoords : Level.Map -> Int -> Level.Map
toScreenCoords map mapSize =
    let
        invertY ( ( x, y ), tile ) =
            ( ( x, mapSize - y ), Tile.setPosition ( x, mapSize - y ) tile )
    in
        map
            |> Dict.toList
            |> List.map invertY
            |> Dict.fromList


{-| Get the map for the current area
-}
currentLevel : Model -> Level
currentLevel model =
    case model.currentArea of
        Village ->
            model.village

        Farm ->
            model.farm

        DungeonLevelOne ->
            model.abandonedMinesEntry

        DungeonLevel level ->
            model.abandonedMines
                |> Array.get level
                |> Maybe.withDefault model.abandonedMinesEntry


{-| Get the ascii map for a specific area.
    This is used to create a map and not during gameplay so it doesn't
    make sense to ask for it for the current area.
-}
getASCIIMap : Area -> List String
getASCIIMap area =
    case area of
        Village ->
            villageMap

        Farm ->
            farmMap

        DungeonLevelOne ->
            dungeonLevelOneMap

        _ ->
            []


getTile : Vector -> Model -> Tile
getTile position model =
    let
        maybeTile =
            currentLevel model
                |> .map
                |> Dict.get position
    in
        case maybeTile of
            Just tile ->
                tile

            _ ->
                Debug.log ("Could not find the tile the hero" ++ toString position ++ " is standing on.")
                    (Tile.toTile ( 0, 0 ) Tile.Grass)



--------------------------
-- Initialise buildings --
--------------------------


buildingsOfArea : Area -> List Building
buildingsOfArea area =
    case area of
        Village ->
            let
                farmGate =
                    Building.newLink Farm ( 11, 31 )
            in
                [ Building.new Building.Gate ( 10, 0 ) "Village Gate" farmGate
                , Building.new Building.StrawHouseEast ( 3, 6 ) "Junk Shop" Ordinary
                , Building.new Building.StrawHouseWest ( 16, 5 ) "Private House" Ordinary
                , Building.new Building.Hut ( 7, 13 ) "Potion Store" (Shop Shops.PotionStore)
                , Building.new Building.StrawHouseWest ( 14, 12 ) "Private House 2" Ordinary
                , Building.new Building.StrawHouseEast ( 6, 17 ) "Weapon Shop" (Shop Shops.WeaponSmith)
                , Building.new Building.StrawHouseWest ( 14, 17 ) "General Store" (Shop Shops.GeneralStore)
                , Building.new Building.HutTemple ( 9, 22 ) "Odin's Temple" Ordinary
                , Building.new Building.Well ( 11, 18 ) "Secret Entrance" (Building.newLink DungeonLevelOne ( 25, 3 ))
                ]

        Farm ->
            let
                villageGate =
                    Building.newLink Village ( 11, 1 )

                mineExit =
                    Building.newLink DungeonLevelOne ( 22, 39 )
            in
                [ Building.new Gate ( 10, 32 ) "Farm Gate" villageGate
                , Building.new StrawHouseWest ( 43, 23 ) "Adopted Parents House" Ordinary
                , Building.new Building.MineEntrance ( 24, 1 ) "Mine Entrance" mineExit
                ]

        DungeonLevelOne ->
            let
                mineEntrance =
                    Building.newLink Farm ( 24, 2 )
            in
                [ Building.new Building.MineEntrance ( 22, 40 ) "Mine Exit" mineEntrance
                , Building.new Building.StairsDown ( 25, 2 ) "Down stairs" Building.StairDown
                ]

        _ ->
            []



------------------------------------------
-- Draw map props (tiles and buildings) --
------------------------------------------


{-| Returns a tuple (N, E, S, W) of tiles neighbouring the center tile.
-}
tileNeighbours : Level.Map -> Vector -> Tile.TileNeighbours
tileNeighbours map center =
    let
        addTilePosition =
            Vector.add center

        getTile =
            flip Dict.get map

        getNeighbour =
            addTilePosition >> getTile
    in
        ( getNeighbour ( 0, -1 )
        , getNeighbour ( 1, 0 )
        , getNeighbour ( 0, 1 )
        , getNeighbour ( -1, 0 )
        )
