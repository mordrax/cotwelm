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

import Dungeon.Rooms.Config as Config exposing (..)
import Random exposing (..)
import Dungeon.Rooms.Type exposing (..)
import Dungeon.Rooms.Cross as Cross exposing (generate)
import Dungeon.Rooms.Rectangular as Rectangular exposing (generate)


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
                Rectangular.generate size seed'

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
-------------------------------------------------------------------------------
-- Room types
-------------------------------------------------------------------------------


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
