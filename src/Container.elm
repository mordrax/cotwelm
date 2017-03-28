module Container
    exposing
        ( Container
        , Msg(..)
        , init
        , list
        , add
        , remove
        , set
        , mass
        , capacity
        )

{-| A container holds Items with a Mass up to a certain amount specified by the container's capacity.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.
-}

import Utils.Mass as Mass exposing (Mass, Capacity)
import Utils.Misc


type Msg
    = Ok
    | MassMsg Mass.Msg
    | NestedItem


type alias Model a =
    { capacity : Capacity
    , currentMass : Mass
    , items : List a
    , getMass : a -> Mass
    , equals : a -> a -> Bool
    }


type Container a
    = ContainerModel (Model a)


capacity : Container a -> Capacity
capacity (ContainerModel model) =
    model.capacity


mass : Container a -> Mass
mass (ContainerModel model) =
    model.currentMass


init : Capacity -> (a -> Mass) -> (a -> a -> Bool) -> Container a
init capacity getMass equals =
    ContainerModel <| Model capacity (Mass 0 0) [] getMass equals


{-| Get all the things in the container as a list
-}
list : Container a -> List a
list (ContainerModel model) =
    model.items


set : List a -> Container a -> Container a
set items (ContainerModel model) =
    ContainerModel { model | items = items }


{-| Try to add a new item to the container. Makes sure that the item obeys mass/capacity rules.
-}
add : a -> Container a -> ( Container a, Msg )
add item (ContainerModel model) =
    let
        mass =
            model.getMass item

        containerMassWithItem =
            Mass.add mass model.currentMass

        isWithinCapacity =
            Mass.withinCapacity containerMassWithItem model.capacity
    in
        case isWithinCapacity of
            Mass.Success ->
                ( ContainerModel
                    { model
                        | currentMass = containerMassWithItem
                        , items = item :: model.items
                    }
                , Ok
                )

            massMsg ->
                ( ContainerModel model, MassMsg massMsg )


{-| Takes an item out of the container if it exists.
-}
remove : a -> Container a -> Container a
remove item (ContainerModel model) =
    let
        itemsWithItemRemoved =
            Utils.Misc.removeFirst item model.equals model.items

        itemMass =
            model.getMass item

        mass_ =
            Mass.subtract model.currentMass itemMass
    in
        ContainerModel { model | items = itemsWithItemRemoved, currentMass = mass_ }
