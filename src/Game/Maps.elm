module Game.Maps
    exposing
        ( Maps
        , Map
        , Msg
        , init
        , update
        , updateArea
        , view
        , draw
        , fromTiles
        , currentAreaMap
        , mapSize
        , getASCIIMap
        , getBuildings
        , getTile
        , tileNeighbours
        , toScreenCoords
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
import Dict exposing (..)
import Random exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)


type Maps
    = A Model


type alias Model =
    { currentArea : Area
    , maps : Dict String Map
    , buildings : Dict String (List Building)
    }


type alias Map =
    Dict Vector Tile


type alias Dimension =
    Vector


type Msg
    = GenerateDungeonLevel Int


init : Random.Seed -> ( Maps, Cmd Msg, Random.Seed )
init seed =
    let
        getTiles area =
            Tile.mapToTiles (getASCIIMap area)

        tilesToTuples area =
            List.map toKVPair (getTiles area)

        toKVPair tile =
            ( Tile.position tile, tile )

        --( level, seed' ) =
        --    Random.step (DungeonGenerator.generate Config.init) seed
    in
        ( A
            { currentArea =
                --DungeonLevel 2
                Village
            , maps =
                Dict.fromList
                    [ ( toString Village, Dict.fromList (tilesToTuples Village) )
                    , ( toString Farm, Dict.fromList (tilesToTuples Farm) )
                    , ( toString DungeonLevelOne, Dict.fromList (tilesToTuples DungeonLevelOne) )
                      --, ( toString (DungeonLevel 2), level )
                    ]
            , buildings =
                Dict.fromList
                    [ ( toString Village, villageBuildings )
                    , ( toString Farm, farmBuildings )
                    , ( toString DungeonLevelOne, dungeonLevelOneBuildings )
                    ]
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


updateArea : GameData.Types.Area -> Maps -> Maps
updateArea area (A model) =
    A { model | currentArea = area }


view : Maps -> Html a
view maps =
    let
        map =
            currentAreaMap maps

        buildingsHtml =
            List.map Building.view (getBuildings maps)
    in
        div [] (draw map 1.0 ++ buildingsHtml)


fromTiles : Tiles -> Map
fromTiles tiles =
    let
        toKVPair tile =
            ( Tile.position tile, tile )
    in
        tiles
            |> List.map toKVPair
            |> Dict.fromList


draw : Map -> Float -> List (Html a)
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


toTiles : Map -> List Tile
toTiles =
    Dict.toList >> List.map snd


getTile : Map -> Vector -> Maybe Tile
getTile map pos =
    Dict.get pos map


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


{-| Get the map for the current area
-}
currentAreaMap : Maps -> Map
currentAreaMap (A model) =
    let
        maybeMap =
            Dict.get (toString model.currentArea) model.maps
    in
        case maybeMap of
            Just map ->
                map

            Nothing ->
                Dict.empty


{-| Get the width and height of a map
-}
mapSize: Map -> Dimension
mapSize map =
    let
        positions = Dict.keys map
        (maxX, maxY) = List.foldr (\(a,b) (c,d) -> (max a c, max b d)) (0,0) positions
    in
        ( maxX + 1, maxY + 1 )


{-| Get the buildings in the current area
-}
getBuildings : Maps -> List Building
getBuildings (A model) =
    let
        maybeBuildings =
            Dict.get (toString model.currentArea) model.buildings
    in
        case maybeBuildings of
            Just buildings ->
                buildings

            Nothing ->
                []


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


villageBuildings : List Building
villageBuildings =
    let
        farmGate =
            Building.newLink Farm ( 11, 31 )
    in
        [ Building.new Gate_NS ( 10, 0 ) "Village Gate" farmGate
        , Building.new StrawHouse_EF ( 3, 6 ) "Junk Shop" Ordinary
        , Building.new StrawHouse_WF ( 16, 5 ) "Private House" Ordinary
        , Building.new Hut_EF ( 7, 13 ) "Potion Store" (ShopType PotionStore)
        , Building.new StrawHouse_WF ( 14, 12 ) "Private House 2" Ordinary
        , Building.new StrawHouse_EF ( 6, 17 ) "Weapon Shop" (ShopType WeaponSmith)
        , Building.new StrawHouse_WF ( 14, 17 ) "General Store" (ShopType GeneralStore)
        , Building.new HutTemple_NF ( 9, 22 ) "Odin's Temple" Ordinary
        ]


farmBuildings : List Building
farmBuildings =
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


dungeonLevelOneBuildings : List Building
dungeonLevelOneBuildings =
    let
        mineEntrance =
            Building.newLink Farm ( 24, 2 )
    in
        [ Building.new Building.MineEntrance ( 22, 40 ) "Mine Exit" mineEntrance ]



------------------------------------------
-- Draw map props (tiles and buildings) --
------------------------------------------


{-| Returns a tuple (N, E, S, W) of tiles neighbouring the center tile.
-}
tileNeighbours : Map -> Vector -> TileNeighbours
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
