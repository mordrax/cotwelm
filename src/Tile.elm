module Tile
    exposing
        ( Tile
        , TileType
        , isSolid
        , mapToTiles
        , tileToHtml
        )

import Utils.Vector exposing (..)
import GameData.Building as Building exposing (..)
import Item.Item as Item exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Lib as Lib exposing (..)
import List exposing (..)
import String exposing (..)
import Hero exposing (..)
import Monster.Monster as Monster exposing (..)


type alias Model =
    { tile : TileType
    , solid : Bool
    , items : List Item
    , occupant : Occupant
    }


type Occupant
    = B Building
    | H Hero
    | M Monster
    | Empty


type BaseTile
    = Base Model


type alias Tile =
    { base : BaseTile
    , position : Vector
    }


type TileType
    = Rock
    | Grass
    | DarkDgn
    | Water
    | Path
    | LitDgn
    | PathRock
    | PathGrass
    | WallDarkDgn
    | WaterGrass
    | WaterPath
    | WallLitDgn
    | Grass50Cave50
    | Grass10Cave90
    | White50Cave50
    | White90Cave10
    | Crop
    | Well
    | TreasurePile



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


isSolid : Tile -> Bool
isSolid { base } =
    let
        (Base { solid }) =
            base
    in
        solid


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : List String -> List Tile
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
        Tile (Base <| Model tileType solid [] Empty) pos


tileToHtml : Tile -> Html a
tileToHtml { base, position } =
    let
        (Base model) =
            base
    in
        div [ class ("tile " ++ toString model.tile), Lib.vectorToHtmlStyle position ] []


asciiTileData : Char -> ( TileType, Bool )
asciiTileData char =
    case char of
        '^' ->
            ( Rock, True )

        ',' ->
            ( Grass, False )

        'o' ->
            ( DarkDgn, False )

        '~' ->
            ( Water, False )

        '.' ->
            ( Path, False )

        'O' ->
            ( LitDgn, False )

        '_' ->
            ( PathRock, False )

        ';' ->
            ( PathGrass, False )

        'd' ->
            ( WallDarkDgn, False )

        'w' ->
            ( WaterGrass, False )

        'W' ->
            ( WaterPath, False )

        'D' ->
            ( WallLitDgn, False )

        'g' ->
            ( Grass50Cave50, False )

        'G' ->
            ( Grass10Cave90, True )

        'c' ->
            ( White50Cave50, True )

        'C' ->
            ( White90Cave10, False )

        '=' ->
            ( Crop, True )

        'e' ->
            ( Well, True )

        _ ->
            ( Grass, False )
