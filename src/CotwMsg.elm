module CotwMsg exposing (..) -- where

import SplashView exposing (Msg)
import CharCreation.Data exposing (Msg)

type Msg = 
  SplashMsg SplashView.Msg | 
  CharCreationMsg CharCreation.Data.Msg

type Page =
  SplashPage |
  CharCreationPage |
  MainGamePage |
  ShopPage |
  NotImplementedPage