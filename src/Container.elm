module Container
    exposing
        ( Container
        , Msg(..)
        , new
        , list
        , add
        , take
        , getMass
        , capacity
        )

{-| A container holds Items with a Mass up to a certain amount specified by the container's capacity.
You can add/remove Items and look through a list of them.

Items can also be containers, so containers can hold containers.
-}

import Mass exposing (..)


type alias ID =
    Int


type Msg
    = Ok
    | MassMsg Mass.Msg


type alias Model a =
    { capacity : Mass
    , currentMass : Mass
    , items : List a
    , getMass : a -> Mass
    , equals : a -> a -> Bool
    }


type Container a
    = ContainerModel (Model a)


capacity : Container a -> Mass
capacity (ContainerModel model) =
    model.capacity


getMass : Container a -> Mass
getMass (ContainerModel model) =
    model.currentMass


new : Mass -> (a -> Mass) -> (a -> a -> Bool) -> Container a
new capacity getMass equals =
    ContainerModel <| Model capacity (Mass.new 0 0) [] getMass equals


{-| Get all the things in the container as a list
-}
list : Container a -> List a
list (ContainerModel model) =
    model.items


{-| Try to add a new item to the container. Makes sure that the item obeys mass/capacity rules.
-}
add : a -> Container a -> ( Container a, Msg )
add item (ContainerModel model) =
    let
        mass =
            model.getMass item

        mass' =
            Mass.add mass model.currentMass
    in
        case (Mass.ltOrEqTo mass' model.capacity) of
            Mass.Ok ->
                ( ContainerModel { model | currentMass = mass', items = item :: model.items }, Ok )

            msg ->
                ( ContainerModel model, MassMsg msg )


{-| Takes an item out of the container if it exists.
-}
take : a -> Container a -> Container a
take item (ContainerModel model) =
    let
        notEquals =
            \x -> not <| model.equals item x

        itemsWithoutIdItem =
            List.filter notEquals model.items

        itemMass =
            model.getMass item

        mass' =
            Mass.subtract model.currentMass itemMass
    in
        ContainerModel { model | items = itemsWithoutIdItem, currentMass = mass' }
