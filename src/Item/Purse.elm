module Item.Purse
    exposing
        ( Purse
        , init
        , add
        , merge
        , remove
        , getCoins
        )

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : IdGenerator.ID -> Purse
init id =
    { base = BaseItem "Purse" (Prices 0 0) "Purse" (Mass.Mass 0 0) Normal Identified id
    , copper = 100
    , silver = 10
    , gold = 1
    , platinum = 1
    }


type alias Purse =
    { base : BaseItem
    , copper : Coins
    , silver : Coins
    , gold : Coins
    , platinum : Coins
    }


type alias Coins =
    Int


type Msg
    = Ok
    | NotEnoughCoins



--        , baseItem = (Model id "Purse" 0 0 "Purse" status idStatus <| Mass 0 0)


getCoins : Purse -> ( Int, Int, Int, Int )
getCoins model =
    ( model.copper
    , model.silver
    , model.gold
    , model.platinum
    )


add : Int -> Purse -> Purse
add coppers ({ copper, silver, gold, platinum } as model) =
    let
        ( c, s, g, p ) =
            toLeastCoins coppers
    in
        { model | copper = copper + c, silver = silver + s, gold = gold + g, platinum = platinum + p }


merge : Purse -> Purse -> Purse
merge p1 p2 =
    (purses (+) p1 p2)


{-| Perform an operation (+, -, etc...) on each denomination of two purses
-}
purses : (Int -> Int -> Int) -> Purse -> Purse -> Purse
purses op ({ base } as p1) p2 =
    Purse base
        (op p1.copper p2.copper)
        (op p1.silver p2.silver)
        (op p1.gold p2.gold)
        (op p1.platinum p2.platinum)


remove : Int -> Purse -> Result String Purse
remove copperToRemove ({ copper, silver, gold, platinum } as model) =
    let
        totalSilvers =
            copper + silver * 100

        totalGold =
            totalSilvers + gold * 10000

        totalPlatinum =
            totalGold + platinum * 1000000
    in
        if (copperToRemove <= copper) then
            Result.Ok { model | copper = copper - copperToRemove }
        else if (copperToRemove <= totalSilvers) then
            let
                ( copper_, silver_ ) =
                    toLeastSilvers (totalSilvers - copperToRemove)
            in
                Result.Ok { model | copper = copper_, silver = silver_ }
        else if (copperToRemove <= totalGold) then
            let
                ( copper_, silver_, gold_ ) =
                    toLeastGold (totalGold - copperToRemove)
            in
                Result.Ok { model | copper = copper_, silver = silver_, gold = gold_ }
        else if (copperToRemove <= totalPlatinum) then
            let
                ( copper_, silver_, gold_, platinum_ ) =
                    toLeastCoins (totalPlatinum - copperToRemove)
            in
                Result.Ok { model | copper = copper_, silver = silver_, gold = gold_, platinum = platinum_ }
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
