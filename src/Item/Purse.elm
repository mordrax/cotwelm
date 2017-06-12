module Item.Purse
    exposing
        ( add
        , addCoins
        , init
        , initCoppers
        , initGolds
        , initPlatinums
        , initSilvers
        , merge
        , remove
        )

import Item.Data exposing (..)
import Utils.Mass as Mass exposing (Mass)


init : Purse BasicItem
init =
    initBasicItem (BaseItem "Purse" (Prices 0 0) "Purse" (Mass 0 0) Normal Identified) BIT_Purse
        |> setCoins (Coins 100 10 1 1)


initCoinBaseItem : String -> String -> Int -> BaseItem
initCoinBaseItem name css value =
    BaseItem name (Prices value value) css (Mass 0 0) Normal Identified


initCoppers : Int -> CopperCoins BasicItem
initCoppers value =
    initBasicItem (initCoinBaseItem "Copper" "coins-copper" value) BIT_Copper
        |> setValue value


initSilvers : Int -> SilverCoins BasicItem
initSilvers value =
    initBasicItem (initCoinBaseItem "Silver" "coins-silver" value) BIT_Silver
        |> setValue value


initGolds : Int -> GoldCoins BasicItem
initGolds value =
    initBasicItem (initCoinBaseItem "Gold" "coins-gold" value) BIT_Gold
        |> setValue value


initPlatinums : Int -> PlatinumCoins BasicItem
initPlatinums value =
    initBasicItem (initCoinBaseItem "Platinum" "coins-platinum" value) BIT_Platinum
        |> setValue value


type Msg
    = Ok
    | NotEnoughCoins


add : Int -> Purse BasicItem -> Purse BasicItem
add coppers ({ coins } as model) =
    let
        leastCoins =
            toLeastCoins coppers
    in
    { model
        | coins =
            Coins (coins.copper + leastCoins.copper)
                (coins.silver + leastCoins.silver)
                (coins.gold + leastCoins.gold)
                (coins.platinum + leastCoins.platinum)
    }


addCoins : Coins -> Purse BasicItem -> Purse BasicItem
addCoins moreCoins ({ coins } as item) =
    { item | coins = merge_ (+) coins moreCoins }


merge : Purse BasicItem -> Purse BasicItem -> Purse BasicItem
merge p1 p2 =
    { p1 | coins = merge_ (+) p1.coins p2.coins }


{-| Perform an operation (+, -, etc...) on each denomination of two purses
-}
merge_ : (Int -> Int -> Int) -> Coins -> Coins -> Coins
merge_ op c1 c2 =
    Coins (op c1.copper c2.copper)
        (op c1.silver c2.silver)
        (op c1.gold c2.gold)
        (op c1.platinum c2.platinum)


remove : Int -> Purse BasicItem -> Result String (Purse BasicItem)
remove copperToRemove ({ coins } as model) =
    let
        totalSilvers =
            coins.copper + coins.silver * 100

        totalGold =
            totalSilvers + coins.gold * 10000

        totalPlatinum =
            totalGold + coins.platinum * 1000000
    in
    if copperToRemove <= coins.copper then
        Result.Ok { model | coins = { coins | copper = coins.copper - copperToRemove } }
    else if copperToRemove <= totalSilvers then
        let
            ( copper_, silver_ ) =
                toLeastSilvers (totalSilvers - copperToRemove)
        in
        Result.Ok { model | coins = { coins | copper = copper_, silver = silver_ } }
    else if copperToRemove <= totalGold then
        let
            ( copper_, silver_, gold_ ) =
                toLeastGold (totalGold - copperToRemove)
        in
        Result.Ok { model | coins = { coins | copper = copper_, silver = silver_, gold = gold_ } }
    else if copperToRemove <= totalPlatinum then
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
