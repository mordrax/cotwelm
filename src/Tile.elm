module Tile
    exposing
        ( HalfTileData
        , Tile
        , TileNeighbours
        , TileType(..)
        , drop
        , mapToTiles
        , pickup
        , setPosition
        , setVisibility
        , toTile
        , updateGround
        , view
        , viewScaled
        , viewWithTooltip
        )

import Building exposing (Building)
import Container exposing (Container)
import Css exposing (..)
import Dict exposing (Dict)
import Hero exposing (Hero)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Item
import Item.Data exposing (Item)
import List.Extra as ListX
import Monster exposing (Monster)
import Random.Pcg as Random
import String.Extra as StringX
import Types exposing (..)
import Utils.Mass as Mass exposing (Capacity)
import Utils.Misc as Misc
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



-----------------------------------------------------------------------------------
-- Turn a list of strings which represents ascii encoded tiles into actual Tiles --
-----------------------------------------------------------------------------------


{-| Drop something onto the ground (which is a container on the tile.
-}
drop : Item -> Tile -> Tile
drop item tile =
    Container.add item tile.ground
        |> Result.map (\itemOnGround -> { tile | ground = itemOnGround })
        |> Result.withDefault tile


pickup : Tile -> ( List Item, Tile )
pickup ({ ground } as tile) =
    ( Container.list ground, { tile | ground = Container.set [] ground } )


updateGround : List Item -> Tile -> Tile
updateGround items model =
    { model | ground = Container.set items model.ground }


setPosition : Vector -> Tile -> Tile
setPosition newPosition model =
    { model | position = newPosition }


setVisibility : Visibility -> Tile -> Tile
setVisibility visibility tile =
    { tile | visible = visibility }


setDescription : String -> Tile -> Tile
setDescription description tile =
    { tile | description = description }


{-| Given a ASCII list of strings representing tiles, output a list of tiles
-}
mapToTiles : ( List String, List ( Vector, String ) ) -> Dict Vector Tile
mapToTiles ( asciiMap, tileDescriptions ) =
    let
        rowToTiles y asciiRow =
            List.indexedMap (\x char -> toTile ( x, y ) (asciiToTileType char)) (String.toList asciiRow)

        tilesDict =
            List.indexedMap rowToTiles asciiMap
                |> List.concat
                |> List.map (\tile -> ( tile.position, tile ))
                |> Dict.fromList

        updateTileDescription ( tilePosition, description ) dict =
            Dict.get tilePosition dict
                |> Maybe.map (setDescription description)
                |> Maybe.map (\v -> Dict.insert tilePosition v dict)
                |> Maybe.withDefault dict
    in
    List.foldl updateTileDescription tilesDict tileDescriptions


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
    Tile tileType solid Empty ( x, y ) container Hidden False ""


asciiToTileType : Char -> TileType
asciiToTileType char =
    Maybe.withDefault Grass (Dict.get char asciiTileMap)



-- View


styles : List Css.Mixin -> Html.Attribute msg
styles =
    Css.asPairs >> HA.style


viewScaled : Float -> TileNeighbours -> (Vector -> a) -> Tile -> List (Html a)
viewScaled scale =
    view_ scale False


viewWithTooltip : TileNeighbours -> (Vector -> a) -> Tile -> List (Html a)
viewWithTooltip =
    view_ 1.0 True


view : TileNeighbours -> (Vector -> a) -> Tile -> List (Html a)
view =
    view_ 1.0 False


view_ :
    Float -- scale
    -> Bool -- tooltip
    -> TileNeighbours
    -> (Vector -> a)
    -> Tile
    -> List (Html a)
view_ scaleTile withTooltip neighbours onClick ({ type_, position, ground, visible } as model) =
    let
        rotation =
            case ListX.find (\( halfTileType, _, _ ) -> type_ == halfTileType) halfTiles of
                Nothing ->
                    0

                Just data ->
                    rotateHalfTiles model data neighbours

        tileToCss =
            toString
                >> StringX.dasherize
                >> String.dropLeft 1

        toolTipAttribute =
            if withTooltip then
                HA.class "tooltip"
            else
                HA.class ""

        tooltipDiv =
            div
                [ toolTipAttribute
                , styles [ width (pct 100), height (pct 100) ]
                , styles [ transforms [ scale scaleTile ], Css.position absolute, width (px 32), height (px 32), zIndex (int 1) ]
                , Misc.toScaledTilePosition position scaleTile
                ]
                [ span
                    [ HA.class "tooltiptext", styles [ bottom (px -32) ] ]
                    [ Html.text "abc" ]
                ]

        tileDiv css =
            div
                [ HA.class (toString position)
                , styles [ transforms [ scale scaleTile ], Css.position absolute, width (px 32), height (px 32) ]
                , Misc.toScaledTilePosition position scaleTile
                , clickAttribute position
                ]
                [ div
                    [ HA.class ("tile " ++ css)
                    , styles [ transforms [ rotate (deg rotation) ] ]
                    ]
                    []
                ]

        itemsOnGround =
            Container.list ground

        itemDiv item =
            div
                [ HA.class ("tile cotw-item " ++ Item.css item)
                , HA.style (( "pointer-events", "none" ) :: Css.asPairs [ transforms [ rotate (deg rotation), scale scaleTile ] ])
                , Misc.toScaledTilePosition position scaleTile
                ]
                []

        clickAttribute position =
            HE.onClick (onClick position)

        baseTile =
            tileDiv (tileToCss type_)
    in
    case ( itemsOnGround, visible ) of
        ( _, Hidden ) ->
            []

        ( singleItem :: [], _ ) ->
            [ tooltipDiv, baseTile, itemDiv singleItem ]

        ( a :: b :: _, _ ) ->
            [ tooltipDiv, baseTile, tileDiv <| tileToCss TreasurePile ]

        _ ->
            [ tooltipDiv, baseTile ]


styleTile : List Css.Mixin
styleTile =
    [ width (px 32)
    , height (px 32)
    , display inlineBlock
    , position absolute
    ]


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
                    if up.type_ == left.type_ && up.type_ == targetTileType then
                        90
                    else
                        0

                _ ->
                    0

        checkUpRight maybeUp maybeRight =
            case ( maybeUp, maybeRight ) of
                ( Just up, Just right ) ->
                    if up.type_ == right.type_ && up.type_ == targetTileType then
                        180
                    else
                        0

                _ ->
                    0

        -- no down left check as this is default tile direction
        checkDownRight maybeDown maybeRight =
            case ( maybeDown, maybeRight ) of
                ( Just down, Just right ) ->
                    if down.type_ == right.type_ && down.type_ == targetTileType then
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
            checkUpLeft up left + checkUpRight up right + checkDownRight down right + rotationOffset
