module Item.Helmet exposing (..)

import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : HelmetType -> ItemStatus -> IdentificationStatus -> Helmet BasicItem
init helmetType status idStatus =
    EveryDict.get helmetType data
        |> Maybe.withDefault normalHelmet
        |> setHelmetData helmetType


setHelmetData : HelmetType -> HelmetData -> Helmet BasicItem
setHelmetData helmetType (HelmetData ac baseItem) =
    initBasicItem baseItem
        |> setHelmetType helmetType
        |> setAC ac


type HelmetData
    = HelmetData AC BaseItem


normalHelmet : HelmetData
normalHelmet =
    HelmetData (AC 3) (BaseItem "Helmet" (Prices 108 60) "helmet" (Mass 500 2000) Normal Identified)


data : EveryDict HelmetType HelmetData
data =
    EveryDict.fromList
        [ ( BrokenHelmet, HelmetData (AC 0) (BaseItem "Broken Helmet" (Prices 0 25) "broken-helmet" (Mass 1000 1000) Normal Identified) )
        , ( LeatherHelmet, HelmetData (AC 3) (BaseItem "Leather Helmet" (Prices 525 300) "leather-helmet" (Mass 500 500) Normal Identified) )
        , ( IronHelmet, HelmetData (AC 6) (BaseItem "Iron Helmet" (Prices 1050 600) "metal-helmet" (Mass 2000 2000) Normal Identified) )
        , ( SteelHelmet, HelmetData (AC 9) (BaseItem "Steel Helmet" (Prices 3150 1800) "metal-helmet" (Mass 2500 2000) Normal Identified) )
        , ( MeteoricSteelHelmet, HelmetData (AC 15) (BaseItem "Meteoric Steel Helmet" (Prices 10500 6000) "metal-helmet" (Mass 1000 2000) Normal Identified) )
        , ( HelmetOfDetectMonsters, HelmetData (AC 9) (BaseItem "Helmet Of Detect Monsters" (Prices 42000 24000) "helmet-of-detect-monsters" (Mass 2500 2000) Normal Identified) )
        , ( EnchantedHelmOfStorms, HelmetData (AC 25) (BaseItem "Enchanted Helm Of Storms" (Prices 1050000 600000) "enchanted-helm-of-storms" (Mass 1000 2000) Normal Identified) )
        ]
