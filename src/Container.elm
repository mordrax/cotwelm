module Container exposing (Container, new)

{-| A container holds Items with a Mass up to a certain amount. This amount is specified by the weight and bulk capacity of the container.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.
-}

import Mass exposing (..)


type alias Model =
    { bulkCapacity : Int
    , weightCapacity : Int
    , currentMass : Mass
    }


type Container
    = ContainerModel Model


type Msg
    = Ok
    | TooHeavy
    | TooBulky


new : Int -> Int -> Container
new bulkCap weightCap =
    ContainerModel <| Model bulkCap weightCap (Mass.new 0 0)


list : Container -> List a
list container =
    []


add : a -> (a -> Mass) -> Container -> ( Container, Msg )
add item itemToMass (ContainerModel model) =
    let
        ( itemBulk, itemWeight ) =
            Mass.getMass <| itemToMass item

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
