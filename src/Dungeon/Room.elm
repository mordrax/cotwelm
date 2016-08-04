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
import Dungeon.Config as Config exposing (..)
import List.Extra exposing (..)
import Random exposing (..)
import Random.Extra exposing (..)
import Random.Array exposing (..)
import Set exposing (toList, fromList)
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
    , corners : Walls
    , roomType : RoomType
    , dimension : Dimension
    }


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
type alias RoomSize =
    Int


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
                Random.step cross seed'

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
cross : Generator Room
cross =
    let
        sizeGen =
            Config.roomSizeGenerator Cross

        wallsGen =
            Random.map crossWalls sizeGen

        floorsGen =
            Random.map crossFloors sizeGen

        doors =
            []

        cornersGen =
            Random.map (\x -> crossCorners x) sizeGen
    in
        Random.map4
            (\size walls floors corners ->
                Room doors (List.concat walls) floors corners Cross ( size, size )
            )
            sizeGen
            wallsGen
            floorsGen
            cornersGen


{-| The 4 main points of interest in a cross room can be expressed by a formula of:
    (1 + X) * [0, 1, 2, 3] where X is the length of wall minus the two corner walls on each edge
    So for any given sized cross room, this function gives the dots for that sized cross.
-}
crossDots : Int -> List Int
crossDots wallSize =
    List.map (crossDot wallSize) [0..3]


crossDot : Int -> Int -> Int
crossDot wallSize axis =
    (wallSize + 1) * axis


crossCorners : Int -> Walls
crossCorners wallSize =
    let
        roomSize =
            wallSize + 5

        dots =
            crossDots wallSize

        grid =
            lift2 (,) dots dots

        corners =
            lift2 (,) [ 0, roomSize ] [ 0, roomSize ]

        isNotCorner =
            not << flip List.member corners
    in
        List.filter isNotCorner grid


{-| F denotes the floor. To get all floor, add up
    all Xs inside the crossDots 1, 2 for Y between 1 and Height - 1 inclusive
    and all Ys in the same way

     0 1 2 3  <-- cross dot axis
    "..###.."
    "..#F#.."
    "###F###"
    "#FFFFF#"
    "###F###"
    "..#F#.."
    "..###.."
-}
crossFloors : Int -> Floors
crossFloors wallSize =
    let
        floorMiddles =
            [(crossDot wallSize 1) + 1..(crossDot wallSize 2) - 1]

        vertical =
            lift2 (,) floorMiddles [1..(wallSize + 5) - 1]

        horizontal =
            lift2 (,) [1..(wallSize + 5) - 1] floorMiddles
    in
        Set.toList <| Set.fromList (vertical ++ horizontal)


crossWalls : Int -> List Walls
crossWalls wallSize =
    let
        roomSize =
            wallSize + 5

        axis =
            \a b ->
                [(crossDot wallSize a) + 1..(crossDot wallSize b) - 1]

        horizontalTopBottom =
            lift2 (,) (axis 1 2) [ 0, roomSize ]

        horizontalMiddles =
            lift2 (,) (axis 1 2) (axis 0 1)
                ++ lift2 (,) (axis 1 2) (axis 2 3)

        verticalTopBottom =
            lift2 (,) [ 0, roomSize ] (axis 1 2)

        verticalMiddles =
            lift2 (,) (axis 0 1) (axis 1 2)
                ++ lift2 (,) (axis 2 3) (axis 1 2)
    in
        [ horizontalTopBottom ++ verticalTopBottom ++ horizontalMiddles ++ verticalMiddles ]


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
