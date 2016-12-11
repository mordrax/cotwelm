module Tile
    exposing
        ( Tile
        , Tiles
        , TileType(..)
        , TileNeighbours
        , ground
        , drop
        , updateGround
        , isSameType
        , isSamePosition
        , isSolid
        , position
        , setPosition
        , mapToTiles
        , view
        , toTile
        , tileType
        )

import Container exposing (Container)
import Dict exposing (..)
import GameData.Building as Building exposing (..)
import Hero.Hero as Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Item.Item as Item exposing (..)
import List exposing (..)
import List.Extra exposing (..)
import Monster.Monster as Monster exposing (..)
import Random.Pcg as Random
import String exposing (..)
import String.Extra as StringX
import Utils.Lib as Lib exposing (..)
import Utils.Mass as Mass exposing (Capacity)
import Utils.Vector as Vector exposing (..)
import Utils.Vector exposing (..)


type alias Model =
    { type_ : TileType
    , solid : Bool
    , items : List Item
    , occupant : Occupant
    , position : Vector
    , ground : Container Item
    }


type alias TileNeighbours =
    ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )


type Occupant
    = B Building
    | H Hero
    | M Monster
    | Empty


type Tile
    = A Model


type alias Tiles =
    List Tile



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


ground : Tile -> Container Item
ground (A { ground }) =
    ground


drop : Item -> Tile -> Tile
drop item (A model) =
    let
        ( groundWithItem, _ ) =
            Container.add item model.ground
    in
        (A { model | ground = groundWithItem })


updateGround : Container Item -> Tile -> Tile
updateGround newGround (A model) =
    A { model | ground = newGround }


tileType : Tile -> TileType
tileType (A { type_ }) =
    type_


isSolid : Tile -> Bool
isSolid (A { solid }) =
    solid


isSameType : Tile -> Tile -> Bool
isSameType (A t1) (A t2) =
    t1.type_ == t2.type_


isSamePosition : Tile -> Tile -> Bool
isSamePosition (A t1) (A t2) =
    t1.position == t2.position


setPosition : Vector -> Tile -> Tile
setPosition newPosition (A model) =
    A <| { model | position = newPosition }


position : Tile -> Vector
position (A { position }) =
    position


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : List String -> List Tile
mapToTiles asciiMap =
    let
        rowToTiles y asciiRow =
            List.indexedMap (\x char -> toTile ( x, y ) (asciiToTileType char)) (String.toList asciiRow)

        tiles =
            List.indexedMap rowToTiles asciiMap
    in
        List.concat tiles


{-| Create a Tile from some x,y coordinates and a tile type
-}
toTile : Vector -> TileType -> Tile
toTile ( x, y ) tileType =
    let
        solid =
            List.member tileType solidTiles

        container =
            Item.containerBuilder <| Capacity Random.maxInt Random.maxInt
    in
        A <| Model tileType solid [] Empty ( x, y ) container


view : Tile -> Float -> TileNeighbours -> (Vector -> a) -> List (Html a)
view (A ({ type_, position, ground } as model)) scale neighbours onClick =
    let
        transform rotation scale =
            case ( rotation, scale ) of
                ( 0, 1 ) ->
                    ( "", "" )

                ( 0, _ ) ->
                    ( "transform", "scale" ++ toString ( scale, scale ) )

                ( _, 1 ) ->
                    ( "transform", "rotate(" ++ toString rotation ++ "deg)" )

                _ ->
                    ( "transform", "rotate(" ++ toString rotation ++ "deg) scale" ++ toString ( scale, scale ) )

        rotation =
            case List.Extra.find (\( halfTileType, _, _ ) -> type_ == halfTileType) halfTiles of
                Nothing ->
                    0

                Just data ->
                    rotateHalfTiles model data neighbours

        tileToCss =
            toString
                >> StringX.dasherize
                >> String.dropLeft 1

        tileDiv css =
            div
                [ HA.class ("tile " ++ css ++ " " ++ toString position)
                , HA.style [ transform rotation scale ]
                , Lib.toScaledTilePosition position scale
                , clickAttribute position
                ]
                []

        itemsOnGround =
            Container.list ground

        itemDiv item =
            div
                [ HA.class ("tile cotw-item " ++ (Item.css item))
                , HA.style [ transform rotation scale ]
                , Lib.toScaledTilePosition position scale
                ]
                []

        clickAttribute position =
            HE.onClick (onClick position)

        baseTile =
            tileDiv (tileToCss type_)
    in
        case itemsOnGround of
            [] ->
                [ baseTile ]

            item :: [] ->
                [ baseTile, itemDiv item ]

            _ ->
                [ baseTile, tileDiv <| tileToCss TreasurePile ]


