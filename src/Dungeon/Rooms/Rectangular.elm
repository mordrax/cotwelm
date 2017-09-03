module Dungeon.Rooms.Rectangular exposing (template)

import Dungeon.Rooms.Type exposing (..)
import List.Extra exposing (..)


template : RoomTemplate
template =
    { makeWalls = \_ -> []
    , makeCorners = corners
    , makeFloors = floors
    }


corners : Dimension -> List LocalVector
corners ( w, h ) =
    let
        ( xMax, yMax ) =
            ( w - 1, h - 1 )
    in
    [ ( 0, 0 ), ( xMax, 0 ), ( 0, yMax ), ( xMax, yMax ) ]
        |> List.map Local


floors : Dimension -> List LocalVector
floors ( w, h ) =
    let
        ( xMax, yMax ) =
            ( w - 1, h - 1 )
    in
    List.Extra.lift2 (,) (List.range 1 (xMax - 1)) (List.range 1 (yMax - 1))
        |> List.map Local



--
--walls : Dimension -> List LocalVector
--walls ( w, h ) =
--    let
--        ( xMax, yMax ) =
--            ( w - 1, h - 1 )
--    in
--    [ List.map (\y -> ( 0, y )) <| List.range 1 (yMax - 1)
--    , List.map (\y -> ( xMax, y )) <| List.range 1 (yMax - 1)
--    , List.map (\x -> ( x, 0 )) <| List.range 1 (xMax - 1)
--    , List.map (\x -> ( x, yMax )) <| List.range 1 (xMax - 1)
--    ]
