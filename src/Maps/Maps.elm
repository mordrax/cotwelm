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
        case tile of
            Rock ->
                div [ class "tile Rock", tileStyle ] []

            Grass ->
                div [ class "tile Grass", tileStyle ] []

            DarkDgn ->
                div [ class "tile DarkDgn", tileStyle ] []

            Water ->
                div [ class "tile Water", tileStyle ] []

            Path ->
                div [ class "tile Path", tileStyle ] []

            LitDgn ->
                div [ class "tile LitDgn", tileStyle ] []

            PathRock ->
                div [ class "tile PathRock", tileStyle ] []

            PathGrass ->
                div [ class "tile PathGrass", tileStyle ] []

            WallDarkDgn ->
                div [ class "tile WallDarkDgn", tileStyle ] []

            WaterGrass ->
                div [ class "tile WaterGrass", tileStyle ] []

            WaterPath ->
                div [ class "tile WaterPath", tileStyle ] []

            WallLitDgn ->
                div [ class "tile WallLitDgn", tileStyle ] []

            Grass50Cave50 ->
                div [ class "tile Grass50Cave50", tileStyle ] []

            Grass10Cave90 ->
                div [ class "tile Grass10Cave90", tileStyle ] []

            White50Cave50 ->
                div [ class "tile White50Cave50", tileStyle ] []

            White90Cave10 ->
                div [ class "tile White90Cave10", tileStyle ] []

            Crop ->
                div [ class "tile Crop", tileStyle ] []

            MineEntrance ->
                div [ class "tile MineEntrance", tileStyle ] []

            Well ->
                div [ class "tile Well", tileStyle ] []

            Building ->
                div [ class "tile Building", tileStyle ] []

            TreasurePile ->
                div [ class "tile TreasurePile", tileStyle ] []
