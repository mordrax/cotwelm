module Item.Helmet exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Helmet
    = HelmetM HelmetType ArmourModel


newHelmet : HelmetType -> ID -> ItemStatus -> IdentificationStatus -> Helmet
newHelmet helmetType id status idStatus =
    case helmetType of
        BrokenHelmet ->
            HelmetM BrokenHelmet
                { ac = 0
                , baseItem = (Model id "Broken Helmet" 1000 1000 "BrokenHelmet" status idStatus <| Mass.new 0 25)
                }

        LeatherHelmet ->
            HelmetM LeatherHelmet
                { ac = 3
                , baseItem = (Model id "Leather Helmet" 500 500 "LeatherHelmet" status idStatus <| Mass.new 525 300)
                }

        IronHelmet ->
            HelmetM IronHelmet
                { ac = 6
                , baseItem = (Model id "Iron Helmet" 2000 2000 "MetalHelmet" status idStatus <| Mass.new 1050 600)
                }

        SteelHelmet ->
            HelmetM SteelHelmet
                { ac = 9
                , baseItem = (Model id "Steel Helmet" 2500 2000 "MetalHelmet" status idStatus <| Mass.new 3150 1800)
                }

        MeteoricSteelHelmet ->
            HelmetM MeteoricSteelHelmet
                { ac = 15
                , baseItem = (Model id "Meteoric Steel Helmet" 1000 2000 "MetalHelmet" status idStatus <| Mass.new 10500 6000)
                }

        HelmetOfDetectMonsters ->
            HelmetM HelmetOfDetectMonsters
                { ac = 9
                , baseItem = (Model id "Helmet Of Detect Monsters" 2500 2000 "HelmetOfDetectMonsters" status idStatus <| Mass.new 42000 24000)
                }

        EnchantedHelmOfStorms ->
            HelmetM EnchantedHelmOfStorms
                { ac = 25
                , baseItem = (Model id "Enchanted Helm Of Storms" 1000 2000 "EnchantedHelmOfStorms" status idStatus <| Mass.new 1050000 600000)
                }
