module Container exposing (Container, new, list, add)

{-| A container holds Items with a Mass up to a certain amount. This amount is specified by the weight and bulk capacity of the container.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.
-}

import Mass exposing (..)


type alias Model a =
    { capacity : Mass
    , currentMass : Mass
    , items : List a
    , getMass : a -> Mass
    }


type Container a
    = ContainerModel (Model a)


new : { capacity : Mass, getMass : a -> Mass } -> Container a
new { capacity, getMass } =
    ContainerModel <| Model capacity (Mass.new 0 0) [] getMass


list : Container a -> List a
list (ContainerModel model) =
    model.items


add : a -> Container a -> ( Container a, Mass.Msg )
add item (ContainerModel model) =
    let
        itemMass =
            model.getMass item

        newMass =
            Mass.add itemMass model.currentMass

        massMsg =
            Mass.lessThanOrEqualTo newMass model.capacity
    in
        case massMsg of
            Mass.Ok ->
                ( ContainerModel { model | currentMass = newMass, items = item :: model.items }, Mass.Ok )

            _ ->
                ( ContainerModel model, Mass.TooHeavy )
