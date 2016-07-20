module Tile
    exposing
        ( Tile
        , TileType
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
    = Base Model


type alias Tile =
    { base : BaseTile
    , position : Vector
    }


type TileType
    = Rock
    | Grass
    | DarkDgn
    | Water
    | Path
    | LitDgn
    | PathRock
    | PathGrass
    | WallDarkDgn
    | WaterGrass
    | WaterPath
    | WallLitDgn
    | Grass50Cave50
    | Grass10Cave90
    | White50Cave50
    | White90Cave10
    | Crop
    | Well
    | TreasurePile



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


isSolid : Tile -> Bool
isSolid { base } =
    let
        (Base { solid }) =
            base
    in
        solid


isSameType : Tile -> Tile -> Bool
isSameType t1 t2 =
    let
        (Base m1) =
            t1.base

        (Base m2) =
            t2.base
    in
        m1.tile == m2.tile


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : List String -> List Tile
mapToTiles asciiMap =
    let
        tiles =
            List.indexedMap mapOneRowToTiles asciiMap
    in
        List.concat tiles


{-| Given a row of ascii, turn it into a row of Html
-}
mapOneRowToTiles : Int -> String -> List Tile
mapOneRowToTiles y asciiRow =
    let
        -- turn a row of string into a list of chars
        asciiChars =
            String.toList asciiRow
    in
        toTiles y asciiChars


toTiles : Int -> List Char -> List Tile
toTiles y asciiTiles =
    List.indexedMap (toTile y) asciiTiles


{-| Create a Tile from some x,y coordinates and a tile type
-}
toTile : Int -> Int -> Char -> Tile
toTile y x asciiTile =
    let
        ( tileType, solid ) =
            asciiTileData asciiTile
    in
        Tile (Base <| Model tileType solid [] Empty) ( x, y )


tileToHtml : Tile -> ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile ) -> Html a
tileToHtml ({ base, position } as tile) neighbours =
    let
        (Base model) =
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

                    (Base model) =
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
                        case neighbours of
                            ( Nothing, _, _, _ ) ->
                                0

                            ( _, Nothing, _, _ ) ->
                                0

                            ( _, _, Nothing, _ ) ->
                                0

                            ( _, _, _, Nothing ) ->
                                0

                            ( Just up, Just right, Just down, Just left ) ->
                                (checkUpLeft up left) + (checkUpRight up right) + (checkDownRight down right)
    in
        div
            [ class ("tile " ++ toString model.tile)
            , style [ ( "transform", "rotate(" ++ (toString rotation) ++ "deg)" ) ]
            , Lib.vectorToHtmlStyle position
            ]
            []


asciiTileData : Char -> ( TileType, Bool )
asciiTileData char =
    case char of
        '^' ->
            ( Rock, True )

        ',' ->
            ( Grass, False )

        'o' ->
            ( DarkDgn, False )

        '~' ->
            ( Water, False )

        '.' ->
            ( Path, False )

        'O' ->
            ( LitDgn, False )

        '_' ->
            ( PathRock, False )

        ';' ->
            ( PathGrass, False )

        'd' ->
            ( WallDarkDgn, False )

        'w' ->
            ( WaterGrass, False )

        'W' ->
            ( WaterPath, False )

        'D' ->
            ( WallLitDgn, False )

        'g' ->
            ( Grass50Cave50, False )

        'G' ->
            ( Grass10Cave90, True )

        'c' ->
            ( White50Cave50, True )

        'C' ->
            ( White90Cave10, False )

        '=' ->
            ( Crop, True )

        'e' ->
            ( Well, True )

        _ ->
            ( Grass, False )
