module GameData.Building exposing (..)

import Utils.Vector as Vector exposing (..)
import GameData.Types exposing (..)


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


{-| Given a building type, the top right corner and a nem, will create a new building
-}
new : BuildingTile -> Vector -> String -> BuildingType -> Model
new buildingTile pos name buildingType =
    case buildingTile of
        Gate_NS ->
            Model Gate_NS (Vector.new 1 0) pos name (Vector.new 3 1) buildingType

        Hut_EF ->
            Model Hut_EF (Vector.new 2 1) pos name (Vector.new 3 3) buildingType

        StrawHouse_EF ->
            Model StrawHouse_EF (Vector.new 2 1) pos name (Vector.new 3 3) buildingType

        StrawHouse_WF ->
            Model StrawHouse_WF (Vector.new 0 1) pos name (Vector.new 3 3) buildingType

        BurntStrawHouse_WF ->
            Model BurntStrawHouse_WF (Vector.new 0 1) pos name (Vector.new 3 3) buildingType

        HutTemple_NF ->
            Model HutTemple_NF (Vector.new 2 0) pos name (Vector.new 5 6) buildingType

        MineEntrance ->
            Model MineEntrance (Vector.new 0 0) pos name (Vector.new 1 1) buildingType
