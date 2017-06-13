module Item.Bracers exposing (..)

import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


{-| Given a bracers type, will make a new pair of bracers
-}
init : BracersType -> ItemStatus -> IdentificationStatus -> Bracers BasicItem
init bracersType status idStatus =
    EveryDict.get bracersType data
        |> Maybe.withDefault normalBracers
        |> setBracersData bracersType


setBracersData : BracersType -> BracersData -> Bracers BasicItem
setBracersData bracersType (BracersData ac baseItem) =
    initBasicItem baseItem BIT_Bracers
        |> setBracersType bracersType
        |> setAC ac


type BracersData
    = BracersData AC BaseItem


normalBracers : BracersData
normalBracers =
    BracersData (AC 3) (BaseItem "Bracers" (Prices 108 60) "bracers" (Mass 500 2000) Normal Identified)


data : EveryDict BracersType BracersData
data =
    EveryDict.fromList
        [ ( NormalBracers, normalBracers )
        , ( BracersOfDefenseNormal, BracersData (AC 8) (BaseItem "Bracers Of Defense" (Prices 1836 1020) "bracers-enchanted" (Mass 500 2000) Normal Identified) )
        , ( BracersOfDefenseS, BracersData (AC 13) (BaseItem "Bracers Of Defense" (Prices 5616 3120) "bracers-enchanted" (Mass 500 2000) Normal Identified) )
        , ( BracersOfDefenseVS, BracersData (AC 18) (BaseItem "Bracers Of Defense" (Prices 11556 6420) "bracers-enchanted" (Mass 500 2000) Normal Identified) )
        ]
