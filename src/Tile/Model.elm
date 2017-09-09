module Tile.Model exposing (..)

import Building exposing (Building)
import Container exposing (Container)
import Dict exposing (Dict)
import Hero exposing (Hero)
import Item.Data exposing (Item)
import Monster exposing (Monster)
import Tile.Types exposing (..)
import Types exposing (..)
import Utils.Vector as Vector exposing (Vector)


type alias Tile =
    { type_ : TileType
    , solid : Bool
    , occupant : Occupant
    , position : Vector
    , ground : Container Item
    , visible : Visibility
    , isLit : Bool
    , description : String
    }


type Occupant
    = B Building
    | H Hero
    | M Monster
    | Empty


type alias HalfTileData =
    ( TileType, TileType, Int )


type alias TileNeighbours =
    ( Maybe Tile, Maybe Tile, Maybe Tile, Maybe Tile )


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
        , ( '!', Sign )
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
