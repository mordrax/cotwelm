module Tile
    exposing
        ( Tile
        , Visibility(..)
        , TileType(..)
        , TileNeighbours
        , drop
        , updateGround
        , isSameType
        , isSamePosition
        , setPosition
        , mapToTiles
        , view
        , toTile
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


type alias Tile =
    { type_ : TileType
    , solid : Bool
    , items : List Item
    , occupant : Occupant
    , position : Vector
    , ground : Container Item
    , visible : Visibility
    }


type Visibility
    = Unknown
    | Explored
    | WithinFOV


type alias TileNeighbours =
    ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )


type Occupant
    = B Building
    | H Hero
    | M Monster
    | Empty


type alias Tiles =
    List Tile



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


drop : Item -> Tile -> Tile
drop item model =
    let
        ( groundWithItem, _ ) =
            Container.add item model.ground
    in
        { model | ground = groundWithItem }


updateGround : List Item -> Tile -> Tile
updateGround items model =
    { model | ground = Container.set items model.ground }


isSameType : Tile -> Tile -> Bool
isSameType t1 t2 =
    t1.type_ == t2.type_


isSamePosition : Tile -> Tile -> Bool
isSamePosition t1 t2 =
    t1.position == t2.position


setPosition : Vector -> Tile -> Tile
setPosition newPosition model =
    { model | position = newPosition }


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
        Tile tileType solid [] Empty ( x, y ) container Unknown


view : Tile -> Float -> TileNeighbours -> (Vector -> a) -> List (Html a)
view ({ type_, position, ground, visible } as model) scale neighbours onClick =
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
                , HA.style [ transform rotation scale, ( "pointer-events", "none" ) ]
                , Lib.toScaledTilePosition position scale
                ]
                []

        clickAttribute position =
            HE.onClick (onClick position)

        baseTile =
            tileDiv (tileToCss type_)
    in
        case ( itemsOnGround, visible ) of
            ( _, Unknown ) ->
                []

            ( _, Explored ) ->
                [ baseTile ]

            ( item :: [], WithinFOV ) ->
                [ baseTile, itemDiv item ]

            ( _, WithinFOV ) ->
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


rotateHalfTiles : Tile -> HalfTileData -> TileNeighbours -> Int
rotateHalfTiles { type_, position } ( _, targetTileType, rotationOffset ) neighbours =
    let
        aOrb x a b =
            x == a || x == b

        checkUpLeft maybeUp maybeLeft =
            case ( maybeUp, maybeLeft ) of
                ( Just up, Just left ) ->
                    if (isSameType up left && up.type_ == targetTileType) then
                        90
                    else
                        0

                _ ->
                    0

        checkUpRight maybeUp maybeRight =
            case ( maybeUp, maybeRight ) of
                ( Just up, Just right ) ->
                    if (isSameType up right && up.type_ == targetTileType) then
                        180
                    else
                        0

                _ ->
                    0

        -- no down left check as this is default tile direction
        checkDownRight maybeDown maybeRight =
            case ( maybeDown, maybeRight ) of
                ( Just down, Just right ) ->
                    if (isSameType down right && down.type_ == targetTileType) then
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
