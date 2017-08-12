module Dungeon.Types exposing (..)

import Building exposing (Building)
import Dict exposing (Dict)
import Dungeon.Corridor as Corridor exposing (..)
import Dungeon.Entrance as Entrance exposing (..)
import Dungeon.Room as Room exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Game.Level as Level exposing (Level)
import Set exposing (Set)
import Tile exposing (Tile)
import Utils.Vector exposing (Vector)


type alias Model =
    { config : Config.Model
    , rooms : Rooms
    , corridors : Corridors
    , activePoints : ActivePoints
    , walls : List Tile
    , buildings : List Building
    , occupied : Set Vector
    }


type alias ActivePoints =
    List ActivePoint


type ActivePoint
    = ActiveRoom Room (Maybe Entrance)
    | ActiveCorridor Corridor


toLevel : Model -> Level
toLevel ({ buildings, rooms, corridors } as model) =
    let
        map =
            model
                |> toTiles
                |> Level.fromTiles
    in
    Level.Level map buildings [] rooms corridors Dict.empty


toOccupied : Model -> List Vector
toOccupied { rooms, corridors, activePoints } =
    let
        ( activeRooms, activeCorridors ) =
            List.foldl roomsAndCorridorsFromActivePoint ( [], [] ) activePoints

        roomVectors =
            (rooms ++ activeRooms)
                |> List.map Room.boundary
                |> List.concat

        corridorVectors =
            (corridors ++ activeCorridors)
                |> List.map Corridor.boundary
                |> List.concat
    in
    roomVectors ++ corridorVectors


toTiles : Model -> List Tile
toTiles { rooms, corridors, activePoints, walls } =
    let
        ( activeRooms, activeCorridors ) =
            List.foldl roomsAndCorridorsFromActivePoint ( [], [] ) activePoints

        roomTiles =
            (rooms ++ activeRooms)
                |> List.map Room.toTiles
                |> List.concat

        corridorTiles =
            (corridors ++ activeCorridors)
                |> List.map Corridor.toTiles
                |> List.concat
    in
    roomTiles ++ corridorTiles ++ walls


{-| Add an active point which is a room or corridor, to the rooms and corridors
-}
roomsAndCorridorsFromActivePoint : ActivePoint -> ( Rooms, Corridors ) -> ( Rooms, Corridors )
roomsAndCorridorsFromActivePoint point ( rooms, corridors ) =
    case point of
        ActiveRoom room _ ->
            ( room :: rooms, corridors )

        ActiveCorridor corridor ->
            ( rooms, corridor :: corridors )
