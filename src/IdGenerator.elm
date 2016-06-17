module IdGenerator
    exposing
        ( IdGenerator
        , ID
        , new
        , get
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


get : IdGenerator -> ( ID, IdGenerator )
get (IDModel model) =
    ( ID (model + 1), IDModel (model + 1) )


equals : ID -> ID -> Bool
equals (ID a) (ID b) =
    a == b


assignId : (ID -> item) -> ( List item, IdGenerator ) -> ( List item, IdGenerator )
assignId toItem ( items, gen ) =
    let
        ( id, gen' ) =
            get gen
    in
        ( (toItem id) :: items, gen' )



{-
   assignId : itemWithoutId -> (itemWithoutId -> ID -> item) -> IdGenerator -> ( item, IdGenerator )
   assignId noIdItem toItem gen =
       let
           ( id, gen' ) =
               get gen
       in
           ( toItem noIdItem id, gen' )
-}
