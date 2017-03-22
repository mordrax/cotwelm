module Item.Bracers exposing (..)

import Item.Types exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : BracersType -> ItemStatus -> IdentificationStatus -> IdGenerator.ID -> Bracers
init bracersType status idStatus id =
    let
        make name mass css prices ac =
            { base = BaseItem name prices css mass status idStatus id
            , bracersType = bracersType
            , ac = ac
            }
    in
        case bracersType of
            NormalBracers ->
                make "Bracers" (Mass.Mass 500 2000) "bracers" (Prices 108 60) (AC 3)

            BracersOfDefenseNormal ->
                make "Bracers Of Defense Normal" (Mass.Mass 500 2000) "bracers-enchanted" (Prices 1836 1020) (AC 8)

            BracersOfDefenseS ->
                make "Bracers Of Defense Strong" (Mass.Mass 500 2000) "bracers-enchanted" (Prices 5616 3120) (AC 13)

            BracersOfDefenseVS ->
                make "Bracers Of Defense Very Strong" (Mass.Mass 500 2000) "bracers-enchanted" (Prices 11556 6420) (AC 18)
