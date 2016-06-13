module Container
    exposing
        ( Container
        , IDItem
        , new
        , list
        , add
        , take
        , getItem
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


type alias Model a =
    { capacity : Mass
    , currentMass : Mass
    , items : List (IDItem a)
    , getMass : a -> Mass
    , nextId : ID
    }


type alias IDItem a =
    ( ID, a )


type Container a
    = ContainerModel (Model a)


capacity : Container a -> Mass
capacity (ContainerModel model) =
    model.capacity


getMass : Container a -> Mass
getMass (ContainerModel model) =
    model.currentMass


getItem : IDItem a -> a
getItem itemWithId =
    snd itemWithId


new : { capacity : Mass, getMass : a -> Mass } -> Container a
new { capacity, getMass } =
    ContainerModel <| Model capacity (Mass.new 0 0) [] getMass 0


list : Container a -> List (IDItem a)
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


take : IDItem a -> Container a -> Container a
take idItem (ContainerModel model) =
    let
        itemsWithoutIdItem =
            List.filter ((/=) idItem) model.items

        ( id, item ) =
            idItem

        itemMass =
            model.getMass item

        mass' =
            Mass.subtract model.currentMass itemMass
    in
        ContainerModel { model | items = itemsWithoutIdItem, currentMass = mass' }
