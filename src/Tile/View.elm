module Tile.View exposing (view)

import Container exposing (Container)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Item exposing (Item)
import List.Extra as ListX
import String.Extra as StringX
import Tile.Model exposing (..)
import Tile.Types exposing (..)
import Types exposing (..)
import Utils.Misc as Misc
import Utils.Vector as Vector exposing (Vector)
import Css exposing (..)


styles =
    Css.asPairs >> HA.style


stylesExtra cssStyles extras =
    HA.style (asPairs cssStyles ++ extras)


view : Tile -> Float -> TileNeighbours -> (Vector -> a) -> List (Html a)
view ({ type_, position, ground, visible } as model) scaleTile neighbours onClick =
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

        tileDiv css =
            div
                [ HA.class ("tile " ++ css ++ " " ++ toString position)
                , styles [ transforms [ scale scaleTile, rotate (deg rotation) ] ]
                , Misc.toScaledTilePosition position scaleTile
                , clickAttribute position
                ]
                []

        itemsOnGround =
            Container.list ground

        itemDiv item =
            div
                [ HA.class ("tile cotw-item " ++ (Item.css item))
                , stylesExtra
                    [ transforms [ rotate (deg rotation), scale scaleTile ] ]
                    [ ( "pointer-events", "none" ) ]
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
                [ baseTile, itemDiv singleItem ]

            ( a :: b :: _, _ ) ->
                [ baseTile, tileDiv <| tileToCss TreasurePile ]

            _ ->
                [ baseTile ]


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
                    if (up.type_ == left.type_ && up.type_ == targetTileType) then
                        90
                    else
                        0

                _ ->
                    0

        checkUpRight maybeUp maybeRight =
            case ( maybeUp, maybeRight ) of
                ( Just up, Just right ) ->
                    if (up.type_ == right.type_ && up.type_ == targetTileType) then
                        180
                    else
                        0

                _ ->
                    0

        -- no down left check as this is default tile direction
        checkDownRight maybeDown maybeRight =
            case ( maybeDown, maybeRight ) of
                ( Just down, Just right ) ->
                    if (down.type_ == right.type_ && down.type_ == targetTileType) then
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
