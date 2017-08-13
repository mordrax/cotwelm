module Utils.LexicalRandom
    exposing
        ( Definition
        , Fragment(..)
        , Lexicon
        , fromString
        , generator
        )

{-| Generate random names based on a lexicon.


# Basics

@docs fromString, generator


# Advanced

You need to understand this stuff only if you want to dynamically add entries
to the lexicon.

@docs Lexicon, Fragment, Definition

-}

import Dict exposing (Dict)
import Random.Pcg as Random exposing (Generator)
import Regex exposing (regex)
import String


-- types


{-| A fragment is used to generate a part of a name.
It can either be a constant String, either a reference to an lexicon entry.
-}
type Fragment
    = Constant String
    | Key String


{-| A Definition is a List of Fragments used to generate a single name
-}
type alias Definition =
    List Fragment


{-| The Lexicon is a Dict mapping an entry identifier to a List of all the
alternative Definitions that can be used to generate a name.
-}
type alias Lexicon =
    Dict String (List Definition)



-- Random helpers


combine : List (Generator a) -> Generator (List a)
combine generators =
    case generators of
        [] ->
            Random.constant []

        g :: gs ->
            Random.map2 (::) g (combine gs)


choices : Generator a -> List (Generator a) -> Generator a
choices default list =
    Random.sample list
        |> Random.andThen (Maybe.withDefault default)


{-| The function takes:

  - A filler String
  - A Lexicon
  - The name of an entry in the Lexicon

and returns a random generator for the specified entry.

The filler string is used when some definition references a key
that does not exist in the Lexicon.

The filler function is also used to break possible infinite recursions caused by a key.

    nameGenerator =
        LexicalRandom.generator "-" englishGibberishLexicon "properNoun"

    ( name, seed ) =
        Random.step nameGenerator seed

-}
generator : String -> Lexicon -> String -> Generator String
generator filler lexicon key =
    case Dict.get key lexicon of
        Nothing ->
            -- either the key is plain invalid, or it is stuck in a loop
            Random.constant filler

        Just definitions ->
            let
                -- Remove used keys to prevent infinite recursion
                reducedLexicon =
                    Dict.remove key lexicon

                fragmentToGenerator fragment =
                    case fragment of
                        Key key ->
                            generator filler reducedLexicon key

                        Constant string ->
                            Random.constant string

                definitionToGenerator definition =
                    List.map fragmentToGenerator definition
                        |> combine
                        |> Random.map (String.join "")
            in
            List.map definitionToGenerator definitions
                |> choices (Random.constant "")


{-| Parses a Lexicon from a multi-line string
-}
fromString : String -> Lexicon
fromString stringLexicon =
    let
        stringToDefinition stringDefinition =
            let
                chunkToFrags chunk =
                    case String.split "}" chunk of
                        key :: constant :: [] ->
                            [ Key key, Constant constant ]

                        _ ->
                            [ Constant chunk ]
            in
            stringDefinition
                |> String.split "{"
                |> List.map chunkToFrags
                |> List.concat

        addToLexiconKey key line lexicon =
            let
                newDefinitions =
                    line
                        |> String.split ","
                        |> List.map String.trim
                        |> List.filter ((/=) "")
                        |> List.map stringToDefinition

                existingDefinitions =
                    Dict.get key lexicon
                        |> Maybe.withDefault []
            in
            Dict.insert key (List.append existingDefinitions newDefinitions) lexicon

        addLine : String -> ( String, Lexicon ) -> ( String, Lexicon )
        addLine line ( currentKey, lexicon ) =
            if Regex.contains (regex "^\\s*#") line then
                ( currentKey, lexicon )
            else if Regex.contains (regex "^\\s") line then
                ( currentKey, addToLexiconKey currentKey line lexicon )
            else
                ( line, lexicon )
    in
    List.foldl addLine ( "default", Dict.empty ) (String.lines stringLexicon)
        |> Tuple.second
