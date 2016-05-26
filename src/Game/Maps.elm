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
import GameData.Tile exposing (..)
import Game.Data exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)
import Dict exposing (..)


type alias Model =
    { currentArea : Area
    , maps : Dict String Map
    }


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
        { currentArea = Farm
        , maps =
            Dict.fromList
                [ ( toString Village, Dict.fromList (tilesToTuples Village) )
                , ( toString Farm, Dict.fromList (tilesToTuples Farm) )
                , ( toString DungeonLevelOne, Dict.fromList (tilesToTuples DungeonLevelOne) )
                ]
        }


view : Model -> Html a
view model =
    villageMap model.currentArea model


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


getBuildings : Area -> List Building
getBuildings area =
    case area of
        Village ->
            villageBuildings

        Farm ->
            farmBuildings

        _ ->
            []


villageMap : Area -> Model -> Html a
villageMap area model =
    let
        listOfTiles =
            Dict.toList (getMap area model) |> List.map snd

        tilesHtml =
            List.map tileToHtml listOfTiles

        buildingsHtml =
            List.map buildingToHtml (getBuildings area)
    in
        div [] (tilesHtml ++ buildingsHtml)



------------------------------------------
-- Draw map props (tiles and buildings) --
------------------------------------------


tileToHtml : Tile -> Html a
tileToHtml tile =
    div [ class ("tile " ++ toString tile.tile), coordToHtmlStyle tile.pos ] []


buildingToHtml : Building -> Html a
buildingToHtml building =
    let
        posStyle =
            coordToHtmlStyle building.pos
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
