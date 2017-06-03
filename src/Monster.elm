module Monster
    exposing
        ( Monster
        , make
        , makeForArena
        , makeRandomMonsters
        , remove
        , replace
        , replaceMoved
        , tick
        , types
        , view
        )

{-| Monsters are the main ways to advance in the game. They exist in the dungeon levels only and get progressively more dangerous
as you venture deeper.

Monsters are separated into types, each type will have special characteristics such as the dragons all having
a form of elemental attack or the undeads being able to drain stats.

Monsters do not have levels, instead what determines their difficulty is their stats and attributes. Each monster type has
a base set of attributes which is changed by specific monsters of that type. Their stats (hp/sp) is determined by their
size and type.

-}

import Monsters.Factory exposing (make)
import Monsters.Model
import Monsters.Types exposing (..)
import Monsters.View
import Stats exposing (Stats)


-- types


type alias Monster =
    Monsters.Model.Monster


types =
    Monsters.Types.monsterTypesToList



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


tick : Monster -> Monster
tick monster =
    { monster | stats = Stats.tick monster.stats }



-- base


{-| Replaces a monster uniquely identified by it's position.
-}
replace : Monster -> List Monster -> List Monster
replace monster monsters =
    monster :: remove monster monsters


{-| Replace a monster with a new instance using the old monster's position.
-}
replaceMoved : Monster -> Monster -> List Monster -> List Monster
replaceMoved existing new monsters =
    monsters
        |> remove existing
        |> (::) new


remove : Monster -> List Monster -> List Monster
remove monster monsters =
    List.filter (\x -> monster.position /= x.position) monsters
