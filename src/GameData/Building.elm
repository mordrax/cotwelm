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
        )

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
    case buildingTile of
        Gate_NS ->
            BM <| Model Gate_NS (Vector.new 1 0) pos name (Vector.new 3 1) buildingType

        Hut_EF ->
            BM <| Model Hut_EF (Vector.new 2 1) pos name (Vector.new 3 3) buildingType

        StrawHouse_EF ->
            BM <| Model StrawHouse_EF (Vector.new 2 1) pos name (Vector.new 3 3) buildingType

        StrawHouse_WF ->
            BM <| Model StrawHouse_WF (Vector.new 0 1) pos name (Vector.new 3 3) buildingType

        BurntStrawHouse_WF ->
            BM <| Model BurntStrawHouse_WF (Vector.new 0 1) pos name (Vector.new 3 3) buildingType

        HutTemple_NF ->
            BM <| Model HutTemple_NF (Vector.new 2 0) pos name (Vector.new 5 6) buildingType

        MineEntrance ->
            BM <| Model MineEntrance (Vector.new 0 0) pos name (Vector.new 1 1) buildingType
