module Game.Maps exposing (..)

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
import GameData.Tile exposing (..)
import GameData.Types exposing (..)
import Vector exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)
import Dict exposing (..)


type alias Model =
    { currentArea : Area
    , maps : Dict String Map
    , buildings : Dict String (List Building)
    }


type alias Map =
    Dict String Tile


initMaps : Model
initMaps =
    let
        getTiles =
            \area ->
                mapToTiles (getASCIIMap area)

        tilesToTuples =
            \area -> List.map toKVPair (getTiles area)

        toKVPair =
            \tile -> ( toString tile.pos, tile )
    in
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


updateArea : GameData.Types.Area -> Model -> Model
updateArea area model =
    { model | currentArea = area }


view : Model -> Html a
view model =
    mapToHtml model.currentArea model


{-| Given an area, will return a map of that area or an empty dictionary if invalid area
-}
getMap : Area -> Model -> Map
getMap area model =
    let
        maybeMap =
            Dict.get (toString area) model.maps
    in
        case maybeMap of
            Just map ->
                map

            Nothing ->
                Dict.empty


getBuildings : Area -> Model -> List Building
getBuildings area model =
    let
        maybeBuildings =
            Dict.get (toString area) model.buildings
    in
        case maybeBuildings of
            Just buildings ->
                buildings

            Nothing ->
                []


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
            { area = Farm, pos = (Vector.new 11 31) }
    in
        [ Building.newWithLink Gate_NS (Vector.new 10 0) "Village Gate" (Just farmGate)
        , Building.new StrawHouse_EF (Vector.new 3 6) "Junk Shop"
        , Building.new StrawHouse_WF (Vector.new 16 5) "Private House"
        , Building.new Hut_EF (Vector.new 7 13) "Potion Store"
        , Building.new StrawHouse_WF (Vector.new 14 12) "Private House 2"
        , Building.new StrawHouse_EF (Vector.new 6 17) "Weapon Shop"
        , Building.new StrawHouse_WF (Vector.new 14 17) "General Store"
        , Building.new HutTemple_NF (Vector.new 9 22) "Odin's Temple"
        ]


farmBuildings : List Building
farmBuildings =
    let
        villageGate =
            { area = Village, pos = Vector.new 11 1 }

        mineExit =
            { area = DungeonLevelOne, pos = Vector.new 22 39 }
    in
        [ Building.newWithLink Gate_NS (Vector.new 10 32) "Farm Gate" (Just villageGate)
        , Building.new StrawHouse_WF (Vector.new 43 23) "Adopted Parents House"
        , Building.newWithLink MineEntrance (Vector.new 24 1) "Mine Entrance" (Just mineExit)
        ]


dungeonLevelOneBuildings : List Building
dungeonLevelOneBuildings =
    let
        mineEntrance =
            { area = Farm, pos = Vector.new 24 2 }
    in
        [ Building.newWithLink MineEntrance (Vector.new 22 40) "Mine Exit" (Just mineEntrance)
        ]



------------------------------------------
-- Draw map props (tiles and buildings) --
------------------------------------------


mapToHtml : Area -> Model -> Html a
mapToHtml area model =
    let
        listOfTiles =
            Dict.toList (getMap area model) |> List.map snd

        tilesHtml =
            List.map tileToHtml listOfTiles

        buildingsHtml =
            List.map buildingToHtml (getBuildings area model)
    in
        div [] (tilesHtml ++ buildingsHtml)


tileToHtml : Tile -> Html a
tileToHtml tile =
    div [ class ("tile " ++ toString tile.tile), vectorToHtmlStyle tile.pos ] []


buildingToHtml : Building -> Html a
buildingToHtml building =
    let
        posStyle =
            vectorToHtmlStyle building.pos
    in
        div [ class ("tile " ++ (toString building.tile)), posStyle ] []



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : List String -> List GameData.Tile.Tile
mapToTiles asciiMap =
    let
        tiles =
            List.indexedMap mapOneRowToTiles asciiMap
    in
        List.concat tiles


{-| Given a row of ascii, turn it into a row of Html
-}
mapOneRowToTiles : Int -> String -> List Tile
mapOneRowToTiles y asciiRow =
    let
        -- turn a row of string into a list of chars
        asciiChars =
            String.toList asciiRow
    in
        toTiles y asciiChars


toTiles : Int -> List Char -> List Tile
toTiles y asciiTiles =
    List.indexedMap (toTile y) asciiTiles


{-| Create a Tile from some x,y coordinates and a tile type
-}
toTile : Int -> Int -> Char -> Tile
toTile y x asciiTile =
    let
        pos =
            { x = x, y = y }

        ( tileType, solid ) =
            asciiTileData asciiTile
    in
        { pos = pos, tile = tileType, solid = solid, building = Nothing }
