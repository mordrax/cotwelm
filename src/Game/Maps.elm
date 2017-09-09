module Game.Maps
    exposing
        ( Maps
        , downstairs
        , getCurrentLevel
        , init
        , saveLoadArea
        , tick
        , upstairs
        )

{-| Holds maps for all areas and handles interaction and rendering of them.

Static areas are:
Village
Farm
Mines lvl 0

Dynamic lvls are:
Mines lvl 1 - 8

-}

import ASCIIMaps exposing (..)
import Array.Hamt as Array exposing (Array)
import Building exposing (Building)
import Dict
import Dungeon.DungeonGenerator as DungeonGenerator
import Dungeon.Rooms.Config as Config
import Game.Level as Level exposing (Level)
import Item.Data exposing (Item)
import Monster
import Monsters.Types
import Random.Pcg as Random exposing (Generator)
import Shops
import Tile exposing (Tile)
import Types exposing (..)
import Utils.Vector exposing (Vector)


type alias Maps =
    { currentArea : Area
    , village : Level
    , farm : Level
    , abandonedMinesEntry : Level
    , abandonedMines : Array Level
    }


init : Item -> Maps
init armour =
    let
        areaToTiles =
            getASCIIMap >> Tile.mapToTiles

        levelOfArea area tiles =
            Level.initNonDungeon tiles (buildingsOfArea area) []

        mineEntryLevelWithArmour =
            areaToTiles DungeonLevelOne
                |> levelOfArea DungeonLevelOne
                |> Level.drop ( ( 13, 19 ), armour )
                |> Level.setMonsters
                    [ Monster.make Monsters.Types.Goblin ( 26, 4 )
                    , Monster.make Monsters.Types.GiantRat ( 34, 23 )
                    , Monster.make Monsters.Types.Kobold ( 14, 19 )
                    ]

        makeVisible =
            Dict.toList
                >> List.map (Tuple.mapSecond (Tile.setVisibility Known))
                >> Dict.fromList
    in
    { currentArea = Village
    , abandonedMines = Array.fromList []
    , village = levelOfArea Village (areaToTiles Village |> makeVisible)
    , farm = levelOfArea Farm (areaToTiles Farm |> makeVisible)
    , abandonedMinesEntry = mineEntryLevelWithArmour
    }


tick : Maps -> Maps
tick ({ abandonedMines } as maps) =
    Array.map Level.tick abandonedMines
        |> (\newMines -> { maps | abandonedMines = newMines })


setCurrentArea : Area -> Maps -> Maps
setCurrentArea currentArea model =
    { model | currentArea = currentArea }


setLevel : Level -> Maps -> Maps
setLevel level model =
    case model.currentArea of
        Village ->
            { model | village = level }

        Farm ->
            { model | farm = level }

        DungeonLevelOne ->
            { model | abandonedMinesEntry = level }

        DungeonLevel n ->
            { model | abandonedMines = Array.set n level model.abandonedMines }


{-| Take the current level, save it back to maps, get the upstairs level and return the
updated map with the new level.
-}
upstairs : Level -> Maps -> ( Level, Maps )
upstairs currentLevel maps =
    let
        newArea =
            case maps.currentArea of
                DungeonLevel 0 ->
                    DungeonLevelOne

                DungeonLevel n ->
                    DungeonLevel (n - 1)

                _ ->
                    Farm
    in
    maps
        |> setLevel currentLevel
        |> setCurrentArea newArea
        |> (\newMaps -> ( getCurrentLevel newMaps, newMaps ))


