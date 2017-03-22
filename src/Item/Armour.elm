module Item.Armour exposing (init, listTypes, encode, decoder)

import Item.Types exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)
import Dict exposing (Dict)


init : ArmourType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Armour
init armourType status idStatus id =
    let
        make name ( weight, bulk ) css ( buy, sell ) ac =
            { base = BaseItem name (Prices buy sell) css (Mass.Mass weight bulk) status idStatus id
            , armourType = armourType
            , ac = ac
            }

        makeMonsterArmour name ac =
            make name ( 0, 0 ) "" ( 0, 0 ) ac
    in
        case armourType of
            RustyArmour ->
                make "Rusty Armour" ( 10000, 30000 ) "broken-armour" ( 0, 25 ) (AC 0)

            LeatherArmour ->
                make "Leather Armour" ( 5000, 2400 ) "leather-armour" ( 1080, 600 ) (AC 6)

            StuddedLeatherArmour ->
                make "Studded Leather Armour" ( 7000, 25000 ) "leather-armour" ( 3150, 1800 ) (AC 12)

            RingMail ->
                make "Ring Mail" ( 8000, 30000 ) "metal-armour" ( 6300, 3600 ) (AC 18)

            ScaleMail ->
                make "Scale Mail" ( 9000, 30000 ) "metal-armour" ( 10800, 6000 ) (AC 24)

            ChainMail ->
                make "Chain Mail" ( 10000, 30000 ) "metal-armour" ( 16200, 9000 ) (AC 30)

            SplintMail ->
                make "Splint Mail" ( 12000, 40000 ) "metal-armour" ( 27000, 15000 ) (AC 36)

            PlateMail ->
                make "Plate Mail" ( 15000, 40000 ) "metal-armour" ( 42000, 24000 ) (AC 42)

            PlateArmour ->
                make "Plate Armour" ( 15000, 60000 ) "metal-armour" ( 42000, 24000 ) (AC 48)

            MeteoricSteelPlate ->
                make "Meteoric Steel Plate" ( 5000, 30000 ) "metal-armour" ( 105000, 60000 ) (AC 54)

            ElvenChainMail ->
                make "Elven Chain Mail" ( 5000, 24000 ) "metal-armour" ( 162000, 90000 ) (AC 52)

            -- monster armour
            SoftHide ->
                makeMonsterArmour "Soft Hide" (AC 10)

            Bones ->
                makeMonsterArmour "Bones" (AC 15)

            Shell ->
                makeMonsterArmour "Shell" (AC 20)

            ToughHide ->
                makeMonsterArmour "Tough Hide" (AC 20)


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
