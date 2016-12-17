module Utils.IdGenerator
    exposing
        ( IdGenerator
        , ID
        , init
        , empty
        , getUniqueId
        , equals
        , assignId
        )

{-| A simple incremental ID which can be used to generate unique identifiers.
-}


type IdGenerator
    = IDModel Model


type ID
    = ID Int


type alias Model =
    Int


init : IdGenerator
init =
    IDModel 0

empty: ID
empty = ID -1

getUniqueId : IdGenerator -> ( ID, IdGenerator )
getUniqueId (IDModel model) =
    ( ID (model + 1), IDModel (model + 1) )


equals : ID -> ID -> Bool
equals (ID a) (ID b) =
    a == b


assignId : (ID -> a) -> ( List a, IdGenerator ) -> ( List a, IdGenerator )
assignId toA ( listOfAs, generator ) =
    let
        ( id, generator_ ) =
            getUniqueId generator
    in
        ( (toA id) :: listOfAs, generator_ )
