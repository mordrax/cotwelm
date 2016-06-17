module Item.Helmet exposing (..)

import Mass exposing (..)
import IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Helmet
    = HelmetModelTag HelmetType Model ArmourModel


newHelmet : HelmetType -> ID -> ItemStatus -> IdentificationStatus -> Helmet
newHelmet helmetType id status idStatus =
    case helmetType of
        BrokenHelmet ->
            HelmetModelTag BrokenHelmet
                (Model id "Broken Helmet" 1000 1000 "BrokenHelmet" status idStatus <| Mass.new 0 25)
                (ArmourModel 0)

        LeatherHelmet ->
            HelmetModelTag LeatherHelmet
                (Model id "Leather Helmet" 500 500 "LeatherHelmet" status idStatus <| Mass.new 525 300)
                (ArmourModel 3)

        IronHelmet ->
            HelmetModelTag IronHelmet
                (Model id "Iron Helmet" 2000 2000 "MetalHelmet" status idStatus <| Mass.new 1050 600)
                (ArmourModel 6)

        SteelHelmet ->
            HelmetModelTag SteelHelmet
                (Model id "Steel Helmet" 2500 2000 "MetalHelmet" status idStatus <| Mass.new 3150 1800)
                (ArmourModel 9)

        MeteoricSteelHelmet ->
            HelmetModelTag MeteoricSteelHelmet
                (Model id "Meteoric Steel Helmet" 1000 2000 "MetalHelmet" status idStatus <| Mass.new 10500 6000)
                (ArmourModel 15)

        HelmetOfDetectMonsters ->
            HelmetModelTag HelmetOfDetectMonsters
                (Model id "Helmet Of Detect Monsters" 2500 2000 "HelmetOfDetectMonsters" status idStatus <| Mass.new 42000 24000)
                (ArmourModel 9)

        EnchantedHelmOfStorms ->
            HelmetModelTag EnchantedHelmOfStorms
                (Model id "Enchanted Helm Of Storms" 1000 2000 "EnchantedHelmOfStorms" status idStatus <| Mass.new 1050000 600000)
                (ArmourModel 25)
