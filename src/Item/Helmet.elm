module Item.Helmet exposing (..)

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : HelmetType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Helmet
init helmetType status idStatus id =
    let
        make name mass css prices ac =
            { base = BaseItem name prices css mass status idStatus id
            , helmetType = helmetType
            , ac = ac
            }
    in
        case helmetType of
            BrokenHelmet ->
                make "Broken Helmet" (Mass.Mass 1000 1000) "BrokenHelmet" (Prices 0 25) (AC 0)

            LeatherHelmet ->
                make "Leather Helmet" (Mass.Mass 500 500) "LeatherHelmet" (Prices 525 300) (AC 3)

            IronHelmet ->
                make "Iron Helmet" (Mass.Mass 2000 2000) "MetalHelmet" (Prices 1050 600) (AC 6)

            SteelHelmet ->
                make "Steel Helmet" (Mass.Mass 2500 2000) "MetalHelmet" (Prices 3150 1800) (AC 9)

            MeteoricSteelHelmet ->
                make "Meteoric Steel Helmet" (Mass.Mass 1000 2000) "MetalHelmet" (Prices 10500 6000) (AC 15)

            HelmetOfDetectMonsters ->
                make "Helmet Of Detect Monsters" (Mass.Mass 2500 2000) "HelmetOfDetectMonsters" (Prices 42000 24000) (AC 9)

            EnchantedHelmOfStorms ->
                make "Enchanted Helm Of Storms" (Mass.Mass 1000 2000) "EnchantedHelmOfStorms" (Prices 1050000 600000) (AC 25)
