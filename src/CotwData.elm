module CotwData exposing (..)

-- where

import SplashView exposing (Msg)
import CharCreation.Data exposing (Msg)
import Game.Data exposing (Msg)
import Random exposing (Seed)


type Msg
    = SplashMsg SplashView.Msg
    | CharCreationMsg CharCreation.Data.Msg
    | GameMsg (Game.Data.Msg)
    | RNS Random.Seed


type Page
    = SplashPage
    | CharCreationPage
    | GamePage
    | ShopPage
    | NotImplementedPage
