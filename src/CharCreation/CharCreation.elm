module CharCreation.CharCreation
    exposing
        ( CharCreation
        , Msg
        , view
        , init
        , update
        , info
        )

-- where

import Html exposing (..)
import Html.App
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (..)
import Hero.Attributes as Attributes exposing (Attributes)
import GameData.Types as GDT exposing (Gender(..), Difficulty(..))


type CharCreation
    = A Model


type alias Model =
    { name : String
    , attributes : Attributes
    , gender : Gender
    , difficulty : Difficulty
    }

type alias Name = String

type Msg
    = Name String
    | Gender Gender
    | Difficulty Difficulty
    | Attribute Attributes.Msg
    | StartGame


init : CharCreation
init =
    A
        { name = "testing"
        , attributes = Attributes.init
        , gender = Female
        , difficulty = Hard
        }


update : Msg -> CharCreation -> ( CharCreation, Bool )
update msg (A model) =
    case msg of
        Name newName ->
            ( A { model | name = newName }, False )

        Gender gender ->
            ( A { model | gender = gender }, False )

        Difficulty difficulty ->
            ( A { model | difficulty = difficulty }, False )

        Attribute msg ->
            ( A { model | attributes = Attributes.update msg model.attributes }, False )

        StartGame ->
            ( (A model), True )


info : CharCreation -> ( Name, Gender, Difficulty, Attributes )
info (A model) =
    ( model.name, model.gender, model.difficulty, model.attributes )



-- View


view : CharCreation -> Html Msg
view (A model) =
    let
        bgStyle =
            [ ( "backgroundColor", "black" ) ]
    in
        div []
            [ div [] [ text ("Name: " ++ model.name ++ " Difficulty: " ++ (toString model.difficulty) ++ " Gender: " ++ (toString model.gender)) ]
            , div [ class "ui middle aligned center aligned grid" ]
                [ div [ class "ui one column" ]
                    [ div [ class "ui stacked vertical segment" ]
                        [ -- name
                          nameView model.name
                        ]
                    , div []
                        [ Attributes.view model.attributes
                            |> Html.App.map Attribute
                        ]
                    , div [ class "ui vertical segments" ]
                        [ div [ class "ui vertical segment" ] [ text "Character Gender" ]
                        , div [ class "ui vertical segment" ]
                            [ genderView model.gender
                            ]
                        ]
                    , difficultyView model.difficulty
                    , button [ class "ui button primary", onClick StartGame ] [ text "Ok" ]
                    , button [ class "ui button" ] [ text "Cancel" ]
                    , button [ class "ui button" ] [ text "View Icon" ]
                    , button [ class "ui button" ] [ text "Help" ]
                    ]
                ]
            ]



-- Name


nameView : String -> Html Msg
nameView playerName =
    div [ class "ui vertical segment" ]
        [ div [ class "ui labeled fluid input" ]
            [ div [ class "ui label" ] []
            , input
                [ name "name"
                , placeholder "What word did your mother utter as you came kicking and screaming into this world?"
                , onInput Name
                , value playerName
                ]
                []
            ]
        ]



-- Gender


genderView : Gender -> Html Msg
genderView gender =
    div [ class "equal width column" ]
        [ div [ class "ui large buttons" ]
            [ genderButton Male (gender == Male)
            , div [ class "or" ] []
            , genderButton Female (gender == Female)
            ]
        ]


genderButton : Gender -> Bool -> Html Msg
genderButton gender isActive =
    let
        active =
            if isActive then
                "active"
            else
                ""

        icon =
            if gender == Male then
                "large male icon"
            else
                "large female icon"
    in
        button
            [ class ("ui labeled icon button " ++ active)
            , onClick (Gender gender)
            ]
            [ i [ class icon ] []
            , text (toString gender)
            ]



-- Difficulty


difficultyView : Difficulty -> Html Msg
difficultyView difficulty =
    let
        activeEasy =
            if difficulty == Easy then
                "active"
            else
                ""

        activeIntermediate =
            if difficulty == Intermediate then
                "active"
            else
                ""

        activeHard =
            if difficulty == Hard then
                "active"
            else
                ""

        activeImpossible =
            if difficulty == Impossible then
                "active"
            else
                ""
    in
        div [ class "four ui buttons" ]
            [ easyButton activeEasy
            , intermediateButton activeIntermediate
            , hardButton activeHard
            , impossibleButton activeImpossible
            ]


iconButton : Difficulty -> String -> List (Html Msg) -> Html Msg
iconButton diff active a =
    button [ class ("ui icon button " ++ active), onClick (Difficulty diff) ] a


easyButton : String -> Html Msg
easyButton active =
    iconButton Easy
        active
        [ div [] [ i [ class "huge green circle icon" ] [] ]
        , label [] [ text "Easy" ]
        ]


intermediateButton : String -> Html Msg
intermediateButton active =
    iconButton Intermediate
        active
        [ div [] [ i [ class "huge blue square icon" ] [] ]
        , label [] [ text "Intermediate" ]
        ]


hardButton : String -> Html Msg
hardButton active =
    iconButton Hard
        active
        [ div [] [ i [ class "huge black square icon" ] [] ]
        , label [] [ text "Hard" ]
        ]


impossibleButton : String -> Html Msg
impossibleButton active =
    iconButton Impossible
        active
        [ div [] [ i [ class "huge yellow warning sign icon" ] [] ]
        , label [] [ text "Impossible" ]
        ]
