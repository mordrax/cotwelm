module GameData.Tile exposing (..)

import Lib exposing (..)


type alias Tile =
    { solid : Bool
    , tile : TileType
    , pos : Coordinate
    , building : Maybe Building
    }


type alias Building =
    { tile : BuildingType
    , entry : Coordinate
    , pos : Coordinate
    , name : String
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


type BuildingType
    = Gate_NS
    | Hut_EF
    | StrawHouse_EF
    | StrawHouse_WF
    | BurntStrawHouse_WF
    | HutTemple_NF
    | MineEntrance


asciiToTile : Char -> TileType
asciiToTile char =
    case char of
        '^' ->
            Rock

        ',' ->
            Grass

        'o' ->
            DarkDgn

        '~' ->
            Water

        '.' ->
            Path

        'O' ->
            LitDgn

        '_' ->
            PathRock

        ';' ->
            PathGrass

        'd' ->
            WallDarkDgn

        'w' ->
            WaterGrass

        'W' ->
            WaterPath

        'D' ->
            WallLitDgn

        'g' ->
            Grass50Cave50

        'G' ->
            Grass10Cave90

        'c' ->
            White50Cave50

        'C' ->
            White90Cave10

        '=' ->
            Crop

        'e' ->
            Well

        _ ->
            Grass
