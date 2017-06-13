module Tile
    exposing
        ( Tile
        , TileNeighbours
        , drop
        , mapToTiles
        , pickup
        , setPosition
        , setVisibility
        , toTile
        , updateGround
        , view
        )

import Container exposing (Container)
import Dict exposing (Dict)
import Html exposing (Html)
import Item
import Item.Data exposing (BasicItem, Item)
import Random.Pcg as Random
import Tile.Model exposing (..)
import Tile.Types exposing (..)
import Tile.View
import Types exposing (..)
import Utils.Mass as Mass exposing (Capacity)
import Utils.Vector as Vector exposing (Vector)


type alias Tile =
    Tile.Model.Tile


type alias TileNeighbours =
    Tile.Model.TileNeighbours


view : Tile.Model.Tile -> Float -> Tile.Model.TileNeighbours -> (Vector -> a) -> List (Html a)
view =
    Tile.View.view



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


{-| Drop something onto the ground (which is a container on the tile.
-}
drop : Item BasicItem -> Tile -> Tile
drop item model =
    let
        ( groundWithItem, _ ) =
            Container.add item model.ground
    in
    { model | ground = groundWithItem }


pickup : Tile -> ( List (Item BasicItem), Tile )
pickup ({ ground } as tile) =
    ( Container.list ground, { tile | ground = Container.set [] ground } )


updateGround : List (Item BasicItem) -> Tile -> Tile
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
