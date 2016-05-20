module GameData.Tile exposing (..)


type alias TileModel =
    { class : String
    }


type Tile
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
    | MineEntrance
    | Well
    | Building
    | TreasurePile


asciiToTile : Char -> Tile
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

        'M' ->
            MineEntrance

        '#' ->
            Building

        'e' ->
            Well

        _ ->
            Grass