type alias HalfTileData =
    ( TileType, TileType, Int )


halfTiles : List HalfTileData
halfTiles =
    [ ( PathRock, Path, 0 )
    , ( PathGrass, Path, 0 )
    , ( WaterGrass, Water, 0 )
    , ( WaterPath, Path, 180 )
    , ( WallDarkDgn, DarkDgn, 180 )
    , ( WallLitDgn, LitDgn, 180 )
    ]


rotateHalfTiles : Model -> HalfTileData -> TileNeighbours -> Int
rotateHalfTiles { type_, position } ( _, targetTileType, rotationOffset ) neighbours =
    let
        aOrb x a b =
            x == a || x == b

        checkUpLeft maybeUp maybeLeft =
            case ( maybeUp, maybeLeft ) of
                ( Just up, Just left ) ->
                    if (isSameType up left && tileType up == targetTileType) then
                        90
                    else
                        0

                _ ->
                    0

        checkUpRight maybeUp maybeRight =
            case ( maybeUp, maybeRight ) of
                ( Just up, Just right ) ->
                    if (isSameType up right && tileType up == targetTileType) then
                        180
                    else
                        0

                _ ->
                    0

        -- no down left check as this is default tile direction
        checkDownRight maybeDown maybeRight =
            case ( maybeDown, maybeRight ) of
                ( Just down, Just right ) ->
                    if (isSameType down right && tileType down == targetTileType) then
                        -90
                    else
                        0

                _ ->
                    0
    in
        case neighbours of
            ( Nothing, _, Nothing, _ ) ->
                0

            ( _, Nothing, _, Nothing ) ->
                0

            ( up, right, down, left ) ->
                (checkUpLeft up left) + (checkUpRight up right) + (checkDownRight down right) + rotationOffset


asciiToTileType : Char -> TileType
asciiToTileType char =
    Maybe.withDefault Grass (Dict.get char asciiTileMap)


asciiTileMap : Dict Char TileType
asciiTileMap =
    Dict.fromList
        [ ( '^', Rock )
        , ( ',', Grass )
        , ( 'o', DarkDgn )
        , ( '~', Water )
        , ( '.', Path )
        , ( 'O', LitDgn )
        , ( '_', PathRock )
        , ( ';', PathGrass )
        , ( 'd', WallDarkDgn )
        , ( 'w', WaterGrass )
        , ( 'W', WaterPath )
        , ( 'D', WallLitDgn )
        , ( 'g', Grass50Cave50 )
        , ( 'G', Grass10Cave90 )
        , ( 'c', White50Cave50 )
        , ( 'C', White90Cave10 )
        , ( '=', Crop )
        , ( 'e', Well )
        , ( '>', StairsDown )
        ]


solidTiles : List TileType
solidTiles =
    [ Rock
    , Grass10Cave90
    , White50Cave50
    , Crop
    , Well
    , PathRock
    , WallDarkDgn
    , WallLitDgn
    ]


type TileType
    = Rock
    | PathRock
    | MineEntrance
    | PortcullisClosed
    | PortcullisOpen
    | Sign
    | Favicon
    | Grass
    | PathGrass
    | Crop
    | DestoyedVegePatch
    | VegePatch
    | Well
    | Wagon
    | DarkDgn
    | WallDarkDgn
    | CastleCornerParapet
    | CastleWall
    | CastleParapet
    | GreenWell
    | Ashes
    | Water
    | WaterGrass
    | BlueSquare
    | Fountain
    | Altar
    | Status
    | Throne
    | Path
    | WaterPath
    | StairsUp
    | StairsDown
    | TownWallCorner
    | TownWallStop
    | TownWall
    | LitDgn
    | WallLitDgn
    | DoorClosed
    | DoorOpen
    | DoorBroken
    | Cobweb
    | Pillar
    | Grass50Cave50
    | Grass10Cave90
    | White50Cave50
    | White90Cave10
    | TreasurePile
