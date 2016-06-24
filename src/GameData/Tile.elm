module GameData.Tile exposing (..)

import Utils.Vector exposing (..)
import GameData.Building as Building exposing (..)


type alias Tile =
    { solid : Bool
    , tile : TileType
    , pos : Vector
    , building : Maybe Building.Model
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
