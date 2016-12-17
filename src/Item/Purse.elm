module Item.Purse
    exposing
        ( Purse
        , Coins
        , CopperCoins
        , SilverCoins
        , GoldCoins
        , PlatinumCoins
        , init
        , initCoppers
        , initSilvers
        , initGolds
        , initPlatinums
        , add
        , merge
        , remove
        )

import Item.Data exposing (..)
import Utils.IdGenerator as IdGenerator
import Utils.Mass as Mass exposing (Mass)


init : IdGenerator.ID -> Purse
init id =
    { base = BaseItem "Purse" (Prices 0 0) "Purse" (Mass.Mass 0 0) Normal Identified id
    , coins = Coins 100 10 1 1
    }


type alias CopperCoins =
    { base : BaseItem, value : Int }


type alias SilverCoins =
    { base : BaseItem, value : Int }


type alias GoldCoins =
    { base : BaseItem, value : Int }


type alias PlatinumCoins =
    { base : BaseItem, value : Int }


initCoinBaseItem : String -> String -> Int -> BaseItem
initCoinBaseItem name css value =
    BaseItem name (Prices value value) css (Mass.Mass 0 0) Normal Identified IdGenerator.empty


initCoppers : Int -> CopperCoins
initCoppers value =
    { base = initCoinBaseItem "Copper" "coins-copper" value
    , value = value
    }


initSilvers : Int -> SilverCoins
initSilvers value =
    { base = initCoinBaseItem "Silver" "coins-silver" value
    , value = value
    }


initGolds : Int -> GoldCoins
initGolds value =
    { base = initCoinBaseItem "Gold" "coins-gold" value
    , value = value
    }


initPlatinums : Int -> PlatinumCoins
initPlatinums value =
    { base = initCoinBaseItem "Platinum" "coins-platinum" value
    , value = value
    }


type alias Coins =
    { copper : Int
    , silver : Int
    , gold : Int
    , platinum : Int
    }


type alias Purse =
    { base : BaseItem
    , coins : Coins
    }


type Msg
    = Ok
    | NotEnoughCoins


add : Int -> Purse -> Purse
add coppers ({ coins } as model) =
    let
        leastCoins =
            toLeastCoins coppers
    in
        { model
            | coins =
                Coins
                    (coins.copper + leastCoins.copper)
                    (coins.silver + leastCoins.silver)
                    (coins.gold + leastCoins.gold)
                    (coins.platinum + leastCoins.platinum)
        }


merge : Purse -> Purse -> Purse
merge p1 p2 =
    (purses (+) p1 p2)


{-| Perform an operation (+, -, etc...) on each denomination of two purses
-}
purses : (Int -> Int -> Int) -> Purse -> Purse -> Purse
purses op p1 p2 =
    Purse p1.base
        (Coins (op p1.coins.copper p2.coins.copper)
            (op p1.coins.silver p2.coins.silver)
            (op p1.coins.gold p2.coins.gold)
            (op p1.coins.platinum p2.coins.platinum)
        )


remove : Int -> Purse -> Result String Purse
remove copperToRemove ({ coins } as model) =
    let
        totalSilvers =
            coins.copper + coins.silver * 100

        totalGold =
            totalSilvers + coins.gold * 10000

        totalPlatinum =
            totalGold + coins.platinum * 1000000
    in
        if (copperToRemove <= coins.copper) then
            Result.Ok { model | coins = { coins | copper = coins.copper - copperToRemove } }
        else if (copperToRemove <= totalSilvers) then
            let
                ( copper_, silver_ ) =
                    toLeastSilvers (totalSilvers - copperToRemove)
            in
                Result.Ok { model | coins = { coins | copper = copper_, silver = silver_ } }
        else if (copperToRemove <= totalGold) then
            let
                ( copper_, silver_, gold_ ) =
                    toLeastGold (totalGold - copperToRemove)
            in
                Result.Ok { model | coins = { coins | copper = copper_, silver = silver_, gold = gold_ } }
        else if (copperToRemove <= totalPlatinum) then
            let
                coins =
                    toLeastCoins (totalPlatinum - copperToRemove)
            in
                Result.Ok { model | coins = { coins | copper = coins.copper, silver = coins.silver, gold = coins.gold, platinum = coins.platinum } }
        else
            Result.Err "Not enough coins to remove!"


toLeastCoins : Int -> Coins
toLeastCoins coppers =
    let
        ( copper, silver, gold ) =
            toLeastGold coppers
    in
        Coins copper silver (gold % 100) (gold // 100)


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
