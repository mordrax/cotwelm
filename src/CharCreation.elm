module CharCreation
    exposing
        ( CharCreation
        , Msg(..)
        , info
        , init
        , update
        )

import Attributes exposing (Attributes)
import Types exposing (..)


type alias CharCreation =
    { name : String
    , attributes : Attributes
    , gender : Gender
    , difficulty : Difficulty
    }


type Msg
    = Name String
    | Gender Gender
    | Difficulty Difficulty
    | Attribute Attributes.Msg
    | StartGame


init : ( CharCreation, Cmd Msg )
init =
    let
        ( attributes, attrCmds ) =
            Attributes.init
    in
    ( { name = "Conan the destroyer"
      , attributes = attributes
      , gender = Female
      , difficulty = Hard
      }
    , Cmd.map Attribute attrCmds
    )


update : Msg -> CharCreation -> ( CharCreation, Bool )
update msg charCreation =
    case msg of
        Name newName ->
            ( { charCreation | name = newName }, False )

        Gender gender ->
            ( { charCreation | gender = gender }, False )

        Difficulty difficulty ->
            ( { charCreation | difficulty = difficulty }, False )

        Attribute msg ->
            ( { charCreation | attributes = Attributes.update msg charCreation.attributes }, False )

        StartGame ->
            ( charCreation, True )


info : CharCreation -> ( String, Gender, Difficulty, Attributes )
info charCreation =
    ( charCreation.name, charCreation.gender, charCreation.difficulty, charCreation.attributes )
