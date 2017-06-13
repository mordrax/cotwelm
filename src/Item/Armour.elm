module Item.Armour exposing (decoder, encode, init, listTypes)

import Dict exposing (Dict)
import EveryDict exposing (EveryDict)
import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : ArmourType -> ItemStatus -> IdentificationStatus -> Armour BasicItem
init armourType status idStatus =
    EveryDict.get armourType data
        |> Maybe.withDefault rustyArmour
        |> setArmourData armourType


setArmourData : ArmourType -> ArmourData -> Armour BasicItem
setArmourData armourType (ArmourData ac baseItem) =
    initBasicItem baseItem BIT_Armour
        |> setArmourType armourType
        |> setAC ac


type ArmourData
    = ArmourData AC BaseItem


data : EveryDict ArmourType ArmourData
data =
    EveryDict.fromList
        [ ( RustyArmour, ArmourData (AC 0) (BaseItem "Rusty Armour" (Prices 0 25) "broken-armour" (Mass 10000 30000) Normal Identified) )
        , ( LeatherArmour, ArmourData (AC 6) (BaseItem "Leather Armour" (Prices 1080 600) "leather-armour" (Mass 5000 2400) Normal Identified) )
        , ( StuddedLeatherArmour, ArmourData (AC 12) (BaseItem "Studded Leather Armour" (Prices 3150 1800) "leather-armour" (Mass 7000 25000) Normal Identified) )
        , ( RingMail, ArmourData (AC 18) (BaseItem "Ring Mail" (Prices 6300 3600) "metal-armour" (Mass 8000 30000) Normal Identified) )
        , ( ScaleMail, ArmourData (AC 24) (BaseItem "Scale Mail" (Prices 10800 6000) "metal-armour" (Mass 9000 30000) Normal Identified) )
        , ( ChainMail, ArmourData (AC 30) (BaseItem "Chain Mail" (Prices 16200 9000) "metal-armour" (Mass 10000 30000) Normal Identified) )
        , ( SplintMail, ArmourData (AC 36) (BaseItem "Splint Mail" (Prices 27000 15000) "metal-armour" (Mass 12000 40000) Normal Identified) )
        , ( PlateMail, ArmourData (AC 42) (BaseItem "Plate Mail" (Prices 42000 24000) "metal-armour" (Mass 15000 40000) Normal Identified) )
        , ( PlateArmour, ArmourData (AC 48) (BaseItem "Plate Armour" (Prices 42000 24000) "metal-armour" (Mass 15000 60000) Normal Identified) )
        , ( MeteoricSteelPlate, ArmourData (AC 54) (BaseItem "Meteoric Steel Plate" (Prices 105000 60000) "metal-armour" (Mass 5000 30000) Normal Identified) )
        , ( ElvenChainMail, ArmourData (AC 52) (BaseItem "Elven Chain Mail" (Prices 162000 90000) "metal-armour" (Mass 5000 24000) Normal Identified) )
        , ( SoftHide, ArmourData (AC 10) (BaseItem "Soft Hide" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Bones, ArmourData (AC 15) (BaseItem "Bones" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( Shell, ArmourData (AC 20) (BaseItem "Shell" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        , ( ToughHide, ArmourData (AC 20) (BaseItem "Tough Hide" (Prices 0 0) "" (Mass 0 0) Normal Identified) )
        ]


rustyArmour : ArmourData
rustyArmour =
    ArmourData (AC 0) (BaseItem "Rusty Armour" (Prices 0 25) "broken-armour" (Mass 10000 30000) Normal Identified)


listTypes : List ArmourType
listTypes =
    [ RustyArmour
    , LeatherArmour
    , StuddedLeatherArmour
    , RingMail
    , ScaleMail
    , ChainMail
    , SplintMail
    , PlateMail
    , PlateArmour
    , MeteoricSteelPlate
    , ElvenChainMail
    , SoftHide
    , Bones
    , Shell
    , ToughHide
    ]


encode : ArmourType -> String
encode =
    toString


decoder : String -> ArmourType
decoder value =
    Dict.get value armourTypeDict
        |> Maybe.withDefault RustyArmour


armourTypeDict : Dict String ArmourType
armourTypeDict =
    let
        makeKVP x =
            ( toString x, x )
    in
    listTypes
        |> List.map makeKVP
        |> Dict.fromList
