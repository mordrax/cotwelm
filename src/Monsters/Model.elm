module Monsters.Model exposing (..)

import Attributes exposing (Attributes)
import Equipment exposing (Equipment)
import Item.Data
import Monsters.Types exposing (..)
import Stats exposing (Stats)
import Types exposing (..)
import Utils.Vector as Vector exposing (Vector)


type alias Monster =
    { name : String
    , type_ : Types.CreatureType
    , monsterType : MonsterType
    , position : Vector
    , stats : Stats
    , attributes : Attributes
    , equipment : Equipment
    , expLevel : Int
    , bodySize : Types.BodySize
    , attackTypes : List AttackType
    , attacks : Int
    , speed : Int
    , visible : Visibility
    }


setName : String -> Monster -> Monster
setName val monster =
    { monster | name = val }


setType_ : Types.CreatureType -> Monster -> Monster
setType_ val monster =
    { monster | type_ = val }


setMonsterType : MonsterType -> Monster -> Monster
setMonsterType val monster =
    { monster | monsterType = val }


setPosition : Vector -> Monster -> Monster
setPosition val monster =
    { monster | position = val }


setStats : Stats -> Monster -> Monster
setStats val monster =
    { monster | stats = val }


scaleAttributes : Float -> Float -> Float -> Float -> Monster -> Monster
scaleAttributes str dex con int monster =
    { monster | attributes = Attributes.scale str dex con int monster.attributes }


setAttributes : Attributes -> Monster -> Monster
setAttributes val monster =
    { monster | attributes = val }


setEquipment : Equipment -> Monster -> Monster
setEquipment val monster =
    { monster | equipment = val }


setEquipmentSlot : ( Equipment.EquipmentSlot, Item.Data.Item ) -> Monster -> Result Equipment.Msg Monster
setEquipmentSlot slot ({ equipment } as monster) =
    Equipment.setSlot_ slot equipment
        |> Result.map (\eq -> { monster | equipment = eq })


setEquipmentSlotIfAble : ( Equipment.EquipmentSlot, Item.Data.Item ) -> Monster -> Monster
setEquipmentSlotIfAble slot monster =
    setEquipmentSlot slot monster
        |> Result.withDefault monster


setExpLevel : Int -> Monster -> Monster
setExpLevel val monster =
    { monster | expLevel = val }


setBodySize : Types.BodySize -> Monster -> Monster
setBodySize val monster =
    { monster | bodySize = val }


setAttackTypes : List AttackType -> Monster -> Monster
setAttackTypes val monster =
    { monster | attackTypes = val }


setAttacks : Int -> Monster -> Monster
setAttacks val monster =
    { monster | attacks = val }


setSpeed : Int -> Monster -> Monster
setSpeed val monster =
    { monster | speed = val }


setVisible : Visibility -> Monster -> Monster
setVisible val monster =
    { monster | visible = val }
