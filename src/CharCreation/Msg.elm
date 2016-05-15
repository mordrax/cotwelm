module CharCreation.Msg exposing (..) --where

type Msg = Name String | Gender Gender

type alias Model = {
  name: String,
  str: Int,
  dex: Int,
  con: Int,
  agi: Int,
  gender: Gender,
  difficulty: Difficulty
}

type Gender = Male | Female
type Difficulty = Easy | Intermediate | Hard | Impossible
