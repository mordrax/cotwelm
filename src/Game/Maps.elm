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

        toTuple =
            \tile -> ( toString tile.pos, tile )

        tilesToTuples =
            \area -> List.map toTuple (getTiles area)
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


getMap : String -> Model -> Map
getMap area model =
    let
        maybeMap =
            Dict.get area model.maps
    in
        case maybeMap of
            Just map ->
                map

            Nothing ->
                Dict.empty


villageMap : Area -> Model -> Html a
villageMap area model =
    let
        listOfTiles =
            Dict.toList (getMap (toString area) model) |> List.map snd

        tilesHtml =
            List.map tileToHtml listOfTiles

        buildingsHtml =
            List.map buildingToHtml (getBuildings area)
    in
        div [] (tilesHtml ++ buildingsHtml)


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

        -- turn a list of chars which is a row of the ascii map into a list of tiles
        tileTypes =
            List.map asciiToTileType asciiChars
    in
        toTiles y tileTypes


toTiles : Int -> List TileType -> List Tile
toTiles y tiles =
    List.indexedMap (toTile y) tiles


{-| Create a Tile from some x,y coordinates and a tile type
-}
toTile : Int -> Int -> TileType -> Tile
toTile y x tileType =
    let
        pos =
            { x = x, y = y }
    in
        { pos = pos, tile = tileType, solid = False, building = Nothing }
