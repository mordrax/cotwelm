module Item.Purse
    exposing
        ( Purse(..)
        , newPurse
        , add
        , merge
        , remove
        , getCoins
        )

import Item.Data exposing (ItemModel)
import Item.TypeDef exposing (..)
import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator exposing (..)


type alias Model =
    { copper : Coins
    , silver : Coins
    , gold : Coins
    , platinum : Coins
    , baseItem : ItemModel
    }


type alias Coins =
    Int


type Purse
    = PurseM Model


type Msg
    = Ok
    | NotEnoughCoins


newPurse : ID -> ItemStatus -> IdentificationStatus -> Purse
newPurse id status idStatus =
    PurseM { copper = 100, silver = 10, gold = 1, platinum = 0, baseItem = (ItemModel id "Purse" 0 0 "Purse" status idStatus <| Mass.new 0 0) }


getCoins : Purse -> ( Int, Int, Int, Int )
getCoins (PurseM model) =
    ( model.copper
    , model.silver
    , model.gold
    , model.platinum
    )


add : Int -> Purse -> Purse
add copper (PurseM model) =
    PurseM model


merge : Purse -> Purse -> Purse
merge (PurseM p1) (PurseM p2) =
    PurseM (purses (+) p1 p2)


{-| Perform an operation (+, -, etc...) on each denomination of two purses
-}
purses : (Int -> Int -> Int) -> Model -> Model -> Model
purses op p1 p2 =
    Model (p1.copper `op` p2.copper)
        (p1.silver `op` p2.silver)
        (p1.gold `op` p2.gold)
        (p1.platinum `op` p2.platinum)
        p1.baseItem


remove : Int -> Purse -> Result String Purse
remove copper (PurseM model) =
    Result.Ok (PurseM model)


toLeaseCoins : Int -> ( Int, Int, Int, Int )
toLeaseCoins coins =
    let
        p =
            coins // 1000000

        g =
            coins // 10000 - p * 100

        s =
            coins // 100 - g * 100 - p * 10000

        c =
            coins - s * 100 - g * 10000 - p * 1000000
    in
        ( c, s, g, p )
