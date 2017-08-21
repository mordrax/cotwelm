module Container
    exposing
        ( Container
        , add
        , capacity
        , init
        , list
        , mass
        , remove
        , set
        )

{-| A container holds Items with a Mass up to a certain amount specified by the container's capacity.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.

-}

import Utils.Mass as Mass exposing (Capacity, Mass)
import Utils.Misc


type alias Model a =
    { capacity : Capacity
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
    let
        sumMass a accMass =
            model.getMass a
                |> (\{ weight, bulk } -> { weight = weight + accMass.weight, bulk = bulk + accMass.bulk })
    in
    model.items
        |> List.foldl sumMass (Mass 0 0)


init : Capacity -> (a -> Mass) -> (a -> a -> Bool) -> Container a
init capacity getMass equals =
    ContainerModel <| Model capacity [] getMass equals


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
add : a -> Container a -> Result String (Container a)
add item (ContainerModel model) =
    let
        newMass =
            Mass.add (model.getMass item)
                (mass (ContainerModel model))

        ( withinBulkLimit, withinWeightLimit ) =
            Mass.withinCapacity newMass model.capacity
    in
    case ( withinBulkLimit, withinWeightLimit ) of
        ( False, _ ) ->
            Result.Err "Its too bulky to fit!"

        ( _, False ) ->
            Result.Err "Its too heavy for the container!"

        ( True, True ) ->
            Result.Ok (ContainerModel { model | items = item :: model.items })


{-| Takes an item out of the container if it exists.
-}
remove : a -> Container a -> Container a
remove item (ContainerModel model) =
    ContainerModel { model | items = Utils.Misc.removeFirst item model.equals model.items }
