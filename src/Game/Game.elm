module Game.Game exposing (..)

import Game.Data as Data exposing (..)
import Maps.Village exposing (..)
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


moveIfNotObstructed : Direction -> Data.Model -> Data.Model
moveIfNotObstructed dir model =
    let
        heroPos =
            model.hero.pos

        newPos =
            case dir of
                Up ->
                    coordAdd heroPos { x = 0, y = -1 }

                Down ->
                    coordAdd heroPos { x = 0, y = 1 }

                Left ->
                    coordAdd heroPos { x = -1, y = 0 }

                Right ->
                    coordAdd heroPos { x = 1, y = 0 }

        hero =
            model.hero
    in
        { model
            | hero =
                if (isTileObstructed newPos model) then
                    model.hero
                else
                    { hero | pos = newPos }
        }


isTileObstructed : Coordinate -> Data.Model -> Bool
isTileObstructed pos model =
    False


update : Data.Msg -> Data.Model -> Data.Model
update msg model =
    case msg of
        Key dir ->
            moveIfNotObstructed dir model


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
