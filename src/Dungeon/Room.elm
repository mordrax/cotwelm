module Dungeon.Room exposing (..)

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


{-| Dig a room of a certain size. This will randomly generate
one or more entrances which can be a door, broken door or clear corridor.

-}
dig : RoomType -> Dimension -> Vector -> Random.Seed -> ( Room, Random.Seed )
dig roomType (( w, h ) as dim) (( x, y ) as start) seed =
    let
        ( walls, floor ) =
            case roomType of
                Rectangular ->
                    rectangular start dim

                Cross ->
                    cross start dim

                Diamond ->
                    diamond start dim

                Potion ->
                    potion start dim

                Circular ->
                    circular start dim

                DiagonalSquares ->
                    diagonalSquares start dim

                DeadEnd ->
                    -- will generate one tile for the room which is forced
                    -- into an entrance as all rooms must have at least
                    -- one entrance
                    ( [], [ ( x, y ) ] )

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


addDoors : ( Vector, Bool ) -> ( List ( Vector, Bool ), List ( Entrance, Vector ), Random.Seed ) -> ( List ( Vector, Bool ), List ( Entrance, Vector ), Random.Seed )
addDoors (( wallPos, isSoft ) as wall) ( walls, entrances, seed ) =
    let
        ( res, seed' ) =
            Dice.d 2 seed
    in
        case res of
            1 ->
                ( wall :: walls, entrances, seed' )

            _ ->
                ( walls, ( Door, wallPos ) :: entrances, seed' )



--------------------------------------------------------------


{-| Hard walls cannot have entrances in them, soft walls can
-}
makeHardWall : Vector -> ( Vector, Bool )
makeHardWall pos =
    ( pos, False )


makeSoftWall : Vector -> ( Vector, Bool )
makeSoftWall pos =
    ( pos, True )



--------------------------------------------------------------
-- Different room types


rectangular : Dimension -> Vector -> RoomComponents
rectangular ( w, h ) ( x, y ) =
    let
        ( xMax, yMax ) =
            ( x + w - 1, y + h - 1 )

        cornerPoints =
            [ ( x, y ), ( xMax, y ), ( x, yMax ), ( xMax, yMax ) ]

        corners =
            List.map makeHardWall cornerPoints

        softWall =
            \x y -> makeSoftWall ( x, y )

        walls =
            lift2 softWall [x + 1..xMax - 1] [ y, yMax ]
                ++ lift2 softWall [ x, xMax ] [y + 1..yMax - 1]

        floors =
            List.Extra.lift2 (,) [x + 1..xMax - 1] [y + 1..yMax - 1]
    in
        ( walls ++ corners, floors )


cross : Dimension -> Vector -> RoomComponents
cross ( w, h ) ( x, y ) =
    ( [], [] )


diamond : Dimension -> Vector -> RoomComponents
diamond ( w, h ) ( x, y ) =
    ( [], [] )


potion : Dimension -> Vector -> RoomComponents
potion ( w, h ) ( x, y ) =
    ( [], [] )


circular : Dimension -> Vector -> RoomComponents
circular ( w, h ) ( x, y ) =
    ( [], [] )


diagonalSquares : Dimension -> Vector -> RoomComponents
diagonalSquares ( w, h ) ( x, y ) =
    ( [], [] )
