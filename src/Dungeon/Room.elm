module Dungeon.Room
    exposing
        ( Room
        , RoomType(..)
        , Entrance(..)
        , design
        , new
        )

import Utils.Vector as Vector exposing (..)
import Random exposing (..)
import List.Extra exposing (..)
import Dice exposing (..)


{-| Holds different room types for the dungeon. Rooms are surrounded by a layer of
    walls with at least one door or doorless entry into the room.
-}
type Room
    = A Model


type alias Dimension =
    Vector


type RoomType
    = Rectangular
    | Cross
    | Diamond
    | Potion
    | Circular
    | DiagonalSquares
    | DeadEnd


type Entrance
    = Door
    | BrokenDoor
    | NoDoor


type alias Model =
    { doors : List ( Entrance, Vector )
    , walls : List Vector
    , floor : List Vector
    , roomType : RoomType
    , isLit : Bool
    }


{-| RoomComponents:
    - List of (walls, canHaveEntrance)
    - List of floors
    - updated seed
-}
type alias RoomComponents =
    ( List ( Vector, Bool ), List Vector )


init : Room
init =
    A
        { doors = [ ( Door, ( 0, 0 ) ) ]
        , walls = []
        , floor = []
        , roomType = DeadEnd
        , isLit = False
        }


design : Room -> ( List ( Entrance, Vector ), List Vector, List Vector )
design (A { doors, walls, floor }) =
    ( doors, walls, floor )


{-| Dig a room of a certain size. This will randomly generate
one or more entrances which can be a door, broken door or clear corridor.

-}
new : RoomType -> Dimension -> Random.Seed -> ( Room, Random.Seed )
new roomType (( w, h ) as dim) seed =
    let
        ( walls, floor ) =
            case roomType of
                Rectangular ->
                    rectangular dim

                Cross ->
                    cross dim

                Diamond ->
                    diamond dim

                Potion ->
                    potion dim

                Circular ->
                    circular dim

                DiagonalSquares ->
                    diagonalSquares dim

                DeadEnd ->
                    -- will generate one tile for the room which is forced
                    -- into an entrance as all rooms must have at least
                    -- one entrance
                    ( [], [ ( 0, 0 ) ] )

        ( walls', entrances, seed' ) =
            List.foldl addDoors ( [], [], seed ) walls
    in
        ( A
            { doors = entrances
            , walls = List.map fst walls'
            , floor = floor
            , roomType = roomType
            , isLit = False
            }
        , seed'
        )



--------------------------------------------------------------
-- Different room types


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
