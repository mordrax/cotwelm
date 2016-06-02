module Container exposing (Container, new)

{-| A container holds Items with a Mass up to a certain amount. This amount is specified by the weight and bulk capacity of the container.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.
-}

import Mass exposing (..)


type alias Model a =
    { bulkCapacity : Int
    , weightCapacity : Int
    , currentMass : Mass
    , items : List a
    , getMass : a -> Mass
    }


type Container a
    = ContainerModel (Model a)


type Msg
    = Ok
    | TooHeavy
    | TooBulky


new : { bulkCap : Int, weightCap : Int, getMass : a -> Mass } -> Container a
new { bulkCap, weightCap, getMass } =
    ContainerModel <| Model bulkCap weightCap (Mass.new 0 0) [] getMass


list : Container -> List a
list container =
    []


add : a -> Container a -> ( Container a, Msg )
add item (ContainerModel model) =
    let
        ( itemBulk, itemWeight ) =
            Mass.getMass <| model.getMass item

        ( curBulk, curWeight ) =
            Mass.getMass model.currentMass

        newBulk =
            itemBulk + curBulk

        newWeight =
            itemWeight + curWeight
    in
        if (newWeight <= model.weightCapacity && newBulk <= model.bulkCapacity) then
            ( ContainerModel { model | currentMass = Mass.new newBulk newWeight }, Ok )
        else
            ( ContainerModel model, TooHeavy )
