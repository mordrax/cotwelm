module Tile
    exposing
        ( Tile
        , TileNeighbours
        , setVisibility
        , drop
        , updateGround
        , setPosition
        , mapToTiles
        , toTile
        , view
        )

import Building exposing (Building)
import Container exposing (Container)
import Dict exposing (Dict)
import Item exposing (Item)
import List.Extra as ListX
import Random.Pcg as Random
import String.Extra as StringX
import Tile.Model exposing (..)
import Types exposing (..)
import Utils.Mass as Mass exposing (Capacity)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)
import Tile.View
import Tile.Types exposing (..)


type alias Tile =
    Tile.Model.Tile


type alias TileNeighbours =
    Tile.Model.TileNeighbours


view =
    Tile.View.view



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


{-| Drop something onto the ground (which is a container on the tile.
-}
drop : Item -> Tile -> Tile
drop item model =
    let
        ( groundWithItem, _ ) =
            Container.add item model.ground
    in
        { model | ground = groundWithItem }


updateGround : List Item -> Tile -> Tile
updateGround items model =
    { model | ground = Container.set items model.ground }


setPosition : Vector -> Tile -> Tile
setPosition newPosition model =
    { model | position = newPosition }


setVisibility : Visibility -> Tile -> Tile
setVisibility visibility tile =
    { tile | visible = visibility }


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : List String -> List Tile
mapToTiles asciiMap =
    let
        rowToTiles y asciiRow =
            List.indexedMap (\x char -> toTile ( x, y ) (asciiToTileType char)) (String.toList asciiRow)

        tiles =
            List.indexedMap rowToTiles asciiMap
    in
        List.concat tiles


{-| Create a Tile from some x,y coordinates and a tile type
-}
toTile : Vector -> TileType -> Tile
toTile ( x, y ) tileType =
    let
        solid =
            List.member tileType solidTiles

        container =
            Item.containerBuilder <| Capacity Random.maxInt Random.maxInt
    in
        Tile tileType solid [] Empty ( x, y ) container Hidden False


asciiToTileType : Char -> TileType
asciiToTileType char =
    Maybe.withDefault Grass (Dict.get char asciiTileMap)
