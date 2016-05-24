module Game.Game exposing (..)

import Game.Data as Game exposing (..)
import Game.Maps exposing (..)
import Hero.Hero exposing (..)
import Hero.Data exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


initGame : Game.Model
initGame =
    { name = "A new game"
    , hero = Hero.Hero.initHero
    , map = Game.Maps.initMaps
    }


moveHero : Direction -> Game.Model -> Hero.Data.Model
moveHero dir model =
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
        { hero
            | pos =
                if (isTileObstructed newPos model) then
                    model.hero.pos
                else
                    newPos
        }


isTileObstructed : Coordinate -> Game.Model -> Bool
isTileObstructed pos model =
    False


update : Game.Msg -> Game.Model -> Game.Model
update msg model =
    case msg of
        Key dir ->
            { model | hero = moveHero dir model }


view : Game.Model -> Html (Maybe Game.Msg)
view model =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]
    in
        div []
            [ title
            , Game.Maps.view model.map
            , viewHero model.hero
            ]


viewHero : Hero.Data.Model -> Html (Maybe Game.Msg)
viewHero hero =
    div [ class "tile maleHero", coordToHtmlStyle hero.pos ] []
