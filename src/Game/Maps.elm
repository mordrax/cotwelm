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
    { currentArea = Village
    , maps =
        Dict.fromList
            [ ( toString Village, Dict.fromList (List.concat (List.indexedMap asciiRowToTiles (getASCIIMap Village))) )
            ]
    }


view : Model -> Html a
view model =
    case model.currentArea of
        Village ->
            villageMap model

        notImplemented ->
            h2 [ style [ ( "color", "red" ) ] ]
                [ text ("Not implemented map specified: " ++ toString notImplemented) ]


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


villageMap : Model -> Html a
villageMap model =
    let
        listOfTiles =
            Dict.toList (getMap (toString Village) model) |> List.map snd
    in
        div []
            ((List.map tileToHtml listOfTiles)
                ++ (List.map buildingToHtml (getBuildings Village))
            )


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
    []


{-| Given a row of ascii, turn it into a row of Html
-}
asciiRowToTiles : Int -> String -> List ( String, Tile )
asciiRowToTiles y asciiRow =
    let
        -- turn a row of string into a list of chars
        rowOfAsciiMapChars =
            String.toList asciiRow

        -- turn a list of chars which is a row of the ascii map into a list of tiles
        rowOfTiles =
            List.map asciiToTile rowOfAsciiMapChars
    in
        toTiles y rowOfTiles


toTiles : Int -> List TileType -> List ( String, Tile )
toTiles y tiles =
    List.indexedMap (toTile y) tiles


{-| Create a (Coordinate, Tile) from some x,y coordinates and a tile type
-}
toTile : Int -> Int -> TileType -> ( String, Tile )
toTile y x tileType =
    let
        pos =
            { x = x, y = y }
    in
        ( toString pos, { pos = pos, tile = tileType, solid = False, building = Nothing } )
