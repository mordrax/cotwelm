module GameData.Building
    exposing
        ( Building
        , Buildings
        , Link
        , BuildingType(..)
        , BuildingTile(..)
        , new
        , view
        , buildingType
        , isBuildingAtPosition
        , newLink
        )

{-| A building is one of those yellow huts on the map. This module represents one of those huts.

A building can be a shop, a special interactable building or a non-descript 'private house'.

Buildings are aware of their size and how to draw themselves on the map using css image.

-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Utils.Vector as Vector exposing (..)
import Utils.Lib as Lib exposing (..)
import GameData.Types exposing (..)
import Shops exposing (ShopType)


type alias Buildings =
    List Building


type alias Building =
    { tile : BuildingTile
    , entry : Vector
    , pos : Vector
    , name : String
    , size : Vector
    , buildingType : BuildingType
    }


type alias Link =
    { area : Area
    , pos : Vector
    }


type BuildingType
    = Linked Link
    | StairUp
    | StairDown
    | Shop ShopType
    | Ordinary


type BuildingTile
    = Gate_NS
    | Hut_EF
    | StrawHouse_EF
    | StrawHouse_WF
    | BurntStrawHouse_WF
    | HutTemple_NF
    | MineEntrance
    | Well
    | StairsDown
    | StairsUp


newLink : Area -> Vector -> BuildingType
newLink area pos =
    (Linked <| Link area pos)


view : Building -> Html a
view model =
    let
        posStyle =
            Lib.vectorToHtmlStyle model.pos
    in
        div [ class ("tile " ++ (toString model.tile)), posStyle ] []


{-| Given a point and a building, will return true if the point is within the building
-}
isBuildingAtPosition : Vector -> Building -> Bool
isBuildingAtPosition pos model =
    let
        bottomLeft =
            Vector.sub (Vector.add model.pos model.size) ( 1, 1 )
    in
        boxIntersectVector pos ( model.pos, bottomLeft )


buildingType : Building -> BuildingType
buildingType model =
    model.buildingType


{-| Given a building type, the top right corner and a nem, will create a new building
-}
new : BuildingTile -> Vector -> String -> BuildingType -> Building
new buildingTile pos name buildingType =
    let
        newBuilding =
            \entry size ->
                Building buildingTile entry pos name size buildingType
    in
        case buildingTile of
            Gate_NS ->
                newBuilding ( 1, 0 ) ( 3, 1 )

            Hut_EF ->
                newBuilding ( 0, 1 ) ( 2, 2 )

            StrawHouse_EF ->
                newBuilding ( 2, 1 ) ( 3, 3 )

            StrawHouse_WF ->
                newBuilding ( 0, 1 ) ( 3, 3 )

            BurntStrawHouse_WF ->
                newBuilding ( 0, 1 ) ( 3, 3 )

            HutTemple_NF ->
                newBuilding ( 2, 0 ) ( 5, 6 )

            MineEntrance ->
                newBuilding ( 0, 0 ) ( 1, 1 )

            Well ->
                newBuilding ( 0, 0 ) ( 1, 1 )

            StairsDown ->
                newBuilding ( 0, 0 ) ( 1, 1 )

            StairsUp ->
                newBuilding ( 0, 0 ) ( 1, 1 )
