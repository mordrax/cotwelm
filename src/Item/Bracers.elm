module Item.Bracers exposing (..)

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)
import Item.Data exposing (..)


type Bracers
    = Bracers BracersType AC


init : BracersType -> Bracers
init bracersType =
    case bracersType of
        NormalBracers ->
            Bracers NormalBracers (AC 3)

        BracersOfDefenseNormal ->
            Bracers BracersOfDefenseNormal (AC 8)

        BracersOfDefenseS ->
            Bracers BracersOfDefenseS (AC 13)

        BracersOfDefenseVS ->
            Bracers BracersOfDefenseVS (AC 18)


blueprint : BracersType -> BaseItemData
blueprint bracersType =
    case bracersType of
        NormalBracers ->
            BaseItemData "Bracers" 500 2000 "Bracers" 108 60

        BracersOfDefenseNormal ->
            BaseItemData "Bracers Of Defense Normal" 500 2000 "BracersEnchanted" 1836 1020

        BracersOfDefenseS ->
            BaseItemData "Bracers Of Defense Strong" 500 2000 "BracersEnchanted" 5616 3120

        BracersOfDefenseVS ->
            BaseItemData "Bracers Of Defense Very Strong" 500 2000 "BracersEnchanted" 11556 6420
