module Item.Armour exposing (Armour(..), newArmour)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)
import AllDict exposing (AllDict)


type Armour
    = A ArmourType ArmourModel


newArmour : ArmourType -> ID -> ItemStatus -> IdentificationStatus -> Armour
newArmour armourType id status idStatus =
    let
        make ac name weight bulk css buy sell =
            (A armourType
                { ac = ac
                , baseItem = Model id name buy sell css status idStatus (Mass.new weight bulk)
                }
            )
    in
        case armourType of
            RustyArmour ->
                make 0 "Rusty Armour" 10000 30000 "BrokenArmour" 0 25

            LeatherArmour ->
                make 6 "Leather Armour" 5000 2400 "LeatherArmour" 1080 600

            StuddedLeatherArmour ->
                make 12 "Studded Leather Armour" 7000 25000 "LeatherArmour" 3150 1800

            RingMail ->
                make 18 "Ring Mail" 8000 30000 "MetalArmour" 6300 3600

            ScaleMail ->
                make 24 "Scale Mail" 9000 30000 "MetalArmour" 10800 6000

            ChainMail ->
                make 30 "Chain Mail" 10000 30000 "MetalArmour" 16200 9000

            SplintMail ->
                make 36 "Splint Mail" 12000 40000 "MetalArmour" 27000 15000

            PlateMail ->
                make 42 "Plate Mail" 15000 40000 "MetalArmour" 42000 24000

            PlateArmour ->
                make 48 "Plate Armour" 15000 60000 "MetalArmour" 42000 24000

            MeteoricSteelPlate ->
                make 54 "Meteoric Steel Plate" 5000 30000 "MetalArmour" 105000 60000

            ElvenChainMail ->
                make 52 "Elven Chain Mail" 50000 24000 "MetalArmour" 162000 90000

