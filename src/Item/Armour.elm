module Item.Armour exposing (Armour(..), newArmour)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)
import AllDict exposing (AllDict)


type Armour
    = A ArmourType ArmourModel


armours : ID -> ItemStatus -> IdentificationStatus -> AllDict ArmourType Armour String
armours id status idStatus =
    let
        makeBaseItem name buy sell css weight bulk =
            Model id name buy sell css status idStatus (Mass.new weight bulk)
    in
        AllDict.fromList toString
            [ ( RustyArmour
              , A RustyArmour
                    { ac = 0
                    , baseItem = (makeBaseItem "Rusty Armour" 10000 30000 "BrokenArmour" 0 25)
                    }
              )
            , ( LeatherArmour
              , A LeatherArmour
                    { ac = 6
                    , baseItem = (makeBaseItem "Leather Armour" 5000 2400 "LeatherArmour" 1080 600)
                    }
              )
            , ( StuddedLeatherArmour
              , A StuddedLeatherArmour
                    { ac = 12
                    , baseItem = (makeBaseItem "Studded Leather Armour" 7000 25000 "LeatherArmour" 3150 1800)
                    }
              )
            , ( RingMail
              , A RingMail
                    { ac = 18
                    , baseItem = (makeBaseItem "Ring Mail" 8000 30000 "MetalArmour" 6300 3600)
                    }
              )
            , ( ScaleMail
              , A ScaleMail
                    { ac = 24
                    , baseItem = (makeBaseItem "Scale Mail" 9000 30000 "MetalArmour" 10800 6000)
                    }
              )
            , ( ChainMail
              , A ChainMail
                    { ac = 30
                    , baseItem = (makeBaseItem "Chain Mail" 10000 30000 "MetalArmour" 16200 9000)
                    }
              )
            , ( SplintMail
              , A SplintMail
                    { ac = 36
                    , baseItem = (makeBaseItem "Splint Mail" 12000 40000 "MetalArmour" 27000 15000)
                    }
              )
            , ( PlateMail
              , A PlateMail
                    { ac = 42
                    , baseItem = (makeBaseItem "Plate Mail" 15000 40000 "MetalArmour" 42000 24000)
                    }
              )
            , ( PlateArmour
              , A PlateArmour
                    { ac = 48
                    , baseItem = (makeBaseItem "Plate Armour" 15000 60000 "MetalArmour" 42000 24000)
                    }
              )
            , ( MeteoricSteelPlate
              , A MeteoricSteelPlate
                    { ac = 54
                    , baseItem = (makeBaseItem "Meteoric Steel Plate" 5000 30000 "MetalArmour" 105000 60000)
                    }
              )
            , ( ElvenChainMail
              , A ElvenChainMail
                    { ac = 52
                    , baseItem = (makeBaseItem "Elven Chain Mail" 50000 24000 "MetalArmour" 162000 90000)
                    }
              )
            ]


newArmour : ArmourType -> ID -> ItemStatus -> IdentificationStatus -> Armour
newArmour armourType id status idStatus =
    AllDict.get armourType (armours id status idStatus)
        |> Maybe.withDefault
            (A RustyArmour
                { ac = 0
                , baseItem = (Model id "Rusty Armour" 10000 30000 "BrokenArmour" status idStatus <| Mass.new 0 25)
                }
            )
