module Dungeon.Room exposing (..)

{-| The room module will generate random rooms given a seed. It uses Config.elm for
    all random parameters such as the type/size of room generated.

    Generated rooms have a list of walls, floors and doors. These lists are just a
    list of 2D tuples. It is up to the caller to then convert these types.
-}

--( Room
--, Entrance(..)
--, generate
--)

import Array exposing (..)
import Dice exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import List.Extra exposing (..)
import Random exposing (..)
import Random.Extra exposing (..)
import Random.Array exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Rooms.Cross as Cross exposing (generate)


init : Room
init =
    { doors = [ ( Door, ( 0, 0 ) ) ]
    , walls = []
    , floors = []
    , corners = [ ( 0, 0 ) ]
    , roomType = DeadEnd
    , dimension = ( 1, 1 )
    }


{-| Given a seed will work out:
- what type of room to generate
- how big a room
- where the doors are
-}
roomTypeAndSizeGenerator : RoomType -> Generator ( RoomType, RoomSize )
roomTypeAndSizeGenerator roomType =
    Random.map (\size -> ( roomType, size )) (roomSizeGenerator roomType)


generate : Random.Seed -> ( Room, Random.Seed )
generate seed =
    let
        gen =
            Config.roomTypeGenerator `Random.andThen` roomTypeAndSizeGenerator

        ( ( roomType, roomSize ), seed' ) =
            Random.step gen seed

        _ =
            Debug.log "Generating..."
                { roomType = toString roomType
                , roomSize = toString size
                }
    in
        case roomType of
            Rectangular ->
                rectangular size seed'

            Cross ->
                Random.step Cross.generate seed'

            Diamond ->
                diamond size seed'

            Potion ->
                potion size seed'

            Circular ->
                circular size seed'

            DiagonalSquares ->
                diagonalSquares size seed'

            DeadEnd ->
                -- will generate one tile for the room which is forced
                -- into an entrance as all rooms must have at least
                -- one entrance
                ( init, seed' )



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
                    doorSampleWithDefault (rock :: wall) rock

                ( door, seed' ) =
                    Random.step randomDoorSampler seed

                wallWithoutDoor =
                    List.filter (\x -> x /= door) (rock :: wall)
            in
                addDoors (n - 1) ( restOfWalls ++ [ wallWithoutDoor ], fullWalls, ( Door, door ) :: doors, seed' )


doorSampleWithDefault : Walls -> Wall -> Generator Wall
doorSampleWithDefault walls wall =
    Random.Extra.sample walls
        |> Random.map (Maybe.withDefault wall)



-------------------------------------------------------------------------------
-- Room types
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

        doorGenerator =
            Dice.d 6

        ( ( shuffledWalls, nDoors ), seed'' ) =
            Random.step (Random.pair (shuffle walls) doorGenerator) seed'

        ( newWalls, doors, seed''' ) =
            addDoors nDoors ( shuffledWalls, [], [], seed'' )

        floors =
            List.Extra.lift2 (,) [1..xMax - 1] [1..yMax - 1]
    in
        ( Room doors (newWalls ++ corners) floors corners Rectangular ( width, height ), seed''' )


shuffle : List a -> Generator (List a)
shuffle list =
    list
        |> Array.fromList
        |> Random.Array.shuffle
        |> Random.map Array.toList


{-| Crosses are at a minimum of 7x7 for a single square of doorable wall
    The following picture shows a 7x7 cross with possible door positions
    on any of the flat walls (not on any of the corners)
    "..###.."
    "..#.#.."
    "###.###"
    "#.....#"
    "###.###"
    "..#.#.."
    "..###.."

-}
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


diamondTemplate : List String
diamondTemplate =
    [ "....#...."
    , "...#.#..."
    , "..#...#.."
    , ".#.....#."
    , "#.......#"
    , ".#.....#."
    , "..#...#.."
    , "...#.#..."
    , "....#...."
    ]
