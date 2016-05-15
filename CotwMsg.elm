module CotwMsg exposing (..) -- where

import SplashView exposing (Msg)
import CharCreation.Msg exposing (Msg)

type Msg = 
  SplashMsg SplashView.Msg | 
  CharCreationMsg CharCreation.Msg.Msg

type Page =
  SplashPage |
  CharCreationPage |
  MainGamePage |
  ShopPage |
  NotImplementedPage