module Monster
    exposing
        ( Monster
        , make
        , makeForArena
        , makeRandomMonsters
        , remove
        , replace
        , view
        )

{-|
Monsters are the main ways to advance in the game. They exist in the dungeon levels only and get progressively more dangerous
as you venture deeper.

Monsters are separated into types, each type will have special characteristics such as the dragons all having
a form of elemental attack or the undeads being able to drain stats.

Monsters do not have levels, instead what determines their difficulty is their stats and attributes. Each monster type has
a base set of attributes which is changed by specific monsters of that type. Their stats (hp/sp) is determined by their
size and type.
-}

import Html exposing (Html)
import Monsters.Factory exposing (make)
import Monsters.Model
import Monsters.Types exposing (..)
import Monsters.View
import Utils.Vector as Vector exposing (Vector)


type alias Monster =
    Monsters.Model.Monster


-- maker functions


makeForArena =
    Monsters.Factory.makeForArena


makeRandomMonsters =
    Monsters.Factory.makeRandomMonsters


make =
    Monsters.Factory.make



-- view


view =
    Monsters.View.view



-- base


replace : Monster -> List Monster -> List Monster
replace monster monsters =
    monster :: remove monster monsters


remove : Monster -> List Monster -> List Monster
remove monster monsters =
    List.filter (\x -> monster.position /= x.position) monsters
