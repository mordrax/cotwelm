module CharCreation.AttributeDescriptions exposing (..)

import CharCreation.Data as Data exposing (..)


type alias SingleDescription =
    ( Int, String )


type alias Descriptions =
    List SingleDescription


type alias Model =
    { str : Descriptions
    , int : Descriptions
    , dex : Descriptions
    , con : Descriptions
    , ava : Descriptions
    }


isLessThanAttribute : Int -> SingleDescription -> Bool
isLessThanAttribute val ( maxVal, _ ) =
    val < maxVal


maybeDescriptionToString : Maybe SingleDescription -> String
maybeDescriptionToString desc =
    case desc of
        Nothing ->
            "No description matches"

        Just a ->
            snd a


firstMatchingDescription : Int -> Descriptions -> Maybe SingleDescription
firstMatchingDescription val descriptions =
    List.head (List.filter (isLessThanAttribute val) descriptions)


initModel : Model
initModel =
    { ava =
        [ ( 0, "You are at your maximum potential! Go get'em tiger!" )
        , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 50, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 100, "Training is for wimps, you like pain, you like it alot!" )
        ]
    , str =
        [ ( 0, "Unable to push open a unlocked door whos hinges has recently been serviced with WD40." )
        , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 20, "Stunted by a career in software engineering, the mind is strong but there is high muscle atrophy" )
        , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 50, "Of average strength!!!" )
        , ( 60, "Likes to gym during lunch.." )
        , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 100, "Hammers are for wimps!! You hit with your FISTS!" )
        ]
    , int =
        [ ( 0, "Dumb" )
        , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 50, "Smart enough to be at the peak of the standard distribution curve." )
        , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 100, "Smart" )
        ]
    , con =
        [ ( 0, "You're having a BAD day, everyday! It's like you've got two kids that keep waking you up at night, EVERY night!" )
        , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 50, "Able to outrun a hungry hippo!" )
        , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 100, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        ]
    , dex =
        [ ( 0, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 10, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 20, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 30, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 40, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 50, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 60, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 70, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 80, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 90, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        , ( 100, "TODO: Write something funny and informative about this level of attribute. PRs welcome!" )
        ]
    }


getDescription : Attribute -> Int -> String
getDescription attr val =
    case attr of
        Data.Strength ->
            maybeDescriptionToString (firstMatchingDescription val initModel.str)

        Data.Available ->
            maybeDescriptionToString (firstMatchingDescription val initModel.ava)

        Data.Intelligence ->
            maybeDescriptionToString (firstMatchingDescription val initModel.int)

        Data.Constitution ->
            maybeDescriptionToString (firstMatchingDescription val initModel.con)

        Data.Dexterity ->
            maybeDescriptionToString (firstMatchingDescription val initModel.dex)
