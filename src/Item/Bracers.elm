module Item.Bracers exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)
import Item.TypeDef exposing (..)


type Bracers
    = BracersModelTag BracersType Model ArmourModel


newBracers : BracersType -> ID -> ItemStatus -> IdentificationStatus -> Bracers
newBracers bracersType id status idStatus =
    case bracersType of
        NormalBracers ->
            BracersModelTag NormalBracers
                (Model id "Bracers" 500 2000 "Bracers" status idStatus <| Mass.new 108 60)
                (ArmourModel 3)

        BracersOfDefenseNormal ->
            BracersModelTag BracersOfDefenseNormal
                (Model id "Bracers Of Defense Normal" 500 2000 "BracersEnchanted" status idStatus <| Mass.new 1836 1020)
                (ArmourModel 8)

        BracersOfDefenseS ->
            BracersModelTag BracersOfDefenseS
                (Model id "Bracers Of Defense Strong" 500 2000 "BracersEnchanted" status idStatus <| Mass.new 5616 3120)
                (ArmourModel 13)

        BracersOfDefenseVS ->
            BracersModelTag BracersOfDefenseVS
                (Model id "Bracers Of Defense Very Strong" 500 2000 "BracersEnchanted" status idStatus <| Mass.new 11556 6420)
                (ArmourModel 18)
