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
    PurseM { copper = 100, silver = 10, gold = 1, platinum = 1, baseItem = (ItemModel id "Purse" 0 0 "Purse" status idStatus <| Mass.new 0 0) }


getCoins : Purse -> ( Int, Int, Int, Int )
getCoins (PurseM model) =
    ( model.copper
    , model.silver
    , model.gold
    , model.platinum
    )


add : Int -> Purse -> Purse
add coppers (PurseM ({ copper, silver, gold, platinum } as model)) =
    let
        ( c, s, g, p ) =
            toLeastCoins coppers
    in
        PurseM { model | copper = copper + c, silver = silver + s, gold = gold + g, platinum = platinum + p }


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
remove copperToRemove (PurseM ({ copper, silver, gold, platinum } as model)) =
    let
        totalSilvers =
            copper + silver * 100

        totalGold =
            totalSilvers + gold * 10000

        totalPlatinum =
            totalGold + platinum * 1000000
    in
        if (copperToRemove <= copper) then
            Result.Ok (PurseM { model | copper = copper - copperToRemove })
        else if (copperToRemove <= totalSilvers) then
            let
                ( copper', silver' ) =
                    toLeastSilvers (totalSilvers - copperToRemove)
            in
                Result.Ok (PurseM { model | copper = copper', silver = silver' })
        else if (copperToRemove <= totalGold) then
            let
                ( copper', silver', gold' ) =
                    toLeastGold (totalGold - copperToRemove)
            in
                Result.Ok (PurseM { model | copper = copper', silver = silver', gold = gold' })
        else if (copperToRemove <= totalPlatinum) then
            let
                ( copper', silver', gold', platinum' ) =
                    toLeastCoins (totalPlatinum - copperToRemove)
            in
                Result.Ok (PurseM { model | copper = copper', silver = silver', gold = gold', platinum = platinum' })
        else
            Result.Err "Not enough coins to remove!"


toLeastCoins : Int -> ( Int, Int, Int, Int )
toLeastCoins coins =
    let
        ( copper, silver, gold ) =
            toLeastGold coins
    in
        ( copper, silver, gold % 100, gold // 100 )


toLeastGold : Int -> ( Int, Int, Int )
toLeastGold coins =
    let
        ( copper, silver ) =
            toLeastSilvers coins
    in
        ( copper, silver % 100, silver // 100 )


toLeastSilvers : Int -> ( Int, Int )
toLeastSilvers coins =
    ( coins % 100, coins // 100 )
