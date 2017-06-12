module Item.Bracers exposing (..)

import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


setBracers : BracersType -> ( BaseItem, AC ) -> Bracers BasicItem
setBracers bracersType ( baseItem, ac ) =
    initBasicItem baseItem
        |> setBracersType bracersType
        |> setAC ac


init : BracersType -> ItemStatus -> IdentificationStatus -> Bracers BasicItem
init bracersType status idStatus =
    EveryDict.get bracersType data
        |> Maybe.withDefault normalBracers
        |> setBracers bracersType


normalBracers : ( BaseItem, AC )
normalBracers =
    ( initBaseItem "Bracers" (Prices 108 60) "bracers" (Mass.Mass 500 2000) Normal Identified
    , AC 3
    )


data : EveryDict BracersType ( BaseItem, AC )
data =
    EveryDict.fromList
        [ ( NormalBracers, normalBracers )
        , ( BracersOfDefenseNormal
          , ( initBaseItem "Bracers Of Defense Normal" (Prices 1836 1020) "bracers-enchanted" (Mass.Mass 500 2000) Normal Identified
            , AC 8
            )
          )
        , ( BracersOfDefenseS
          , ( initBaseItem "Bracers Of Defense Strong" (Prices 5616 3120) "bracers-enchanted" (Mass.Mass 500 2000) Normal Identified
            , AC 13
            )
          )
        , ( BracersOfDefenseVS
          , ( initBaseItem "Bracers Of Defense Very Strong" (Prices 11556 6420) "bracers-enchanted" (Mass.Mass 500 2000) Normal Identified
            , AC 18
            )
          )
        ]
