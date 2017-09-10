module View.Hud exposing (view)

import Css exposing (..)
import Game.Model exposing (..)
import Html exposing (..)
import Html.Attributes as HA
import Message
import Stats exposing (Stats)
import Time.DateTime as DateTime


styles : List Css.Mixin -> Html.Attribute a
styles =
    asPairs >> HA.style


view : Game -> Html Msg
view model =
    let
        messagesStyle =
            styles [ height (px 100), flexGrow (int 4), Css.border2 (px 1) solid, overflowY scroll ]

        statsStyle =
            styles [ height (px 100), flexGrow (int 1), Css.border2 (px 1) solid ]
    in
    div [ HA.class "game-bottom-hud" ]
        [ viewMessages model
        , viewStats model.hero.expLevel model.hero.stats model.turn
        ]


viewMessages : Game -> Html Msg
viewMessages model =
    div [ HA.class "game-bottom-hud__messages" ]
        (viewMessages_ 1 (Message.all model.messages))


viewMessages_ : Int -> List (List String) -> List (Html Msg)
viewMessages_ level messages =
    let
        viewMessage msg =
            div [ HA.class "messages__message", HA.class ("messages__message-level" ++ toString level) ] [ Html.text msg ]
    in
    case messages of
        [] ->
            [ Html.text "" ]

        msgs :: rest ->
            List.map viewMessage msgs ++ viewMessages_ (level + 1) rest


viewStats : Int -> Stats -> Int -> Html Msg
viewStats expLevel stats turn =
    let
        hpStyles =
            if Stats.hpLow stats then
                [ styles [ Css.color (Css.rgb 255 0 0) ] ]
            else
                []

        spStyles =
            if Stats.spLow stats then
                [ styles [ Css.color (Css.rgb 255 0 0) ] ]
            else
                []

        ( ppHP, ppSP ) =
            ( Stats.printHP stats, Stats.printSP stats )

        formattedTime =
            DateTime.fromTimestamp (toFloat turn * 1000)
                |> (\time -> [ DateTime.hour time, DateTime.minute time, DateTime.second time ])
                |> List.map (toString >> String.padLeft 2 '0')
                |> String.join ":"
    in
    div [ HA.class "game-bottom-hud__stats" ]
        [ viewStat [] "Level" (toString expLevel)
        , viewStat hpStyles "HP" ppHP
        , viewStat spStyles "Mana" ppSP
        , viewStat [] "Speed" "100% / 200%"
        , viewStat [] "Time" ("0d, " ++ formattedTime)
        , div [] [ Html.text "A Tiny Hamlet" ]
        ]


viewStat : List (Html.Attribute never) -> String -> String -> Html never
viewStat customAttributes label value =
    let
        statLabel lbl =
            div [ HA.class "stat__label" ] [ Html.text lbl ]

        statValue val =
            div [ HA.class "stat__value" ] [ Html.text val ]
    in
    div (HA.class "game-bottom-hud__stat" :: customAttributes)
        [ statLabel label
        , statValue value
        ]


viewHUD : Game -> Html Msg
viewHUD model =
    div [] [ Html.text "messages" ]
