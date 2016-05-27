module GameData.Building exposing (..)

import Vector exposing (..)
import GameData.Types exposing (..)


type alias Building =
    { tile : BuildingType
    , entry : Vector
    , pos : Vector
    , name : String
    , size : Vector
    , link : Maybe Link
    }


type alias Link =
    { area : Area
    , pos : Vector
    }


type BuildingType
    = Gate_NS
    | Hut_EF
    | StrawHouse_EF
    | StrawHouse_WF
    | BurntStrawHouse_WF
    | HutTemple_NF
    | MineEntrance


new : BuildingType -> Vector -> String -> Building
new buildingType pos name =
    newWithLink buildingType pos name Nothing


{-| Given a building type, the top right corner and a nem, will create a new building
-}
newWithLink : BuildingType -> Vector -> String -> Maybe Link -> Building
newWithLink buildingType pos name link =
    let
        partBuilding =
            { name = name, pos = pos, link = link, tile = Gate_NS, size = Vector.new 0 0, entry = Vector.new 0 0 }
    in
        case buildingType of
            Gate_NS ->
                { partBuilding | tile = Gate_NS, size = Vector.new 3 1, entry = Vector.new 1 0 }

            Hut_EF ->
                { partBuilding | tile = Hut_EF, size = Vector.new 3 3, entry = Vector.new 2 1 }

            StrawHouse_EF ->
                { partBuilding | tile = StrawHouse_EF, size = Vector.new 3 3, entry = Vector.new 2 1 }

            StrawHouse_WF ->
                { partBuilding | tile = StrawHouse_WF, size = Vector.new 3 3, entry = Vector.new 0 1 }

            BurntStrawHouse_WF ->
                { partBuilding | tile = BurntStrawHouse_WF, size = Vector.new 3 3, entry = Vector.new 0 1 }

            HutTemple_NF ->
                { partBuilding | tile = HutTemple_NF, size = Vector.new 5 6, entry = Vector.new 2 0 }

            MineEntrance ->
                { partBuilding | tile = MineEntrance, size = Vector.new 1 1, entry = Vector.new 0 0 }
