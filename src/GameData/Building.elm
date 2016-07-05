module GameData.Building
    exposing
        ( Building
        , ShopType(..)
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


type Building
    = BM Model


type alias Model =
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


type ShopType
    = WeaponSmith
    | GeneralStore
    | PotionStore
    | JunkShop


type BuildingType
    = LinkType Link
    | ShopType ShopType
    | Ordinary


type BuildingTile
    = Gate_NS
    | Hut_EF
    | StrawHouse_EF
    | StrawHouse_WF
    | BurntStrawHouse_WF
    | HutTemple_NF
    | MineEntrance


newLink : Area -> Vector -> BuildingType
newLink area pos =
    (LinkType <| Link area pos)


view : Building -> Html a
view (BM model) =
    let
        posStyle =
            Lib.vectorToHtmlStyle model.pos
    in
        div [ class ("tile " ++ (toString model.tile)), posStyle ] []


{-| Given a point and a building, will return true if the point is within the building
-}
isBuildingAtPosition : Vector -> Building -> Bool
isBuildingAtPosition pos (BM model) =
    let
        bottomLeft =
            Vector.sub (Vector.add model.pos model.size) (Vector.new 1 1)
    in
        boxIntersect pos ( model.pos, bottomLeft )


buildingType : Building -> BuildingType
buildingType (BM model) =
    model.buildingType


{-| Given a building type, the top right corner and a nem, will create a new building
-}
new : BuildingTile -> Vector -> String -> BuildingType -> Building
new buildingTile pos name buildingType =
    let
        newBuilding =
            \entry size ->
                BM <| Model buildingTile entry pos name size buildingType
    in
        case buildingTile of
            Gate_NS ->
                newBuilding (Vector.new 1 0) (Vector.new 3 1)

            Hut_EF ->
                newBuilding (Vector.new 2 1) (Vector.new 3 3)

            StrawHouse_EF ->
                newBuilding (Vector.new 2 1) (Vector.new 3 3)

            StrawHouse_WF ->
                newBuilding (Vector.new 0 1) (Vector.new 3 3)

            BurntStrawHouse_WF ->
                newBuilding (Vector.new 0 1) (Vector.new 3 3)

            HutTemple_NF ->
                newBuilding (Vector.new 2 0) (Vector.new 5 6)

            MineEntrance ->
                newBuilding (Vector.new 0 0) (Vector.new 1 1)
