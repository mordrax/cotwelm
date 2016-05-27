module Game.Game exposing (..)

import Game.Data exposing (..)
import Game.Maps exposing (..)
import Game.Collision exposing (..)
import GameData.Building exposing (..)
import Hero.Hero exposing (..)
import Hero.Data exposing (..)
import Lib exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


initGame : Game.Data.Model
initGame =
    { name = "A new game"
    , hero = Hero.Hero.initHero
    , map = Game.Maps.initMaps
    , currentBuilding = Nothing
    }


update : Msg -> Game.Data.Model -> ( Game.Data.Model, Cmd Msg )
update msg model =
    case msg of
        KeyDir dir ->
            tryMoveHero dir model

        Map ->
            Debug.log "escaping"
                ( { model | currentBuilding = Nothing }, Cmd.none )


view : Game.Data.Model -> Html (Maybe Game.Data.Msg)
view model =
    case model.currentBuilding of
        Nothing ->
            viewMap model

        Just building ->
            viewBuilding building


viewMap : Game.Data.Model -> Html (Maybe Game.Data.Msg)
viewMap model =
    let
        title =
            h1 [] [ text ("Welcome to Castle of the Winds: " ++ model.name) ]
    in
        div []
            [ title
            , Game.Maps.view model.map
            , viewHero model.hero
            ]


viewBuilding : GameData.Building.Building -> Html (Maybe Game.Data.Msg)
viewBuilding building =
    div [] [ h1 [] [ text building.name ] ]


viewHero : Hero.Data.Model -> Html (Maybe Game.Data.Msg)
viewHero hero =
    div [ class "tile maleHero", vectorToHtmlStyle hero.pos ] []
