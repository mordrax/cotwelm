module Game.Game exposing (..)

import Game.Data as Data exposing (..)
import Maps.Maps exposing (..)
import Hero.Hero exposing (..)
import Hero.Data exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


initGame : Data.Model
initGame =
    { name = "A new game"
    , map = Village
    , hero = initHero
    }


update : Data.Msg -> Data.Model -> Data.Model
update msg model =
    case msg of
        Move Up ->
            { model | hero = Hero.Hero.moveY -1 model.hero }

        Move Down ->
            { model | hero = Hero.Hero.moveY 1 model.hero }

        Move Left ->
            { model | hero = Hero.Hero.moveX -1 model.hero }

        Move Right ->
            { model | hero = Hero.Hero.moveX 1 model.hero }


view : Data.Model -> Html (Maybe Data.Msg)
view model =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]
    in
        div []
            [ title
            , viewMap model.map
            , viewHero model.hero
            ]


viewMap : Map -> Html (Maybe Data.Msg)
viewMap map =
    case map of
        Village ->
            villageMap

        notImplemented ->
            h2 [ style [ ( "color", "red" ) ] ]
                [ text ("Not implemented map specified: " ++ toString notImplemented) ]


viewHero : Hero.Data.Model -> Html (Maybe Data.Msg)
viewHero hero =
    div [ class "tile maleHero", coordToHtmlStyle hero.pos ] []
