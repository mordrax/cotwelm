module GameData.Tile exposing (..)


type alias TileModel =
    { class : String
    }


tile : Tile -> TileModel
tile tile =
    case tile of
        Rock ->
            { class = "Rock" }

        Grass ->
            { class = "Grass" }

        DarkDgn ->
            { class = "DarkDgn" }

        Water ->
            { class = "Water" }

        Path ->
            { class = "Path" }

        LitDgn ->
            { class = "LitDgn" }

        PathRock ->
            { class = "PathRock" }

        PathGrass ->
            { class = "PathGrass" }

        WallDarkDgn ->
            { class = "WallDarkDgn" }

        WaterGrass ->
            { class = "WaterGrass" }

        WaterPath ->
            { class = "WaterPath" }

        WallLitDgn ->
            { class = "WallLitDgn" }

        Grass50Cave50 ->
            { class = "Grass50Cave50" }

        Grass10Cave90 ->
            { class = "Grass10Cave90" }

        White50Cave50 ->
            { class = "White50Cave50" }

        White90Cave10 ->
            { class = "White90Cave10" }

        Crop ->
            { class = "Crop" }

        MineEntrance ->
            { class = "MineEntrance" }

        Well ->
            { class = "Well" }

        Building ->
            { class = "Building" }

        TreasurePile ->
            { class = "TreasurePile" }


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
