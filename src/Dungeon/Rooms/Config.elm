module Dungeon.Rooms.Config exposing (..)

{-| This module houses the configuration properties of the dungeon such as dungeon size,
max number of rooms on a floor, all details about the rooms, corridor lengths etc...

The module has no model but rather are mostly a collection of constants used by the
dungeon generator to create random dungeon levels.
-}

import Random exposing (..)
import Random.Extra exposing (..)
import Dungeon.Rooms.Type exposing (..)


{-| Width and height dimensions of the dungeon level
-}
size : Int
size =
    30


{-| Maximum allowed width and height dimension of a room. The minimum dimension is
   dependent on the room type (e.g the rectangular room has a minimum of 3 x 3)
-}
roomSize : Int
roomSize =
    10


generateRoomSize : Generator Int
generateRoomSize =
    Random.int 1 10


roomSizeGenerator : RoomType -> Generator Int
roomSizeGenerator roomType =
    case roomType of
        Rectangular ->
            Random.int 4 10

        Cross ->
            Random.int 1 4

        Diamond ->
            Random.int 4 10

        Potion ->
            Random.int 4 10

        Circular ->
            Random.int 4 10

        DiagonalSquares ->
            Random.int 4 10

        DeadEnd ->
            Random.int 1 1


{-| Given a int between 0 and 100 (will cap if outside of range), will return
    a room type based on the hardcoded distribution of types
-}
roomType : Int -> RoomType
roomType index =
    let
        clampedIndex =
            clamp 0 100 index
    in
        if clampedIndex < 100 then
            Rectangular
        else if clampedIndex < 50 then
            Cross
        else if clampedIndex < 60 then
            Diamond
        else if clampedIndex < 70 then
            Potion
        else if clampedIndex < 80 then
            Circular
        else if clampedIndex < 90 then
            DiagonalSquares
        else
            DeadEnd


roomTypeGenerator : Generator RoomType
roomTypeGenerator =
    --Random.map roomType (Random.int 0 100)
    constant Cross


wallSampler : Walls -> Wall -> Generator Wall
wallSampler walls defaultWall =
    Random.Extra.sample walls
        |> map (Maybe.withDefault defaultWall)


without : Wall -> Walls -> Walls
without wall walls =
    List.filter (\x -> x /= wall) walls


addDoors :
    Int
    -> ( List Walls, List Walls, List Door )
    -> Generator ( Walls, List Door )
addDoors nDoors ( walls, fullWalls, doors ) =
    let
        createGenerator =
            constant ( List.concat (walls ++ fullWalls), doors )
    in
        case ( nDoors, walls ) of
            ( 0, _ ) ->
                createGenerator

            ( _, [] ) ->
                createGenerator

            ( _, [] :: restOfWalls ) ->
                createGenerator

            ( n, (rock :: wall) :: restOfWalls ) ->
                let
                    generateWall =
                        wallSampler (rock :: wall) rock

                    wallWithoutDoor =
                        flip without (rock :: wall)

                    recurse =
                        \(( _, pos ) as door) ->
                            addDoors (n - 1)
                                ( restOfWalls ++ [ wallWithoutDoor pos ]
                                , fullWalls
                                , door :: doors
                                )
                in
                    (wallToDoor generateWall)
                        `andThen` recurse


wallToDoor : Generator Wall -> Generator Door
wallToDoor wallGen =
    Random.map (\pos -> ( Door, pos )) wallGen
