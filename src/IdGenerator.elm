module IdGenerator
    exposing
        ( IdGenerator
        , ID
        , new
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


new : IdGenerator
new =
    IDModel 0


getUniqueId : IdGenerator -> ( ID, IdGenerator )
getUniqueId (IDModel model) =
    ( ID (model + 1), IDModel (model + 1) )


equals : ID -> ID -> Bool
equals (ID a) (ID b) =
    a == b


assignId : (ID -> a) -> ( List a, IdGenerator ) -> ( List a, IdGenerator )
assignId toA ( listOfAs, generator ) =
    let
        ( id, generator' ) =
            getUniqueId generator
    in
        ( (toA id) :: listOfAs, generator' )
