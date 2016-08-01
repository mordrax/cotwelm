module Dungeon.Room
    exposing
        ( Room
        , Entrance(..)
        , generate
        )

{-| The room module will generate random rooms given a seed. It uses Config.elm for
    all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and doors. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.
-}

import Dice exposing (..)
import Dungeon.Config as Config exposing (..)
import List.Extra exposing (..)
import Random exposing (..)
import Random.Extra exposing (..)
import Random.Array exposing (..)
import Array exposing (..)
import Utils.Vector as Vector exposing (..)


type alias Dimension =
    Vector


type Entrance
    = Door
    | NoDoor


type alias Door =
    ( Entrance, Vector )


type alias Walls =
    List Vector


type alias Wall =
    Vector


type alias Floors =
    List Vector


type alias Room =
    { doors : List Door
    , walls : Walls
    , floors : Floors
    , roomType : RoomType
    }


init : Room
init =
    { doors = [ ( Door, ( 0, 0 ) ) ]
    , walls = []
    , floors = []
    , roomType = DeadEnd
    }


{-| Given a seed will work out:
- what type of room to generate
- how big a room
- where the doors are
-}
generate : Random.Seed -> ( Room, Random.Seed )
generate seed =
    let
        ( roomType, seed' ) =
            Dice.rollD 100 seed
                |> \( randInt, seed' ) ->
                    ( Config.generateRoomType randInt, seed' )

        ( roomSize, seed'' ) =
            Dice.rollD Config.roomSize seed'

        _ =
            Debug.log "Generating..."
                { roomType = toString roomType
                , roomSize = toString size
                }
    in
        case roomType of
            Rectangular ->
                rectangular size seed''

            Cross ->
                cross size seed''

            Diamond ->
                diamond size seed''

            Potion ->
                potion size seed''

            Circular ->
                circular size seed''

            DiagonalSquares ->
                diagonalSquares size seed''

            DeadEnd ->
                -- will generate one tile for the room which is forced
                -- into an entrance as all rooms must have at least
                -- one entrance
                ( init, seed'' )



--    ( walls', entrances, seed'' ) =
--        List.foldl addDoors ( [], [], seed' ) walls
--in
--    ( Room entrances (List.map fst walls') floors roomType, seed'' )


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

        ( n, (rock :: wall) :: restOfWalls ) ->
            let
                randomDoorSampler =
                    doorSample (rock :: wall)
                        |> Random.map (Maybe.withDefault rock)

                ( door, seed' ) =
                    Random.step randomDoorSampler seed

                wallWithoutDoor =
                    List.filter (\x -> x /= door) (rock :: wall)
            in
                addDoors (n - 1) ( restOfWalls ++ [ wallWithoutDoor ], fullWalls, ( Door, door ) :: doors, seed' )


doorSample : Walls -> Generator (Maybe Wall)
doorSample walls =
    Random.Extra.sample walls



-------------------------------------------------------------------------------
-- Room types
--
-------------------------------------------------------------------------------


rectangular : Int -> Random.Seed -> ( Room, Random.Seed )
rectangular size seed =
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

        wallsShuffler =
            Random.Array.shuffle (Array.fromList walls)

        ( walls', seed'' ) =
            Random.step wallsShuffler seed'
                |> (\( w, s ) -> ( (Array.toList w), s ))

        ( nDoors, seed''' ) =
            Dice.rollD 6 seed''

        ( newWalls, doors, seed'''' ) =
            addDoors 2 ( walls', [], [], seed''' )

        floors =
            List.Extra.lift2 (,) [1..xMax - 1] [1..yMax - 1]
    in
        ( Room doors (newWalls ++ corners) floors Rectangular, seed'''' )


cross : Int -> Random.Seed -> ( Room, Random.Seed )
cross size seed =
    ( init, seed )


diamond : Int -> Random.Seed -> ( Room, Random.Seed )
diamond size seed =
    ( init, seed )


potion : Int -> Random.Seed -> ( Room, Random.Seed )
potion size seed =
    ( init, seed )


circular : Int -> Random.Seed -> ( Room, Random.Seed )
circular size seed =
    ( init, seed )


diagonalSquares : Int -> Random.Seed -> ( Room, Random.Seed )
diagonalSquares size seed =
    ( init, seed )
