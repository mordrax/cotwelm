module Game.Maps
    exposing
        ( Maps
        , Msg
        , init
        , update
        , updateArea
        , view
        , draw
        , fromTiles
        , currentLevel
        , getASCIIMap
        , tileNeighbours
        , toScreenCoords
        , downStairs
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
import Tile exposing (..)
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


type Maps
    = A Model


type alias Model =
    { currentArea : Area
    , village : Level
    , farm : Level
    , abandonedMinesEntry : Level
    , abandonedMines : Array Level
    }


type Msg
    = GenerateDungeonLevel Int


init : Random.Seed -> ( Maps, Cmd Msg, Random.Seed )
init seed =
    let
        getTiles area =
            Tile.mapToTiles (getASCIIMap area)

        mapOfArea area =
            (getTiles area)
                |> List.map toKVPair
                |> Dict.fromList

        levelOfArea area =
            Level (mapOfArea area) (buildingsOfArea area)

        toKVPair tile =
            ( Tile.position tile, tile )
    in
        ( A
            { currentArea = Village
            , abandonedMines = Array.fromList []
            , village = levelOfArea Village
            , farm = levelOfArea Farm
            , abandonedMinesEntry = levelOfArea DungeonLevelOne
            }
        , Cmd.none
        , seed
        )


update : Msg -> Maps -> Maps
update msg (A model) =
    let
        _ =
            Debug.log "maps update" 1
    in
        (A { model | currentArea = Village })


downStairs : Maps -> Generator Maps
downStairs (A model) =
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
                Random.constant (A { model | currentArea = DungeonLevel nextLevel })

            Nothing ->
                DungeonGenerator.generate Config.init
                    |> Random.map (\level -> Array.push level model.abandonedMines)
                    |> Random.map
                        (\abandonedMines ->
                            A
                                { model
                                    | abandonedMines = abandonedMines
                                    , currentArea = DungeonLevel nextLevel
                                }
                        )


updateArea : GameData.Types.Area -> Maps -> Maps
updateArea area (A model) =
    A { model | currentArea = area }


view : Maps -> Html a
view maps =
    Lazy.lazy view_ maps


view_ : Maps -> Html a
view_ maps =
    let
        level =
            currentLevel maps

        buildingsHtml =
            List.map Building.view (level.buildings)
    in
        div [] (draw level.map 1.0 ++ buildingsHtml)


fromTiles : Tiles -> Level.Map
fromTiles tiles =
    let
        toKVPair tile =
            ( Tile.position tile, tile )
    in
        tiles
            |> List.map toKVPair
            |> Dict.fromList


draw : Level.Map -> Float -> List (Html a)
draw map scale =
    let
        neighbours center =
            tileNeighbours map center

        mapTiles =
            toTiles map

        toHtml tile =
            Tile.scaledView tile scale (neighbours <| Tile.position tile)
    in
        List.map toHtml mapTiles


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
currentLevel : Maps -> Level
currentLevel (A model) =
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



--------------------------
-- Initialise buildings --
--------------------------


buildingsOfArea : Area -> Buildings
buildingsOfArea area =
    case area of
        Village ->
            let
                farmGate =
                    Building.newLink Farm ( 11, 31 )
            in
                [ Building.new Building.Gate_NS ( 10, 0 ) "Village Gate" farmGate
                , Building.new Building.StrawHouse_EF ( 3, 6 ) "Junk Shop" Ordinary
                , Building.new Building.StrawHouse_WF ( 16, 5 ) "Private House" Ordinary
                , Building.new Building.Hut_EF ( 7, 13 ) "Potion Store" (Shop Shops.PotionStore)
                , Building.new Building.StrawHouse_WF ( 14, 12 ) "Private House 2" Ordinary
                , Building.new Building.StrawHouse_EF ( 6, 17 ) "Weapon Shop" (Shop Shops.WeaponSmith)
                , Building.new Building.StrawHouse_WF ( 14, 17 ) "General Store" (Shop Shops.GeneralStore)
                , Building.new Building.HutTemple_NF ( 9, 22 ) "Odin's Temple" Ordinary
                , Building.new Building.Well ( 11, 18 ) "Secret Entrance" (Building.newLink DungeonLevelOne ( 25, 3 ))
                ]

        Farm ->
            let
                villageGate =
                    Building.newLink Village ( 11, 1 )

                mineExit =
                    Building.newLink DungeonLevelOne ( 22, 39 )
            in
                [ Building.new Gate_NS ( 10, 32 ) "Farm Gate" villageGate
                , Building.new StrawHouse_WF ( 43, 23 ) "Adopted Parents House" Ordinary
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
tileNeighbours : Level.Map -> Vector -> TileNeighbours
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
