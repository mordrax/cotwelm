module Maps.Maps exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import String exposing (..)
import GameData.Maps exposing (..)
import GameData.Tile exposing (..)


villageMap : a -> Html a
villageMap a =
    div []
        (List.indexedMap asciiRowToHtml
            villageMapASCII
        )


asciiRowToHtml : Int -> String -> Html a
asciiRowToHtml x asciiRow =
    let
        -- turn a row of string into a list of chars
        rowOfAsciiMapChars =
            String.toList asciiRow

        -- turn a list of chars which is a row of the ascii map into a list of tiles
        rowOfTiles =
            List.map asciiToTile rowOfAsciiMapChars
    in
        tilesToHtml x rowOfTiles


indexTileRow : Int -> List (List Tile) -> List (List Tile)
indexTileRow x tiles =
    tiles


tilesToHtml : Int -> List Tile -> Html a
tilesToHtml x tiles =
    div [] (List.indexedMap (tileToHtml x) tiles)


tileToHtml : Int -> Int -> Tile -> Html a
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
