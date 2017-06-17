module Item.Helmet exposing (..)

import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : HelmetType -> ItemStatus -> IdentificationStatus -> ( BaseItem, HelmetDetails )
init helmetType status idStatus =
    let
        make name mass css prices ac =
            ( BaseItem name prices css mass status idStatus
            , { helmetType = helmetType
              , ac = ac
              }
            )
    in
    case helmetType of
        BrokenHelmet ->
            make "Broken Helmet" (Mass.Mass 1000 1000) "broken-helmet" (Prices 0 25) (AC 0)

        LeatherHelmet ->
            make "Leather Helmet" (Mass.Mass 500 500) "leather-helmet" (Prices 525 300) (AC 3)

        IronHelmet ->
            make "Iron Helmet" (Mass.Mass 2000 2000) "metal-helmet" (Prices 1050 600) (AC 6)

        SteelHelmet ->
            make "Steel Helmet" (Mass.Mass 2500 2000) "metal-helmet" (Prices 3150 1800) (AC 9)

        MeteoricSteelHelmet ->
            make "Meteoric Steel Helmet" (Mass.Mass 1000 2000) "metal-helmet" (Prices 10500 6000) (AC 15)

        HelmetOfDetectMonsters ->
            make "Helmet Of Detect Monsters" (Mass.Mass 2500 2000) "helmet-of-detect-monsters" (Prices 42000 24000) (AC 9)

        EnchantedHelmOfStorms ->
            make "Enchanted Helm Of Storms" (Mass.Mass 1000 2000) "enchanted-helm-of-storms" (Prices 1050000 600000) (AC 25)
