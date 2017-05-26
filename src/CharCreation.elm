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
import Colors


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
                , viewAvatar model.gender
                , viewCustomAvatar
                ]
    in
        div
            [ styles
                [ maxWidth (px 480)
                , margin2 zero auto
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
    boxWithLabel ("Character" ++ UI.nbsp ++ "Gender")
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


boxWithLabel : String -> List (Html msg) -> Html msg
boxWithLabel label children =
    let
        boxLabel =
            div
                [ styles
                    [ position absolute
                    , zIndex (int 1)
                    , top (px -10)
                    , backgroundColor (rgb 255 255 255)
                    , padding2 zero (px 3)
                    ]
                ]
                [ Html.text label ]
    in
        div
            [ styles
                [ border3 (px 1) solid Colors.gray
                , position relative
                , displayFlex
                , justifyContent spaceBetween
                , padding2 (px 15) (px 10)
                ]
            ]
            (boxLabel :: children)



-- Difficulty


viewDifficulty : Difficulty -> Html Msg
viewDifficulty difficulty =
    let
        spacing children =
            div [ styles [ marginTop (px 10) ] ] children

        easy =
            div []
                [ viewIconEasy
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Easy) (Difficulty Easy)
                    , Html.text "Easy"
                    ]
                ]

        intermediate =
            div []
                [ viewIconIntermediate
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Intermediate) (Difficulty Intermediate)
                    , Html.text "Intermediate"
                    ]
                ]

        hard =
            div []
                [ viewIconHard
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Hard) (Difficulty Hard)
                    , Html.text "Difficult"
                    ]
                ]

        impossible =
            div []
                [ viewIconImpossible
                , spacing
                    [ UI.radioBtn "difficulty" (difficulty == Impossible) (Difficulty Impossible)
                    , Html.text "Impossible"
                    ]
                ]
    in
        boxWithLabel ("Game Difficulty")
            [ easy
            , intermediate
            , hard
            , impossible
            ]



-- difficulty


viewIconEasy : Html Msg
viewIconEasy =
    i
        [ styles
            [ display block
            , height (px 30)
            , width (px 30)
            , margin2 zero auto
            , borderRadius (px 30)
            , backgroundColor Colors.lightgreen
            ]
        ]
        []


viewIconIntermediate : Html Msg
viewIconIntermediate =
    i
        [ styles
            [ display block
            , height (px 30)
            , width (px 30)
            , margin2 zero auto
            , backgroundColor Colors.blue
            ]
        ]
        []


viewIconHard : Html Msg
viewIconHard =
    div
        [ styles
            [ height (px 30)
            , margin2 zero auto
            ]
        ]
        [ i
            [ styles
                [ display block
                , height (px 27)
                , width (px 27)
                , margin2 zero auto
                , backgroundColor Colors.black
                , transform (rotate (deg 45))
                ]
            ]
            []
        ]


viewIconImpossible : Html Msg
viewIconImpossible =
    div
        [ styles
            [ position relative
            , height (px 30)
            , width (px 30)
            , margin2 zero auto
            ]
        ]
        [ i
            [ styles
                [ width zero
                , height zero
                , borderLeft3 (px 20) solid transparent
                , borderRight3 (px 20) solid transparent
                , borderBottom3 (px 35) solid Colors.gold
                , position absolute
                ]
            ]
            []
        , span
            [ styles
                [ fontSize (Css.em 2)
                , position absolute
                , left (px 15)
                , zIndex (int 3)
                ]
            ]
            [ Html.text "!" ]
        ]


viewButtons : Html Msg
viewButtons =
    div
        [ styles
            [ margin (px 20)
            , displayFlex
            , justifyContent spaceBetween
            ]
        ]
        [ UI.btn "OK" StartGame
        , UI.btn "Cancel" StartGame
        , UI.btn "View Icon" StartGame
        , UI.btn "Help" StartGame
        ]
