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
import Utils.Vector as Vector exposing (..)


type alias Dimension =
    Vector


type Entrance
    = Door
    | NoDoor


type alias Room =
    { doors : List ( Entrance, Vector )
    , walls : List Vector
    , floor : List Vector
    , roomType : RoomType
    }


{-| RoomComponents:
    - List of (walls, canHaveEntrance)
    - List of floors
-}
type alias RoomComponents =
    ( List ( Vector, Bool ), List Vector )


init : Room
init =
    { doors = [ ( Door, ( 0, 0 ) ) ]
    , walls = []
    , floor = []
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
                |> \( randInt, seed' ) -> ( Config.generateRoomType randInt, seed )

        ( roomSize, seed'' ) =
            Dice.rollD Config.roomSize seed'
    in
        new roomType roomSize seed''


{-| Dig a room of a certain size. This will randomly generate
one or more entrances which can be a door, broken door or clear corridor.

-}
new : RoomType -> Int -> Random.Seed -> ( Room, Random.Seed )
new roomType size seed =
    let
        ( partialDimension, seed' ) =
            Dice.roll2D (size - 2) seed

        dimension =
            Vector.add ( 2, 2 ) partialDimension

        ( walls, floor ) =
            case roomType of
                Rectangular ->
                    rectangular dimension

                Cross ->
                    cross dimension

                Diamond ->
                    diamond dimension

                Potion ->
                    potion dimension

                Circular ->
                    circular dimension

                DiagonalSquares ->
                    diagonalSquares dimension

                DeadEnd ->
                    -- will generate one tile for the room which is forced
                    -- into an entrance as all rooms must have at least
                    -- one entrance
                    ( [], [ ( 0, 0 ) ] )

        ( walls', entrances, seed'' ) =
            List.foldl addDoors ( [], [], seed' ) walls
    in
        ( Room entrances (List.map fst walls') floor roomType, seed'' )


addDoors : ( Vector, Bool ) -> ( List ( Vector, Bool ), List ( Entrance, Vector ), Random.Seed ) -> ( List ( Vector, Bool ), List ( Entrance, Vector ), Random.Seed )
addDoors (( wallPos, isSoft ) as wall) ( walls, entrances, seed ) =
    let
        ( res, seed' ) =
            Dice.rollD 10 seed

        addToWall =
            ( wall :: walls, entrances, seed' )

        addToDoor =
            ( walls, ( Door, wallPos ) :: entrances, seed' )
    in
        if not isSoft then
            addToWall
        else
            case res of
                1 ->
                    addToDoor

                _ ->
                    addToWall



--------------------------------------------------------------


{-| Hard walls cannot have entrances in them, soft walls can
-}
makeHardWall : Vector -> ( Vector, Bool )
makeHardWall pos =
    ( pos, False )


makeSoftWall : Vector -> ( Vector, Bool )
makeSoftWall pos =
    ( pos, True )



-------------------------------------------------------------------------------
-- Room types
--
-------------------------------------------------------------------------------


rectangular : Dimension -> RoomComponents
rectangular ( w, h ) =
    let
        ( xMax, yMax ) =
            ( w - 1, h - 1 )

        cornerPoints =
            [ ( 0, 0 ), ( xMax, 0 ), ( 0, yMax ), ( xMax, yMax ) ]

        corners =
            List.map makeHardWall cornerPoints

        softWall =
            \x y -> makeSoftWall ( x, y )

        walls =
            lift2 softWall [1..xMax - 1] [ 0, yMax ]
                ++ lift2 softWall [ 0, xMax ] [1..yMax - 1]

        floors =
            List.Extra.lift2 (,) [1..xMax - 1] [1..yMax - 1]
    in
        ( walls ++ corners, floors )


cross : Dimension -> RoomComponents
cross ( w, h ) =
    ( [], [] )


diamond : Dimension -> RoomComponents
diamond ( w, h ) =
    ( [], [] )


potion : Dimension -> RoomComponents
potion ( w, h ) =
    ( [], [] )


circular : Dimension -> RoomComponents
circular ( w, h ) =
    ( [], [] )


diagonalSquares : Dimension -> RoomComponents
diagonalSquares ( w, h ) =
    ( [], [] )
