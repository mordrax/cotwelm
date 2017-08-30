module CharCreation
    exposing
        ( CharCreation
        , Msg
        , info
        , init
        , update
        , view
        )

-- where

import Attributes exposing (Attributes)
import Colors
import Css exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Html.Events as HE
import Types exposing (..)
import UI


styles : List Mixin -> Attribute msg
styles =
    asPairs >> HA.style


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


init : ( CharCreation, Cmd Msg )
init =
    let
        ( attributes, attrCmds ) =
            Attributes.init
    in
    ( A
        { name = "Conan the destroyer"
        , attributes = attributes
        , gender = Female
        , difficulty = Hard
        }
    , Cmd.map Attribute attrCmds
    )


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
            ( A model, True )


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
                , viewAvatar model.gender
                , viewCustomAvatar
                ]
    in
    div
        [ styles
            [ maxWidth (px 580)
            , margin2 zero auto
            , Css.backgroundColor Colors.white
            , padding (px 50)
            ]
        ]
        [ viewName model.name
        , Attributes.view model.attributes |> Html.map Attribute
        , viewGenderAndAvatar
        , viewDifficulty model.difficulty
        , viewButtons
        ]


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
                []
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


viewAvatar : Gender -> Html msg
viewAvatar gender =
    let
        heroBackgroundPosition =
            if gender == Male then
                backgroundPosition2 zero zero
            else
                backgroundPosition2 (px -32) zero
    in
    div
        [ styles
            [ backgroundImage (url "/assets/original/monsters.png")
            , heroBackgroundPosition
            , height (px 32)
            , width (px 32)
            ]
        ]
        []


viewCustomAvatar : Html msg
viewCustomAvatar =
    div [] [ Html.text "No custom avatar" ]


viewGender : Gender -> Html Msg
viewGender gender =
    UI.labeledBox ("Character" ++ UI.nbsp ++ "Gender")
        [ div
            [ styles [ marginRight (px 15) ] ]
            [ UI.radioBtn "gender" (Male == gender) (Gender Male)
            , Html.text "Male"
            ]
        , div []
            [ UI.radioBtn "gender" (Female == gender) (Gender Female)
            , Html.text "Female"
            ]
        ]



-- Difficulty


viewDifficulty : Difficulty -> Html Msg
viewDifficulty difficulty =
    let
        spacing children =
            div [ styles [ marginTop (px 10) ] ] children

        easy =
            div []
                [ UI.viewIconEasy
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Easy) (Difficulty Easy)
                    , Html.text (UI.nbsp ++ "Easy")
                    ]
                ]

        intermediate =
            div []
                [ UI.viewIconIntermediate
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Intermediate) (Difficulty Intermediate)
                    , Html.text "Intermediate"
                    ]
                ]

        hard =
            div []
                [ UI.viewIconHard
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Hard) (Difficulty Hard)
                    , Html.text "Difficult"
                    ]
                ]

        impossible =
            div []
                [ UI.viewIconImpossible
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Impossible) (Difficulty Impossible)
                    , Html.text "Impossible"
                    ]
                ]
    in
    UI.labeledBox "Game Difficulty"
        [ easy
        , intermediate
        , hard
        , impossible
        ]


viewButtons : Html Msg
viewButtons =
    div
        [ styles
            [ margin2 (px 20) zero
            , displayFlex
            , justifyContent spaceBetween
            ]
        , HA.class "char-creation-buttons"
        ]
        [ UI.btn "OK" StartGame
        , UI.btn "Cancel" StartGame
        , UI.btn "View Icon" StartGame
        , UI.btn "Help" StartGame
        ]
