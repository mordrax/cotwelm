module Dungeon.Rooms.Cross exposing (..)

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

import Dungeon.Rooms.Type exposing (..)
import Dungeon.Rooms.Config as Config exposing (..)
import Random exposing (..)
import Random.Extra exposing (..)
import List.Extra exposing (..)
import Set exposing (..)


type alias WallSize =
    Int


type alias Model =
    { wallSize : Int
    , walls : List Walls
    , doors : List Door
    }


generate : Generator Room
generate =
    generateWallSize
        `Random.andThen` generateWalls
        `Random.andThen` shuffleWalls
        `Random.andThen` generateDoors
        `Random.andThen` generateRoom


shuffleWalls : Model -> Generator Model
shuffleWalls model =
    let
        updateModel =
            \walls -> { model | walls = walls }
    in
        Random.map updateModel (Config.shuffle model.walls)


generateWalls : Model -> Generator Model
generateWalls ({ wallSize } as model) =
    constant { model | walls = walls wallSize }


generateDoors : Model -> Generator Model
generateDoors ({ wallSize, walls, doors } as model) =
    let
        wallsDoorsGen =
            Config.addDoors 4 ( walls, [], [] )

        updateModel =
            \( walls, doors ) -> { model | walls = walls, doors = doors }
    in
        Random.map updateModel wallsDoorsGen


generateWallSize : Generator Model
generateWallSize =
    Config.roomSizeGenerator Cross
        |> Random.map (\wallSize -> Model wallSize [] [])


generateRoom : Model -> Generator Room
generateRoom { wallSize, walls, doors } =
    let
        roomSize =
            toRoomSize wallSize
    in
        constant
            <| { doors = doors
               , walls = List.concat walls
               , floors = floors wallSize
               , corners = corners wallSize
               , roomType = Cross
               , dimension = ( roomSize, roomSize )
               }


toRoomSize : WallSize -> RoomSize
toRoomSize wallSize =
    wallSize + 6


{-| The 4 main points of interest in a cross room can be expressed by a formula of:
    (1 + X) * [0, 1, 2, 3] where X is the length of wall minus the two corner walls on each edge
    So for any given sized cross room, this function gives the dots for that sized cross.
-}
dots : WallSize -> List Int
dots wallSize =
    List.map (dot wallSize) [0..3]


dot : WallSize -> Int -> Int
dot wallSize axis =
    (wallSize + 1) * axis


corners : WallSize -> Walls
corners wallSize =
    let
        axis =
            dot wallSize

        roomSize =
            toRoomSize wallSize

        allDots =
            dots wallSize

        grid =
            lift2 (,) allDots allDots

        corners =
            lift2 (,) [ 0, axis 3 ] [ 0, axis 3 ]

        isNotCorner =
            not << flip List.member corners
    in
        List.filter isNotCorner grid


{-| F denotes the floor. To get all floor, add up
    all Xs inside the dots 1, 2 for Y between 1 and Height - 1 inclusive
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
floors : WallSize -> Floors
floors wallSize =
    let
        axis =
            dot wallSize

        floorMiddles =
            [axis 1 + 1..axis 2 - 1]

        vertical =
            lift2 (,) floorMiddles [axis 0 + 1..axis 3 - 1]

        horizontal =
            lift2 (,) [axis 0 + 1..axis 3 - 1] floorMiddles
    in
        Set.toList <| Set.fromList (vertical ++ horizontal)


{-| The room below is of wallSize 1, to get the coordinates between the corners of interest
    e.g between (2, 0) and (4, 0) you take the coords one more than the starting 'dot' and one
    less than the finishing 'dot' in this case, (3, 0)
    For symetrical rooms, this holds true for both x and y axis
      0 2 4 6
    0"..###.."
     "..#F#.."
    2"###F###"
     "#FFFFF#"
    4"###F###"
     "..#F#.."
    6"..###.."
-}
betweenDots : WallSize -> Int -> Int -> List Int
betweenDots wallSize dot1 dot2 =
    [(dot wallSize dot1) + 1..(dot wallSize dot2) - 1]


walls : WallSize -> List Walls
walls wallSize =
    let
        between =
            betweenDots wallSize

        left =
            between 0 1

        middle =
            between 1 2

        right =
            between 2 3

        axis =
            dot wallSize

        topAxis =
            axis 0

        bottomAxis =
            axis 3

        horizontalTop =
            lift2 (,) middle [ topAxis ]

        horizontalBottom =
            lift2 (,) middle [ bottomAxis ]

        verticalTop =
            lift2 (,) [ topAxis ] middle

        verticalBottom =
            lift2 (,) [ bottomAxis ] middle

        horizontalMiddles =
            lift2 (,) left [ axis 1, axis 2 ]
                ++ lift2 (,) right [ axis 1, axis 2 ]

        verticalMiddles =
            lift2 (,) [ axis 1, axis 2 ] left
                ++ lift2 (,) [ axis 1, axis 2 ] right
    in
        [ horizontalTop ]
            ++ [ horizontalBottom ]
            ++ [ verticalTop ]
            ++ [ verticalBottom ]
            ++ [ horizontalMiddles ]
            ++ [ verticalMiddles ]
