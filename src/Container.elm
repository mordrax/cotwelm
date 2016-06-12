module Container exposing (Container, new, list, add)

{-| A container holds Items with a Mass up to a certain amount. This amount is specified by the weight and bulk capacity of the container.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.
-}

import Mass exposing (..)


type alias ID =
    Int


type alias Model a =
    { capacity : Mass
    , currentMass : Mass
    , items : List ( ID, a )
    , getMass : a -> Mass
    , nextId : ID
    }


type Container a
    = ContainerModel (Model a)


new : { capacity : Mass, getMass : a -> Mass } -> Container a
new { capacity, getMass } =
    ContainerModel <| Model capacity (Mass.new 0 0) [] getMass 0


list : Container a -> List ( ID, a )
list (ContainerModel model) =
    model.items


add : a -> Container a -> ( Container a, Mass.MassComparison )
add item (ContainerModel model) =
    let
        mass =
            model.getMass item

        mass' =
            Mass.add mass model.currentMass
    in
        case (Mass.ltOrEqTo mass' model.capacity) of
            Mass.Ok ->
                ( ContainerModel { model | currentMass = mass', items = ( model.nextId, item ) :: model.items, nextId = model.nextId + 1 }, Mass.Ok )

            msg ->
                ( ContainerModel model, msg )
