module Item.Helmet exposing (..)

import Item.Data exposing (..)


type Helmet
    = Helmet HelmetType AC


init : HelmetType -> Helmet
init helmetType =
    case helmetType of
        BrokenHelmet ->
            Helmet BrokenHelmet (AC 0)

        LeatherHelmet ->
            Helmet LeatherHelmet (AC 3)

        IronHelmet ->
            Helmet IronHelmet (AC 6)

        SteelHelmet ->
            Helmet SteelHelmet (AC 9)

        MeteoricSteelHelmet ->
            Helmet MeteoricSteelHelmet (AC 15)

        HelmetOfDetectMonsters ->
            Helmet HelmetOfDetectMonsters (AC 9)

        EnchantedHelmOfStorms ->
            Helmet EnchantedHelmOfStorms (AC 25)


blueprint : HelmetType -> BaseItemData
blueprint helmetType =
    case helmetType of
        BrokenHelmet ->
            BaseItemData "Broken Helmet" 1000 1000 "BrokenHelmet" 0 25

        LeatherHelmet ->
            BaseItemData "Leather Helmet" 500 500 "LeatherHelmet" 525 300

        IronHelmet ->
            BaseItemData "Iron Helmet" 2000 2000 "MetalHelmet" 1050 600

        SteelHelmet ->
            BaseItemData "Steel Helmet" 2500 2000 "MetalHelmet" 3150 1800

        MeteoricSteelHelmet ->
            BaseItemData "Meteoric Steel Helmet" 1000 2000 "MetalHelmet" 10500 6000

        HelmetOfDetectMonsters ->
            BaseItemData "Helmet Of Detect Monsters" 2500 2000 "HelmetOfDetectMonsters" 42000 24000

        EnchantedHelmOfStorms ->
            BaseItemData "Enchanted Helm Of Storms" 1000 2000 "EnchantedHelmOfStorms" 1050000 600000