{-| Take the current level and the maps, generate a new level.
Save the current level and the new level back to maps, return the new level and updated maps.
-}
downstairs : Level -> Maps -> Generator ( Level, Maps )
downstairs currentLevel maps =
    let
        nextDungeonLevel =
            case maps.currentArea of
                DungeonLevel currentDungeonLevel ->
                    currentDungeonLevel + 1

                _ ->
                    0

        mapsSavedAndUpdated =
            maps
                |> setLevel currentLevel
                |> setCurrentArea (DungeonLevel nextDungeonLevel)

        mapsWithSavedCurrentLevel =
            setLevel currentLevel maps
    in
    case Array.get nextDungeonLevel maps.abandonedMines of
        Just level ->
            Random.constant ( level, mapsSavedAndUpdated )

        Nothing ->
            DungeonGenerator.generate Config.init
                |> Random.andThen (Level.generateMonsters nextDungeonLevel)
                |> Random.andThen (Level.generateLoot nextDungeonLevel)
                |> Random.map
                    (\newLevel ->
                        ( newLevel
                        , { mapsSavedAndUpdated
                            | abandonedMines = Array.push newLevel mapsWithSavedCurrentLevel.abandonedMines
                          }
                        )
                    )


saveLoadArea : Level -> Area -> Maps -> ( Level, Maps )
saveLoadArea currentLevel newArea maps =
    setLevel currentLevel maps
        |> setCurrentArea newArea
        |> (\newMaps -> ( getCurrentLevel newMaps, newMaps ))


{-| Get the map for the current area
-}
getCurrentLevel : Maps -> Level
getCurrentLevel model =
    case model.currentArea of
        Village ->
            model.village

        Farm ->
            model.farm

        DungeonLevelOne ->
            model.abandonedMinesEntry

        DungeonLevel level ->
            model.abandonedMines
                |> Array.get level
                |> Maybe.withDefault model.abandonedMinesEntry


{-| Get the ascii map for a specific area.
This is used to create a map and not during gameplay so it doesn't
make sense to ask for it for the current area.
-}
getASCIIMap : Area -> ( List String, List ( Vector, String ) )
getASCIIMap area =
    case area of
        Village ->
            villageMap

        Farm ->
            farmMap

        DungeonLevelOne ->
            dungeonLevelOneMap

        _ ->
            ( [], [] )



--------------------------
-- Initialise buildings --
--------------------------


buildingsOfArea : Area -> List Building
buildingsOfArea area =
    case area of
        Village ->
            let
                farmGate =
                    Building.newLink Farm ( 11, 31 )
            in
            [ Building.new Building.Gate ( 10, 0 ) "Village Gate" farmGate
            , Building.new Building.StrawHouseEast ( 3, 6 ) "Junk Shop" Building.Ordinary
            , Building.new Building.StrawHouseWest ( 16, 5 ) "Private House" Building.Ordinary
            , Building.new Building.Hut ( 7, 13 ) "Potion Store" (Building.Shop Shops.PotionStore)
            , Building.new Building.StrawHouseWest ( 14, 12 ) "Private House 2" Building.Ordinary
            , Building.new Building.StrawHouseEast ( 6, 17 ) "Weapon Shop" (Building.Shop Shops.WeaponSmith)
            , Building.new Building.StrawHouseWest ( 14, 17 ) "General Store" (Building.Shop Shops.GeneralStore)
            , Building.new Building.HutTemple ( 9, 22 ) "Odin's Temple" Building.Ordinary
            , Building.new Building.Well ( 11, 18 ) "Secret Entrance" (Building.newLink DungeonLevelOne ( 25, 3 ))
            ]

        Farm ->
            let
                villageGate =
                    Building.newLink Village ( 11, 1 )

                mineExit =
                    Building.newLink DungeonLevelOne ( 22, 39 )
            in
            [ Building.new Building.Gate ( 10, 32 ) "Farm Gate" villageGate
            , Building.new Building.StrawHouseWest ( 43, 23 ) "Adopted Parents House" Building.Ordinary
            , Building.new Building.MineEntrance ( 24, 1 ) "Mine Entrance" mineExit
            ]

        DungeonLevelOne ->
            let
                mineEntrance =
                    Building.newLink Farm ( 24, 2 )
            in
            [ Building.new Building.MineEntrance ( 22, 40 ) "Mine Exit" mineEntrance
            , Building.new Building.StairsDown ( 25, 2 ) "Down stairs" Building.StairDown
            ]

        _ ->
            []
