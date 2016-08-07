module Dungeon.Rooms.Rectangular exposing (generate)

import Dice exposing (..)
import List.Extra exposing (..)
import Random exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)


generate : Int -> Random.Seed -> ( Room, Random.Seed )
generate size seed =
    let
        ( ( width, height ), seed' ) =
            Dice.roll2D size seed
                |> \( ( x, y ), s ) -> ( ( max 4 x, max 4 y ), s )

        ( xMax, yMax ) =
            ( width - 1, height - 1 )

        corners =
            [ ( 0, 0 ), ( xMax, 0 ), ( 0, yMax ), ( xMax, yMax ) ]

        walls =
            [ List.map (\y -> ( 0, y )) [1..yMax - 1]
            , List.map (\y -> ( xMax, y )) [1..yMax - 1]
            , List.map (\x -> ( x, 0 )) [1..xMax - 1]
            , List.map (\x -> ( x, yMax )) [1..xMax - 1]
            ]

        doorGenerator =
            Dice.d 6

        ( ( shuffledWalls, nDoors ), seed'' ) =
            Random.step (Random.pair (Config.shuffle walls) doorGenerator) seed'

        ( newWalls, doors, seed''' ) =
            addDoors nDoors ( shuffledWalls, [], [], seed'' )

        floors =
            List.Extra.lift2 (,) [1..xMax - 1] [1..yMax - 1]
    in
        ( Room doors newWalls floors corners Rectangular ( width, height ), seed''' )


{-| Continually adds a door to the next wall until no more doors are left or
no more space in the walls
-}
addDoors :
    Int
    -> ( List Walls, List Walls, List Door, Random.Seed )
    -> ( Walls, List Door, Random.Seed )
addDoors nDoors ( walls, fullWalls, doors, seed ) =
    case ( nDoors, walls ) of
        ( 0, _ ) ->
            ( List.concat (walls ++ fullWalls), doors, seed )

        ( _, [] ) ->
            ( List.concat (walls ++ fullWalls), doors, seed )

        ( _, [] :: restOfWalls ) ->
            ( List.concat (walls ++ fullWalls), doors, seed )

        ( n, wall :: restOfWalls ) ->
            let
                randomDoorSampler =
                    Config.wallSampler wall

                ( door, seed' ) =
                    Random.step randomDoorSampler seed

                wallWithoutDoor =
                    List.filter (\x -> x /= door) wall
            in
                addDoors (n - 1) ( restOfWalls ++ [ wallWithoutDoor ], fullWalls, ( Door, door ) :: doors, seed' )
