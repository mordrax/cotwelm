module CotwData exposing (..)

-- where

import SplashView exposing (Msg)
import CharCreation.Data exposing (Msg)
import Game.Data exposing (Msg)


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Data.Msg
    | GameMsg (Game.Data.Msg)


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | NotImplementedPage
