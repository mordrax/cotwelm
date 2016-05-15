module CotwMsg exposing (..) -- where

import SplashView exposing (Msg)
import CharCreation exposing (Msg)

type Msg = 
  SplashMsg SplashView.Msg | 
  CharCreationMsg CharCreation.Msg

type Page =
  SplashPage |
  CharCreationPage |
  MainGamePage |
  ShopPage |
  NotImplementedPage