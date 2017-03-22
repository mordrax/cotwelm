module Item.Factory
    exposing
        ( ItemFactory
        , init
        , make
        , makeReducer
        )

import Utils.IdGenerator as IdGenerator exposing (IdGenerator)
import Item.Item as Item exposing (Item, Items)
import Item.Types


type ItemFactory
    = A Model


type alias Model =
    { idGenerator : IdGenerator
    }


init : ItemFactory
init =
    A <| Model IdGenerator.init


make : Item.Types.ItemType -> ItemFactory -> ( Item, ItemFactory )
make itemType (A model) =
    let
        ( id, idGenerator_ ) =
            IdGenerator.getUniqueId model.idGenerator
    in
        ( Item.new itemType id, A { model | idGenerator = idGenerator_ } )


makeReducer : Item.Types.ItemType -> ( Items, ItemFactory ) -> ( Items, ItemFactory )
makeReducer itemType ( currentItems, itemFactory ) =
    let
        ( newItem, newItemFactory ) =
            make itemType itemFactory
    in
        ( newItem :: currentItems, newItemFactory )
