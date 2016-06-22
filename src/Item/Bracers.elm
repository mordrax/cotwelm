module Item.Bracers exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Bracers
    = BracersM BracersType ArmourModel


newBracers : BracersType -> ID -> ItemStatus -> IdentificationStatus -> Bracers
newBracers bracersType id status idStatus =
    case bracersType of
        NormalBracers ->
            BracersM NormalBracers
                { ac = 3
                , baseItem = (Model id "Bracers" 500 2000 "Bracers" status idStatus <| Mass.new 108 60)
                }

        BracersOfDefenseNormal ->
            BracersM BracersOfDefenseNormal
                { ac = 8
                , baseItem = (Model id "Bracers Of Defense Normal" 500 2000 "BracersEnchanted" status idStatus <| Mass.new 1836 1020)
                }

        BracersOfDefenseS ->
            BracersM BracersOfDefenseS
                { ac = 13
                , baseItem = (Model id "Bracers Of Defense Strong" 500 2000 "BracersEnchanted" status idStatus <| Mass.new 5616 3120)
                }

        BracersOfDefenseVS ->
            BracersM BracersOfDefenseVS
                { ac = 18
                , baseItem = (Model id "Bracers Of Defense Very Strong" 500 2000 "BracersEnchanted" status idStatus <| Mass.new 11556 6420)
                }
