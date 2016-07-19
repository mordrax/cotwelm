module Game.Maps
    exposing
        ( Maps
        , Map
        , init
        , updateArea
        , view
        , getMap
        , getASCIIMap
        , getBuildings
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


type Maps
    = A Model


type alias Model =
    { currentArea : Area
    , maps : Dict String Map
    , buildings : Dict String (List Building)
    }


type alias Map =
    Dict String Tile


init : Maps
init =
    let
        getTiles =
            \area ->
                Tile.mapToTiles (getASCIIMap area)

        tilesToTuples =
            \area -> List.map toKVPair (getTiles area)

        toKVPair =
            \tile -> ( toString tile.position, tile )
    in
        A
            { currentArea = Village
            , maps =
                Dict.fromList
                    [ ( toString Village, Dict.fromList (tilesToTuples Village) )
                    , ( toString Farm, Dict.fromList (tilesToTuples Farm) )
                    , ( toString DungeonLevelOne, Dict.fromList (tilesToTuples DungeonLevelOne) )
                    ]
            , buildings =
                Dict.fromList
                    [ ( toString Village, villageBuildings )
                    , ( toString Farm, farmBuildings )
                    , ( toString DungeonLevelOne, dungeonLevelOneBuildings )
                    ]
            }


updateArea : GameData.Types.Area -> Maps -> Maps
updateArea area (A model) =
    A { model | currentArea = area }


view : Maps -> Html a
view maps =
    let
        map =
            getMap maps

        neighbours =
            \tile -> tileNeighbours tile map

        listOfTiles =
            Dict.toList map
                |> List.map snd

        tilesHtml =
            List.map (\x -> tileToHtml x (neighbours x)) listOfTiles

        buildingsHtml =
            List.map Building.view (getBuildings maps)
    in
        div [] (tilesHtml ++ buildingsHtml)


{-| Get the map for the current area
-}
getMap : Maps -> Map
getMap (A model) =
    let
        maybeMap =
            Dict.get (toString model.currentArea) model.maps
    in
        case maybeMap of
            Just map ->
                map

            Nothing ->
                Dict.empty


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
        , Building.new MineEntrance ( 24, 1 ) "Mine Entrance" mineExit
        ]


dungeonLevelOneBuildings : List Building
dungeonLevelOneBuildings =
    let
        mineEntrance =
            Building.newLink Farm ( 24, 2 )
    in
        [ Building.new MineEntrance ( 22, 40 ) "Mine Exit" mineEntrance
        ]



------------------------------------------
-- Draw map props (tiles and buildings) --
------------------------------------------


tileNeighbours : Tile -> Map -> ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )
tileNeighbours { position } map =
    let
        getNeighbour =
            \vector -> Dict.get (toString (Vector.add position vector)) map
    in
        ( getNeighbour ( 0, -1 )
        , getNeighbour ( 1, 0 )
        , getNeighbour ( 0, 1 )
        , getNeighbour ( -1, 0 )
        )
