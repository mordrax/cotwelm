module Maps.Village exposing (villageMap)

{-| Handles rendering of all the static/dynamic game areas

Static areas are:
Village
Farm
Mines lvl 0

Dynamic lvls are:
Mines lvl 1 - 8

-}

import Html exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)
import GameData.ASCIIMaps exposing (..)
import GameData.Tile exposing (..)
import Lib exposing (..)


villageMap : Html a
villageMap =
    div []
        ((List.indexedMap asciiRowToHtml villageMapASCII)
            ++ (List.map buildingToHtml villageBuildings)
        )


buildingToHtml : Building -> Html a
buildingToHtml building =
    let
        posStyle =
            coordToHtmlStyle building.pos
    in
        div [ class ("tile " ++ (toString building.tile)), posStyle ] []


{-| Given a row of ascii, turn it into a row of Html
-}
asciiRowToHtml : Int -> String -> Html a
asciiRowToHtml y asciiRow =
    let
        -- turn a row of string into a list of chars
        rowOfAsciiMapChars =
            String.toList asciiRow

        -- turn a list of chars which is a row of the ascii map into a list of tiles
        rowOfTiles =
            List.map asciiToTile rowOfAsciiMapChars
    in
        tilesToHtml y rowOfTiles


tilesToHtml : Int -> List TileType -> Html a
tilesToHtml y tiles =
    div [] (List.indexedMap (tileToHtml y) tiles)


{-| Place each tile in it's correct (x,y) absolute location
-}
tileToHtml : Int -> Int -> TileType -> Html a
tileToHtml y x tile =
    let
        xInPixel =
            toString (x * 32)

        yInPixel =
            toString (y * 32)

        tileStyle =
            style [ ( "left", xInPixel ++ "px" ), ( "top", yInPixel ++ "px" ) ]
    in
        div [ class ("tile " ++ (toString tile)), tileStyle ] []
