module CharCreation
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
import Html.Events as HE
import Html.Attributes as HA
import Attributes exposing (Attributes)
import Types exposing (..)
import UI
import Css exposing (..)


styles =
    asPairs >> HA.style


addStyle currentStyles style =
    HA.style (asPairs <| style :: currentStyles)


type CharCreation
    = A Model


type alias Model =
    { name : String
    , attributes : Attributes
    , gender : Gender
    , difficulty : Difficulty
    }


type alias Name =
    String


type Msg
    = Name String
    | Gender Gender
    | Difficulty Difficulty
    | Attribute Attributes.Msg
    | StartGame


init : CharCreation
init =
    A
        { name = "Conan the destroyer"
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

        viewGenderAndAvatar =
            div
                [ styles
                    [ displayFlex
                    , justifyContent spaceBetween
                    , margin (px 10)
                    ]
                ]
                [ viewGender model.gender
                , viewAvatar
                ]
    in
        div []
            [ viewName model.name
            , Attributes.view model.attributes |> Html.map Attribute
            , viewGenderAndAvatar
            , viewDifficulty model.difficulty
            , viewButtons
            ]



--        div []
--            [ div [] [ text ("Name: " ++ model.name ++ " Difficulty: " ++ (toString model.difficulty) ++ " Gender: " ++ (toString model.gender)) ]
--            , div [ class "ui middle aligned center aligned grid" ]
--                [ div [ class "ui one column" ]
--                    [ div [ class "ui stacked vertical segment" ]
--                        [ -- name
--                          nameView model.name
--                        ]
--                    , div []
--                        [ Attributes.view model.attributes
--                            |> Html.map Attribute
--                        ]
--                    , div [ class "ui vertical segments" ]
--                        [ div [ class "ui vertical segment" ] [ text "Character Gender" ]
--                        , div [ class "ui vertical segment" ]
--                            [ genderView model.gender
--                            ]
--                        ]
--                    , difficultyView model.difficulty
--                    , button [ class "ui button primary", onClick StartGame ] [ text "Ok" ]
--                    , button [ class "ui button" ] [ text "Cancel" ]
--                    , button [ class "ui button" ] [ text "View Icon" ]
--                    , button [ class "ui button" ] [ text "Help" ]
--                    ]
--                ]
--            ]
-- Name


viewName : String -> Html Msg
viewName playerName =
    div
        [ styles
            [ displayFlex
            , justifyContent spaceBetween
            , margin (px 10)
            ]
        ]
        [ div []
            [ span
                [ styles [ verticalAlign Css.sub ] ]
                [ Html.text <| "Character" ++ UI.nbsp ++ "name:" ++ UI.nbsp ]
            ]
        , viewNameInput playerName
        ]


viewNameInput : String -> Html Msg
viewNameInput playerName =
    input
        [ HA.name "name"
        , HA.placeholder "What word did your mother utter as you came kicking and screaming into this world?"
        , HE.onInput Name
        , HA.value playerName
        , styles
            [ width (pct 100)
            ]
        ]
        []



-- Gender


viewAvatar : Html msg
viewAvatar =
    Html.text "No custom avatar"


viewGender : Gender -> Html Msg
viewGender gender =
    let
        genderLabel =
            div
                [ styles
                    [ position absolute
                    , zIndex (int 1)
                    , top (px -10)
                    , backgroundColor (rgb 255 255 255)
                    , padding2 zero (px 3)
                    ]
                ]
                [ Html.text <| "Character" ++ UI.nbsp ++ "Gender" ]
    in
        div
            [ styles
                [ border3 (px 1) solid (rgb 200 200 200)
                , position relative
                , displayFlex
                , padding2 (px 15) (px 10)
                ]
            ]
            [ genderLabel
            , div
                [ styles [ marginRight (px 15) ] ]
                [ input
                    [ HA.type_ "radio"
                    , HA.name "gender"
                    , HA.checked (Male == gender)
                    ]
                    []
                , Html.text "Male"
                ]
            , div []
                [ input
                    [ HA.type_ "radio"
                    , HA.name "gender"
                    , HA.checked (Female == gender)
                    ]
                    []
                , Html.text "Female"
                ]
            ]



-- Difficulty


viewDifficulty : Difficulty -> Html Msg
viewDifficulty difficulty =
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
        div
            [ styles
                [ margin (px 10)
                ]
            ]
            [ easyButton activeEasy
            , intermediateButton activeIntermediate
            , hardButton activeHard
            , impossibleButton activeImpossible
            ]



-- difficulty


iconButton : Difficulty -> String -> List (Html Msg) -> Html Msg
iconButton diff active a =
    button [ HA.class ("ui icon button " ++ active), HE.onClick (Difficulty diff) ] a


easyButton : String -> Html Msg
easyButton active =
    iconButton Easy
        active
        [ div [] [ i [ HA.class "huge green circle icon" ] [] ]
        , label [] [ Html.text "Easy" ]
        ]


intermediateButton : String -> Html Msg
intermediateButton active =
    iconButton Intermediate
        active
        [ div [] [ i [ HA.class "huge blue square icon" ] [] ]
        , label [] [ Html.text "Intermediate" ]
        ]


hardButton : String -> Html Msg
hardButton active =
    iconButton Hard
        active
        [ div [] [ i [ HA.class "huge black square icon" ] [] ]
        , label [] [ Html.text "Hard" ]
        ]


impossibleButton : String -> Html Msg
impossibleButton active =
    iconButton Impossible
        active
        [ div [] [ i [ HA.class "huge yellow warning sign icon" ] [] ]
        , label [] [ Html.text "Impossible" ]
        ]


viewButtons : Html Msg
viewButtons =
    div
        [ styles
            [ margin (px 20)
            ]
        ]
        [ UI.btn "OK" StartGame
        , UI.btn "Cancel" StartGame
        , UI.btn "View Icon" StartGame
        , UI.btn "Help" StartGame
        ]
