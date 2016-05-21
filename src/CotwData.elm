module CotwData exposing (..)

-- where

import SplashView exposing (Msg)
import CharCreation.Data exposing (Msg)
import Game.Data exposing (Msg)
import Controller.Keyboard exposing (Msg)


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Data.Msg
    | Keyboard (Maybe Controller.Keyboard.Msg)
    | GameMsg Game.Data.Msg


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | NotImplementedPage
