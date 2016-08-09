module Tile
    exposing
        ( Tile
        , TileType(..)
        , isSameType
        , isSolid
        , mapToTiles
        , tileToHtml
        , toTile
        )

import Utils.Vector exposing (..)
import GameData.Building as Building exposing (..)
import Item.Item as Item exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Lib as Lib exposing (..)
import List exposing (..)
import Dict exposing (..)
import String exposing (..)
import Hero exposing (..)
import Monster.Monster as Monster exposing (..)
import List.Extra exposing (..)


type alias Model =
    { tile : TileType
    , solid : Bool
    , items : List Item
    , occupant : Occupant
    }


type Occupant
    = B Building
    | H Hero
    | M Monster
    | Empty


type BaseTile
    = A Model


type alias Tile =
    { base : BaseTile
    , position : Vector
    }



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


isSolid : Tile -> Bool
isSolid { base } =
    let
        (A { solid }) =
            base
    in
        solid


isSameType : Tile -> Tile -> Bool
isSameType t1 t2 =
    let
        (A m1) =
            t1.base

        (A m2) =
            t2.base
    in
        m1.tile == m2.tile


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : List String -> List Tile
mapToTiles asciiMap =
    let
        rowToTiles =
            \y asciiRow -> List.indexedMap (\x char -> toTile ( x, y ) (asciiToTileType char)) (String.toList asciiRow)

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
    in
        Tile (A <| Model tileType solid [] Empty) ( x, y )


tileToHtml :
    Tile
    -> (Tile -> ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile ))
    -> Html a
tileToHtml ({ base, position } as tile) neighbours =
    let
        (A model) =
            base

        halfTiles =
            [ ( PathRock, Path )
            , ( PathGrass, Path )
            , ( WaterGrass, Water )
            , ( WaterPath, Water )
              --, (Grass50Cave50, Grass)
              --, (White50Cave50, White)
            , ( WallDarkDgn, Rock )
            , ( WallLitDgn, Rock )
            ]

        halfTile =
            List.Extra.find (\x -> model.tile == (fst x)) halfTiles

        getType =
            \tile ->
                let
                    { base } =
                        tile

                    (A model) =
                        base
                in
                    model.tile

        aOrb =
            \x a b -> x == a || x == b

        rotation =
            case halfTile of
                Nothing ->
                    0

                Just ( _, tileType ) ->
                    let
                        checkUpLeft =
                            \up left ->
                                if List.all (\x -> aOrb (getType x) tileType model.tile) [ up, left ] then
                                    90
                                else
                                    0

                        checkUpRight =
                            \up right ->
                                if List.all (\x -> aOrb (getType x) tileType model.tile) [ up, right ] then
                                    180
                                else
                                    0

                        -- no down left check as this is default tile direction
                        checkDownRight =
                            \down right ->
                                if List.all (\x -> aOrb (getType x) tileType model.tile) [ right, down ] then
                                    -90
                                else
                                    0
                    in
                        case neighbours tile of
                            ( Just up, Just right, Just down, Just left ) ->
                                (checkUpLeft up left) + (checkUpRight up right) + (checkDownRight down right)

                            _ ->
                                0
    in
        div
            [ class ("tile " ++ toString model.tile)
            , style [ ( "transform", "rotate(" ++ (toString rotation) ++ "deg)" ) ]
            , Lib.vectorToHtmlStyle position
            ]
            []


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
